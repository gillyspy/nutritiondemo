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
    });

    test('create Food with empty name Fails with custom error', ()=>{
        const baseValues = getBaseValues();
        expect(()=>{
            new Food('rice', 'g', baseValues);
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
    })
})