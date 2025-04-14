export const icons = import.meta.glob('../assets/icons/*.svg', {
    eager: true,
    as: 'url'
});

export const iconSet = Object.entries(icons).reduce((acc, [path, url]) => {
    const fileName = path.split('/').pop()?.split('.')[0];
    if (fileName) {
        acc[fileName] = url;
    }
    return acc;
}, {} as Record<string, string>);

export function getIconUrl(name: string): string | undefined {
    return iconSet[name];
}

export function getAvailableIcons(): string[] {
    return Object.keys(iconSet);
}
