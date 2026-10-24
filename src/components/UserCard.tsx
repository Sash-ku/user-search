import { formatDate, formatNumber } from '../utils/formatters';
import { User } from '../  types/User';

interface UserCardProps {
    user: User;
}

export function UserCard({ user }: UserCardProps) {
    return (
        <div className="user-card">
            <div className="user-card__header">
                <img
                    src={user.avatar_url}
                    alt={`Аватар ${user.login}`}
                    className="user-card__avatar"
                />
                <div className="user-card__info">
                    <h2 className="user-card__name">
                        {user.name || user.login}
                    </h2>
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="user-card__login"
                    >
                        @{user.login}
                    </a>
                </div>
            </div>

            {user.bio && (
                <p className="user-card__bio">{user.bio}</p>
            )}

            <div className="user-card__details">
                {user.company && (
                    <div className="user-card__detail">
                        <span className="user-card__icon">🏢</span>
                        <span>{user.company}</span>
                    </div>
                )}

                {user.location && (
                    <div className="user-card__detail">
                        <span className="user-card__icon">📍</span>
                        <span>{user.location}</span>
                    </div>
                )}

                {user.blog && (
                    <div className="user-card__detail">
                        <span className="user-card__icon">🔗</span>
                        <a
                            href={
                                user.blog.startsWith('http')
                                    ? user.blog
                                    : `https://${user.blog}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="user-card__link"
                        >
                            {user.blog}
                        </a>
                    </div>
                )}

                <div className="user-card__detail">
                    <span className="user-card__icon">📅</span>
                    <span>Присоединился {formatDate(user.created_at)}</span>
                </div>
            </div>

            <div className="user-card__stats">
                <div className="user-card__stat">
                    <span className="user-card__stat-value">
                        {formatNumber(user.public_repos)}
                    </span>
                    <span className="user-card__stat-label">Репозиториев</span>
                </div>

                <div className="user-card__stat">
                    <span className="user-card__stat-value">
                        {formatNumber(user.followers)}
                    </span>
                    <span className="user-card__stat-label">Подписчиков</span>
                </div>

                <div className="user-card__stat">
                    <span className="user-card__stat-value">
                        {formatNumber(user.following)}
                    </span>
                    <span className="user-card__stat-label">Подписок</span>
                </div>
            </div>
        </div>
    );
}