#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'assets', 'data', 'menu.json');
const backup = file + '.bak';

const data = fs.readFileSync(file, 'utf8');
fs.writeFileSync(backup, data);

let obj;
try {
  obj = JSON.parse(data);
} catch (err) {
  console.error('Failed to parse JSON:', err.message);
  process.exit(1);
}

let count = 0;
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function replaceIds(node) {
  if (Array.isArray(node)) {
    node.forEach(replaceIds);
    return;
  }
  if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) {
      if (key === 'id') {
        node[key] = uuidv4();
        count++;
      } else {
        replaceIds(node[key]);
      }
    }
  }
}

replaceIds(obj);

fs.writeFileSync(file, JSON.stringify(obj, null, 4) + '\n', 'utf8');
console.log(`Replaced ${count} id fields and wrote backup to ${backup}`);
