export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
    });
}

export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
}