import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import  {Camera}  from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';




function CameraScreen(props) {
  const { navigation } = props
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
//  const [cameraRef,SetCameraRef] = useState(null);
//  const cameraRef = useRef();




  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}  ref={(ref) => { ref = cam }}  >
        <View style={styles.buttonContainer}>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
               }}>
            <Text style={styles.text} > Flip </Text>
          </TouchableOpacity>     
        
        
          <TouchableOpacity style={styles.button} onPress={async() => {
               if(cameraRef){
              let photo = await cameraRef.takePictureAsync().then(data => {
                MediaLibrary.saveToLibraryAsync(data.uri);
              console.log('photo', photo);
            })
          }
          }}> </TouchableOpacity>
          
      
          <TouchableOpacity
          style={styles.button}
          onPress={() => {navigation.navigate('Home')
             }}>
          <Text style={styles.text}> Home </Text>
        </TouchableOpacity>     
         
        </View>
      </Camera>
    </View>
  );
 
}


const _takePicture = async () => {
    
  let photo = await cam.current.takePictureAsync();
  let assert = await MediaLibrary.createAssetAsync(photo);
  MediaLibrary.saveToLibraryAsync(localUri);



}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',

      margin: 20,
    },
    button: {
      alignSelf: 'flex-end',
      alignItems: 'center',

    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });

  export default CameraScreen;
