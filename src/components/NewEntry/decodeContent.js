import React from 'react';
import Showoff from './Showoff';
export default function decodeContent(content){
    if(content.includes("::showoff::")){
        content = showoff(content)
    }
    else{
        content = content.replace(/on/,"<span>on</span>")
    }
    
    console.log("CONTENT",content)
    content = content.replace(/%09/gi,"&nbsp;&nbsp; ")
    content = content.replace(/%3C/gi,"&lt;");
    content = content.replace(/%3E/gi,"&gt;");
    content = content.replace(/\*\*%0A/gi,"</strong><br/>");
    content = content.replace(/\*\*%20/gi,"</strong> ")
    content = content.replace(/\*\*/gi,"<strong>")
    content = content.replace(/\*%0A/gi,"</i><br/>");
    content = content.replace(/%20\*%20/gi,"</i> ")
    content = content.replace(/\*%20/gi,"<i>")
    content = content.replace(/::c%0A/gi,"::c")
    content = content.replace(/::c%20/gi,"::c")
    content = content.replace(/%20::e/gi,"::e")
    content = content.replace(/%0A::e/gi,"%0A::e")
    content = content.replace(/::e%0A/gi,"::e")
    content = content.replace(/::gc%0A/gi,"::gc")
    content = content.replace(/::bc%0A/gi,"::bc")
    content = content.replace(/%0A/gi,"<br />");
    
    
    // content = decodeURI(content)
    
    
    content = content.replace(/###%20/gi,"<h3>");
    content = content.replace(/%20###/gi,"</h3>");
    
    content = content.replace(/##%20/gi,"<h2>");
    content = content.replace(/%20##/gi,"</h2>");
    
    content = content.replace(/#%20/gi,"<h1>");
    content = content.replace(/%20#/gi,"</h1>");
    
    content = content.replace(/::a/gi,"<a target='blank' class='entryLink'")
    content = content.replace(/href:/gi,"href=")
    content = content.replace(/name:/gi,">")
    content = content.replace(/a::/gi,"</a>")
    
    content = content.replace(/::gc/gi,"<div class='goodCode'>");
    content = content.replace(/::bc/gi,"<div class='badCode'>");
    content = content.replace(/::c/gi,"<div class='code'>")
    content = content.replace(/::e/gi,"</div>")
    
    // content = content.replace(/%20/gi,"&nbsp;")

    console.log("CONTENTAFTER",content)
    return content;
}

export function showoff(content){
    // content = encodeURI(content);

    content = content.split("::showoff::")
    let beforeShowoff = content[0];
    content = content[1];
    // content = content.replace(/%3E/gi,"&gt;");
    // content = content.replace(/class/gi,`<span class='purple'>class</span>`)
    content = content.replace(/=/gi,`<span class="purple">=</span>`)
    content = content.replace(/\'/gi,`<span class="blue">\'</span>`)
    // content = content.replace(/%3Cinput/gi,"<span class='red'><input</span>");
    // content = content.replace(/\/input/gi,"<span class='red'>/input</span>");
    content = content.replace(/%3C/gi,"<span class='purple'><</span>");
    content = content.replace(/%3E/gi,`<span class='purple'>></span>`)
    content = content.replace(/`/gi,`<span class='blue'>\`</span>`)

    content = content.replace(/function/gi,`<span class='purple'>function</span>`)
    content = content.replace(/%7B/gi,`<span class='yellow'>{</span>`)
    content = content.replace(/%7D/gi,`<span class='yellow'>}</span>`)
    content = content.replace(/\(/gi,`<span class='yellow'>(</span>`)
    content = content.replace(/\)/gi,`<span class='yellow'>)</span>`)
    content = content.replace(/onClick/g,`<span class='yellow'>onClick</span>`)
    content = content.replace(/onChange/g,`<span class='yellow'>onChange</span>`)
    content = content.replace(/extends/gi,`<span class='yellow'>extends</span>`)
    content = content.replace(/class%20/gi,`<span class='yellow'>class </span>`)
    content = content.replace(/\.post/gi,`.<span class='yellow'>post</span>`)
    content = content.replace(/\.get/gi,`.<span class='yellow'>get</span>`)
    content = content.replace(/\.put/gi,`.<span class='yellow'>put</span>`)
    content = content.replace(/\.delete/gi,`.<span class='yellow'>delete</span>`)
    content = content.replace(/href/gi,`<span class='yellow'>href</span>`)
    content = content.replace(/let%20/gi,`<span class='purple'><i>let</i> </span>`)
    content = content.replace(/var%20/gi,`<span class='purple'><i>var</i> </span>`)
    content = content.replace(/default/gi,`<span class='purple'>default</span>`)
    content = content.replace(/const%20/gi,`<span class='purple'><i>const</i> </span>`)
    content = content.replace(/stringify/gi,`<span class='purple'>stringify</span>`)
    content = content.replace(/;/gi,`<span class='purple'>;</span>`)
    content = content.replace(/if\(/gi,`<span class='blue'>if</span>`)
    content = content.replace(/if%20/gi,`<span class='blue'>if</span>`)
    content = content.replace(/import/gi,`<span class='blue'>import</span>`)
    content = content.replace(/export/gi,`<span class='blue'>export</span>`)
    content = content.replace(/axios/gi,`<span class='blue'>axios</span>`)
    content = content.replace(/then/gi,`<span class='blue'>then</span>`)
    content = content.replace(/catch/gi,`<span class='blue'>catch</span>`)
    content = content.replace(/setState/gi,`<span class='blue'>setState</span>`)
    // content = content.replace(/state/gi,`<span class='blue'>state</span>`)
    
    content = content.replace(/className/gi,`<span class='green'>className</span>`)
    content = content.replace(/JSON/gi,`<span class='green'>JSON</span>`)

    content = content.replace(/=%3E/gi,`<span class='purple'>=></span>`)
    content = content.replace(/:/gi,`<span class='purple'>:</span>`)
    content = content.replace(/\?/gi,`<span class='purple'>?</span>`)
    content = content.replace(/&/gi,`<span class='purple'>&</span>`)
    content = content.replace(/typeof%20/gi,`<span class='red'>typeof </span>`)
    content = content.replace(/isArray/gi,`<span class='red'>isArray</span>`)
    content = content.replace(/h2/gi,`<span class='red'>h2</span>`)
    content = content.replace(/h1/gi,`<span class='red'>h1</span>`)
    content = content.replace(/img/gi,`<span class='red'>img</span>`)
    content = content.replace(/header/gi,`<span class='red'>header</span>`)
    content = content.replace(/\/div/gi,`<span class='red'>/div</span>`)
    content = content.replace(/div/gi,`<span class='red'>div</span>`)
    content = content.replace(/<a/gi,`<span class='red'><a</span>`)
    content = content.replace(/\/a>/gi,`<span class='red'>/a</span>`)
    content = content.replace(/button/gi,`<span class='red'>button</span>`)
    content = content.replace(/!/gi,`<span class='red'><i>!</i></span>`)
    content = content.replace(/Array\./gi,`<span class='red'>Array</span>.`)
    content = content.replace(/error/g,`<span class='red'><i>error</i></span>`)
    content = content.replace(/this/gi,`<span class='red'><i>this</i></span>`)

    content = content.replace(/console.log/gi,`<span class='yellow'>console</span>.<span class='yellow'>log</span>`)
    content = content.replace(/console/gi,`<span class='yellow'>console</span>`)
    content = content.replace(/%22/gi,`<span class='blue'>"</span>`)
    content = content.replace(/%60/gi,`<span class='blue'>\`</span>`)
    content = content.replace(/%09/gi,"&nbsp;&nbsp;&nbsp;&nbsp;")
    content = content.replace(/%20/gi,"&nbsp;")

    content = content.split("%0A");
    let newContent = []
    if(content.length > 1){
        content.map((e,i) =>{
            i === 0 ? '' :
            newContent.push(`<div class='showoffContainer'><div class='outShowoff'>${i}</div><div class='inShowoff'><span class='pNonBlock'>${e}</span></div></div>`) 
        })
    }

    console.log("NEWCONTENT",newContent);
return (`${beforeShowoff}<div class='mainShowoffContainer'>${newContent.join("")}</div>`);
}