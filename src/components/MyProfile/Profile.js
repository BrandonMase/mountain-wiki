import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css'
import Post from './Post';
import Comment from './Comment'
import {connect} from 'react-redux'
import magnify from './../../assets/magnify.png';

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      postSelector:"posts",
      content:null,
      searchTerm:null,
    };

    this.getContent = this.getContent.bind(this);
    this.postSelector = this.postSelector.bind(this)
  }
  
  componentDidMount(){
    let id = this.props.state.user_id

    //GET THE BASIC USER INFORMATION
    axios.get(`/api/getUserInfo/${id}/true`)
      .then(res => {
        const {name,total_points,picture,sign_up_date,node_mailer_setting} = res.data[0];
        
        this.setState({name:name,points:total_points,picture:picture,sign_up_date:sign_up_date,node_mailer:node_mailer_setting})
      })
      .catch(err => console.log(err))
    
    //GET ALL THE POSTS AND COMMENTS THE USER HAS MADE THAT ISN'T PRIVATE
    axios.get(`/api/getUserActivity/${id}/true`)
      .then(res=> this.setState({content:res.data}))
      .catch(err => console.log(err))
  }

  //SORTS AND DISPLAYS ALL OF THE USER'S CONTENT
  //DISPLAYS BASED ON THE POSTSELECTOR STATE

  /****************************************************
   * GOTTA FIX THE SORT. IT SORTS THE COMMENTS BELOW
   * THE POSTS EVEN IF IT WAS MADE AFTER
   * ¯\_(ツ)_/¯
   ***************************************************/
  getContent(){
    let html = [];
    if(this.state.content){
      let content = [];

      //figure out which postSelector is selected so we can filter the content
      if(this.state.postSelector === "overview"){content = this.state.content};

      if(this.state.postSelector === "posts"){
        content = this.state.content.filter(e=>{if(typeof e.is_deleted !== 'undefined') return true})
      };

      if(this.state.postSelector === "comments"){
        content = this.state.content.filter(e=>{if(typeof e.is_deleted === 'undefined') return true})
      };

      //SORT EVERYTHING BY DATE
      content = content.sort(function(a,b){

        let c = new Date(a.date).getTime();
        let d = new Date(b.date).getTime();
        return d-c
      });

      //MAP AND PUSH BASED ON WHICH TYPE OF CONTENT IT IS
      content.map(e =>{
        if(e.labels){
          if(this.state.searchTerm){
            if(!e.title.includes(this.state.searchTerm) || !e.content.includes(this.state.searchTerm)){
              return
            }
          }
          console.log("CONTENTNTNTNT",e.content)
          html.push(<Post childProps={e} />);
        }
        else{
          if(this.state.searchTerm){
            if(!e.content.includes(this.state.searchTerm)){
              return
            }
          }
          console.log("CONTENTNTNTNT",e.content)
          html.push(<Comment childProps={e}/>)
        }
      })
      }
      else{
        html.push(<p className="accentColor headerText dp1-bs">Nothing here</p>)
      }

    //IF THERE ISN'T ANY OF A CERTAIN CONTENT TYPE, DISPLAY NOTHING HERE
    if(!html[0]){html = <p className="accentColor headerText dp1-bs">Nothing here</p>}

    return html
  }

  //MAKE THE BACKGROUND COLOR OF THE SELECT POST SELECTOR LIGHT PRIMARY COLOR
  postSelector(){
    let styles = {textDecoration:'underline'}
    let style2 = {backgroundColor:'#FFCCBC'}
    let html = [];

  this.state.postSelector === "overview" ? 
    html.push(<li className="headerText" style={style2}><a style={styles} onClick={e=>this.setState({postSelector:"overview"})} href="#">overview</a></li>) 
    : html.push(<li className="headerText"><a  onClick={e=>this.setState({postSelector:"overview"})} href="#">overview</a></li>)

  this.state.postSelector === "posts" ? 
    html.push(<li className="headerText" style={style2}><a style={styles} onClick={e=>this.setState({postSelector:"posts"})} href="#">posts</a></li>) 
    : html.push(<li className="headerText"><a  onClick={e=>this.setState({postSelector:"posts"})} href="#">posts</a></li>)

  this.state.postSelector === "comments" ? 
    html.push(<li className="headerText" style={style2}><a style={styles} onClick={e=>this.setState({postSelector:"comments"})} href="#">comments</a></li>) 
    : html.push(<li className="headerText"><a  onClick={e=>this.setState({postSelector:"comments"})} href="#">comments</a></li>)

  return html;
  }

  nodeMailer(){
    let mailer = !this.state.node_mailer
    axios.post(`/api/updateNodeMailer/${this.props.state.user_id}/${mailer}`)
      .then()
      .catch(err => console.log(err));
      this.setState({node_mailer:mailer})
  }

  render() {
    return (
      <div className="profileContainer">
        <div className="leftContainer">
          <div>
            <ul className="postSelector dp1-bs">
            <li className="searchBar bodyText"><input className="searchBarInput" placeholder="Search" onChange={e => this.setState({searchTerm:e.target.value})}/><div className="searchIcons"><img src={magnify}/></div></li>
              
              {this.postSelector()}
              {/* <li className="searchBar bodyText"><input className="searchBarInput" placeholder="Search"/><div className="searchIcon"><img src={magnify}/></div></li> */}
            </ul>
          </div>
        {this.getContent()}
          </div>
          <div className="rightContainer dp1-bs">
            <div className="accentColor headerText">
              <span>{this.state.name}</span><img src={this.state.picture}/>
            </div>
            <ul className="bodyText">
              <li>points <strong>{this.state.points}</strong></li>
              <li>member since {this.state.sign_up_date}</li>
            </ul>
            <div className="settingsDiv">
              {this.state.node_mailer === true ?
              <input type="checkbox" onChange={()=>this.nodeMailer()} checked="checked"/>
              : <input type="checkbox" onChange={()=>this.nodeMailer()}/>}
              
              <label className="bodyText">Yes, send me weekly best ofs</label> 
            </div>
          </div>
        
      </div>

    );
  }
}

const mapStateToProps = (state) =>{
  return {
    state:state
  }
}
export default connect(mapStateToProps)(Profile)