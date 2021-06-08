import Food from './Food';
import EmptyFoodNameError from "./errors/EmptyFoodNameError";
import InvalidFoodAmountError from "./errors/InvalidFoodAmountError";

describe('Food', ()=>{
    const getBaseValues = function() {
        return {
            amount: 100,
            protein: 10,
            fat: 20,
            carbohydrates: 1,
            calories: 224
        }
    }
    const makeRiceFood = function(name = 'rice', unit = 'g', baseValues = getBaseValues()){
        return new Food(name, unit, baseValues);
    }

    test( 'Food is an function',()=>{
        expect(typeof Food).toBe('function');
    });

    test('create Food', ()=>{
        const baseValues = getBaseValues();
        const food = new Food('rice', 'g', baseValues);
        expect(food).toBeDefined();
        expect(food.getName()).toEqual('rice');
        expect(food.getUnit()).toEqual('g');
        expect(food.getBaseValues().amount).toEqual(100);
        expect(food.getBaseValues().protein).toEqual(10);
        expect(food.getBaseValues().fat).toEqual(20);
        expect(food.getBaseValues().carbohydrates).toEqual(1);
        expect(food.getBaseValues().calories).toEqual(224);
        expect(food.getCurrentValues()).toEqual( food.getBaseValues() );
    });

    test('create Food with empty name Fails with custom error', ()=>{
        const baseValues = getBaseValues();
        expect(()=>{
            new Food('', 'g', baseValues);
        }).toThrowError(EmptyFoodNameError);
    });

    test('create Food with zero amount fails with custom error', ()=>{
        const baseValues = Object.assign(
            {},
            getBaseValues(),
            { amount : 0 }
            );
        expect( ()=>{
            new Food('rice', 'g', baseValues);
        }).toThrowError(InvalidFoodAmountError);
    });

    test('change amount of a Food', ()=>{
        const baseValues = getBaseValues();
        const food = makeRiceFood();

        food.changeAmount(23);
        expect( food.getCurrentValues().amount).toEqual(23);
    })

    test('change amount with negative number', ()=>{
        const food = makeRiceFood();
        expect(()=> food.changeAmount(-10) ).toThrowError(InvalidFoodAmountError );
    })

    test('change valid amount portion ratio and calculate calories', ()=>{
        const baseValues = getBaseValues();
        baseValues.amount = 100;
        const food = makeRiceFood('rice','g', baseValues );
        food.changeAmount(80);

        expect(food.getCurrentValues().calories).toEqual( Math.ceil(80/100 * food.getBaseValues().calories) );
    })
})