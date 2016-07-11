// @flow
import React from 'react';
import {
  StyleSheet,
  NavigatorIOS,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';



class MyScene extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    navigator: React.PropTypes.object.isRequired,
  }
  _onForward: () => boolean;

  constructor() {
    super();

    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    this.props.navigator.push(routes[1]);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this._onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const routes = [
  {
    component: MyScene,
    title: 'My long long long long name scene',
    passProps: { title: 'タイトル' },
    rightButtonTitle: '@',
    onRightButtonPress: () => {}
  },
  {
    component: MyScene,
    title: 'Scene 2',
    passProps: { title: 'Scene2' },
    rightButtonTitle: '@@',
  },
];

class SongsView extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={routes[0]}
        style={{flex: 1}}
      />
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

export default SongsView;
