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

type Album = {
  title:   string;
  artist:  string;
  artwork: string;
};

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
  _pressRow: () => bool;

  props: {
    albums: [Album]
  };

  constructor() {
    super();

    this._pressRow = this._pressRow.bind(this);
  }

  render() {
    const dataSource = (new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })).cloneWithRows(this.props.albums)

    return (
      <ListView
        dataSource={dataSource}
        renderRow={ (rowData: Album, sectionID: number, rowID: number) => {
          return (
            <TouchableOpacity
              onPress={ () => { this._pressRow(rowID); } }
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

  _pressRow(rowID: number) {
    console.log('Press!', rowID);
  }
}

export default AlbumList;
