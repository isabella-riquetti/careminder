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

export const getEventColor = (category?: Category) => {
    switch (category) {
        case Category.BODY:
            return "var(--body-care)";
        case Category.HAIR:
            return "var(--hair-care)";
        case Category.MIND:
            return "var(--mind-care)";
        case Category.NAIL:
            return "var(--nail-care)";
        case Category.SKIN:
            return "var(--skin-care)";
        default:
            return "var(--self-care)";
    }

}