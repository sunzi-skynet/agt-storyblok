#!/usr/bin/env node
/**
 * Visual Comparison Script
 * Captures screenshots of original vs clone for comparison
 * 
 * Usage: node compare.js [viewport]
 *   viewport: desktop (default), tablet, mobile, all
 */

const { chromium } = require('playwright');
const { mkdir } = require('fs/promises');
const { join } = require('path');

const SCREENSHOTS_DIR = join(__dirname, 'screenshots');

const SITES = {
  original: 'https://www.agtlogistik.de',
  clone: 'https://agt-storyblok.vercel.app'
};

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 }
};

async function captureScreenshots(viewportFilter = 'desktop') {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });
  
  const browser = await chromium.launch({ headless: true });

  const viewportsToCapture = viewportFilter === 'all' 
    ? Object.entries(VIEWPORTS)
    : [[viewportFilter, VIEWPORTS[viewportFilter] || VIEWPORTS.desktop]];
  
  console.log('📸 Starting visual comparison...\n');

  for (const [name, url] of Object.entries(SITES)) {
    console.log(`🌐 ${name}: ${url}`);
    
    for (const [vpName, viewport] of viewportsToCapture) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(2000); // Wait for images
        
        const filename = `${name}-${vpName}.png`;
        const filepath = join(SCREENSHOTS_DIR, filename);
        
        await page.screenshot({ path: filepath });
        console.log(`  ✓ ${vpName} (${viewport.width}x${viewport.height}) → screenshots/${filename}`);
      } catch (err) {
        console.log(`  ✗ ${vpName}: ${err.message}`);
      }
      
      await context.close();
    }
    console.log('');
  }

  await browser.close();
  
  console.log(`✅ Done! Screenshots in: ${SCREENSHOTS_DIR}`);
  console.log('\n📂 Compare these files:');
  viewportsToCapture.forEach(([vpName]) => {
    console.log(`   original-${vpName}.png  ↔  clone-${vpName}.png`);
  });
}

const viewport = process.argv[2] || 'desktop';
captureScreenshots(viewport).catch(console.error);
