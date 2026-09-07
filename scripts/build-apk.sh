#!/bin/bash
set -e

echo "=== Power Gym Android APK Builder ==="

REPO_ROOT="$(pwd)"
BUILD_DIR="/tmp/powergym-android-build"
OUTPUT_APK="$REPO_ROOT/public/powergym-debug.apk"
OUTPUT_APK_ROOT="$REPO_ROOT/powergym-debug.apk"
DIST_APK="$REPO_ROOT/dist/powergym-debug.apk"

mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

# 1. Ensure tools are available
which javac aapt zipalign apksigner keytool > /dev/null || {
  echo "Error: Required tools (javac, aapt, zipalign, apksigner, keytool) not found in PATH"
  exit 1
}

echo "[1/8] Setting up build directories..."
rm -rf bin gen obj assets res src
mkdir -p bin gen/com/powergym/app obj assets res/values res/mipmap-mdpi res/mipmap-hdpi res/mipmap-xhdpi res/mipmap-xxhdpi src/com/powergym/app

# 2. Download android.jar and r8.jar if needed
TOOLS_DIR="/tmp/android-tools"
mkdir -p "$TOOLS_DIR"

if [ ! -f "$TOOLS_DIR/android.jar" ]; then
  echo "[2/8] Downloading android.jar (SDK platform 30)..."
  curl -sSL "https://raw.githubusercontent.com/Sable/android-platforms/master/android-30/android.jar" -o "$TOOLS_DIR/android.jar"
fi

if [ ! -f "$TOOLS_DIR/r8.jar" ]; then
  echo "[2/8] Downloading r8.jar (D8 dex compiler)..."
  curl -sSL "https://dl.google.com/dl/android/maven2/com/android/tools/r8/8.2.33/r8-8.2.33.jar" -o "$TOOLS_DIR/r8.jar"
fi

ANDROID_JAR="$TOOLS_DIR/android.jar"
R8_JAR="$TOOLS_DIR/r8.jar"

# 3. Create AndroidManifest.xml
echo "[3/8] Generating AndroidManifest.xml and resources..."
cat << 'EOF' > AndroidManifest.xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.powergym.app"
    android:versionCode="1"
    android:versionName="1.0.0">

    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="33" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:hardwareAccelerated="true"
        android:allowBackup="true"
        android:usesCleartextTraffic="true"
        android:theme="@android:style/Theme.NoTitleBar">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="@string/app_name"
            android:configChanges="orientation|keyboardHidden|screenSize|screenLayout|smallestScreenSize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
EOF

# 4. Create resources
cat << 'EOF' > res/values/strings.xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Power Gym</string>
</resources>
EOF

# Generate all mipmap launcher icon PNGs
python3 "$REPO_ROOT/scripts/generate-icon.py" "$BUILD_DIR/res"

# 5. Create MainActivity.java
echo "[4/8] Creating Java MainActivity with modern WebView..."
cat << 'EOF' > src/com/powergym/app/MainActivity.java
package com.powergym.app;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.graphics.Color;

public class MainActivity extends Activity {
    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Immersive full-screen experience
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
            WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED
        );

        mWebView = new WebView(this);
        mWebView.setBackgroundColor(Color.parseColor("#0a0a0a"));

        WebSettings ws = mWebView.getSettings();
        ws.setJavaScriptEnabled(true);
        ws.setDomStorageEnabled(true);
        ws.setDatabaseEnabled(true);
        ws.setAllowFileAccess(true);
        ws.setAllowContentAccess(true);
        ws.setAllowFileAccessFromFileURLs(true);
        ws.setAllowUniversalAccessFromFileURLs(true);
        ws.setLoadWithOverviewMode(true);
        ws.setUseWideViewPort(true);
        ws.setBuiltInZoomControls(false);
        ws.setDisplayZoomControls(false);
        ws.setMediaPlaybackRequiresUserGesture(false);

        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith("file://") || url.startsWith("http://") || url.startsWith("https://")) {
                    view.loadUrl(url);
                    return true;
                }
                return false;
            }
        });

        mWebView.setWebChromeClient(new WebChromeClient());

        // Load the offline bundled single-page app
        mWebView.loadUrl("file:///android_asset/index.html");

        setContentView(mWebView);
    }

    @Override
    public void onBackPressed() {
        if (mWebView != null && mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (mWebView != null) {
            mWebView.onResume();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (mWebView != null) {
            mWebView.onPause();
        }
    }

    @Override
    protected void onDestroy() {
        if (mWebView != null) {
            mWebView.destroy();
        }
        super.onDestroy();
    }
}
EOF

# 6. Copy web app assets into Android assets
echo "[5/8] Packaging HTML, JS, CSS, exercises & images into Android assets..."
cp "$REPO_ROOT/public/powergym_single_file.html" assets/index.html
if [ -d "$REPO_ROOT/public/assets" ]; then
  cp -r "$REPO_ROOT/public/assets" assets/
fi

# 7. Compile Android resources (generate R.java)
echo "[6/8] Compiling resources with aapt..."
aapt package -m -J gen -M AndroidManifest.xml -S res -I "$ANDROID_JAR"

# Compile Java source code
echo "[6/8] Compiling Java classes with javac..."
javac -encoding UTF-8 -cp "$ANDROID_JAR" -d obj gen/com/powergym/app/R.java src/com/powergym/app/MainActivity.java

# Convert Java .class files to Dalvik bytecode (classes.dex) using D8
echo "[6/8] Generating classes.dex with D8..."
java -cp "$R8_JAR" com.android.tools.r8.D8 --output . --lib "$ANDROID_JAR" $(find obj -name "*.class")

# 8. Package initial APK
echo "[7/8] Packaging raw APK with aapt..."
aapt package -f -M AndroidManifest.xml -S res -A assets -I "$ANDROID_JAR" -F bin/app-unaligned.apk
aapt add bin/app-unaligned.apk classes.dex

# Zipalign the APK (4-byte alignment required by Android)
echo "[8/8] Aligning APK with zipalign..."
zipalign -f -p 4 bin/app-unaligned.apk bin/app-aligned.apk

# Generate debug keystore if not exists
KEYSTORE="$TOOLS_DIR/debug.keystore"
if [ ! -f "$KEYSTORE" ]; then
  keytool -genkey -v -keystore "$KEYSTORE" -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
fi

# Sign APK with apksigner (v1, v2, v3 schemes)
echo "[8/8] Signing debug APK with apksigner..."
apksigner sign --ks "$KEYSTORE" --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android --out "$OUTPUT_APK" bin/app-aligned.apk

# Verify APK signature
echo "Verifying APK..."
apksigner verify --verbose "$OUTPUT_APK"

# Copy to destinations
cp "$OUTPUT_APK" "$OUTPUT_APK_ROOT"
cp "$OUTPUT_APK" "$REPO_ROOT/app-debug.apk"
cp "$OUTPUT_APK" "$REPO_ROOT/public/app-debug.apk"
mkdir -p "$REPO_ROOT/dist"
cp "$OUTPUT_APK" "$DIST_APK"
cp "$OUTPUT_APK" "$REPO_ROOT/dist/app-debug.apk"

echo "=== SUCCESS! ==="
echo "Debug APK successfully created:"
ls -lh "$OUTPUT_APK"
ls -lh "$REPO_ROOT/app-debug.apk"
