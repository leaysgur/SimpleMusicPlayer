//
//  MPMediaManager.swift
//  SimpleMusicPlayer
//
//  Created by Yuji Sugiura on 2016/07/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//
import Foundation
import MediaPlayer


@objc(MPMediaManager)
class MPMediaManager: NSObject {
  
  @objc func getAlbums(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    let albumsQuery: MPMediaQuery = MPMediaQuery.albumsQuery()
    let albumItems: [MPMediaItemCollection] = albumsQuery.collections!
    
    var albumTitles: [String] = [];
    for album in albumItems {
      if let representativeTitle = album.representativeItem!.albumTitle {
        albumTitles.append(representativeTitle);
      }
    }
  
    resolve([albumTitles])
  }
  
}