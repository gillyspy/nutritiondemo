import Nutritions from "./Nutritions";
import EmptyFoodNameError from "./errors/EmptyFoodNameError";
import InvalidFoodAmountError from "./errors/InvalidFoodAmountError";
import Units from './Units'

class Food {
    private currentValues: Nutritions;

    constructor(private readonly name: string,
                private readonly unit: Units,
                private readonly baseValues: Nutritions) {

        this.currentValues = {...baseValues};

        this.validateFoodName(name);
        this.validateFoodAmount(baseValues.amount);
    }

    private validateFoodAmount(amount: number) {
        if (amount <= 0)
            throw new InvalidFoodAmountError(amount);
    }

    private validateFoodName(name: string) {
        if (name.length === 0) {
            throw new EmptyFoodNameError()
        }
    }

    getName(): string {
        return this.name;
    }

    getUnit(): string {
        return this.unit;
    }

    getBaseValues(): Nutritions {
        return this.baseValues;
    }

    getCurrentValues(): Nutritions {
        return this.currentValues;
    }

    changeAmount(amount: number): void {
        this.validateFoodAmount(amount);
        this.currentValues.amount = amount;

        ['fat','protein', 'carbohydrates','calories'].forEach( macro =>{
            this.calculateCaloriesFromAmount(macro);
        })
    }

    calculateCaloriesFromAmount(macro : string): void {
        this.currentValues[macro] =
            Math.ceil(
                this.currentValues.amount
                / this.baseValues.amount
                * this.baseValues[macro]
            );
    }
}

export default Food;