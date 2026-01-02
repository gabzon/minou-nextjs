function validateEnv(vars: Record<string, string | undefined>, required: string[]) {
  const missing: string[] = [];
  
  for (const key of required) {
    if (!vars[key]) {
      missing.push(key);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  }
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value ?? defaultValue!;
}

export const env = {
  sanity: {
    projectId: getEnvVar('NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: getEnvVar('NEXT_PUBLIC_SANITY_DATASET'),
    apiVersion: getEnvVar('NEXT_PUBLIC_SANITY_API_VERSION', '2024-01-01'),
  },
};

validateEnv(process.env, [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
]);

export type Env = typeof env;
