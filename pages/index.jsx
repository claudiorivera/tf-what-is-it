import Axios from "axios";
import { useState } from "react";

const IndexPage = () => {
  const [fileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [results, setResults] = useState("");
  const [isFetching, setIsFetching] = useState(false);

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
      const response = await Axios.post("/api/tf", { image });
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
        name="image-form"
        // onSubmit={handleSubmitFile}
        className="flex flex-col justify-items-center container mx-auto max-w-sm"
      >
        <label htmlFor="image-picker">
          <div className="text-white font-bold py-2 px-4 rounded m-2 bg-accent-1 cursor-pointer">
            Select An Image
          </div>
          <input
            className="hidden"
            id="image-picker"
            name="image-picker"
            type="file"
            accent="image/*"
            onChange={handleFileInputChange}
            value={fileInput}
          />
        </label>
      </form>
      {previewSource && (
        <div className="m-5">
          <img className="mx-auto max-w-xs" src={previewSource} />
          <button
            onClick={handleSubmitFile}
            form="image-form"
            className={`${
              isFetching ? "bg-gray-500" : "bg-accent-1"
            } text-white font-bold py-2 px-4 rounded m-5`}
            type="submit"
            disabled={isFetching}
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
