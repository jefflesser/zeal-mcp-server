import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the paths.js file
const pathsFile = path.join(__dirname, 'tools', 'paths.js');
const pathsContent = fs.readFileSync(pathsFile, 'utf8');

// Extract tool paths using regex
const toolPathsMatch = pathsContent.match(/\[([^\]]+)\]/s);
if (!toolPathsMatch) {
  console.error('Could not find toolPaths array');
  process.exit(1);
}

// Parse the paths
const toolPaths = toolPathsMatch[1]
  .split(',')
  .map(p => p.trim().replace(/['"]/g, ''))
  .filter(Boolean);

console.log(`Found ${toolPaths.length} tool files to update...`);

// Update each tool file
let updatedCount = 0;
for (const toolPath of toolPaths) {
  const fullPath = path.join(__dirname, 'tools', toolPath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${toolPath} - file not found`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace the old environment variable with the new one
  const oldPattern = /process\.env\.ZEAL_PUBLIC_API_API_KEY/g;
  const newValue = 'process.env.ZEAL_API_KEY';
  
  if (content.includes('ZEAL_PUBLIC_API_API_KEY')) {
    content = content.replace(oldPattern, newValue);
    fs.writeFileSync(fullPath, content, 'utf8');
    updatedCount++;
    console.log(`✅ Updated ${toolPath}`);
  }
}

console.log(`\n✨ Updated ${updatedCount} tool files!`);
console.log('All tools now use process.env.ZEAL_API_KEY');
