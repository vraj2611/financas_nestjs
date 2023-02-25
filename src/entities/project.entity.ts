import { Cost, TypeCost, ICost } from "./cost.entity";
import { User, IUser } from "./user.entity";
import { Category } from "./category.entity";
import { Credential, Role } from "./credential.entity";

export interface IProject {
    id?: string;
    name: string;
    description: string;
    costs: ICost[] | Cost[];
    owner: IUser | User;
    planners: IUser[] | User[];
    executers: IUser[] | User[];
}

export class Project {
    id: string;
    name: string;
    description: string;
    categories: Category[];
    costs: Cost[];
    private credentials: Credential[];
    user: User;

    constructor(partial: Partial<Project>) {
        Object.assign(this, partial);
    }

    public getUsers() {
        return this.credentials;
    }

    public login(user: User) {
        if (this.user) throw new Error("Another User already logged in the project");
        this.user = user;

        if (this.isRelated()) {
            this.logout();
            throw new Error("User is not related to the project");
        }
    }

    public logout() {
        this.user = null;
    }

    private isOwner(): boolean {
        return this.credentials.some(c => {
            return (
                (c.user.id == this.user.id)
                && (c.role == Role.Owner)
                && (c.isActive())
            )
        })
    }

    private isPlanner(): boolean {
        return this.credentials.some(c => {
            return (
                (c.user.id == this.user.id)
                && (c.role == Role.Planner)
                && (c.isActive())
            )
        })
    }

    private isContractor(): boolean {
        return this.credentials.some(c => {
            return (
                (c.user.id == this.user.id)
                && (c.role == Role.Contractor)
                && (c.isActive())
            )
        })
    }

    private isRelated(): boolean {
        return this.credentials.some(c => {
            return (
                (c.user.id == this.user.id)
                && (c.isActive())
            )
        })
    }

    getTotalPlanned() {
        if (!this.isRelated()) throw new Error("User is not related to the project");

        return this.costs.reduce((prev, cost) => {
            if (cost.type == TypeCost.PLANNING) return prev + cost.value
            return prev
        }, 0)
    }

    getTotalExecuted() {
        if (!this.isRelated()) throw new Error("User is not related to the project");
        return this.costs.reduce((prev, cost) => {
            if (cost.type == TypeCost.EXECUTUION) return prev + cost.value
            return prev
        }, 0)
    }

    getExtract() {
        return {
            costs: this.costs,
            totalpaid: this.getTotalExecuted(),
            totalplanned: this.getTotalPlanned()
        }
    }

    addCost(cost: Cost) {
        if ((cost.type == TypeCost.EXECUTUION) && (!this.isContractor())) throw new Error("User is not contractor");
        if ((cost.type == TypeCost.PLANNING) && (!this.isPlanner())) throw new Error("User is not planner");
        this.costs.push(cost);
    }

    removeCost(costid: number) {
        if (!this.isOwner()) throw new Error("User is not project owner");
    }

    setCredential(c:Credential){
        if (!this.isOwner()) throw new Error("User is not project owner");
        if (c.project.id != this.id) throw new Error("Credential is not for this project");
        this.credentials.push(c);
    }

}