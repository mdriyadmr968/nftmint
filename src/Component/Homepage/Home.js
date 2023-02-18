import React from "react";
import useHooks from "../../Hookes/useHooks";

const Home = () => {
  const { handleFileInput, handleSubmit, imageUrl, allData } = useHooks();
  localStorage.setItem("imageUrl", imageUrl);
  localStorage.setItem("ipfsHash", allData?.ipfsHash);

  return (
    <div className="max-w-md mx-auto mt-10 p-10 bg-slate-800 text-white ">
      <div className="max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="block text-lg font-medium mt-5 p-5">
            Choose an image to upload:
            <input type="file" onChange={handleFileInput} className="mt-1" />
          </label>
          <button
            type="submit"
            className="bg-violet-700 font-bold py-2 px-2 rounded"
          >
            Upload
          </button>
        </form>
      </div>
      <div>
        {imageUrl && (
          <div className="mt-4">
            <img
              src={`https://ipfs.io/ipfs/${imageUrl}`}
              alt="Uploaded image"
              className="max-w-full mx-auto w-50"
            />
          </div>
        )}

        <a href="mintnft" className="block mx-auto text-center">
          <button className="mt-5 p-5 bg-violet-700 text-white font-bold rounded">
            Mintnft
          </button>
        </a>
      </div>
    </div>
  );
};

export default Home;
