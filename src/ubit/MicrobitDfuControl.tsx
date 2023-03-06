import React, { useEffect, useState } from 'react';
import { WbBoundCallback, WbxCustomEventCallback, WbxServiceProps, WbxServices } from 'weblueth';
import { DfuControlService } from 'microbit-web-bluetooth/types/services/dfu-control';
import { Services } from 'microbit-web-bluetooth';

interface Props extends WbxServiceProps<DfuControlService> {
}

export function MicrobitDfuControl(props: Props) {
    
    const onServicesBound: WbBoundCallback<Services> = bound => {
        const target = bound.target.dfuControlService;
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
