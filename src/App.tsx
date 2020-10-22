/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useNfc from './useNfc';

const Component = () => {
  const {handleReadNfc, cleanUp} = useNfc();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <Text style={{marginBottom: 30, textAlign: 'center', fontSize: 22}}>
          NFC Demo
        </Text>
        <TouchableOpacity
          style={{
            padding: 10,
            width: 200,
            marginVertical: 20,
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
            marginVertical: 20,
            borderWidth: 1,
            borderColor: 'black',
          }}
          onPress={cleanUp}>
          <Text>Cancel Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Component;
