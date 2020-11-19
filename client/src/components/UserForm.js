import React, { Component } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { fieldset } from "react-fieldset";

import UserService from "../service/UserService";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1004,
      firstname: "",
      lastname: "",
      dob: "",
      country: "",
      phonenumber: ""
    };
  }
  onSubmitForm = values => {
    console.log("Form Submitted");
    let userFormData = {
      id: this.state.id,
      firstname: values.firstname,
      lastname: values.lastname,
      dob: values.dob,
      country: values.country,
      phonenumber: values.phonenumber
    };

    // UserService.createUser(userFormData).then(() =>
    //   this.props.history.push("/view")
    // );

    UserService.createUser(userFormData)
      .then(() => this.props.history.push("/view"))
      .catch(error => {
        if (error.response) {
          console.log("error -->", error.response);
        }
      });
  }; //end submit..

  validate(values) {
    let errors = {};
    if (!values.firstname) {
      errors.firstname = "Please enter firstname";
    } else if (!values.lastname) {
      errors.lastname = "Please enter lastname";
    } else if (!values.dob) {
      errors.dob = "Please enter date of birth";
    } else if (!values.country) {
      errors.country = "Please enter country";
    } else if (!values.phonenumber) {
      errors.phonenumber = "Please enter phone number";
    } else if (values.phonenumber.length < 10) {
      errors.phonenumber = "Phone number should be 10 digits";
    }
    return errors;
  }
  render() {
    return (
      <div>
        <div className="container">
          <Formik
            enableReinitialize
            initialValues={this.state}
            onSubmit={this.onSubmitForm}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
          >
            {props => (
              <Form>
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="phonenumber"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>First Name</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="firstname"
                    placeholder="Enter firstname"
                  />
                </fieldset>

                <fieldset className="form-group">
                  <label>Last Name</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="lastname"
                    placeholder="Enter lastname"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Date of birth</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="dob"
                    placeholder="Enter date of birth."
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Country</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="country"
                    placeholder="Enter country."
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Phone number</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="phonenumber"
                    placeholder="Enter phone number."
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Add
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
