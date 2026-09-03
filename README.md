# 🎂 Birthday Wishes Mobile App

A responsive, festive Birthday Wish mobile web application and Android APK built with HTML5, CSS3, and modern JavaScript. Features full-screen confetti animations, an interactive birthday cake with tap-to-extinguish candle physics, offline synthesized audio chime, and instant personalization.

Repository: [https://github.com/Prasert22042515/Birthday](https://github.com/Prasert22042515/Birthday)

---

## ✨ Features

- 📱 **Mobile-First Experience**: Designed with safe-area insets, responsive typography, and glassmorphism styling tailored for smartphones and tablets.
- 🎊 **Confetti Animations**: Multi-stage celebration effects (bursts, side cannons, firework showers, and emoji tap reactions) powered by canvas-confetti (bundled 100% offline).
- 🕯️ **Interactive Cake**: Tap the birthday candle to blow it out with realistic smoke animations, celebratory chime, and confetti explosion! Tap again to relight.
- 🎵 **Synthesized Birthday Chime**: Built using the Web Audio API to play celebratory chords and the "Happy Birthday" melody without external sound files or internet connection.
- ✏️ **Easy Personalization**: Simple customization via code or the built-in mobile modal dialog.
- 📦 **Automated APK Publishing**: GitHub Actions compiles and publishes the Android Debug APK to GitHub Releases on every push.

---

## 🎨 How to Personalize

Open `www/index.html` and look for the highlighted comments:

### 1. Page Title
```html
<!-- • You can also change the page title: -->
<title>Happy Birthday! 🎉</title>
```

### 2. Birthday Person's Name
```html
<!-- • Change this line to the birthday person's name: -->
<h1 class="birthday-name" id="birthdayName">Alex</h1>
```

### 3. Birthday Message
```html
<!-- • And replace the paragraph with your own birthday message: -->
<p class="birthday-message" id="birthdayMessage">
  Wishing you a day filled with boundless laughter, unforgettable memories, and all the happiness your heart can hold. May this year bring you closer to your biggest dreams! 🌟🎈
</p>
```

### 4. Dynamic Live Customization (No code needed!)
- **In-App**: Tap the ✏️ pencil icon in the top header to open the interactive customization dialog.
- **URL Parameters**: Open the web app with query parameters:
  `index.html?name=Sophia&title=Happy%20Birthday%20Sophia!&msg=Have%20an%20awesome%20day!`

---

## 📲 Download & Install the Debug APK

The Android Debug APK is automatically built and published via **GitHub Actions**:

1. Visit [GitHub Releases](https://github.com/Prasert22042515/Birthday/releases).
2. Download `birthday-wishes-debug.apk` directly to your Android device.
3. Open the APK and allow installation when prompted.

---

## 🛠️ Local Development & Building

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Android Studio](https://developer.android.com/studio) (for local APK compilation)

### Run locally in browser
You can test the app locally using any web server:
```bash
npx serve www
```

### Sync Web Assets to Android
```bash
npx cap sync android
```

### Build APK locally (with Android SDK & Java)
```bash
cd android
./gradlew assembleDebug
```
The resulting APK will be generated at:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📄 License
MIT License
