import { Paper, Group, Stack, Text, Anchor, Badge } from '@mantine/core';
import { IconStar, IconGitFork, IconClock } from '@tabler/icons-react';
import { formatNumber } from '../utils/formatters';
import type { Repo } from '../types/Repo';

interface RepoCardProps {
    repo: Repo;
}

export function RepoCard({ repo }: RepoCardProps) {

    return (
        <Paper
            withBorder
            p="md"
            radius="md"
            component="a"
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
            <Stack gap="xs">
                <Group justify="space-between" wrap="nowrap">
                    <Text fw={600} size="md" lineClamp={1} c="blue">
                        {repo.name}
                    </Text>
                    {repo.fork && (
                        <Badge size="xs" variant="light" color="gray">
                            fork
                        </Badge>
                    )}
                </Group>

                {repo.description && (
                    <Text size="sm" c="dimmed" lineClamp={2}>
                        {repo.description}
                    </Text>
                )}

                <Group gap="sm" wrap="wrap">
                    {repo.language && (
                        <Group gap={4}>
                            <span
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    backgroundColor: '#3178c6',
                                    display: 'inline-block',
                                }}
                            />
                            <Text size="xs" c="dimmed">
                                {repo.language}
                            </Text>
                        </Group>
                    )}

                    {repo.stargazers_count > 0 && (
                        <Group gap={4}>
                            <IconStar size={14} />
                            <Text size="xs" c="dimmed">
                                {formatNumber(repo.stargazers_count)}
                            </Text>
                        </Group>
                    )}

                    {repo.forks_count > 0 && (
                        <Group gap={4}>
                            <IconGitFork size={14} />
                            <Text size="xs" c="dimmed">
                                {formatNumber(repo.forks_count)}
                            </Text>
                        </Group>
                    )}

                    <Group gap={4}>
                        <IconClock size={14} />
                        <Text size="xs" c="dimmed">
                            {new Date(repo.updated_at).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'short',
                            })}
                        </Text>
                    </Group>
                </Group>
            </Stack>
        </Paper>
    );
}