export interface IGithubUser {
  id: string;
  login: string;
  avatar_url: string;
  html_url: string;
  followers_url: string;
  followers: number;
  repos_url: string;
  public_repos: number;
  liked: boolean;
}


export interface SearchGithubUsersResponse {
  items: IGithubUser[];
  total_count: number;
  current_page: number;
  per_page: number;
}
