import React, { useState } from "react";
import { View } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import {
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Appbar, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";

const Home = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
  
    if (!permission){
        console.log('Permission not granted')
    }
  
    if (!permission?.granted){
        console.log('Permission granted')

    }
  
    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <Appbar.Header elevated style={styles.header}>
          <Appbar.Content title="Play Pic" titleStyle={styles.logo} />
        </Appbar.Header>
        <View style={styles.mainWrapper}>
            <View style={styles.captureView}>
            <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
            </View>
        </View>   
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    display: "flex",
  },
  logo: {
    color: "black",
    fontSize: 28,
    fontWeight: "bold",
  },
  mainWrapper:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  captureView:{
    width:300,
    height:300,
    borderRadius:50,
    marginTop:20,
    backgroundColor:'grey',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    color:'white'
  },
  buttonContainer:{
    backgroundColor:'black',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    color:'white'
  },
  text:{
    color:'white'
  }
});
