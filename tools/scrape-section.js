#!/usr/bin/env node
/**
 * scrape-section.js - Scrape content sections from websites
 * 
 * Usage:
 *   node scrape-section.js <url> [--selector ".class"] [--heading "Heading Text"]
 * 
 * Examples:
 *   node scrape-section.js https://example.com/page --heading "About Us"
 *   node scrape-section.js https://example.com/page --selector ".content-section"
 * 
 * Output: JSON with title, text, images[]
 */

import puppeteer from 'puppeteer';

async function scrapeSection(url, options = {}) {
  const { selector, heading } = options;
  
  console.error(`[scrape] Opening ${url}...`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Block unnecessary resources for speed
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const type = req.resourceType();
      if (['font', 'media'].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    console.error(`[scrape] Page loaded.`);
    
    // Close any cookie banners/modals
    await page.evaluate(() => {
      const closeButtons = document.querySelectorAll('[class*="close"], [class*="cookie"] button, [class*="modal"] button');
      closeButtons.forEach(btn => {
        if (btn.textContent.toLowerCase().includes('accept') || 
            btn.textContent.toLowerCase().includes('ok') ||
            btn.textContent.toLowerCase().includes('schließen')) {
          btn.click();
        }
      });
    });
    await page.waitForTimeout(500);
    
    // Find the section
    const result = await page.evaluate((selector, heading) => {
      let section = null;
      
      // Strategy 1: By selector
      if (selector) {
        section = document.querySelector(selector);
      }
      
      // Strategy 2: By heading text
      if (!section && heading) {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        for (const h of headings) {
          if (h.textContent.trim().toLowerCase().includes(heading.toLowerCase())) {
            // Find parent section
            section = h.closest('section, article, .section, [class*="section"], [class*="block"]') || h.parentElement;
            break;
          }
        }
      }
      
      // Strategy 3: Scrape all sections if nothing specific
      if (!section && !selector && !heading) {
        const sections = [];
        document.querySelectorAll('section, [class*="section"]').forEach((sec, i) => {
          const h = sec.querySelector('h1, h2, h3, h4, h5, h6');
          const title = h ? h.textContent.trim() : `Section ${i + 1}`;
          const paragraphs = Array.from(sec.querySelectorAll('p')).map(p => p.textContent.trim()).filter(Boolean);
          const images = Array.from(sec.querySelectorAll('img')).map(img => ({
            src: img.src,
            alt: img.alt || ''
          }));
          
          if (paragraphs.length > 0 || images.length > 0) {
            sections.push({ title, text: paragraphs.join('\n\n'), images });
          }
        });
        return { allSections: sections };
      }
      
      if (!section) {
        return { error: 'Section not found' };
      }
      
      // Extract content from found section
      const h = section.querySelector('h1, h2, h3, h4, h5, h6');
      const title = h ? h.textContent.trim() : '';
      
      const paragraphs = Array.from(section.querySelectorAll('p, li'))
        .map(el => el.textContent.trim())
        .filter(Boolean);
      
      const images = Array.from(section.querySelectorAll('img'))
        .filter(img => img.src && !img.src.includes('data:') && img.width > 100)
        .map(img => ({
          src: img.src,
          alt: img.alt || '',
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height
        }));
      
      // Also get background images
      const bgImages = [];
      const elementsWithBg = section.querySelectorAll('[style*="background"]');
      elementsWithBg.forEach(el => {
        const bg = window.getComputedStyle(el).backgroundImage;
        const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
        if (match && match[1]) {
          bgImages.push({ src: match[1], type: 'background' });
        }
      });
      
      return {
        title,
        text: paragraphs.join('\n\n'),
        images: [...images, ...bgImages]
      };
    }, selector, heading);
    
    return result;
    
  } finally {
    await browser.close();
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`Usage: node scrape-section.js <url> [--selector ".class"] [--heading "Text"]`);
    console.log(`\nExamples:`);
    console.log(`  node scrape-section.js https://example.com/page --heading "About Us"`);
    console.log(`  node scrape-section.js https://example.com/page  # List all sections`);
    process.exit(1);
  }
  
  const url = args[0];
  const options = {};
  
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--selector' && args[i + 1]) {
      options.selector = args[++i];
    } else if (args[i] === '--heading' && args[i + 1]) {
      options.heading = args[++i];
    }
  }
  
  try {
    const result = await scrapeSection(url, options);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(`[error] ${err.message}`);
    process.exit(1);
  }
}

main();
