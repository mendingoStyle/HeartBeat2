import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Heartbeat from './Heartbeat';
import heart from './heart.png';
import AsyncStorage from '@react-native-community/async-storage'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});


const App = ({ heartBeat }) => {
  const imageSize = heartBeat ? 150 : 100;
  async function teste(){
    let inc = await AsyncStorage.getItem("teste5");
      
    if (!!inc) {
      inc = Number(inc) + 1;
      await AsyncStorage.setItem("teste5", inc.toString());
    } else {
      await AsyncStorage.setItem("teste5", "1");
    }
    
    console.log(inc);
  }
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image source={heart} style={{ width: imageSize, height: imageSize }} resizeMode="contain" />
      </View>
      <View style={styles.view}>
      <TouchableOpacity style={styles.button} onPress={() => {
        try{
          teste();
        } catch(e){
          console.log(e);
        }
      }}>
          <Text style={styles.instructions}>Post Queue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => Heartbeat.startService()}>
          <Text style={styles.instructions}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => Heartbeat.stopService()}>
          <Text style={styles.instructions}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  heartBeat: store.App.heartBeat,
});

export default connect(mapStateToProps)(App);
