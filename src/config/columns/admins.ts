import { ColumnType, Columns } from './base';

export const adminsColumns: Columns = {
  primary: [
    { title: 'Имя пользователя', dataName: 'username', type: ColumnType.STRING },
    { title: 'Роли', dataName: 'roles', type: ColumnType.ARRAY}
  ],
  submodel: [
    { title: 'Название', dataName: 'name', type: ColumnType.STRING },
  ]
};
