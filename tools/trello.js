#!/usr/bin/env node
/**
 * Trello Helper for AGT Storyblok Migration
 * Usage: 
 *   node trello.js list              - Show all cards
 *   node trello.js add "Name" "Desc" - Add card to Backlog
 *   node trello.js move <cardId> <list> - Move card (backlog|progress|review|done)
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

const CONFIG = {
  key: envVars.TRELLO_KEY,
  token: envVars.TRELLO_TOKEN,
  boardId: envVars.TRELLO_BOARD_ID || '69813e07450e7edcadb01b29',
  lists: {
    backlog: '69813e1219b1e5ca8bf09dc2',
    progress: '69813e11e548327334319a1c',
    review: '69813e11656a2f607bfbfda3',
    done: '69813e119454490f5a7a018c'
  }
};

if (!CONFIG.key || !CONFIG.token) {
  console.error('❌ TRELLO_KEY or TRELLO_TOKEN not found in .env.local');
  process.exit(1);
}

function api(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://api.trello.com/1${path}`);
    url.searchParams.set('key', CONFIG.key);
    url.searchParams.set('token', CONFIG.token);
    
    const options = { method, headers: {} };
    let body = null;
    
    if (data) {
      body = JSON.stringify(data);
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(body);
    }
    
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(data); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function listCards() {
  const cards = await api('GET', `/boards/${CONFIG.boardId}/cards`);
  const lists = await api('GET', `/boards/${CONFIG.boardId}/lists`);
  
  const listMap = Object.fromEntries(lists.map(l => [l.id, l.name]));
  
  console.log('\n📋 AGT Storyblok Migration - Cards\n');
  
  for (const list of lists) {
    const listCards = cards.filter(c => c.idList === list.id);
    console.log(`${list.name} (${listCards.length})`);
    listCards.forEach(c => console.log(`  - [${c.shortLink}] ${c.name}`));
    console.log('');
  }
}

async function addCard(name, desc = '') {
  const card = await api('POST', '/cards', {
    idList: CONFIG.lists.backlog,
    name,
    desc
  });
  console.log(`✅ Created: ${card.name} (${card.shortUrl})`);
}

async function moveCard(cardId, listName) {
  const listId = CONFIG.lists[listName];
  if (!listId) {
    console.log('❌ Unknown list. Use: backlog, progress, review, done');
    return;
  }
  await api('PUT', `/cards/${cardId}`, { idList: listId });
  console.log(`✅ Moved to ${listName}`);
}

const [,, cmd, ...args] = process.argv;

switch (cmd) {
  case 'list': listCards(); break;
  case 'add': addCard(args[0], args[1]); break;
  case 'move': moveCard(args[0], args[1]); break;
  default:
    console.log('Usage: node trello.js [list|add|move]');
}
