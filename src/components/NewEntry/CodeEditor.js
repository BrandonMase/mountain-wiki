import React, { Component } from 'react';
import marked from 'marked';
import './../../Utility.css'
import axios from 'axios'
import decodeContent from './decodeContent';

export default class CodeEditor extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      labels: '',
      ran:false,
      encodedContent:'',
    }

    this.updateTitle = this.updateTitle.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateLabels = this.updateLabels.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);

  }

  componentDidMount() { 
    if (this.props.childProps !== null && !this.state.ran) {
      axios.get(`/api/getEntryUpdater/${this.props.childProps}`)
        .then(res => {
          const { title, entry_type,seen,labels } = res.data[0]
          let content = decodeURI(res.data[0].content)
          let encodedContent = res.data[0].content;
          this.setState({ title: title, typeOfEntry: entry_type, title: title, content: content, seen: seen,labels:labels,ran:true,encodedContent:encodedContent },()=>this.props.updateState(this.state));
        })
    } 
  }
  componentWillReceiveProps(props) {
    if (props.childProps !== null && !this.state.ran) {
      axios.get(`/api/getEntryUpdater/${props.childProps}`)
        .then(res => {
          const { title, entry_type,seen,labels } = res.data[0]
          let content = decodeURI(res.data[0].content)
          let encodedContent = res.data[0].content;
          this.setState({ title: title, typeOfEntry: entry_type, title: title, content: content, seen: seen,labels:labels,ran:true,encodedContent:encodedContent },()=>this.props.updateState(this.state));
        })
    } 
  }

  componentDidUpdate(){
    var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
}
  }



  updateTitle() {
    return { __html: this.state.title };
  
  }

  handleContentChange(e) {
    this.setState({content:e,encodedContent:encodeURI(e)},()=>this.props.updateState(this.state))

  }

  updateContent() {
    let content = decodeURI(decodeContent(this.state.encodedContent));
    return { __html: content };
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

  checkSubmission() {
    let newState = {...this.state};
    this.props.updateState(this.state)
    this.props.checkSubmission();
  }
  render() {
    return (
      <div>
      <div className="mainCodeEditorContainer">
        <div for="c1" id="cec" className="codeEditorContainer">
          
          <div className="ceTitle">
            <label className="headerText">Title</label>
            <br/>
            <input id="titleText" className="bodyText" value={this.state.title} onChange={e=>this.setState({title:e.target.value},()=>this.props.updateState(this.state))}/>
          </div>
          <div className="ceContent">
            <label className="headerText">Content</label>
            <br />
            <textarea value={this.state.content} id="contentTextBox" className="bodyText ceContentTextArea" spellCheck="false" onChange={e=>this.handleContentChange(e.target.value)}></textarea>
          </div>
          <div className="ceContent">
            <label className="headerText">Label</label>
            <br />
            <textarea value={this.state.labels} id="labelText" className="bodyText labelTextArea" onChange={e=>this.setState({labels:e.target.value},()=>this.props.updateState(this.state))}></textarea>
            {this.updateLabels()}
          </div>
        </div>
        <div id="conp" className="contentPreview">
          <div id="titlePre" className="titlePreview accentColor newEntryHeader headerText" >{this.state.title}</div>
          <div className="contentPreview bodyText" dangerouslySetInnerHTML={this.updateContent()} disabled="true">
          </div>
        </div>
        </div> 
        <button className="greenColor" onClick={e=>this.checkSubmission()}>Submit</button>
      </div>  
    );
  }
}