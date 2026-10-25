import { useMemo, useState, useEffect } from 'react';
import { Stack, Group, Text, Select, TextInput, Loader, Button } from '@mantine/core';
import { IconSearch, IconRefresh } from '@tabler/icons-react';
import { useIntersection } from '@mantine/hooks';
import { useRepos } from '../hooks/useRepos';
import { RepoCard } from './RepoCard';
import { RepoSort, RepoDirection } from '../api/fetchRepos';

interface RepoListProps {
    username: string;
}

const SORT_OPTIONS = [
    { value: 'updated', label: 'По обновлению' },
    { value: 'pushed', label: 'По последнему пушу' },
    { value: 'created', label: 'По дате создания' },
    { value: 'full_name', label: 'По имени' },
];

const DIRECTION_OPTIONS = [
    { value: 'desc', label: 'Убыв.' },
    { value: 'asc', label: 'Возр.' },
];

export function RepoList({ username }: RepoListProps) {
    const [sort, setSort] = useState<RepoSort>('updated');
    const [direction, setDirection] = useState<RepoDirection>('desc');
    const [search, setSearch] = useState('');

    const {
        data,
        isLoading,
        isError,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch,
    } = useRepos({ username, sort, direction });

    const { ref, entry } = useIntersection({
        threshold: 0.5,
    });

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [entry, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allRepos = useMemo(
        () => data?.pages.flatMap((page) => page) ?? [],
        [data]
    );
    
    const filteredRepos = useMemo(() => {
        if (!search.trim()) return allRepos;
        const q = search.toLowerCase();
        return allRepos.filter(
            (r) =>
                r.name.toLowerCase().includes(q) ||
                r.description?.toLowerCase().includes(q)
        );
    }, [allRepos, search]);

    if (isLoading) {
        return (
            <Stack align="center" py="xl" gap="xs">
                <Loader size="sm" />
                <Text size="sm" c="dimmed">Загрузка репозиториев…</Text>
            </Stack>
        );
    }

    if (isError) {
        return (
            <Stack align="center" py="xl" gap="sm">
                <Text size="sm" c="red">{error?.message}</Text>
                <Button
                    variant="light"
                    size="xs"
                    leftSection={<IconRefresh size={14} />}
                    onClick={() => refetch()}
                >
                    Повторить
                </Button>
            </Stack>
        );
    }

    return (
        <Stack gap="md">
            <Text fw={600} size="lg">
                Репозитории ({allRepos.length})
            </Text>

            <TextInput
                placeholder="Поиск по названию…"
                leftSection={<IconSearch size={16} />}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                size="sm"
            />

            <Group gap="xs">
                <Select
                    data={SORT_OPTIONS}
                    value={sort}
                    onChange={(v) => setSort((v as RepoSort) || 'updated')}
                    size="xs"
                    w={180}
                />
                <Select
                    data={DIRECTION_OPTIONS}
                    value={direction}
                    onChange={(v) => setDirection((v as RepoDirection) || 'desc')}
                    size="xs"
                    w={100}
                />
            </Group>

            {filteredRepos.length === 0 ? (
                <Text size="sm" c="dimmed" ta="center" py="md">
                    {search ? 'Ничего не найдено' : 'У пользователя нет публичных репозиториев'}
                </Text>
            ) : (
                <Stack gap="sm">
                    {filteredRepos.map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                    ))}

                    {/* Sentinel для infinite scroll */}
                    <div ref={ref} style={{ height: 1 }} />

                    {isFetchingNextPage && (
                        <Stack align="center" py="sm">
                            <Loader size="xs" />
                        </Stack>
                    )}

                    {!hasNextPage && allRepos.length > 0 && (
                        <Text size="xs" c="dimmed" ta="center" py="sm">
                            Это все репозитории
                        </Text>
                    )}
                </Stack>
            )}
        </Stack>
    );
}