import { Cost, TypeCost, ICost } from "./cost.class";
import { User, IUser } from "./user.class";

export interface IProject {
    name: string;
    description: string;
    costs: ICost[];
    owner: IUser;
    planners: IUser[];
    executers: IUser[];
}

export class Project {
    name: string;
    description: string;
    costs: Cost[];
    owner: User;
    planners: User[];
    executers: User[];

    constructor(info: IProject) {
        this.costs = [];
        this.planners = [];
        this.executers = [];
        for (const k in info) {
            if (k == "owner") {
                this[k] = new User(info[k])
            } else if (k == "planners") {
                this[k] = info[k].map(u => new User(u))
            } else if (k == "executers") {
                this[k] = info[k].map(u => new User(u))
            } else if (k == "costs") {
                this[k] = info[k].map(c => new Cost(c))
            } else {
                this[k] = info[k]
            }
        }
    }

    private isOwner(user:User):boolean{
        return user.email == this.owner.email
    }

    private isPlanner(user:User):boolean{
        for (const p of this.planners) {
            if (user.email == p.email) return true
        }
        return false
    }

    private isExecuter(user:User):boolean{
        for (const e of this.executers) {
            if (user.email == e.email) return true
        }
        return false
    }

    getTotalPlanned(user:User) {
        if (!this.isOwner(user) && !this.isPlanner(user) && !this.isExecuter(user)) throw new Error("User not involved in this project");
        
        return this.costs.reduce((prev, cost) => {
            if (cost.type == TypeCost.PLANNED) return prev + cost.value
            return prev
        }, 0)
    }

    getTotalPaid(user:User) {
        if (!this.isOwner(user) && !this.isPlanner(user) && !this.isExecuter(user)) throw new Error("User not involved in this project");
        
        return this.costs.reduce((prev, cost) => {
            if (cost.type == TypeCost.PAID) return prev + cost.value
            return prev
        }, 0)
    }

    addCost(user:User, cost:Cost){
        if ((cost.type == TypeCost.PAID) && (!this.isExecuter(user))) throw new Error("User is not executer"); 
        if ((cost.type == TypeCost.PLANNED) && (!this.isPlanner(user))) throw new Error("User is not executer");
        this.costs.push(cost);
    }

    removeCost(user:User, costid: number){
        if (!this.isOwner(user)) throw new Error("User is not the project owner");
    }

    setPlanners(user:User, planners:User[]){
        if (!this.isOwner(user)) throw new Error("User is not the project owner");
        this.planners = planners;
    }

    setExecuters(user:User, execs:User[]){
        if (!this.isOwner(user)) throw new Error("User is not the project owner");
        this.planners = execs;
    }

}