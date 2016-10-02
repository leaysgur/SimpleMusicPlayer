#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MediaBridge, NSObject)
RCT_EXTERN_METHOD(fetch: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(playSong: (NSString *)persistentID)
RCT_EXTERN_METHOD(playAlbumSong: (NSString *)persistentID albumPersistentID:(NSString *)albumPersistentID)
RCT_EXTERN_METHOD(togglePlay)
RCT_EXTERN_METHOD(skipPrev)
RCT_EXTERN_METHOD(skipNext)
RCT_EXTERN_METHOD(toggleShuffle)
RCT_EXTERN_METHOD(changeRepeat)
@end
