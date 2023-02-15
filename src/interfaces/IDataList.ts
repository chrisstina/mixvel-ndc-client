export interface IDataList {
  entityName: string;
  list: any;

  findByReference(entityRef: string): any;
}
