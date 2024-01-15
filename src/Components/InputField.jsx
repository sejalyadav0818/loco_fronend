import React from "react";
import { Controller } from "react-hook-form";

const InputField = ({ label, name, control, defaultValue, placeholder, errors }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <input
          {...field}
          type="text"
          id={name}
          placeholder={placeholder}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
    />
    {errors[name] && (
      <p className="text-red-500 text-xs italic">{`${label} is required.`}</p>
    )}
  </div>
);

export default InputField;
