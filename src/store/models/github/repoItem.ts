import { RepoOwnerApi, RepoOwnerModel, normalizeRepoOwner } from 'store/models/github';

export interface RepoItemApi {
  id: number;
  name: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  subscribers_count: number;
  forks_count: number;
  owner: RepoOwnerApi;
}

export interface RepoItemModel {
  id: number;
  name: string;
  homepage: string;
  topics: string[];
  stargazersCount: number;
  subscribersCount: number;
  forksCount: number;
  owner: RepoOwnerModel;
}

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  name: from.name,
  homepage: from.homepage,
  topics: from.topics,
  stargazersCount: from.stargazers_count,
  subscribersCount: from.subscribers_count,
  forksCount: from.forks_count,
  owner: normalizeRepoOwner(from.owner),
});
