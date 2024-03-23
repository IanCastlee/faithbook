import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./friendreq.scss";
import { IoLocationSharp } from "react-icons/io5";
import { makeRequest } from "../../../axios";
import { Link } from "react-router-dom";

const FriendReq = () => {
  const queryClient = useQueryClient();

  //K N O C K I N G ===> G E T
  const { isPending, data } = useQuery({
    queryKey: ["knocking"],
    queryFn: () =>
      makeRequest.get("/friendReqs").then((res) => {
        return res.data;
      }),
  });

  //R E L A T I O N S H I P ===> P O S T
  const mutation = useMutation({
    mutationFn: (accept) => makeRequest.post("/friendReqs", accept),

    onSuccess: (data) => {
      console.log("Mutation success:", data);
      queryClient.invalidateQueries({ queryKey: ["knocking"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleAccept = (frID) => {
    mutation.mutate({ frID });
  };

  // H A N D L E  D E L E T E
  const mutationDel = useMutation({
    mutationFn: (frIdDel) =>
      makeRequest.delete("/friendReqs?delFriend=" + frIdDel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knocking"] });
    },
  });

  const handleDel = (frIdDel) => {
    mutationDel.mutate(frIdDel);
  };

  return (
    <div className="knock">
      <div className="knock-container">
        <div className="topK">
          <span className="title">Knocking</span>

          <div className="searchK">
            <input type="text" className="search" placeholder="Search..." />
          </div>
        </div>
        <hr className="hr" />

        {isPending
          ? "loading..."
          : data.map((k) => (
              <div className="knock-wrapper" key={k.id}>
                <div className="img-name-add">
                  <div className="img-name">
                    <img
                      src={
                        k.profilePic === ""
                          ? "../assets/cvp.jpg"
                          : "../upload/" + k.profilePic
                      }
                      alt=""
                      className="img"
                    />
                    <div className="name-adddd">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/profile/${k.id}`}
                      >
                        <span className="name">{k.name}</span>
                      </Link>
                      <span className="add">
                        <IoLocationSharp className="addIcon" />
                        {k.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rightFr">
                  <span className="kyd">Knocking your door</span>
                  <div className="actionK">
                    <button
                      className="btn-unfollow"
                      onClick={() => handleDel(k.id)}
                    >
                      Close
                    </button>
                    <button
                      className="btn-follow"
                      onClick={() => handleAccept(k.id)}
                    >
                      Open
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default FriendReq;
