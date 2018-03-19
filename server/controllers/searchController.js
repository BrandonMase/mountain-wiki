module.exports = {
    goSearch:(req,res) =>{
        const db = req.app.get('db');
        const {q,l} = req.query;
        
        if(q && !l){
            db.go_search_question([q])
                .then(search=> res.status(200).send(search))
                .catch(err => console.log(err));
        }
    },
    goSearchLabel:(req,res) =>{
        const db =req.app.get('db');
        const {q,l} = req.query

        db.go_search_question([l])
                .then(search=> res.status(200).send(search))
                .catch(err => console.log(err));
    },
    searchForUser:(req,res) =>{
        const db = req.app.get('db');
        const {name} = req.params

        console.log(req.params)
        db.search_for_user([name])
            .then(users=>res.status(200).send(users))
            .catch(err=>res.status(500).send(err));
    }
}