module.exports ={
    addReport:(req,res) =>{
        const {entry_id,report_type,report_comment,user_id} = req.body
        const db = req.app.get('db');

        db.add_report([entry_id,report_type,report_comment,user_id])
            .then(()=>res.status(200).send("successful"))
            .catch(err => res.status(500).end())
    }
}