import "./friend.scss";
import { makeRequest } from "../../../axios.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Friend = () => {
  const queryClient = useQueryClient();

  //F R I E N D S ===> G E T
  const { isPending, data: friendata } = useQuery({
    queryKey: ["allFriend"],
    queryFn: () =>
      makeRequest.get("/friendReqs/friends").then((res) => {
        return res.data;
      }),
  });

  // H A N D L E  D E L E T E
  const mutationDel = useMutation({
    mutationFn: (frIdDelMain) =>
      makeRequest.delete("/friendReqs/delFriend?delFriendMain=" + frIdDelMain),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFriend"] });
      queryClient.invalidateQueries({ queryKey: ["knocking"] });
    },
  });

  const handleDel = (frIdDelMain) => {
    mutationDel.mutate(frIdDelMain);
    console.log("clicked DE");
  };

  console.log(friendata);

  return (
    <div className="friend">
      <div className="friend-container">
        <div className="topF">
          <span className="title">Mate</span>
          <div className="searchF">
            <input
              type="text"
              className="search"
              placeholder="Search Friend.."
            />
          </div>
        </div>
        <hr className="hr" />

        {isPending
          ? "loading..."
          : friendata.map((f) => (
              <div className="friend-wrapper" key={f.id}>
                <div className="img-name">
                  <img
                    src={
                      f.profilePic === ""
                        ? "../assets/cvp.jpg"
                        : "../upload/" + f.profilePic
                    }
                    alt=""
                    className="img"
                  />
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/profile/${f.userId}`}
                  >
                    {" "}
                    <span className="name">{f.name}</span>
                  </Link>
                </div>

                <div className="action">
                  <button
                    className="btn-unfollow"
                    onClick={() => handleDel(f.userId)}
                  >
                    Unfollow
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Friend;
