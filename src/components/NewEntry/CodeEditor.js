import React, { Component } from 'react';
import marked from 'marked';

export default class CodeEditor extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      labels:'',
    }

    this.updateTitle = this.updateTitle.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  updateTitle() {
    return { __html: this.state.title };
  }

  updateContent() {
    return { __html: marked(this.state.content) };
  }

  updateLabels() {
    
  }
  render() {
    return (
      <div className="mainCodeEditorContainer">
        <div for="c1" id="cec" className="codeEditorContainer">
          
          <div className="ceTitle">
            <label className="headerText">Title</label>
            <br/>
            <input className="bodyText" onChange={e=>this.setState({title:e.target.value})}/>
          </div>
          <div className="ceContent">
            <label className="headerText">Content</label>
            <br />
            <textarea className="bodyText ceContentTextArea" onChange={e=>this.setState({content:e.target.value})}></textarea>
          </div>
          <div className="ceContent">
            <label className="headerText">Label</label>
            <br />
            <textarea className="bodyText labelTextArea"></textarea>
          </div>
        </div>
        <div id="conp" className="contentPreview">
          <div className="titlePreview accentColor newEntryHeader headerText" dangerouslySetInnerHTML={this.updateTitle()}/>
          <div className="contentPreview bodyText" dangerouslySetInnerHTML={this.updateContent()}>
          </div>
        </div>
      </div>  
    );
  }
}