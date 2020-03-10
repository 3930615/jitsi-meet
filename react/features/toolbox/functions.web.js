// @flow

declare var interfaceConfig: Object;

/**
 * Helper for getting the height of the toolbox.
 *
 * @returns {number} The height of the toolbox.
 */
export function getToolboxHeight() {
    const toolbox = document.getElementById('new-toolbox');

    return (toolbox && toolbox.clientHeight) || 0;
}

/**
 * Indicates if a toolbar button is enabled.
 *
 * @param {string} name - The name of the setting section as defined in
 * interface_config.js.
 * @returns {boolean} - True to indicate that the given toolbar button
 * is enabled, false - otherwise.
 */
export function isButtonEnabled(name: string) {
    return interfaceConfig.TOOLBAR_BUTTONS.indexOf(name) !== -1;
}


/**
 * Indicates if the toolbox is visible or not.
 *
 * @param {string} state - The state from the Redux store.
 * @returns {boolean} - True to indicate that the toolbox is visible, false -
 * otherwise.
 */
export function isToolboxVisible(state: Object) {
    const { iAmSipGateway } = state['features/base/config'];
    const {
        alwaysVisible,
        timeoutID,
        visible
    } = state['features/toolbox'];

    return Boolean(!iAmSipGateway && (timeoutID || visible || alwaysVisible));
}

export function enterInvite() {

    return (dispatch: Dispatch<any>, getState: Function) => {
        //
        // const members = getParticipantsUserInfo(getState);
        // alert(111);
        // console.log('members : ', members);
        // sendEvent(getState, 'ENTER_INVITE', {members});
        //
        // // XXX At the time of this writing this action can only be dispatched by
        // // the button which is on the conference view, which means that it's
        // // fine to enter PiP mode.
        // return getAppProp(getState, 'inviteEnabled')
    };
}