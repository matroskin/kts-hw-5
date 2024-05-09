export interface RepoContributorApi {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
}

export interface RepoContributorModel {
  id: number;
  login: string;
  htmlUrl: string;
  avatarUrl: string;
}

export const normalizeRepoContributor = (from: RepoContributorApi): RepoContributorModel => ({
  id: from.id,
  login: from.login,
  htmlUrl: from.html_url,
  avatarUrl: from.avatar_url,
});
