import { ColumnType, Columns } from './base';

export const partnersColumns: Columns = {
  primary: [
    { title: 'ФИО', dataName: 'fullname', type: ColumnType.STRING },
    { title: 'Эл. почта', dataName: 'email', type: ColumnType.STRING },
    { title: 'Код', dataName: 'code', type: ColumnType.STRING },
    { title: 'Переходов', dataName: 'clicks', type: ColumnType.NUMBER },
    { title: 'Привлечено', dataName: 'referrals', type: ColumnType.NUMBER },
  ],
};
