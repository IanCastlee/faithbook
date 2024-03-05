import { useContext, useState } from "react";
import "./storyinput.scss";
import { AuthContext } from "../../context/authContext";

import { IoCloseOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

import { BiSolidPhotoAlbum } from "react-icons/bi";

const StoryInput = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [close, setClose] = useState(false);

  //POST
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (postVerse) => makeRequest.post("/stories", postVerse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["story"] });
    },
  });

  /////////////////////////////////////////////////
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
    setClose(!close);
  };

  return (
    <div className={`story_wrapper ${close ? "closed" : ""}`}>
      <div className="top_wrapper">
        <div className="share-top">
          <label htmlFor="file" className="share-top-left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <BiSolidPhotoAlbum className="shareIconPhoto" />
            <span>Background Image</span>
          </label>

          <div className="share-top-right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>

        <div className="btn_close_wrapper" onClick={() => setClose(!close)}>
          <IoCloseOutline className="btn_close" />
        </div>
      </div>

      <hr className="hr" />
      <div className="verse_input_wrapper">
        <textarea
          name="verse"
          id=""
          cols="30"
          rows="6"
          placeholder="My verse of the day"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        ></textarea>
      </div>

      <div className="btn_wrapper">
        <button className="btn_post" onClick={handleClick}>
          Post
        </button>
      </div>
    </div>
  );
};

export default StoryInput;
