import React, { Component } from 'react';
import './LogValidator.css';
import close from './../../assets/close-circle.png'
import {connect} from 'react-redux'
import {logValidator} from './../../ducks/reducer';
class LogValidator extends Component {

    componentWillReceiveProps(props){
    }
    render() {
        let style = {};
        if(this.props.state.width >=992){
            style = {top:`${this.props.childProps.mousePosY+20}px`, left:this.props.childProps.mousePosX-125}
        }
        else{
            style = {top:`${this.props.childProps.mousePosY+20}px`, left:(window.innerWidth/2)-125}
        }
        
        return (
            
            <div style={style} className={`logVal dp3-bs moveLogDown`}>
                <div className="primaryColor once" onClick={(e) => this.props.logValidator({mousePosX:e.clientX,mousePosY:e.clientY+window.pageYOffset})}>
                <img src={close}/>
                <p className=" primaryColor headerText">You must be logged in to do that.</p>
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

export default connect(mapStateToProps,{logValidator})(LogValidator);