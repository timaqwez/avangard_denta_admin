import { ColumnType } from '../columns/base';
import { Operations } from './base';

export const sessionsOperations: Operations = {
  model: 'session',
  label: 'Сессии',
  create: { 
    path: '/sessions/create', 
    fields: [
      {label: 'Логин', dataName: 'username', type: ColumnType.STRING, required: true, length: {min: 6, max: 128} },
      {label: 'Пароль', dataName: 'password', type: ColumnType.STRING, required: true, length: {min: 6, max: 32} },
    ], 
    errors: [
      {field: 'username', code: 1000, message: 'Неверное имя пользователя или пароль'},
      {field: 'username', code: 2000, message: 'Неверное имя пользователя или пароль'}
    ],
    responseKey: 'id',
  },
  delete: { path: '/admin/partners/delete', fields: [
    {label: 'ID', dataName: 'id', type: ColumnType.NUMBER},
  ]
},
};