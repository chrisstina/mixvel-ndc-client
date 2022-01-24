export declare class DataList {
    private readonly entityName;
    private list;
    private constructor();
    static create(dataListTitle: string, dataListSource: Array<any>): DataList;
    findByReference(entityRef: string): any;
}
