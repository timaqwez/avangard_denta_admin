import { ColumnType } from '../columns/base';
import { Operations } from './base';

export const partnersOperations: Operations = {
  model: 'partner',
  label: 'Партнеры',
  create: { 
    path: '/admin/partners/create', 
    fields: [
      {label: 'ID Акции', dataName: 'promotion_id', type: ColumnType.NUMBER, required: true, noDisplay: true},
      {label: 'ID Клиента', dataName: 'client_id', type: ColumnType.SEARCH_DROPDOWN, required: true, multiple: true},
    ], 
    errors: [
      {field: 'client_id', code: 1003, message: 'Партнер уже добавлен в эту акцию'}
    ],
    responseKey: 'id',
  },
  delete: { path: '/admin/partners/delete', fields: [
    {label: 'ID', dataName: 'id', type: ColumnType.NUMBER},
  ]
},
};
