import { ColumnType } from "../columns/base";

export interface Error {
  field: string,
  code: number,
  message: string,
}

export interface OperationField {
  label: string, 
  description?: string,
  dataName: string,
  type: ColumnType,
  required?: boolean,
  noDisplay?: boolean,
  parentDataName?: string,
  length?: {
    min: number,
    max: number,
  },
  prefix?: string,
  postfix?: string,
  multiline?: boolean,
  multiple?: boolean,
  icon?: any,
  information_text?: any,
}

export interface Operation {
  fields: OperationField[];
  path?: string;
  responseKey?: string;
  errors?: Error[];
}


export interface Operations {
    model: string;
    label: string,
    get?: Operation;
    list?: Operation;
    create?: Operation;
    update?: Operation;
    delete?: Operation;
    submodel?: Operations;
  }