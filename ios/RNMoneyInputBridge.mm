#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNMoneyInput, NSObject)

RCT_EXTERN_METHOD(formatMoney:(nonnull NSNumber *)value

locale:(NSString *)locale

resolver:(RCTPromiseResolveBlock)resolve

rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(extractValue:(nonnull NSString *)value

locale:(NSString *)locale

resolver:(RCTPromiseResolveBlock)resolve

rejecter:(RCTPromiseRejectBlock)reject)

@end