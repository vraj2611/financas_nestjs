import { describe, expect, test, afterAll } from '@jest/globals';
import { ICost, Cost, TypeCost } from './cost.entity';
import { User } from './user.entity';
import { Category } from './category.entity';

describe('Model Cost', () => {
    beforeAll(async () => {
        
    })

    beforeEach(async () => {
    
    });

    test('constructor with ICategory', () => {
        // const info :ICost = {
        //     value: 45,
        //     description: "abc",
        //     category: {name: "catA",description: "descr"},
        //     type: TypeCost.PLANNED,
        //     date: new Date(),
        // }
        // const cost:Cost = new Cost(info)

        // expect(cost.category.name).toBe(info.category.name);
    });

    test('constructor with Category', () => {
        // const ctg:Category = new Category({name: "catA",description: "descr"})
        
        // const info :ICost = {
        //     value: 45,
        //     description: "abc",
        //     category: ctg,
        //     type: TypeCost.PLANNED,
        //     date: new Date(2021, 11, 11),
        //     createdBy: new User({name: "Vilmar", email: "a@gmail.com"})
        // }
        // const cost:Cost = new Cost(info)

        // expect(cost.category.name).toBe(ctg.name);
    });


    test('throw error to negative value', () => {
    //     const info :ICost = {
    //         value: -45,
    //         description: "abc",
    //         category: {name: "catA",description: "descr"},
    //         type: TypeCost.PLANNED,
    //         date: new Date(),
    //         createdBy: {name: "Vilmar", email: "a@gmail.com"}
    //     }
        
    //     expect(()=>new Cost(info)).toThrow()
    });

});