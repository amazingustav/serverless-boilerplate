import {describe, expect, it} from 'vitest';

describe('Suite test', () => {
    it("Should test component", async () => {
        expect(true).toBeTruthy();
        expect("john@doe.com").toBe("john@doe.com");
    });
})
