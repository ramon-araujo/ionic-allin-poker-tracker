import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.apk.AllinPokerTracker',
  appName: 'allin-poker-tracker',
  webDir: 'www',
  android: {    
    overrideUserAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G975F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 Mobile Safari/537.36 MyCustomUserAgentString',
  },
};

export default config;
