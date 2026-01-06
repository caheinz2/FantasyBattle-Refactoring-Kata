import { SimpleEnemy } from '../src/SimpleEnemy';
import { Armor } from '../src/Armor';
import { Buff } from '../src/Buff';

describe('SimpleEnemy', () => {
    describe('calculateSoak', () => {
        it('calculates soak with no buffs', () => {
            const armor: Armor = { get damageSoak() { return 10; } };
            const enemy = new SimpleEnemy(armor, []);

            expect(enemy.calculateSoak(100)).toBe(10);
        });

        it('calculates soak with single buff modifier', () => {
            const armor: Armor = { get damageSoak() { return 10; } };
            const buff: Buff = {
                get soakModifier() { return 0.5; },
                get damageModifier() { return 0; }
            };
            const enemy = new SimpleEnemy(armor, [buff]);

            // damageSoak * (1 + sum of soakModifiers)
            // 10 * (1 + 0.5) = 15
            expect(enemy.calculateSoak(100)).toBe(15);
        });

        it('calculates soak with multiple buff modifiers', () => {
            const armor: Armor = { get damageSoak() { return 10; } };
            const buff1: Buff = {
                get soakModifier() { return 0.5; },
                get damageModifier() { return 0; }
            };
            const buff2: Buff = {
                get soakModifier() { return 0.3; },
                get damageModifier() { return 0; }
            };
            const enemy = new SimpleEnemy(armor, [buff1, buff2]);

            // 10 * (1 + 0.5 + 0.3) = 18
            expect(enemy.calculateSoak(100)).toBe(18);
        });

        it('rounds soak calculation', () => {
            const armor: Armor = { get damageSoak() { return 10; } };
            const buff: Buff = {
                get soakModifier() { return 0.33; },
                get damageModifier() { return 0; }
            };
            const enemy = new SimpleEnemy(armor, [buff]);

            // 10 * (1 + 0.33) = 13.3, rounds to 13
            expect(enemy.calculateSoak(100)).toBe(13);
        });
    });
});
