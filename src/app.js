import React from 'react';
import {
  TabBarIOS,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';
import {
  TABS,
} from './const';
import SongsView   from './view/songs';
import ArtistsView from './view/artists';
import AlbumsView  from './view/albums';
import PlayingView from './view/playing';

@observer
class App extends React.Component {

  render() {
    const {
      store,
      action,
    } = this.props;
    const {
      songs,
      artists,
      albums,
    } = this.props.model;

    return (
      <TabBarIOS
        tintColor="#274a78"
        unselectedTintColor="#aaa"
        barTintColor="#eee"
      >
        <TabBarIOS.Item
          title="曲"
          selected={store.selectedTab === TABS.SONGS}
          onPress={ () => { store.selectedTab = TABS.SONGS; } }
        >
          <SongsView
            songs={songs}
            onPressRow={action.playSong}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="アーティスト"
          selected={store.selectedTab === TABS.ARTIST}
          onPress={ () => { store.selectedTab = TABS.ARTIST; } }
        >
          <ArtistsView
            artists={artists}
            onPressRow={action.playAlbumSong}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="アルバム"
          selected={store.selectedTab === TABS.ALBUM}
          onPress={ () => { store.selectedTab = TABS.ALBUM; } }
        >
          <AlbumsView
            albums={albums}
            onPressRow={action.playAlbumSong}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="再生中"
          selected={store.selectedTab === TABS.PLAYING}
          onPress={ () => { store.selectedTab = TABS.PLAYING; } }
        >
          <PlayingView
            nowPlaying={store.nowPlaying}
            repeatMode={store.repeatMode}
            playingState={store.playingState}
            currentPlaybackTime={store.currentPlaybackTime}
            controllerAction={{
              togglePlay:   action.togglePlay,
              skipPrev:     action.skipPrev,
              skipNext:     action.skipNext,
              changeRepeat: action.changeRepeat,
            }}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

App.propTypes = {
  store:  React.PropTypes.object,
  action: React.PropTypes.object,
  model:  React.PropTypes.object,
};

export default App;
