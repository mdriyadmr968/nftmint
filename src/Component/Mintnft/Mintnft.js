import axios from "axios";
import React, { useState } from "react";

const Mintnft = () => {
  const imageUrl = localStorage.getItem("imageUrl");
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
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handlePropertyInputChange = (event, index) => {
    const { name, value } = event.target;
    const properties = [...formData.properties];
    properties[index][name] = value;
    setFormData({ ...formData, properties });
  };

  const handleAddPropertyInput = () => {
    const newProperty = { property: "", value: "" };
    setFormData({
      ...formData,
      properties: [...formData.properties, newProperty],
    });
  };
  const handleDeleteProperty = (propertyIndex) => {
    setFormData((prevFormData) => {
      const newProperties = [...prevFormData.properties];
      newProperties.splice(propertyIndex, 1);
      return {
        ...prevFormData,
        properties: newProperties,
      };
    });
  };

  async function handleFormSubmit(event) {
    event.preventDefault();
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
        {/* {formData.properties.map((property, index) => (
          <div key={index}>
            <label htmlFor={`property-${index}`}>Property:</label>
            <input
              type="text"
              name="property"
              value={property.property}
              onChange={(event) => handlePropertyInputChange(event, index)}
            />
            <label htmlFor={`value-${index}`}>Value:</label>
            <input
              type="text"
              name="value"
              value={property.value}
              onChange={(event) => handlePropertyInputChange(event, index)}
            />
            <button type="button" onClick={() => handleDeleteProperty(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddPropertyInput}>
          Add Property
        </button> */}
        <br />
        <button type="submit">Submit</button>
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
