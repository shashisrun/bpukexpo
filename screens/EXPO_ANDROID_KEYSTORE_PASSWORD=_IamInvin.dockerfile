EXPO_ANDROID_KEYSTORE_PASSWORD="IamInvincible" \
EXPO_ANDROID_KEY_PASSWORD="IamInvincible" \
turtle build:android \
  --type apk \
  --keystore-path ./keystore.jks \
  --keystore-alias "KEY_ALIAS" \
  --allow-non-https-public-url \
  --public-url http://127.0.0.1:8000/android-index.json