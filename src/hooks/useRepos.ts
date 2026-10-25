import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRepos, RepoSort, RepoDirection } from '../api/fetchRepos';
import { GitHubApiError } from '../api/fetchUser';
import { Repo } from '../types/Repo';

interface UseReposParams {
    username: string | null;
    sort?: RepoSort;
    direction?: RepoDirection;
}

export function useRepos({ username, sort = 'updated', direction = 'desc' }: UseReposParams) {
    return useInfiniteQuery<Repo[], GitHubApiError>({
        queryKey: ['github-repos', username, sort, direction],
        queryFn: ({ pageParam = 1 }) => {
            if (!username) {
                throw new GitHubApiError('Имя пользователя не указано', 400, 'UNKNOWN');
            }
            return fetchRepos({
                username,
                page: pageParam as number,
                sort,
                direction,
            });
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 20) return undefined;
            return allPages.length + 1;
        },
        enabled: !!username,
        staleTime: 5 * 60 * 1000,
    });
}