import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const JSZip = require('jszip');

const distDir = path.resolve(process.cwd(), 'dist');
const htmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(htmlPath)) {
  console.error('dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf-8');

// The public hosted URL for remote assets fallback in AppsGeyser
const PROD_HOST = 'https://ais-pre-3m2lygdv4xnzz5bz7rmwwr-39187155379.europe-west2.run.app';

// 1. Find and inline CSS
const assetsDir = path.join(distDir, 'assets');
const assetFiles = fs.readdirSync(assetsDir);

const cssFile = assetFiles.find(f => f.endsWith('.css'));
const jsFile = assetFiles.find(f => f.endsWith('.js') && f.startsWith('index-'));

if (cssFile) {
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
  // Remove existing link tag and inject style tag
  const cssRegex = new RegExp(`<link[^>]*href="[^"]*${cssFile}"[^>]*>`, 'i');
  if (cssRegex.test(html)) {
    html = html.replace(cssRegex, () => `<style>\n${cssContent}\n</style>`);
  } else {
    html = html.replace('</head>', () => `<style>\n${cssContent}\n</style>\n</head>`);
  }
  console.log(`Inlined CSS: ${cssFile} (${Math.round(cssContent.length / 1024)} KB)`);
}

// 2. Remove modulepreload links so AppsGeyser does not make failed network calls
html = html.replace(/<link[^>]*rel=["']modulepreload["'][^>]*>/gi, '');

// 3. Make sure service worker only attempts registration on http/https
html = html.replace(
  /if\s*\(\s*['"]serviceWorker['"]\s*in\s*navigator\s*\)/g,
  "if (window.location.protocol.startsWith('http') && 'serviceWorker' in navigator)"
);

// 4. Process JavaScript bundle
if (jsFile) {
  let jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');

  // For AppsGeyser offline mode, convert root relative asset paths to full HTTPS URLs
  // e.g. "/assets/images/..." -> "https://.../assets/images/..."
  jsContent = jsContent.replace(/["']\/assets\/(images|exercises)\/([^"']+)["']/g, (match, folder, filename) => {
    return `"${PROD_HOST}/assets/${folder}/${filename}"`;
  });

  // Remove existing script tag and inject inline standard script
  // IMPORTANT: We use () => to prevent JavaScript replace() from interpreting '$&', '$`', etc. in jsContent
  const scriptRegex = new RegExp(`<script[^>]*src="[^"]*${jsFile}"[^>]*></script>`, 'i');
  if (scriptRegex.test(html)) {
    html = html.replace(scriptRegex, () => `<script>\n${jsContent}\n</script>`);
  } else {
    html = html.replace('</body>', () => `<script>\n${jsContent}\n</script>\n</body>`);
  }
  console.log(`Inlined JS safely: ${jsFile} (${Math.round(jsContent.length / 1024)} KB)`);
}

// 5. Convert icon and logo assets to data URI or inline
const logoPath = path.resolve(process.cwd(), 'public/powergym-logo.png');
if (fs.existsSync(logoPath)) {
  const logoData = fs.readFileSync(logoPath);
  const base64Logo = `data:image/png;base64,${logoData.toString('base64')}`;
  html = html.replace(/src=["']\/powergym-logo\.png["']/g, `src="${base64Logo}"`);
  html = html.replace(/href=["']\/powergym-logo\.png["']/g, `href="${base64Logo}"`);
  console.log('Inlined powergym-logo.png as Base64 data URI');
}

const iconPath = path.resolve(process.cwd(), 'public/icon.svg');
let iconDataUri = '';
if (fs.existsSync(iconPath)) {
  const iconSvg = fs.readFileSync(iconPath, 'utf-8');
  const base64Icon = Buffer.from(iconSvg).toString('base64');
  iconDataUri = `data:image/svg+xml;base64,${base64Icon}`;
  html = html.replace(/href=["']\/icon\.svg["']/g, `href="${iconDataUri}"`);
}

const pwa192Path = path.resolve(process.cwd(), 'public/pwa-192x192.png');
if (fs.existsSync(pwa192Path)) {
  const pwa192Data = fs.readFileSync(pwa192Path);
  const base64Pwa = `data:image/png;base64,${pwa192Data.toString('base64')}`;
  html = html.replace(/href=["']\/pwa-192x192\.png["']/g, `href="${base64Pwa}"`);
}

// Output destinations for single-file HTML
const outDist = path.join(distDir, 'powergym_single_file.html');
const outPublic = path.resolve(process.cwd(), 'public/powergym_single_file.html');
const outRoot = path.resolve(process.cwd(), 'powergym_single_file.html');

fs.writeFileSync(outDist, html, 'utf-8');
fs.writeFileSync(outPublic, html, 'utf-8');
fs.writeFileSync(outRoot, html, 'utf-8');

console.log(`Successfully generated single-file app:`);
console.log(`- ${outDist} (${Math.round(html.length / 1024)} KB)`);
console.log(`- ${outPublic}`);
console.log(`- ${outRoot}`);

// 6. Generate AppsGeyser Ready ZIP Archive with index.html at root
const appsGeyserZipPathDist = path.join(distDir, 'appsgeyser_powergym.zip');
const appsGeyserZipPathPublic = path.resolve(process.cwd(), 'public/appsgeyser_powergym.zip');
const appsGeyserZipPathRoot = path.resolve(process.cwd(), 'appsgeyser_powergym.zip');

async function createAppsGeyserZip() {
  const zip = new JSZip();

  // AppsGeyser requires the entry file to be named index.html in the root of the ZIP
  zip.file('index.html', html);

  if (fs.existsSync(logoPath)) {
    zip.file('powergym-logo.png', fs.readFileSync(logoPath));
  }

  if (fs.existsSync(pwa192Path)) {
    zip.file('pwa-192x192.png', fs.readFileSync(pwa192Path));
  }

  const pwa512Path = path.resolve(process.cwd(), 'public/pwa-512x512.png');
  if (fs.existsSync(pwa512Path)) {
    zip.file('pwa-512x512.png', fs.readFileSync(pwa512Path));
  }

  if (fs.existsSync(iconPath)) {
    zip.file('icon.svg', fs.readFileSync(iconPath));
  }

  const manifestPath = path.resolve(process.cwd(), 'public/manifest.json');
  if (fs.existsSync(manifestPath)) {
    zip.file('manifest.json', fs.readFileSync(manifestPath));
  }

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  fs.writeFileSync(appsGeyserZipPathDist, buffer);
  fs.writeFileSync(appsGeyserZipPathPublic, buffer);
  fs.writeFileSync(appsGeyserZipPathRoot, buffer);

  console.log(`AppsGeyser ZIP generated: ${Math.round(buffer.length / 1024)} KB`);
  console.log(`- ${appsGeyserZipPathDist}`);
  console.log(`- ${appsGeyserZipPathPublic}`);
  console.log(`- ${appsGeyserZipPathRoot}`);
}

createAppsGeyserZip().catch(console.error);
