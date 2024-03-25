import { useContext, useState } from "react";
import "./right.scss";
import { AuthContext } from "../../context/authContext";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
const Right = () => {
  const [frID, setfrID] = useState("");

  const queryClient = useQueryClient();

  //K N O C K I N G ===> G E T
  const { isPending, data: dataKnocking } = useQuery({
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
      queryClient.invalidateQueries({ queryKey: ["allFriend"] });
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
    <div className="rightbar">
      <div className="rightbar-container">
        <div className="right-column1">
          <span className="bday-title">Birthday</span>
          <div className="col1-wrapper">
            <img src="../assets/gift.png" alt="" className="bdy-img" />
            <div className="bday-wrapper">
              <span className="bdy-name">
                Today is <strong>Naruto's </strong>birthday
              </span>
              <span className="bdy-name">
                Today is <strong>Eyhan's</strong> spiritual birthday
              </span>
            </div>
          </div>
        </div>

        {dataKnocking && dataKnocking.length === 0 ? (
          ""
        ) : (
          <div className="right-column2">
            <div className="knock-title">Knocking</div>

            {isPending
              ? "loading"
              : dataKnocking &&
                dataKnocking.map((k) => (
                  <div key={k.rId}>
                    <div className="knock-wrapper">
                      <div className="knock-info">
                        <img
                          src={
                            k.profilePic === ""
                              ? "../assets/cvp.jpg"
                              : "../upload/" + k.profilePic
                          }
                          alt=""
                          className="knockimg"
                        />
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/profile/${k.id}`}
                          state={{ Data: k }}
                        >
                          <span className="knock-name">{k.name} </span>
                        </Link>
                      </div>
                      <div className="btn-knock">
                        <button
                          className="btn-open"
                          onClick={() => handleAccept(k.id)}
                        >
                          Open
                        </button>
                        <button
                          className="btn-close"
                          onClick={() => handleDel(k.id)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        )}
        <div className="right-column3"></div>
      </div>
    </div>
  );
};

export default Right;
