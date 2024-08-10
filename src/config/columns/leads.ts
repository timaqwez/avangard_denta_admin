import { ColumnType, Columns } from './base';

export const leadsColumns: Columns = {
  primary: [
    { title: 'Имя', dataName: 'name', type: ColumnType.STRING },
    { title: 'Номер телефона', dataName: 'phone', type: ColumnType.STRING },
    { title: 'Обработан', dataName: 'is_processed', type: ColumnType.BOOLEAN },
  ],
};
