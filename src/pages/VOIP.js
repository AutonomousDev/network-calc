import { useState, useEffect } from "react";
import React from "react";
import ConvertFileSizeCalc from "../components/ConvertFiles";
import ConvertBandwidthCalc from "../components/ConvertBandwidth";


function VOIP() {
    const [packet_count, set_packet_count] = React.useState();

    const [packet_size, set_packet_size] = React.useState();
    const [packet_size_unit, set_packet_size_unit] = React.useState();

    const [convert_file_rate, set_convert_file_rate] = React.useState();
    const [convert_file_rate_unit, set_convert_file_rate_unit] = React.useState();

    const [transmission_rate, set_transmission_rate] = React.useState();
    const [transmission_rate_unit, set_transmission_rate_unit] = React.useState();


    const [distance, set_distance] = React.useState();
    const [distance_unit] = React.useState();

    let file_size_conversion_factor = ConvertFileSizeCalc(packet_size_unit, "bit", 1);
    let bandwidth_size_conversion_factor = ConvertBandwidthCalc(transmission_rate_unit, "bps", 1)

    let converted_packet_size = ConvertFileSizeCalc(packet_size_unit, "bit", packet_size)
    let converted_transmission_rate = ConvertBandwidthCalc(transmission_rate_unit, "bps", transmission_rate)
    let converted_file_rate = ConvertBandwidthCalc(convert_file_rate_unit, "bps", convert_file_rate)

    let analog_to_digital = 1000 * converted_packet_size / converted_file_rate
    let transmission_delay = 1000 * converted_packet_size / converted_transmission_rate
    let propagation_delay = ((distance * 1000) / 250000000) * 1000

    let total_delay = analog_to_digital+transmission_delay+propagation_delay


    return (
        <div class="">
            <h1>VO IP</h1>
            <form>
                <p>Given the attached image, and:</p>
                <p>Host A converts analog to digital at a =
                    <input type="number" id="convert_rate" name="set_convert_file_rate" onChange={(e) => set_convert_file_rate(e.target.value)} />
                    <select name="transmission_rate_unit" id="set_convert_file_rate_unit" onChange={(e) => set_convert_file_rate_unit(e.target.value)}>
                        <option value=""></option>
                        <option value="Gbps">Gbps</option>
                        <option value="Mbps">Mbps</option>
                        <option value="Kbps">Kbps</option>
                        <option value="bps">bps</option>
                    </select>
                </p>

                <p>
                    Link transmission rate R =
                    <input type="number" id="transmission_rate" name="transmission_rate" onChange={(e) => set_transmission_rate(e.target.value)} />
                    <select name="transmission_rate_unit" id="transmission_rate_unit" onChange={(e) => set_transmission_rate_unit(e.target.value)}>
                        <option value=""></option>
                        <option value="Gbps">Gbps</option>
                        <option value="Mbps">Mbps</option>
                        <option value="Kbps">Kbps</option>
                        <option value="bps">bps</option>
                    </select>
                </p>
                <p>
                    Host A groups data into packets of length L =
                    <input type="number" id="set_packet_size" onChange={(e) => set_packet_size(e.target.value)} />
                    <select name="set_packet_size_unit" id="set_packet_size_unit" onChange={(e) => set_packet_size_unit(e.target.value)}>
                        <option value=""></option>
                        <option value="GiB">GiB</option>
                        <option value="MiB">MiB</option>
                        <option value="KiB">KiB</option>
                        <option value="Byte">Bytes</option>
                        <option value="bit">bit</option>
                    </select>
                </p>
                <p>
                    Distance to travel d =
                    <input type="number" id="set_distance" onChange={(e) => set_distance(e.target.value)} />
                    km
                </p>
                <p>

                    Propagation speed s = 2.5 x 10^8 m/s
                </p>
                <p>
                    Host A sends each packet to Host B as soon as it gathers a whole packet.
                </p>
                <p>
                    Host B converts back from digital to analog as soon as it receives a whole packet.
                </p>
                <p>
                    How much time elapses from when the first bit starts to be created until the conversion back to analog begins? Give answer in milliseconds to two decimal places
                </p>
            </form>
            <h2>Solution:</h2>
            <p>The packet length is converted from bytes to bits in order to align the units with the conversion rate and transmission rate provided in the question</p>
            <p>{packet_size} * {file_size_conversion_factor} {packet_size_unit}/ 1 bits = {converted_packet_size} bits</p>

            <h3>The time elapsed in converting analog to digital</h3>
            <p>
                (1000ms/1s) * {converted_packet_size} bits / {converted_file_rate} = {analog_to_digital} ms
            </p>

            <h3>Transmission Delay</h3>
            <p>(1000ms/1s) * {converted_packet_size} bits / {converted_transmission_rate} bps = {transmission_delay} ms</p>

            <h3>Propagation Delay</h3>
            <p>
                1000ms/1s) *{distance * 1000} M / 250,000,000 M/S = {propagation_delay} ms
            </p>

<h3>How much time elapses from when the first bit starts to be created until the conversion back to
analog begins? Give answer in milliseconds to two decimal places</h3>
<p>
{analog_to_digital} + {transmission_delay}+{propagation_delay} = {total_delay} ms
</p>




        </div>
    );
}

export default VOIP;
