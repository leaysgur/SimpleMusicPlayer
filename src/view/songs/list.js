// @flow
import React from 'react';
import {
  ListView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Separator,
  ThumbListItem,
  items2DataSource,
} from '../common';


const SongList = ({
  songs,
  onPressRow,
}: {
  songs: Songs;
  onPressRow: () => {};
}) => {
  return (
    <ListView
      dataSource={items2DataSource(songs)}
      renderRow={(rowData: Song) => {
        return (
          <TouchableOpacity onPress={ () => {
            onPressRow(rowData.persistentID);
          }}>
            <ThumbListItem
              imgUri={rowData.artwork}
            >
              <Text>{rowData.title}</Text>
              <Text>{rowData.artist} / {rowData.albumTitle}</Text>
            </ThumbListItem>
          </TouchableOpacity>
        );
      } }
      renderSeparator={(sectionID: number, rowID: number) => {
        return <Separator key={`${sectionID}-${rowID}`} />
      }}
    />
  );
};

export default SongList;
