
import {action, makeAutoObservable} from "mobx";
import {frameValue, unFrameValue} from "@/utils/frameValues";

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
            this.headings = {};
        }
        if (!this.headings.sizes) {
            // @ts-ignore
            this.headings.sizes = {}
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
