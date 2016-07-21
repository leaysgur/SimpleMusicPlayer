//
//  MPMediaManager.swift
//  SimpleMusicPlayer
//
//  Created by Yuji Sugiura on 2016/07/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//
import Foundation
import MediaPlayer

func _image2String(image: UIImage) -> String {
  let data: NSData = UIImagePNGRepresentation(image)!
  let encodeString: String = data.base64EncodedStringWithOptions(NSDataBase64EncodingOptions.Encoding64CharacterLineLength)

  return encodeString
}

func _formatTimeString(d: Double) -> String {
  let s: Int = Int(d % 60)
  let m: Int = Int((d - Double(s)) / 60 % 60)
  let h: Int = Int((d - Double(m) - Double(s)) / 3600 % 3600)
  let str = String(format: "%02d:%02d:%02d", h, m, s)
  return str
}

@objc(MPMediaManager) class MPMediaManager: NSObject {
  
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
            "title":    song.title!,
            "artist":   song.artist!,
            "trackNo":  song.albumTrackNumber,
            "duration": _formatTimeString(song.playbackDuration)
          ])
        }
        
        albums.append([
          "title":   title  ?? "No title",
          "artist":  artist ?? "V.A.",
          "artwork": _image2String(artwork.imageWithSize(artwork.bounds.size)!),
          "songs":   songs
        ])
      }
    }
    
    resolve(albums)
  }

}
