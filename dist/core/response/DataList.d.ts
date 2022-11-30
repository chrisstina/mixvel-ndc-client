import {IDataList} from "../../interfaces/IDataList";

export declare class DataList implements IDataList {
    readonly entityName: string;
    list: any;
    protected constructor(entityName: string, items: Array<any>);
    static create(dataListTitle: string, dataListSource: Array<any>): DataList;
    findByReference(entityRef: string): any;
}
