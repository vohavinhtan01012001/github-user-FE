export const ERROR_CODES = {
  ERR_500: 'ERR_500',
} as const;

export const VALIDATION_RULES = {
  phone: { length: 10, errorMessage: "Phone number must be 10 digits" },
  code: { length: 6, errorMessage: "Access code must be 6 digits" }
} as const; 

export const GITHUB_SEARCH = {
  DEFAULT_PAGE_SIZE: 5,
  DEFAULT_PAGE: 1,
  MAX_RESULTS: 1000,
} as const;


export const PROFILE_MODAL = {
  PAGE_SIZE: 9,
  DEFAULT_PAGE: 1,
} as const;
