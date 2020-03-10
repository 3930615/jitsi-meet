/*
 * Copyright @ 2018-present 8x8, Inc.
 * Copyright @ 2017-2018 Atlassian Pty Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#import "AppDelegate.h"
//#import "FIRUtilities.h"
#import "Types.h"

//@import Crashlytics;
//@import Fabric;
//@import Firebase;
@import JitsiMeet;


@implementation AppDelegate

-             (BOOL)application:(UIApplication *)application
  didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Initialize Crashlytics and Firebase if a valid GoogleService-Info.plist file was provided.
//    if ([FIRUtilities appContainsRealServiceInfoPlist]) {
//        NSLog(@"Enablign Crashlytics and Firebase");
//        [FIRApp configure];
//        [Fabric with:@[[Crashlytics class]]];
//    }

    JitsiMeet *jitsiMeet = [JitsiMeet sharedInstance];

    jitsiMeet.conferenceActivityType = JitsiMeetConferenceActivityType;
    jitsiMeet.customUrlScheme = @"org.jitsi.meet";
    jitsiMeet.universalLinkDomains = @[@"meet.jit.si", @"alpha.jitsi.net", @"beta.meet.jit.si"];

    jitsiMeet.defaultConferenceOptions = [JitsiMeetConferenceOptions fromBuilder:^(JitsiMeetConferenceOptionsBuilder *builder) {
      builder.serverURL = [NSURL URLWithString:@"http://39.101.179.35"];
      builder.welcomePageEnabled = YES;
    builder.subject = @"group";

    builder.userInfo = [[JitsiMeetUserInfo alloc] initWithDisplayName:@"diaplayNmae" andEmail:@"email" andAvatar:[NSURL URLWithString:@"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583832397625&di=79d5bb08d3b350cfcc06114cd88cc3ae&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg"]];
        // Apple rejected our app because they claim requiring a
        // Dropbox account for recording is not acceptable.
#if DEBUG
        [builder setFeatureFlag:@"ios.recording.enabled" withBoolean:YES];
#endif
    }];

    [jitsiMeet application:application didFinishLaunchingWithOptions:launchOptions];

    return YES;
}

#pragma mark Linking delegate methods

-    (BOOL)application:(UIApplication *)application
  continueUserActivity:(NSUserActivity *)userActivity
    restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler {

//    if ([FIRUtilities appContainsRealServiceInfoPlist]) {
//        // 1. Attempt to handle Universal Links through Firebase in order to support
//        //    its Dynamic Links (which we utilize for the purposes of deferred deep
//        //    linking).
//        BOOL handled
//          = [[FIRDynamicLinks dynamicLinks]
//                handleUniversalLink:userActivity.webpageURL
//                         completion:^(FIRDynamicLink * _Nullable dynamicLink, NSError * _Nullable error) {
//           NSURL *firebaseUrl = [FIRUtilities extractURL:dynamicLink];
//           if (firebaseUrl != nil) {
//             userActivity.webpageURL = firebaseUrl;
//             [[JitsiMeet sharedInstance] application:application
//                                continueUserActivity:userActivity
//                                  restorationHandler:restorationHandler];
//           }
//        }];
//
//        if (handled) {
//          return handled;
//        }
//    }

    // 2. Default to plain old, non-Firebase-assisted Universal Links.
    return [[JitsiMeet sharedInstance] application:application
                              continueUserActivity:userActivity
                                restorationHandler:restorationHandler];
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

    // This shows up during a reload in development, skip it.
    // https://github.com/firebase/firebase-ios-sdk/issues/233
    if ([[url absoluteString] containsString:@"google/link/?dismiss=1&is_weak_match=1"]) {
        return NO;
    }

    NSURL *openUrl = url;

//    if ([FIRUtilities appContainsRealServiceInfoPlist]) {
//        // Process Firebase Dynamic Links
//        FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks] dynamicLinkFromCustomSchemeURL:url];
//        NSURL *firebaseUrl = [FIRUtilities extractURL:dynamicLink];
//        if (firebaseUrl != nil) {
//            openUrl = firebaseUrl;
//        }
//    }

    return [[JitsiMeet sharedInstance] application:app
                                           openURL:openUrl
                                           options:options];
}

@end
