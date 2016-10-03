import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Separator,
  ThumbListItem,
  items2DataSource,
} from '../common';
import AlbumList from '../albums/list';


const styles = StyleSheet.create({
  row_sub: {
    color: '#999',
  }
});

class ArtistList extends React.Component {
  render() {
    return (
      <ListView
        dataSource={items2DataSource(this.props.artists)}
        renderRow={ (rowData) => {
          return (
            <TouchableOpacity
              onPress={ () => { this._pressRow(rowData); } }
            >
              <ThumbListItem
                imgUri={rowData.artwork}
              >
                <Text>{rowData.name}</Text>
                <Text style={styles.row_sub}>{rowData.albums.length}枚のアルバム</Text>
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

  _pressRow(artist) {
    const {
      navigator,
      onPressRow,
    } = this.props;

    navigator.push({
      component: AlbumList,
      title: artist.name,
      passProps: {
        albums: artist.albums,
        onPressRow,
      }
    });
  }
}

ArtistList.propTypes = {
  navigator:  React.PropTypes.object.isRequired,
  artists:    React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onPressRow: React.PropTypes.func.isRequired,
};

export default ArtistList;
