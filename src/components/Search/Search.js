import React, { Component } from 'react';
import { connect } from 'react-redux';
import magnify from './../../assets/magnify.png'
import './Search.css'
import {searchResults} from './SearchResults';
import QuestionDiv from './../LandingPage/QuestionDiv'
import axios from 'axios';
class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: null,
      showDrop:true,
      searchSelector:"votes",
      typeSelector:[true,true,true],
      searchResults:null,
      change:true,
      searchResults2:null,
      wholeResults:null,
    }

    this.searchSelector = this.searchSelector.bind(this);
    this.typeSelector = this.typeSelector.bind(this);
    this.goSearch = this.goSearch.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentDidMount(){
    let search = this.props.location.search
    if(search){
      search = search.substr(1,search.length-1).split("=")
      if(search[0] === "q"){
        axios.get(`/api/goSearch?q=${search[1]}`)
        .then(res => this.setState({searchResults:res.data,wholeResults:res.data},()=> this.sortResults()) )
        .catch(err => console.log(err));
      }

      if(search[0] === "l"){
        axios.get(`/api/goSearchLabel?l=${search[1]}`)
        .then(res => this.setState({searchResults:res.data,wholeResults:res.data},()=> this.sortResults()) )
        .catch(err => console.log(err));
      }
    }
  }

  componentWillReceiveProps(props){
    let search = props.location.search
    if(search){
      search = search.substr(1,search.length-1).split("=")
      if(search[0] === "q"){
        axios.get(`/api/goSearch?q=${search[1]}`)
        .then(res => this.setState({searchResults:res.data,wholeResults:res.data},()=> this.sortResults()) )
        .catch(err => console.log(err));
      }

      if(search[0] === "l"){
        axios.get(`/api/goSearchLabel?l=${search[1]}`)
        .then(res => this.setState({searchResults:res.data,wholeResults:res.data},()=> this.sortResults()) )
        .catch(err => console.log(err));
      }
    }
  }

  goSearch(){
    axios.get(`/api/goSearch?q=${this.state.search}`)
      .then(res => this.setState({searchResults:res.data,wholeResults:res.data},()=> this.sortResults()) )
      .catch(err => console.log(err));
  }

  searchSelector(){
    let html = [];

   

     html.push(this.state.searchSelector === "newest" ? <li className="lightPrimaryColor filter">newest</li> : <li className="filter" onClick={() => this.setState({searchSelector:"newest",change:true},() => this.sortResults())}>newest</li>);
     html.push(this.state.searchSelector === "votes" ? <li className="lightPrimaryColor filter">votes</li> : <li className="filter" onClick={() => this.setState({searchSelector:"votes",change:true},() => this.sortResults())}>votes</li>);
     html.push(this.state.searchSelector === "unanswered" ? <li className="lightPrimaryColor filter">unanswered</li> : <li className="filter" onClick={() => this.setState({searchSelector:"unanswered",change:true},() => this.sortResults())}>unanswered</li>);
     return html;
  }

  typeSelector(){
    let html = [];
    html.push(this.state.typeSelector[0] === true ? <li onClick={() =>{
      let newSelector = this.state.typeSelector.slice();
      newSelector[0] = !newSelector[0]
      this.setState({typeSelector:newSelector},() => this.sortResults())
      }} className="lightPrimaryColor filter blockLi">entry</li>
      : <li onClick={() =>{
       let newSelector = this.state.typeSelector.slice();
       newSelector[0] = !newSelector[0]
       this.setState({typeSelector:newSelector},() => this.sortResults())
       }} className="filter">entry</li> );

     html.push(this.state.typeSelector[1] === true ? <li onClick={() =>{
       let newSelector = this.state.typeSelector.slice();
       newSelector[1] = !newSelector[1]
       this.setState({typeSelector:newSelector},() => this.sortResults())
       }} className="lightPrimaryColor filter">question</li>
       : <li onClick={() =>{
       let newSelector = this.state.typeSelector.slice();
       newSelector[1] = !newSelector[1]
       this.setState({typeSelector:newSelector},() => this.sortResults())
       }} className="filter">question</li> );

 html.push(this.state.typeSelector[2] === true ? <li onClick={() =>{
   let newSelector = this.state.typeSelector.slice();
   newSelector[2] = !newSelector[2]
   this.setState({typeSelector:newSelector},() => this.sortResults())
   }} className="lightPrimaryColor filter">snippet</li>
   : <li onClick={() =>{
   let newSelector = this.state.typeSelector.slice();
   newSelector[2] = !newSelector[2]
   this.setState({typeSelector:newSelector},() => this.sortResults())
   }} className="filter">snippet</li> );

return html
  }

  sortResults(){
    let search = this.state.wholeResults;
    let type = this.state.searchSelector;
    let entryType = this.state.typeSelector;

    if(this.state.wholeResults){
    if(type === "newest"){
      search = search.sort(function(a,b){
        return b.auto_id-a.auto_id;
      })
    }

    if(type === "votes"){
      search = search.sort(function(a,b){
        return +b.total_points - +a.total_points;
      })
    }

    if(type === "unanswered"){
      search = search.sort(function(a,b){
        return +b.total_points - +a.total_points;
      })

      search = search.filter(e => e.answers == 0)
    }

    if(!entryType[0]){
      search = search.filter(e => e.entry_type !== "entry")
    }

    if(!entryType[1]){
      search = search.filter(e => e.entry_type !== "question")
    }

    if(!entryType[2]){
      search = search.filter(e => e.entry_type !== "snippet")
    }

    search = search.filter(e=>e.seen)


    this.setState({searchResults:null,change:false}, () => this.setState({searchResults:search}))
  }
  }

  getSearchResults(){
    let html = [];
    let search = this.state.searchResults;
    
    if(this.state.searchResults){
    search.map((e,i) =>{ html.push(<QuestionDiv childProps={e} index={i} />)})
    }
    
    if(!this.state.searchResults){html =  <div>Nothing Found</div>}
    return html;
  }
  render() {
    return (
      <div className="superMainSearchContainer">
        <div className="mainSearchContainer">
          <div className="searchBox">
            <input onChange={e => this.setState({search:e.target.value})} className="bodyText" placeholder="Search for something" /><div onClick={() => this.goSearch()} className="accentColor searchLink"><img src={magnify} /></div>
          </div>
        </div>

        <div className="searchFilters">
        <ul className="headerText dp1-bs">
          {this.searchSelector()}
          <br />
          {this.typeSelector()}
        </ul>
        </div>

        <div className="questionContainer">
          {this.getSearchResults()}
          </div>
      </div>
    );
  }
}

export default connect()(Search)