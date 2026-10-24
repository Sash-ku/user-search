import { GitHubApiError } from "../api/fetchUser";

interface ErrorMessageProps {
    error: GitHubApiError;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
    const getIcon = () => {
        switch (error.code) {
            case 'NOT_FOUND':
                return '🔍';
            case 'RATE_LIMIT':
                return '⏳';
            case 'NETWORK':
                return '🌐';
            default:
                return '❌';
        }
    };

    return (
        <div className="error-message">
            <span className="error-icon">{getIcon()}</span>
            <p className="error-text">{error.message}</p>
        </div>
    );
}