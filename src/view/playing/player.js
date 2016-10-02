import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const Player = ({
  songTitle,
  albumTitle,
  artist,
  currentTime,
}) => {
  return (
    <View
      style={styles.view}
    >
      <Text>==============</Text>
      <Text>{songTitle}</Text>
      <Text>{albumTitle}</Text>
      <Text>{artist}</Text>
      <Text>{currentTime}</Text>
      <Text>--------------</Text>
    </View>
  );
};
Player.propTypes = {
  songTitle:   React.PropTypes.string,
  albumTitle:  React.PropTypes.string,
  artist:      React.PropTypes.string,
  currentTime: React.PropTypes.number,
};

export default Player;
