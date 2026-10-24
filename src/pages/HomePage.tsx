import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            navigate(`/user/${username.trim()}`);
        }
    };

    return (
        <div className="home-page">
            <h1>GitHub User Explorer</h1>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите имя пользователя GitHub"
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Найти
                </button>
            </form>
        </div>
    );
}