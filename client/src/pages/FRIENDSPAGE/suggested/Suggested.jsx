import "./suggested.scss";
import { Link } from "react-router-dom";

import { IoLocationSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";

const Suggested = () => {
  const queryClient = useQueryClient();

  // S U G G E S T  I O N ===> G E T
  const { isPending, data: suggestionData } = useQuery({
    queryKey: ["suggestionn"],
    queryFn: () =>
      makeRequest.get("/friendReqs/suggestion").then((res) => {
        return res.data;
      }),
  });

  //R E L A T I O N S H I P ===> P O S T
  const mutation = useMutation({
    mutationFn: (add) => makeRequest.post("/friendReqs", add),
    onSuccess: (data) => {
      console.log("Mutation success:", data);
      queryClient.invalidateQueries({ queryKey: ["suggestionn"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
  const handleAccept = (frID) => {
    mutation.mutate({ frID });
  };

  return (
    <div className="suggeted">
      <div className="suggeted-container">
        <div className="topS">
          <span className="title">Knock</span>
          <div className="searchS">
            <input type="text" className="search" placeholder="Search..." />
          </div>
        </div>
        <hr className="hr" />

        {isPending
          ? "loading.."
          : suggestionData.map((s) => (
              <div className="suggeted-wrapper" key={s.id}>
                <div className="img-name-add">
                  <div className="img-name">
                    <img
                      src={
                        s.profilePic === ""
                          ? "../assets/cvp.jpg"
                          : "../upload/" + s.profilePic
                      }
                      alt=""
                      className="img"
                    />
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/profile/${s.id}`}
                    >
                      <div className="name-addd">
                        <span className="name">{s.name}</span>
                        <span className="add">
                          {s.city === "" ? (
                            ""
                          ) : (
                            <IoLocationSharp className="addIcon" />
                          )}
                          {s.city}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="actionS">
                  <button
                    className="btn-follow"
                    onClick={() => handleAccept(s.id)}
                  >
                    Knock
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Suggested;
