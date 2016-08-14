#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MediaBridge, NSObject)
RCT_EXTERN_METHOD(fetch: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(playSong: (NSString *)persistentID)
@end