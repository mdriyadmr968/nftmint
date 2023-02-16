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
    console.log(event.target.value);
    console.log("name : ", name);
    console.log("value : ", value);
  };

  const newForm = (
    <div>
      <label>Property:</label>
      <input type="text" name="property" onChange={handlePropertyInputChange} />
      <label>Value:</label>
      <input type="text" name="value" onChange={handlePropertyInputChange} />
    </div>
  );

  const handleAdd = () => {
    setInputform([
      ...inputForm,
      <div key={inputForm.length}>
        <label>Property:</label>
        <input
          type="text"
          name="property"
          onChange={handlePropertyInputChange}
        />
        <label>Value:</label>
        <input type="text" name="value" onChange={handlePropertyInputChange} />
      </div>,
    ]);
  };

  async function handleFormSubmit(event) {
    event.preventDefault();
    let newFormData = { properties: { ...formData.properties } };
    newFormData.properties[property] = value;

    setFormData({ ...formData, properties: { ...newFormData.properties } });
    console.log(formData.properties);

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
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Standard</label>
        <input
          type="text"
          name="standard"
          value="arc69"
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="collectionName">Collection Name:</label>
        <input
          type="text"
          name="collectionName"
          value={formData.collectionName}
          onChange={handleInputChange}
        />
        <br />
        {/* <div>
          <label>Property:</label>
          <input
            type="text"
            name="property"
            onChange={handlePropertyInputChange}
            onBlur={handleInputChange}
          />
          <label>Value:</label>
          <input
            type="text"
            name="value"
            onChange={handlePropertyInputChange}
            onBlur={handleInputChange}
          />
        </div> */}

        {inputForm.map((singleForm) => singleForm)}

        <br />
        <button onClick={handleAdd}>Add property</button>
        <button type="submit">Submit</button>

        <p>
          {Object.keys(formData).length > 0
            ? JSON.stringify(formData)
            : "no object"}
        </p>
      </form>
      {/* right side */}
      <div>
        <h1>preview your nft</h1>
        {imageUrl && (
          <div>
            <img
              src={`https://ipfs.io/ipfs/${imageUrl}`}
              alt="Uploaded image"
            />
          </div>
        )}
        <h4>Your IPFS hash</h4>
        <input type="text" value={imageUrl} />
      </div>
    </div>
  );
};

export default Mintnft;
