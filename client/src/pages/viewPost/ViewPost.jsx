import { useLocation } from "react-router-dom";
import "./viewpost.scss";

const ViewPost = () => {
  const location = useLocation();
  const postID = parseInt(useLocation().pathname.split("/")[2]);
  const postt = location.state?.Postt;

  console.log(postID);
  console.log("s", postt);
  return (
    <div className="viewPost">
      <div className="view-container">
        {postt.id === postID && (
          <div className="view-wrapper">
            <img src={"../upload/" + postt.img} alt="" className="post-img2" />

            <span className="desc">{postt.descr}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
