import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';

import {RNCamera} from 'react-native-camera';

const Background = () => {
  return (
    <>
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused} />
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom} />
    </>
  );
};

const App = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanned, setScanned] = useState(false)

  const onBarCodeRead = (e) => {
    setIsScanning(false)
    setScanned(true)
    Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
  }

  return (
    <View style={styles.container}>
    <RNCamera
      style={styles.preview}
      onBarCodeRead={isScanning ? onBarCodeRead : undefined}
      ref={(cam) => (this.camera = cam)}
      rectOfInterest={{ x: 0.25, y: 0.25, width: 0.4, height: 0.4, }}
      >
      <Background />
    </RNCamera>
    
    <View style={styles.bottomOverlay}>
      {!isScanning && <Button title='start scanning' onPress={() => { setIsScanning(true) }} />}
      {isScanning && <Text style={{ color: 'white', fontSize: 20 }}>Scanning...</Text>}
      {isScanning && <Button title='stop scanning' onPress={() => { setIsScanning(false) }} />}
    </View>
  </View>
  )
}

export default App

const opacity = "rgba(0, 0, 0, .4)";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1.2,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 0.8,
    backgroundColor: opacity,
  },
  focused: {
    flex: 3,
  },
  layerRight: {
    flex: 0.8,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
  },
});
