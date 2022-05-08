import { useState, useEffect } from "react";
import React from "react";

function AcknowledgeNumber() {


    const [base_address, set_base_address] = React.useState();
    const [packet_1_size, set_packet_1_size] = React.useState();
    const [packet_2_size, set_packet_2_size] = React.useState();
    const [packet_3_size, set_packet_3_size] = React.useState();
    const [packet_1_name, set_packet_1_name] = React.useState();
    const [packet_2_name, set_packet_2_name] = React.useState();
    const [packet_3_name, set_packet_3_name] = React.useState();

    let ack_packet_1 = Number(base_address) + 1 + Number(packet_1_size)
    let ack_packet_2 = Number(base_address) + 1 + Number(packet_1_size) + Number(packet_2_size)
    let ack_packet_3 = Number(base_address) + 1 + Number(packet_1_size) + Number(packet_2_size) + Number(packet_3_size)
    return (
        <div class="">
            <h1>Acknowledge Number</h1>
            <form>
                <p>HostA has established a TCP connection with HostB in a remote network. HostA is sending packets to HostB.
                    Assume we have configured TCP, somehow, to ACK every segment (no ACKing every other segment).
                    Assume that the timeout is the same for all packets. HostB's “window size” is 20000 bytes.
                    HostB has already received and acknowledged everything sent by HostA's application up to and including byte #
                    <input type="number" id="set_base_address" onChange={(e) => set_base_address(e.target.value)} />
                    . HostA now sends segments of the same application data stream in order:
                </p>
                <p>
                    Packet 1 size:
                    <input type="number" id="set_packet_1_size" onChange={(e) => set_packet_1_size(e.target.value)} />
                    bytes, AKA:
                    <input id="set_packet_1_name" onChange={(e) => set_packet_1_name(e.target.value)} />
                </p>
                <p>
                    Packet 2 size:
                    <input type="number" id="set_packet_2_size" onChange={(e) => set_packet_2_size(e.target.value)} />
                    bytes, AKA:
                    <input id="set_packet_2_name" onChange={(e) => set_packet_2_name(e.target.value)} />
                </p>
                <p>
                    Packet 3 size:
                    <input type="number" id="set_packet_3_size" onChange={(e) => set_packet_3_size(e.target.value)} />
                    bytes, AKA:
                    <input id="set_packet_3_name" onChange={(e) => set_packet_3_name(e.target.value)} />
                </p>
            </form>
            <h2>Solution</h2>

            <p>
                Acknowledgement of Packet 1 AKA: {packet_1_name} = {base_address} + 1 + {packet_1_size} = {ack_packet_1}
            </p>

            <p>
                Acknowledgement of Packet 2 AKA: {packet_2_name} = {base_address} + 1 + {packet_1_size} + {packet_2_size} = {ack_packet_2}
            </p>
            <p>
                Acknowledgement of Packet 3 AKA: {packet_3_name} = {base_address} + 1 + {packet_1_size} + {packet_2_size} + {packet_3_size} = {ack_packet_3}
            </p>
        </div>
    );
}

export default AcknowledgeNumber;
