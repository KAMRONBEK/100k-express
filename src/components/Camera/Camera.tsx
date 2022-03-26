import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Camera as RNCamera, useCameraDevices } from 'react-native-vision-camera'

const Camera = () => {
  const devices = useCameraDevices()
  const device = devices.back;
  if (device == null) (<Text>waiting</Text>)

  return (
    <View>
      <Text>
        asdasd
      </Text>
      <RNCamera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    </View>
  )
}

export default Camera
