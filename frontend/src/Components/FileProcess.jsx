import React, { useState } from "react";
import NavBar from "./NavBar";
import { fileProcessAPI } from "../Services/userServices";
import { message, Spin } from "antd";

function FileProcess() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleFileChange(event) {
    const fileList = event.target.files;
    const filesArray = Array.from(fileList); // Convert FileList to an array
    setSelectedFiles(filesArray);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    console.log(formData);
    fileProcessAPI(formData)
      .then((response) => {
        message.success("Successfully uploaded");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  }

  return (
    <div>
      <NavBar />
      <div>
        <div className="flex justify-center">
          <h1 className="font-bold text-[30px] mt-5">File Processing System</h1>
        </div>

        <div className="flex justify-center mt-5">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
          ></input>
        </div>
        <div className="flex justify-center mt-5">
          {loading ? (
            <Spin size="large" />
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileProcess;
