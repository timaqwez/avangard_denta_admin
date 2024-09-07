export enum ColumnType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  REACT_NODE = 'react_node',
  OBJECT = 'object',
  DROPDOWN = 'dropdown',
  SEARCH_DROPDOWN = 'search_dropdown',
  ARRAY = 'array',
  PHONE = 'phone',
}

export interface Column {
    title: string,
    dataName: string,
    type: ColumnType,
    prefix?: string,
    postfix?: string,
  }

export interface Columns {
  primary: Column[],
  submodel?: Column[],
}
  