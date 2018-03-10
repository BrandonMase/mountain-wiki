import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css'
import Post from './Post';
import Comment from './Comment'

export default class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {};

    this.getContent = this.getContent.bind(this);
  }
  
  componentDidMount(){
  
      const {id} = this.props.match.params
      axios.get(`/api/getUserInfo/${id}`)
        .then(res => {
          const {name,total_points,picture} = res.data[0];
          this.setState({name:name,points:total_points,picture:picture})
        })
        .catch(err => console.log(err))

      axios.get(`/api/getUserActivity/${id}`)
        .then(res=> this.setState({content:res.data},()=> console.log("hi",this.state)))
        .catch(err => console.log(err))
  
  }

  getContent(){
    let html = []
    if(this.state.content){
      let content = this.state.content.sort(function(a,b){b.date-a.date});
      
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
      html.push(<p>Nothing here</p>)
    }

    return html
  }
  render() {
    return (
      <div className="profileContainer">
        <div className="leftContainer dp1-bs">
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