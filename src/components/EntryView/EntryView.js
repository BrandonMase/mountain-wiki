import React, { Component } from 'react';
import './Comments.css';
import './EntryView.css';
import LogValidator from './../LogValidator/LogValidator'
import marked from 'marked';
import Entry from './Entry';
import Answer from './Answer';
import Reply from './Reply';
import axios from 'axios';
import { connect } from 'react-redux';
import {logValidator} from './../../ducks/reducer';
class EntryView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      entry: '',
      comments: [],
      newAnswer: null,
      user_id: 0,
      entry_id: null,
      newDate: new Date(),
      loading:false,
      showValidator:false,
    }

    this.getEntry = this.getEntry.bind(this);
    this.addAnswer = this.addAnswer.bind(this)
    this.addAnswerHTML = this.addAnswerHTML.bind(this)
    this.runInitialAxiosCall = this.runInitialAxiosCall.bind(this);
    this.showContainer = this.showContainer.bind(this);
      
  }

  //GET THE ENTRY_ID AND THE USER_ID IF THE A USER IS LOGGED IN
  //SET STATE THEN RUN THE INITIAL AXIOS CALL

  /************************************************************
   *          CHANGE IT SO IF SOMEONE ISN'T LOGGED IN 
   *          IT RUNS A DIFFERENT AXIOS CALL BASED ON
   *          THAT. MAYBE JUST ADD A COLUMN FOR
   *          IS_UPVOTE AND IS_DOWNVOTE AND MAKE THEM 0
   *          YOU MESSED UP BIG TIME ON THAT SQL CALL
   ************************************************************/

  componentDidMount(props) {
    const { id } = this.props.match.params
    
    if(this.props.state.user_id){
      this.setState({user_id:this.props.state.user_id,entry_id:id},() =>this.runInitialAxiosCall())
    }
    else{
      this.setState({user_id:0,entry_id:id},() => this.runInitialAxiosCall())
    }

  }

  
  //THE INITIAL AXIOS CALL AFTER SETSTATE HAPPENS
  //GRAB THE ENTRY AND ALL THE COMMENT ASSOSIATED WITH IT
  //AND GRABS ANY VOTES THE USER DID FOR THAT ENTRY + COMMENTS
  runInitialAxiosCall(){
    axios.get(`/api/getEntry/${this.state.entry_id}/${this.state.user_id}`)
      .then(res => this.setState({ entry: res.data.entry[0], comments: res.data.comments,loaded:true },()=> console.log("KSALKJASD",this.state)))
      .catch(e => console.log(e));
  }

  //GETS THE ENTRY ONCE THE THE ENTRY IS SET IN STATE
  getEntry() {
    if (this.state.entry) {
      console.log("ENTRY",this.state.entry)
      return <Entry childProps={this.state.entry} />
    }
  }

  //CHECKS TO SEE IF THERE IS ANY COMMENTS
  //SORTS THE COMMENTS
  //GETS THE PARENTS COMMENTS AND PUSHES THE REPLIES TO THAT PARENT
  hasAnswers() {
    let html = [];
    if (this.state.comments !== []) {
      let comments = this.state.comments;

      //SORT COMMENTS BASED ON TOTAL_POINTS 
      comments = comments.sort((a, b) => b.total_points - a.total_points);

      //GETS ALL THE PARENT COMMENTS
      let parentComments = comments.filter(e => {
        if(!e.ref_answer_id){return e}
      })

      //PUSHES ALL THE REPLIES TO EACH PARENT
      parentComments.map(e=>e.replies = [])
      parentComments.map(e => {
        comments.map(c => {
          if (c.ref_answer_id == e.auto_id) {
            if (e["replies"]) {
              e["replies"].push(c)
            }
            else {
              e["replies"] = []
              e["replies"].push(c)
            }
          }
        })
      })

      console.log("ENTRY STATE",this.state)
      //CREATES THE PARENTS ANSWERS
      parentComments.map(e => {
     
        html.push(
          <div className="fullcommentsContainer">
            <div id="bg1" className="fullCommentChainContainer dp1-bs">
              <Answer childProps={e} />
            </div>
          </div>
        )
      })
    }

    return html;
  }

  //ADDS A NEW ANSWER TO THE STACK IF A USER SUBMITS ONE
  addAnswer() {

    //PUSHS THE NEW ANSWER TO STATE
    let comments = this.state.comments;
    console.log(this.state.newDate)
    let newAnswer = {content:this.state.newAnswer,name:this.props.state.username,user_id:this.props.state.user_id,date:this.state.newDate,picture:"http://lorempixel.com/400/200/",user_total_points:0,auto_id:this.props.state.user_id,total_points:1,vote_upvote:1,vote_downvote:0}
    
    newAnswer.date = JSON.stringify(newAnswer.date).replace('"',"")
    comments.push(newAnswer)

    let newEntry = { ...this.state.entry }
    newEntry["answers"] = +newEntry.answers+1
    this.setState({ comments: comments,entry:newEntry},()=>this.addAnswerHTML())

    //AXIOS CALL TO ACTUALLY ADD IT TO THE DATABASE
    let obj = this.state
    axios.post('/api/addAnswer/',obj)
  }


  //ADDS THE ANSWER TEXTBOX BASED ON IF THE USER HAS ALREADY MADE A TOP LEVEL ANSWER
  //IF THEY ALREADY HAVE IT DOESN'T LET YOU MAKE ANOTHER TOP LEVEL COMMENT
  addAnswerHTML() {
    const {logValidator} = this.props;
    let html = '';

    if(this.state.loaded){
        if(this.props.state.user_id){
      html =
        <div id ="canAddAnswer"className="newAnswer dp1-bs">
          <div className="accentColor">
            Know the answer? Share with others!
          </div>
          <textarea className="bodyText" onChange={e => this.setState({newAnswer:e.target.value})} ></textarea>
          <div><button className="greenColor" onClick={this.state.user_id !== 0 ? this.addAnswer : (e) => {
    
            logValidator({mousePosX:e.clientX,mousePosY:e.clientY+window.pageYOffset})}
            }>Add answer</button></div>
        </div>
        }
        else{
          html = <div className="accentColor headerText dp1-bs">
            You must be logged in to comment.
          </div>
        }
      
      let comments = this.state.comments;

      //Finds if a person has already answered on a top level comment and won't let them top level answer again.
      let alreadyAnswered = false;
      alreadyAnswered = comments.map(e => {
        if(+e.user_id == this.props.state.user_id){return true}
      })

      if (~alreadyAnswered.indexOf(true)) {
        html =
          <div id="cannotAddAnswer" className="newAnswer dp1-bs">
            <div className="accentColor">
              You already answered in this entry. Please edit your answer or add a comment if you have more to say.
          </div>
          </div>
      }
  }

    return html;
  }

  showContainer(){
    let html =[];
    if(this.state.entry){
      let search = this.props.location.search;
      let ssc = [];
      if(search.indexOf("?scc=")){
        search = search.split("=");
        search = search[1];
      }

      if(this.state.entry.seen || +this.state.entry.master_contributor === this.props.state.user_id || search === this.state.entry.secret){
        html.push(this.getEntry());
        html.push(this.hasAnswers());
        html.push(this.addAnswerHTML());
      }
      else{
          html.push( <div className="privateContainer">
            <div className="accentColor headerText dp1-bs">{`Sorry this is private`}</div>
          </div>)
      }
    
    }


    return html;
  }
  render() {
    return (
      <div className="fullEntryContainer">
        {this.showContainer()}
      </div>  
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  }
}

export default connect(mapStateToProps,{logValidator})(EntryView)