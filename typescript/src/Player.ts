import { Target } from './Target';
import { Inventory } from './Inventory';
import { Stats } from './Stats';
import { Damage } from './Damage';
import { SimpleEnemy } from './SimpleEnemy';

export class Player extends Target {
    public constructor(private _inventory: Inventory, private _stats: Stats) {
        super();
    }

    calculateDamage(other: Target): Damage {
        const baseDamage = this.getBaseDamage();
        const damageModifier = this.getDamageModifier();
        const totalDamage = Math.round(baseDamage * damageModifier);
        const soak = this.getSoak(other, totalDamage);
        return new Damage(Math.max(0, totalDamage - soak));
    }

    private getSoak(other: Target, totalDamage: number): number {
        let soak = 0;
        if (other instanceof Player) {
            // TODO: Not implemented yet
            //  Add friendly fire
            soak = totalDamage;
        } else if (other instanceof SimpleEnemy) {
            soak = other.calculateSoak(totalDamage);
        }
        return soak;
    }

    private getDamageModifier(): number {
        const strengthModifier: number = this._stats.strength * 0.1;
        return strengthModifier + this._inventory.equipment.getTotalDamageModifier();
    }

    private getBaseDamage() {
        return this._inventory.equipment.getTotalBaseDamage();
    }
}
