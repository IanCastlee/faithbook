import "./profile.scss";
import { MdEdit } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GiShadowFollower } from "react-icons/gi";

import { MdHome } from "react-icons/md";
import { MdSchool } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import { BiLogoMessenger } from "react-icons/bi";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import UserPost from "../../components/UserPosts/UserPost";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import UpdateInfo from "../../components/dropdown/updateUserInfo/UpdateInfo";

const Profile = () => {
  const [cover, setCover] = useState(null);
  const [profileMO, setProfileMo] = useState(null);
  const [option, setOption] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  //////////////////////////////////////

  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  // const location = useLocation();
  // const info = location.state?.Data;

  // // U S E R I N F O ===> G E T

  const {
    isPending,
    error,
    data: userInfo,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      }),
  });

  //U S E R P O S T ===> G E T
  const { isPending: isUPending, data: userPostData } = useQuery({
    queryKey: ["userPosts"],
    queryFn: () =>
      makeRequest.get("/userPosts?userID=" + userId).then((res) => {
        return res.data;
      }),
  });

  //R E L A T I O N S H I P ===> G E T
  const { isPending: isRPending, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      }),
  });

  //R E L A T I O N S H I P ===> P O S T

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
    },
  });

  const handleReload = () => {
    queryClient.invalidateQueries({ queryKey: ["knocking"] });
  };

  //  H A N D L E F O L L O W
  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
    handleReload();
    handleReload();
  };

  // U P D A T E I N F O

  const upload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const coverMutation = useMutation({
    mutationFn: (user) => makeRequest.put("/users/cover", user),
    onSuccess: () => {
      // Invalidate and refetch only the comments for the specific post
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleClickCover = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL
    let coverUrl;
    coverUrl = cover ? await upload(cover) : currentUser.coverPic;
    coverMutation.mutate({ coverPic: coverUrl });
    setCover(null);
  };

  const handleCancel = () => {
    setCover(null);
  };

  //PROFILE PIC

  const profileMutation = useMutation({
    mutationFn: (user1) => makeRequest.put("/users/profile", user1),
    onSuccess: () => {
      // Invalidate and refetch only the comments for the specific post
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleProfile = async (e) => {
    e.preventDefault();
    let profileURL;

    profileURL = profileMO ? await upload(profileMO) : currentUser.profilePic;
    profileMutation.mutate({ profilePic: profileURL });
    setProfileMo(null);
    setOption(!option);
  };

  //L E N G T H   O F  F O L L O W E R  ===> G E T
  const { isPending: isLPending, data: followerLength } = useQuery({
    queryKey: ["followerLength"],
    queryFn: () =>
      makeRequest.get("/relationships/length?userId=" + userId).then((res) => {
        return res.data;
      }),
  });

  return (
    <>
      <div className="profile">
        {isLPending ? (
          "loading..."
        ) : (
          <>
            {userInfo && userInfo.id === userId && (
              <div className="profile-container">
                <div className="profile-top">
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : userInfo.coverPic === ""
                        ? "../assets/cvvp.jpg"
                        : "../upload/" +
                          (userInfo ? userInfo.coverPic : "") +
                          "?timestamp=" +
                          Date.now()
                    }
                    alt=""
                    className="coverPic"
                  />

                  <img
                    src={
                      profileMO
                        ? URL.createObjectURL(profileMO)
                        : userInfo.profilePic == ""
                        ? "../assets/cvp.jpg"
                        : userInfo &&
                          "../upload/" +
                            (userInfo ? userInfo.profilePic : "") +
                            "?timestamp=" +
                            Date.now()
                    }
                    alt=""
                    className="profilePic"
                    onClick={() => setOption(!option)}
                  />
                  <>
                    {option && (
                      <div className="profileOption">
                        <div className="profileOptionWrapper">
                          {
                            <>
                              {currentUser.id === userId ? (
                                profileMO ? (
                                  <>
                                    <label
                                      style={{ backgroundColor: "green" }}
                                      className="btn-pUpdate"
                                      onClick={handleProfile}
                                    >
                                      Update
                                    </label>
                                    <label
                                      className="btn-pUpdate"
                                      style={{ backgroundColor: "gray" }}
                                      onClick={() => setProfileMo(null)}
                                    >
                                      Cancel
                                    </label>
                                  </>
                                ) : (
                                  <label
                                    className="btn-pUpdate"
                                    htmlFor="profile"
                                  >
                                    Update
                                  </label>
                                )
                              ) : (
                                ""
                              )}
                            </>
                          }
                          {profileMO ? (
                            ""
                          ) : (
                            <label className="btn-View">View</label>
                          )}
                        </div>

                        <input
                          type="file"
                          id="profile"
                          style={{ display: "none" }}
                          onChange={(e) => setProfileMo(e.target.files[0])}
                        />
                      </div>
                    )}
                  </>

                  {userId == currentUser.id ? (
                    <div className="edit-wrapper">
                      <>
                        <label
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          htmlFor="cover"
                        >
                          <MdEdit className="edit-cover-icon" />
                        </label>

                        <input
                          type="file"
                          id="cover"
                          style={{ display: "none" }}
                          onChange={(e) => setCover(e.target.files[0])}
                        />
                      </>
                    </div>
                  ) : null}

                  <>
                    {cover && (
                      <div className="btnContainerr">
                        <button
                          className="btn-update"
                          onClick={handleClickCover}
                        >
                          Update
                        </button>
                        <button className="btn-cancel" onClick={handleCancel}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </>
                </div>

                <div className="profile-content">
                  <div className="following-follower">
                    <span className="foll">
                      <span className="foll-count">
                        {followerLength && followerLength.length}
                      </span>
                      <span className="follo">
                        {followerLength && followerLength.length > 1
                          ? "Followers"
                          : "Follower"}
                      </span>

                      {userId === currentUser.id ? (
                        <button className="btn-follow" onClick={handleFollow}>
                          <GiShadowFollower
                            style={{ fontSize: "14px", marginRight: "3px" }}
                          />{" "}
                          View
                        </button>
                      ) : relationshipData &&
                        relationshipData.includes(currentUser.id) ? (
                        <button className="btn-follow" onClick={handleFollow}>
                          <IoIosCheckmarkCircle
                            style={{ fontSize: "14px", marginRight: "3px" }}
                          />{" "}
                          Following
                        </button>
                      ) : (
                        <button className="btn-follow" onClick={handleFollow}>
                          <IoPersonAddSharp
                            style={{ fontSize: "14px", marginRight: "3px" }}
                          />{" "}
                          Follow
                        </button>
                      )}
                    </span>

                    <span className="foll2">
                      {userId === currentUser.id ? (
                        <button
                          className="btn-follow"
                          onClick={() => setUpdateModal(!updateModal)}
                        >
                          <BiSolidEdit style={{ fontSize: "16px" }} /> Update
                        </button>
                      ) : (
                        <Link style={{ textDecoration: "none" }}>
                          <button className="btn-follow">
                            <BiLogoMessenger style={{ fontSize: "16px" }} />{" "}
                            Message
                          </button>
                        </Link>
                      )}
                    </span>
                  </div>

                  <div className="pofile-name">
                    <span className="user-name">{userInfo.name}</span>
                  </div>

                  <div className="bio-container">
                    <div className="bio-wrapper">
                      <div className="other-info">
                        {userInfo.city ? (
                          <span className="list">
                            <MdHome className="l_iconn" /> Lives in{" "}
                            <strong>{userInfo.city}</strong>
                          </span>
                        ) : (
                          ""
                        )}

                        {userInfo.studiedAt ? (
                          <span className="list">
                            <MdSchool className="l_iconn" /> Studied at{" "}
                            <strong>{userInfo.studiedAt}</strong>
                          </span>
                        ) : (
                          ""
                        )}

                        {userInfo.bday ? (
                          <span className="list">
                            <FaBirthdayCake className="l_icon" /> Birthday{" "}
                            <strong>{userInfo.bday}</strong>
                          </span>
                        ) : (
                          ""
                        )}

                        {userInfo.sbday ? (
                          <span className="list">
                            <FaGift className="l_icon" /> Spiritual Birthday{" "}
                            <strong>{userInfo.sbday}</strong>
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="bio">
                        <span className="bio-title">
                          <strong>-</strong> {userInfo.bio_title}
                          <strong>-</strong>{" "}
                        </span>

                        <p className="bio-desc">{userInfo.bio}</p>
                      </div>
                    </div>
                  </div>

                  <div className="profile-buttons">
                    <ul className="btn-list">
                      <li className="item">Post</li>
                      <li className="item">Testemonies</li>
                      <li className="item">Video</li>
                      <li className="item">My Book</li>
                    </ul>
                  </div>

                  {/* <hr className="hrP" /> */}
                  <div className="user-postss">
                    <div className="title-wrapper">
                      <p className="pl"></p>
                      <span className="title2">Posts</span>
                      <p className="pr"></p>
                    </div>
                    <div className="posts_container">
                      <div className="user_posts">
                        {isUPending
                          ? "loadin"
                          : userPostData.map((postData) => (
                              <UserPost post={postData} key={postData.id} />
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {updateModal && (
        <UpdateInfo user={userInfo} setUpdateModal={setUpdateModal} />
      )}
    </>
  );
};

export default Profile;
