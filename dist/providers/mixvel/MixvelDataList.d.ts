import {DataList} from "../../core/response/DataList";

export declare class MixvelDataList extends DataList {
    protected constructor(entityName: string, items: Array<any>);
    static create(dataListTitle: string, dataListSource: Array<any>): MixvelDataList;
    findByReference(entityRef: string): any;
}
