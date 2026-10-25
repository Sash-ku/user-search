type ErrorType = 'NOT_FOUND' | 'RATE_LIMIT' | 'NETWORK' | 'UNKNOWN';

export class GitHubApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public code: ErrorType,
    ) {
        super(message);
        this.name = 'GitHubApiError';
    }
}