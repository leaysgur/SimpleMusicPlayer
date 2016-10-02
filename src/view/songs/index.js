import React from 'react';
import {
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import SongList from './list';

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

const SongsView = ({
  songs,
  onPressRow,
}) => {
  const route = {
    component: SongList,
    title: 'すべての曲',
    passProps: {
      songs,
      onPressRow,
    }
  };

  return (
    <NavigatorIOS
      initialRoute={route}
      style={styles.view}
    />
  );
};
SongsView.propTypes = {
  songs:      React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onPressRow: React.PropTypes.func.isRequired,
};

export default SongsView;
