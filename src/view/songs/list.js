// @flow
import React from 'react';
import {
  ListView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Separator,
} from '../common';

type Song = {
  title: string;
  artist: string;
  albumTitle: string;
};

class SongList extends React.Component {
  props: {
    songs: [Song]
  };

  render() {
    const dataSource = (new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })).cloneWithRows(this.props.songs)

    return (
      <ListView
        dataSource={dataSource}
        removeClippedSubviews={false}
        renderRow={ (rowData: Song) => {
          return (
            <TouchableOpacity>
              <Text>
                {rowData.title} - {rowData.artist} [{rowData.albumTitle}]
              </Text>
            </TouchableOpacity>
          );
        } }
        renderSeparator={ (sectionID: number, rowID: number) => {
          return <Separator key={`${sectionID}-${rowID}`} />
        } }
      />
    )
  }
}

export default SongList;
