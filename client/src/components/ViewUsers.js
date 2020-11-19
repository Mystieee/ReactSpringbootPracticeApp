import React, { Component } from "react";
import UserService from "../service/UserService";

export default class ViewUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.refreshUserData = this.refreshUserData.bind(this);
  }
  componentDidMount() {
    this.refreshUserData();
  }

  refreshUserData() {
    UserService.retrieveAllUsers()
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        if (error.response) {
          console.log("error -->", error.response);
        }
      });
  }
  render() {
    return (
      <div>
        <div className="container">
          {this.state.users.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of birth</th>
                  <th>Country </th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(usr => (
                  <tr key={usr.id}>
                    <td>{usr.firstname}</td>
                    <td>{usr.lastname}</td>
                    <td>{usr.dob}</td>
                    <td>{usr.country}</td>
                    <td>{usr.phonenumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
