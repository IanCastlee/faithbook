import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./chat.scss";
import { makeRequest } from "../../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import { useLocation } from "react-router-dom";

import ScrollToBottom from "react-scroll-to-bottom";

import { IoMdSend } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";

import moment from "moment";

const Chat = ({ recieverId }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const queryClient = useQueryClient();

  const { currentUser } = useContext(AuthContext);

  // ///
  const location = useLocation();
  const reciever = location.state?.Reciever;

  //////////// MESSAGE GET ////////////////
  const {
    isPending,
    error,
    data: messageData,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      makeRequest
        .get("/messages?recieverId=" + recieverId)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        }),
  });

  //////////// MESSAGE POST ////////////////

  //SEND MESSAGE
  const mutation = useMutation({
    mutationFn: (newMessage) => makeRequest.post("/messages", newMessage),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  ///////////send img
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

    mutation.mutate({ recieverId, message, img: imgUrl });
    setMessage("");
    setFile(null);
    console.log(":", imgUrl);
  };

  return (
    <div className="chat">
      <div className="top-box">
        <div className="top-right">
          <img
            src={"../upload/" + reciever.profilePic}
            alt=""
            className="img-reciever"
          />
          <span className="reciever-name">{reciever.name}</span>
        </div>
      </div>

      <ScrollToBottom className="message-content">
        {isPending
          ? "loading"
          : messageData.map((m) => (
              <div className="m-wrapper" key={m.message_id}>
                <div className="m-d">
                  <p
                    className={currentUser.id === m.sender_id ? "you" : "other"}
                  >
                    {m.message}
                  </p>
                  {m.sentImage ? (
                    <img
                      src={"../upload/" + m.sentImage}
                      className={
                        currentUser.id === m.sender_id
                          ? "m-img-you"
                          : "m-img-other"
                      }
                    />
                  ) : (
                    ""
                  )}

                  <p
                    className={
                      currentUser.id === m.sender_id ? "you2" : "other2"
                    }
                  >
                    {moment(m.sendAt).fromNow()}
                  </p>
                </div>
              </div>
            ))}
      </ScrollToBottom>

      {messageData && messageData.length === 0 && (
        <span className="noConvo">Start your conversation now</span>
      )}

      <div className="input-wrapper">
        <label htmlFor="file" className="l-wrapper">
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <CiImageOn className="imgIcon" />
        </label>

        <input
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <IoMdSend onClick={handleClick} className="sendIcon" />
      </div>
    </div>
  );
};

export default Chat;
