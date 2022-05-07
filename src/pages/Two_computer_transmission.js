import { useState, useEffect } from "react";
import React from "react";

function Two_computer_transmission() {
    const unit_GiB_to_Mib = 1024 / 1;
    const unit_MiB_to_KiB = 1024 / 1;
    const unit_KiB_to_Byte = 1024 / 1;
    const unit_Byte_to_bit = 8 / 1;


    const unit_Kbps_to_bps = 1000 / 1;
    const unit_Mbps_to_Kbps = 1000 / 1;
    const unit_Gbps_to_Mbps = 1000 / 1;


    const [transmission_rate, set_transmission_rate] = React.useState();
    const [transmission_rate_unit, set_transmission_rate_unit] = React.useState();

    const [fileX_size, set_fileX_size] = React.useState();
    const [fileX_size_unit, set_fileX_size_unit] = React.useState();
    const [fileY_size, set_fileY_size] = React.useState();
    const [fileY_size_unit, set_fileY_size_unit] = React.useState();

    const [packet_payload_size, set_packet_payload_size] = React.useState();
    const [packet_payload_unit, set_packet_payload_unit] = React.useState();

    const [packet_header_size, set_packet_header_size] = React.useState();
    const [packet_header_unit, set_packet_header_unit] = React.useState();

    const [user_count, set_user_count] = React.useState();
    const [link_setup_time, set_link_setup_time] = React.useState();


    //calculate conversion rate
 
    function set_transmission_conversion( unit_string) {
        if (unit_string === "Gbps") {
            return unit_Gbps_to_Mbps * unit_Mbps_to_Kbps * unit_Kbps_to_bps;
        }
        else if (unit_string === "Mbps") {
            return unit_Mbps_to_Kbps * unit_Kbps_to_bps;
        }
        else if (unit_string === "Kbps") {
            return unit_Kbps_to_bps;
        }
        else if (unit_string === "bps") {
            return 1;
        }
        else {
            return 0;
        }
    }
    let transmission_rate_conversion = set_transmission_conversion(transmission_rate_unit)
    let transmission_rate_bits = transmission_rate_conversion*transmission_rate



    function set_file_size_conversion(unit_string) {
        if (unit_string === "GiB") {
            return unit_GiB_to_Mib * unit_MiB_to_KiB * unit_KiB_to_Byte * unit_Byte_to_bit;
        }
        else if (unit_string === "MiB") {
            return unit_MiB_to_KiB * unit_KiB_to_Byte * unit_Byte_to_bit;
        }
        else if (unit_string === "KiB") {
            return unit_KiB_to_Byte * unit_Byte_to_bit;
        }
        else if (unit_string === "Byte") {
            return unit_Byte_to_bit;
        }
        else if (unit_string === "bit") {
            return 1;
        }
        else {
            return 0;
        }
    }
    let fileX_size_conversion = set_file_size_conversion(fileX_size_unit);
    let fileX_size_bits = fileX_size * fileX_size_conversion;

    let fileY_size_conversion = set_file_size_conversion(fileY_size_unit);
    let fileY_size_bits = fileY_size * fileY_size_conversion;

    let packet_payload_size_bits = packet_payload_size * unit_Byte_to_bit
    let fileX_packets = fileX_size_bits / packet_payload_size_bits
    let fileX_packets_rounded = Math.ceil(fileX_packets)

    let fileY_packets = fileY_size_bits / packet_payload_size_bits
    let fileY_packets_rounded = Math.ceil(fileY_packets)

    let fileY_finishes = fileY_packets_rounded * 2
    let fileX_finishes = fileX_packets_rounded + fileY_packets_rounded

    let packet_total_size_bits = (Number(packet_payload_size) + Number(packet_header_size))*unit_Byte_to_bit

    let fileY_finish_time = (packet_total_size_bits* fileY_finishes) / transmission_rate_bits 
    let fileX_finish_time = (packet_total_size_bits* fileX_finishes) / transmission_rate_bits 
    return (
        <div>
            <form>
                <div class="m-5">
                <p>Given a link with a maximum transmission rate of
                    <input type="number" id="transmission_rate" name="transmission_rate" onChange={(e) => set_transmission_rate(e.target.value)} />
                    <select name="transmission_rate_unit" id="transmission_rate_unit" onChange={(e) => set_transmission_rate_unit(e.target.value)}>
                        <option value=""></option>
                        <option value="Gbps">Gbps</option>
                        <option value="Mbps">Mbps</option>
                        <option value="Kbps">Kbps</option>
                        <option value="bps">bps</option>
                    </select>
                    . Only two computers, X and Y, wish to transmit starting at time t = 0 seconds.
                </p>
                </div>
                <p>
                    Computer X sends FileX (
                    <input type="number" id="fileX_size" name="fileX_size" onChange={(e) => set_fileX_size(e.target.value)} />
                    <select name="fileX_size_unit" id="fileX_size_unit" onChange={(e) => set_fileX_size_unit(e.target.value)}>
                        <option value=""></option>
                        <option value="GiB">GiB</option>
                        <option value="MiB">MiB</option>
                        <option value="KiB">KiB</option>
                        <option value="bit">bit</option>
                    </select>
                    ) and computer Y sends FileY (
                    <input type="number" id="fileY_size" name="fileY_size" onChange={(e) => set_fileY_size(e.target.value)} />
                    <select name="fileY_size_unit" id="fileY_size_unit" onChange={(e) => set_fileY_size_unit(e.target.value)}>
                        <option value=""></option>
                        <option value="GiB">GiB</option>
                        <option value="MiB">MiB</option>
                        <option value="KiB">KiB</option>
                        <option value="bit">bit</option>
                    </select>
                    ), both starting at time t = 0
                </p>
                <p>
                    Statistical multiplexing is used, with details as follows
                </p>
                <p>
                    Packet Payload Size =
                    <input type="number" id="packet_payload_size" name="packet_payload_size" onChange={(e) => set_packet_payload_size(e.target.value)} />
                    Bytes
                </p>
                <p>
                    Packet Header Size =
                    <input type="number" id="packet_header_size" name="packet_header_size" onChange={(e) => set_packet_header_size(e.target.value)} />
                    Bytes (overhead)
                </p>
                <p>
                    Ignore Processing and Queuing delays.
                </p>
                <p>Assume partial packets (packets consisting of less than {packet_payload_size} Bytes of data) are padded so that they are the same size as full packets.</p>
                <p>Assume continuous alternating-packet transmission.</p>
                <p>Computer X gets the transmission medium first.</p>
                <p>At what time (t = ?) would FileX finish transmitting?</p>
                <p>At what time (t = ?) would FileY finish transmitting?</p>
                <p>Give answer in seconds, without units, rounded to two decimal places.</p>
            </form>
            <hr />
            <p>First, find the number of packets that will need to be sent to transmit FileX.</p>
            <p>Convert the size of the file from {fileX_size_unit} to bits.</p>
            {fileX_size} {fileX_size_unit} * {fileX_size_conversion} bits /1 {fileX_size_unit} = {fileX_size_bits} bits

            <p>Convert the packet payload size from bytes to bits.</p>
            {packet_payload_size} Bytes * {unit_Byte_to_bit} bits/ 1 Byte={packet_payload_size_bits} bits
            <p>Divide the size of the file by the number of bits in a packet.</p>
            {fileX_size_bits} bits / {packet_payload_size_bits} bits per packet = {fileX_packets} packets

            <p>It is assumed in the problem statement that packets consisting of less than 1,000 bytes of data are padded so that they are the same size as full packets, thus the previous value is rounded up.</p>
            {fileX_packets} packets = {fileX_packets_rounded}
            <hr />


            <p>Use the same steps to find the number of packets that will need to be sent to transmit FileY</p>
            {fileY_size} {fileY_size_unit} * {fileY_size_conversion} bits /1 {fileY_size_unit} = {fileY_size_bits} bits

            <p>Convert the packet payload size from bytes to bits.</p>
            {packet_payload_size} Bytes * {unit_Byte_to_bit} bits / 1 Byte ={packet_payload_size_bits} bits
            <p>Divide the size of the file by the number of bits in a packet.</p>
            {fileY_size_bits} bits / {packet_payload_size_bits} bits per packet = {fileY_packets} packets

            <p>It is assumed in the problem statement that packets consisting of less than 1,000 bytes of data are padded so that they are the same size as full packets, thus the previous value is rounded up.</p>
            {fileY_packets} packets = {fileY_packets_rounded}


            <p>Since continuous alternating-packet transmission is assumed with FileX getting the transmission medium first, the pattern for packet transmission can be visualized as follows.</p>
            <p>X, Y, X, Y, X, Y, X, Y, X, X, X, X, X, X</p>
            <p>Notice, since FileY is smaller, that all the packets transmitted by computer Y will be sent before computer X is finished transmitting all the packets for FileX</p>
            <p>Once again, since they're alternating, the total number of packets sent when FileY finishes transmitting can be thought of as twice the total number of packets used for transmitting FileY. Of course, half of those packets were for FileX.</p>
            <p>Total # of packets when FileY finishes transmitting =</p>
            {fileY_packets_rounded} packets * 2 = {fileY_packets_rounded * 2} packets

            <p>The total number of packets sent when FileX finishes transmitting is the total number of packets used for transmitting FileY and the total number of packets used for transmitting FileX.
            </p>
            <p>Total # of packets when FileX finishes transmitting =</p>
            {fileX_packets_rounded} packets + {fileY_packets_rounded}  = {fileX_packets_rounded + fileY_packets_rounded} packets

            <p>Now, since a {packet_header_size}Byte packet header is also sent with each packet, the time it takes to send each file must account for this data to be sent as well.</p>
            <p>First compute the size, in bits, of each packet header and payload</p>
            {packet_payload_size} Bytes + {packet_header_size} Bytes * {unit_Byte_to_bit} bits/Byte = {packet_total_size_bits}


            <p>Finally, calculate the time for each file to finish transmitting.</p>
            <p>For the smaller file, FileY:</p>
                ({packet_total_size_bits} bits * {fileY_finishes} packets) / {transmission_rate_bits} bps = {fileY_finish_time} seconds

            <p>For the larger file, FileX:</p>
            ({packet_total_size_bits} bits * {fileX_finishes} packets) / {transmission_rate_bits} bps = {fileX_finish_time} seconds
            <p>Note: The maximum transmission rate of the link given in the problem statement was converted from Mbps to bits per second to align the units before performing the above calculations, but this hasn't been written out since it was learned during Week 1</p>

        </div>
    );
}

export default Two_computer_transmission;
