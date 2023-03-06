import React, { useEffect, useState } from 'react';
import { WbBoundCallback, WbxCustomEventCallback, WbxServiceProps, WbxServices } from 'weblueth';
import { LedService } from 'microbit-web-bluetooth/types/services/led';
import { Services } from 'microbit-web-bluetooth';

interface Props extends WbxServiceProps<LedService> {
}

export function MicrobitLed(props: Props) {
    
    const onServicesBound: WbBoundCallback<Services> = bound => {
        const target = bound.target.ledService;
        if (target) {
            if (props.onServiceBound) {
                props.onServiceBound({ ...bound, target});
            }
        }
    };

    return (
        <WbxServices onServicesBound={onServicesBound} />
    );
}
