import { Category } from '@careminder/shared/types';

import { BodyCareIconComponent, BodyCarePlainIconComponent, HairCareIconComponent, HairCarePlainIconComponent, MindCareIconComponent, MindCarePlainIconComponent, NailCareIconComponent, NailCarePlainIconComponent, SelfCareIconComponent, SelfCarePlainIconComponent, SkinCareIconComponent, SkinCarePlainIconComponent } from '../assets/icons/categories';

export const getColoredIcon = (category: Category) => {
    switch (category) {
        case Category.BODY:
            return BodyCareIconComponent;
        case Category.HAIR:
            return HairCareIconComponent;
        case Category.MIND:
            return MindCareIconComponent;
        case Category.NAIL:
            return NailCareIconComponent;
        case Category.SKIN:
            return SkinCareIconComponent;
        default:
            return SelfCareIconComponent;
    }
}

export const getPlainIcon = (category: Category) => {
    switch (category) {
        case Category.BODY:
            return BodyCarePlainIconComponent;
        case Category.HAIR:
            return HairCarePlainIconComponent;
        case Category.MIND:
            return MindCarePlainIconComponent;
        case Category.NAIL:
            return NailCarePlainIconComponent;
        case Category.SKIN:
            return SkinCarePlainIconComponent;
        default:
            return SelfCarePlainIconComponent;
    }
}

export const getEventColor = (category: Category) => {
    switch (category) {
        case Category.BODY:
            return "#BDFCC9";
        case Category.HAIR:
            return "#FFD1BA";
        case Category.MIND:
            return "#ADD8E6";
        case Category.NAIL:
            return "#E6E6FA";
        case Category.SKIN:
            return "#e5b8cb";
        default:
            return "#F8F2ED";
    }

}