import { User } from "../types/User";


const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public code: 'NOT_FOUND' | 'RATE_LIMIT' | 'NETWORK' | 'UNKNOWN'
    ) {
        super(message);
        this.name = 'GitHubApiError';
    }
}

export async function fetchUser(username: string): Promise<User> {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new GitHubApiError(
                `Пользователь "${username}" не найден`,
                404,
                'NOT_FOUND'
            );
        }

        if (response.status === 403) {
            throw new GitHubApiError(
                'Превышен лимит запросов к GitHub API. Попробуйте позже или используйте токен.',
                403,
                'RATE_LIMIT'
            );
        }

        throw new GitHubApiError(
            'Ошибка при обращении к GitHub API',
            response.status,
            'UNKNOWN'
        );
    }

    return response.json();
}