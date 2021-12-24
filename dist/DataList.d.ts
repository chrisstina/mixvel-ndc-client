export = DataList;
declare class DataList {
    constructor(entityName: any, items: any);
    list: any;
    entityName: any;
    findByReference(entityRef: any): any;
}
