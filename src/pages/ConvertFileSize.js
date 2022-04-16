import { useState, useEffect } from "react";
import React from "react";
import ConvertFileSizeCalc from "../components/ConvertFiles";

function ConvertFileSize() {


    const [file_size, set_file_size] = React.useState();
    const [file_unit, set_file_unit] = React.useState();
    const [file_unit2, set_file_unit2] = React.useState();

    let file_size_converted = ConvertFileSizeCalc(file_unit,file_unit2,file_size)
    let file_size_bits= ConvertFileSizeCalc(file_unit,"bit",file_size)
    
    return (
        <div class="">
            <h1>File Size Conversion</h1>
            <form>
                <p>A file of
                <input type="number" id="set_file_size" onChange={(e) => set_file_size(e.target.value)} />
                <select name="set_file_unit" id="set_file_unit" onChange={(e) => set_file_unit(e.target.value)}>
                    <option value=""></option>
                    <option value="GiB">GiB</option>
                    <option value="MiB">MiB</option>
                    <option value="KiB">KiB</option>
                    <option value="Byte">Byte</option>
                    <option value="bit">bit</option>
                </select>
                    is equal to, {file_size_bits} bits or 
                    <select name="set_file_unit2" id="set_file_unit2" onChange={(e) => set_file_unit2(e.target.value)}>
                    <option value=""></option>
                    <option value="GiB">GiB</option>
                    <option value="MiB">MiB</option>
                    <option value="KiB">KiB</option>
                    <option value="Byte">Byte</option>
                    <option value="bit">bit</option>
                </select>
                    {file_size_converted}
                </p>
            </form>

        </div>
    );
}

export default ConvertFileSize;
