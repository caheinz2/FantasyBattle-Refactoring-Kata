import { Equipment } from './Equipment';

export class Inventory {
    public constructor(private _equipment: Equipment) {
    }

    public getTotalBaseDamage(): number {
        return this._equipment.getTotalBaseDamage();
    }

    public getTotalDamageModifier(): number {
        return this._equipment.getTotalDamageModifier();
    }
}
