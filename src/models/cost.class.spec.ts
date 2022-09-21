import { describe, expect, test, afterAll } from '@jest/globals';
import { ICost, Cost, TypeCost } from './cost.class';

describe('Model User', () => {
    beforeAll(async () => {
        
    })

    beforeEach(async () => {
    
    });

    test('constructor', () => {
        const info :ICost = {
            value: 45,
            description: "abc",
            category: {name: "catA",description: "descr"},
            type: TypeCost.PLANNED,
            date: new Date(),
            createdBy: {name: "Vilmar", email: "a@gmail.com"}
        }
        const cost:Cost = new Cost(info)

        expect(cost.category.name).toBe(info.category.name);
    });

    test('throw error to negative value', () => {
        const info :ICost = {
            value: -45,
            description: "abc",
            category: {name: "catA",description: "descr"},
            type: TypeCost.PLANNED,
            date: new Date(),
            createdBy: {name: "Vilmar", email: "a@gmail.com"}
        }
        
        expect(()=>new Cost(info)).toThrow()
    });

});