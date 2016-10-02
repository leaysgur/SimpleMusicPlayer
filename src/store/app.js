import {
  observable,
  asStructure,
} from 'mobx';
import {
  TABS,
} from '../const';

class AppStore {
  @observable selectedTab = TABS.ALBUM;

  @observable nowPlaying = asStructure({
    title:      '',
    artist:     '',
    duration:   '',
    artwork:    '',
    albumTitle: '',
  });

  updateNowPlaying({
    title,
    artist,
    duration,
    artwork,
    albumTitle,
  }) {
    // 直接つっこまないのはもっといろいろ付いてきてるから
    this.nowPlaying = {
      title,
      artist,
      duration,
      artwork,
      albumTitle,
    };
  }
}

export default (new AppStore());
