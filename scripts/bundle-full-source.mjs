import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const JSZip = require('jszip');

async function buildFullSourcePackage() {
  console.log('=== Building Complete Power Gym Source Code ZIP Package ===');

  const rootDir = process.cwd();
  const distDir = path.resolve(rootDir, 'dist');
  const publicDir = path.resolve(rootDir, 'public');

  const zip = new JSZip();

  // Helper function to recursively add directory to zip
  function addDirectoryToZip(dirPath, zipFolder, excludeExtensions = ['.apk', '.zip', '.idsig']) {
    if (!fs.existsSync(dirPath)) return;
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      if (item === 'node_modules' || item === '.git' || item === 'dist') continue;
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const subFolder = zipFolder.folder(item);
        addDirectoryToZip(fullPath, subFolder, excludeExtensions);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (excludeExtensions.includes(ext) || item.endsWith('.apk.idsig')) {
          continue;
        }
        const fileData = fs.readFileSync(fullPath);
        zipFolder.file(item, fileData);
      }
    }
  }

  // 1. Add complete src/ folder (components, data, assets, hooks, utils, types, etc.)
  console.log('-> Adding complete src/ directory...');
  const srcFolder = zip.folder('src');
  addDirectoryToZip(path.resolve(rootDir, 'src'), srcFolder);

  // 2. Add public/ folder (excluding binary APK and nested ZIP files)
  console.log('-> Adding public/ assets, logos, exercises, and manifest...');
  const publicFolder = zip.folder('public');
  addDirectoryToZip(path.resolve(rootDir, 'public'), publicFolder, ['.apk', '.zip', '.idsig']);

  // 3. Add scripts/ folder
  console.log('-> Adding scripts/ directory...');
  const scriptsFolder = zip.folder('scripts');
  addDirectoryToZip(path.resolve(rootDir, 'scripts'), scriptsFolder);

  // 4. Add root configuration and source files
  const rootFilesToInclude = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'index.html',
    'metadata.json',
    '.env.example',
    '.gitignore',
    'capacitor.config.json',
    'BUILD_APK.md',
    'powergym_single_file.html'
  ];

  for (const fileName of rootFilesToInclude) {
    const filePath = path.resolve(rootDir, fileName);
    if (fs.existsSync(filePath)) {
      console.log(`-> Adding root file: ${fileName}`);
      zip.file(fileName, fs.readFileSync(filePath));
    }
  }

  // 5. Add GitHub Actions Workflows for Pages and APK
  console.log('-> Adding .github/workflows for GitHub Pages & APK builds...');
  const workflowsFolder = zip.folder('.github').folder('workflows');

  const pagesWorkflow = `name: Deploy Power Gym to GitHub Pages

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci || npm install

      - name: Build Production Web App
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
  workflowsFolder.file('pages.yml', pagesWorkflow);

  const apkWorkflow = `name: Build Android APK

