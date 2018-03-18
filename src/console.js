import React from 'react';

console.big = (message) =>{
    let style = 'background:#222; color:yellow; padding:10px;font-size:15px; display:block';
    let args = arguments[0].parents[0].split("/")
    args = args[args.length-1];
    let err = new Error;

    console.log(err)
    err = err.stack.toString().split("\n");
    err = err[2].split("(")
    if(typeof message === "object" && !Array.isArray(message)){

            message = console.objector(message)
    }
    
    if(Array.isArray(message)){
        console.log("hi")
        message = console.arraytor(message)
    }
    // console.log("%cLOOK HERE",'color:red;-webkit-text-stroke: 1px black;font-size:50px;font-weight:bolder')
    console.log(`%c********************************************************************************\n\n${message}\n\n********************************************************************************\n${err[0]}\n(${err[1]}`,style)

}

console.look = (message) => {
    let style = 'background-color:black;font-size:16px;color:white;padding:20px;display:block;border:solid red 10px;'
    if(typeof message === "object" && !Array.isArray(message)){

        message = console.objector(message)
    }

    if(Array.isArray(message)){
        message = console.arraytor(message)
    }
    
    console.log("%cLOOK HERE",'color:red;-webkit-text-stroke: 1px black;font-size:50px;font-weight:bolder;margin-top:200px')
    console.log(`%c${message}`,style)

}

console.objector = (obj) =>{
   obj = JSON.stringify(obj).split("")
   let count = 1;    

    for(let i = 0;i<obj.length;i++){
        if(obj[i] === "{" || obj[i] === ","){ 
            obj[i] === "{" ? count++ : null
            
            obj[i] = `${obj[i]}\n`;
            for(let j = 0;j<count;j++){
                obj[i]+= "  "
            }
        }

        if(obj[i] === "}"){
            count--;
        }
    }
    
        obj[0] = `Object:\n ${obj[0]}`
    
    
   return obj.join("").replace(/\"/gi,"")
}

console.arraytor = (arr) =>{
    
    arr = JSON.stringify(arr).split("");
    for(let i = 0;i<arr.length;i++){
         (arr[i] === "]" && arr[i+1] === ",")  ? arr[i+1] += "\n" : '';

        // console.log(arr[i])
    }
    arr[0] = `Array:\n${arr[0]}`
    return arr.join("")
}