export const URL = {
  "development": {
    "http": import.meta.env.VITE_LOCAL_BACKEND_URL || "https://kq0nd3bt-8000.inc1.devtunnels.ms/"
  },
  "staging": {
    "http": import.meta.env.VITE_STAGING_BACKEND_URL || "https://uatapi.valasys.ai"
  },
  "prod": {
    "http": import.meta.env.VITE_PROD_BACKEND_URL || "https://api.valasys.ai"
  }
}

export const HOSTURL = {
  "development": {
    "http": import.meta.env.VITE_LOCAL_URL || "http://localhost:3000"
  },
  "staging": {
    "http": import.meta.env.VITE_STAGING_URL || "https://uat.valasys.ai"
  },
  "prod": {
    "http": import.meta.env.VITE_PROD_URL || "https://valasys.ai"
  }
}

export const BUILD_ENV = parseInt(import.meta.env.VITE_BUILD_ENV || "0");

const baseUrls = {
  0: HOSTURL.development.http,
  1: HOSTURL.staging.http,
  2: HOSTURL.prod.http,
};

export const hostURl = baseUrls[BUILD_ENV];

const baseBackendUrls = {
  0: URL.development.http,
  1: URL.staging.http,
  2: URL.prod.http,
};

export const hostBackURl = baseBackendUrls[BUILD_ENV];
