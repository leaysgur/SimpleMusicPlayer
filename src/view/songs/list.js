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
}) => {
  return (
    <ListView
      dataSource={items2DataSource(songs)}
      renderRow={(rowData) => {
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
      renderSeparator={(sectionID, rowID) => {
        return <Separator key={`${sectionID}-${rowID}`} />;
      }}
    />
  );
};

SongList.propTypes = {
  songs:      React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onPressRow: React.PropTypes.func.isRequired,
};

export default SongList;
