import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

function Home ( props){
  const { navigation } = props
  return (
    <View style={styles.container}>
    <TouchableOpacity
      onPress={() => navigation.navigate('Camera') }>
      <Text > Scan </Text>
    </TouchableOpacity>
    </View>
  );


}
  
  const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        }
    })

    export default Home;