import { BasicBuff } from '../src/BasicBuff';
import { BasicItem } from '../src/BasicItem';
import { Equipment } from '../src/Equipment';
import { Inventory } from '../src/Inventory';
import { Player } from '../src/Player';
import { SimpleArmor } from '../src/SimpleArmor';
import { SimpleEnemy } from '../src/SimpleEnemy';
import { Stats } from '../src/Stats';

describe('Player', () => {


    describe('calculateDamage', () => {
        describe('base damage', () => {
            const stats = new Stats(10);

            it('includes base damage from left hand', () => {
                const equipment = buildEquipmentWithNoStats({ leftHand: { damage: 1 } });
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(1);
            });

            it('includes base damage from right hand', () => {
                const equipment = buildEquipmentWithNoStats({ rightHand: { damage: 1 } });
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(1);
            });

            it('includes base damage from head', () => {
                const equipment = buildEquipmentWithNoStats({ head: { damage: 1 } });
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(1);
            });

            it('includes base damage from feet', () => {
                const equipment = buildEquipmentWithNoStats({ feet: { damage: 1 } });
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(1);
            });

            it('includes base damage from chest', () => {
                const equipment = buildEquipmentWithNoStats({ chest: { damage: 1 } });
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(1);
            });
        });

        describe('damage modifier', () => {
            it('includes modifier from left hand', () => {
                const stats = new Stats(0);
                const equipment = buildEquipmentWithNoModifier({ leftHand: { modifier: 1 } });
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });

            it('includes modifier from right hand', () => {
                const stats = new Stats(0);
                const equipment = buildEquipmentWithNoModifier({ rightHand: { modifier: 1 } });
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });

            it('includes modifier from head', () => {
                const stats = new Stats(0);
                const equipment = buildEquipmentWithNoModifier({ head: { modifier: 1 } });
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });

            it('includes modifier from feet', () => {
                const stats = new Stats(0);
                const equipment = buildEquipmentWithNoModifier({ feet: { modifier: 1 } });
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });

            it('includes modifier from chest', () => {
                const stats = new Stats(0);
                const equipment = buildEquipmentWithNoModifier({ chest: { modifier: 1 } });
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });

            it('includes modifier from stats', () => {
                const stats = new Stats(10);
                const equipment = buildEquipmentWithNoModifier();
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });
        })
    });

    function buildEquipmentWithNoStats(overrides: {
        leftHand?: { damage?: number; modifier?: number };
        rightHand?: { damage?: number; modifier?: number };
        head?: { damage?: number; modifier?: number };
        feet?: { damage?: number; modifier?: number };
        chest?: { damage?: number; modifier?: number };
    } = {}) {
        return new Equipment(
          new BasicItem('leftHandItem', overrides.leftHand?.damage ?? 0, overrides.leftHand?.modifier ?? 0),
          new BasicItem('rightHandItem', overrides.rightHand?.damage ?? 0, overrides.rightHand?.modifier ?? 0),
          new BasicItem('headItem', overrides.head?.damage ?? 0, overrides.head?.modifier ?? 0),
          new BasicItem('feetItem', overrides.feet?.damage ?? 0, overrides.feet?.modifier ?? 0),
          new BasicItem('chestItem', overrides.chest?.damage ?? 0, overrides.chest?.modifier ?? 0),
        );
    }

    function buildEquipmentWithNoModifier(overrides: {
        leftHand?: { damage?: number; modifier?: number };
        rightHand?: { damage?: number; modifier?: number };
        head?: { damage?: number; modifier?: number };
        feet?: { damage?: number; modifier?: number };
        chest?: { damage?: number; modifier?: number };
    } = {}) {
        return new Equipment(
          new BasicItem('leftHandItem', overrides.leftHand?.damage ?? 1, overrides.leftHand?.modifier ?? 0),
          new BasicItem('rightHandItem', overrides.rightHand?.damage ?? 1, overrides.rightHand?.modifier ?? 0),
          new BasicItem('headItem', overrides.head?.damage ?? 1, overrides.head?.modifier ?? 0),
          new BasicItem('feetItem', overrides.feet?.damage ?? 1, overrides.feet?.modifier ?? 0),
          new BasicItem('chestItem', overrides.chest?.damage ?? 1, overrides.chest?.modifier ?? 0),
        );
    }

    function buildPlayer(equipment: Equipment, stats: Stats) {
        return new Player(new Inventory(equipment), stats);
    }

    function buildEnemy() {
        const armor = new SimpleArmor(0);
        const buff = new BasicBuff(0, 0);

        return new SimpleEnemy(armor, [buff]);
    }
});
