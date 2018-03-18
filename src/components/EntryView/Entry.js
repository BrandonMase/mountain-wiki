import React, { Component } from 'react';
import './EntryView.css';
import {connect} from 'react-redux';
import approval from './../../assets/approval.png';
import downvote from './../../assets/downvote.png';
import upvote from './../../assets/upvote.png';
import axios from 'axios'
import LogValidator from './../LogValidator/LogValidator'
import {logValidator} from './../../ducks/reducer';
import {NavLink,Link} from 'react-router-dom'
import edit from './../../assets/pencil.png'
import alert from './../../assets/alert.png';
import {check} from './../../utility';
import decodeContent from './../NewEntry/decodeContent';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      total_points: 0,
      answers:0,
      entry_id:null,
      vote:10,
      showValidator:false,
      report:false,
      reportContent:{
        reason:"not enough information",
        additional:null,
      }
    }

    this.voteIconChanger = this.voteIconChanger.bind(this)
    this.addReport = this.addReport.bind(this)
  }

  componentDidMount(props) {
    const { title,total_points, answers,entry_id,name,master_contributor,auto_id } = this.props.childProps;
    let date = this.props.childProps.date
    date = date.slice(0,10).split("-");
    date = `${date[1]}/${date[2]}/${date[0]}`

    let content = decodeURI(decodeContent(this.props.childProps.content));

    //SETS THE VOTE STATE BASED ON IF THERE IS AN VOTE IN FOR THE CURRENT ENTRY IN THE DB
    let vote = '';
    if(+this.props.childProps.vote_upvote >= 1){vote=true}
    if(+this.props.childProps.vote_downvote >= 1){vote=false}

    this.setState({auto_id:auto_id,title:title,content:content,total_points:total_points,answers:answers,entry_id:entry_id,username:name,date:date,user_id:+master_contributor,vote:vote})
  }

  componentWillReceiveProps(props) {
    const { title,total_points, answers,entry_id,name,master_contributor} = props.childProps;
    let content = decodeURI(decodeContent(this.props.childProps.content));
    let date = this.props.childProps.date
    date = date.slice(0,10).split("-");
    //SETS THE VOTE STATE BASED ON IF THERE IS AN VOTE IN FOR THE CURRENT ENTRY IN THE DB
    let vote = '';
    if(+this.props.childProps.vote_upvote >= 1){vote=true}
    if(+this.props.childProps.vote_downvote >= 1){vote=false}

    this.setState({title:title,content:content,total_points:total_points,answers:answers,entry_id:entry_id,username:name,date:date,user_id:+master_contributor,vote:vote})
  }

  //CREATES THE ENTRY ONCE THE STATE IS SET 
  hasEntry() {
    let html = '';
    if (this.state.entry_id) {
      html = <div className="entryDesc headerText greenColor">
        <NavLink to={`/entry/${this.state.user_id}`}>This question has an entry<div><img src={approval} /></div></NavLink>
      </div>
    }  
  
    return html;
  }

  //CREATES THE VOTE SYSTEM FOR THE ENTRY
  //IF A USER ISN'T LOGGED IN IT WON'T LET THEM VOTE
  //IF THEY ARE LOGGED IN LETS THEM VOTE AND CHANGES COLOR OF THE ARROW CHOSE
  voteIconChanger(){
    const {logValidator} = this.props;
    let style={backgroundColor:'#ff5722'}
    let style2={backgroundColor:'#536DFE '}
    let voteStyle = {}
    if(this.state.total_points <= 0){
      voteStyle={backgroundColor:'#212121'}
    }

    let html = ''

    //DON'T LET SOMEONE WHO ISN'T LOGGED IN VOTE
    if(!this.props.state.user_id){
      return (<div className="votesBottom">
                <img onClick={(e) => this.props.logValidator({mousePosX:e.clientX,mousePosY:e.clientY + window.pageYOffset})} src={upvote} id="upvote" className="voteIcon" />
                <p style={voteStyle} className="headerText greenColor">
                  <span>{this.state.total_points}</span>
                </p>
                <img onClick={(e) => this.props.logValidator({mousePosX:e.clientX,mousePosY:e.clientY + window.pageYOffset})} id="downvote" className="voteIcon" src={downvote}/>
              </div>)
    }
    else{

        //IF THERE ISN'T A VOTE SETS EVERYTHING TO NORMAL
        html = <div className="votesBottom">
                <img src={upvote} id="upvote" className="voteIcon" onClick={() => this.setState({vote:true,total_points:+this.state.total_points+1},()=>this.addVote("insert",true))} />
                <p style={voteStyle} className="headerText greenColor"><span>{this.state.total_points}</span></p>
                <img id="downvote" onClick={() => this.setState({vote:false,total_points:+this.state.total_points -1},()=>this.addVote("insert",false))} className="voteIcon" src={downvote}/>
              </div>
      if(this.state.vote !== ''){

        if(!this.state.vote){
          //IF THERE IS A DOWNVOTE SET THE DOWNVOTE ARROW TO BLUE
          html = <div className="votesBottom">
                  <img src={upvote}onClick={() => this.setState({vote:true,total_points:+this.state.total_points+2},()=>this.addVote("update",true))} id="upvote" className="voteIcon" />
                  <p style={voteStyle} className="headerText greenColor"><span>{this.state.total_points}</span></p>
                  <img onClick={() => this.setState({vote:'',total_points:+this.state.total_points+1},()=>this.addVote("delete",false))} style={style2} id="downvote" className="voteIcon" src={downvote}/>
                </div>
        }
        else{
          //IF THERE IS AN UPVOTE SET THE UPVOTE ARROW TO ORANGE
          html = <div className="votesBottom">
                  <img onClick={() => this.setState({vote:'',total_points:+this.state.total_points - 1},()=>this.addVote("delete",true))} style={style} src={upvote} id="upvote" className="voteIcon" />
                  <p style={voteStyle} className="headerText greenColor"><span>{this.state.total_points}</span></p>
                  <img onClick={() => this.setState({vote:false,total_points:+this.state.total_points - 2},()=>this.addVote("update",false))}  id="downvote" className="voteIcon" src={downvote}/>
                </div>
        }

      }

    return html;
    }
  }

  addReport(){
    const {auto_id} = this.state;
    const {reason,additional} = this.state.reportContent

    axios.post('/api/addReport',{entry_id:auto_id,report_type:reason,report_comment:additional,user_id:this.props.state.user_id})
      .then(res=> {
        if(res.data === "successful"){
          let reason = this.state.reportContent
          reason.additional = "Thank you for your report. We will be looking into it."
          this.setState({reportContent:reason})
        }
        setTimeout(() =>{
          this.setState({report:false})
        },2000)  
      })
      .catch(err =>console.log(err))
  }

  //ADDS A VOTES TO THE STATE AND THE DB
  addVote(type,voteType){
    let obj = {
      user_id:this.props.state.user_id,
      vote_id:this.props.childProps.auto_id,
      is_entry:true,
      is_upvote:voteType,
      type:type,
      
    }
    
    axios.post('/api/voter',obj).then().catch(err => console.log(err));


  }

  render() {
    let style = {fontFamily:'Fjalla One',textTransform:'uppercase',fontSize:'20px',color:'#212121',padding:'5px',textAlign:'right',paddingRight:'10px'};
    // {this.props.childProps.entry_type === "entry" ? '': ''}
    // {this.props.childProps.entry_type === "question" ? style.backgroundColor='rgb(255, 53, 53)' : ''}
    // {this.props.childProps.entry_type === "snippet" ? style.backgroundColor='#536DFE' : ''}

    let reportStyle 
    return (
      <div className="entryContainer dp1-bs">
        
        <div className="entryHeader headerText accentColor">
          <p>{this.state.title}</p>
          {+this.props.childProps.master_contributor === this.props.state.user_id ?
          <Link to={`/editEntry/${this.props.childProps.auto_id}`}><img className="editIcons"src={edit}/></Link> : ''}
        </div>

        {this.hasEntry()}

        <div className="entryContent bodyText">
          <div id="entryContentP" dangerouslySetInnerHTML={{__html:this.state.content}}></div>
        </div>

        <div className="entryBottom primaryText">
        <img className="reportIcon" src={alert} onClick={()=>this.setState({report:!this.state.report})}/>
        <div className="mainVoteContainer">
          <div className="votesContainer">  
            {this.voteIconChanger()}
              <p id="votesText" className="headerText">Votes</p>
          </div>
            
          <div className="votesContainer">  
            <div className="votesBottom">
              <p id= "answerP" className="headerText redColor">{this.state.answers}</p>
            </div>
            <p className="headerText">comments</p>
          </div>
          </div>
        <div style={style}>{this.props.childProps.entry_type}<div className="authorDiv"><div>by <NavLink className="authorLink" to={`/u/${this.state.user_id}`}>{this.state.username}</NavLink> on {this.state.date}</div></div>
          </div>  
        </div> 
          
          
        {!this.props.childProps.seen && this.props.childProps.master_contributor == this.props.state.user_id ? 
            <div className="privateText headerText">this post is private. use <span>{`${window.location.protocol}//${window.location.host}/entry/${this.props.childProps.auto_id}?ssc=${this.props.childProps.secret}`}</span> to share.</div> : ''}
        {this.state.showValidator ? <LogValidator childProps={this.state} resetState={() => this.resetState()} /> : ''}
          {this.state.report ? <div className="reportDiv reportAni dp3-bs"><div className="redColor headerText">report a post <br />Select a reason</div>
          <br/>
            <select name="reportType" onChange={e=>{ let newReport = {...this.state.reportContent}; 
              newReport.reason = e.target.value; 
              this.setState({reportContent:{...newReport}});
              }}>

              <option value="not enough information">not enough information</option>
              <option value="duplicate">duplicate</option>
              <option value="other">other</option>
            </select>
            <br/>
            <textarea value={this.state.reportContent.additional} onChange={e=>{
              let report = this.state.reportContent;
              report.additional = e.target.value
              this.setState({reportContent:report})}}></textarea>
            <button className="greenColor" onClick={()=>this.addReport()}>submit</button>
          </div> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    state:state,
  }
}

export default connect(mapStateToProps,{logValidator})(Entry)
