import React, { Component } from 'react';
import './LandingPage.css';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import upvote from './../../assets/upvote.png';
import downvote from './../../assets/downvote.png';
class QuestionDiv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      total_points: 0,
      answers: 0,
      username: '',
      labels: '',
      date: '',
      is_entry:'',
    }
    this.getLabels = this.getLabels.bind(this)
  }
  componentDidMount(props) {
    const { title, total_points, answers, labels,auto_id,name,entry_type,master_contributor } = this.props.childProps
    
    let date = this.props.childProps.date.slice(0,10).split("-");
    date = `${date[1]}/${date[2]}/${date[0]}`
    this.setState({auto_id:auto_id, title: title, total_points: total_points, answers: answers, username: name, labels: labels, date: date,entry_type:entry_type,index:this.props.index,user_id:master_contributor },()=>console.log(this.state));
    
  }


  getLabels(){
    let html = [];
    let labels = this.props.childProps.labels
    labels = labels.split(",");

    labels.map(e=>{
    html.push(<Link to={`/s?l=${e}`}><div className="questionLabel ">{e}</div></Link>)
    })

    return html


  }


  render() {
    let style = {fontFamily:'Fjalla One',textTransform:'uppercase',fontSize:'20px',color:'white',padding:'5px',textAlign:'right',paddingRight:'10px'};    
    {this.state.entry_type === "entry" ? style.backgroundColor='rgb(0, 184, 0)' : ''}
    {this.state.entry_type === "question" ? style.backgroundColor='rgb(255, 53, 53)' : ''}
    {this.state.entry_type === "snippet" ? style.backgroundColor='#536DFE' : ''}

    return (
  
      <div className="newQuestionDiv dp2-bs" key={this.props.index}>
        {/* <div className="mobileVotesDiv lightPrimaryColor">
          <div className="votes primaryText">{this.state.total_points}<br /><img className="upAndDownVotes" src="/images/chevron-up.png" /><img className="upAndDownVotes" src="/images/chevron-down.png" /></div>
          <div className="votes primaryText">{this.state.answers}<br />A</div>
        </div> */}
        <div className="mobileVotesDiv lightPrimaryColor">
          <div>
          <div className="img"><img src={upvote} /></div>
          <div className="votes">{this.state.total_points}</div>
          <div className="img"><img src={downvote} /></div>
          </div>
          <div className="mobileAnswer">{this.state.answers}<br />A</div>
          </div>
        <div className="votesDiv">
          <div className="votes votesId lightPrimaryColor"><p>{this.state.total_points}<br />votes</p></div>
          <div className="votes answerId accentColor"><p>{this.state.answers} <br />answers</p></div>
        </div>
        <div className="rightQuestionDiv">
          <div className="questionHeaderText"><Link to={`/entry/${this.state.auto_id}`}>{this.state.title}</Link>
          </div>
          <div>
          {this.getLabels()}
          </div>
          
          <div style={style} className="bottomDetails"> {this.state.entry_type}<div className="questionDetails">by <Link className="authorLink" to={`/u/${this.state.user_id}`}>{this.state.username}</Link> {this.state.date}</div>
         </div>
        </div>
      </div>
      
    );
  }
}

export default connect()(QuestionDiv)