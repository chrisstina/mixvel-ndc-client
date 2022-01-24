

export class DataList {
    private readonly entityName: string;
    private list: any;

    private constructor(entityName: string, items: Array<any>) {
        this.entityName = entityName
        try {
            this.list = items[0][`${entityName}List`][0][entityName]
        } catch (e: any) {
            console.error(`Failed to find ${entityName} DataList: ${e.stack}`)
            this.list = []
        }
    }

    public static create(dataListTitle: string, dataListSource: Array<any>) {
        return new DataList(dataListTitle, dataListSource)
    }

    public findByReference(entityRef: string) {
        return this.list.find((entity: { [x: string]: string[]; }) => entity[`${this.entityName}ID`][0] === entityRef)
    }
}