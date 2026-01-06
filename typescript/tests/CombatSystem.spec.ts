import { CombatSystem } from '../src/CombatSystem';
import { DamageDealer } from '../src/DamageDealer';
import { Target } from '../src/Target';

describe('CombatSystem', () => {
    const createDealer = (totalDamage: number): DamageDealer => ({
        getTotalDamage() { return totalDamage; }
    });

    const createTarget = (soak: number): Target => {
        return new class extends Target {
            calculateSoak(totalDamage: number): number {
                return soak;
            }
        };
    };

    it('calculates damage with no soak', () => {
        const combatSystem = new CombatSystem();
        const attacker = createDealer(100);
        const defender = createTarget(0);

        const damage = combatSystem.calculateDamage(attacker, defender);

        expect(damage.amount).toBe(100);
    });

    it('calculates damage with soak', () => {
        const combatSystem = new CombatSystem();
        const attacker = createDealer(100);
        const defender = createTarget(30);

        const damage = combatSystem.calculateDamage(attacker, defender);

        expect(damage.amount).toBe(70);
    });

    it('returns 0 damage when soak exceeds total damage', () => {
        const combatSystem = new CombatSystem();
        const attacker = createDealer(50);
        const defender = createTarget(100);

        const damage = combatSystem.calculateDamage(attacker, defender);

        expect(damage.amount).toBe(0);
    });

    it('passes total damage to soak calculation', () => {
        const combatSystem = new CombatSystem();
        const attacker = createDealer(80);

        let receivedDamage = 0;
        const defender = new class extends Target {
            calculateSoak(totalDamage: number): number {
                receivedDamage = totalDamage;
                return 10;
            }
        };

        combatSystem.calculateDamage(attacker, defender);

        expect(receivedDamage).toBe(80);
    });
});
