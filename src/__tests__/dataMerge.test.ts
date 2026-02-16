import { describe, expect, it } from "vitest";
import dataMerge from "../core/dataMerge.js";

describe('dataMerge', () => {
    // it('empty dat', () => {
    //     expect(dataMerge([])).toEqual([]);
    // });
    // it('merge for one user', () => {
    //     expect(
    //         dataMerge([
    //         { user: 1, duration: 10, equipment: ['barbell'] },
    //         { user: 1, duration: 30, equipment: [] },
    //         ]),
    //     ).toEqual([{ user: 1, duration: 40, equipment: ['barbell'] }]);
    // });
    
    it('merge for two users', () => {
        expect(
            dataMerge([
            { user: 8, duration: 50, equipment: ['bench'] },
            { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
            { user: 8, duration: 50, equipment: ['bench'] },
            { user: 7, duration: 150, equipment: ['bench', 'kettlebell'] },
            ]),
        ).toEqual([
            { user: 8, duration: 100, equipment: ['bench'] },
            {
            user: 7,
            duration: 300,
            equipment: ['bench', 'dumbbell', 'kettlebell'],
            },
        ]);
    });
});