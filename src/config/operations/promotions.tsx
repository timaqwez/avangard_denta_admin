import { ColumnType } from '../columns/base';
import { Operations } from './base';
import { MessageIcon } from '../../components/icons/MessageIcon'
import { MoneyNoteIcon } from '../../components/icons/MoneyNoteIcon';

export const promotionsOperations: Operations = {
  model: 'promotion',
  label: 'Акции',
  get: { path: '/admin/promotions/get', fields: [
      {label: 'ID', dataName: 'id', type: ColumnType.NUMBER, required: true},
    ], responseKey: 'promotion'
  },
  list: { path: '/admin/promotions/list/get', fields: [
    ], responseKey: 'promotions'
  },
  create: { 
    path: '/admin/promotions/create', 
    fields: [
      {label: 'Название', dataName: 'name', type: ColumnType.STRING, required: true, length: {min: 6, max: 32}},
      {label: 'Бонус партнера', dataName: 'referrer_bonus', type: ColumnType.NUMBER, required: true, postfix: 'RUB'},
      {label: 'Бонус реферала', dataName: 'referral_bonus', type: ColumnType.NUMBER, required: true, postfix: 'RUB'},
      {label: 'СМС-сообщение при добавлении партнера', dataName: 'sms_text_partner_create', type: ColumnType.STRING, multiline: true, required: true, 
        information_text: `При составлении текста сообщения необходимо использовать следующие переменные:\n
        1. {fullname} - полное имя партнера,\n
        2. {link} - персональная ссылка партнера,\n
        3. {referrer_bonus} - бонус для партнера,\n
        4. {referral_bonus} - бонус для клиента\n`,
      },
      {label: 'СМС-сообщение при добавлении партнера c реферальным текстом', dataName: 'sms_text_for_referral', type: ColumnType.STRING, multiline: true, required: true, information_text: `При составлении текста сообщения необходимо использовать следующие переменные:\n
        1. {link} - персональная ссылка партнера,\n
        2. {referral_bonus} - бонус для клиента за заказ услуги по промокоду\n`,},
      {label: 'СМС-сообщение партнеру о начислении вознаграждения', dataName: 'sms_text_referrer_bonus', type: ColumnType.STRING, multiline: true, required: true, 
        information_text: `При составлении текста сообщения необходимо использовать следующие переменные:\n
        1. {fullname} - полное имя партнера,\n
        2. {referrer_bonus} - бонус для партнера за преведенного клиента\n`,
      },
      {label: 'СМС-сообщение рефералу о начислении вознаграждения', dataName: 'sms_text_referral_bonus', type: ColumnType.STRING, multiline: true, required: true, 
        information_text: `При составлении текста сообщения необходимо использовать следующие переменные:\n
        1. {name} - имя реферала,\n
        2. {referral_bonus} - бонус клиенту за заказ услуги по промокоду\n`,
      },
    ], 
    errors: [
      {field: 'username', code: 1003, message: 'Администратор с данным именем пользователя уже существует'},
      {field: 'sms_text_partner_create', code: 1008, message: 'Строка не включает в себя необходимые ключи'},
      {field: 'sms_text_for_referral', code: 1008, message: 'Строка не включает в себя необходимые ключи'},
      {field: 'sms_text_referrer_bonus', code: 1008, message: 'Строка не включает в себя необходимые ключи'},
      {field: 'sms_text_referral_bonus', code: 1008, message: 'Строка не включает в себя необходимые ключи'},
    ],
    responseKey: 'id',
  },
  update: { path: '/admin/promotions/update', fields: [
      {
        label: 'ID', 
        dataName: 'id', 
        type: ColumnType.NUMBER, 
        noDisplay: true
      },
      {
        label: 'Бонус партнера', 
        dataName: 'referrer_bonus', 
        type: ColumnType.NUMBER, 
        postfix: 'RUB', 
        required: true, 
        icon: <MoneyNoteIcon width={30} height={30}/>,
      },
      {
        label: 'Бонус реферала', 
        dataName: 'referral_bonus', 
        type: ColumnType.NUMBER, 
        postfix: 'RUB', 
        required: true, 
        icon: <MoneyNoteIcon width={30} height={30}/>,
      },
      {
        label: 'СМС-сообщение при добавлении партнера', 
        dataName: 'sms_text_partner_create', 
        type: ColumnType.STRING, 
        multiline: true, 
        required: true, 
        icon: <MessageIcon width={30} height={30}/>, 
        information_text: `При составлении текста сообщения необходимо использовать следующие переменные:\n
        1. {fullname} - полное имя партнера,\n
        2. {link} - персональная ссылка партнера,\n
        3. {referrer_bonus} - бонус для партнера,\n
        4. {referral_bonus} - бонус для клиента\n`,
      },
      {
        label: 'СМС-сообщение при добавлении партнера c реферальным текстом', 
        dataName: 'sms_text_for_referral', 
        type: ColumnType.STRING, 
        multiline: true, 
        required: true, 
        icon: <MessageIcon width={30} height={30}/>, 
        information_text: `При составлении текста сообщения необходимо использовать следующие переменные:\n
        1. {link} - персональная ссылка партнера,\n
        2. {referral_bonus} - бонус для клиента за заказ услуги по промокоду\n`,
      },
      {
        label: 'СМС-сообщение партнеру о начислении вознаграждения', 
        dataName: 'sms_text_referrer_bonus', 
        type: ColumnType.STRING, 
        multiline: true, 
        required: true, 
        icon: <MessageIcon width={30} height={30}/>, 
        information_text: `При составлении текста сообщения необходимо использовать следующие переменные:\n
        1. {fullname} - полное имя партнера,\n
        2. {referrer_bonus} - бонус для партнера за преведенного клиента\n`,
      },
      {
        label: 'СМС-сообщение рефералу о начислении вознаграждения', 
        dataName: 'sms_text_referral_bonus', 
        type: ColumnType.STRING, 
        multiline: true, 
        required: true, 
        icon: <MessageIcon width={30} height={30}/>, 
        information_text: `При составлении текста сообщения необходимо использовать следующие переменные:\n
        1. {name} - имя реферала,\n
        2. {referral_bonus} - бонус клиенту за заказ услуги по промокоду\n`,
      },
    ],
    errors: [
      {field: 'sms_text_partner_create', code: 1008, message: 'Строка не включает в себя необходимые ключи'},
      {field: 'sms_text_for_referral', code: 1008, message: 'Строка не включает в себя необходимые ключи'},
      {field: 'sms_text_referrer_bonus', code: 1008, message: 'Строка не включает в себя необходимые ключи'},
      {field: 'sms_text_referral_bonus', code: 1008, message: 'Строка не включает в себя необходимые ключи'},
    ]
  },
  delete: { path: '/admin/promotions/delete', fields: [
    {label: 'ID', dataName: 'id', type: ColumnType.NUMBER},
  ]
},
};
