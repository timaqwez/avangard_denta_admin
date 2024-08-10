import { ColumnType, Columns } from './base';

export const promotionsColumns: Columns = {
  primary: [{ title: 'Название', dataName: 'name', type: ColumnType.STRING },
    { title: 'Бонус партнеру', dataName: 'referrer_bonus', type: ColumnType.STRING, postfix: 'RUB' },
    { title: 'Бонус рефералу', dataName: 'referral_bonus', type: ColumnType.STRING, postfix: 'RUB' },]
  
};
