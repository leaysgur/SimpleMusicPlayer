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
import AlbumItem from './item';

class AlbumList extends React.Component {

  render() {
    return (
      <ListView
        dataSource={items2DataSource(this.props.albums)}
        renderRow={ (rowData) => {
          return (
            <TouchableOpacity
              onPress={ () => { this._pressRow(rowData); } }
            >
              <ThumbListItem
                imgUri={rowData.artwork}
              >
                <Text>{rowData.title}</Text>
                <Text>{rowData.artist}</Text>
              </ThumbListItem>
            </TouchableOpacity>
          );
        } }
        renderSeparator={ (sectionID: number, rowID: number) => {
          return <Separator key={`${sectionID}-${rowID}`} />;
        } }
      />
    );
  }

  _pressRow(album) {
    const {
      navigator,
      onPressRow,
    } = this.props;

    navigator.push({
      component: AlbumItem,
      title: album.title,
      passProps: {
        album,
        onPressRow,
      }
    });
  }
}
AlbumList.propTypes = {
  navigator:  React.PropTypes.object.isRequired,
  albums:     React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onPressRow: React.PropTypes.func.isRequired,
};

export default AlbumList;
