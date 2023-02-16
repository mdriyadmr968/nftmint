import React from "react";
import useHooks from "../../Hookes/useHooks";

const Home = () => {
  const { handleFileInput, handleSubmit, imageUrl, allData } = useHooks();
  localStorage.setItem("imageUrl", imageUrl);
  localStorage.setItem("ipfsHash", allData?.ipfsHash);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Choose an image to upload:
          <input type="file" onChange={handleFileInput} />
        </label>
        <button type="submit">Upload</button>
      </form>
      {imageUrl && (
        <div>
          <img src={`https://ipfs.io/ipfs/${imageUrl}`} alt="Uploaded image" />
        </div>
      )}
      <a href="mintnft">Mintnft</a>
    </div>
  );
};

export default Home;
