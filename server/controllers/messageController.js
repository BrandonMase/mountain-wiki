module.exports = {
    addPrivateMessage:(req,res) =>{
        const db = req.app.get('db');

        const {toUser,fromUser,title,content,date} = req.body;

        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 30; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        db.add_private_message([toUser,fromUser,title,content,date,text])
            .then(response=>res.status(200).send(text))
            .catch(err=>res.status(500).send(err));
        },

    getAllPMs:(req,res) =>{
        const db = req.app.get('db');
        const {id} = req.params;

        db.get_all_PMS([id])
            .then(PMs=>res.status(200).send(PMs))
            .catch(err=>res.status(500).end())
    }
}