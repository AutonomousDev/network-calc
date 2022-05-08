
import React from "react";

function ConvertFileSizeCalc(startUnit, endUnit, startAmount) {
    const unit_GiB_to_Mib = 1024 / 1;
    const unit_MiB_to_KiB = 1024 / 1;
    const unit_KiB_to_Byte = 1024 / 1;
    const unit_Byte_to_bit = 8 / 1;

    //calculate conversion rate

    function set_file_conversion(file_size_unit) {
        let file_size_conversion
        if (file_size_unit === "GiB") {
          file_size_conversion = unit_GiB_to_Mib * unit_MiB_to_KiB * unit_KiB_to_Byte * unit_Byte_to_bit;
        }
        else if (file_size_unit === "MiB") {
          file_size_conversion = unit_MiB_to_KiB * unit_KiB_to_Byte * unit_Byte_to_bit;
        }
        else if (file_size_unit === "KiB") {
          file_size_conversion = unit_KiB_to_Byte * unit_Byte_to_bit;
        }
        else if (file_size_unit === "Byte") {
          file_size_conversion =   unit_Byte_to_bit;
        }
        else if (file_size_unit === "bit") {
          file_size_conversion = 1;
        }
        else {
          file_size_conversion = 0;
        }
        return file_size_conversion
    }
    let size_conversion = set_file_conversion(startUnit);
    let file_size_bits = size_conversion * startAmount;

    let finalResult = file_size_bits/set_file_conversion(endUnit)
    return finalResult
    
}
export default ConvertFileSizeCalc;