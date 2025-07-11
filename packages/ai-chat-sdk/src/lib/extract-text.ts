import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import Papa from "papaparse";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function extractText(source: string): Promise<string> {
  const ext = path.extname(source).toLowerCase();
  if (source.startsWith("http://") || source.startsWith("https://")) {
    const html = await fetch(source).then(res => res.text());
    const $ = cheerio.load(html);
    return $("body").text().replace(/\s+/g, " ").trim();
  }
  if (ext === ".pdf") {
    const buffer = await fs.readFile(source);
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