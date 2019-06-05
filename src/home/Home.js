import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {sendUserData} from '../actions/index.js'; 
import Child from './Child';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: "",
			email: "",
			mobile: "",
			objData: {},
			arrayData: [],
			toggleStatus: true
		}
	}

	getName(event){
		this.setState({
			name: event.target.value
		})
	}	

	getEmail(event){
		this.setState({
			email: event.target.value
		})
	}

	getMobile(event){
		this.setState({
			mobile: event.target.value
		})
	}

	submitData(event){
		event.preventDefault(); //BROWSER WILL STOP REFRESHING
		this.state.objData['name'] = this.state.name;
		this.state.objData['email'] = this.state.email;
		this.state.objData['mobile'] = this.state.mobile;
		this.setState({
			objData: this.state.objData
		}, () => {
				this.props.sendUserData(this.state.objData);
				this.state.name = "";
				this.state.email = "";
				this.state.mobile = "";
				this.state.objData = {};
				this.setState({
					name: this.state.name,
					email: this.state.email,
					mobile: this.state.mobile,
					objData: this.state.objData
				})
		})
	}

	render() {
		return(
			<div>
				Home Page
				<form onSubmit={this.submitData.bind(this)}>
					<input type="text" value={this.state.name} placeholder="Enter Name.." onChange={this.getName.bind(this)} /><br />
					<input type="email" value={this.state.email} placeholder="Enter Email.." onChange={this.getEmail.bind(this)} /><br />
					<input type="number" value={this.state.mobile} placeholder="Enter Mobile.." onChange={this.getMobile.bind(this)} /><br />
					<button type="submit">SUBMIT</button>
				</form>
				<Child />
			</div>

		);
	}
}

function mapStateToProps(state){
	return {

	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators ({sendUserData: sendUserData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
