import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

import Item from './item';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  }
});

const PlayingView = ({
  nowPlaying,
}) => {
  return (
    <View style={styles.view}>
      <Item {...nowPlaying} />
    </View>
  );
};
PlayingView.propTypes = {
  nowPlaying: React.PropTypes.object.isRequired,
};

export default observer(PlayingView);
