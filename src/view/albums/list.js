// @flow
import React from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Separator,
} from '../common';
import AlbumItem from './item';

import type {
  Album,
} from '../../store/app';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  artwork: {
    width: 55,
    height: 55,
  },
  body: {
    flex: 1,
    paddingLeft: 10
  }
});

class AlbumList extends React.Component {
  props: {
    navigator: Object,
    albums: [Album],
  };

  render() {
    const dataSource = (new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })).cloneWithRows(this.props.albums)

    return (
      <ListView
        dataSource={dataSource}
        renderRow={ (rowData: Album) => {
          return (
            <TouchableOpacity
              onPress={ () => { this._pressRow(rowData); } }
            >
              <View style={styles.row}>
                <Image style={styles.artwork} source={{ uri: `data:image/png;base64, ${rowData.artwork}` }} />
                <View style={styles.body}>
                  <Text>{rowData.title}</Text>
                  <Text>{rowData.artist} </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        } }
        renderSeparator={ (sectionID: number, rowID: number) => {
          return <Separator key={`${sectionID}-${rowID}`} />
        } }
      />
    )
  }

  _pressRow(album: Album) {
    this.props.navigator.push({
      component: AlbumItem,
      title: album.title,
      passProps: {
        album: album,
      }
    });
  }
}

export default AlbumList;
