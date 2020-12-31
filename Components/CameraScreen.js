import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import  {Camera}  from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Permission from 'expo-permissions'





function CameraScreen(props) {
  const { navigation } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [medPermission, setMedPermission] = useState(null);
//  const [cameraRef,SetCameraRef] = useState(null);
  const cameraRef = useRef(null|Camera);




  useEffect(() => { (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();}, []);

  if (hasPermission === null) {
    return <View />;
  } 
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.current.takePictureAsync();
      const {MediaStatus} = await MediaLibrary.requestPermissionsAsync();
      setMedPermission(MediaStatus === 'granted');
      if (medPermission === null){}
      if (medPermission === false){}
      const asset = await MediaLibrary.saveToLibraryAsync(photo.uri);
      MediaLibrary.createAlbumAsync('Expo', asset)

    }
  }
  
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef} >
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
        
        
          <TouchableOpacity style={styles.button} onPress ={() => takePicture()}> 
          <Text style={styles.text}> Capture</Text>
          </TouchableOpacity>
          
      
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
    
  let photo = await Camera.useRef().current.takePictureAsync();
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
