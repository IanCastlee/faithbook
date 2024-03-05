import { useState } from "react";
import "./updateinfo.scss";

//ICON
import { IoCloseOutline } from "react-icons/io5";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { makeRequest } from "../../../axios";

const UpdateInfo = ({ user, setUpdateModal }) => {
  const [close, setClose] = useState(false);

  const queryClient = useQueryClient();

  const [text, setTexts] = useState({
    name: user.name,
    church: user.church,
    lives: user.city,
    sbd: user.sbday,
    bd: user.bday,
    study: user.studiedAt,
    verse_title: user.bio_title,
    verse: user.bio,
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation({
    mutationFn: (userr) => makeRequest.put("/users", userr),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ ...text });
    setUpdateModal(false);
  };

  console.log("Initial text state:", text);

  return (
    <div className="updateInfo">
      <div className="container">
        <div className="wrapper">
          <div className="top-wrapper">
            <span className="title">{`${
              user.name.split(" ")[0]
            }'s Personal Information `}</span>
            <IoCloseOutline
              className="btn-close"
              onClick={() => setUpdateModal(false)}
            />
          </div>

          <hr className="hr" />

          <div className="form">
            <div className="input-wrapper">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={text.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="church">Church</label>
              <input
                type="text"
                id="church"
                name="church"
                value={text.church}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="lives">Lives in</label>
              <input
                type="text"
                id="lives"
                name="lives"
                value={text.lives}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="sbd">Spiritual Birthday</label>
              <input
                type="text"
                id="sbd"
                name="sbd"
                value={text.sbd}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="bd">Birthday</label>
              <input
                type="text"
                id="bd"
                name="bd"
                value={text.bd}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="study">Studied At</label>
              <input
                type="text"
                id="study"
                name="study"
                value={text.study}
                onChange={handleChange}
              />
            </div>
            <hr className="hr2" />

            <div className="bio-wrapper">
              <span className="bio-title">Verse Bio</span>
              <div className="input-verse">
                <input
                  type="text"
                  name="verse_title"
                  placeholder="Title/Verse"
                  value={text.verse_title}
                  onChange={handleChange}
                />
                <textarea
                  name="verse"
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Verse"
                  value={text.verse}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <button className="btn-submit" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfo;
