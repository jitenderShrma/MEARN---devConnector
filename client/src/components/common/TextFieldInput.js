import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
const TextFieldInput = ({
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
  disabled,
  info

}) => {
  return (
    <div>
      <div className= 'form-group'>
        <input
        className={classnames('form-control form-control-lg',{'is-invalid': error})}
        type = {type}
        placeholder = {placeholder}
        name = {name}
        value = {value}
        onChange = {onChange}
        disabled = {disabled}
        />
         {error && <div className="invalid-feedback">{error}</div>}
        {info && <span className="form-text text-muted">{info}</span>}
      </div>
    </div>
  )
}
TextFieldInput.proptypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.string,
    info: PropTypes.string,
  }
  export default TextFieldInput;