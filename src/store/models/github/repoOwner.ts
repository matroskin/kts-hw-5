export interface RepoOwnerApi {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
}

export interface RepoOwnerModel {
  id: number;
  login: string;
  htmlUrl: string;
  avatarUrl: string;
}

export const normalizeRepoOwner = (from: RepoOwnerApi): RepoOwnerModel => ({
  id: from.id,
  login: from.login,
  htmlUrl: from.html_url,
  avatarUrl: from.avatar_url,
});
