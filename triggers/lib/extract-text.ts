import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import Papa from "papaparse";

export async function extractText(source: string): Promise<string> {
  const ext = path.extname(source).toLowerCase();
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
  if (ext === ".pdf") {
    const buffer = await fs.readFile(source);
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return data.text;
  }
  if (ext === ".csv") {
    const text = await fs.readFile(source, "utf8");
    return Papa.parse<any>(text, { header: false }).data.flat().join(" ");
  }
  if (ext === ".txt") {
    return await fs.readFile(source, "utf8");
  }
  throw new Error(`Unsupported source type: ${source}`);
}