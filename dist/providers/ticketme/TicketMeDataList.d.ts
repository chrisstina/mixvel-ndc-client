import { DataList } from "../../core/response/DataList";
export declare class TicketMeDataList extends DataList {
    protected constructor(entityName: string, items: Array<any>, dataListEntityName?: string);
    static create(dataListTitle: string, dataListSource: Array<any>, dataListEntityName?: string): TicketMeDataList;
    findByReference(entityRef: string, keyName?: string): any;
}
