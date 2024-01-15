import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTags,
  faCheck,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import datanotFound from "../assets/images/error.png";

const LocationForm = () => {
  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState(["Home", "Office", "Others"]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});
  const [newTag, setNewTag] = useState("");
  const [isCreatingNewTag, setIsCreatingNewTag] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const totalRecordPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * totalRecordPerPage;
  const endIndex = startIndex + totalRecordPerPage;
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("https://deploye-test.onrender.com/show")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleLocationSelection = (location) => {
    setSelectedLocations((prevSelected) =>
      prevSelected.includes(location)
        ? prevSelected.filter((item) => item !== location)
        : [...prevSelected, location]
    );
    setSelectedTags((prevSelectedTags) => ({
      ...prevSelectedTags,
      [location]: prevSelectedTags[location] || "",
    }));
  };

  const assignTagsToSelectedLocations = () => {
    if (selectedLocations.length > 0 && selectedTags) {
      const updatedLocations = locations.map((loc) =>
        selectedLocations.includes(loc._id)
          ? { ...loc, tag: selectedTags[loc._id] || selectedTags }
          : loc
      );

      setLocations(updatedLocations);
      setSelectedLocations([]);
    }
  };

  const createNewTag = () => {
    if (newTag) {
      setTags([...tags, newTag]);
      setNewTag("");
      setIsCreatingNewTag(false);
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setSelectedTags((prevSelectedTags) => {
      const updatedSelectedTags = { ...prevSelectedTags };
      for (const locationId in updatedSelectedTags) {
        if (updatedSelectedTags[locationId] === tagToRemove) {
          updatedSelectedTags[locationId] = "";
        }
      }
      return updatedSelectedTags;
    });
  };

  const handleDeleteLocation = (id) => {
    axios
      .delete(`https://deploye-test.onrender.com/delete/${id}`)
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleCheckboxChange = (event) => {
    const locationId = event.target.value;
    toggleLocationSelection(locationId);
  };

  const handleDeleteSelectedLocations = () => {
    axios
      .delete("https://deploye-test.onrender.com/deletelocations", {
        data: { ids: selectedLocations },
      })
      .then((response) => {
        setLocations(response.data);
        setShowMessage(true);
      })
      .catch((error) => {
        console.error("Error deleting selected locations:", error);
      });
  };

  const toggleTagSelection = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      const updatedSelectedTags = { ...prevSelectedTags };
      delete updatedSelectedTags[tag];
      return updatedSelectedTags;
    });
  };

  const applySelectedTags = () => {
    if (selectedLocations.length > 0 && selectedTags) {
      const updatedLocations = locations.map((loc) =>
        selectedLocations.includes(loc._id)
          ? { ...loc, tag: selectedTags[loc._id] || selectedTags }
          : loc
      );

      setLocations(updatedLocations);
      setSelectedLocations([]);
    }
    toggleTagSelection();
  };

  const toggleTagDropdown = () => {
    setIsTagDropdownOpen(!isTagDropdownOpen);
  };

  const filteredLocations = locations.filter((location) =>
    Object.values(location)
      .join("")
      .toLowerCase()
      .includes(searchText.toLowerCase().replace(/\s/g, ""))
  );

  return (
    <div className="container mx-auto p-4">
      {showMessage && (
        <div className="message success">Selected locations deleted!</div>
      )}

      <form className="lg:flex lg:items-center mb-4">
        <input
          className="w-full lg:w-1/2 px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
          type="search"
          placeholder="Search Something.."
          aria-label="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <FontAwesomeIcon icon={faSearch} className="ml-2" />
      </form>

      {isTagDropdownOpen && (
        <div className="tags-dropdown">
          <h2>Select Tags</h2>
          {tags.map((tag, index) => (
            <label key={index} className="tag-label">
              <input
                type="checkbox"
                checked={selectedTags[tag] !== undefined}
                onChange={() => toggleTagSelection(tag)}
              />
              {tag}
            </label>
          ))}
          <button
            className="bg-indigo-300 text-white py-1 px-2 rounded hover:bg-indigo-700"
            onClick={applySelectedTags}
          >
            Apply Tags
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:space-x-2">
        <button
          className="bg-red-500 text-white py-2 px-4 my-2 lg:my-0 lg:mr-2 rounded shadow hover:bg-red-600"
          onClick={handleDeleteSelectedLocations}
        >
          Delete Selected
        </button>
      </div>

      {filteredLocations.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 shadow-sm">
          <thead>
            <tr className="border-t border-b border-gray-300">
              <th className="py-3 px-6 text-left">Select</th>
              <th className="py-3 px-6 text-left">Location Name</th>
              <th className="py-3 px-6 text-left">Location Description</th>
              <th className="py-3 px-6 text-left">Country</th>
              <th className="py-3 px-6 text-left">State</th>
              <th className="py-3 px-6 text-left">City</th>
              <th className="py-3 px-6 text-left">Tags</th>
              <th colSpan={2} className="py-3 px-6 text-left">
                View
              </th>
              <th className="py-3 px-6 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations
              .slice(startIndex, endIndex)
              .map((location, index) => (
                <tr key={index} className="border-t border-b border-gray-300">
                  <th className="py-3 px-6 text-left">
                    <input
                      type="checkbox"
                      value={location._id}
                      checked={selectedLocations.includes(location._id)}
                      onChange={handleCheckboxChange}
                      className="text-blue-100 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </th>
                  <td className="py-3 px-6">{location.locationName}</td>
                  <td className="py-3 px-6">{location.locationDescription}</td>
                  <td className="py-3 px-6">{location.country}</td>
                  <td className="py-3 px-6">{location.state}</td>
                  <td className="py-3 px-6">{location.city}</td>
                  <td className="py-3 px-6">
                    <select
                      value={selectedTags[location._id] || ""}
                      onChange={(e) =>
                        setSelectedTags({
                          ...selectedTags,
                          [location._id]: e.target.value,
                        })
                      }
                      className="bg-blue-100 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-14 mb-10 border border-gray-400 rounded shadow"
                    >
                      <option
                        className="bg-indigo-100 hover-bg-gray-100 text-gray-800 font-semibold py-2 px-14 border border-gray-400 rounded shadow"
                        value=""
                      >
                        Select or create a new tag
                      </option>
                      {tags.map((tag, tagIndex) => (
                        <option
                          key={tagIndex}
                          value={tag}
                          className="bg-indigo-100 hover-bg-green-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        >
                          {tag}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeTag(selectedTags[location._id])}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    {isCreatingNewTag ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          className="mr-2 p-1 border border-gray-300 rounded focus:ring focus:ring-blue-500"
                        />
                        <button
                          onClick={createNewTag}
                          className="text-green-500"
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          onClick={() => setIsCreatingNewTag(false)}
                          className="text-red-500"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setIsCreatingNewTag(true)}>
                        <FontAwesomeIcon
                          icon={faTags}
                          className="text-indigo-500 px-8"
                        />
                      </button>
                    )}
                    <button
                      onClick={assignTagsToSelectedLocations}
                      className="bg-indigo-300 text-white py-1 px-2 rounded hover-bg-indigo-700"
                    >
                      Assign Tag
                    </button>
                  </td>

                  <td>
                    <button
                      className="w-full lg:w-40 bg-blue-400 hover:bg-blue-300 text-black-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      onClick={() => handleDeleteLocation(location._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <img
          src={datanotFound}
          className="h-auto max-w-lg mx-auto"
          alt="Data Not Found"
        />
      )}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-300 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        <span className="text-lg text-red-500 font-bold">
          Page {currentPage}
        </span>

        <button
          onClick={() => {
            setCurrentPage((prev) => {
              const newPage = Math.min(
                prev + 1,
                Math.ceil(filteredLocations.length / totalRecordPerPage)
              );
              return newPage;
            });
          }}
          disabled={
            currentPage ===
            Math.ceil(filteredLocations.length / totalRecordPerPage)
          }
          className={`px-4 py-2 rounded-lg ${
            currentPage ===
            Math.ceil(filteredLocations.length / totalRecordPerPage)
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LocationForm;
