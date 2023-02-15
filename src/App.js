import logo from "./logo.svg";
import "./App.css";
import Home from "./Component/Homepage/Home";
import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios({
      url: `https://bs-dev.api.onnftverse.com/v1/external/asset/upload?type=image`,
      headers: {
        "X-App-Token": 123,
        "Content-Type": "multipart/form-data",
      },
      method: "post",
      data: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Choose an image to upload:
          <input type="file" onChange={handleFileInput} />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
