// @flow
import React from 'react';
import {
  ListView,
  Text,
  TouchableOpacity,
} from 'react-native';

type Songs = {
  title: String;
  artist: String;
  albumTitle: String;
};

class SongList extends React.Component {
  props: {
    songs: [Songs]
  };

  render() {
    const dataSource = (new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })).cloneWithRows(this.props.songs)

    return (
      <ListView
        dataSource={dataSource}
        renderRow={ (rowData) => {
          return (
            <TouchableOpacity>
              <Text>
                {rowData.title} - {rowData.artist} [{rowData.albumTitle}]
              </Text>
            </TouchableOpacity>
          );
        } }
      />
    )
  }
}

export default SongList;
