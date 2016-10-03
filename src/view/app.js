import React from 'react';
import { TabBarIOS } from 'react-native';
import { observer } from 'mobx-react/native';

import { TABS } from '../const';

import SongsView   from './songs';
import ArtistsView from './artists';
import AlbumsView  from './albums';
import PlayingView from './playing';

import albumIcon    from '../icon/tab-album.png';
import artistIcon   from '../icon/tab-artist.png';
import songsIcon    from '../icon/tab-songs.png';
import playingIcon  from '../icon/tab-playing.png';


const App = ({
  action,
  store,
  model,
}) => {
  return (
    <TabBarIOS
      tintColor="#274a78"
      unselectedTintColor="#aaa"
      barTintColor="#eee"
    >

      <TabBarIOS.Item
        icon={albumIcon}
        title="アルバム"
        selected={store.selectedTab === TABS.ALBUM}
        onPress={ () => { store.selectedTab = TABS.ALBUM; } }
      >
        <AlbumsView
          albums={model.albums}
          onPressRow={action.playAlbumSong}
        />
      </TabBarIOS.Item>

      <TabBarIOS.Item
        icon={artistIcon}
        title="アーティスト"
        selected={store.selectedTab === TABS.ARTIST}
        onPress={ () => { store.selectedTab = TABS.ARTIST; } }
      >
        <ArtistsView
          artists={model.artists}
          onPressRow={action.playAlbumSong}
        />
      </TabBarIOS.Item>

      <TabBarIOS.Item
        icon={songsIcon}
        title="曲"
        selected={store.selectedTab === TABS.SONGS}
        onPress={ () => { store.selectedTab = TABS.SONGS; } }
      >
        <SongsView
          songs={model.songs}
          onPressRow={action.playSong}
        />
      </TabBarIOS.Item>

      <TabBarIOS.Item
        icon={playingIcon}
        title="再生中"
        selected={store.selectedTab === TABS.PLAYING}
        onPress={ () => { store.selectedTab = TABS.PLAYING; } }
      >
        <PlayingView
          {...store}
          isPlaying={store.isPlaying}
          controllerAction={{...action}}
        />
      </TabBarIOS.Item>

    </TabBarIOS>
  );
};

App.propTypes = {
  store:  React.PropTypes.object,
  action: React.PropTypes.object,
  model:  React.PropTypes.object,
};

export default observer(App);
