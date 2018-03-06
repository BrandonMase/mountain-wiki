import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import './NewEntry.css';
export default class NewEntry extends Component {
  constructor() {
    super();

    this.state = {
      typeOfEntry: null,
      seen: null,
      title:null,
      content: null,
      labels:[],
    }
    
  }

    //check if the window is in mobile mode
    //set the content editor to checked and hide the preview div
  componentDidMount() {
    if (window.innerWidth <= 992) {
      document.getElementById('c1').checked = true;
      document.getElementById('cec').style.display = "initial";
      document.getElementById('c1').checked = true;
      document.getElementById('conp').style.display = "none";
      document.getElementById('titlePre').style.visibility = "hidden"
    }
    
  }

  //update the mobile display from content editor to preview mode depending on which mode is selected
  updateDisplay(e) {
    
    console.log(e.target.value)
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

    if (!this.state.seen) {
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
    
    if (this.state.labels !== []) {
      document.getElementById('labelText').style.border = "solid red 2px";
      document.getElementById('labelText').placeholder = "You must have atleast one label.";
      count++;
    }
    else {
      document.getElementById('labelText').style.border = "solid black 1px";
    }

    if(count === 0){
      alert("yay")
    }
    
    
  }


  render() {
    return (
      <div className="newEntryContainer dp1-bs">
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
            <input type="radio" id="s1" name="seen" value="private" onChange={e=>this.setState({seen:e.target.value})}/>
            <label for="s1">Private</label>
    
            <input type="radio" id="s2" name="seen" value="public" onChange={e=>this.setState({seen:e.target.value})}/>
            <label for="s2">Public</label>
          </div>
        </div>
        <div className="mobileContentSwitcher headerText">
          <input type="radio" id="c1" name="contentSwitcher" value="content" onChange={e=>this.updateDisplay(e)} />
            <label for="c1">Content Editor</label>
    
          <input type="radio" id="c2" name="contentSwitcher" value="preview" onChange={e=>this.updateDisplay(e)}/>
            <label for="c2">Preview</label>
          </div>
        <CodeEditor />
        <button className="greenColor" onClick={e=>this.checkSubmission()}>Submit</button>
      </div>
    );
  }
}