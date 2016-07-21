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
import AlbumList from '../albums/list';

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

class ArtistList extends React.Component {
  props: {
    navigator: Object,
    artists: Artists,
  };

  render() {
    const dataSource = (new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })).cloneWithRows(this.props.artists)

    return (
      <ListView
        dataSource={dataSource}
        renderRow={ (rowData: Artist) => {
          return (
            <TouchableOpacity
              onPress={ () => { this._pressRow(rowData); } }
            >
              <View style={styles.row}>
                <Image style={styles.artwork} source={{ uri: rowData.artwork }} />
                <View style={styles.body}>
                  <Text>{rowData.name}</Text>
                  <Text>{rowData.albums.length}枚のアルバム</Text>
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

  _pressRow(artist: Artist) {
    this.props.navigator.push({
      component: AlbumList,
      title: artist.name,
      passProps: {
        albums: artist.albums,
      }
    });
  }
}

export default ArtistList;
