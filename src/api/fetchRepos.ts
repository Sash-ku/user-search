import { Repo } from '../types/Repo';
import { githubRequest } from './gitHubClient';

export type RepoSort = 'updated' | 'created' | 'pushed' | 'full_name';
export type RepoDirection = 'desc' | 'asc';

interface FetchReposParams {
    username: string;
    page: number;
    perPage?: number;
    sort?: RepoSort;
    direction?: RepoDirection;
}

export function fetchRepos({
    username,
    page,
    perPage = 20,
    sort = 'updated',
    direction = 'desc',
}: FetchReposParams): Promise<Repo[]> {
    const params = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
        sort,
        direction,
    });
    return githubRequest<Repo[]>(`/users/${username}/repos?${params}`);
}