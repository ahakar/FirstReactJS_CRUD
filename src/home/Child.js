import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { deleteUserData, updateUserData } from '../actions/index.js'; 

class Child extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userArray: [],
      toggleIndex: "",

      updateName: "",
      updateEmail: "",
      updateMobile: "",
      updatedObject: {}
    }
    
  }

  componentDidMount(){
    //console.log("componentDidMount child", this.props);
  }

  componentWillReceiveProps(newProps){
    console.log("componentWillReceiveProps child",newProps);
    this.setState({
      userArray: newProps.userData
    })
  }

  getUpdateName(e){
    this.setState({
      updateName: e.target.value
    })
  }

  getUpdateEmail(e){
    this.setState({
      updateEmail: e.target.value
    })
  }

  getUpdateMobile(e){
    this.setState({
      updateMobile: e.target.value
    })
  }

  editData(user, index){
    console.log("update", user, index);
    this.setState({
      toggleIndex: index
    })
  }

  toggleEditData(user, idx){
    console.log("toggleEditData", user, idx);
    let oldName = user.name;
    let oldEmail = user.email;
    let oldMobile = user.mobile;
    

        this.setState({
            updateName: (this.state.updateName) ?  this.state.updateName : oldName,
            updateEmail: (this.state.updateEmail) ?  this.state.updateEmail : oldEmail,
            updateMobile: (this.state.updateMobile) ? this.state.updateMobile : oldMobile
          }, () => {
            console.log("state", this.state.updateName, this.state.updateEmail, this.state.updateMobile)
            this.state.updatedObject['name'] = this.state.updateName;
            this.state.updatedObject['email'] = this.state.updateEmail;
            this.state.updatedObject['mobile'] = this.state.updateMobile;
            this.setState({
              updatedObject: this.state.updatedObject
            }, () => {
              console.log("updatedObject", this.state.updatedObject)
              if(this.state.updateName !== null && this.state.updateEmail !== null && this.state.updateMobile !== null){
                if( this.state.updateName !== oldName || this.state.updateEmail !== oldEmail
                 || this.state.updateMobile !== oldMobile) {
                   this.props.updateUserData(this.state.updatedObject, idx);
                }
              }
              this.setState({
                toggleIndex: ""
              }, () => {
                this.setState({
                  updateName: "",
                  updateEmail: "",
                  updateMobile: "",
                  updatedObject: {}
                })
              })
            })
            
          })

  }

  deleteData(index){
    this.props.deleteUserData(index);
  }


  render(){
    return (
      <div>

        {(this.state.userArray.map((data, idx) => {
          if(idx === this.state.toggleIndex){
            return(
              <div key={idx}>
                <input type="text" defaultValue={data.name} 
                placeholder="name..." onChange={this.getUpdateName.bind(this)} />
                <input type="email" defaultValue={data.email} 
                placeholder="email..." onChange={this.getUpdateEmail.bind(this)} />
                <input type="number" defaultValue={data.mobile}
                 placeholder="mobile..." onChange={this.getUpdateMobile.bind(this)} />
                <p onClick={this.toggleEditData.bind(this, data, idx)}>Edit</p>
                <span onClick={this.deleteData.bind(this, idx)}>X</span>
              </div>
            );
          }
          return(
            <div key={idx}>
              <p>{data.name}</p>
              <p>{data.email}</p>
              <p>{data.mobile}</p>
              <p onClick={this.editData.bind(this, data, idx)}>Edit</p>
              <span onClick={this.deleteData.bind(this, idx)}>X</span>
            </div>
          );
        }))}
      </div>
    );
  }
}

function mapStateToProps(state){
  console.log("$$$", state)
  return {
    userData: state.user.user
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({deleteUserData: deleteUserData, updateUserData: updateUserData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Child);