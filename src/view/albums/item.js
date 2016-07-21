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

const styles = StyleSheet.create({
  album: {
    height: 140,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  album_artwork: {
    width: 120,
    height: 120,
  },
  album_body: {
    flex: 1,
    paddingLeft: 10
  },

  list_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 0
  },
  list_row_trackNo: {
    width: 30,
    textAlign: 'center'
  },
  list_row_title: {
    flex: 1,
    textAlign: 'left'
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
      <ListView
        dataSource={dataSource}
        renderSectionHeader= { () => {
          return (
            <View style={styles.album}>
              <Image style={styles.album_artwork} source={{ uri: artwork }} />
              <View style={styles.album_body}>
                <Text>{title}</Text>
                <Text>{artist} </Text>
              </View>
            </View>
          );
        } }
        renderRow={ (rowData: Song) => {
          return (
            <TouchableOpacity
              onPress={ () => { console.log(rowData); } }
            >
              <View style={styles.list_row}>
                <Text style={styles.list_row_trackNo}>{rowData.trackNo}</Text>
                <Text style={styles.list_row_title}>{rowData.title}</Text>
                <Text>{rowData.duration}</Text>
              </View>
            </TouchableOpacity>
          );
        } }
        renderSeparator={ (sectionID: number, rowID: number) => {
          return <Separator key={`${sectionID}-${rowID}`} />
        } }
      />
    );
  }
}

export default AlbumItem;
