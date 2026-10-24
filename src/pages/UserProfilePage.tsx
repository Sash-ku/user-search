import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { UserCard } from '../components/UserCard';
import { ErrorMessage } from '../components/ErrorMessage';

export function UserProfilePage() {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const { data: user, isLoading, error } = useUser(username || null);

    if (isLoading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <ErrorMessage error={error} />
                <button 
                    onClick={() => navigate('/')}
                    className="back-button"
                >
                    ← Вернуться к поиску
                </button>
            </div>
        );
    }

    if (user) {
        return (
            <div className="user-profile-page">
                <button 
                    onClick={() => navigate('/')}
                    className="back-button"
                >
                    ← Вернуться к поиску
                </button>
                <UserCard user={user} />
            </div>
        );
    }

    return null;
}