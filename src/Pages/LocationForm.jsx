import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import InputField from "../Components/InputField";
import SelectField from "../Components/SelectField";


const LocationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [editLocation, setEditLocation] = useState(null);

  const onSubmit = async (data) => {
    data.country = selectedCountry?.label || "";
    data.state = selectedState?.label || "";
    data.city = selectedCity?.label || "";

    try {
      const response = await axios.post(`https://deploye-test.onrender.com/form`, data);
      console.log(response);
      reset();
      setSelectedCountry(null);
      setSelectedState(null);
      setSelectedCity(null);
      alert("Location Successfully Added");
    } catch (error) {
      console.error("Error creating location:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6">
      {editLocation ? (
        <>
          <InputField
            label="Location Name"
            name="locationName"
            control={control}
            defaultValue={editLocation.locationName}
            placeholder="Enter location name"
            errors={errors}
          />

          <InputField
            label="Location Description"
            name="locationDescription"
            control={control}
            defaultValue={editLocation.locationDescription}
            placeholder="Enter location description"
            errors={errors}
          />

          <SelectField
            label="Country"
            options={Country.getAllCountries().map((country) => ({
              value: country.isoCode,
              label: country.name,
            }))}
            value={selectedCountry}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
          />

          <SelectField
            label="State"
            options={
              selectedCountry
                ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
                    value: state.isoCode,
                    label: state.name,
                  }))
                : []
            }
            value={selectedState}
            onChange={(selectedOption) => setSelectedState(selectedOption)}
          />

          <SelectField
            label="City"
            options={
              selectedState && selectedCountry
                ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(
                    (city) => ({
                      value: city.isoCode,
                      label: city.name,
                    })
                  )
                : []
            }
            value={selectedCity}
            onChange={(selectedOption) => setSelectedCity(selectedOption)}
          />
        </>
      ) : (
        <>
          <InputField
            label="Location Name"
            name="locationName"
            control={control}
            defaultValue=""
            placeholder="Enter location name"
            errors={errors}
          />

          <InputField
            label="Location Description"
            name="locationDescription"
            control={control}
            defaultValue=""
            placeholder="Enter location description"
            errors={errors}
          />

          <SelectField
            label="Country"
            options={Country.getAllCountries().map((country) => ({
              value: country.isoCode,
              label: country.name,
            }))}
            value={selectedCountry}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
          />

          <SelectField
            label="State"
            options={
              selectedCountry
                ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
                    value: state.isoCode,
                    label: state.name,
                  }))
                : []
            }
            value={selectedState}
            onChange={(selectedOption) => setSelectedState(selectedOption)}
          />

          <SelectField
            label="City"
            options={
              selectedState && selectedCountry
                ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(
                    (city) => ({
                      value: city.isoCode,
                      label: city.name,
                    })
                  )
                : []
            }
            value={selectedCity}
            onChange={(selectedOption) => setSelectedCity(selectedOption)}
          />
        </>
      )}

      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Location
        </button>
      </div>
    </form>
  );
};

export default LocationForm;
