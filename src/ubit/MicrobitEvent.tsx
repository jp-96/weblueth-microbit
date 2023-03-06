import React, { useEffect, useState } from 'react';
import { WbBoundCallback, WbxCustomEventCallback, WbxServiceProps, WbxServices } from 'weblueth';
import { EventService } from 'microbit-web-bluetooth/types/services/event';
import { Services } from 'microbit-web-bluetooth';

interface Props extends WbxServiceProps<EventService> {
}

export function MicrobitEvent(props: Props) {
    
    const onServicesBound: WbBoundCallback<Services> = bound => {
        const target = bound.target.eventService;
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
