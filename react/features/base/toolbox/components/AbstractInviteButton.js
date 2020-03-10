
// @flow
// @todo this file moa added
import { IconShareVideo } from '../../icons';

import AbstractButton from './AbstractButton';
import type { Props } from './AbstractButton';

/**
 * An abstract implementation of a button for disconnecting a conference.
 */
export default class AbstractInviteButton<P : Props, S: *>
    extends AbstractButton<P, S> {

    icon = IconShareVideo;

    /**
     * Handles clicking / pressing the button, and disconnects the conference.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {

    }
}

