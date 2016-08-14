// @flow
class Media {
  isFetching: boolean = true;
  songs: Songs = [];
  artists: Artists = [];
  albums: Albums = [];

  init({
    songs,
    albums,
    albumMap,
    songMap
  }: {
    songs:    [string];
    albums:   [Object];
    albumMap: Object;
    songMap:  Object;
  }) {
    let artistMap = {};

    this.isFetching = false;

    this.songs = songs.map((id) => {
      const song = songMap[id];
      song.persistentID = id;
      song.artwork = albumMap[song.albumPersistentID].artwork;
      song.albumTitle = albumMap[song.albumPersistentID].title;
      return song;
    });

    this.albums = albums.map((album) => {
      album.title = albumMap[album.id].title;
      album.artist = albumMap[album.id].artist;
      album.artwork = albumMap[album.id].artwork;
      album.songs = album.songs.map((id) => {
        const song = songMap[id];
        song.persistentID = id;
        song.artwork = albumMap[song.albumPersistentID].artwork;
        song.albumTitle = albumMap[song.albumPersistentID].title;
        return song;
      });

      // ついでにアーティスト用のデータをつくる
      const artist = album.artist;
      if (artist in artistMap) {
        artistMap[artist].albums.push(album);
      }
      else {
        artistMap[artist] = {
          albums: [album]
        };
      }

      return album;
    }).sort((a, b) => { return a.title > b.title ? 1 : -1; });

    this.artists = Object.keys(artistMap).map((key) => {
      const albums = artistMap[key].albums;
      return {
        name:    key,
        artwork: albums[0].artwork,
        albums:  albums
      };
    }).sort((a, b) => { return a.name > b.name ? 1 : -1; });
  }
}

export default (new Media());
