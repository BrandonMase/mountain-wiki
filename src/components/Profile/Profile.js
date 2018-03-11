import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css'
import Post from './Post';
import Comment from './Comment'

export default class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      postSelector:"overview"
    };

    this.getContent = this.getContent.bind(this);
    this.postSelector = this.postSelector.bind(this)
  }
  
  componentDidMount(){
    const {id} = this.props.match.params

    //GET THE BASIC USER INFORMATION
    axios.get(`/api/getUserInfo/${id}`)
      .then(res => {
        const {name,total_points,picture} = res.data[0];
        this.setState({name:name,points:total_points,picture:picture})
      })
      .catch(err => console.log(err))
    
    //GET ALL THE POSTS AND COMMENTS THE USER HAS MADE THAT ISN'T PRIVATE
    axios.get(`/api/getUserActivity/${id}`)
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
        let c = a.date.split("/");
        let d = b.date.split("/");
        let date = new Date(d[0],d[1],d[2])-new Date(c[0],c[1],c[2]);

        if(date === 0){
          return b.auto_id-a.auto_id;
        }
        else{
          return date;
        }
        return b.date-a.date
      });

      //MAP AND PUSH BASED ON WHICH TYPE OF CONTENT IT IS
      content.map(e =>{
        if(e.labels){
         
          html.push(<Post childProps={e} />);
        }
        else{
          console.log("COMMENTS",e)
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
          <div className="rightContainer dp1-bs">
            <div className="accentColor headerText">
              <span>{this.state.name}</span><img src={this.state.picture}/>
            </div>
            <ul className="bodyText">
              <li>points <strong>{this.state.points}</strong></li>
              <li>member since 2018/07/30</li>
            </ul>
          </div>
        
      </div>

    );
  }
}