import { describe, it, expect, vi } from 'vitest';
import {
    getColoredIcon,
    getPlainIcon,
    getEventColor
} from './category';
import { Category } from '@careminder/shared/types';

vi.mock('../assets/icons/categories', () => ({
    BodyCareIconComponent: 'BodyCareIconComponent',
    HairCareIconComponent: 'HairCareIconComponent',
    MindCareIconComponent: 'MindCareIconComponent',
    NailCareIconComponent: 'NailCareIconComponent',
    SkinCareIconComponent: 'SkinCareIconComponent',
    SelfCareIconComponent: 'SelfCareIconComponent',
    BodyCarePlainIconComponent: 'BodyCarePlainIconComponent',
    HairCarePlainIconComponent: 'HairCarePlainIconComponent',
    MindCarePlainIconComponent: 'MindCarePlainIconComponent',
    NailCarePlainIconComponent: 'NailCarePlainIconComponent',
    SkinCarePlainIconComponent: 'SkinCarePlainIconComponent',
    SelfCarePlainIconComponent: 'SelfCarePlainIconComponent',
}));

describe('getColoredIcon', () => {
    it('should return the correct colored icon for BODY category', () => {
        const icon = getColoredIcon(Category.BODY);
        expect(icon).toBe('BodyCareIconComponent');
    });

    it('should return the correct colored icon for HAIR category', () => {
        const icon = getColoredIcon(Category.HAIR);
        expect(icon).toBe('HairCareIconComponent');
    });

    it('should return the correct colored icon for MIND category', () => {
        const icon = getColoredIcon(Category.MIND);
        expect(icon).toBe('MindCareIconComponent');
    });

    it('should return the correct colored icon for NAIL category', () => {
        const icon = getColoredIcon(Category.NAIL);
        expect(icon).toBe('NailCareIconComponent');
    });

    it('should return the correct colored icon for SKIN category', () => {
        const icon = getColoredIcon(Category.SKIN);
        expect(icon).toBe('SkinCareIconComponent');
    });

    it('should return the default colored icon for unknown categories', () => {
        const icon = getColoredIcon('UNKNOWN' as Category);
        expect(icon).toBe('SelfCareIconComponent');
    });
});

describe('getPlainIcon', () => {
    it('should return the correct plain icon for BODY category', () => {
        const icon = getPlainIcon(Category.BODY);
        expect(icon).toBe('BodyCarePlainIconComponent');
    });

    it('should return the correct plain icon for HAIR category', () => {
        const icon = getPlainIcon(Category.HAIR);
        expect(icon).toBe('HairCarePlainIconComponent');
    });

    it('should return the correct plain icon for MIND category', () => {
        const icon = getPlainIcon(Category.MIND);
        expect(icon).toBe('MindCarePlainIconComponent');
    });

    it('should return the correct plain icon for NAIL category', () => {
        const icon = getPlainIcon(Category.NAIL);
        expect(icon).toBe('NailCarePlainIconComponent');
    });

    it('should return the correct plain icon for SKIN category', () => {
        const icon = getPlainIcon(Category.SKIN);
        expect(icon).toBe('SkinCarePlainIconComponent');
    });

    it('should return the default plain icon for unknown categories', () => {
        const icon = getPlainIcon('UNKNOWN' as Category);
        expect(icon).toBe('SelfCarePlainIconComponent');
    });
});

describe('getEventColor', () => {
    it('should return the correct color for BODY category', () => {
        const color = getEventColor(Category.BODY);
        expect(color).toBe('var(--body-care)');
    });

    it('should return the correct color for HAIR category', () => {
        const color = getEventColor(Category.HAIR);
        expect(color).toBe('var(--hair-care)');
    });

    it('should return the correct color for MIND category', () => {
        const color = getEventColor(Category.MIND);
        expect(color).toBe('var(--mind-care)');
    });

    it('should return the correct color for NAIL category', () => {
        const color = getEventColor(Category.NAIL);
        expect(color).toBe('var(--nail-care)');
    });

    it('should return the correct color for SKIN category', () => {
        const color = getEventColor(Category.SKIN);
        expect(color).toBe('var(--skin-care)');
    });

    it('should return the default color for unknown categories', () => {
        const color = getEventColor('UNKNOWN' as Category);
        expect(color).toBe('var(--self-care)');
    });

    it('should return the default color if no category is passed', () => {
        const color = getEventColor();
        expect(color).toBe('var(--self-care)');
    });
});
