import Cookies from 'cookies-js';
import { CookieStorage } from 'redux-persist-cookie-storage';
// Cookies.set('test_cookie', 'test_value', { expires: 30 * 86400 });
const persistConfig = {
  key: 'root',
  storage: new CookieStorage(Cookies, {
    expiration: {
      // default: 30 * 86400
      default:60*20
    },
    path: '/',
  }),
  whitelist: ['user'],
};
export default persistConfig;
