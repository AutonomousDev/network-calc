import { useState, useEffect } from "react";
import React from "react";


function PersistentHTTP() {
    const [image_count, set_image_count] = React.useState();
    const [connection_setup, set_connection_setup] = React.useState();
    const [time_unit, set_time_unit] = React.useState();
    const unit_s_to_MS = 1000

    let persistent_request_count = Number(image_count) + 2
    let nonpersistent_request_count = Number(image_count)*2 + 2

    let delta_time = (nonpersistent_request_count-persistent_request_count)*connection_setup

    return (
        <div class="">
            <h1>Persistent HTTP</h1>
            <form>
                <p>A client’s browser sends an HTTP request to a website. The website responds with a handshake
                    and sets up a TCP connection. The connection setup takes 
                    <input type="number" id="set_connection_setup" onChange={(e) => set_connection_setup(e.target.value)} /> 
                    <select name="time_unit" id="time_unit" onChange={(e) => set_time_unit(e.target.value)}>
                        <option value=""></option>
                        <option value="Secounds">Secounds</option>
                        <option value="MS">MS</option>

                    </select>
                    , including the RTT. The browser
                    then sends the request for the website’s index file. The index file references 
                    <input type="number" id="set_image_count" onChange={(e) => set_image_count(e.target.value)} /> 
                    additional
                    images, which are to be requested/downloaded by the client’s browser. How many requests
                    (including the initial request) must be sent by the browser...</p>
            </form>

            <h2>Solution</h2>
            <h3>Persistent means all requests and responses are sent over a single TCP connection.</h3>
            <ul>

                <li>Request 1: Request to set up a TCP connection</li>
                <li>Request 2: Request to get the website’s index file</li>
                <li>Request 3: Request for first object #1</li>
                <li>Request 4: Request for object #2</li>
                <li>...</li>
                <li>Request {persistent_request_count}: last object #{image_count}</li>
            </ul>
            {image_count} + 2 = {persistent_request_count}

            <h3>Non-persistent means each request/response pair is sent over a separate TCP connection.</h3>
            <ul>

                <li>Request 1: Request to set up a TCP connection</li>
                <li>Request 2: Request to get the website’s index file</li>
                <li>Request 3: Request to set up a TCP connection for first object #1</li>
                <li>Request 4: Request for first object #1</li>
                
                <li>...</li>
                <li>Request {nonpersistent_request_count}:  last object #{image_count}</li>
            </ul>
            ({image_count} * 2) + 2 = {nonpersistent_request_count}
<h3>How much longer does non-persistent HTTP take than persistent HTTP?</h3>
<p>Find the difference in the number of requests then multiply this by the amount of time it takes to setup each TCP connection</p>
({nonpersistent_request_count} - {persistent_request_count}) * {connection_setup} {time_unit} per request = {delta_time} {time_unit}
        </div>
    );
}

export default PersistentHTTP;
