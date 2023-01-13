import { Cost, TypeCost, ICost } from "./cost.class";
import { User, IUser } from "./user.class";

export interface IProject {
    name: string;
    description: string;
    costs: ICost[] | Cost[];
    owner: IUser | User;
    planners: IUser[] | User[];
    executers: IUser[] | User[];
}

export class Project {
    name: string;
    description: string;
    costs: Cost[];
    private loggedUser: User;
    private owner: User;
    private planners: User[];
    private executers: User[];

    constructor(info: IProject) {
        this.costs = [];
        this.planners = [];
        this.executers = [];
        for (const k in info) {
            if (k == "owner") {
                if (info[k].constructor.name == 'User') {
                    this[k] = <User>info[k];
                } else {
                    this[k] = new User(info[k])
                }
            } else if (k == "planners") {
                for (const i of info[k]) {
                    if( i.constructor.name == 'User') {
                        this.planners.push(<User>i);
                    } else {
                        this.planners.push(new User(i));
                    }  
                }
                
            } else if (k == "executers") {
                for (const i of info[k]) {
                    if( i.constructor.name == 'User') {
                        this.executers.push(<User>i);
                    } else {
                        this.executers.push(new User(i));
                    }  
                }

            } else if (k == "costs") {
                for (const i of info[k]) {
                    if( i.constructor.name == 'Cost') {
                        this.costs.push(<Cost>i);
                    } else {
                        this.costs.push(new Cost(i));
                    }  
                }
            } else {
                this[k] = info[k]
            }
        }
    }

    public getUsers(){
        return {
            owner: this.owner,
            planners: this.planners,
            executers: this.executers
        }
    }

    public login(user:User) {
        if (this.loggedUser) throw new Error("Another User already logged in the project");
        this.loggedUser = user;
        if (!(this.isOwner() || this.isPlanner() || this.isExecuter())) {
            this.logout()
            throw new Error("User is not related to the project");
        }
    }

    public logout(){
        this.loggedUser = null;
    }

    private isOwner():boolean{
        return this.loggedUser.email == this.owner.email
    }

    private isPlanner():boolean{
        for (const p of this.planners) {
            if (this.loggedUser.email == p.email) return true
        }
        return false
    }

    private isExecuter():boolean{
        for (const e of this.executers) {
            if (this.loggedUser.email == e.email) return true
        }
        return false
    }

    getTotalPlanned() {
        if (!this.isOwner() && !this.isPlanner() && !this.isExecuter()) throw new Error("User is not related to the project");
        
        return this.costs.reduce((prev, cost) => {
            if (cost.type == TypeCost.PLANNED) return prev + cost.value
            return prev
        }, 0)
    }

    getTotalPaid() {
        if (!this.isOwner() && !this.isPlanner() && !this.isExecuter()) throw new Error("User is not related to the project");
        
        return this.costs.reduce((prev, cost) => {
            if (cost.type == TypeCost.PAID) return prev + cost.value
            return prev
        }, 0)
    }

    getExtract() {
        return {
            costs:this.costs,
            totalpaid: this.getTotalPaid(),
            totalplanned: this.getTotalPlanned()
        }
    }

    addCost(cost:Cost){
        if ((cost.type == TypeCost.PAID) && (!this.isExecuter())) throw new Error("User is not executer"); 
        if ((cost.type == TypeCost.PLANNED) && (!this.isPlanner())) throw new Error("User is not planner");
        this.costs.push(cost);
    }

    removeCost(costid: number){
        if (!this.isOwner()) throw new Error("User is not the project owner");
    }

    setPlanners(planners:User[]){
        if (!this.isOwner()) throw new Error("User is not the project owner");
        this.planners = planners;
    }

    setExecuters(execs:User[]){
        if (!this.isOwner()) throw new Error("User is not the project owner");
        this.executers = execs;
    }

}