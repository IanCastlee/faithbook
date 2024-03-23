import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./userStory.scss";

import { MdDelete, MdEdit } from "react-icons/md";
import { MdReport } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const UserStory = () => {
  const [verseIndex, setVerseIndex] = useState(0);
  const [clickedNext, setClickedNext] = useState(false);

  const [menu, setMenu] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const location = useLocation();

  const verseID = parseInt(useLocation().pathname.split("/")[2]);
  //  const storyDataAll = location.state?.storyData; // Access storyData from location state
  // const clickStory = location.state?.clickStory; // Access storyData from location state

  ///////////// GET CLICKED VERSE ////////////
  const { isPending, error, data } = useQuery({
    queryKey: ["verse"],
    queryFn: () =>
      makeRequest.get("/userVerse?verseID=" + verseID).then((res) => {
        return res.data;
      }),
  });

  ///////////// GET ALL VERSE ////////////
  const {
    isPending: isPendingALL,
    error: errorAll,
    data: dataAll,
  } = useQuery({
    queryKey: ["verseAll"],
    queryFn: () =>
      makeRequest.get("/allVerse").then((res) => {
        return res.data;
      }),
  });

  ////////////// DELETE VERSE /////////////////
  const queryClient = useQueryClient();

  const mutationDel = useMutation({
    mutationFn: (vrsID) => makeRequest.delete("/userVerse/" + vrsID),
    onSuccess: () => {
      // Invalidate and refetch only the comments for the specific post
      queryClient.invalidateQueries({ queryKey: ["story"] });
    },
  });

  const showNextVerses = () => {
    if (verseIndex < dataAll.length - 1) {
      setVerseIndex(verseIndex + 1);
      setMenu(false);
      setClickedNext(true); // Set the flag to true when next button is clicked
    }
  };

  const showPreviousVerse = () => {
    if (verseIndex > 0) {
      setVerseIndex(verseIndex - 1);
      setMenu(false);
      setClickedNext(true); // Set the flag to true when next button is clicked
    }
  };

  ////////////////////////DELETE HANDLE//////////////////////////////////////
  const navigate = useNavigate();

  const handleDel = (vrsID) => {
    // mutationDel.mutate(dataAll[verseIndex].id);
    mutationDel.mutate(vrsID);
    setMenu(false);
    navigate("/");
  };

  console.log("currentUser :", currentUser.id);
  console.log("verseID : ", verseID);
  console.log("verseIndex : ", verseIndex);

  return (
    <div className="verse">
      <div className="verse-container">
        {isPending
          ? "loading..."
          : data.map((verse) => (
              <div className="verse-wrapper" key={verse.id}>
                <img
                  src={
                    clickedNext
                      ? dataAll[verseIndex].coverPic === ""
                        ? "../assets/orgcpp.png"
                        : "../upload/" + dataAll[verseIndex].coverPic
                      : verse.coverPic === ""
                      ? "../assets/orgcpp.png"
                      : "../upload/" + verse.coverPic
                  }
                  className="bgImg"
                  alt=""
                />
                <span className="bck" onClick={showPreviousVerse}>
                  <IoIosArrowBack />
                </span>
                <span className="frw" onClick={showNextVerses}>
                  <IoIosArrowForward />
                </span>
                <p className="verse-desc">
                  {clickedNext ? dataAll[verseIndex].verse : verse.verse}
                </p>
                <div className="name-date">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/profile/${verse.userId}`}
                  >
                    <div className="profile-name">
                      <img
                        src={
                          clickedNext
                            ? dataAll[verseIndex].profilePic === ""
                              ? "../assets/cvp.jpg"
                              : "../upload/" + dataAll[verseIndex].profilePic
                            : verse.profilePic === ""
                            ? "../assets/cvp.jpg"
                            : "../upload/" + verse.profilePic
                        }
                        alt=""
                        className="verse-profile"
                      />

                      <span className="vname">
                        {clickedNext ? dataAll[verseIndex].name : verse.name}
                      </span>
                    </div>
                  </Link>

                  <p className="vdate">
                    {clickedNext
                      ? moment(dataAll[verseIndex].createdAt).fromNow()
                      : moment(verse.createdAt).fromNow()}
                  </p>
                </div>

                <>
                  <span className="moreIcon" onClick={() => setMenu(!menu)}>
                    <IoMdMore className="moreIconn" />
                  </span>

                  {menu && (
                    <div className="menuWrapper">
                      {(menu && verse.userId === currentUser.id) ||
                      dataAll[verseIndex].userId === currentUser.id ? (
                        <>
                          <button
                            onClick={() =>
                              handleDel(
                                clickedNext ? dataAll[verseIndex].id : verse.id
                              )
                            }
                          >
                            <MdDelete style={{ color: "red" }} /> Delete post
                          </button>
                          <button>
                            <MdEdit style={{ color: "red" }} /> Edit post
                          </button>
                        </>
                      ) : (
                        <button>
                          <MdReport style={{ color: "red" }} />
                          Report post
                        </button>
                      )}
                    </div>
                  )}
                </>
              </div>
            ))}
      </div>
    </div>

    //       ))}
    // </div>
  );
};

export default UserStory;

// <div className="verse-wrapper">
//   <img src="../assets/dd.jpg" className="bgImg" alt="" />

//   <span className="bck" onClick={showPreviousVerse}>
//     <IoIosArrowBack />
//   </span>

//   <span className="frw" onClick={showNextVerses}>
//     <IoIosArrowForward />
//   </span>

//   <p className="verse-desc">
//     {/* {clickedNext ? storyDataAll[verseIndex].verse : clickStory.verse} */}
//   </p>

//   <div className="name-date">
//     <Link
//       style={{ textDecoration: "none" }}
//       to={`/profile/${clickStory.userId}`}
//     >
//       <div className="profile-name">
//         <img
//           // src={
//           //   clickedNext
//           //     ? storyDataAll[verseIndex].profilePic
//           //     : clickStory.profilePic
//           // }
//           src=""
//           alt=""
//           className="verse-profile"
//         />

//         <span className="vname">
//           {/* {clickedNext
//           ? storyDataAll[verseIndex].name
//           : clickStory.name}
//         {"'s verse of the day"} */}
//         </span>
//       </div>
//     </Link>

//     <p className="vdate">
//       {/* {clickedNext
//       ? moment(storyDataAll[verseIndex].createdAt).fromNow()
//       : moment(clickStory.createdAt).fromNow()} */}
//     </p>
//   </div>
//   <>
//     <span className="moreIcon" onClick={() => setMenu(!menu)}>
//       <IoMdMore />
//     </span>
//     {menu && (
//       <div className="menuWrapper">
//         {menu &&
//           storyDataAll[verseIndex].userId === currentUser.id && (
//             <>
//               <button onClick={handleDel}>
//                 <MdDelete style={{ color: "red" }} /> Delete Verse
//               </button>
//               <button>
//                 <MdReport style={{ color: "red" }} />
//                 Update Verse
//               </button>
//             </>
//           )}

//         {currentUser.id !== storyDataAll[verseIndex].userId ? (
//           <button>
//             <MdReport style={{ color: "red" }} />
//             Report
//           </button>
//         ) : (
//           ""
//         )}
//       </div>
//     )}
//   </>
// </div>

/* <>
<span className="moreIcon" onClick={() => setMenu(!menu)}>
  <IoMdMore />
</span>
{menu && (
  <div className="menuWrapper">
    {menu &&
      storyDataAll[verseIndex].userId === currentUser.id && (
        <>
          <button onClick={handleDel}>
            <MdDelete style={{ color: "red" }} /> Delete Verse
          </button>
          <button>
            <MdReport style={{ color: "red" }} />
            Update Verse
          </button>
        </>
      )}

    {currentUser.id !== storyDataAll[verseIndex].userId ? (
      <button>
        <MdReport style={{ color: "red" }} />
        Report
      </button>
    ) : (
      ""
    )}
  </div>
)}
</> */
