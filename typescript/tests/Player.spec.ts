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
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 1, 0),
                  new BasicItem('rightHandItem', 0, 0),
                  new BasicItem('headItem', 0, 0),
                  new BasicItem('feetItem', 0, 0),
                  new BasicItem('chestItem', 0, 0),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(1);
            });

            it('includes base damage from right hand', () => {
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 0, 0),
                  new BasicItem('rightHandItem', 1, 0),
                  new BasicItem('headItem', 0, 0),
                  new BasicItem('feetItem', 0, 0),
                  new BasicItem('chestItem', 0, 0),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(1);
            });

            it('includes base damage from head', () => {
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 0, 0),
                  new BasicItem('rightHandItem', 0, 0),
                  new BasicItem('headItem', 1, 0),
                  new BasicItem('feetItem', 0, 0),
                  new BasicItem('chestItem', 0, 0),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(1);
            });

            it('includes base damage from feet', () => {
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 0, 0),
                  new BasicItem('rightHandItem', 0, 0),
                  new BasicItem('headItem', 0, 0),
                  new BasicItem('feetItem', 1, 0),
                  new BasicItem('chestItem', 0, 0),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(1);
            });

            it('includes base damage from chest', () => {
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 0, 0),
                  new BasicItem('rightHandItem', 0, 0),
                  new BasicItem('headItem', 0, 0),
                  new BasicItem('feetItem', 0, 0),
                  new BasicItem('chestItem', 1, 0),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(1);
            });
        });

        describe('damage modifier', () => {
            it('includes modifier from left hand', () => {
                const stats = new Stats(0);
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 1, 1),
                  new BasicItem('rightHandItem', 1, 0),
                  new BasicItem('headItem', 1, 0),
                  new BasicItem('feetItem', 1, 0),
                  new BasicItem('chestItem', 1, 0),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });

            it('includes modifier from right hand', () => {
                const stats = new Stats(0);
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 1, 0),
                  new BasicItem('rightHandItem', 1, 1),
                  new BasicItem('headItem', 1, 0),
                  new BasicItem('feetItem', 1, 0),
                  new BasicItem('chestItem', 1, 0),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });

            it('includes modifier from head', () => {
                const stats = new Stats(0);
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 1, 0),
                  new BasicItem('rightHandItem', 1, 0),
                  new BasicItem('headItem', 1, 1),
                  new BasicItem('feetItem', 1, 0),
                  new BasicItem('chestItem', 1, 0),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });

            it('includes modifier from feet', () => {
                const stats = new Stats(0);
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 1, 0),
                  new BasicItem('rightHandItem', 1, 0),
                  new BasicItem('headItem', 1, 0),
                  new BasicItem('feetItem', 1, 1),
                  new BasicItem('chestItem', 1, 0),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });

            it('includes modifier from chest', () => {
                const stats = new Stats(0);
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 1, 0),
                  new BasicItem('rightHandItem', 1, 0),
                  new BasicItem('headItem', 1, 0),
                  new BasicItem('feetItem', 1, 0),
                  new BasicItem('chestItem', 1, 1),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });

            it('includes modifier from stats', () => {
                const stats = new Stats(10);
                const equipment = new Equipment(
                  new BasicItem('leftHandItem', 1, 0),
                  new BasicItem('rightHandItem', 1, 0),
                  new BasicItem('headItem', 1, 0),
                  new BasicItem('feetItem', 1, 0),
                  new BasicItem('chestItem', 1, 0),
                );
                const player = buildPlayer(equipment, stats);
                const enemy = buildEnemy();

                const damage = player.calculateDamage(enemy);

                expect(damage.amount).toBe(5);
            });
        })
    });

    function buildPlayer(equipment: Equipment, stats: Stats) {
        return new Player(new Inventory(equipment), stats);
    }

    function buildEnemy() {
        const armor = new SimpleArmor(0);
        const buff = new BasicBuff(0, 0);

        return new SimpleEnemy(armor, [buff]);
    }
});
