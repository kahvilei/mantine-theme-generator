import {MantineColorsTuple} from "@mantine/core";
import {VirtualColor} from "@/data/types";


export const isVirtualColor = (color?: MantineColorsTuple | VirtualColor) => {
    if (!color) {
        return false;
    } else if ((color as VirtualColor).dark) {
        return true;
    }
    return false;
}