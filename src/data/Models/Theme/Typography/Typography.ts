
import {action, makeAutoObservable} from "mobx";
import {DEFAULT_THEME} from "@mantine/core";

export type HeadingSize = {
    fontSize?: string;
    lineHeight?: string;
    fontWeight?: string;
};

export class Typography {
    fontFamily?: string;
    fontFamilyMonospace?: string;
    headings?: {
        fontFamily?: string;
        fontWeight?: string;
        sizes?: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', HeadingSize>;
    };

    constructor(config: TypographySettings) {
        this.fontFamily = config.fontFamily;
        this.fontFamilyMonospace = config.fontFamilyMonospace;
        this.headings = config.headings;
        if (!this.headings) {
            this.headings = DEFAULT_THEME.headings;
        }
        if (!this.headings.sizes) {
            this.headings.sizes = DEFAULT_THEME.headings.sizes;
        }
        makeAutoObservable(this);
    }

    //base font family
    getFontFamily(): string {
        return this.fontFamily??"Arial";
    }

    setFontFamily(family: string): void {
        this.fontFamily = family;
    }

    //monospaceFontFamily
    getMonoFontFamily(): string {
        return this.fontFamilyMonospace?? "Roboto Mono";
    }

    setMonoFontFamily(family: string): void {
        this.fontFamilyMonospace = family;
    }

    setHeadingFontFamily(family: string): void {
        if (this.headings === undefined){this.headings = {};}
        this.headings.fontFamily = family;
    }

    @action
    setHeadingAttr(heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', attribute: string, value: string) {
        if (!this.headings) {
            this.headings = DEFAULT_THEME.headings;
        }
        if (!this.headings.sizes) {
            this.headings.sizes = DEFAULT_THEME.headings.sizes;
        }
        if (!this.headings.sizes[heading]) {
            this.headings.sizes[heading] = DEFAULT_THEME.headings.sizes[heading];
        }

        // @ts-ignore
        this.headings.sizes[heading][attribute] = value;
    }

    @action
    setHeadingSize(heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', value: string) {
        this.setHeadingAttr(heading, 'fontSize', value);
    }

    @action
    setHeadingLineHeight(heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', value: string) {
        this.setHeadingAttr(heading, 'lineHeight', value);
    }

    @action
    setHeadingWeight(heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', value: string) {
        this.setHeadingAttr(heading, 'fontWeight', value);
    }

    @action
    getHeadingSize(heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'): string {
        return this.headings?.sizes?.[heading]?.fontSize || '';
    }

    @action
    getHeadingLineHeight(heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'): string {
        return this.headings?.sizes?.[heading]?.lineHeight || '';
    }

    @action
    getHeadingWeight(heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'): string {
        return this.headings?.sizes?.[heading]?.fontWeight || '';
    }

    @action
    getHeadingFontFamily(): string {
        return this.headings?.fontFamily || this.fontFamily || '';
    }
}

export interface TypographySettings{
    fontFamily?: string;
    fontFamilyMonospace?: string;
    headings?: {
        fontFamily?: string;
        fontWeight?: string;
        sizes?: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', HeadingSize>;
    };
}
