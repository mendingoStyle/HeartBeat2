import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setHeartBeat, store } from './store';
import AsyncStorage from '@react-native-community/async-storage'

const MyHeadlessTask = async () => {
 async function teste() {
    let inc = await AsyncStorage.getItem("teste5");
    if(!!inc && inc > 0 ){
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          message: "alo"
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
      }

      fetch('http://192.168.1.5:9000/teste',data)
        .then(async (response) => {
          if (response.status === 200) {
            console.log('success');
            store.dispatch(setHeartBeat(true));
            inc = Number(inc) - 1;
            await AsyncStorage.setItem("teste5", inc.toString());
            setTimeout(() => {
              store.dispatch(setHeartBeat(false));
            }, 1000);
          } else {
            console.log('error');
          }
        })
        .catch((error) => {
            console.log(error);
        })
      }
  }
  await teste();
  
  
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
