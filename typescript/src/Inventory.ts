import { Equipment } from './Equipment';
import { Item } from './Item';

export class Inventory {
    public constructor(private _equipment: Equipment) {
    }

    public get equipment(): Equipment {
        return this._equipment;
    }

    public getTotalBaseDamage(): number {
        const leftHand: Item = this._equipment.leftHand;
        const rightHand: Item = this._equipment.rightHand;
        const head: Item = this._equipment.head;
        const feet: Item = this._equipment.feet;
        const chest: Item = this._equipment.chest;

        return (
          leftHand.baseDamage +
          rightHand.baseDamage +
          head.baseDamage +
          feet.baseDamage +
          chest.baseDamage
        );
    }

    public getTotalDamageModifier(): number {
        const leftHand: Item = this._equipment.leftHand;
        const rightHand: Item = this._equipment.rightHand;
        const head: Item = this._equipment.head;
        const feet: Item = this._equipment.feet;
        const chest: Item = this._equipment.chest;

        return (
          leftHand.damageModifier +
          rightHand.damageModifier +
          head.damageModifier +
          feet.damageModifier +
          chest.damageModifier
        );
    }
}
