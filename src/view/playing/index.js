// @flow
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

class PlayingView extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <Text>PLAYING</Text>
      </View>
    );
  }
}

export default PlayingView;
