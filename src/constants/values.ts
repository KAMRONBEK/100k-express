import {useSelector} from 'react-redux';
import {images} from '../assets';
import {selectUser} from '../redux/slices/user/user';

export enum locationType {
  from = 'from',
  to = 'to',
  user = 'user',
  filterFrom = 'filterFrom',
  filterTo = 'filterTo',
}

export const mailStatus = [
  {id: 0, title: 'Yangi', value: 'new'},
  {id: 1, title: 'Kurier topildi', value: 'accepted'},
  {id: 2, title: "Yo'lda", value: 'active'},
  {id: 4, title: 'Bekor qilingan', value: 'canceled'},
  {id: 3, title: 'Bajarilgan', value: 'completed'},
];

export const transportType = [
  {
    id: 0,
    title: 'Engil avtomobil',
    value: 'car',
    icon: images.carOne,
    selected: false,
  },
  {
    id: 1,
    title: 'Yuk avtomobil',
    value: 'truck',
    icon: images.delivery,
    selected: true,
  },
  {
    id: 2,
    title: 'Transport',
    value: 'special_car',
    icon: images.frontalTruck,
    selected: false,
  },
];

export const transportCostType = [
  {
    id: 0,
    title: 'Kelishiladi',
    value: 'bargain',
  },
  {
    id: 1,
    title: 'Kun bay',
    value: 'per_day',
  },
  {
    id: 2,
    title: 'KM bay',
    value: 'per_km',
  },
  {
    id: 3,
    title: 'Soat bay',
    value: 'per_hour',
  },
];
