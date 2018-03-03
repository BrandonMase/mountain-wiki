import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import './NewEntry.css';
export default class NewEntry extends Component {
  constructor() {
    super();
    
  }

  componentDidMount() {
    document.getElementById('c1').checked = true;
  }

  updateDisplay(e) {
    console.log(e.target.value)
    if (e.target.value == "preview") {
      document.getElementById('conp').style.display = "initial";
      document.getElementById('c2').checked = true;
      document.getElementById('cec').style.display = "none";
    }
    else {
      document.getElementById('cec').style.display = "initial";
      document.getElementById('c1').checked = true;
      document.getElementById('conp').style.display = "none";
    }
  }


  render() {
    return (
      <div className="newEntryContainer dp1-bs">
        <div className="newEntryHeader accentColor headerText ">
          <div>
            Entry Editor
          </div>

          <div className="typeContainer">
            <input type="radio" id="t1" name="type" value="entry"/>
            <label for="t1">Entry</label>
    
            <input type="radio" id="t2" name="type" value="question"/>
            <label for="t2">Question</label>

            <input type="radio" id="t3" name="type" value="snippet"/>
            <label for="t3">Snippet</label>
          </div>

          <div className="seenContainer">
            <input type="radio" id="s1" name="seen" value="private"/>
            <label for="s1">Private</label>
    
            <input type="radio" id="s2" name="seen" value="public"/>
            <label for="s2">Public</label>
          </div>
        </div>
        <div className="mobileContentSwitcher headerText">
          <input type="radio" id="c1" name="contentSwitcher" value="content" onChange={e=>this.updateDisplay(e)}/>
            <label for="c1">Content Editor</label>
    
          <input type="radio" id="c2" name="contentSwitcher" value="preview" onChange={e=>this.updateDisplay(e)}/>
            <label for="c2">Preview</label>
          </div>
        <CodeEditor />
      </div>
    );
  }
}