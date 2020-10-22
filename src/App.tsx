/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useNfc from './useNfc';

const Component = () => {
  const {handleReadNfc, cleanUp} = useNfc();

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>NFC Demo</Text>
      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={handleReadNfc}>
        <Text>Test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={cleanUp}>
        <Text>Cancel Test</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Component;
