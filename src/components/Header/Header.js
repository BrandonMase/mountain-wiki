import React, { Component } from 'react';
import './Header.css';
import logo from './../../images/MW.png'
import {connect} from 'react-redux'; 
import {Link} from 'react-router-dom';
import magnify from './../../assets/magnify.png';
import axios from 'axios';
import {updateUser} from './../../ducks/reducer'

class Header extends Component {
  constructor() {
    super()

    this.state = {
      searchJumpBar: false,
      searchQuery: null,
      linkLocation:null,
    }


    

    
    this.toggleSearchBar = this.toggleSearchBar.bind(this)
  }

  componentDidMount() {
   
    axios.get('/api/getUser')
    .then(res=>{
      if(res.data.message){
      this.props.updateUser({username:res.data.user.name,picture:res.data.user.picture,user_id:res.data.user.user_id,total_points:res.data.user.total_points})
      }
    })
    .catch(err => console.log(err))
  }

  toggleSearchBar(e) {
    e.preventDefault();
    let jumpBar = !this.state.searchJumpBar;
    this.setState({searchJumpBar:jumpBar})
    
  }
  
  login(){
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    const link = `http://${process.env.REACT_APP_AUTH0_DOMAIN}/login?client=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}`;
    window.location = link;
  }

  searchBar() {
    let html = "";
    if (this.state.searchJumpBar) {
      html = <div className="searchJumpBar primaryColor"><input className="inputBox dp1-bs" value={this.state.searchQuery} onChange={e => this.setState({searchQuery:e.target.value})} className="bodyText" placeholder="Search"/><Link to={`/s?q=${this.state.searchQuery}`}><div className="accentColor searchLink"><img src={magnify} /></div></Link></div>
    }

    return html;
  }

  displayProfileMobile() {
    
    let html = <div className="account"><Link to="/myProfile"><img src="/../../images/account.png" /></Link></div>
    if (!this.props.state.user_id) {
      html = <div onClick={() =>this.login()} className="signUpAccount accentColor"><a onClick={()=>this.login()}>SIGN UP / LOGIN</a></div>
    }

    return html;
  }

  displayProfile() {
    let html = <ul className="navLinks">
      <li className="whiteText"><a href={()=>this.login()}>login</a></li>
      <li><button onClick={()=>this.login()}>Sign up</button></li>
      </ul>
    // let html = [[<ul className="navLinks">],[<li className="whiteText"><a href="#">login</a></li>],[ <li><button onClick={()=>this.login()}>Sign up</button></li>],[</ul>]]
    if (this.props.state.user_id) {
      html = <ul className="navLinks"><li className="whiteText"><Link to="/editEntry"><button className="greenColor dp1-bs">add New post</button></Link></li>
          <li><Link to={`/myProfile`}><button>{this.props.state.username}</button></Link></li>
          </ul>
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
        
        <Link to="/"><div className="logo"><img src="/../../images/MW.png" /></div></Link>
        <Link className="noMargin" to="/"><div className="siteName">mountainwiki</div> </Link>

          <div className="searchIcon"><a onClick={e => this.toggleSearchBar(e)} href="#"><img src="/../../images/magnify.png" /><span>...Search for a answer</span></a></div>
          <a onClick={e=> this.toggleSearchBar(e)} href="#"><img src="/../../images/magnify.png" /></a>
          {this.displayProfileMobile()}
          
            {this.displayProfile()}
            {/* <li className="whiteText"><a href="#">login</a></li>
            <li><button>Sign up</button></li> */}
        </header>
        </div>  
      </div>  
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    state:state,
  }
}

export default connect(mapStateToProps,{updateUser})(Header)