import { Datastore } from '@google-cloud/datastore';

export interface IRepository {
    listAll(): Promise<any[]>
    getBy(property: string, value: any): Promise<any>
    save(data: Object): Promise<any>
}

export class DatastoreRepository implements IRepository {

    private ds: Datastore;
    private collection_name: string;
    private excludefromIndexes: string[];

    constructor(collection_name: string, excludeFromIndexes: string[]) {
        this.ds = new Datastore();
        this.collection_name = collection_name;
        this.excludefromIndexes = excludeFromIndexes;
    }

    async listAll(): Promise<any[]> {
        const query = this.ds.createQuery(this.collection_name);
        const [results] = await this.ds.runQuery(query);
        return results
    }

    async getBy(property: string, value: any): Promise<any> {
        const query = this.ds.createQuery(this.collection_name).filter(property, value)
        const [[result, ...others], extra] = await this.ds.runQuery(query)
        return result;
    }

    async save(data: Object): Promise<any> {
        return await this.ds.save({
            key: this.ds.key(this.collection_name),
            excludefromIndexes: this.excludefromIndexes,
            data: data
        });
    }

    getDatastore(): Datastore {
        return this.ds
    }
}