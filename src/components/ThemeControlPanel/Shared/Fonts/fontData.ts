import {useTranslation} from "react-i18next";


export const fontData = [
    {
        group: 'Serif Fonts',
        items: [
            'Times New Roman',
            'Georgia',
            'Garamond',
            'Playfair Display',
            'Merriweather'
        ]
    },
    {
        group: 'Sans-Serif Fonts',
        items: [
            'Arial',
            'Helvetica',
            'Verdana',
            'Tahoma',
            'Trebuchet MS',
            'Roboto',
            'Open Sans',
            'Lato',
            'Montserrat',
            'Raleway',
            'Oswald',
            'Ubuntu',
            'Source Sans Pro',
            'Poppins',
            'Nunito',
            'Noto Sans',
            'PT Sans',
            'Rubik',
            'Quicksand',
        ]
    },
    {
        group: 'Monospace Fonts',
        items: [
            'Courier New',
            'Consolas',
            'Lucida Console',
            'Courier',
            'Fira Code',
            'Source Code Pro',
            'Ubuntu Mono',
            'JetBrains Mono',
            'Roboto Mono',
            'Space Mono',
            'IBM Plex Mono'
        ]
    },
    {
        group: 'Script Fonts',
        items: [
            'Brush Script MT'
        ]
    }
];

export const chineseFontData = [
    {
        group: '衬线字体 (中文)',
        items: [
            'Noto Serif SC', // Simplified Chinese
            'Noto Serif TC', // Traditional Chinese
            'Source Han Serif SC', // Adobe/Google Simplified Chinese
            'Source Han Serif TC', // Adobe/Google Traditional Chinese
            'Zen Old Mincho', // Works for some Chinese characters too
            'LXGW WenKai' // Open source Ming/Kai style
        ]
    },
    {
        group: '无衬线字体 (中文)',
        items: [
            'Noto Sans SC', // Simplified Chinese
            'Noto Sans TC', // Traditional Chinese
            'Source Han Sans SC', // Adobe/Google Simplified Chinese
            'Source Han Sans TC', // Adobe/Google Traditional Chinese
            'IBM Plex Sans SC', // IBM's Simplified Chinese font
            'Ma Shan Zheng', // Handwriting style font
            'Zhi Mang Xing', // Calligraphy style
            'Zcool XiaoWei', // Modern sans-serif
            'Zcool KuaiLe', // Fun, rounded style
            'Zcool QingKe HuangYou' // Bold display font
        ]
    },
    {
        group: '等宽字体 (中文)',
        items: [
            'Noto Sans Mono SC', // Simplified Chinese
            'Noto Sans Mono TC', // Traditional Chinese
            'Source Han Code JP', // Works for Chinese coding too
            'Zpix' // Pixel font that supports Chinese
        ]
    },
    {
        group: '展示字体 (中文)',
        items: [
            'Long Cang', // Brush script style
            'Liu Jian Mao Cao', // Handwritten style
            'Zhi Mang Xing', // Artistic calligraphy
            'ZCOOL QingKe HuangYou', // Bold display font
            'ZCOOL KuaiLe' // Playful style
        ]
    }
];

export const japaneseFontData = [
    {
        group: '明朝体 (日本語)',
        items: [
            'Noto Serif JP', // Classic Japanese serif
            'Source Han Serif', // Adobe/Google collaborative font
            'Zen Old Mincho', // Traditional mincho style
            'Hina Mincho', // Cute, old-fashioned style
            'Shippori Mincho', // Modern mincho style
            'Kiwi Maru' // Rounded mincho style
        ]
    },
    {
        group: 'ゴシック体 (日本語)',
        items: [
            'Noto Sans JP', // Classic Japanese sans-serif
            'Source Han Sans JP', // Adobe/Google collaborative font
            'Kosugi', // Gothic style
            'Kosugi Maru', // Rounded gothic style
            'M PLUS 1', // Modern sans
            'M PLUS 1p', // Modern sans with proportional Latin
            'M PLUS 2', // Updated version
            'M PLUS Rounded 1c', // Rounded style
            'BIZ UDGothic', // Business document oriented
            'BIZ UDPGothic', // Proportional version
            'Zen Kaku Gothic New', // Contemporary gothic
            'Zen Kaku Gothic Antique', // Traditional gothic
            'Sawarabi Gothic', // High legibility sans
            'Yusei Magic', // Playful sans-serif
            'New Tegomin', // Typewriter style
            'Stick', // Thin sans-serif
            'Potta One', // Bold rounded
            'Train One' // Decorative sans
        ]
    },
    {
        group: '等幅フォント (日本語)',
        items: [
            'Noto Sans Mono JP', // Monospace Japanese
            'Source Han Code JP', // Coding oriented font
            'BIZ UDMincho', // Business document mincho
            'Zen Maru Gothic', // Rounded monospace
            'Rock Salt' // Handwritten style
        ]
    },
    {
        group: '装飾・筆記体フォント (日本語)',
        items: [
            'Reggae One', // Bold display
            'Hachi Maru Pop', // Cute handwriting style
            'Yomogi', // Handwritten style
            'Kaisei Decol', // Decorative serif
            'Kaisei HarunoUmi', // Traditional decorative
            'Kaisei Opti', // Optimized decorative
            'Kaisei Tokumin', // Bold decorative
            'DotGothic16', // Pixel font (16px)
            'Mochiy Pop One', // Pop culture style
            'Mochiy Pop P One', // Proportional version
            'RocknRoll One' // Bold, fun style
        ]
    }
];

export function getFontData(){
    const { i18n } = useTranslation('home');
    const lang = i18n.language;

    switch(lang){
        case 'zh':
            return chineseFontData
        case 'ja':
            return japaneseFontData
        default:
            return fontData;
    }
}
