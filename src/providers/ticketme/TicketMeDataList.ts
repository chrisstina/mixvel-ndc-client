import { DataList } from "../../core/response/DataList";
import { DEFAULT_NAMESPACE } from "./config/defaults";

export class TicketMeDataList extends DataList {
  protected constructor(
    entityName: string,
    items: Array<any>,
    dataListEntityName?: string
  ) {
    super(entityName, items);
    try {
      this.list =
        items[0][`${DEFAULT_NAMESPACE}:${entityName}List`][0][
          `${DEFAULT_NAMESPACE}:${dataListEntityName || entityName}`
        ];
    } catch (e: any) {
      console.error(`Failed to find ${entityName} DataList: ${e.stack}`);
      this.list = [];
    }
  }

  public static create(
    dataListTitle: string,
    dataListSource: Array<any>,
    dataListEntityName?: string
  ) {
    return new TicketMeDataList(
      dataListTitle,
      dataListSource,
      dataListEntityName
    );
  }

  findByReference(entityRef: string, keyName?: string) {
    return this.list.find(
      (entity: { $: Record<string, string> }) =>
        entity.$[keyName || `${this.entityName}Key`] === entityRef
    );
  }
}
