import {DEFAULT_THEME} from "@mantine/core";

export const checkIsMantine = (color?: string) => {
    if (!color) {
        return false;
    } else if (DEFAULT_THEME.colors[color]) {
        return true;
    } 
    return false;
}