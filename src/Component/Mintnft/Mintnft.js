import axios from "axios";
import React, { useState } from "react";

const Mintnft = () => {
  const imageUrl = localStorage.getItem("imageUrl");
  const [property, setProperty] = useState("");
  const [value, setValue] = useState("");
  const [inputForm, setInputform] = useState([]);
  // console.log(imageUrl);

  const [formData, setFormData] = useState({
    standard: "arc69",
    assetId: 98,
    name: "",
    description: "",
    collectionName: "",
    image: `ipfs://${imageUrl}`,
    mediaUrl: `ipfs://${imageUrl}`,
    mimeType: "image/png",
    properties: {},
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // code for property and value
  const handlePropertyInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "property") {
      setProperty(value);
    }
    if (name === "value") {
      setValue(value);
    }
    // setProperty(name);
    // setValue(value);
    // console.log(event.target.value);
    // console.log("name : ", name);
    // console.log("value : ", value);
  };

  // const newForm = (
  //   <div>
  //     <label>Property:</label>
  //     <input type="text" name="property" onChange={handlePropertyInputChange} />
  //     <label>Value:</label>
  //     <input type="text" name="value" onChange={handlePropertyInputChange} />
  //   </div>
  // );

  const handleAdd = () => {
    setInputform([
      ...inputForm,
      <div key={inputForm.length} className="mt-5 flex gap-7">
        <input
          type="text"
          name="property"
          placeholder="Property"
          onChange={handlePropertyInputChange}
          className="w-1/2 rounded  bg-slate-800 border-2 border-gray-500 rounded"
        />
        <input
          type="text"
          name="value"
          onChange={handlePropertyInputChange}
          placeholder="Value"
          className="w-1/2 h-10 rounded  bg-slate-800 border-2 border-gray-500 rounded"
        />
      </div>,
    ]);
  };

  async function handleFormSubmit(event) {
    event.preventDefault();
    let newFormData = { properties: { ...formData.properties } };
    newFormData.properties[property] = value;

    setFormData({ ...formData, properties: { ...newFormData.properties } });
    // console.log(formData.properties);

    let convertedFormdata = JSON.stringify(formData);
    console.log(convertedFormdata);
    try {
      const response = await axios.post(
        `https://bs-dev.api.onnftverse.com/v1/external/nft/mint`,
        convertedFormdata,
        {
          headers: {
            "X-App-Token": 123,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to mint NFT");
    }
  }

  return (
    <div class="flex justify-between bg-slate-800 text-white w-3/4 m-auto">
      <form onSubmit={handleFormSubmit} class="w-1/2 p-4">
        <div class="flex justify-between">
          <label htmlFor="name" class="">
            NFT Details
          </label>
          <input
            type="text"
            name="standard"
            value="arc69"
            onChange={handleInputChange}
            className="block bg-slate-800 border-2 border-gray-500 rounded"
          />
        </div>
        <br />
        <label htmlFor="name" class="">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="block w-full  bg-slate-800 border-2 border-gray-500 rounded"
        />
        <br />
        <label htmlFor="description" class="">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="block w-full  bg-slate-800 border-2 border-gray-500 rounded"
        />
        <br />
        <label htmlFor="collectionName" class="">
          Collection Name
        </label>
        <input
          type="text"
          name="collectionName"
          value={formData.collectionName}
          onChange={handleInputChange}
          className="block w-full  bg-slate-800 border-2 border-gray-500 rounded"
        />
        <br />
        {inputForm.map((singleForm) => singleForm)}
        <br />
        <button
          onClick={handleAdd}
          className="bg-violet-700 text-white font-bold py-2 px-4 rounded"
        >
          Add property
        </button>
        <br />
        <button
          type="submit"
          className="bg-violet-700 text-white font-bold py-2 mt-5 mx-auto px-4 rounded"
        >
          Submit
        </button>
        {/* <p class="mt-4">
          {Object.keys(formData).length > 0
            ? JSON.stringify(formData)
            : "no object"}
        </p> */}
      </form>
      {/* right side */}
      <div class="w-1/3 mx-auto p-4 ">
        <h1 class="text-2xl font-bold mb-4">Preview your NFT</h1>
        {imageUrl && (
          <div>
            <img
              src={`https://ipfs.io/ipfs/${imageUrl}`}
              alt="Uploaded image"
              className="w-60 mx-auto"
            />
          </div>
        )}
        <h4 class=" mt-4">Your IPFS hash</h4>
        <input
          type="text"
          value={imageUrl}
          className="block w-full  bg-slate-800 border-2 border-gray-500 rounded"
        />
        <button className="w-full bg-violet-700 text-white font-bold py-2 mt-5 px-4 rounded">
          View ipfs hash
        </button>
      </div>
    </div>
  );
};

export default Mintnft;
