import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Button, Stack, Title, Text, Group, Badge } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { RecentSearches } from '../components/RecentSearches';

const SUGGESTIONS = ['torvalds', 'gaearon', 'sindresorhus'];

export function HomePage() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = username.trim();
        if (trimmed) {
            navigate(`/user/${encodeURIComponent(trimmed)}`);
        }
    };

    return (
        <Stack align="center" justify="center" gap="xl" mih="100vh" p="md">
            <Stack align="center" gap="xs">
                <Title order={1}>GitHub Explorer</Title>
                <Text c="dimmed" size="sm">
                    Найдите профиль и посмотрите, чем живёт разработчик
                </Text>
            </Stack>

            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 420 }}>
                <Stack gap="sm">
                    <TextInput
                        placeholder="например, hello"
                        label="Имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                        leftSection={<IconSearch size={16} />}
                        size="md"
                        maxLength={39}
                    />
                    <Button
                        type="submit"
                        size="md"
                        fullWidth
                        disabled={!username.trim()}
                    >
                        Найти пользователя
                    </Button>
                </Stack>
            </form>

            <Group gap="xs" wrap="wrap" justify="center">
                <Text size="xs" c="dimmed">Попробуйте:</Text>
                {SUGGESTIONS.map((name) => (
                    <Badge
                        key={name}
                        variant="light"
                        size="sm"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/user/${name}`)}
                    >
                        @{name}
                    </Badge>
                ))}
            </Group>
            <RecentSearches />
        </Stack>
    );
}