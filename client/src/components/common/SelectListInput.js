import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
const SelectListInput = ({
  name,
  placeholder,
  value,
  error,
  onChange,
  disabled,
  info,
  options

}) => {
  const selectOptions = options.map(opt => (
    <option key={opt.value}> {opt.label} </option>
  ));
  return (
    <div>
      <div className= 'form-group'>
        <select
        className={classnames('form-control form-control-lg',{'is-invalid': error})}
        placeholder = {placeholder}
        name = {name}
        value = {value}
        onChange = {onChange}
        disabled = {disabled}
        >
        {selectOptions}
        </select>
         {error && <div className="invalid-feedback">{error}</div>}
        {info && <span className="form-text text-muted">{info}</span>}
      </div>
    </div>
  )
}
SelectListInput.proptypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    disabled: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.string,
    info: PropTypes.string,
  }
  export default SelectListInput;