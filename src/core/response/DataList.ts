import { IDataList } from "../../interfaces/IDataList";

export class DataList implements IDataList {
  readonly entityName: string;
  list: any;

  protected constructor(entityName: string, items: Array<any>) {
    this.entityName = entityName;
  }

  public static create(dataListTitle: string, dataListSource: Array<any>) {
    return new DataList(dataListTitle, dataListSource);
  }

  findByReference(entityRef: string) {
    return this.list.find(
      (entity: { [x: string]: string[] }) =>
        entity[`${this.entityName}ID`][0] === entityRef
    );
  }
}
