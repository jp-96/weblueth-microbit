import React, { useState } from 'react';
import { WbBoundCallback, WbxCustomEventCallback } from 'weblueth';
import { ButtonService, ButtonState } from 'microbit-web-bluetooth/types/services/button';
import { MicrobitButton } from '../../src'; // from '@weblueth/microbit'

type Props = {
    button: 'a' | 'b';
}

export default function MicrobitBtn(props: Props) {
    const [state, setState] = useState<ButtonState | '-'>('-');

    const handler: WbxCustomEventCallback<ButtonState> = event => {
        setState(event.detail);
    };
    const onButtonAStateChanged = props.button === 'a' ? handler : undefined;
    const onButtonBStateChanged = props.button === 'b' ? handler : undefined;

    const onServiceBound: WbBoundCallback<ButtonService> = async bound => {
        setState('-');
    };

    return (
        <React.Fragment>
            <MicrobitButton onButtonAStateChanged={onButtonAStateChanged} onButtonBStateChanged={onButtonBStateChanged} onServiceBound={onServiceBound} />
            {state}
        </React.Fragment>
    );
}
