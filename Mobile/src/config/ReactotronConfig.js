import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reatotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ host: '192.168.100.32' })
    .useReactNative()
    .use(reactotronRedux())
    .use(reatotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
