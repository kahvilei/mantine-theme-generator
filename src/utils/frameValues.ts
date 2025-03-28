
export const unFrameValue = (value: string): string => {
    return value.replace(/calc\((.*?) \* var\(--mantine-scale\)\)/, '$1');
};

export const frameValue = (value: string): string => {
    return `calc(${value} * var(--mantine-scale))`;
};