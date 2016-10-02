import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const Player = ({
  title,
  albumTitle,
  artist,
  duration,
  // currentTime,
}) => {
  return (
    <View
      style={styles.view}
    >
      <Text>==============</Text>
      <Text>{title}</Text>
      <Text>{albumTitle}</Text>
      <Text>{artist}</Text>
      <Text>{duration}</Text>
      <Text>--------------</Text>
    </View>
  );
};
Player.propTypes = {
  title:      React.PropTypes.string,
  albumTitle: React.PropTypes.string,
  artist:     React.PropTypes.string,
  duration:   React.PropTypes.string,
  // currentTime: React.PropTypes.number,
};

export default observer(Player);
