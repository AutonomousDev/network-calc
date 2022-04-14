import { useState, useEffect } from "react";
import React from "react";

function ConvertBandwidth() {
    const unit_GiB_to_Mib = 1024 / 1;
    const unit_MiB_to_KiB = 1024 / 1;
    const unit_KiB_to_Byte = 1024 / 1;
    const unit_Byte_to_bit = 8 / 1;


    const unit_Kbps_to_bps = 1000 / 1;
    const unit_Mbps_to_Kbps = 1000 / 1;
    const unit_Gbps_to_Mbps = 1000 / 1;


    const [transmission_rate, set_transmission_rate] = React.useState();
    const [transmission_rate_unit, set_transmission_rate_unit] = React.useState();
    const [transmission_rate_unit2, set_transmission_rate_unit2] = React.useState();

    //calculate conversion rate

    function set_transmission_conversion(unit_string) {
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
    let transmission_rate_bits = transmission_rate_conversion * transmission_rate

    let transmission_rate_conversion2 = set_transmission_conversion(transmission_rate_unit2)
    let transmission_rate_converted = transmission_rate_bits/transmission_rate_conversion2



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
    
    
    return (
        <div class="">
            <h1>Bandwidth Conversion</h1>
            <form>
                <p>A link with a transmission rate of
                    <input type="number" id="transmission_rate" name="transmission_rate" onChange={(e) => set_transmission_rate(e.target.value)} />
                    <select name="transmission_rate_unit" id="transmission_rate_unit" onChange={(e) => set_transmission_rate_unit(e.target.value)}>
                        <option value=""></option>
                        <option value="Gbps">Gbps</option>
                        <option value="Mbps">Mbps</option>
                        <option value="Kbps">Kbps</option>
                        <option value="bps">bps</option>
                    </select>
                    is equal to, {transmission_rate_bits} bps or 
                    <select name="transmission_rate_unit2" id="transmission_rate_unit2" onChange={(e) => set_transmission_rate_unit2(e.target.value)}>
                        <option value=""></option>
                        <option value="Gbps">Gbps</option>
                        <option value="Mbps">Mbps</option>
                        <option value="Kbps">Kbps</option>
                        <option value="bps">bps</option>
                    </select>
                    {transmission_rate_converted}
                </p>
            </form>

        </div>
    );
}

export default ConvertBandwidth;
