import { AccountIcon } from '../../components/icons/AccountIcon';
import { AdminIcon } from '../../components/icons/AdminIcon';
import { InfoIcon } from '../../components/icons/InfoIcon';
import { ColumnType } from '../columns/base';
import { Operations } from './base';

export const adminsOperations: Operations = {
  model: 'admin',
  label: 'Администраторы',
  get: { path: '/admin/accounts/get/by-id', fields: [
      {label: 'ID', dataName: 'id', type: ColumnType.NUMBER, required: true, noDisplay: true},
    ], responseKey: 'account'
  },
  list: { path: '/admin/accounts/list/get', fields: [
    ], responseKey: 'accounts'
  },
  create: { 
    path: '/admin/accounts/create', 
    fields: [
      {label: 'Имя пользователя', dataName: 'username', type: ColumnType.STRING, required: true, length: {min: 6, max: 32}},
      {label: 'Пароль', dataName: 'password', type: ColumnType.STRING, required: true, length: {min: 6, max: 128}},
      {label: 'Роль', dataName: 'role_id', type: ColumnType.DROPDOWN},
    ], 
    errors: [
      {field: 'username', code: 1003, message: 'Администратор с данным именем пользователя уже существует'}
    ],
    responseKey: 'id',
  },
  update: { path: '/admin/accounts/update', fields: [
      {label: 'ID', dataName: 'id', type: ColumnType.NUMBER, noDisplay: true},
      {label: 'Имя пользователя', dataName: 'username', type: ColumnType.STRING, length: {min: 6, max: 32}, required: true, description: 'Отображаемое имя пользователя', icon: <AccountIcon height={30} width={30}/>},
      {label: 'Пароль', dataName: 'password', type: ColumnType.STRING, length: {min: 6, max: 128}, description: 'Изменить пароль пользователя', icon: <AdminIcon height={30} width={30}/>},
      {label: 'Активный', dataName: 'is_active', type: ColumnType.BOOLEAN, description: 'Статус пользователя', icon: <InfoIcon height={30} width={30}/>},
    ],
    errors: [
      {field: 'username', code: 1003, message: 'Администратор с данным именем пользователя уже существует'}
    ],
  },
  delete: { path: '/admin/accounts/delete', fields: [
      {label: 'ID', dataName: 'id', type: ColumnType.NUMBER, noDisplay: true},
    ],
  },
  submodel: {
    model: 'roles',
    label: 'Роли',
    create: { 
      path: '/admin/accounts/roles/create', 
      fields: [
        {label: 'ID Аккаунта', dataName: 'account_id', parentDataName: 'id', type: ColumnType.STRING, required: true, length: {min: 6, max: 32}, noDisplay: true},
        {label: 'Роль', dataName: 'role_id', type: ColumnType.DROPDOWN, required: true},
      ], 
      errors: [
        {field: 'role_id', code: 1003, message: 'Аккаунт уже имеет данную роль'}
      ],
    },
    delete: { path: '/admin/accounts/roles/delete', fields: [
      {label: 'ID', dataName: 'id', type: ColumnType.NUMBER, noDisplay: true},
      ],
    },
    list: { path: '/admin/accounts/roles/get', fields: [
      {label: 'ID', dataName: 'account_id', type: ColumnType.NUMBER, parentDataName: 'id', noDisplay: true},
      ], responseKey: 'account_roles'
    },
  }
};
