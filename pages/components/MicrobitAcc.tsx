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
    
    const tdStyle:React.CSSProperties = {width: "150px", textAlign: "right"}
    
    return (
        <div className={"microbit-acc"}>
            <MicrobitAccelerometer onAccelerometerDataChanged={onDataChanged} accelerometerPeriod={frequency} />
            <table>
                <tr><th>X:</th><td style={tdStyle}>{acc.x.toFixed(3)}</td></tr>
                <tr><th>Y:</th><td style={tdStyle}>{acc.y.toFixed(3)}</td></tr>
                <tr><th>Z:</th><td style={tdStyle}>{acc.z.toFixed(3)}</td></tr>
            </table>
            <br />
            <button onClick={() => setFrequency(160)}>SLOW</button>
            <button onClick={() => setFrequency(20)}>FAST</button>
        </div>
    );
}
