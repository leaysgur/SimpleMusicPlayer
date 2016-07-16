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

import type {
  Song,
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

class AlbumItem extends React.Component {
  props: {
    album: Album,
  };

  render() {
    const {
      title,
      artist,
      artwork,
      songs,
    } = this.props.album;
    const dataSource = (new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })).cloneWithRows(songs)

    return (
      <View>
        <View style={styles.row}>
          <Image style={styles.artwork} source={{ uri: `data:image/png;base64, ${artwork}` }} />
          <View style={styles.body}>
            <Text>{title}</Text>
            <Text>{artist} </Text>
          </View>
        </View>

        <ListView
          dataSource={dataSource}
          renderRow={ (rowData: Song) => {
            return (
              <TouchableOpacity
                onPress={ () => { console.log(rowData); } }
              >
                <View style={styles.row}>
                  <View style={styles.body}>
                    <Text>{rowData.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          } }
          renderSeparator={ (sectionID: number, rowID: number) => {
            return <Separator key={`${sectionID}-${rowID}`} />
          } }
        />
      </View>
    );
  }
}

export default AlbumItem;
