// @flow
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TabBarIOS,
} from 'react-native';
import {
  observable,
} from 'mobx';
import {
  observer,
} from 'mobx-react/native';

import {
  TABS,
} from './const';

// $FlowFixMe
@observer
class App extends React.Component {
  @observable selectedTab: string = TABS.SONGS;
  _switchTab: () => boolean;

  constructor() {
    super();
    this._switchTab = this._switchTab.bind(this);
  }

  render() {
    const { selectedTab, } = this;

    return (
      <TabBarIOS
        tintColor="#274a78"
        unselectedTintColor="#aaa"
        barTintColor="#eee"
      >
        <TabBarIOS.Item
          title="曲"
          selected={selectedTab === TABS.SONGS}
          onPress={ () => { this._switchTab(TABS.SONGS); } }
        >
          {this._renderContent(TABS.SONGS)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="アーティスト"
          selected={selectedTab === TABS.ARTIST}
          onPress={ () => { this._switchTab(TABS.ARTIST); } }
        >
          {this._renderContent(TABS.ARTIST)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="アルバム"
          selected={selectedTab === TABS.ALBUM}
          onPress={ () => { this._switchTab(TABS.ALBUM); } }
        >
          {this._renderContent(TABS.ALBUM)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="再生中"
          selected={selectedTab === TABS.PLAYING}
          onPress={ () => { this._switchTab(TABS.PLAYING); } }
        >
          {this._renderContent(TABS.PLAYING)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

  _switchTab(tabName: string) {
    this.selectedTab = tabName;
  }

  _renderContent(pageText: string) {
    return (
      <View style={styles.container}>
        <Text>{pageText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
