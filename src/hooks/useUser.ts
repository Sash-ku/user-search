import { useQuery } from '@tanstack/react-query';
import { fetchUser, GitHubApiError } from '../api/fetchUser';
import { User } from '../  types/User';

export function useUser(username: string | null) {
  return useQuery<User, GitHubApiError>({
    queryKey: ['github-user', username],
    queryFn: () => {
      if (!username) {
        throw new GitHubApiError('Имя пользователя не указано', 400, 'UNKNOWN');
      }
      return fetchUser(username);
    },
    enabled: !!username,
    retry: (failureCount, error) => {
      // Не ретраим, если пользователь не найден или rate limit
      if (error.code === 'NOT_FOUND' || error.code === 'RATE_LIMIT') {
        return false;
      }
      return failureCount < 3;
    },
  });
}