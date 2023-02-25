import { describe, expect, test, afterAll } from '@jest/globals';
import { User } from './user.entity';
import { Cost, TypeCost } from './cost.entity';
import { Category } from './category.entity';
import { Project } from './project.entity';

describe('Model Project', () => {
    let users: Map<string, User>;
    let projs: Map<string, Project>;
    let costs: Map<string, Cost>;
    let categs: Map<string, Category>;

    beforeAll(async () => {
    //     users = new Map();
    //     users.set('owner1', new User({ name: "User1", email: "user1@gmail" }));
    //     users.set('planner1', new User({ name: "User2", email: "user2@gmail" }));
    //     users.set('planner2', new User({ name: "User3", email: "user3@gmail" }));
    //     users.set('exec1', new User({ name: "User4", email: "user4@gmail" }));
    //     users.set('exec2', new User({ name: "User5", email: "user5@gmail" }));
    //     users.set('owner2', new User({ name: "User6", email: "user6@gmail" }));

    //     projs = new Map();
    //     projs.set('p1', new Project({
    //         name: "ProjA",
    //         description: "description",
    //         owner: users.get("owner1"),
    //         planners: [],
    //         executers: [],
    //         costs: []
    //     }))

    //     projs.set('p2', new Project({
    //         name: "ProjB",
    //         description: "description",
    //         owner: users.get("owner2"),
    //         planners: [],
    //         executers: [],
    //         costs: []
    //     }))

    //     categs = new Map();
    //     categs.set("ctg_home", new Category({ name: "Home", description: "home" }));
    //     categs.set("ctg_food", new Category({ name: "Food", description: "food" }));
    //     categs.set("ctg_car", new Category({ name: "Car", description: "car" }));

    //     costs = new Map();
    //     costs.set('cp1', new Cost({
    //         value: 99,
    //         category: categs.get('ctg_home'),
    //         description: "cp1",
    //         date: new Date(2022, 1, 1),
    //         type: TypeCost.PLANNED,
    //         createdBy: users.get("planner1")
    //     }));
    //     costs.set('cp2', new Cost({
    //         value: 50,
    //         category: categs.get('ctg_home'),
    //         description: "cp2",
    //         date: new Date(2022, 1, 1),
    //         type: TypeCost.PLANNED,
    //         createdBy: users.get("planner2")
    //     }));
    //     costs.set('ce1', new Cost({
    //         value: 88,
    //         category: categs.get('ctg_home'),
    //         description: "ce1",
    //         date: new Date(2022, 1, 1),
    //         type: TypeCost.PAID,
    //         createdBy: users.get("exec1")
    //     }));
    //     costs.set('ce2', new Cost({
    //         value: 52,
    //         category: categs.get('ctg_home'),
    //         description: "ce2",
    //         date: new Date(2022, 1, 1),
    //         type: TypeCost.PAID,
    //         createdBy: users.get("exec2")
    //     }));
    //     costs.set('nce1', new Cost({
    //         value: 52,
    //         category: categs.get('ctg_home'),
    //         description: "ce1",
    //         date: new Date(2022, 1, 1),
    //         type: TypeCost.PAID,
    //         createdBy: users.get("planner1")
    //     }));
     })

    // beforeEach(async () => {
    // });

    // test('new project', () => {
    //     let proj: Project = new Project({
    //         name: "ProjA",
    //         description: "description",
    //         owner: users.get("owner1"),
    //         planners: [],
    //         executers: [],
    //         costs: []
    //     });

    //     expect(proj.name).toBe("ProjA");

    // });

    // test('login owner', () => {
    //     let proj: Project = projs.get('p1');
    //     expect(() => proj.login(users.get('owner1'))).not.toThrow();
    // });

    // test('error login other user', () => {
    //     let proj: Project = projs.get('p1');
    //     expect(() => proj.login(users.get('owner2'))).toThrow();
    // });

    // test('error login duplicated', () => {
    //     let proj: Project = projs.get('p1');
    //     expect(() => {
    //         proj.login(users.get('owner1'));
    //         proj.login(users.get('owner1'));
    //     }).toThrow();
    // });

    // test('add users to proj', () => {
    //     let proj: Project = projs.get('p1');
    //     proj.logout();
    //     proj.login(users.get('owner1'));
    //     proj.setPlanners([users.get("planner1"), users.get("planner2")]);
    //     proj.setExecuters([users.get("exec1")]);

    //     expect(proj.getUsers().planners.length).toBe(2);
    //     expect(proj.getUsers().executers[0].name).toBe("User4");
    // });

    // test('error unloged action', () => {
    //     let proj: Project = projs.get('p1');
    //     proj.logout();
    //     expect(() => {
    //         proj.setExecuters([users.get("exec1")]);
    //     }).toThrow();
    // });

    // test('error not owner action', () => {
    //     let proj: Project = projs.get('p1');
    //     proj.logout();
    //     proj.login(users.get('owner1'));
    //     proj.setExecuters([users.get("exec1")]);
    //     proj.logout();
    //     proj.login(users.get('exec1'));

    //     expect(() => {
    //         proj.setExecuters([users.get("exec2")]);
    //     }).toThrow();
    // });

    // test('add cost to project', () => {
    //     let proj: Project = projs.get('p1');
    //     proj.logout();
    //     proj.login(users.get('owner1'));
    //     proj.setExecuters([users.get("exec1")]);
    //     proj.logout();
    //     proj.login(users.get('exec1'));
    //     proj.addCost(costs.get('ce1'));
    //     proj.addCost(costs.get('ce2'));
    //     expect(proj.getTotalExecuted()).toBe(88 + 52);
    // });

    test('erro add cost to project wrong type cost', () => {

        // expect(()=> {
        //     let proj: Project = projs.get('p1');
        //     proj.logout();
        //     proj.login(users.get('owner1'));
        //     proj.setExecuters([users.get("exec1")]);
        //     proj.logout();
        //     proj.login(users.get('exec1'));
        //     proj.addCost(costs.get('cp1'))
        // }).toThrow();
    });

});