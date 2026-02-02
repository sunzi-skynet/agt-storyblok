#!/usr/bin/env node
/**
 * Visual Comparison Script
 * Captures screenshots of original and clone for side-by-side comparison
 */

const puppeteer = require('puppeteer');
const { mkdir } = require('fs/promises');
const { join } = require('path');

const SCREENSHOTS_DIR = join(__dirname, '..', 'screenshots');

const SITES = {
  original: 'https://www.agtlogistik.de',
  clone: 'https://agt-storyblok.vercel.app'
};

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 }
];

async function captureScreenshots() {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const timestamp = new Date().toISOString().slice(0, 16).replace(':', '-');
  
  console.log('📸 Starting visual comparison...\n');

  for (const [name, url] of Object.entries(SITES)) {
    console.log(`\n🌐 ${name}: ${url}`);
    
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({ width: viewport.width, height: viewport.height });
      
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        // Wait for images to load
        await page.evaluate(() => new Promise(r => setTimeout(r, 2000)));
        
        const filename = `${name}-${viewport.name}-${timestamp}.png`;
        const filepath = join(SCREENSHOTS_DIR, filename);
        
        await page.screenshot({ path: filepath, fullPage: false });
        console.log(`  ✓ ${viewport.name} (${viewport.width}x${viewport.height}) → ${filename}`);
      } catch (err) {
        console.log(`  ✗ ${viewport.name}: ${err.message}`);
      }
      
      await page.close();
    }
  }

  await browser.close();
  
  console.log(`\n✅ Screenshots saved to: ${SCREENSHOTS_DIR}`);
  console.log('\nCompare files:');
  VIEWPORTS.forEach(v => {
    console.log(`  ${v.name}: original-${v.name}-*.png vs clone-${v.name}-*.png`);
  });
}

captureScreenshots().catch(console.error);
