import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
const TextFieldInput = ({
  name,
  placeholder,
  value,
  textValue,
  error,
  onChange,
  info
}) => {
  return (
    <div>
      <div className= 'form-group'>
        <textarea name ={name}
        className = {classnames('form-control form-control-lg',{'is-invalid': error})}
        onChange = {onChange}
        value = {value}
        placeholder = {placeholder}
        >
        </textarea>
        {error && <div className="invalid-feedback">{error}</div>}
        {<small className="form-text text-muted">{info}</small>}
      </div>
    </div>
  )
}
TextFieldInput.proptypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.string,
    info: PropTypes.string,
    textValue: PropTypes.string,
  }
  export default TextFieldInput;