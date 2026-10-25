import { useCallback } from 'react';
import { useLocalStorage } from '@mantine/hooks';

const STORAGE_KEY = 'github-search-history';
const MAX_ITEMS = 10;

export function useSearchHistory() {
    const [history, setHistory] = useLocalStorage<string[]>({
        key: STORAGE_KEY,
        defaultValue: [],
    });

    const addToHistory = useCallback((username: string) => {
        const normalized = username.trim().toLowerCase();
        if (!normalized) return;

        setHistory((prev) => {
            const filtered = prev.filter((u) => u !== normalized);
            return [normalized, ...filtered].slice(0, MAX_ITEMS);
        });
    }, [setHistory]);

    const removeFromHistory = useCallback((username: string) => {
        setHistory((prev) => prev.filter((u) => u !== username));
    }, [setHistory]);

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, [setHistory]);

    return { history, addToHistory, removeFromHistory, clearHistory };
}