/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  ColorPicker
} from 'react-native-color-picker'
import {
  ColorPickerApi
} from 'ern-color-picker-api'

let currentColor

export default class ColorPickerDemo extends Component {
  alertOn = true //Useful to set to true when running standalone.
  render() {
    return ( <
      ColorPicker onColorSelected = {
        color => {
          currentColor = color
          if (this.alertOn) {
            alert(`Color selected: ${currentColor}`)
          }
          ColorPickerApi.events().emitColorSelected(currentColor)
        }
      }
      style = {
        styles.container
      }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

ColorPickerApi.requests().registerGetSelectedColorRequestHandler((requestData) => {
  if (currentColor) {
    Promise.resolve(currentColor)
  } else {
    Promise.reject('No color currently selected')
  }
})
