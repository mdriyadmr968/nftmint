import { useEffect, useState } from "react";
import axios from "axios";

const useHooks = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [allData, setAlldata] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios({
        url: `https://bs-dev.api.onnftverse.com/v1/external/asset/upload?type=image`,
        headers: {
          "X-App-Token": 123,
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        data: formData,
      });
      setImageUrl(res.data.cid);
      setAlldata(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return { handleFileInput, handleSubmit, imageUrl, allData };
};

export default useHooks;
