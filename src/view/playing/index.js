import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

import Item from './item';
import Controller from './controller';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  }
});

const PlayingView = ({
  nowPlaying,
  controllerAction,
}) => {
  return (
    <View style={styles.view}>
      <Item {...nowPlaying} />
      <Controller
        duration={nowPlaying.duration}
        {...controllerAction}
      />
    </View>
  );
};
PlayingView.propTypes = {
  nowPlaying:       React.PropTypes.object.isRequired,
  controllerAction: React.PropTypes.object.isRequired,
};

export default observer(PlayingView);
