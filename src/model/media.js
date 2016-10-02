class Media {
  isFetching = true;
  songs      = [];
  artists    = [];
  albums     = [];
  songMap    = {};

  init({
    songs,
    albums,
    albumMap,
    songMap
  }) {

    this.songMap  = songMap;
    let artistMap = {};

    this.isFetching = false;

    this.songs = songs.map((id) => {
      const song = songMap[id];
      song.persistentID = id;
      song.artwork = albumMap[song.albumPersistentID].artwork;
      song.albumTitle = albumMap[song.albumPersistentID].title;
      song.duration = _toDispDuration(song._duration);
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

  getItem({ persistentID }) {
    return this.songMap[persistentID];
  }
}

function _toDispDuration(seconds) {
  seconds = Math.floor(seconds);

  let hours = Math.floor(seconds / 3600);
  seconds -= hours*3600;

  let minutes = Math.floor(seconds / 60);
  seconds -= minutes*60;

  if (hours) {
    if (hours < 10) { hours = '0' + hours; }
    return `${hours}:${minutes}:${seconds}`;
  }

  if (minutes < 10) { minutes = '0' + minutes; }
  if (seconds < 10) { seconds = '0' + seconds; }
  return `${minutes}:${seconds}`;
}

export default (new Media());
