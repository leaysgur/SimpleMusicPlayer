import {
  observable,
  asStructure,
} from 'mobx';
import {
  TABS,
} from '../const';

class AppStore {
  @observable selectedTab$ = TABS.PLAYING;

  @observable nowPlaying = asStructure({
    title:      '',
    artist:     '',
    duration:   '',
    artwork:    '',
    albumTitle: '',
  });

  @observable palyBackMode = 1;

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
