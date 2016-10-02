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
    flex: 1,
  },
});

const Controller = ({
  duration,
  startPause,
  prev, next,
}) => {
  return (
    <View
      style={styles.view}
    >
      <Text>{duration}</Text>
      <TouchableOpacity onPress={prev}>
        <Text>前へ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={startPause}>
        <Text>再生・一時停止</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={next}>
        <Text>次へ</Text>
      </TouchableOpacity>
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
