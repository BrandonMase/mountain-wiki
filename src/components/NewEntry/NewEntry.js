import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import './NewEntry.css';
import axios from 'axios'
import { checkUserStatus } from './../../utility'
import { connect } from 'react-redux';
import decodeContent from './decodeContent';
class NewEntry extends Component {
  constructor() {
    super();

    this.state = {
      typeOfEntry: null,
      seen: null,
      title:null,
      content: null,
      labels: null,
      updateId: null,
      userId: null,
      date: new Date()
    }

    this.checkSubmission = this.checkSubmission.bind(this)
    this.updateState = this.updateState.bind(this)
    
  }

    //check if the window is in mobile mode
    //set the content editor to checked and hide the preview div
  componentDidMount() { 
    if(this.props.state.user_id){
    if (window.innerWidth <= 992) {
      document.getElementById('c1').checked = true;
      document.getElementById('cec').style.display = "initial";
      document.getElementById('c1').checked = true;
      document.getElementById('conp').style.display = "none";
      document.getElementById('titlePre').style.visibility = "hidden"
    }

    document.getElementById('s1').checked = false;
        document.getElementById('s2').checked = true;

    //ADD IF A USER ISN'T LOGGED IN THEY CAN'T EDIT A THING BC THAT MAKES COMPLETE SENSE
    this.setState({userId:this.props.state.user_id})

    if (this.props.match.params.id) {
      this.setState({updateId:+this.props.match.params.id})
    }
  }
    
  }



  //update the mobile display from content editor to preview mode depending on which mode is selected
  updateDisplay(e) {
    
    if (e.target.value == "preview") {
      document.getElementById('conp').style.display = "initial";
      document.getElementById('c2').checked = true;
      document.getElementById('cec').style.display = "none";
      document.getElementById('titlePre').style.visibility = "visible"
    }
    else {
      document.getElementById('cec').style.display = "initial";
      document.getElementById('c1').checked = true;
      document.getElementById('conp').style.display = "none";
      document.getElementById('titlePre').style.visibility = "hidden"
    }
  }

  //check the submission for missing fields on submit click
  //if all fields are there send it to the db
  checkSubmission() {
    let count = 0;
    if (!this.state.typeOfEntry) {
      document.getElementById('typeContainer').style.border = "solid red 4px"

      count++;
    }
    else {
      document.getElementById('typeContainer').style.border ="solid #536DFE 4px"
    }

    if (this.state.seen === null) {
      document.getElementById('seenContainer').style.border ="solid red 4px"
      count++;
    }
    else {
      document.getElementById('seenContainer').style.border ="solid #536DFE 4px"
    }

    if (!this.state.title) {
      document.getElementById('titleText').style.border = "solid red 2px "
      document.getElementById('titleText').placeholder = "You must have a title.";
      count++;
    }
    else {
      document.getElementById('titleText').style.border = "solid black 1px "
    }
    
    if (!this.state.content) {
      document.getElementById('contentTextBox').style.border = "solid red 2px";
      document.getElementById('contentTextBox').placeholder = "You must have some content.";
      count++;
    }
    else {
      document.getElementById('contentTextBox').style.border = "solid black 1px";
    }
    
    if (!this.state.labels) {
      document.getElementById('labelText').style.border = "solid red 2px";
      document.getElementById('labelText').placeholder = "You must have atleast one label.";
      count++;
    }
    else {
      document.getElementById('labelText').style.border = "solid black 1px";
    }

    if (count === 0) {
      if (this.state.updateId === null) {
        axios.post("/api/addEntry", this.state)
          .then(res => {
            this.props.history.push(`/entry/${res.data[0].auto_id}`)})
          .catch(e => console.log(e))
      }

      
      else {
        axios.put("/api/updateEntry", this.state)
          .then(this.props.history.push(`/entry/${this.state.updateId}`))
          .catch(e => console.log(e))
          
      }
    }
    
    
  }

  updateState(e) {
    const { title, labels, seen, typeOfEntry } = e
    let content = e.encodedContent
    if (this.state.seen !== null) {
      this.setState({ title: title, content: content, labels: labels,typeOfEntry: typeOfEntry,seen:seen })
    }
    else {
      this.setState({ title: title, content: content, labels: labels, seen: seen, typeOfEntry: typeOfEntry});
      if (this.state.seen == true) {
        document.getElementById('s1').checked = false;
        document.getElementById('s2').checked = true;
      }
      if(this.state.seen == false){
        document.getElementById('s1').checked = true;
        document.getElementById('s2').checked =false;
      }
        
    }
      if(typeOfEntry === "entry") {document.getElementById('t1').checked = true;}
      if(typeOfEntry === "question") {  document.getElementById('t2').checked = true;}
      if(typeOfEntry === "snippet") {document.getElementById('t3').checked = true;}
  }

 


  render() {
    let style = {textAlign:'center',marginTop:'10px'}
    return (
      this.props.state.user_id ?
      <div id = 'mainEntryContainer'className="newEntryContainer dp1-bs">
      
        <div className="newEntryHeader accentColor headerText ">
          <div>
            Entry Editor
          </div>

          <div id="typeContainer" className="typeContainer">
            <input type="radio" id="t1" name="type" value="entry" onChange={e=>this.setState({typeOfEntry:e.target.value})}/>
            <label for="t1">Entry</label>
    
            <input type="radio" id="t2" name="type" value="question" onChange={e=>this.setState({typeOfEntry:e.target.value})}/>
            <label for="t2">Question</label>

            <input type="radio" id="t3" name="type" value="snippet" onChange={e=>this.setState({typeOfEntry:e.target.value})}/>
            <label for="t3">Snippet</label>
          </div>

          <div id="seenContainer" className="seenContainer">
            <input type="radio" id="s1" name="seen" value="false" onChange={e => this.setState({ seen: false })}/>
            <label for="s1">Private</label>
    
            <input type="radio" id="s2" name="seen" value="true" onChange={e => this.setState({ seen: true })}/>
            <label for="s2">Public</label>
          </div>
        </div>
        <div className="mobileContentSwitcher headerText">
          <input type="radio" id="c1" name="contentSwitcher" value="content" onChange={e=>this.updateDisplay(e)} />
            <label for="c1">Content Editor</label>
    
          <input type="radio" id="c2" name="contentSwitcher" value="preview" onChange={e=>this.updateDisplay(e)}/>
            <label for="c2">Preview</label>
          </div>
          <CodeEditor updateState={this.updateState} checkSubmission={this.checkSubmission} childProps={this.state.updateId} />
      </div> : 
      <div style={style} className="headerText">You must be logged in to add a post.</div>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    state:state
  }
}

export default connect(mapStateToProps)(NewEntry)