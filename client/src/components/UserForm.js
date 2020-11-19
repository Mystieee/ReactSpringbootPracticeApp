import React, { Component } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { fieldset } from "react-fieldset";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  validate(values) {
    let errors = {};
    console.log("Validate");
    return errors;
  }
  render() {
    return (
      <div>
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
                name="error_text"
                component="div"
                className="alert alert-warning"
              />

              <fieldset className="form-group">
                <label>First Name</label>
                <Field
                  className="form-control"
                  type="text"
                  name="firstName"
                  placeholder="Enter firstname"
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Last Name</label>
                <Field
                  className="form-control"
                  type="text"
                  name="lastName"
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
                  type="number"
                  name="phoneNumber"
                  placeholder="Enter phone number."
                />
              </fieldset>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
