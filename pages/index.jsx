import Axios from "axios";
import { useState } from "react";

const apiUrl = "https://tf-what-is-it-server.herokuapp.com/tf";

const IndexPage = () => {
  const [fileInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [previewSource, setPreviewSource] = useState("");
  const [results, setResults] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (image) => {
    try {
      setIsFetching(true);
      setResults("");
      const response = await Axios.post(apiUrl, {
        image,
      });
      setResults(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="center font-thin">
      <div className="text-5xl my-8 title">
        What in the world is that thing?
      </div>
      <form
        className="flex flex-col justify-items-center container mx-auto max-w-sm"
        name="image-form"
      >
        <label htmlFor="image-picker">
          <div className="text-white font-bold py-2 px-4 rounded m-2 bg-accent-1 cursor-pointer">
            Select An Image
          </div>
          <input
            accept="image/*"
            className="hidden"
            id="image-picker"
            name="image-picker"
            onChange={handleFileInputChange}
            type="file"
            value={fileInput}
          />
        </label>
      </form>
      {previewSource && (
        <div className="m-5">
          <img className="mx-auto max-w-xs" src={previewSource} />
          <button
            className={`${
              isFetching ? "bg-gray-500" : "bg-accent-1"
            } text-white font-bold py-2 px-4 rounded m-5`}
            disabled={isFetching}
            form="image-form"
            onClick={handleSubmitFile}
            type="submit"
          >
            {isFetching ? "Please wait..." : "Submit Photo"}
          </button>
        </div>
      )}
      {results && (
        <p className="text-3xl">
          That looks like some kind of {results[0].className.split(",")[0]} to
          me!
        </p>
      )}
    </div>
  );
};

export default IndexPage;
