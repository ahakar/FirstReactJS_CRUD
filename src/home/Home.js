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
			dob: "",
			dot: "",
			objData: {},
			arrayData: [],
			toggleStatus: true,
			validated: false
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

	getDob(event){
		this.setState({
			dob: event.target.value
		})
	}

	getDot(event){
		this.setState({
			dot: event.target.value
		})
	}

	submitData(event){
		event.preventDefault(); //BROWSER WILL STOP REFRESHING
		this.state.objData['name'] = this.state.name;
		this.state.objData['email'] = this.state.email;
		this.state.objData['mobile'] = this.state.mobile;
		this.state.objData['dob'] = this.state.dob;
		this.state.objData['dot'] = this.state.dot;
		this.setState({
			objData: this.state.objData
		}, () => {
				this.props.sendUserData(this.state.objData);
				this.state.name = "";
				this.state.email = "";
				this.state.mobile = "";
				this.state.dob = "";
				this.state.dot = "";
				this.state.objData = {};
				this.setState({
					name: this.state.name,
					email: this.state.email,
					mobile: this.state.mobile,
					dob: this.state.dob,
					dot: this.state.dot,
					objData: this.state.objData
				})
		})
	}

	/**render() {
		const { validated } = this.state;
		return (
			<Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)}>
				<Form.Row>
					<Form.Group as={Col} md="4" controlId="validationCustom01">
						<Form.Label>Name</Form.Label>
						<Form.Control required type="text" placeholder="Name" />
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">Please enter a Name.</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} md="4" controlId="validationCustom02">
						<Form.Label>Username</Form.Label>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control type="text" placeholder="Email" aria-describedby="inputGroupPrepend" required/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">Please enter a Email.</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group as={Col} md="4" controlId="validationCustom03">
						<Form.Label>Mobile Number</Form.Label>
						<Form.Control required type="text" placeholder="mobile" />
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">Please enter a Mobile Number.</Form.Control.Feedback>
					</Form.Group>
				</Form.Row>
				<Button type="submit">Submit form</Button>
			</Form>
		);
	}*/

	render() {
		return(
			<div>
				<h3>Enter Details : </h3>
				<form onSubmit={this.submitData.bind(this)}>
					<div class="form-row">
						<div className="form-group col-md-4 mb-3">
							<label>Name</label>
							<input type="text" className="form-control" value={this.state.name} placeholder="Enter Name.." onChange={this.getName.bind(this)} required/>
						</div>
						<div className="form-group col-md-4 mb-3">
							<label>Mobile</label>
							<input type="number" className="form-control" value={this.state.mobile} placeholder="Enter Mobile.." onChange={this.getMobile.bind(this)} required/>
						</div>
						<div className="form-group col-md-4 mb-3">
							<label>Email</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text" id="inputGroupPrepend">@</span>
								</div>
								<input type="email" className="form-control" value={this.state.email} placeholder="Enter Email.." onChange={this.getEmail.bind(this)} required/>
							</div>
						</div>
					</div>
					<div class="form-row">
						<div className="form-group col-md-4 mb-3">
							<label>DOB</label>
							<input type="date" className="form-control" value={this.state.dob} onChange={this.getDob.bind(this)} required/>
						</div>
						<div className="form-group col-md-4 mb-3">
							<label>DOT</label>
							<input type="time" className="form-control" value={this.state.dot} onChange={this.getDot.bind(this)} required/>
						</div>
					</div>
					<button className="btn btn-outline-success" type="submit">Submit form</button>
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
