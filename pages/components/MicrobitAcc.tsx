import React, { useState } from 'react';
import { WbxCustomEventCallback } from 'weblueth';
import { AccelerometerData, AccelerometerPeriod } from 'microbit-web-bluetooth/types/services/accelerometer';
import { MicrobitAccelerometer } from '../../src'; // from '@weblueth/microbit'

export default function MicrobitAcc() {
    const [acc, setAcc] = useState({ x: 0, y: 0, z: 0, });
    const [frequency, setFrequency] = useState<AccelerometerPeriod>(20);

    const onDataChanged: WbxCustomEventCallback<AccelerometerData> = (event) => {
        setAcc({ x: event.detail.x, y: event.detail.y, z: event.detail.z })
    }

    return (
        <div>
            <MicrobitAccelerometer onAccelerometerDataChanged={onDataChanged} accelerometerPeriod={frequency} />
            X: {Math.abs(acc.x).toFixed(3)}, Y: {Math.abs(acc.y).toFixed(3)}, Z: {Math.abs(acc.z).toFixed(3)}
            <br />
            <button onClick={() => setFrequency(160)}>SLOW</button>
            <button onClick={() => setFrequency(20)}>FAST</button>
        </div>
    );
}
