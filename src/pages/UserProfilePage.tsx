// src/pages/UserProfilePage.tsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Stack, Loader, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useUser } from '../hooks/useUser';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { UserCard } from '../components/UserCard';
import { ErrorMessage } from '../components/ErrorMessage';

export function UserProfilePage() {
    const { username = '' } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const { data: user, isLoading, error, refetch } = useUser(username || null);
    const { addToHistory } = useSearchHistory();

    useEffect(() => {
        if (user?.login) {
            addToHistory(user.login);
        }
    }, [user?.login, addToHistory]);

    return (
        <Stack align="center" gap="lg" p="lg" mih="100vh">
            <Button
                variant="subtle"
                leftSection={<IconArrowLeft size={16} />}
                onClick={() => navigate('/')}
                style={{ alignSelf: 'flex-start' }}
            >
                К поиску
            </Button>

            {isLoading && (
                <Stack align="center" gap="xs" py="xl">
                    <Loader color="blue" />
                    <Text c="dimmed" size="sm">Ищем @{username}…</Text>
                </Stack>
            )}

            {error && <ErrorMessage error={error} />}

            {error && (
                <Button variant="light" onClick={() => refetch()}>
                    Повторить
                </Button>
            )}

            {user && <UserCard user={user} />}
        </Stack>
    );
}