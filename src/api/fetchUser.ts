import { User } from '../types/User';
import { githubRequest } from './gitHubClient';

export async function fetchUser(username: string): Promise<User> {
    return githubRequest<User>(`/users/${username}`);
}

export { GitHubApiError } from './errors/GitHubApiError';