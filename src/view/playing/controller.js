import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50 + 10, // TabBar + padding
  },
  control: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  control_text: {
    padding: 10,
    fontSize: 20,
  }
});

const Controller = ({
  duration,
  togglePlay,
  skipPrev, skipNext,
  toggleShuffle,
  changeRepeat,
}) => {
  return (
    <View style={styles.view}>
      <View style={styles.time}>
        <Text>{duration}</Text>
      </View>

      <View style={styles.control}>
        <TouchableOpacity onPress={toggleShuffle}>
          <Text style={styles.control_text}>ランダム</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeRepeat}>
          <Text style={styles.control_text}>リピート</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.control}>
        <TouchableOpacity onPress={skipPrev}>
          <Text style={styles.control_text}>前へ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlay}>
          <Text style={styles.control_text}>再生・一時停止</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipNext}>
          <Text style={styles.control_text}>次へ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
Controller.propTypes = {
  duration:      React.PropTypes.string.isRequired,
  togglePlay:    React.PropTypes.func.isRequired,
  skipPrev:      React.PropTypes.func.isRequired,
  skipNext:      React.PropTypes.func.isRequired,
  toggleShuffle: React.PropTypes.func.isRequired,
  changeRepeat:  React.PropTypes.func.isRequired,
};

export default observer(Controller);
