import { DamageDealer } from './DamageDealer';
import { Target } from './Target';
import { Damage } from './Damage';

export class CombatSystem {
    calculateDamage(attacker: DamageDealer, defender: Target): Damage {
        const totalDamage = attacker.getTotalDamage();
        const soak = defender.calculateSoak(totalDamage);
        return new Damage(Math.max(0, totalDamage - soak));
    }
}
