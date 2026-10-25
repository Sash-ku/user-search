import { useNavigate } from 'react-router-dom';
import {
    Paper, Group, Text, Badge, ActionIcon, Stack, Title,
} from '@mantine/core';
import { IconX, IconTrash, IconHistory } from '@tabler/icons-react';
import { useSearchHistory } from '../hooks/useSearchHistory';

export function RecentSearches() {
    const { history, removeFromHistory, clearHistory } = useSearchHistory();
    const navigate = useNavigate();

    if (history.length === 0) return null;

    return (
        <Paper withBorder p="md" radius="md" w="100%" maw={420}>
            <Group justify="space-between" mb="sm">
                <Group gap="xs">
                    <IconHistory size={18} />
                    <Title order={5}>Недавно просмотренные</Title>
                </Group>
                <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={clearHistory}
                    title="Очистить историю"
                >
                    <IconTrash size={16} />
                </ActionIcon>
            </Group>

            <Group gap="xs" wrap="wrap">
                {history.map((username) => (
                    <Badge
                        key={username}
                        variant="light"
                        size="lg"
                        rightSection={
                            <ActionIcon
                                size="xs"
                                variant="transparent"
                                color="gray"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromHistory(username);
                                }}
                            >
                                <IconX size={12} />
                            </ActionIcon>
                        }
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/user/${username}`)}
                    >
                        @{username}
                    </Badge>
                ))}
            </Group>
        </Paper>
    );
}