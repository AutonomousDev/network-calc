import { useState, useEffect } from "react";
import React from "react";
import ConvertBandwidthCalc from "../components/ConvertBandwidth";

function EdianRepresentation() {
    const [dns_id, set_dns_id] = React.useState();


    const power0_sixteen = 1;
    const power1_sixteen = 16;
    const power2_sixteen = 256;
    const power3_sixteen = 4096;
    const power4_sixteen = 65536;

    const DivSixteen = () => {
        let result = [0,0,0,0,0]
        let display_Helper = [0,0,0,0,0]
        let remaining_dns_id = dns_id
        display_Helper[0] = remaining_dns_id
        result[0] = Math.floor(remaining_dns_id/power4_sixteen)
        remaining_dns_id = remaining_dns_id%power4_sixteen
        display_Helper[1] = remaining_dns_id
        result[1] = Math.floor(remaining_dns_id/power3_sixteen)
        remaining_dns_id = remaining_dns_id%power3_sixteen
        display_Helper[2] = remaining_dns_id
        result[2] = Math.floor(remaining_dns_id/power2_sixteen)
        remaining_dns_id = remaining_dns_id%power2_sixteen
        display_Helper[3] = remaining_dns_id
        result[3] = Math.floor(remaining_dns_id/power1_sixteen)
        remaining_dns_id = remaining_dns_id%power1_sixteen
        display_Helper[4] = remaining_dns_id
        result[4] = Math.floor(remaining_dns_id/power0_sixteen)
        remaining_dns_id = remaining_dns_id%power0_sixteen

        return [result, display_Helper]

    }
    const [result, display_Helper] = DivSixteen()


    let big_edian_hex= result[1].toString(16) + result[2].toString(16) + result[3].toString(16) + result[4].toString(16)
    

    const changeEndianness = (string) => {
        const result = [];
        let len = string.length - 2;
        while (len >= 0) {
          result.push(string.substr(len, 2));
          len -= 2;
        }
        return result.join('');
}
    let little_edian= changeEndianness(big_edian_hex)


    return (
        <div class="">
            <h1>Edian Conversion</h1>
            <form>
                <p>1. For the following question, proper hexadecimal format is (0xYYYY) where Y will range in (0-9) or (A-F). Only proper formats will be accepted. </p>
                <p>Suppose that we send a DNS request with ID #
                    <input type="number" id="dnsID" onChange={(e) => set_dns_id(e.target.value)}/>.</p>
                <p>a. What is the little-endian representation (hexadecimal)? </p>
                <p>b. What is the big-endian representation (hexadecimal)?</p>
                <p>c. Which representation is required for network communication? (Enter "1" or "2" without quotes) </p>
            </form>

            <h2>Solution</h2>
            <p>
                Find big-endian hexadecimal representation first.</p>
            <p>
                Since we are converting this decimal number to a value with base 16, we should
                first consider the powers of 16.</p>
            <ul>
                <li>16^0 = 1 </li>
                <li>16^1 = 16 </li>
                <li>16^2 = 256 </li>
                <li>16^3 = 4,096</li>
                <li>16^4 = 65,536</li>
            </ul>
            <ul>

                <li>{display_Helper[1]}/{power4_sixteen}={result[1]}</li>
                <li>{display_Helper[2]}/{power4_sixteen}={result[2]}</li>
                <li>{display_Helper[3]}/{power4_sixteen}={result[3]}</li>
                <li>{display_Helper[4]}/{power4_sixteen}={result[4]}</li>

            </ul>
            
            Big Edian: 0x
            {big_edian_hex}
            <br/>
            Little Edian: 0x
            {little_edian}
          
            


        </div>
    );
}

export default EdianRepresentation;
