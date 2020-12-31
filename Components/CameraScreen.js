import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import  {Camera}  from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';



function CameraScreen(props) {
  const { navigation } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [medPermission, setMedPermission] = useState(null);
  const data = {

    text: '',
    translated: '',
    image: '',
  };
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
  var takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.current.takePictureAsync({onPictureSaved: onPictureSaved});
      // const {MediaStatus} = await MediaLibrary.requestPermissionsAsync();
      // setMedPermission(MediaStatus === 'granted');
      // if (medPermission === null){}
      // if (medPermission === false){}
      // const asset = await MediaLibrary.saveToLibraryAsync(photo.uri);
      // MediaLibrary.createAlbumAsync('Expo', asset)

    }
  }
  var makePostRequest = async (url,data) => {
    var endPoint = url;
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    var jsonBody = JSON.stringify(data)
    var requestOptions = {method: 'POST', headers: headers, body: jsonBody, redirect: 'follow'};
    //console.log(requestOptions);
    var response = await fetch(endPoint, requestOptions).catch(error => {console.log(error); return;});
    var response_text = await response.text();
    return response_text;
  }


  var onPictureSaved = async photo => { 
    // Compress Image
    photo = await ImageManipulator.manipulateAsync(
      photo.uri,
      [],
      { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG }
    );
  

    // Load image from filesystem in string Base64 form
    var fileBase64String = await FileSystem
    .readAsStringAsync(photo.uri, { encoding: FileSystem.EncodingType.Base64 })
    .catch((error)=> {console.log("Could not load file:\n"+error);});

    // Construct JSON body with our Base64 string and send it to our text parsing endpoint
      var imageParserEndPoint = "https://us-central1-image-translation-1.cloudfunctions.net/translateImage";
      var jsonBody = {"image_string":fileBase64String}
      var parsed_text = await makePostRequest(imageParserEndPoint,jsonBody);
      console.log("succeed translated");
      data.text = parsed_text ;
      console.log(data.text);
      // data.setState( {text:parsed_text});
      
      await navigation.navigate('Result',{ item: data});
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
        
        
          <TouchableOpacity style={styles.button} onPress ={() => {takePicture()}}> 
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
