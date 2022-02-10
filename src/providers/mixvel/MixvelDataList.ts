import {DataList} from "../../core/response/DataList";

export class MixvelDataList extends DataList {
    protected constructor(entityName: string, items: Array<any>) {
        super(entityName, items)
        try {
            this.list = items[0][`${entityName}List`][0][entityName]
        } catch (e: any) {
            console.error(`Failed to find ${entityName} DataList: ${e.stack}`)
            this.list = []
        }
    }

    public static create(dataListTitle: string, dataListSource: Array<any>) {
        return new MixvelDataList(dataListTitle, dataListSource)
    }

    findByReference(entityRef: string) {
        return this.list.find((entity: { [x: string]: string[]; }) => entity[`${this.entityName}ID`][0] === entityRef)
    }
}