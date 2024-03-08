import { useContext, useState } from "react";
import "./dropdown.scss";

import { LuMoreHorizontal } from "react-icons/lu";
import { MdZoomOutMap } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Chat from "../../pages/CHAT/chat/Chat";

const Dropdown = ({ setMessageBox }) => {
  const queryClient = useQueryClient();

  const [close, setClose] = useState(false);
  const [chatbox, setChatbox] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClose = () => {
    setClose(!close);
  };

  //F R I E N D S ===> G E T
  const { isPending, data: friendata } = useQuery({
    queryKey: ["allFriend"],
    queryFn: () =>
      makeRequest.get("/friendReqs/friends").then((res) => {
        return res.data;
      }),
  });

  const handleClick = (id) => {
    setChatbox(!chatbox);
    setSelectedId(id);
  };

  return (
    <div className="d-wrapper" onClick={() => setMessageBox(true)}>
      <div className="top-wrapper">
        <div className="top-left">
          <span className="top-left-title">Connected</span>
        </div>
        <div className="top-right">
          <LuMoreHorizontal className="topIcon" />
          <MdZoomOutMap className="topIcon" />
        </div>
      </div>
      <div className="search-wrapperrr">
        <CiSearch className="searchIcon" />
        <input type="text" placeholder="Search user" className="search" />
      </div>
      <span className="online-title">Active</span>
      <div className="online-friend-wrapper">
        <div className="online-friend">
          {isPending
            ? "loading"
            : friendata.map((fd) => (
                <div className="online-info" key={fd.id}>
                  <img
                    src={
                      fd.profilePic === ""
                        ? "../assets/cvp.jpg"
                        : "../upload/" + fd.profilePic
                    }
                    alt=""
                    className="online-img"
                  />
                  <span className="online-name">{fd.name.split(" ")[0]}</span>
                </div>
              ))}
        </div>
      </div>

      <div className="chat-content">
        <div className="chat-continer">
          {isPending
            ? "loading.."
            : friendata.map((f) => (
                <div
                  className="chat-wrapper"
                  onClick={() => handleClick(f.userId)}
                  key={f.id}
                >
                  <img
                    src={
                      f.profilePic === ""
                        ? "../assets/cvp.jpg"
                        : "../upload/" + f.profilePic
                    }
                    className="chat-img"
                    alt=""
                  />
                  <div className="chat-name-desc">
                    <span className="chat-name">{f.name}</span>
                    <p className="chat-desc">HAhahahhahahahah</p>
                  </div>
                  {chatbox && <Chat selectedId={selectedId} />}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
