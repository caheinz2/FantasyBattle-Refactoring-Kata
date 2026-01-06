import { Target } from './Target';
import { Armor } from './Armor';
import { Buff } from './Buff';

export class SimpleEnemy extends Target {
    public constructor(private _armor: Armor, private _buffs: Array<Buff>) {
        super();
    }

    public get buffs(): Array<Buff> {
        return this._buffs;
    }

    public get armor(): Armor {
        return this._armor;
    }

    public calculateSoak(totalDamage: number): number {
        return Math.round(
            this._armor.damageSoak *
            (this._buffs.reduce((sum, buff) => sum + buff.soakModifier, 0) + 1)
        );
    }
}
