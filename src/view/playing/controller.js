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
    bottom: 50 + 20, // TabBar + padding
  },
  control: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  time: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  control_text: {
    padding: 20,
    fontSize: 20,
  }
});

const Controller = ({
  duration,
  startPause,
  prev, next,
}) => {
  return (
    <View style={styles.view}>
      <View style={styles.time}>
        <Text>{duration}</Text>
      </View>

      <View style={styles.control}>
        <TouchableOpacity onPress={prev}>
          <Text style={styles.control_text}>前へ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={startPause}>
          <Text style={styles.control_text}>再生・一時停止</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={next}>
          <Text style={styles.control_text}>次へ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
Controller.propTypes = {
  duration:   React.PropTypes.string.isRequired,
  startPause: React.PropTypes.func.isRequired,
  prev:       React.PropTypes.func.isRequired,
  next:       React.PropTypes.func.isRequired,
};

export default observer(Controller);
