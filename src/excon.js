 class Excon {
    constructor(wantsStack, stackSize) {
        this.userAgent = '';
        this.wantsStack = wantsStack;
        this.usage = {
            red:{count:0,visible:true},
            blue:{count:0,visible:true},
            black:{count:0,visible:true},
            purple:{count:0,visible:true},
            orange:{count:0,visible:true},
            grey:{count:0,visible:true},
            green:{count:0,visible:true},
            navy:{count:0,visible:true},
            fuchsia:{count:0,visible:true},
            aqua:{count:0,visible:true},
            teal:{count:0,visible:true},
        }

        this.queue = []
        this.prevQueue = [];

        this.fontSize = '16px';
        this.padding = '20px 5px';
        this.fontColor = 'white';
        this.display = 'block'
        this.setStyle = `font-size:${this.fontSize};padding:${this.padding};padding-right:100px;color:${this.fontColor};display:block;`;
        if (wantsStack) {
            stackSize = typeof stackSize === 'undefined' ? 3 : stackSize;
            navigator.userAgent.includes("Chrome") ? this.userAgent = "Chrome" : '';
            navigator.userAgent.includes("Firefox") ? this.userAgent = "Firefox" : '';
        }
        this.warn = console.warn.bind({})
        this.log = console.log.bind({})
        this.error = console.error.bind({})
        this.table = console.table.bind({})
        
        console.warn = (message) => {
            this.queue.push({message:message,type:"warn"})
            this.displayQueue();
        }
        
        console.log = (message) => {
            this.queue.push({message:message,type:"log"})
            
            this.displayQueue();
        }
        
        console.error = (message) => {
            this.queue.push({message:message,type:"error"})
            this.displayQueue();
        }

        console.table = (message) => {
            
            this.queue.push({message:message,type:"table"})

            this.displayQueue();
        }
        
        

        // this.displayQueue()
    

    }

    displayQueue(){
        this.log(this.queue)
        console.clear();
        for(let i = 0;i<this.queue.length;i++){
            // this.error(this.queue[i].type)
            if(this.queue[i].type === "warn" && !this.queue[i].rendered){
                this.warn(this.queue[i].message)
                continue;
            }
            
            if(this.queue[i].type === "error" && !this.queue[i].rendered){

                this.error(this.queue[i].message);
                
                continue;
            }
            
            if(this.queue[i].type === "log" && !this.queue[i].rendered){
                // this.log(this.queue[i].type)
                this.log(this.queue[i].message)
               
                continue;
            }

            if(this.queue[i].type === "table" && !this.queue[i].rendered){
                this.table(this.queue[i].message)
                continue;
            }

            if(this.queue[i].type === "groupCollapsed" && !this.queue[i].rendered){
                if(this.queue[i].style){
                // console.groupCollapsed("yes")
                let style = this.setStyle + `background-color:${this.queue[i].type}`
                console.groupCollapsed(`%c${this.queue[i].message}`,style)
            }
            else{
                
                console.groupCollapsed(this.queue[i].message)
                }
                continue;
            }

            if(this.queue[i].type === "groupEnd" && !this.queue[i].rendered){
                console.groupEnd()
                continue;
            }

            if(!this.queue[i].rendered){
           
                if(this.usage[this.queue[i].type].visible){
                    let style = this.setStyle + `background-color:${this.queue[i].type}`
                    this.log("HI IM RED")
                this.log(this.queue[i].message,style)
                }
                
            }
        }

        window.exconQueue = this.queue;

        // this.log(this.queue)

    }


    defineMessage(message,type) {

        let parsedMessage = []
        let isObject = false;
        for(let i = 0;i<message.length;i++){

            if (typeof message[i] === "object") {
                isObject = true;
                return this.objector(message[i],type)
                continue;
            }

            
            if (Array.isArray(message[i])) {
                parsedMessage.push(`${i}:` + this.arraytor(message[i]) + "\n")
                continue;
            }

            parsedMessage.push(`${i}:` + message[i] + "\n");


        }
        let browser = this.getBrowserMessage()
        return `${parsedMessage.join("")}\n\n${browser}`
    }

     getBrowserMessage() {
        if(!this.wantsStack){return ''}
        let err = new Error();
        
        if(this.userAgent === "Chrome"){
            err = err.stack.split("\n");
            err = err[4].trim().replace(/ /,"").replace("at","");
            err = err.split(".")
            return `File: ${err[0]} \nMethod:${err[1].split("(")[0]}`
            // return err

        }
        else{
            // err = err.stack.split(",");
           let firefoxError = new Error()
           firefoxError = firefoxError.stack.split("\n")
           err = firefoxError[3].split("@");
           console.log("hi")
           return `Method: ${err[0]}`
        }
    }
    
    red(){
        let message = this.defineMessage(arguments,"red")


        
        let style = this.setStyle + 'background-color:red;'
        
        this.queue.push({message:`%c${message}`,type:"red"})
        this.displayQueue();
    
    }

    queue(){
        this.log("hi")
    }

    blue(){
        let message = this.defineMessage(arguments)

        let style = this.setStyle + 'background-color:blue'
        console.log(`%c${message}`,style)
        this.usage.blue.count++
    }

    black(){
        let message = this.defineMessage(arguments)

        let style = this.setStyle + 'background-color:black'
        console.log(`%c${message}`,style)
        this.usage.black.count++
    }

    purple(){
        let message = this.defineMessage(arguments)

        let style = this.setStyle + 'background-color:purple'
        console.log(`%c${message}`,style)
        this.usage.purple.count++
    }

    orange(){
        let message = this.defineMessage(arguments)

        let style = this.setStyle + 'background-color:orange'
        console.log(`%c${message}`,style)
        this.usage.orange.count++
    }

    grey(){
        let message = this.defineMessage(arguments)

        let style = this.setStyle + 'background-color:grey'
        console.log(`%c${message}`,style)
        this.usage.grey.count++
    }

    green(){
        let message = this.defineMessage(arguments)

        let style = this.setStyle + 'background-color:green'
        console.log(`%c${message}`,style)
        this.usage.green.count++
    }

    navy(){
        let message = this.defineMessage(arguments)

        let style = this.setStyle + 'background-color:navy'
        console.log(`%c${message}`,style)
        this.usage.navy.count++
    }

    fuchsia(){
        let message = this.defineMessage(arguments)

        let style = this.setStyle + 'background-color:fuchsia'
        console.log(`%c${message}`,style)
        this.usage.fuchsia.count++
    }

    agua(){
        let message = this.defineMessage(arguments)

        let style = this.setStyle + 'background-color:#00FFFF;color:black;'
        console.log(`%c${message}`,style)
        this.usage.aqua.count++
    }

    teal(){
        let message = this.defineMessage(arguments)

        let style = this.setStyle + 'background-color:teal'
        console.log(`%c${message}`,style)
        this.usage.teal.count++
    }

    look(){
        let message = this.defineMessage(arguments)

        let lookStyle = 'font-size:60px;color:red;font-weight:bold;margin-bottom:-200px;'

        console.log(`%cLOOK HERE`,lookStyle)
        this.black(message)
    }

    hide(){
        let toHide = arguments;
        
        for(let i = 0;i<arguments.length;i++){
            console.log(arguments[i])
            this.usage[arguments[i]].visible = false;
        }
        
    }


    help(){
        let message = this.objector(this.usage);

        this.black(`excon helper + usage \n ${message}`)
    }




    objector(message,type) {
        let count = 1;
        let currPush = 0;

        console.log(message)
        //Figure out if obj is one level deep
        let level = true;
        for(let keys in message){
            if(typeof message[keys] === "object"){
                for(let subkeys in message[keys]){
                    if(typeof message[keys][subkeys] === "object"){
                        level = false;
                        break;
                    }
                }
            }
        }

        if(level){
            this.queue.push({message:message,type:"table"})
            
        }
        else{
            console.log(message)
            return JSON.stringify(message);
        }




        // this.queue.push({message:"Object",type:"groupCollapsed"})
        // for (var i = 0; i < obj.length; i++) {
        //    if(obj[i] === "{"){
        //        count++;
        //        obj[i] +="\n";
        //    }

        //    if(obj[i-1] == "," || obj[i-1] === "{"){
        //     let j = 0;
        //     let tabs = '';
        //     while(j<count){
        //             tabs += "\t" 
        //             j++;
        //     }
        //     obj[i] = `\n${tabs}${obj[i]}`;
        //     }


        //    if(obj[i] == ","){
        //     let tabs = ''
        //     let j = 0;
        //     while(j<count){
        //         tabs+="\t"
        //         j++
        //     }

        //     console.log(message.substr(currPush,i-5));
        //     currPush = i-5;
        //    }
        }
    

    arraytor(arr) {
        arr = JSON.stringify(arr).split("");
        for (let i = 0; i < arr.length; i++) {
            (arr[i] === "]" && arr[i + 1] === ",") ? arr[i + 1] += "\n" : '';

        }
        arr[0] = `Array:\n${arr[0]}`
        return arr.join("")
    }

}

export let excon = new Excon(true)


