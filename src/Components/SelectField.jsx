// SelectField.js
import React from "react";
import Select from "react-select";

const SelectField = ({ label, options, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={label} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <Select options={options} value={value} onChange={onChange} />
  </div>
);

export default SelectField;
