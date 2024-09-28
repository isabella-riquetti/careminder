import { describe, expect,it } from "vitest";

import { numberToOrdinal } from "./number";

describe("numberToOrdinal", () => {
    it("should return 'first' for 1", () => {
        const result = numberToOrdinal(1);
        expect(result).toBe("first");
    });

    it("should return 'second' for 2", () => {
        const result = numberToOrdinal(2);
        expect(result).toBe("second");
    });

    it("should return 'third' for 3", () => {
        const result = numberToOrdinal(3);
        expect(result).toBe("third");
    });

    it("should return '4th' for 4", () => {
        const result = numberToOrdinal(4);
        expect(result).toBe("4th");
    });

    it("should return '21st' for 21", () => {
        const result = numberToOrdinal(21);
        expect(result).toBe("21st");
    });

    it("should return '22nd' for 22", () => {
        const result = numberToOrdinal(22);
        expect(result).toBe("22nd");
    });

    it("should return '23rd' for 23", () => {
        const result = numberToOrdinal(23);
        expect(result).toBe("23rd");
    });

    it("should return '11th' for 11", () => {
        const result = numberToOrdinal(11);
        expect(result).toBe("11th");
    });

    it("should return '12th' for 12", () => {
        const result = numberToOrdinal(12);
        expect(result).toBe("12th");
    });

    it("should return '13th' for 13", () => {
        const result = numberToOrdinal(13);
        expect(result).toBe("13th");
    });

    it("should return '101st' for 101", () => {
        const result = numberToOrdinal(101);
        expect(result).toBe("101st");
    });

    it("should return '111th' for 111", () => {
        const result = numberToOrdinal(111);
        expect(result).toBe("111th");
    });

    it("should return '112th' for 112", () => {
        const result = numberToOrdinal(112);
        expect(result).toBe("112th");
    });

    it("should return '113th' for 113", () => {
        const result = numberToOrdinal(113);
        expect(result).toBe("113th");
    });

    it("should return '213th' for 213", () => {
        const result = numberToOrdinal(213);
        expect(result).toBe("213th");
    });

    it("should return '199th' for 199", () => {
        const result = numberToOrdinal(199);
        expect(result).toBe("199th");
    });

    it("should return '1001st' for 1001", () => {
        const result = numberToOrdinal(1001);
        expect(result).toBe("1001st");
    });
});
