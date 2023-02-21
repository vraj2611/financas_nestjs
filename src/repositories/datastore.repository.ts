import { Datastore } from '@google-cloud/datastore';

export interface IRepository {
    get(id: string): Promise<any>
    delete(id: string): Promise<any>
    listAll(): Promise<any[]>
    getBy(property: string, value: any): Promise<any>
    create(data: Object): Promise<any>
    
}

export class DatastoreRepository implements IRepository {

    private ds: Datastore;
    private kind: string;
    private excludefromIndexes: string[];

    constructor(kind: string, excludeFromIndexes: string[]) {
        this.ds = new Datastore();
        this.kind = kind;
        this.excludefromIndexes = excludeFromIndexes;
    }

    async get(id: string) {
        const key = this.ds.key([this.kind, +id]);
        const [result] = await this.ds.get(key);
        return this.exposeId(result);
    }

    async create(data: Object): Promise<any> {
        return await this.ds.save({
            key: this.ds.key(this.kind),
            excludefromIndexes: this.excludefromIndexes,
            data: data
        });
    }

    async update(data:Object){
        const id = data['id'];
        const key = this.ds.key([this.kind, +id]);
        delete data['id'];
        return this.ds.save({
            key: key,
            excludefromIndexes: this.excludefromIndexes,
            data: data 
        });
    }

    async delete(id: string) {
        const key = this.ds.key([this.kind, +id]);
        return this.ds.delete(key)
    }

    async listAll(): Promise<any[]> {
        const query = this.ds.createQuery(this.kind);
        const [results] = await this.ds.runQuery(query);
        return results.map(r => this.exposeId(r));
    }

    async getBy(property: string, value: any): Promise<any> {
        const query = this.ds.createQuery(this.kind).filter(property, value)
        const [[result, ...others], extra] = await this.ds.runQuery(query);
        if (!result) return null; 
        return this.exposeId(result);
    }

    async listBy(property: string, value: any): Promise<any> {
        const query = this.ds.createQuery(this.kind).filter(property, value)
        const [[result], extra] = await this.ds.runQuery(query)
        return result;
    }

    private exposeId(entity: any) {
        entity.id = entity[this.ds.KEY].id
        return entity
    }
}