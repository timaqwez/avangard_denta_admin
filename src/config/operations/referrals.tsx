import { ColumnType } from '../columns/base';
import { Operations } from './base';

export const referralsOperations: Operations = {
  model: 'referral',
  label: 'Рефералы',
  create: { 
    path: '/admin/referrals/add', 
    fields: [
      {label: 'Код партнера', dataName: 'code', type: ColumnType.STRING, required: true, length: {min: 0, max: 6}},
      {label: 'Имя реферала', dataName: 'name', type: ColumnType.STRING, required: true, length: {min: 0, max: 128}},
      {label: 'Номер телефона', dataName: 'phone', type: ColumnType.PHONE, required: true},
    ], 
    errors: [
      {field: 'phone', code: 1003, message: 'Рефералу уже был начислен бонус'}
    ],
    responseKey: 'id',
  },
}