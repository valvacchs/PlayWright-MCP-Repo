export const environments = {
  qa: {
    baseUrl: 'https://myaccount-ui.qa.cinchhs.com/',
    testrailUrl: 'https://cchs.testrail.com',
    apiTimeout: 30000,
  },
  staging: {
    baseUrl: 'https://myaccount-ui.staging.cinchhs.com/',
    testrailUrl: 'https://cchs.testrail.com',
    apiTimeout: 30000,
  },
  production: {
    baseUrl: 'https://myaccount-ui.cinchhs.com/',
    testrailUrl: 'https://cchs.testrail.com',
    apiTimeout: 30000,
  },
};

export type Environment = keyof typeof environments;

export function getEnvironment(): Environment {
  const env = (process.env.TEST_ENV || 'qa') as Environment;
  if (!(env in environments)) {
    throw new Error(`Unknown environment: ${env}`);
  }
  return env;
}

export function getConfig() {
  return environments[getEnvironment()];
}
