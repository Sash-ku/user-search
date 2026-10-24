import { useState } from 'react'
import { useUser } from './hooks/useUser'
import { ErrorMessage } from './components/ErrorMessage'
import { UserCard } from './components/UserCard'

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const { data: user, isLoading, error, isError } = useUser(username);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      setUsername(trimmed);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите имя пользователя GitHub"
        />
        <button type="submit">Найти</button>
      </form>

      {isLoading && <div> Поиск</div>}

      {isError && <ErrorMessage error={error} />}

      {user && <UserCard user={user} />}
    </div>
  );
}

export default App
