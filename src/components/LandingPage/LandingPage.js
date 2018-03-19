import React, { Component } from 'react';
import './LandingPage.css'
import './../../Utility.css'
import QuestionDiv from './QuestionDiv';
import MobileTopHeader from './../Header/MobileTopHeader';
import SignInHero from './SignInHero';
import axios from 'axios';
import {Link} from 'react-router-dom'
export default class LandingPage extends Component {

  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,
      endNumQuestion: 9,
      endNumEntries: 9,
      endNumSnippets: 9,
      entries:[],
      loadMoreQuestions: false,
      user: false,
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    axios.get('/api/getLandingEntries/').then(res => {
      this.setState({entries:res.data})
    })
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
    let entries = this.state.entries;
    let count = 0;
    let type2 = '';
    if (this.state.entries) {
      if (type === "q") { endNum = this.state.endNumQuestion; type2 = "question" }
      if (type === "e") { endNum = this.state.endNumEntries; type2 = "entry" }
      if (type === "s") { endNum = this.state.endNumSnippets; type2 = "snippet" }
      
      if (this.state.width <= 992) { endNum -= 5; }
      entries.map(e => {
        if (count >= endNum) { return }
        if (e["entry_type"] === type2) {
          html.push(<QuestionDiv childProps={e} />)
          count++;
        }
        else { }
      })
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
        {/* {this.loadHeroSignUp()} */}
        <div className="fullQuestionContainer">

          <div className="questionContainer">
            <div id="topQuestions" className="dp2-bs headerDiv"><div><span className="headerText">top questions</span></div><p className="secondaryText">Top questions voted by the community.</p> <div><Link to={`/editEntry`}><button>ask a question</button></Link></div></div>
            {this.createQuestionDiv("q")}
            <div className="buttonContainer"><button onClick={e => this.loadMore("q")} className="greenColor">See More QUestions</button></div>
            <br />
            <div id="newEntries" className="dp2-bs headerDiv"><div><span className="headerText">Newest Entries</span></div><p className="secondaryText">Newest entries made by the community.</p> <div><Link to={`/editEntry`}><button>ask a question</button></Link></div></div>
            {this.createQuestionDiv("e")}
            <div className="buttonContainer"><button onClick={e => this.loadMore("e")} className="greenColor">See More entries</button></div>

            <div id="newSnippets" className="dp2-bs headerDiv"><div><span className="headerText">Newest Snippets</span></div><p className="secondaryText">Top snippets voted by the community.</p> <div><Link to={`/editEntry`}><button>ask a question</button></Link></div></div>
            {this.createQuestionDiv("s")}
            <div className="buttonContainer"><button onClick={e => this.loadMore("s")} className="greenColor">See More snippets</button></div>



          </div>
        </div>
      </div>  
    );
  }
}

