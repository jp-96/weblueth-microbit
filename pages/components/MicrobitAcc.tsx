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

    const tblStyle: React.CSSProperties = { marginLeft: 'auto', marginRight: 'auto' };
    const tdStyle: React.CSSProperties = { width: "80px", textAlign: "right" };

    return (
        <React.Fragment>
            <MicrobitAccelerometer onAccelerometerDataChanged={onDataChanged} accelerometerPeriod={frequency} />
            <table style={tblStyle}>
                <tbody>
                    <tr><th>X:</th><td style={tdStyle}>{acc.x.toFixed(3)}</td></tr>
                    <tr><th>Y:</th><td style={tdStyle}>{acc.y.toFixed(3)}</td></tr>
                    <tr><th>Z:</th><td style={tdStyle}>{acc.z.toFixed(3)}</td></tr>
                </tbody>
            </table>
            <p>
                <button onClick={() => setFrequency(160)}>SLOW</button>
                <button onClick={() => setFrequency(20)}>FAST</button>
            </p>
        </React.Fragment>
    );
}
