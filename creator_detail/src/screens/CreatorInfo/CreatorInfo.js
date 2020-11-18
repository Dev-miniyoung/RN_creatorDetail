import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'flex-start',
  },
});

function CreatorInfo() {
  return (
    <View style={styles.container}>
      <Text>CreatorInfo</Text>
    </View>
  );
}

export default CreatorInfo;
