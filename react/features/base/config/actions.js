// @flow

import type { Dispatch } from 'redux';

import { addKnownDomains } from '../known-domains';
import { parseURIString } from '../util';

import { CONFIG_WILL_LOAD, LOAD_CONFIG_ERROR, SET_CONFIG } from './actionTypes';
import { _CONFIG_STORE_PREFIX } from './constants';
import { setConfigFromURLParams } from './functions';

/**
 * Signals that the configuration (commonly known in Jitsi Meet as config.js)
 * for a specific locationURL will be loaded now.
 *
 * @param {URL} locationURL - The URL of the location which necessitated the
 * loading of a configuration.
 * @param {string} room - The name of the room (conference) for which we're loading the config for.
 * @returns {{
 *     type: CONFIG_WILL_LOAD,
 *     locationURL: URL,
 *     room: string
 * }}
 */
export function configWillLoad(locationURL: URL, room: string) {
    return {
        type: CONFIG_WILL_LOAD,
        locationURL,
        room
    };
}

/**
 * Signals that a configuration (commonly known in Jitsi Meet as config.js)
 * could not be loaded due to a specific error.
 *
 * @param {Error} error - The {@code Error} which prevented the successful
 * loading of a configuration.
 * @param {URL} locationURL - The URL of the location which necessitated the
 * loading of a configuration.
 * @returns {{
 *     type: LOAD_CONFIG_ERROR,
 *     error: Error,
 *     locationURL: URL
 * }}
 */
export function loadConfigError(error: Error, locationURL: URL) {
    return {
        type: LOAD_CONFIG_ERROR,
        error,
        locationURL
    };
}

/**
 * Sets the configuration represented by the feature base/config. The
 * configuration is defined and consumed by the library lib-jitsi-meet but some
 * of its properties are consumed by the application jitsi-meet as well.
 *
 * @param {Object} config - The configuration to be represented by the feature
 * base/config.
 * @returns {Function}
 */
