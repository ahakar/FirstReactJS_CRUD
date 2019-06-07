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
      updateDob: "",
      updateDot: "",
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

  getUpdateDob(e){
    this.setState({
      updateDob: e.target.value
    })
  }

  getUpdateDot(e){
    this.setState({
      updateDot: e.target.value
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
    let oldDob = user.dob;
    let oldDot = user.dot;
    

        this.setState({
            updateName: (this.state.updateName) ?  this.state.updateName : oldName,
            updateEmail: (this.state.updateEmail) ?  this.state.updateEmail : oldEmail,
            updateMobile: (this.state.updateMobile) ? this.state.updateMobile : oldMobile,
            updateDob: (this.state.updateDob) ? this.state.updateDob : oldDob,
            updateDot: (this.state.updateDot) ? this.state.updateDot : oldDot
          }, () => {
            console.log("state", this.state.updateName, this.state.updateEmail, this.state.updateMobile, this.state.updateDob, this.state.updateDot)
            this.state.updatedObject['name'] = this.state.updateName;
            this.state.updatedObject['email'] = this.state.updateEmail;
            this.state.updatedObject['mobile'] = this.state.updateMobile;
            this.state.updatedObject['dob'] = this.state.updateDob;
            this.state.updatedObject['dot'] = this.state.updateDot;
            this.setState({
              updatedObject: this.state.updatedObject
            }, () => {
              console.log("updatedObject", this.state.updatedObject)
              if(this.state.updateName !== null && this.state.updateEmail !== null && this.state.updateMobile !== null){
                if( this.state.updateName !== oldName || this.state.updateEmail !== oldEmail
                 || this.state.updateMobile !== oldMobile || this.state.updateDob !== oldDob || this.state.updateDot !== oldDot) {
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
                  updateDob: "",
                  updateDot: "",
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
        <h3>List : </h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th width="2%">#</th>
              <th width="20%">Name</th>
              <th width="20%">Email</th>
              <th width="18%">Number</th>
              <th width="18%">DOB</th>
              <th width="12%">DOT</th>
              <th width="5%">Edit</th>
              <th width="5%">Delete</th>
            </tr>
          </thead>
          <tbody>
            {(this.state.userArray.map((data, idx) => {
              if(idx === this.state.toggleIndex) {
                return(
                  <tr>
                    <th scope="row">{idx}</th>
                    <td>
                      <input type="text" className="form-control" defaultValue={data.name} placeholder="name..." onChange={this.getUpdateName.bind(this)} />
                    </td>
                    <td>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroupPrepend">@</span>
                        </div>
                        <input type="email" className="form-control" defaultValue={data.email} placeholder="email..." onChange={this.getUpdateEmail.bind(this)} />
                      </div>
                    </td>
                    <td>
                      <input type="number" className="form-control" defaultValue={data.mobile} placeholder="mobile..." onChange={this.getUpdateMobile.bind(this)} />
                    </td>
                    <td>
                      <input type="date" className="form-control" defaultValue={data.dob} onChange={this.getUpdateDob.bind(this)} />
                    </td>
                    <td>
                      <input type="time" className="form-control" defaultValue={data.dot} onChange={this.getUpdateDot.bind(this)} />
                    </td>
                    <td>
                      <p onClick={this.toggleEditData.bind(this, data, idx)}>U</p>
                    </td>
                    <td>
                      <span onClick={this.deleteData.bind(this, idx)}>X</span>
                    </td>
                  </tr>
                );
              }
              return(
                <tr>
                  <th scope="row">{idx}</th>
                  <td>
                    {data.name}
                  </td>
                  <td>
                    {data.email}
                  </td>
                  <td>
                    {data.mobile}
                  </td>
                  <td>
                    {data.dob}
                  </td>
                  <td>
                    {data.dot}
                  </td>
                  <td>
                    <p onClick={this.editData.bind(this, data, idx)}>E</p>
                  </td>
                  <td>
                    <span onClick={this.deleteData.bind(this, idx)}>X</span>
                  </td>
                </tr>
              );
            }))}
          </tbody>
        </table>
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