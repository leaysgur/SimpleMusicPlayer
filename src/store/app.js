import {
  observable,
  // computed,
} from 'mobx';
import {
  TABS,
} from '../const';

class AppStore {
  @observable selectedTab$ = TABS.PLAYING;

  @observable nowPlaying = {
    songTitle:   'foo',
    albumTitle:  'bar',
    artist:      'baz',
    currentTime: 10,
  };

  @observable palyBackMode = 1;
}

export default (new AppStore());
