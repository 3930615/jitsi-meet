// @flow

import { createToolbarEvent, sendAnalytics } from '../../analytics';
import { appNavigate } from '../../app';
import { disconnect } from '../../base/connection';
import { translate } from '../../base/i18n';
import { connect } from '../../base/redux';
import { AbstractInviteButton } from '../../base/toolbox';
import type { AbstractButtonProps } from '../../base/toolbox';

// import { getAppProp } from '../../base/app';
import { enterInvite } from '../functions';

import { getFeatureFlag, INVITE_ENABLED } from '../../base/flags';

/**
 * The type of the React {@code Component} props of {@link InviteButton}.
 */
type Props = AbstractButtonProps & {
    /**
     * Whether invite is enable or not.
     */
    _enabled: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * Component that renders a toolbar button for leaving the current conference.
 *
 * @extends AbstractHangupButton
 */
class InviteButton extends AbstractInviteButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.shareRoom';
    // iconName = 'icon-link';
    label = 'toolbar.shareRoom';

    // accessibilityLabel = 'toolbar.accessibilityLabel.videomute';
    // label = 'toolbar.videomute';
    tooltip = 'toolbar.shareRoom';
    /**
     * Helper function to perform the actual hangup action.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(enterInvite());
    }

    render() {
        return this.props._enabled ? super.render() : null;
    }
}

function _mapStateToProps(state): Object {
    const inviteEnable = getFeatureFlag(state, INVITE_ENABLED, true)
    return {
        _enabled: inviteEnable
    };
}

export default translate(connect(_mapStateToProps)(InviteButton));
