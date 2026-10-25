import {
    Card, Avatar, Group, Stack, Text, Badge, Divider, Anchor,
} from '@mantine/core';
import {
    IconBuilding, IconMapPin, IconLink, IconCalendar,
} from '@tabler/icons-react';
import { formatDate, formatNumber } from '../utils/formatters';
import type { User } from '../types/User';

interface UserCardProps {
    user: User;
}

export function UserCard({ user }: UserCardProps) {
    const blogUrl = user.blog
        ? user.blog.startsWith('http') ? user.blog : `https://${user.blog}`
        : null;

    const validBlog = blogUrl && /^https?:\/\//.test(blogUrl) ? blogUrl : null;

    return (
        <Card withBorder shadow="sm" padding="lg" radius="md" w={500} maw="100%">
            <Group align="flex-start" gap="md" mb="md">
                <Avatar
                    src={user.avatar_url}
                    alt={user.login}
                    size={80}
                    radius="xl"
                />
                <Stack gap={2}>
                    <Text fw={600} size="xl" lh={1.2}>
                        {user.name || user.login}
                    </Text>
                    <Anchor
                        href={user.html_url}
                        target="_blank"
                        c="dimmed"
                        size="sm"
                    >
                        @{user.login}
                    </Anchor>
                </Stack>
            </Group>

            {user.bio && (
                <Text size="sm" mb="md">{user.bio}</Text>
            )}

            <Stack gap="xs" p="sm" bg="var(--mantine-color-gray-0)" radius="sm" mb="md">
                {user.company && (
                    <Group gap="xs">
                        <IconBuilding size={16} />
                        <Text size="sm">{user.company}</Text>
                    </Group>
                )}
                {user.location && (
                    <Group gap="xs">
                        <IconMapPin size={16} />
                        <Text size="sm">{user.location}</Text>
                    </Group>
                )}
                {validBlog && (
                    <Group gap="xs">
                        <IconLink size={16} />
                        <Anchor href={validBlog} target="_blank" size="sm" lineClamp={1}>
                            {user.blog}
                        </Anchor>
                    </Group>
                )}
                <Group gap="xs">
                    <IconCalendar size={16} />
                    <Text size="sm" c="dimmed">
                        На GitHub с {formatDate(user.created_at)}
                    </Text>
                </Group>
            </Stack>

            <Divider mb="md" />

            <Group grow>
                {[
                    { value: user.public_repos, label: 'Репозиториев' },
                    { value: user.followers, label: 'Подписчиков' },
                    { value: user.following, label: 'Подписок' },
                ].map(({ value, label }) => (
                    <Stack key={label} align="center" gap={4}>
                        <Text fw={600} size="lg">{formatNumber(value)}</Text>
                        <Text size="xs" c="dimmed">{label}</Text>
                    </Stack>
                ))}
            </Group>
        </Card>
    );
}