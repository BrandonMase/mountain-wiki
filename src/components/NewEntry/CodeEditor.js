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
    this.updateLabels = this.updateLabels.bind(this);
  }

  componentDidMount() {
 
  }

  updateTitle() {
    return { __html: this.state.title };
  
  }

  updateContent() {
    return { __html: marked(this.state.content) };
  }

  updateLabels() {
    let html = [];
    if (this.state.labels) {
      let labelArr = this.state.labels.split(",");
      labelArr.map(e => {
      html.push(<div className="questionLabel">{e}</div>);
      })
    }

    return html;
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
            <textarea className="bodyText ceContentTextArea" spellCheck="false" onChange={e=>this.setState({content:e.target.value})}></textarea>
          </div>
          <div className="ceContent">
            <label className="headerText">Label</label>
            <br />
            <textarea className="bodyText labelTextArea" onChange={e=>this.setState({labels:e.target.value})}></textarea>
            {this.updateLabels()}
          </div>
        </div>
        <div id="conp" className="contentPreview">
          <div id="titlePre" className="titlePreview accentColor newEntryHeader headerText" dangerouslySetInnerHTML={this.updateTitle()}/>
          <div className="contentPreview bodyText" dangerouslySetInnerHTML={this.updateContent()}>
          </div>
        </div>
      </div>  
    );
  }
}