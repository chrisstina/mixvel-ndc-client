import { DataList } from "../../core/response/DataList";
export declare class TicketMeDataList extends DataList {
    protected constructor(entityName: string, items: Array<any>);
    static create(dataListTitle: string, dataListSource: Array<any>): TicketMeDataList;
    findByReference(entityRef: string, keyName?: string): any;
}
