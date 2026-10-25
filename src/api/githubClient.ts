import { GitHubApiError } from './errors/GitHubApiError';

const GITHUB_API_BASE = 'https://api.github.com';

export async function githubRequest<T>(endpoint: string): Promise<T> {
    let response: Response;
    
    try {
        response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
            headers: {
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
    } catch (error) {
        throw new GitHubApiError(
            'Нет соединения с интернетом или GitHub недоступен',
            0,
            'NETWORK'
        );
    }

    if (!response.ok) {
        if (response.status === 404) {
            throw new GitHubApiError('Ресурс не найден', 404, 'NOT_FOUND');
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