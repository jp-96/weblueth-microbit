import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  WbxCustomEventCallback,
  WbBoundCallback,
  MicrobitAccelerometer,
  WbxServicesEffector,
  useWbxActor
} from 'weblueth-react';
import MicroBitInfo from './MicrobitInfo';
import MicrobitButtonState from './MicrobitButtonState';
import { Services } from 'microbit-web-bluetooth';
import { AccelerometerData, AccelerometerPeriod } from 'microbit-web-bluetooth/types/services/accelerometer';
import MicrobitTemperatureView from './MicrobitTemperatureView';

function Microbit() {
  const [state, send] = useWbxActor();
  const [stateA, setStateA] = useState("");
  const [stateB, setStateB] = useState("");
  const [acc, setAcc] = useState({ x: 0, y: 0, z: 0, });
  const [services, setServices] = useState<Services>({});
  const [frequency, setFrequency] = useState<AccelerometerPeriod>(20);

  const cb = useCallback<WbBoundCallback<Services>>((bound) => {

    const listenerButtonA = (event: any) => {
      console.log("Button A:", `${event.type}`, `${event.detail}`);
      if (event.detail === 2) {
        setStateA("(Long Press A)");
      } else {
        setStateA("")
      }
    };

    const listenerButtonB = (event: any) => {
      console.log("Button B:", `${event.type}`, `${event.detail}`);
      if (event.detail === 2) {
        setStateB("(Long Press B)");
      } else {
        setStateB("")
      }
    };

    if (bound.binding) {
      bound.target.buttonService?.addEventListener("buttonastatechanged", listenerButtonA);
      bound.target.buttonService?.addEventListener("buttonbstatechanged", listenerButtonB);
      setServices({ ...bound.target });
    } else {
      bound.target.buttonService?.removeEventListener("buttonastatechanged", listenerButtonA);
      bound.target.buttonService?.removeEventListener("buttonbstatechanged", listenerButtonB);
      setServices({});
    }
  }, []);

  useEffect(WbxServicesEffector(state, cb), []);

  const cbAcc: WbxCustomEventCallback<AccelerometerData> = (event) => {
    setAcc({ x: event.detail.x, y: event.detail.y, z: event.detail.z })
  }

  const listItems = (() => {
    const serviceNames: string[] = [];
    if (services) {
      Object.keys(services).forEach((key) => {
        if (services[key]) {
          serviceNames.push(key);
        }
      });
    }
    return serviceNames;
  })().map((serviceName) => <li key={serviceName}>{serviceName}</li>);

  return (
    <div className="Microbit">
        <p>
          {state.context.conn.name + ": [" + state.toStrings() + "]"}<br />
          <button onClick={() => send("RESET")}>RESET</button>
          <button onClick={() => send("REQUEST")}>REQUEST</button>
          <button onClick={() => send("CONNECT")}>CONNECT</button>
          <button onClick={() => send("DISCONNECT")}>DISCONNECT</button>
          <br />
          name: <MicroBitInfo infoName="name" />
          <br />
          id: <MicroBitInfo infoName="id" />
          <br />
          Button A: <MicrobitButtonState button='a' /> {stateA}
          <br />
          Button B: <MicrobitButtonState button='b' /> {stateB}
          <br />
          <MicrobitAccelerometer onAccelerometerDataChanged={cbAcc} accelerometerPeriod={frequency} />
          <br />
          x: {acc.x}, y: {acc.y}, z: {acc.z}
          <br />
          <button onClick={() => setFrequency(640)}>SLOW</button>
          {`${frequency}`}
          <button onClick={() => setFrequency(20)}>FAST</button><br/>
          TEMP: <MicrobitTemperatureView />
        </p>
        {listItems.length > 0 && <div>services:<ul>{listItems}</ul></div>}
        <p>
          {state.context.rejectedReason.type !== "NONE" && ("rejected: " + state.context.rejectedReason.message)}<br />
          {state.context.disconnectedReason.type !== "NONE" && ("disconnected: " + state.context.disconnectedReason.message)}
        </p>
    </div>
  );
}

export default Microbit;
