import React, { Component } from 'react';
import axios from 'axios'
import './SearchUser.css'
export default class SearchUser extends Component {
  constructor(props){
    super(props);

    this.state={
      searchedUsers:[1],
      selectedUser:'',
    }
  }
  componentWillReceiveProps(props) {
    this.setState({ searchInput: props.searchInput},()=>this.searchUsers())
  }

  searchUsers(){
    if (this.state.searchInput != '') {
      axios.get(`/api/searchForUser/${this.state.searchInput}`)
        .then(res => this.setState({ searchedUsers: res.data }))
        .catch(err => console.log(err));
    }
  }

  selectUser(e){
    this.setState({selectedUser:e})
    this.props.selectUser(e);
  }

  getSearchResults(){
    let html = [];
    console.log(this.state.searchedUsers[0])
    if(typeof this.state.searchedUsers[0] !== 'undefined'){
      if(this.state.searchInput === ''){}
      else{
      this.state.searchedUsers.map(e=>{
        html.push(<div onClick={()=>this.selectUser(e)} className='userContainer'><img className='userPicture' src={e.picture}/><div className="headerText">{e.name}</div></div> )
      })
    }
  }
  else{
    html =<div className='headerText'>no users found</div>
  }

    return (html);
  }
  render() {
    return (
      this.state.searchInput && this.state.searchedUsers[0] !== 1 && this.state.selectedUser === '' ?
      <div className="mainSearchUserContainer dp3-bs">
        <div className="accentColor headerText">Find User</div>
        {this.getSearchResults()}
        
      </div> : <div></div>
    );
  }
}