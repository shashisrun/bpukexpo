import * as React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Bottom() {
  return (
    <View style={styles.bottom}></View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    paddingVertical: 50,
  },
});
