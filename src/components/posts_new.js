import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  renderField(field) {
    // Destructuring field.meta.touched and field.meta.error
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props; // coming form redux form when we bind at bottom

    // making sure to bind this to component
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  // Values is object of all input values
  const errors = {};

  // Validate hte inputs from 'values'
  if(!values.title) {
    errors.title = 'Please enter a title';
  }
  if(!values.categories) {
    errors.categories = 'Please enter some categories';
  }
  if(!values.content) {
    errors.content = 'Please enter some content';
  }

  // If errors is empty, the form can submit
  // If errors has any properties, redux assumes invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew);
