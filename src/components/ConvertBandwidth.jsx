
import React from "react";

function ConvertBandwidthCalc(startUnit, endUnit, startAmount) {
    const unit_Kbps_to_bps = 1000 / 1;
    const unit_Mbps_to_Kbps = 1000 / 1;
    const unit_Gbps_to_Mbps = 1000 / 1;

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
    let transmission_rate_conversion = set_transmission_conversion(startUnit);
    let transmission_rate_bits = transmission_rate_conversion * startAmount;

    let finalResult = transmission_rate_bits/set_transmission_conversion(endUnit)
    return finalResult

    
}
export default ConvertBandwidthCalc;