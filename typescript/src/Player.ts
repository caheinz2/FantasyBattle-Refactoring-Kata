import { Target } from './Target';
import { Inventory } from './Inventory';
import { Stats } from './Stats';
import { Damage } from './Damage';
import { DamageDealer } from './DamageDealer';
import { CombatSystem } from './CombatSystem';

export class Player extends Target implements DamageDealer {
    private static combatSystem = new CombatSystem();

    public constructor(private _inventory: Inventory, private _stats: Stats) {
        super();
    }

    calculateDamage(other: Target): Damage {
        return Player.combatSystem.calculateDamage(this, other);
    }

    private getBaseDamage() {
        return this._inventory.getTotalBaseDamage();
    }

    public getTotalDamage(): number {
        const baseDamage = this.getBaseDamage();
        const damageModifier = this.getDamageModifier();
        return Math.round(baseDamage * damageModifier);
    }

    public calculateSoak(totalDamage: number): number {
        // TODO: Not implemented yet - Add friendly fire
        return totalDamage;
    }

    private getDamageModifier(): number {
        const strengthModifier: number = this._stats.strength * 0.1;
        return strengthModifier + this._inventory.getTotalDamageModifier();
    }
}
