export const URL = {
  "development": {
    "http": import.meta.env.VITE_LOCAL_BACKEND_URL
  },
  "staging": {
    "http": import.meta.env.VITE_STAGING_BACKEND_URL
  },
  "prod": {
    "http": import.meta.env.VITE_PROD_BACKEND_URL
  }
}

export const HOSTURL = {
  "development": {
    "http": import.meta.env.VITE_LOCAL_URL
  },
  "staging": {
    "http": import.meta.env.VITE_STAGING_URL
  },
  "prod": {
    "http": import.meta.env.VITE_PROD_URL
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
