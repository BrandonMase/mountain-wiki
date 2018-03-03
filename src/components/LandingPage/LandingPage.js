import React, { Component } from 'react';
import './LandingPage.css'
import './../../Utility.css'
import QuestionDiv from './QuestionDiv';
import MobileTopHeader from './../Header/MobileTopHeader';
import SignInHero from './SignInHero';
export default class LandingPage extends Component {

  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,
      endNumQuestion: 9,
      endNumEntries: 9,
      endNumSnippets:9,
      loadMoreQuestions: false,
      user: false,
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  createQuestionDiv(type) {
    let html = [];
    let endNum = 0;
    if (type === "q") { endNum = this.state.endNumQuestion; }
    if (type === "e") { endNum = this.state.endNumEntries; }
    if (type === "s") { endNum = this.state.endNumSnippets; }
   
    if (this.state.width <= 992) { endNum -=5 ;}
    for (let i = 0; i < endNum; i++) {
      html.push(<QuestionDiv />);
    }
    // console.log(html);
    return html;
  }

  loadMore(type) {
    let newNum = 0;
    if (type === "q") { newNum = this.state.endNumQuestion + 10 }
    if (type === "e") { newNum = this.state.endNumEntries + 10 }
    if (type === "s") { newNum = this.state.endNumSnippets + 10 }
    if (type === "q") { this.setState({ endNumQuestion: newNum }, e=> this.createQuestionDiv("p"))}
    if (type === "e") { this.setState({ endNumEntries: newNum }, e => this.createQuestionDiv("e"))}
    if (type === "s") { this.setState({ endNumSnippets: newNum }, e => this.createQuestionDiv("s"))}
    
  }

  loadHeroSignUp() {
    let html = '';
    if (!this.state.user) {
      html = <SignInHero />
    }
    else {
      html =''
    }

    return html;
  }
  render() {
    return (
      <div className="landingPageContainer">
        <MobileTopHeader />
        {this.loadHeroSignUp()}
        <div className="fullQuestionContainer">

          <div className="questionContainer">
            <div id="topQuestions" className="dp2-bs headerDiv"><div><span className="headerText">top questions</span></div><p className="secondaryText">Top questions voted by the community.</p> <div><button>ask a question</button></div></div>
            {this.createQuestionDiv("q")}
            <div className="buttonContainer"><button onClick={e => this.loadMore("q")} className="greenColor">See More QUestions</button></div>
            <br />
            <div id="newEntries" className="dp2-bs headerDiv"><div><span className="headerText">Newest Entries</span></div><p className="secondaryText">Newest entries made by the community.</p> <div><button>Add An entry</button></div></div>
            {this.createQuestionDiv("e")}
            <div className="buttonContainer"><button onClick={e => this.loadMore("q")} className="greenColor">See More entries</button></div>

            <div id="newSnippets" className="dp2-bs headerDiv"><div><span className="headerText">Newest Snippets</span></div><p className="secondaryText">Top snippets voted by the community.</p> <div><button>Add a snippet</button></div></div>
            {this.createQuestionDiv("s")}
            <div className="buttonContainer"><button onClick={e => this.loadMore("q")} className="greenColor">See More snippets</button></div>



          </div>
        </div>
      </div>  
    );
  }
}

