// @flow
class Media {
  isFetching: boolean = true;
  songs: [Object] = [];
  artists: [Object] = [];
  albums: Albums = [];

  init(albums: Albums) {
    this.isFetching = false;

    this.albums = [].slice.call(albums);
  }
}

export default (new Media());
