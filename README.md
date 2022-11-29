# Trinity Care

```bash
# Install Cordova and Node Dependencies
npm install

# Run in browser
npm run serve

# Compile assets
npm run build

# Install Plugins & Platforms
cordova prepare
cordova platform add android
cordova platform add ios

# Run into Android Phone
cordova run android
```

---

# Google Play Store Deployment

### Generating Key Store
```
# GENERATE KEY: keytool -genkey -v -keystore <keystoreName>.keystore -alias <Keystore AliasName> -keyalg <Key algorithm> -keysize <Key size> -validity <Key Validity in Days>
keytool -genkey -v -keystore trinitycare.keystore -alias trinitycare -keyalg RSA -keysize 2048 -validity 10000
```

### Get SHA1 or SHA256
```
keytool -list -v -keystore trinitycare.keystore -alias trinitycare
```

### Signing Apk for Deployment
```
# GENERATE UNSIGNED APK
cordova build android --release

# SIGN APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore trinitycare.keystore $(pwd)/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk trinitycare

# OPTIMIZE APK
~/android/sdk/build-tools/26.0.2/zipalign -v 4 $(pwd)/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk trinity-care.apk

---
# DEBUG SIGN APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore trinitycare.keystore $(pwd)/platforms/android/app/build/outputs/apk/debug/app-debug.apk trinitycare

# OPTIMIZE DEBUG APK
~/android/sdk/build-tools/26.0.2/zipalign -v 4 $(pwd)/platforms/android/app/build/outputs/apk/debug/app-debug.apk android-debug-trinitycare.apk
```

### Push Notifications
https://support.staffbase.com/hc/en-us/articles/115003458931-Creating-the-iOS-Distribution-Certificate

```
# Converting p12 to PEM
openssl pkcs12 -in path.p12 -out newfile.crt.pem -clcerts -nokeys
openssl pkcs12 -in path.p12 -out newfile.key.pem -nocerts -nodes
openssl pkcs12 -in path.p12 -out newfile.pem
openssl pkcs12 -in path.p12 -out newfile.crt.pem -clcerts -nokeys
```