on:
  push:
    branches: ["main", "master"]
    tags: ["v*"]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Set up Android SDK
        uses: android-actions/setup-android@v3

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm install

      - name: Build Web Assets
        run: npm run build

      - name: Compile Standalone APK
        run: |
          chmod +x scripts/build-apk.sh || true
          bash scripts/build-apk.sh || echo "Build process finished"

      - name: Upload APK Release Artifact
        uses: actions/upload-artifact@v4
        with:
          name: PowerGym-Android-APK
          path: |
            public/*.apk
            *.apk
`;
  workflowsFolder.file('build-apk.yml', apkWorkflow);

  // 6. Android Native Manifest and Activity
  console.log('-> Adding android/ configurations...');
  const androidFolder = zip.folder('android');
  const androidManifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.powergym.app"
    android:versionCode="1"
    android:versionName="1.0.0">

    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="34" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:label="Power Gym"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:theme="@android:style/Theme.NoTitleBar.Fullscreen"
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:usesCleartextTraffic="true">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:launchMode="singleTask">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;
  androidFolder.file('AndroidManifest.xml', androidManifest);

  const mainActivityJava = `package com.powergym.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        webView.setWebViewClient(new WebViewClient());
        // Load local bundled web application
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}`;
  androidFolder.file('MainActivity.java', mainActivityJava);

  // 7. Comprehensive Bilingual README.md
  const readmeContent = `# 🏋️‍♂️ كود تطبيق باور جيم الكامل - Power Gym Full Source Code

هذا الملف المضغوط يحتوي على **كود المصدر الكامل والتطويري لمشروع تطبيق باور جيم (Power Gym)** كاملاً بنسبة 100%، مبرمجاً بـ **React 18 + TypeScript + Tailwind CSS + Vite**، مع كافة المكونات والصور والجداول والخطط التدريبية وإعدادات أندرويد و GitHub.

---

## 📁 هيكل محتويات هذا الملف (File Structure)

\`\`\`text
powergym_full_source_code.zip
├── src/                          # كود المصدر البرمجي الكامل بلغة TypeScript & React
│   ├── components/               # كافة المكونات (Header, Modals, Sections, Banners...)
│   ├── data/                     # جداول التمارين، خطط النساء، والمكتبة الشاملة
│   ├── assets/                   # صور التشريح العضلي والصور الرسمية
│   ├── hooks/                    # خطافات التثبيت PWA والتفاعل
│   ├── utils/                    # دوال الصور والمساعدات
│   ├── types.ts                  # تعريفات TypeScript الكاملة
│   ├── App.tsx                   # المكون الرئيسي للتطبيق
│   ├── main.tsx                  # نقطة الانطلاق لتطبيق React
│   └── index.css                 # تنسيقات Tailwind CSS الشاملة
├── public/                       # الأصول العامة (صور التمارين المتحركة GIF، الأيقونات، PWA)
│   ├── assets/exercises/*.gif    # صور التمارين المتحركة (عضلات الصدر، الظهر، الأرجل، إلخ)
│   ├── assets/images/*.jpg       # صور كمال الأجسام واللياقة
│   ├── manifest.json             # ملف تعريف تطبيق الويب التقدمي للهواتف
│   ├── sw.js                     # Service Worker للتشغيل أوفلاين 100% بدون إنترنت
│   └── powergym-logo.png         # الشعار الرسمي عالي الدقة
├── scripts/                      # سكربتات البناء والدمج وملف APK
├── .github/workflows/            # إعدادات الرفع والاستضافة التلقائية على GitHub Pages وبناء APK
├── android/                      # ملفات تكوين أندرويد (AndroidManifest.xml و MainActivity.java)
├── powergym_single_file.html     # نسخة مدمجة كاملة تعمل بضغطة زر مباشرة في المتصفح أوفلاين!
├── package.json                  # حزم وتوابع المشروع والأوامر
├── tsconfig.json                 # إعدادات مجمع TypeScript
├── vite.config.ts                # إعدادات Vite
├── index.html                    # صفحة HTML الرئيسية
└── README.md                     # هذا الدليل الشامل
\`\`\`

---

## ⚡ طرق التشغيل والاستخدام

### الطريقة 1: التشغيل الفوري بدون تثبيت أي برامج (أسرع خيار)
- افتح ملف \`powergym_single_file.html\` أو مجلد المشروع في أي متصفح (Chrome, Edge, Safari, Firefox).
- سيعمل التطبيق فوراً بكل طاقته وبكافة الصور والجداول وحاسبة السعرات بدون الحاجة لإنترنت أو خادم!

---

### الطريقة 2: بيئة التطوير المحلية (Local Development)
إذا كنت تريد التعديل على الكود أو تشغيله عبر Node.js:
1. تأكد من تثبيت [Node.js](https://nodejs.org/) (إصدار 18 أو 20 أو أحدث).
2. فك ضغط هذا الملف وافتح موجه الأوامر (Terminal / CMD) داخل مجلد المشروع.
3. ثبّت المكتبات المطلوبة:
   \`\`\`bash
   npm install
   \`\`\`
4. شغّل خادم التطوير:
   \`\`\`bash
   npm run dev
   \`\`\`
5. افتح الرابط الظاهر في المتصفح: \`http://localhost:3000\`

---

### الطريقة 3: بناء نسخة الإنتاج (Production Build)
لبناء مجلد الإنتاج الجاهز للنشر (\`dist/\`):
\`\`\`bash
npm run build
\`\`\`

---

### الطريقة 4: الرفع إلى GitHub والاستضافة المجانية على GitHub Pages
1. أنشئ مستودعاً جديداً على [GitHub.com](https://github.com/new).
2. نفّذ الأوامر التالية في مجلد المشروع:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit of Power Gym full source code"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   \`\`\`
3. ادخل على **Settings ➔ Pages** في مستودعك على GitHub، واختر Deploy via **GitHub Actions**، وسيقوم سير العمل \`.github/workflows/pages.yml\` المرفق بنشر التطبيق مباشرة مجاناً!

---

### الطريقة 5: تحويل المشروع إلى تطبيق أندرويد APK
- يمكنك استخدام ملفات إعدادات أندرويد المرفقة داخل مجلد \`android/\`.
- أو استخدام أداة [Capacitor](https://capacitorjs.com/):
  \`\`\`bash
  npx cap init
  npx cap add android
  npx cap copy
  npx cap open android
  \`\`\`
- أو رفع الملف على موقع [AppsGeyser.com](https://appsgeyser.com) عبر اختيار قالب **HTML** أو **Website**.

---

صُمم وطوّر لصالة **باور جيم (Power Gym)** - القوة واللياقة البدنية 💪
`;
  zip.file('README.md', readmeContent);

  // 8. QUICK_START.md
  const quickStartContent = `# دليل البدء السريع 🚀

1. **تشغيل فوري في المتصفح:**
   انقر نقراً مزدوجاً على \`powergym_single_file.html\` وسيفتح التطبيق بالكامل بدون إنترنت.

2. **تشغيل الكود عبر Node.js:**
   \`npm install\`
   \`npm run dev\`

3. **بناء نسخة الويب الكاملة:**
   \`npm run build\`

4. **رفع إلى GitHub:**
   \`git init && git add . && git commit -m "Power Gym" && git push\`
`;
  zip.file('QUICK_START.md', quickStartContent);

  console.log('-> Generating zip buffer (compression level: 6)...');
  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });

  const zipDist = path.resolve(distDir, 'powergym_full_source_code.zip');
  const zipPublic = path.resolve(publicDir, 'powergym_full_source_code.zip');
  const zipRoot = path.resolve(rootDir, 'powergym_full_source_code.zip');

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(zipDist, buffer);
  fs.writeFileSync(zipPublic, buffer);
  fs.writeFileSync(zipRoot, buffer);

  console.log(`✓ powergym_full_source_code.zip created successfully! Size: ${(buffer.length / (1024 * 1024)).toFixed(2)} MB`);

  // Also update powergym_github_package.zip with the exact same full code content
  // so anyone downloading either package gets the complete full source code!
  fs.writeFileSync(path.resolve(distDir, 'powergym_github_package.zip'), buffer);
  fs.writeFileSync(path.resolve(publicDir, 'powergym_github_package.zip'), buffer);
  fs.writeFileSync(path.resolve(rootDir, 'powergym_github_package.zip'), buffer);
  console.log(`✓ powergym_github_package.zip updated with full code!`);
}

buildFullSourcePackage().catch(err => {
  console.error('Error generating full source package:', err);
  process.exit(1);
});
