import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Mail.css'
class Mail extends Component {
    constructor(){
        super();

        this.state={
            messages:[]
        }

        this.showMail = this.showMail.bind(this)
    }
    componentDidMount(){

        const {user_id} = this.props.state
        axios.get(`/api/getAllPMs/${user_id}`)
            .then(res=>this.setState({messages:res.data}))
            .catch(err=>console.log(err))
        
        

    }

    showMail(){
        let html =[]
        if(this.state.messages !== []){
            this.state.messages.sort(function(a,b){
                let c = new Date(a.date).getTime();
                let d = new Date(b.date).getTime();
                return d-c
            })
            this.state.messages.map(e=>{
                let date = e.date.slice(0,10).split("-")
                date = `${date[1]}/${date[2]}/${date[0]}`;
                html.push(<div className="mainMailContainer dp1-bs">
                    <div className="accentColor headerText">
                        {e.title}
                    </div>
                    <div className="mailDetailsContainer bodyText">
                        {e.from_user == this.props.state.user_id ?
                        <div>to <Link className="link" to={`/u/${e.to_user}`}>{e.to_name}</Link> sent on {date}</div>
                        : <div>from <Link className="link" to={`/u/${e.from_user}`}>{e.from_name}</Link> sent on {date}</div>}
                    </div>
                    <hr/>
                    
                    <div className="bodyText">{e.content}</div>

                    {e.to_user == this.props.state.user_id ?
                    <button onClick={()=>this.props.history.push(`/pm/${e.from_user}`)} className="greenColor">{`send ${e.from_name} a message`}</button>
                   : <button onClick={()=>this.props.history.push(`/pm/${e.to_user}`)} className="greenColor">{`send ${e.to_name} a message`}</button>}
                </div>
                )})
        }

        return html;
    }
    render() {
        return (
            <div className="wholeMainMailContainer">
                <div>
                    <button onClick={()=>this.props.history.push('/pm/')} className="greenColor">Send a message</button>
                </div>
                {this.showMail()}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        state:state,
    }
}

export default connect(mapStateToProps)(Mail)