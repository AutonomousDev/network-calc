import { useState, useEffect } from "react";
import React from "react";


function CarryWraparound() {
    const [num1, set_num1] = React.useState();
    const [num2, set_num2] = React.useState();

    let result=[0,0,0,0,0,0,0,0]

    let num1List=[]
    let num2List=[]
    
    function binaryToList(thisNum){
        let thisList = [];
        let newVal = thisNum;
        for(let i=0; i<8; i++){
            let digit = newVal%(10);
            newVal=Math.floor(newVal/(10)); 
            thisList.push(digit);
        }
        thisList.reverse();
        return thisList;
    }
    num1List = binaryToList(num1)
    num2List = binaryToList(num2)

    function calcResult(list1, list2){
        result[7] = 0
        
        for(let i=7; i>0; i--){
            if(list1[i]+list2[i]+result[i] === 1){
                result[i]=1
            }
            else if (list1[i]+list2[i]+result[i] === 2){
                result[i-1] = 1
                result[i]=0
            }
            else if (list1[i]+list2[i]+result[i] === 3){
                result[i-1] = 1
                result[i]=1
            }
            console.log("i: ", i, "Result: ", result)
        }  
        if(list1[0]+list2[0]+result[0] === 0){
            result[0]=0
        }
        else if(list1[0]+list2[0]+result[0]===1)
            result[0]=1

        
    }
    console.log("num1List:",num1List)
    console.log("num2List:",num2List)
    calcResult(num1List, num2List)
    
    return (
        <div>
            <h1>Carry Wrap Around - out of order...</h1>
            <form>
            <p>Enter 2 8 bit binary numbers</p>
            <input type="number" id="set_num1" onChange={(e) => set_num1(e.target.value)} />
            <br/>
            +
            <br/>
            <input type="number" id="set_num2" onChange={(e) => set_num2(e.target.value)} />
            <br/>
            ________________________________
            <br/>
            {result}
            </form>
        </div>
    );
}

export default CarryWraparound;