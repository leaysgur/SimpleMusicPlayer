import React from 'react';
import {
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import ArtistList from './list';

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

const ArtistsView = ({
  artists,
  onPressRow,
}) => {
  const route = {
    component: ArtistList,
    title: 'すべてのアーティスト',
    passProps: {
      artists,
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
ArtistsView.propTypes = {
  artists:    React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onPressRow: React.PropTypes.func.isRequired,
};

export default ArtistsView;
