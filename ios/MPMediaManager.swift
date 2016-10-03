import MediaPlayer

@objc(MediaBridge) class MediaBridge: RCTEventEmitter {
  let player = MPMusicPlayerController.systemMusicPlayer()
  var _nowPlayingQuery = MPMediaQuery()

  override func supportedEvents() -> [String]! {
    return ["onPlayItemChanged", "onPlaybackStateChanged"]
  }
  
  override init() {
    super.init()
    
    // どうせAllなので最初から
    player.repeatMode = MPMusicRepeatMode.All
    // シャッフル機能はありません
    player.shuffleMode = MPMusicShuffleMode.Off
    
    // 曲が変わったらイベントで知らせる
    NSNotificationCenter.defaultCenter().addObserver(
      self,
      selector: #selector(MediaBridge._playItemChanged(_:)),
      name: MPMusicPlayerControllerNowPlayingItemDidChangeNotification,
      object: player
    )
    NSNotificationCenter.defaultCenter().addObserver(
      self,
      selector: #selector(MediaBridge._playbackStateChanged(_:)),
      name: MPMusicPlayerControllerPlaybackStateDidChangeNotification,
      object: player
    )
    player.beginGeneratingPlaybackNotifications()
  }
  
  @objc func fetchMusic(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    let noCloudPre = MPMediaPropertyPredicate(
      value: NSNumber(bool: false),
      forProperty: MPMediaItemPropertyIsCloudItem
    )

    var albums = [[String: AnyObject]]()
    let albumsQuery: MPMediaQuery = MPMediaQuery.albumsQuery()
    albumsQuery.addFilterPredicate(noCloudPre)
    
    var albumMap = [String: AnyObject]()
    if let albumCollection: [MPMediaItemCollection] = albumsQuery.collections {
      for album in albumCollection {
        let albumItem = album.representativeItem!
        guard let artwork = albumItem.artwork else {
          continue
        }
        
        let albumPersistentID = String(albumItem.albumPersistentID);
        albumMap[albumPersistentID] = [
          "artwork":     __image2base64String(artwork.imageWithSize(artwork.bounds.size)!),
          "title":       albumItem.albumTitle  ?? "No title",
          "artist":      albumItem.albumArtist ?? "Various Artists",
          "releaseYear": albumItem.valueForProperty("year") ?? "",
        ]
        
        var songs = [String]()
        for song in (album.items) {
          songs.append(String(song.persistentID))
        }
        
        albums.append([
          "id":    albumPersistentID,
          "songs": songs
        ])
      }
    }
    
    var songs = [String]()
    var songMap = [String: [String: AnyObject]]()
    let songsQuery = MPMediaQuery.songsQuery()
    
    songsQuery.addFilterPredicate(noCloudPre)
    if let songCollection: [MPMediaItemCollection] = songsQuery.collections {
      for song in songCollection {
        let songItem = song.representativeItem!
        let persistentID = String(songItem.persistentID)
        
        songs.append(persistentID)
        songMap[persistentID] = [
          "title":             songItem.title  ?? "No title",
          "artist":            songItem.artist ?? "Various Artists",
          "duration":          songItem.playbackDuration,
          "trackNo":           songItem.albumTrackNumber,
          "albumPersistentID": String(songItem.albumPersistentID)
        ]
      }
    }
    
    resolve([
      "songs":    songs,
      "albums":   albums,
      "albumMap": albumMap,
      "songMap":  songMap
    ])
  }
  
  @objc func playSong(persistentID: String) {
    player.setQueueWithQuery(MPMediaQuery.songsQuery())
    
    player.nowPlayingItem = self._getNowPlayingItem(persistentID)
    player.currentPlaybackTime = 0
    player.play()
  }
  
  @objc func playAlbumSong(persistentID: String, albumPersistentID: String) {
    let query = MPMediaQuery.albumsQuery()
    query.addFilterPredicate(MPMediaPropertyPredicate(
      value: albumPersistentID,
      forProperty: MPMediaItemPropertyAlbumPersistentID,
      comparisonType: MPMediaPredicateComparison.EqualTo
    ))
    player.setQueueWithQuery(query)
    
    player.nowPlayingItem = self._getNowPlayingItem(persistentID)
    player.currentPlaybackTime = 0
    player.play()
  }
  
  @objc func togglePlay(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    if (player.playbackState == MPMusicPlaybackState.Playing) {
      player.pause()
      resolve("pause")
    } else {
      player.play()
      resolve("play")
    }
  }
  
  @objc func skipPrev() {
    if (player.currentPlaybackTime > 1) {
      player.skipToBeginning()
    } else {
      player.skipToPreviousItem()
    }
  }
  
  @objc func skipNext() {
    player.skipToNextItem()
  }
  
  @objc func changeRepeat(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    switch (player.repeatMode) {
    case MPMusicRepeatMode.None:
      player.repeatMode = MPMusicRepeatMode.One
      resolve("one")
      break
    case MPMusicRepeatMode.One:
      player.repeatMode = MPMusicRepeatMode.All
      resolve("all")
      break
    case MPMusicRepeatMode.All:
      player.repeatMode = MPMusicRepeatMode.None
      resolve("none")
      break
    default:
      resolve("default")
    }
  }
  
  @objc func changePlaybackTime(val: Double) {
    if let mediaItem = player.nowPlayingItem {
      let time = mediaItem.playbackDuration * val
      player.currentPlaybackTime = time
    }
  }
  
  @objc func getCurrentPlaybackTime(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    if (player.nowPlayingItem != nil) {
      return resolve(player.currentPlaybackTime)
    }
    return resolve(0)
  }

  
  func _playItemChanged(notify:NSNotificationCenter) {
    if let mediaItem = player.nowPlayingItem {
      var nowPlaying = [String: String]()
      nowPlaying["persistentID"]      = String(mediaItem.persistentID)
      nowPlaying["albumPersistentID"] = String(mediaItem.albumPersistentID)
      self.sendEventWithName("onPlayItemChanged", body: nowPlaying)
    }
  }
  
  func _playbackStateChanged(notify:NSNotificationCenter) {
    switch (player.playbackState) {
    case MPMusicPlaybackState.Interrupted:
      self.sendEventWithName("onPlaybackStateChanged", body: "pause")
      break
    case MPMusicPlaybackState.Paused:
      self.sendEventWithName("onPlaybackStateChanged", body: "pause")
      break
    case MPMusicPlaybackState.Stopped:
      self.sendEventWithName("onPlaybackStateChanged", body: "pause")
      break
    default:
      self.sendEventWithName("onPlaybackStateChanged", body: "play")
    }
  }
  
  func _getNowPlayingItem(persistentID: String) -> MPMediaItem {
    _nowPlayingQuery = MPMediaQuery()
    
    _nowPlayingQuery.addFilterPredicate(MPMediaPropertyPredicate(
      value: persistentID,
      forProperty: MPMediaItemPropertyPersistentID,
      comparisonType: MPMediaPredicateComparison.EqualTo
      ))
    
    return _nowPlayingQuery.items![0]
  }
  
}


func __image2base64String(image: UIImage) -> String {
  let data: NSData = UIImagePNGRepresentation(image)!
  let encodeString: String = data.base64EncodedStringWithOptions(NSDataBase64EncodingOptions.Encoding64CharacterLineLength)
  
  return "data:image/png;base64," + encodeString
}
