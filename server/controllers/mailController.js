const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports={
    sendMail:(req,response) =>{

        const db = req.app.get('db');

        let smtpConfig = {
            host:"smtp.gmail.com",
            auth:{
                user:"no.reply.mountain.wiki",
                pass:process.env.NODE_MAILER_PASS
            }
        }

        let transporter = nodemailer.createTransport(smtpConfig)


        db.get_mail_entries()
            .then(res=>{
                let html = '';
                html +=`<div style='background-color:#ff5722; padding:1px; color:white;'>
                <p style='font-weight:bold; font-size:30px; margin-left:10px'>MOUNTAIN WIKI</p>
            </div>
            <div style='width:80%; margin:auto'>
            <div style='text-align:left border:solid black 1px'>
                <p style='font-size:20px; font-family:Helvetica;text-align:center;text-transform:uppercase'>Here are the top posts of the week</p>
                <div style='text-align:left; display:inline-block; flex-wrap:wrap;'>`

                res.map(e =>{
                    let date = e.date.substr(0,10).split("-");
                    date = `${date[1]}/${date[2]}/${date[0]}`;
                    let link = `http://localhost:3000/entry/${e.auto_id}`
                    let authorLink = `http://localhost:3000/u/${e.master_contributor}`

                    html +=`
                    <div style='border-bottom:solid #bcbebe 1px; width:60vw; padding-bottom:9px; font-family:Helvetica; margin-bottom:10px'>
    
                    <div style='background-color:#536DFE;padding:1px'>
                        <a style='text-decoration:none' href=${link}><p style='font-weight:bold; font-size:15px; margin-left:10px;color:white; text-transform:uppercase'>${e.title}</p></a>
                    </div>

                    <div style='margin-left:10px; margin-top:9px;'>
                        <span style='padding:10px; border-right:solid #bcbebe 1px;'>${e.total_points} votes</span>
                        <span style='padding:10px;'>${e.count} comments</span>

                        <span style='padding:10px; text-align:right; text-transform:uppercase;'>${e.entry_type} by <strong><a style='text-decoration:none;color:#212121' href=${authorLink}>${e.name}</a></strong> on ${date}</span>

                    </div>
            
                    </div>`
                })

                html +=` </div>
                </div>
                </div>
                </div>`

                let message = {
                    from:"no.reply.mountain.wiki@gmail.com",
                    to:"jordanmbush@gmail.com",
                    subject:'༜ MOUNTAIN WIKI TOP POSTS OF THE WEEK ༜',
                    text:'',
                    html:html,
                }

                transporter.sendMail(message,(err,info)=>{
                    if(err){
                        console.log(err);
                        response.status(500).send('boo');
                    }
                    else{
                        response.status(200).send('yay')
                    }
                })
            } )
            .catch(err => console.log(err))



        // transporter.sendMail(message,(err,info)=>{
        //     if(err){
        //         console.log(err);
        //         res.status(500).send("boo")
        //     }else{
        //         console.log(info)
        //         res.status(200).send("yay")
        //     }
        // });
    }
}