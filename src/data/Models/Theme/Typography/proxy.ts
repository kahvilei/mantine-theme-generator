import {RemoraidStore} from "@/data/Store";
import {createThemeComponentProxy} from "@/data/Proxy/Proxy";

export function createTypographyProxy(store: RemoraidStore) {
    return createThemeComponentProxy(
        store,
        (s) => s.theme.typography,
        {
            // Only frame/unframe fontSize properties
            framingProps: [
                'headings.sizes.h1.fontSize',
                'headings.sizes.h2.fontSize',
                'headings.sizes.h3.fontSize',
                'headings.sizes.h4.fontSize',
                'headings.sizes.h5.fontSize',
                'headings.sizes.h6.fontSize'
            ],
            // Methods whose return values need unframing
            unframingMethods: [
                'getHeadingSize',
            ]
        }
    );
}