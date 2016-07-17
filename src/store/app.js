// @flow
import {
  observable,
  computed,
} from 'mobx';
import {
  TABS,
} from '../const';

class AppStore {
  @observable selectedTab: string = TABS.ARTIST;
}

export default (new AppStore());
