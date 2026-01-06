import { Equipment } from '../src/Equipment';
import { Item } from '../src/Item';

describe('Equipment', () => {
    const createItem = (baseDamage: number, damageModifier: number): Item => ({
        get baseDamage() { return baseDamage; },
        get damageModifier() { return damageModifier; }
    });

    describe('getTotalBaseDamage', () => {
        it('sums base damage from all equipment slots', () => {
            const equipment = new Equipment(
                createItem(10, 0),  // leftHand
                createItem(5, 0),   // rightHand
                createItem(2, 0),   // head
                createItem(1, 0),   // feet
                createItem(3, 0)    // chest
            );

            expect(equipment.getTotalBaseDamage()).toBe(21);
        });

        it('returns 0 when all items have 0 base damage', () => {
            const equipment = new Equipment(
                createItem(0, 0),
                createItem(0, 0),
                createItem(0, 0),
                createItem(0, 0),
                createItem(0, 0)
            );

            expect(equipment.getTotalBaseDamage()).toBe(0);
        });
    });

    describe('getTotalDamageModifier', () => {
        it('sums damage modifiers from all equipment slots', () => {
            const equipment = new Equipment(
                createItem(0, 0.5),  // leftHand
                createItem(0, 0.3),  // rightHand
                createItem(0, 0.1),  // head
                createItem(0, 0.05), // feet
                createItem(0, 0.2)   // chest
            );

            expect(equipment.getTotalDamageModifier()).toBeCloseTo(1.15);
        });

        it('returns 0 when all items have 0 damage modifier', () => {
            const equipment = new Equipment(
                createItem(0, 0),
                createItem(0, 0),
                createItem(0, 0),
                createItem(0, 0),
                createItem(0, 0)
            );

            expect(equipment.getTotalDamageModifier()).toBe(0);
        });

        it('handles negative modifiers', () => {
            const equipment = new Equipment(
                createItem(0, 0.5),
                createItem(0, -0.2),
                createItem(0, 0),
                createItem(0, 0),
                createItem(0, 0)
            );

            expect(equipment.getTotalDamageModifier()).toBeCloseTo(0.3);
        });
    });
});
