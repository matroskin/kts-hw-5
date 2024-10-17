import { RepoOwnerApi, RepoOwnerModel, normalizeRepoOwner } from 'store/models/github';

export interface RepoListItemApi {
  id: number;
  html_url: string;
  name: string;
  description: string;
  stargazers_count: number;
  pushed_at: string;
  owner: RepoOwnerApi;
}

export interface RepoListItemModel {
  id: number;
  htmlUrl: string;
  name: string;
  description: string;
  stargazersCount: number;
  pushedAt: Date;
  owner: RepoOwnerModel;
}

export const normalizeRepoListItem = (from: RepoListItemApi): RepoListItemModel => ({
  id: from.id,
  htmlUrl: from.html_url,
  name: from.name,
  description: from.description,
  stargazersCount: from.stargazers_count,
  pushedAt: new Date(from.pushed_at),
  owner: normalizeRepoOwner(from.owner),
});
