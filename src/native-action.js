class NativeAction {
  constructor(MediaBridge, AppStore) {
    this.MediaBridge = MediaBridge;
    this.AppStore    = AppStore;

    const proto = Object.getPrototypeOf(this);
    Object.getOwnPropertyNames(proto)
      .filter((name) => {
        return name !== 'constructor' &&
          typeof proto[name] === 'function';
      })
      .forEach((method) => {
        this[method] = this[method].bind(this);
      });

    return this;
  }

  playSong(persistentID) {
    const { MediaBridge, AppStore } = this;
    MediaBridge.playSong(persistentID);
    AppStore.playingState = 'play';
  }

  playAlbumSong(persistentID, albumPersistentID) {
    const { MediaBridge, AppStore } = this;
    MediaBridge.playAlbumSong(persistentID, albumPersistentID);
    AppStore.playingState = 'play';
  }

  togglePlay() {
    const { MediaBridge, AppStore } = this;
    MediaBridge.togglePlay().then((state) => {
      AppStore.playingState = state;
    });
  }

  skipNext() {
    const { MediaBridge } = this;
    MediaBridge.skipNext();
  }

  skipPrev() {
    const { MediaBridge } = this;
    MediaBridge.skipPrev();
  }

  changeRepeat() {
    const { MediaBridge, AppStore } = this;
    MediaBridge.changeRepeat().then((mode) => {
      AppStore.repeatMode = mode;
    });
  }

  changeShuffle() {
    const { MediaBridge, AppStore } = this;
    MediaBridge.changeShuffle().then((mode) => {
      AppStore.shuffleMode = mode;
    });
  }

  changeProgress(val) {
    const { MediaBridge, AppStore } = this;
    AppStore.seek(val, true);
    MediaBridge.changePlaybackTime(val);
  }

  changedProgress(val) {
    const { MediaBridge, AppStore } = this;
    MediaBridge.changePlaybackTime(val);
    AppStore.seek(val, false);
  }
}

export default NativeAction;
