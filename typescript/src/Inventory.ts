import { Equipment } from './Equipment';
import { Item } from './Item';

export class Inventory {
    public constructor(private _equipment: Equipment) {
    }

    public get equipment(): Equipment {
        return this._equipment;
    }

    public getTotalBaseDamage(): number {
        return this._equipment.getTotalBaseDamage();
    }

    public getTotalDamageModifier(): number {
        return this._equipment.getTotalDamageModifier();
    }
}
