import axios from 'axios';
import {navigate} from '../navigation/NavigationService';
import {routes} from '../navigation/routes';
import {store} from '../redux/configureStore';
import {logoutUser, updateProfile} from '../redux/slices/user/user';

export let url = 'https://dev.100k.uz/api';

axios.interceptors.request.use(response => {
  let token = store.getState().user.data;
  if (!!token) {
    response.headers = {
      ...response.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return response;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 555) {
      store.dispatch(logoutUser());
      navigate(routes.LOGIN, {});
      return error;
    } else if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    // const token = AsyncStorage.getItem("@token");
    const token = store.getState().user.data;

    return axios
      .post(`${url}/auth/refresh-token?token=${token}`)
      .then(({data}) => {
        const config = error.config;
        store.dispatch(updateProfile({data: data.token}));
        config.headers = {
          Authorization: `Bearer ${data.token}`,
        };
        return new Promise((resolve, reject) => {
          axios
            .request(config)
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      })
      .catch(err => {
        return new Promise((resolve, reject) => {
          reject(err);
        });
      });
  },
);

export let requests = {
  auth: {
    requestPassword: (username = '') =>
      axios.post(`${url}/auth/password`, {username}),
    login: (credentials: any) => axios.post(`${url}/auth/login`, credentials),
  },
  user: {
    getMe: () => axios.get(`${url}/user/getMe`),
    updateUser: credentials => axios.post(`${url}/user/update`, credentials),
  },
  mail: {
    common: {
      getCommonMail: () => axios.get(`${url}/packages`),
    },
    user: {
      getMail: () => axios.get(`${url}/user/packages`),
      getPackageListMail: () => axios.get(`${url}/user/package-list`),
      editMail: (credentials, id) =>
        axios.post(`${url}/user/packeges/${id}`, credentials),
      createMail: credentials =>
        axios.post(`${url}/user/packages`, credentials),
    },
    driver: {
      getMail: () => axios.get(`${url}/driver/packages`),
      buyContact: id => axios.post(`${url}/driver/package/${id}/buy`),
    },
    recipient: {
      getReceiveMail: () => axios.get(`${url}/recipient/packages`),
    },
  },
  transport: {
    common: {
      getCommonTransport: () => axios.get(`${url}/transports`),
    },
    user: {
      getTransport: (status = '') =>
        axios.get(`${url}/user/transports?status=${status}`),
    },
    driver: {
      getTransport: (status = '') => axios.get(`${url}/driver/transports`),
      createTransport: credentials =>
        axios.post(`${url}/driver/transports`, credentials),
      editTransport: (credentials, id) =>
        axios.post(`${url}/driver/transport/${id}`, credentials),
      deleteTransport: (credentials, id) =>
        axios.post(`${url}/driver/transport/${id}`, credentials),
      getCommonTransport: () => axios.get(`${url}/transports`),
    },
    getTransportBuyContact: id => axios.post(`${url}/user/transport/${id}/buy`),
  },
  taxi: {
    common: {
      getCommonTaxi: () => axios.get(`${url}/caborders`),
    },
    user: {
      getTaxi: () => axios.get(`${url}/user/caborders`),
      createPassanger: credentials =>
        axios.post(`${url}/user/caborders`, credentials),
      editPassanger: (credentials, id) =>
        axios.post(`${url}/user/caborders/${id}`, credentials),
    },
    driver: {
      getSeenTaxi: () => axios.get(`${url}/driver/caborders`),
      buyContact: id => axios.post(`${url}/driver/caborder/${id}/buy`),
    },
  },
  load: {
    common: {
      getCommonLoad: () => axios.get(`${url}/cargo`),
    },
    user: {
      getLoad: (status = '') => axios.get(`${url}/user/cargo`),
      createLoad: credentials => axios.post(`${url}/user/cargo`, credentials),
      editLoad: (credentials, id) =>
        axios.post(`${url}/user/cargo/${id}`, credentials),
    },
    driver: {
      getLoad: (status = '') => axios.get(`${url}/driver/cargo`),
    },
    getSeenLoad: id => axios.post(`${url}/driver/cargo/${id}/buy`),
  },
  help: {
    getRegions: () => axios.get(`${url}/locations`),
  },
  courier: {
    becomeCourier: credentials =>
      axios.post(`${url}/user/become-driver`, credentials),
  },
  uploads: {
    uploadImage: form => axios.post(`${url}/upload-file`, form),
  },
};