export function setConfig(config: Object = {}) {
    // window.interfaceConfig = {
    //     // TO FIX: this needs to be handled from SASS variables. There are some
    //     // methods allowing to use variables both in css and js.
    //     DEFAULT_BACKGROUND: '#474747',
    //
    //     /**
    //      * Whether or not the blurred video background for large video should be
    //      * displayed on browsers that can support it.
    //      */
    //     DISABLE_VIDEO_BACKGROUND: true,
    //
    //     INITIAL_TOOLBAR_TIMEOUT: 20000,
    //     TOOLBAR_TIMEOUT: 4000,
    //     TOOLBAR_ALWAYS_VISIBLE: false,
    //     DEFAULT_REMOTE_DISPLAY_NAME: '',
    //     DEFAULT_LOCAL_DISPLAY_NAME: 'me',
    //     SHOW_JITSI_WATERMARK: false,
    //     JITSI_WATERMARK_LINK: 'https://jitsi.org',
    //
    //     // if watermark is disabled by default, it can be shown only for guests
    //     SHOW_WATERMARK_FOR_GUESTS: false,
    //     SHOW_BRAND_WATERMARK: false,
    //     BRAND_WATERMARK_LINK: '',
    //     SHOW_POWERED_BY: false,
    //     SHOW_DEEP_LINKING_IMAGE: false,
    //     GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
    //     DISPLAY_WELCOME_PAGE_CONTENT: false,
    //     DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
    //     APP_NAME: 'OMA Meet',
    //     NATIVE_APP_NAME: 'OMA Meet',
    //     PROVIDER_NAME: 'OMA',
    //     LANG_DETECTION: true, // Allow i18n to detect the system language
    //     INVITATION_POWERED_BY: true,
    //
    //     /**
    //      * If we should show authentication block in profile
    //      */
    //     AUTHENTICATION_ENABLE: true,
    //
    //     /**
    //      * The name of the toolbar buttons to display in the toolbar. If present,
    //      * the button will display. Exceptions are "livestreaming" and "recording"
    //      * which also require being a moderator and some values in config.js to be
    //      * enabled. Also, the "profile" button will not display for user's with a
    //      * jwt.
    //      */
    //     // TOOLBAR_BUTTONS: [
    //     //     'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
    //     //     'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
    //     //     'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
    //     //     'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
    //     //     'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
    //     // ],
    //     TOOLBAR_BUTTONS: [
    //         'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
    //         'fodeviceselection', 'hangup', 'profile', 'recording',
    //         'livestreaming', 'etherpad', 'videoquality', 'filmstrip', 'invite',
    //         'tileview', 'mute-everyone'
    //     ],
    //
    //     // SETTINGS_SECTIONS: [ 'devices', 'language', 'moderator', 'profile', 'calendar' ],
    //     SETTINGS_SECTIONS: [ 'devices', 'language', 'moderator', 'profile'],
    //
    //     // Determines how the video would fit the screen. 'both' would fit the whole
    //     // screen, 'height' would fit the original video height to the height of the
    //     // screen, 'width' would fit the original video width to the width of the
    //     // screen respecting ratio.
    //     VIDEO_LAYOUT_FIT: 'both',
    //
    //     /**
    //      * Whether to only show the filmstrip (and hide the toolbar).
    //      */
    //     filmStripOnly: false,
    //
    //     /**
    //      * Whether to show thumbnails in filmstrip as a column instead of as a row.
    //      */
    //     VERTICAL_FILMSTRIP: true,
    //
    //     // A html text to be shown to guests on the close page, false disables it
    //     CLOSE_PAGE_GUEST_HINT: false,
    //     RANDOM_AVATAR_URL_PREFIX: false,
    //     RANDOM_AVATAR_URL_SUFFIX: false,
    //     FILM_STRIP_MAX_HEIGHT: 120,
    //
    //     // Enables feedback star animation.
    //     ENABLE_FEEDBACK_ANIMATION: false,
    //     DISABLE_FOCUS_INDICATOR: false,
    //     DISABLE_DOMINANT_SPEAKER_INDICATOR: false,
    //
    //     /**
    //      * Whether the speech to text transcription subtitles panel is disabled.
    //      * If {@code undefined}, defaults to {@code false}.
    //      *
    //      * @type {boolean}
    //      */
    //     DISABLE_TRANSCRIPTION_SUBTITLES: false,
    //
    //     /**
    //      * Whether the ringing sound in the call/ring overlay is disabled. If
    //      * {@code undefined}, defaults to {@code false}.
    //      *
    //      * @type {boolean}
    //      */
    //     DISABLE_RINGING: false,
    //     AUDIO_LEVEL_PRIMARY_COLOR: 'rgba(255,255,255,0.4)',
    //     AUDIO_LEVEL_SECONDARY_COLOR: 'rgba(255,255,255,0.2)',
    //     POLICY_LOGO: null,
    //     LOCAL_THUMBNAIL_RATIO: 16 / 9, // 16:9
    //     REMOTE_THUMBNAIL_RATIO: 1, // 1:1
    //     // Documentation reference for the live streaming feature.
    //     LIVE_STREAMING_HELP_LINK: 'https://jitsi.org/live',
    //
    //     /**
    //      * Whether the mobile app Jitsi Meet is to be promoted to participants
    //      * attempting to join a conference in a mobile Web browser. If
    //      * {@code undefined}, defaults to {@code true}.
    //      *
    //      * @type {boolean}
    //      */
    //     MOBILE_APP_PROMO: true,
    //
    //     /**
    //      * Maximum coeficient of the ratio of the large video to the visible area
    //      * after the large video is scaled to fit the window.
    //      *
    //      * @type {number}
    //      */
    //     MAXIMUM_ZOOMING_COEFFICIENT: 1.3,
    //
    //     /*
    //      * If indicated some of the error dialogs may point to the support URL for
    //      * help.
    //      */
    //     SUPPORT_URL: 'https://github.com/jitsi/jitsi-meet/issues/new',
    //
    //     /**
    //      * Whether the connection indicator icon should hide itself based on
    //      * connection strength. If true, the connection indicator will remain
    //      * displayed while the participant has a weak connection and will hide
    //      * itself after the CONNECTION_INDICATOR_HIDE_TIMEOUT when the connection is
    //      * strong.
    //      *
    //      * @type {boolean}
    //      */
    //     CONNECTION_INDICATOR_AUTO_HIDE_ENABLED: true,
    //
    //     /**
    //      * How long the connection indicator should remain displayed before hiding.
    //      * Used in conjunction with CONNECTION_INDICATOR_AUTOHIDE_ENABLED.
    //      *
    //      * @type {number}
    //      */
    //     CONNECTION_INDICATOR_AUTO_HIDE_TIMEOUT: 5000,
    //
    //     /**
    //      * If true, hides the connection indicators completely.
    //      *
    //      * @type {boolean}
    //      */
    //     CONNECTION_INDICATOR_DISABLED: false,
    //
    //     /**
    //      * If true, hides the video quality label indicating the resolution status
    //      * of the current large video.
    //      *
    //      * @type {boolean}
    //      */
    //     VIDEO_QUALITY_LABEL_DISABLED: false,
    //
    //     /**
    //      * If true, will display recent list
    //      *
    //      * @type {boolean}
    //      */
    //     RECENT_LIST_ENABLED: true,
    //
    //     // Names of browsers which should show a warning stating the current browser
    //     // has a suboptimal experience. Browsers which are not listed as optimal or
    //     // unsupported are considered suboptimal. Valid values are:
    //     // chrome, chromium, edge, electron, firefox, nwjs, opera, safari
    //     OPTIMAL_BROWSERS: [ 'chrome', 'chromium', 'firefox', 'nwjs', 'electron' ],
    //
    //     // Browsers, in addition to those which do not fully support WebRTC, that
    //     // are not supported and should show the unsupported browser page.
    //     UNSUPPORTED_BROWSERS: [],
    //
    //     /**
    //      * A UX mode where the last screen share participant is automatically
    //      * pinned. Valid values are the string "remote-only" so remote participants
    //      * get pinned but not local, otherwise any truthy value for all participants,
    //      * and any falsy value to disable the feature.
    //      *
    //      * Note: this mode is experimental and subject to breakage.
    //      */
    //     AUTO_PIN_LATEST_SCREEN_SHARE: 'remote-only',
    //
    //     /**
    //      * If true, presence status: busy, calling, connected etc. is not displayed.
    //      */
    //     DISABLE_PRESENCE_STATUS: false,
    //
    //     /**
    //      * If true, notifications regarding joining/leaving are no longer displayed.
    //      */
    //     DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
    //
    //     /**
    //      * Decides whether the chrome extension banner should be rendered on the landing page and during the meeting.
    //      * If this is set to false, the banner will not be rendered at all. If set to true, the check for extension(s)
    //      * being already installed is done before rendering.
    //      */
    //     SHOW_CHROME_EXTENSION_BANNER: false
    //
    //     /**
    //      * How many columns the tile view can expand to. The respected range is
    //      * between 1 and 5.
    //      */
    //     // TILE_VIEW_MAX_COLUMNS: 5,
    //
    //     /**
    //      * Specify custom URL for downloading android mobile app.
    //      */
    //     // MOBILE_DOWNLOAD_LINK_ANDROID: 'https://play.google.com/store/apps/details?id=org.jitsi.meet',
    //
    //     /**
    //      * Specify URL for downloading ios mobile app.
    //      */
    //     // MOBILE_DOWNLOAD_LINK_IOS: 'https://itunes.apple.com/us/app/jitsi-meet/id1165103905',
    //
    //     /**
    //      * Specify mobile app scheme for opening the app from the mobile browser.
    //      */
    //     // APP_SCHEME: 'org.jitsi.meet',
    //
    //     /**
    //      * Specify the Android app package name.
    //      */
    //     // ANDROID_APP_PACKAGE: 'org.jitsi.meet',
    //
    //     /**
    //      * Override the behavior of some notifications to remain displayed until
    //      * explicitly dismissed through a user action. The value is how long, in
    //      * milliseconds, those notifications should remain displayed.
    //      */
    //     // ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT: 15000,
    //
    //     // List of undocumented settings
    //     /**
    //      INDICATOR_FONT_SIZES
    //      MOBILE_DYNAMIC_LINK
    //      PHONE_NUMBER_REGEX
    //      */
    // };
    return (dispatch: Dispatch<any>, getState: Function) => {
        const { locationURL } = getState()['features/base/connection'];

        // Now that the loading of the config was successful override the values
        // with the parameters passed in the hash part of the location URI.
        // TODO We're still in the middle ground between old Web with config,
        // interfaceConfig, and loggingConfig used via global variables and new
        // Web and mobile reading the respective values from the redux store.
        // On React Native there's no interfaceConfig at all yet and
        // loggingConfig is not loaded but there's a default value in the redux
        // store.
        // Only the config will be overridden on React Native, as the other
        // globals will be undefined here. It's intentional - we do not care to
        // override those configs yet.
        locationURL
            && setConfigFromURLParams(

                // On Web the config also comes from the window.config global,
                // but it is resolved in the loadConfig procedure.
                config,
                window.interfaceConfig,
                window.loggingConfig,
                locationURL);

        dispatch({
            type: SET_CONFIG,
            config
        });
    };
}

/**
 * Stores a specific Jitsi Meet config.js object into {@code localStorage}.
 *
 * @param {string} baseURL - The base URL from which the config.js was
 * downloaded.
 * @param {Object} config - The Jitsi Meet config.js to store.
 * @returns {Function}
 */
export function storeConfig(baseURL: string, config: Object) {
    return (dispatch: Dispatch<any>) => {
        // Try to store the configuration in localStorage. If the deployment
        // specified 'getroom' as a function, for example, it does not make
        // sense to and it will not be stored.
        let b = false;

        try {
            if (typeof window.config === 'undefined'
                    || window.config !== config) {
                window.localStorage.setItem(
                    `${_CONFIG_STORE_PREFIX}/${baseURL}`,
                    JSON.stringify(config));
                b = true;
            }
        } catch (e) {
            // Ignore the error because the caching is optional.
        }

        // If base/config knows a domain, then the app knows it.
        if (b) {
            try {
                dispatch(addKnownDomains(parseURIString(baseURL).host));
            } catch (e) {
                // Ignore the error because the fiddling with "known domains" is
                // a side effect here.
            }
        }

        return b;
    };
}
