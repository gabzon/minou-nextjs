import type { NextConfig } from "next";

function validateEnv() {
  if (process.env.NODE_ENV === 'production') {
    const required = [
      'NEXT_PUBLIC_SANITY_PROJECT_ID',
      'NEXT_PUBLIC_SANITY_DATASET',
    ];
    
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.error('❌ Missing required environment variables:');
      console.error(missing.map(key => `  - ${key}`).join('\n'));
      console.error('\nPlease set these in your environment or .env file.');
      throw new Error('Missing required environment variables');
    }
    
    console.log('✅ Environment variables validated');
  }
}

validateEnv();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
