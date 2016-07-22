//
//  MPMediaManger.m
//  SimpleMusicPlayer
//
//  Created by Yuji Sugiura on 2016/07/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MPMediaManager, NSObject)

RCT_EXTERN_METHOD(playSong: (NSString *)persistentID)
RCT_EXTERN_METHOD(getAlbums: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end