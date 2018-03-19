import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css'
import Post from './Post';
import Comment from './Comment'
import {Link} from 'react-router-dom'
import mail from './../../assets/email-outline.png';

export default class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      postSelector:"overview"
    };

    this.getContent = this.getContent.bind(this);
    this.postSelector = this.postSelector.bind(this)
    this.getContent = this.getContent.bind(this);
    this.getCount = this.getCount.bind(this);
  }
  
  componentDidMount(){
    const {id} = this.props.match.params
    //GET THE BASIC USER INFORMATION
    axios.get(`/api/getUserInfo/${id}/false`)
      .then(res => {
        const {name,total_points,picture} = res.data[0];
        let date = res.data[0].sign_up_date.slice(0,10).split("-");
        date = `${date[1]}/${date[2]}/${date[0]}`;
        this.setState({name:name,points:total_points,picture:picture,sign_up_date:date})
      })
      .catch(err => console.log(err))
    
    //GET ALL THE POSTS AND COMMENTS THE USER HAS MADE THAT ISN'T PRIVATE
    axios.get(`/api/getUserActivity/${id}/false`)
      .then(res=>this.setState({content:res.data},()=>this.getCount()))
      .catch(err => console.log(err))
  }

  getCount(){
    let postCount = 0;
    let commentCount = 0;
    if(this.state.content){
      this.state.content.map(e =>{
        e.labels ? postCount++ : commentCount++
      })
     this.setState({postCount:postCount,commentCount:commentCount})
    }
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
         
          html.push(<Post childProps={e} />);
        }
        else{
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

  render() {
    return (
      <div className="profileContainer">
        <div className="leftContainer">
          <div>
            <ul className="postSelector dp1-bs">
              {this.postSelector()}
            </ul>
          </div>
        {this.getContent()}
          </div>
          
          <div className="mainRightContainer">
          <div className="rightContainer dp1-bs">
            <div className="accentColor headerText">
              <span>{this.state.name}</span><img src={this.state.picture}/>
              <Link to={`/pm/${this.props.match.params.id}`}><button className="greenColor">Send message</button></Link>
            </div>
            <ul className="bodyText">
              
              <li>points <strong>{this.state.points}</strong></li>
              <li>{`member since ${this.state.sign_up_date}`}</li>
            </ul>
            </div>

            <div className="dp1-bs bottomRightContainer">
              <span className="bodyText">Posts:<strong>{this.state.postCount}</strong></span>
              <br/>
              <span className="bodyText">Comments:<strong>{this.state.commentCount}</strong></span>
            </div>
          </div>
        
      </div>

    );
  }
}