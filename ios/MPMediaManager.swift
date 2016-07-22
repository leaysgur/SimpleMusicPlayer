//
//  MPMediaManager.swift
//  SimpleMusicPlayer
//
//  Created by Yuji Sugiura on 2016/07/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//
import Foundation
import MediaPlayer

@objc(MPMediaManager) class MPMediaManager: NSObject {
  
  var player = MPMusicPlayerController()

  override init() {
    super.init()
    
    player = MPMusicPlayerController.systemMusicPlayer()
  }
  
  @objc func playSong(persistentID: String) {
    let songsQuery: MPMediaQuery = MPMediaQuery.songsQuery()

    // TODO: js側とソートの順が違うので表示がおかしく見える
    player.setQueueWithQuery(songsQuery)
    player.nowPlayingItem = _findSongByPersistentId(persistentID)

    player.play()
  }
  
  @objc func getAlbums(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    let albumsQuery: MPMediaQuery = MPMediaQuery.albumsQuery()
    
    var albums = [[String: AnyObject]]()
    if let albumCollection: [MPMediaItemCollection] = albumsQuery.collections {
      for album in albumCollection {
        guard let title = album.representativeItem!.albumTitle else {
          continue
        }
        guard let artist = album.representativeItem!.albumArtist else {
          continue
        }
        guard let artwork = album.representativeItem!.artwork else {
          continue
        }

        var songs = [[String: AnyObject]]()
        for song in (album.items) {
          songs.append([
            "persistentID": String(song.persistentID),
            "title":        song.title!,
            "artist":       song.artist!,
            "trackNo":      song.albumTrackNumber,
            "duration":     _formatTimeString(song.playbackDuration)
          ])
        }
        
        albums.append([
          "title":   title  ?? "No title",
          "artist":  artist ?? "V.A.",
          "artwork": _image2base64String(artwork.imageWithSize(artwork.bounds.size)!),
          "songs":   songs
        ])
      }
    }
    
    resolve(albums)
  }

}


func _image2base64String(image: UIImage) -> String {
  let data: NSData = UIImagePNGRepresentation(image)!
  let encodeString: String = data.base64EncodedStringWithOptions(NSDataBase64EncodingOptions.Encoding64CharacterLineLength)
  
  return "data:image/png;base64," + encodeString
}

func _formatTimeString(d: Double) -> String {
  let s: Int = Int(d % 60)
  let m: Int = Int((d - Double(s)) / 60 % 60)
  let h: Int = Int((d - Double(m) - Double(s)) / 3600 % 3600)
  let str = String(format: "%02d:%02d:%02d", h, m, s)
  return str
}

func _findSongByPersistentId(persistentID: String) -> MPMediaItem? {
  let songQuery = MPMediaQuery()
  songQuery.addFilterPredicate(MPMediaPropertyPredicate(
    value: persistentID,
    forProperty: MPMediaItemPropertyPersistentID,
    comparisonType: MPMediaPredicateComparison.EqualTo
  ))
  
  var song: MPMediaItem?
  if let items = songQuery.items where items.count > 0 {
    song = items[0]
  }
  return song
}