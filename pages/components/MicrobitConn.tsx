import React from 'react';
import { useWbxActor } from 'weblueth';

export default function MicrobitConn() {
    const [state, send] = useWbxActor();

    // MicrobitContextProvider connectionName Attr.
    const connectionName = state.context.conn.name;

    // xstate actions
    const reset = () => send("RESET");
    const request = () => send("REQUEST");
    const connect = () => send("CONNECT");
    const disconnect = () => send("DISCONNECT");

    // rejectedReason
    if (state.context.rejectedReason.type !== "NONE") {
        console.log("rejectedReason:", state.context.rejectedReason.message);
    }

    // disconnectedReason
    if (state.context.disconnectedReason.type !== "NONE") {
        console.log("disconnectedReason:", state.context.disconnectedReason.message);
    }

    return (
        <React.Fragment>
            {connectionName + ": [" + state.toStrings() + "]"}<br />
            <button onClick={reset}>RESET</button>
            <button onClick={request}>REQUEST</button>
            <button onClick={connect}>CONNECT</button>
            <button onClick={disconnect}>DISCONNECT</button>
        </React.Fragment>
    );
}
