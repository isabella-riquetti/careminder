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
            return "#cde7d3";
        case Category.HAIR:
            return "#ffd8c4";
        case Category.MIND:
            return "#e7e7e7";
        case Category.NAIL:
            return "#d0d9f7";
        case Category.SKIN:
            return "#f3d4e1";
        default:
            return "#F8F2ED";
    }

}