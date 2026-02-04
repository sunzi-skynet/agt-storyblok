#!/usr/bin/env node
/**
 * Screenshot Tool using screenshotone.com
 * Usage: node screenshot.js [original|clone|both]
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load credentials from .env.local
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Missing credentials file: .env.local');
  console.error('   Copy .env.example to .env.local and fill in your tokens.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  if (line.startsWith('#') || !line.includes('=')) return;
  const [key, ...valueParts] = line.split('=');
  envVars[key.trim()] = valueParts.join('=').trim();
});

const ACCESS_KEY = envVars.SCREENSHOT_API_KEY;
if (!ACCESS_KEY) {
  console.error('❌ SCREENSHOT_API_KEY not found in .env.local');
  process.exit(1);
}

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

const SITES = {
  original: 'https://www.agtlogistik.de',
  clone: 'https://agt-storyblok.vercel.app'
};

async function screenshot(name, url) {
  const params = new URLSearchParams({
    access_key: ACCESS_KEY,
    url: url,
    viewport_width: 1440,
    viewport_height: 900,
    full_page: false,
    delay: 3,
    format: 'png',
    cache: false,
    block_ads: true
  });

  const apiUrl = `https://api.screenshotone.com/take?${params}`;
  const filepath = path.join(SCREENSHOTS_DIR, `${name}.png`);

  return new Promise((resolve, reject) => {
    console.log(`📸 ${name}: ${url}`);
    
    const file = fs.createWriteStream(filepath);
    https.get(apiUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(filepath).size;
        console.log(`   ✓ ${filepath} (${(size/1024).toFixed(0)}KB)`);
        resolve(filepath);
      });
    }).on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  
  const target = process.argv[2] || 'both';
  
  console.log('🖼️  AGT Visual Compare\n');
  
  if (target === 'original' || target === 'both') {
    await screenshot('original', SITES.original);
  }
  if (target === 'clone' || target === 'both') {
    await screenshot('clone', SITES.clone);
  }
  
  console.log('\n✅ Done! Compare: screenshots/original.png vs screenshots/clone.png');
}

main().catch(console.error);
