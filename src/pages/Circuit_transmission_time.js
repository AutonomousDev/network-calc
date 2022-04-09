import { useState, useEffect } from "react";
import React from "react";

function Circuit_transmission_time() {
  const unit_GiB_to_Mib = 1024 / 1;
  const unit_MiB_to_KiB = 1024 / 1;
  const unit_KiB_to_Byte = 1024 / 1;
  const unit_Byte_to_bit = 8 / 1;


  const unit_Kbps_to_bps = 1000 / 1;
  const unit_Mbps_to_Kbps = 1000 / 1;
  const unit_Gbps_to_Mbps = 1000 / 1;


  const [transmission_rate, set_transmission_rate] = React.useState();
  const [transmission_rate_unit, set_transmission_rate_unit] = React.useState();

  const [file_size, set_file_size] = React.useState();
  const [file_size_unit, set_file_size_unit] = React.useState();

  const [user_count, set_user_count] = React.useState();
  const [link_setup_time, set_link_setup_time] = React.useState();


  //calculate conversion rate
  let transmission_rate_conversion;
  if (transmission_rate_unit === "Gbps") {
    transmission_rate_conversion = unit_Gbps_to_Mbps * unit_Mbps_to_Kbps * unit_Kbps_to_bps;
  }
  else if (transmission_rate_unit === "Mbps") {
    transmission_rate_conversion = unit_Mbps_to_Kbps * unit_Kbps_to_bps;
  }
  else if (transmission_rate_unit === "Kbps") {
    transmission_rate_conversion = unit_Kbps_to_bps;
  }
  else if (transmission_rate_unit === "bps") {
    transmission_rate_conversion = 1;
  }
  else {
    transmission_rate_conversion = 0;
  }

  let file_size_conversion;
  if (file_size_unit === "GiB") {
    file_size_conversion = unit_GiB_to_Mib * unit_MiB_to_KiB * unit_KiB_to_Byte * unit_Byte_to_bit;
  }
  else if (file_size_unit === "MiB") {
    file_size_conversion = unit_MiB_to_KiB * unit_KiB_to_Byte * unit_Byte_to_bit;
  }
  else if (file_size_unit === "Kib") {
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

  let file_size_bits = file_size * file_size_conversion;
  let transmission_rate_per_user_bps = (transmission_rate / user_count) * transmission_rate_conversion

  let send_time = (file_size_bits/transmission_rate_per_user_bps)*1000;
  Number(send_time)
  Number(link_setup_time)
  send_time = Number(send_time) + Number(link_setup_time)

  return (
    <div>
      <form>
        <p>How long does it take to send a
          <input type="number" id="file_size" name="file_size" onChange={(e) => set_file_size(e.target.value)} />
          <select name="file_size_unit" id="file_size_unit" onChange={(e) => set_file_size_unit(e.target.value)}>
          <option value=""></option>
            <option value="GiB">GiB</option>
            <option value="MiB">MiB</option>
            <option value="KiB">KiB</option>
            <option value="bit">bit</option>
          </select>
          file from Host A to Host B over a circuit-switched network, assuming:
        </p>
        <p>
          Total link transmission rate =
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
          Network is TDM, with
          <input type="number" id="user_count" name="user_count" onChange={(e) => set_user_count(e.target.value)} />
          permitted users, each with an equal time slot size.
        </p>
        <p>
          A link connection requires a setup time of
          <input type="number" id="link_setup_time" name="link_setup_time" onChange={(e) => set_link_setup_time(e.target.value)} /> ms.
        </p>
      </form>
      <div>
        <hr/>
        <p>
          Divide the total link transmission rate by the number of permitted users to get the bandwidth
          reserved for each user. Convert the total link transmission rate from {transmission_rate_unit} to bps.
        </p>
        {transmission_rate} {transmission_rate_unit}/ {user_count} Users * {transmission_rate_conversion} bps/1 {transmission_rate_unit} = {transmission_rate_per_user_bps} bps
        <p>
          Note: Loss of precision in this answer (such as approximating it as 3.3 Gbps) may lead to imprecision in the final answer.
        </p>
        <hr/>
        <p>
          The packet length is converted from {file_size_unit} to bits to align the units with the transmission rate.
        </p>
        {file_size} {file_size_unit}*({file_size_conversion} {file_size_unit}/1 bit) = {file_size_bits} bits
        <hr/>
        <p>
        Then calculate the transmission delay and add that to the setup time to get the final answer.
        </p>
        (({(file_size * file_size_conversion)}bits/{((transmission_rate / user_count) * transmission_rate_conversion)}bps * 1000 ms/1s))+{link_setup_time}ms =

        {send_time} ms


      </div>
    </div>
  );
}

export default Circuit_transmission_time;
