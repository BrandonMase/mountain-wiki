import React, { Component } from 'react';
import './Header.css';
import logo from './../../images/MW.png'

export default class Header extends Component {
  constructor() {
    super()

    this.state = {
      searchJumpBar: false,
      searchQuery: null,
      req: { session: {user2:"hi"} },
      linkLocation:null,
    }

    console.log("LOCALTION",window.location)

    

    
    this.toggleSearchBar = this.toggleSearchBar.bind(this)
  }

  componentDidMount() {
  }

  toggleSearchBar(e) {
    e.preventDefault();
    let jumpBar = !this.state.searchJumpBar;
    this.setState({searchJumpBar:jumpBar})
    
  }  

  searchBar() {
    let html = "";
    if (this.state.searchJumpBar) {
      html = <div className="searchJumpBar primaryColor"><input className="dp1-bs" value={this.state.searchQuery} onChange={e => this.setState({searchQuery:e.target.value})} className="bodyText" placeholder="Search"/></div>
    }

    return html;
  }

  displayProfileMobile() {
    
    let html = <div className="account"><a href="#"><img src="/../../images/account.png" /></a></div>
    if (!this.state.req.session.user) {
      html = <div className="signUpAccount accentColor"><a href="#">SIGN UP / LOGIN</a></div>
    }

    return html;
  }

  displayProfile() {
   
    let html = [[<li className="whiteText"><a href="#">login</a></li>],[ <li><button>Sign up</button></li>]]
    if (this.state.req.session.user) {
      html = <li><button>Brandon</button></li>
    }
    return html;
  }

  displayMobileTopHeader() {
  
  }
  render() {
    return (
      <div className="headerContainer3">
      <div className="headerContainer">
        {this.searchBar()}

        <header className="primaryColor">
          
        <div className="logo"><img src="/../../images/MW.png" /></div>
          <div className="siteName">mountainwiki</div> 

          <div className="searchIcon"><a onClick={e => this.toggleSearchBar(e)} href="#"><img src="/../../images/magnify.png" /><span>...Search for a answer</span></a></div>
          <a onClick={e=> this.toggleSearchBar(e)} href="#"><img src="/../../images/magnify.png" /></a>
          {this.displayProfileMobile()}
          <ul className="navLinks">
            <li className="whiteText"><a href="#topQuestions">top questions</a></li>
              <li className="whiteText"><a href="#newEntries">newest entries</a></li>
              <li className="whiteText"><a href="#newSnippets">top snippets</a></li>  
            {this.displayProfile()}
            {/* <li className="whiteText"><a href="#">login</a></li>
            <li><button>Sign up</button></li> */}
          </ul>  
        </header>
        </div>  
      </div>  
    );
  }
}