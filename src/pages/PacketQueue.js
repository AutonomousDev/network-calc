import { useState, useEffect } from "react";
import React from "react";
import ConvertFileSizeCalc from "../components/ConvertFiles";
import ConvertBandwidthCalc from "../components/ConvertBandwidth";


function PacketQueue() {
    const [packet_count, set_packet_count] = React.useState();

    const [packet_size, set_packet_size] = React.useState();
    const [packet_size_unit, set_packet_size_unit] = React.useState();

    const [transmission_rate, set_transmission_rate] = React.useState();
    const [transmission_rate_unit, set_transmission_rate_unit] = React.useState();

    const [packet_number, set_packet_number] = React.useState();

    let file_size_conversion_factor = ConvertFileSizeCalc(packet_size_unit, "bit", 1);
    let bandwidth_size_conversion_factor = ConvertBandwidthCalc(transmission_rate_unit, "bps", 1)

    let converted_packet_size = ConvertFileSizeCalc(packet_size_unit, "bit", packet_size)
    let converted_transmission_rate = ConvertBandwidthCalc(transmission_rate_unit, "bps", transmission_rate)

    let time_seconds = (packet_number - 1) * (converted_packet_size / converted_transmission_rate)
    let time_ms = time_seconds * 1000



    return (
        <div class="">
            <h1>Persistent HTTP</h1>
            <form>
                <p>Suppose there are
                    <input type="number" id="set_packet_count" onChange={(e) => set_packet_count(e.target.value)} />
                    packets entering a queue at the same time. Each packet is size
                    <input type="number" id="set_packet_size" onChange={(e) => set_packet_size(e.target.value)} />
                    <select name="set_packet_size_unit" id="set_packet_size_unit" onChange={(e) => set_packet_size_unit(e.target.value)}>
                        <option value=""></option>
                        <option value="GiB">GiB</option>
                        <option value="MiB">MiB</option>
                        <option value="KiB">KiB</option>
                        <option value="bit">bit</option>
                    </select>
                    .
                    The link transmission rate is
                    <input type="number" id="transmission_rate" name="transmission_rate" onChange={(e) => set_transmission_rate(e.target.value)} />
                    <select name="transmission_rate_unit" id="transmission_rate_unit" onChange={(e) => set_transmission_rate_unit(e.target.value)}>
                        <option value=""></option>
                        <option value="Gbps">Gbps</option>
                        <option value="Mbps">Mbps</option>
                        <option value="Kbps">Kbps</option>
                        <option value="bps">bps</option>
                    </select>

                    . What is the queueing delay of packet number
                    <input type="number" id="packet_number" name="packet_number" onChange={(e) => set_packet_number(e.target.value)} />
                    (in milliseconds rounded to one decimal point)
                </p>
            </form>

            <h2>Solution:</h2>
            <p>
                The queueing delay of a given packet N is calculated using the formula (N - 1) * (L/R) since packet N waits in the queue for precisely the amount of time that it takes for all the packets before it to be pushed onto the link.
            </p>
            <p>
                ({packet_number} - 1) * (({packet_size}{packet_size_unit} * {file_size_conversion_factor} ({packet_size_unit}/bit)) / ({transmission_rate} {transmission_rate_unit} * ({bandwidth_size_conversion_factor} bps / 1 {transmission_rate_unit}))
            </p>
            <p>
                {packet_number - 1} * ({converted_packet_size} bits/ {converted_transmission_rate} bps) = {time_seconds} Seconds
            </p>
            <p>
                Since the answer must be in milliseconds with one decimal point precision, we must convert:
            </p>
            {time_seconds} * 1000 ms / 1 s = {time_ms}

        </div>
    );
}

export default PacketQueue;
