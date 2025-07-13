import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import Papa from "papaparse";


const OCR_SPACE_API_KEY = process.env.OCR_SPACE_API_KEY!;
const OCR_SPACE_API_URL = "https://api.ocr.space/parse/image";


export async function extractText(source: string): Promise<string> {
  const ext = path.extname(source).toLowerCase();

  // Handle PDF URLs
  if (ext === ".pdf") {
    if (source.startsWith("http://") || source.startsWith("https://")) {
      const formData = new FormData();
      formData.append("url", source);
      formData.append("language", "eng");

      const response = await fetch(OCR_SPACE_API_URL, {
        method: "POST",
        headers: {
          apikey: OCR_SPACE_API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`OCR API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      // Extract all ParsedText from ParsedResults
      const texts = result.ParsedResults
        ?.map((r: any) => r.ParsedText)
        .filter((t: any) => typeof t === "string" && t.trim().length > 0) || [];

      if (texts.length === 0) {
        throw new Error("No text found in OCR response");
      }

      const combinedText = texts.join("\n").trim();
      
      // Check for error messages
      const errorMessages = [];
      if (result.ErrorMessage && Array.isArray(result.ErrorMessage)) {
        errorMessages.push(...result.ErrorMessage);
      } else if (result.ErrorMessage && typeof result.ErrorMessage === "string") {
        errorMessages.push(result.ErrorMessage);
      }
      
      if(errorMessages.length > 0) {
        console.log(errorMessages)
      }
      
      return combinedText;
    } else {
      throw new Error("Local PDF files are not supported. Please provide a URL to the PDF.");
    }
  }

  // Handle CSV URLs
  if (ext === ".csv" && (source.startsWith("http://") || source.startsWith("https://"))) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set user agent to look more like a real browser
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Intercept responses to get CSV content
    let csvContent = '';
    page.on('response', async (response) => {
      if (response.url() === source && response.status() === 200) {
        csvContent = await response.text();
      }
    });
    
    try {
      await page.goto(source, { waitUntil: "networkidle0" });
    } catch (error) {
      // If navigation fails, try to get content from the response
      if (!csvContent) {
        throw new Error(`Failed to fetch CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    await browser.close();
    
    if (!csvContent) {
      throw new Error("No CSV content found");
    }
    
    return Papa.parse<any>(csvContent, { header: false }).data.flat().join(" ");
  }

  // Handle other URLs (non-PDF, non-CSV)
  if (source.startsWith("http://") || source.startsWith("https://")) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(source, { waitUntil: "networkidle0" });

    let previousHeight = 0;
    while (true) {
      const currentHeight = await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
        return document.body.scrollHeight;
      });

      if (currentHeight === previousHeight) break;

      previousHeight = currentHeight;
      await new Promise((res) => setTimeout(res, 500));
    }

    const text = await page.evaluate(() => {
      return document.body.innerText.replace(/\s+/g, " ").trim();
    });

    await browser.close();
    return text;
  }

  // Handle local CSV
  if (ext === ".csv") {
    const text = await fs.readFile(source, "utf8");
    return Papa.parse<any>(text, { header: false }).data.flat().join(" ");
  }
  // Handle local TXT
  if (ext === ".txt") {
    return await fs.readFile(source, "utf8");
  }
  throw new Error(`Unsupported source type: ${source}`);
}