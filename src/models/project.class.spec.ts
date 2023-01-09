import { describe, expect, test, afterAll } from '@jest/globals';
import { User } from './user.class';
import { Cost, TypeCost } from './cost.class';
import { Category } from './category.class';
import { Project } from './project.class';

describe('Model Project', () => {
    let users: Map<string, User>;
    let costs: Map<string, Cost>;
    let categs: Map<string, Category>;

    beforeAll(async () => {
        users = new Map();
        users.set('owner', new User({ name: "User1", email: "user1@gmail" }));
        users.set('planner1', new User({ name: "User2", email: "user2@gmail" }));
        users.set('planner2', new User({ name: "User3", email: "user3@gmail" }));
        users.set('exec1', new User({ name: "User4", email: "user4@gmail" }));
        users.set('exec2', new User({ name: "User5", email: "user5@gmail" }));

        categs = new Map();
        categs.set("ctg_home", new Category({ name: "Home", description: "home" }));
        categs.set("ctg_food", new Category({ name: "Food", description: "food" }));
        categs.set("ctg_car", new Category({ name: "Car", description: "car" }));

        costs = new Map();
        costs.set('c1', new Cost({
            value: 99,
            category: categs.get('ctg_home'),
            description: "gas",
            date: new Date(2022, 1, 1),
            type: TypeCost.PLANNED,
            createdBy: users.get("owner")
        }))
    })

    beforeEach(async () => {
    });

    test('new project', () => {
        let proj:Project = new Project({
            name: "ProjA",
            description: "description",
            owner: users.get("owner"),
            planners: [],
            executers: [],
            costs: []    
        });
        
        expect(proj.name).toBe("ProjA");
    });
});