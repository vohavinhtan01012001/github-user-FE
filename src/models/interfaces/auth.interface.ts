import { IGithubUser } from "./github.interface";

export interface IUserProfile {
    phoneNumber: string;
    favorite_github_users: IGithubUser[];
}
