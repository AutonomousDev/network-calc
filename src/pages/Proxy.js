import { useState, useEffect } from "react";
import React from "react";
import ConvertFileSizeCalc from "../components/ConvertFiles";
import ConvertBandwidthCalc from "../components/ConvertBandwidth";


function Proxy() {
    const [file_size, set_file_size] = React.useState();
    const [file_unit, set_file_unit] = React.useState();
    const [transmission_rate, set_transmission_rate] = React.useState();
    const [transmission_rate_unit, set_transmission_rate_unit] = React.useState();
    const [connection_setup, set_connection_setup] = React.useState();
    const [time_unit, set_time_unit] = React.useState();

    let file_size_bits = ConvertFileSizeCalc(file_unit, "bit", file_size)
    let transmission_rate_bps = ConvertBandwidthCalc(transmission_rate_unit, "bps", transmission_rate)

    let saved_time = file_size_bits/transmission_rate_bps

    return (
        <div class="">
            <h1>Proxy server requests </h1>

            <p>A client in a network with a proxy server requests a
                <input type="number" id="set_file_size" onChange={(e) => set_file_size(e.target.value)} />
                <select name="set_file_unit" id="set_file_unit" onChange={(e) => set_file_unit(e.target.value)}>
                    <option value=""></option>
                    <option value="GiB">GiB</option>
                    <option value="MiB">MiB</option>
                    <option value="KiB">KiB</option>
                    <option value="Byte">Byte</option>
                    <option value="bit">bit</option>
                </select>
                file from an internet server,
                fakeservername.com. The network's proxy server has a
                <input type="number" id="transmission_rate" name="transmission_rate" onChange={(e) => set_transmission_rate(e.target.value)} />
                <select name="transmission_rate_unit" id="transmission_rate_unit" onChange={(e) => set_transmission_rate_unit(e.target.value)}>
                    <option value=""></option>
                    <option value="Gbps">Gbps</option>
                    <option value="Mbps">Mbps</option>
                    <option value="Kbps">Kbps</option>
                    <option value="bps">bps</option>
                </select>
                connection to
                fakeservername.com. The average response time between the network's proxy server and the
                internet origin server (including RTT) is
                <input type="number" id="set_connection_setup" onChange={(e) => set_connection_setup(e.target.value)} />
                <select name="time_unit" id="time_unit" onChange={(e) => set_time_unit(e.target.value)}>
                    <option value=""></option>
                    <option value="Seconds">Seconds</option>
                    <option value="MS">MS</option>
                </select>
                seconds for a small “header-only” HTTP
                request/response. The file requested by the client is currently in the proxy server cache, but the
                proxy server relays the client's request to the internet server with “if-modified since”</p>
            <p>Assume that transmissions between the proxy and the origin servers are stream (not packets) at
                full bandwidth, with negligible propagation delay.</p>
            <p>How much time is saved if the file has not been modified? (Give answer in seconds, without
                units, rounded to two decimal places, so for an answer of 1.4233 seconds you would enter
                "1.42" without the quotes.)</p>
            <h2>Solution</h2>
            <p>The network proxy server sends an if-modified-since to fakeservername.com. This message
                returns that the file has not changed. This response is received in a negligible amount of time (from
                the problem statement). Since the file has not been modified, it can be taken straight from the
                cache, so the amount of time saved is the amount of time it WOULD have taken to get the file from
                fakeservername.com to the network proxy... just the data size (L) divided by the connection rate
                between proxy and fakeservername.com (R)</p>
            {file_size_bits} bits/{transmission_rate_bps} bps = {saved_time}

        </div>
    );
}

export default Proxy;
