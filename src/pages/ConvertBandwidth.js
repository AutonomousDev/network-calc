import { useState, useEffect } from "react";
import React from "react";
import ConvertBandwidthCalc from "../components/ConvertBandwidth";

function ConvertBandwidth() {
    const [transmission_rate, set_transmission_rate] = React.useState();
    const [transmission_rate_unit, set_transmission_rate_unit] = React.useState();
    const [transmission_rate_unit2, set_transmission_rate_unit2] = React.useState();

    let transmission_rate_converted = ConvertBandwidthCalc(transmission_rate_unit,transmission_rate_unit2,transmission_rate)
    let transmission_rate_bits= ConvertBandwidthCalc(transmission_rate_unit,"bps",transmission_rate)
    
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
