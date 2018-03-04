import React, { Component } from 'react';
import marked from 'marked';
import './../../Utility.css'

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
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
 
  }

  updateTitle() {
    return { __html: this.state.title };
  
  }

  handleContentChange(e) {
    // console.log("before", e);
    e = encodeURI(e)
    e = e.replace(/%3C/gi, "&lt;")
    e = e.replace(/%3E/gi, "&gt;")
    e = e.replace(/%0A/gi, "<br />")
    e = e.replace(/%20/gi, " ")
    e = e.replace(/%7B/gi, "{")
    e = e.replace(/%20/gi, "}")
    e = decodeURI(e);

    e = e.replace(/(::goodCode::)/gi, "<div class='goodCode'>")
    e = e.replace(/(&gt;&lt;div class=\'goodCode\'&gt;)/gi, "<div class='goodCode'>");
    
    e = e.replace(/(::badCode::)/gi, "<div class='badCode'>")
    e = e.replace(/(&gt;&lt;div class=\'badCode\'&gt;)/gi, "<div class='badCode'>");
    
    e = e.replace(/(::code::)/gi, "<div class='code'>")
    e = e.replace(/(&gt;&lt;div class=\'code\'&gt;)/gi, "<div class='code'>");
    


    e = e.replace(/(&lt;br \/&gt;&lt;\/div&gt;)/gi, "<br /></div>")
    e = e.replace(/(::end::)/gi,"<br /></div>")


    console.log(e)
    this.setState({ content: e })
  }

  updateContent() {
    let content = this.state.content
    return { __html: marked(content) };
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
            <input id="titleText" className="bodyText" onChange={e=>this.setState({title:e.target.value})}/>
          </div>
          <div className="ceContent">
            <label className="headerText">Content</label>
            <br />
            <textarea id="contentTextBox" className="bodyText ceContentTextArea" spellCheck="false" onChange={e=>this.handleContentChange(e.target.value)}></textarea>
          </div>
          <div className="ceContent">
            <label className="headerText">Label</label>
            <br />
            <textarea id="labelText" className="bodyText labelTextArea" onChange={e=>this.setState({labels:e.target.value})}></textarea>
            {this.updateLabels()}
          </div>
        </div>
        <div id="conp" className="contentPreview">
          <div id="titlePre" className="titlePreview accentColor newEntryHeader headerText" dangerouslySetInnerHTML={this.updateTitle()}/>
          <div className="contentPreview bodyText" dangerouslySetInnerHTML={this.updateContent()} disabled="true">
          </div>
        </div>
      </div>  
    );
  }
}