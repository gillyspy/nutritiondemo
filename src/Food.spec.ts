import Food from './Food';

describe('Food', ()=>{

    test( 'Food is an function',()=>{
        expect(typeof Food).toBe('function');
    });

    test('create Food', ()=>{
        const baseValues = {
            amount : 100,
            protein : 10,
            fat : 20,
            carbohydrates : 1,
            calories : 224
        };
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

    test()
})