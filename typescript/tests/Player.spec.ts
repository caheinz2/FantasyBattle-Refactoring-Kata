import { Inventory } from '../src/Inventory';
import { Stats } from '../src/Stats';
import { SimpleEnemy } from '../src/SimpleEnemy';
import { Player } from '../src/Player';
import { Damage } from '../src/Damage';
import { Equipment } from '../src/Equipment';
import { Item } from '../src/Item';
import { Armor } from '../src/Armor';
import { Buff } from '../src/Buff';

describe('Player', () => {
    const createItem = (baseDamage: number, damageModifier: number): Item => ({
        get baseDamage() { return baseDamage; },
        get damageModifier() { return damageModifier; }
    });

    it('calculates damage against simple enemy', () => {
        const equipment = new Equipment(
            createItem(10, 0.1),  // leftHand
            createItem(0, 0),     // rightHand
            createItem(0, 0),     // head
            createItem(0, 0),     // feet
            createItem(0, 0)      // chest
        );
        const inventory = new Inventory(equipment);
        const stats = new Stats(10); // strength = 10, modifier = 1.0

        const armor: Armor = { get damageSoak() { return 2; } };
        const enemy = new SimpleEnemy(armor, []);

        const damage: Damage = new Player(inventory, stats).calculateDamage(enemy);
        // baseDamage = 10
        // damageModifier = 0.1 (equipment) + 1.0 (strength) = 1.1
        // totalDamage = 10 * 1.1 = 11
        // soak = 2
        // final = 11 - 2 = 9
        expect(damage.amount).toBe(9);
    });

    it('calculates damage with enemy buffs', () => {
        const equipment = new Equipment(
            createItem(20, 0.5),
            createItem(0, 0),
            createItem(0, 0),
            createItem(0, 0),
            createItem(0, 0)
        );
        const inventory = new Inventory(equipment);
        const stats = new Stats(0); // no strength modifier

        const armor: Armor = { get damageSoak() { return 5; } };
        const buff: Buff = {
            get soakModifier() { return 0.2; },
            get damageModifier() { return 0; }
        };
        const enemy = new SimpleEnemy(armor, [buff]);

        const damage: Damage = new Player(inventory, stats).calculateDamage(enemy);
        // baseDamage = 20
        // damageModifier = 0.5 (equipment) + 0 (strength) = 0.5
        // totalDamage = 20 * 0.5 = 10
        // soak = 5 * (1 + 0.2) = 6
        // final = 10 - 6 = 4
        expect(damage.amount).toBe(4);
    });
})
