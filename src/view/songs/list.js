// @flow
import React from 'react';
import {
  ListView,
  Text,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import {
  Separator,
  ThumbListItem,
  items2DataSource,
} from '../common';

class SongList extends React.Component {
  props: {
    songs: Songs;
  };

  render() {
    return (
      <ListView
        dataSource={items2DataSource(this.props.songs)}
        renderRow={ (rowData: Song) => {
          return (
            <TouchableOpacity onPress={ () => {
              NativeModules.MPMediaManager.playSong(rowData.persistentID);
            } }>
              <ThumbListItem
                imgUri={rowData.artwork}
              >
                <Text>{rowData.title}</Text>
                <Text>{rowData.artist} / {rowData.albumTitle}</Text>
              </ThumbListItem>
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
