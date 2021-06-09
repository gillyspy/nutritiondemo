import Food from './Food';
import EmptyFoodNameError from "./errors/EmptyFoodNameError";
import InvalidFoodAmountError from "./errors/InvalidFoodAmountError";
import Units from './Units';
import Nutritions from "./Nutritions";


describe('Food', () => {
    const getBaseValues = function () : Nutritions {
        return {
            amount: 100,
            protein: 10,
            fat: 20,
            carbohydrates: 1,
            calories: 224
        }
    }
    const makeRiceFood = function (name = 'rice', unit = Units.GRAM, baseValues = getBaseValues()) {
        return new Food(name, unit, baseValues);
    }

    test('Food is an function', () => {
        expect(typeof Food).toBe('function');
    });

    test('create Food', () => {
        const food = makeRiceFood();
        expect(food).toBeDefined();
        expect(food.getName()).toEqual('rice');
        expect(food.getUnit()).toEqual(Units.GRAM);
        expect(food.getBaseValues().amount).toEqual(100);
        expect(food.getBaseValues().protein).toEqual(10);
        expect(food.getBaseValues().fat).toEqual(20);
        expect(food.getBaseValues().carbohydrates).toEqual(1);
        expect(food.getBaseValues().calories).toEqual(224);
        expect(food.getCurrentValues()).toEqual(food.getBaseValues());
    });

    test('create Food with empty name Fails with custom error', () => {
        const baseValues = getBaseValues();
        expect(() => {
            new Food('', Units.GRAM, baseValues);
        }).toThrowError(EmptyFoodNameError);
    });

    test('create Food with zero amount fails with custom error', () => {
        const baseValues = Object.assign(
            {},
            getBaseValues(),
            {amount: 0}
        );
        expect(() => {
            new Food('rice', Units.GRAM, baseValues);
        }).toThrowError(InvalidFoodAmountError);
    });

    test('change amount of a Food', () => {
        const food = makeRiceFood();

        food.changeAmount(23);
        expect(food.getCurrentValues().amount).toEqual(23);
    })

    test('change amount with negative number', () => {
        const food = makeRiceFood();
        expect(() => food.changeAmount(-10)).toThrowError(InvalidFoodAmountError);
    })

    test('change valid amount portion ratio and calculate current Values', () => {
        const baseValues = { // g [ cals] =>
            amount: 100, //
            protein: 10, //  10 [ 40 ] => 8 [ 32]
            fat: 20, // 20[180] => 16 [ 144 ]
            carbohydrates: 1, // 1[4] => .8[4]
            calories: 224 // => 180
        }
        baseValues.amount = 100;
        const food = makeRiceFood('rice', Units.GRAM, baseValues);
        food.changeAmount(80);

        expect(food.getCurrentValues().calories).toEqual(Math.ceil(80 / 100 * food.getBaseValues().calories));
        expect(food.getCurrentValues().protein).toEqual(8);
        expect(food.getCurrentValues().fat).toEqual( 16);
        expect(food.getCurrentValues().carbohydrates).toEqual( 1);
    })
})