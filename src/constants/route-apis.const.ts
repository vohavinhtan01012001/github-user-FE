
export const AUTH_APIS = {
  CREATE_ACCESS_CODE: `/CreateNewAccessCode`,
  VALIDATE_ACCESS_CODE: `/ValidateAccessCode`,
  GET_USER_PROFILE: `/getUserProfile`
} as const;

export const GITHUB_APIS = {
  SEARCH_USERS: `/searchGithubUsers`,
  GET_USER_PROFILE: `/findGithubUserProfile`,
  LIKE_USER: `/likeGithubUser`
} as const;

