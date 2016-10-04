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
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
  },
  sub: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const Item = ({
  title,
  albumTitle,
  artist,
}) => {
  return (
    <View
      style={styles.view}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub} numberOfLines={1} ellipsizeMode="tail">{artist} / {albumTitle}</Text>
    </View>
  );
};

Item.propTypes = {
  title:      React.PropTypes.string.isRequired,
  albumTitle: React.PropTypes.string.isRequired,
  artist:     React.PropTypes.string.isRequired,
};

export default observer(Item);
