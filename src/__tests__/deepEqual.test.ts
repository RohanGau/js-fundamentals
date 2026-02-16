import { describe, it, expect } from "vitest";
import deepEqual from "../core/deepEqual.js";

describe('deepEqual', () => {
    it('primitive values', () => {
        expect(deepEqual(0, 0)).toEqual(true);
        expect(deepEqual(true, 1)).toEqual(false);
        expect(deepEqual(false, false)).toEqual(true);
        expect(deepEqual(null, null)).toEqual(true);
    });

    it('arrays', () => {
        expect(deepEqual(['1'], ['1'])).toEqual(true);
        expect(deepEqual([1, 2, 3], [1, 3, 2])).toEqual(false);
    });

    it('objects', () => {
        expect(deepEqual({ foo: 'bar' }, { foo: 'bar' })).toEqual(true);
        expect(deepEqual({ foo: 'bar', id: 1 }, { foo: 'bar', id: 1 })).toEqual(
        true,
        );
    });
});

describe('arrays', () => {
    it('empty', () => {
        expect(deepEqual([], [])).toEqual(true);
        expect(deepEqual({}, [])).toEqual(false);
    });

    it('number and strings', () => {
        expect(deepEqual([1], [1])).toEqual(true);
        expect(deepEqual(['1'], ['1'])).toEqual(true);
        expect(deepEqual([1], ['1'])).toEqual(false);
        expect(deepEqual([1, 2], [1, 2])).toEqual(true);
        expect(deepEqual([1, 2, 3], [1, 2, 3])).toEqual(true);
        expect(deepEqual([1, 2, 3], [1, 3, 2])).toEqual(false);
    });

    it('boolean', () => {
        expect(deepEqual([true], [true])).toEqual(true);
        expect(deepEqual([true], [1])).toEqual(false);
        expect(deepEqual([false], [false])).toEqual(true);
        expect(deepEqual([true], [false])).toEqual(false);
        expect(deepEqual([0], [false])).toEqual(false);
    });

    it('null-ish', () => {
        expect(deepEqual([null], [null])).toEqual(true);
    });

    it('objects', () => {
        expect(deepEqual([{ foo: 1 }], [{ foo: 1 }])).toEqual(true);
        expect(deepEqual([{ foo: 1 }], [{ foo: 2 }])).toEqual(false);
    });
});