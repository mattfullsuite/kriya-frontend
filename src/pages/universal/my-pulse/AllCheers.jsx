import { useState, useEffect, useRef, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import moment from "moment";
import CheerAPeerPostComponent from "./components/cheer-a-peer/CheerAPeerPostComponent";
import { ToastContainer } from "react-toastify";
import Headings from "../../../components/universal/Headings";
import { useNavigate } from "react-router-dom";
import HeartbitsCard from "./components/cheer-a-peer/all-cheer/HeartbitsCard";
import HeartBitsTransactionHistory from "./components/cheer-a-peer/all-cheer/HeartbitsTransactionHistory";
import MyRecentCheersLimited from "./components/cheer-a-peer/all-cheer/MyRecentCheersLimited";

const AllRecentCheers = ({
  bgColor,
  hoverColor,
  disabledColor,
  fillColor,
  textColor,
  accentColor,
  focusBorder,
}) => {
  axios.defaults.withCredentials = true;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const transactionRef = useRef(null);

  const [rawCheers, setRawCheers] = useState([]);

  const navigate = useNavigate();

  const [newComment, setNewComment] = useState([]);

  const [newLike, setNewLike] = useState({});

  const [likedPosts, setLikedPosts] = useState([]);

  const [comments, setComments] = useState([]);
  const [allLikes, setAllLikes] = useState([]);

  const [distinctComments, setDistinctComments] = useState([]);

  const likeBtnRef = useRef([]);
  const likeTextRef = useRef([]);

  const textareaRef = useRef([]);

  const submitBtnRef = useRef([]);

  const [notif, setNotif] = useState("");
  const [myHeartbits, setMyHeartbits] = useState([]);

  const [modalPostData, setModalPostData] = useState(0);
  const [modalDataLikes, setModalDataLikes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.post(BASE_URL + "/cap-createHeartbits");

        const liked_posts_res = await axios.get(BASE_URL + "/cap-getAllLikes");
        const comments_res = await axios.get(BASE_URL + "/cap-getAllComments");
        const likes_res = await axios.get(BASE_URL + "/cap-getAllLikesOfPost");
        const distinct_comments_res = await axios.get(
          BASE_URL + "/cap-getAllDistinctComments"
        );
        const my_heartbits_res = await axios.get(
          BASE_URL + "/cap-getMyHeartbits"
        );
        const posts_res = await axios.get(
          BASE_URL + "/cap-getModifiedCheerPosts"
        );
        //setCheerRecords(posts_res.data);

        setMyHeartbits(my_heartbits_res.data[0]);
        setLikedPosts(liked_posts_res.data);
        setComments(comments_res.data);
        setAllLikes(likes_res.data);
        setDistinctComments(distinct_comments_res.data);

        console.log("data", dataTab);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //change Data in cheer wall

  const [dataTab, setDataTab] = useState(1);

  const [cheerPosts, setCheerPosts] = useState([]);
  const [mostEngagedPosts, setMostEngagedPosts] = useState([]);
  const [myCheerPosts, setMyCheerPosts] = useState([]);

  const [cheerRecords, setCheerRecords] = useState(cheerPosts);

  //Data of Logged In User
  const [profile, setProfile] = useState([]);

  // ---------------- 0 -------------------- //

  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  const fetchData = useCallback(async () => {

    axios
      .get(BASE_URL +
        `/cap-getModifiedPaginatedCheerPosts?offset=${index}0&limit=12`)
      .then((res) => {
        setCheerRecords((prevItems) => [...prevItems, ...res.data.data2]);

        res.data.data2.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));
      
    setIndex((prevIndex) => prevIndex + 1);
  }, [index]);

  const fetchData2 = useCallback(async () => {
    axios
      .get(BASE_URL +
        `/cap-getPaginatedMyCheerPosts?offset=${index}0&limit=12`)
      .then((res) => {
        setMyCheerPosts((prevItems) => [...prevItems, ...res.data.data2]);

        res.data.data2.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));
    setIndex((prevIndex) => prevIndex + 1);
  }, [index]);

  const fetchData3 = useCallback(async () => {
    axios
      .get(BASE_URL +
        `/cap-getPaginatedMostEngagedPosts?offset=${index}0&limit=12`)
      .then((res) => {
        setMostEngagedPosts((prevItems) => [...prevItems, ...res.data.data2])

        res.data.data2.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));
    setIndex((prevIndex) => prevIndex + 1);

  }, [index]);
  

  useEffect(() => {
    axios
      .get(BASE_URL + `/cap-getModifiedPaginatedCheerPosts?offset=10&limit=12`)
      .then((res) => {setCheerPosts(res.data.data2)
                      setCheerRecords(res.data.data2)})
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(BASE_URL + `/cap-getPaginatedMyCheerPosts?offset=10&limit=12`)
      .then((res) => {setMyCheerPosts(res.data.data2)})
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(BASE_URL + `/cap-getPaginatedMostEngagedPosts?offset=10&limit=12`)
      .then((res) => {setMostEngagedPosts(res.data.data2)})
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
        
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        if (dataTab == 1) {
          fetchData();
        } else if (dataTab == 2) {
          fetchData2();
        } else if (dataTab == 3) {
          fetchData3();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile_res = await axios.get(BASE_URL + "/myProfile");
        setProfile(profile_res.data[0]);
        setDataTab(1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const changeDataTab = (dataTab) => {
    if (dataTab === 1) {
      setDataTab(1);
      setCheerRecords(cheerPosts);
    } else if (dataTab === 2) {
      setDataTab(2);
      setCheerRecords(myCheerPosts);
    } else if (dataTab === 3) {
      setCheerRecords(mostEngagedPosts);
      setDataTab(3);
    }
  };

  const openModalData = (postId, numLikes) => {
    setModalPostData(postId);
    setModalDataLikes(numLikes);
    document.getElementById("likes_modal").showModal();
  };

  //Comments

  const handleCommentChange = (i, event) => {
    newComment[i] = {
      cheer_post_id: event.target.id,
      //[event.target.name]: [event.target.value]
      cheer_comment: event.target.value,
      additional_heartbits: event.target.value,
    };
    setNewComment([...newComment]);

    console.log(JSON.stringify(newComment));
  };

  const handleCommentSubmit = async (
    i,
    event,
    fillColor,
    heartbitsGiven,
    numTagged
  ) => {
    event.preventDefault();

    submitBtnRef.current[i].disabled = true;
    submitBtnRef.current[i].classList.remove(fillColor);
    submitBtnRef.current[i].classList.add("fill-slate-200");

    await axios
      .post(BASE_URL + "/cap-addCommentToCheerPost", newComment)
      .then((response) => {
        const newComment = response.data[0];

        console.log(JSON.stringify(newComment));

        setComments([...comments, newComment]);

        setMyHeartbits({
          ...myHeartbits,
          heartbits_balance:
            myHeartbits.heartbits_balance - heartbitsGiven * numTagged,
        });

        textareaRef.current[i].value = "";
        submitBtnRef.current[i].disabled = false;
        submitBtnRef.current[i].classList.add(fillColor);
        submitBtnRef.current[i].classList.remove("fill-slate-200");
      });
  };

  const handleLikeSubmit = async (post_id, index) => {
    console.log(cheerPosts);
    console.log(cheerPosts[index].num_likes);

    const id = {
      post_id: post_id,
    };

    if (
      likeBtnRef.current[index].classList.contains("fill-[#8b8b8b]") ||
      likeTextRef.current[index].classList.contains("text-[#8b8b8b]")
    ) {
      likeBtnRef.current[index].classList.add("fill-blue-500");
      likeBtnRef.current[index].classList.remove("fill-[#8b8b8b]");

      likeTextRef.current[index].classList.add("text-blue-500");
      likeTextRef.current[index].classList.remove("text-[#8b8b8b]");

      const updatedData = cheerPosts.map((post, postIndex) => {
        if (postIndex === index) {
          post.num_likes = post.num_likes + 1;
        }
        return post;
      });

      setCheerPosts(updatedData);

      await axios.post(BASE_URL + "/cap-likeACheerPost", id);
    } else if (
      likeBtnRef.current[index].classList.contains("fill-blue-500") ||
      likeTextRef.current[index].classList.contains("text-blue-500")
    ) {
      likeBtnRef.current[index].classList.remove("fill-blue-500");
      likeBtnRef.current[index].classList.add("fill-[#8b8b8b]");

      likeTextRef.current[index].classList.remove("text-blue-500");
      likeTextRef.current[index].classList.add("text-[#8b8b8b]");

      const updatedData = cheerPosts.map((post, postIndex) => {
        if (postIndex === index) {
          post.num_likes = post.num_likes - 1;
        }
        return post;
      });

      setCheerPosts(updatedData);

      await axios.post(BASE_URL + "/cap-unlikeACheerPost", id);
    }
  };

  //Open Likes Modal

  const [likesDetails, setLikesDetails] = useState([]);

  const handleLikesModal = async (likes, id) => {
    setLikesDetails([]);
    document.getElementById("likes_modal").showModal();

    const idVal = { cheer_post_id: id };

    await axios
      .post(BASE_URL + "/cap-getLikesDetails", idVal)
      .then((response) => {
        setLikesDetails(response.data);

        // setNewTask({ ...newTask, goal_id: id });
        //console.log(JSON.stringify(newTask))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Open Comments Modal

  const [commentsDetails, setCommentsDetails] = useState([]);
  const [postDetails, setPostDetails] = useState([]);

  const handleCommentsModal = async (id) => {
    setPostDetails([]);
    setCommentsDetails([]);
    document.getElementById("comments_modal").showModal();

    const idVal = { cheer_post_id: id };

    await axios
      .post(BASE_URL + "/cap-getPostDetails", idVal)
      .then((response) => {
        setPostDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post(BASE_URL + "/cap-getCommentsDetails", idVal)
      .then((response) => {
        setCommentsDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Others Tagged Modal

  const [taggedDetails, setTaggedDetails] = useState([]);

  const handleTaggedModal = async (id) => {
    setTaggedDetails([]);
    document.getElementById("tagged_modal").showModal();

    const idVal = { cheer_post_id: id };

    await axios
      .post(BASE_URL + "/cap-getTaggedDetails", idVal)
      .then((response) => {
        setTaggedDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-[1300px] m-auto p-5">
      {notif != "" && notif === "success" && <ToastContainer />}
      {notif != "" && notif === "error" && <ToastContainer />}

      <Headings text={"Cheer Wall"} />

      <div className="box-border flex flex-row items-start justify-between gap-8 mt-10">
        <div className="flex flex-col gap-5 flex-1">
          <CheerAPeerPostComponent
            cheerPosts={cheerPosts}
            setCheerPosts={setCheerPosts}
            setNotif={setNotif}
            myHeartbits={myHeartbits}
            setMyHeartbits={setMyHeartbits}
            bgColor={bgColor}
            hoverColor={hoverColor}
            disabledColor={disabledColor}
            focusBorder={focusBorder}
          />

          <div className="flex flex-row justify-between w-[100%]">
            <button
              onClick={() => {
                changeDataTab(1);
              }}
              className={`flex-1 text-[14px] rounded-[8px] py-2 ${
                dataTab === 1 ? ` text-white ${bgColor}` : `text-${bgColor}`
              }`}
              //className={`flex-1 text-[14px] rounded-[8px] text-white bg-[#008080]`}
            >
              All
            </button>

            <button
              onClick={() => {
                changeDataTab(2);
              }}
              className={`flex-1 text-[14px] rounded-[8px] py-2 ${
                dataTab === 2 ? ` text-white ${bgColor}` : `text-${bgColor}`
              }`}
              //className={`flex-1 text-[14px] rounded-[8px] text-white bg-[#008080]`}
            >
              My Cheers
            </button>

            <button
              onClick={() => {
                changeDataTab(3);
              }}
              className={`flex-1 text-[14px] rounded-[8px] py-2 ${
                dataTab === 3 ? ` text-white ${bgColor}` : `text-${bgColor}`
              }`}
            >
              Most Popular
            </button>
          </div>

          <InfiniteScroll
            dataLength={cheerRecords.length}
            next={fetchData}
            hasMore={hasMore}
            // loader={<Loader />}
          >
            <div className="container">
              <div className="row">
                {cheerRecords ? (
                  cheerRecords.map((cp, i) => (
                    <div className="box-border bg-white p-5 pb-0 border border-[#e4e4e4] rounded-[15px] mb-2">
                      <div className="box-border flex flex-row justify-between items-start">
                        <div className="box-border flex flex-row justify-start items center gap-4 items-center">
                          
                          {(cp.cheerer_emp_pic) ?
                          <div
                            className={`box-border flex justify-center items-center w-10 h-10 rounded-full ${bgColor} text-white font-bold relative`}
                          >
                            <img className={`box-border w-10 h-10 rounded-full justify-center items-center`} src={cp.cheerer_emp_pic}/>

                            {(cp.peer_emp_pic) ?
                              <img className={`box-border w-5 h-5 rounded-full justify-center items-center absolute border-2 border-white -bottom-1 -right-2`} src={cp.peer_emp_pic}/>
                              :
                              <p
                              className={`box-border flex justify-center items-center w-5 h-5 text-[8px] rounded-full ${bgColor} text-white font-bold absolute border-2 border-white -bottom-1 -right-2`}
                            >
                              {cp.peer_f_name?.charAt(0) +
                                cp.peer_s_name?.charAt(0)}
                            </p>
                            }
                          </div>
                          : 
                          <p
                            className={`box-border flex justify-center items-center w-10 h-10 rounded-full ${bgColor} text-white font-bold relative`}
                          >
                            {cp.cheerer_f_name?.charAt(0) +
                              cp.cheerer_s_name?.charAt(0)}

                            {(cp.peer_emp_pic) ?
                              <img className={`box-border w-5 h-5 rounded-full justify-center items-center absolute border-2 border-white -bottom-1 -right-2`} src={cp.peer_emp_pic}/>
                              :
                              <p
                              className={`box-border flex justify-center items-center w-5 h-5 text-[8px] rounded-full ${bgColor} text-white font-bold absolute border-2 border-white -bottom-1 -right-2`}
                            >
                              {cp.peer_f_name?.charAt(0) +
                                cp.peer_s_name?.charAt(0)}
                            </p>
                            }
                          </p>
                          }

                          <div className="box-border">
                            <p className="text-[14px] text-[#363636] leading-none">
                              <span className="font-medium">
                                {cp.cheerer_f_name + " " + cp.cheerer_s_name}
                              </span>{" "}
                              cheered{" "}
                              {cp.num_tagged === 1 ? (
                                <span className="font-medium">
                                  {cp.peer_f_name + " " + cp.peer_s_name}
                                </span>
                              ) : (
                                <span className="font-medium">
                                  {cp.peer_f_name}
                                  <span className="font-light"> and </span>
                                  <span
                                    className="font-medium cursor-pointer"
                                    onClick={() => {
                                      handleTaggedModal(cp.cheer_post_id);
                                    }}
                                  >
                                    {" "}
                                    others{" "}
                                  </span>
                                </span>
                              )}
                            </p>

                            <div className="box-border flex flex-row justify-start items-center gap-2 mt-1">
                              <div className="box-border flex flex-row justify-center items-center gap-1">
                                <svg
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4"
                                >
                                  <circle
                                    cx="10"
                                    cy="10"
                                    r="10"
                                    fill="#FFD336"
                                  />
                                  <circle
                                    cx="10.0001"
                                    cy="9.99953"
                                    r="7.71242"
                                    fill="#FFAE36"
                                  />
                                  <path
                                    d="M14.0811 6.82735C13.8046 6.54889 13.4759 6.32782 13.1137 6.17687C12.7516 6.02592 12.3632 5.94805 11.9708 5.94775C11.2287 5.94788 10.5137 6.22671 9.96741 6.72906C9.42113 6.22663 8.70609 5.94778 7.96398 5.94775C7.57118 5.94816 7.18234 6.02627 6.81984 6.17757C6.45734 6.32887 6.12833 6.55038 5.85175 6.82935C4.67205 8.01435 4.67255 9.86782 5.85275 11.0478L9.96741 15.1634L14.0821 11.0478C15.2623 9.86782 15.2628 8.01435 14.0811 6.82735Z"
                                    fill="#FF4F18"
                                  />
                                  <g clip-path="url(#clip0_836_5364)">
                                    <path
                                      d="M13.321 8.89243C13.3088 8.8432 13.2809 8.79928 13.2415 8.76729C13.2022 8.73529 13.1535 8.71694 13.1028 8.71501C13.0521 8.71308 13.0022 8.72768 12.9605 8.75659C12.9189 8.78551 12.8877 8.82718 12.8718 8.87533L12.1256 11.1129L11.4342 9.55686C11.4154 9.5149 11.3847 9.47939 11.3458 9.45475C11.307 9.43011 11.2618 9.41742 11.2158 9.41827C11.1698 9.41912 11.1251 9.43346 11.0872 9.45952C11.0493 9.48558 11.0199 9.5222 11.0026 9.56483L10.5932 10.5888H9.81494V11.0572H10.5932C10.786 11.0572 10.9567 10.9415 11.0279 10.7628L11.2314 10.2541L11.9427 11.8549C11.9806 11.9399 12.0647 11.994 12.157 11.994L12.1682 11.9938C12.2154 11.9915 12.2608 11.975 12.2984 11.9465C12.3361 11.9179 12.3642 11.8786 12.379 11.8338L13.0615 9.78639L13.2908 10.7024C13.3159 10.8038 13.3743 10.8939 13.4567 10.9582C13.5391 11.0225 13.6406 11.0574 13.7451 11.0572H14.499V10.5888H13.7449L13.321 8.89243Z"
                                      fill="#FFAE36"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_836_5364">
                                      <rect
                                        width="5.62091"
                                        height="5.62091"
                                        fill="white"
                                        transform="translate(9.34656 7.77832)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>

                                <p className="text-[12px] text-[#8b8b8b]">
                                  {"+" + cp.hb_given}
                                </p>
                              </div>

                              <span className="text-[#8b8b8b] text-[12px]">
                                •
                              </span>

                              <p className="text-[12px] text-[#8b8b8b]">
                                {moment(cp.posted_at).fromNow()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#8b8b8b]"
                  >
                    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                  </svg>
                </button> */}
                      </div>

                      <div className="box-border my-10">
                        <p
                          className={`text-[#363636] ${
                            cp.post_body.length > 100
                              ? `text-[14px]`
                              : `text-[20px]`
                          }`}
                        >
                          {cp.post_body}
                        </p>
                      </div>

                      <div className="box-border flex flex-row justify-between">
                        <div className="box-border flex flex-row justify-start items-center gap-2">
                          <p
                            className="text-[#8b8b8b] text-[12px] cursor-pointer"
                            //onClick={(cp.num_likes > 0) ? () => {openModalData(cp.cheer_post_id, cp.num_likes)} : null}
                            onClick={
                              cp.num_likes > 0
                                ? () => {
                                    handleLikesModal(
                                      cp.num_likes,
                                      cp.cheer_post_id
                                    );
                                  }
                                : null
                            }
                          >
                            {cp.num_likes} {cp.num_likes > 1 ? "likes" : "like"}
                          </p>

                          {/* You can open the modal using document.getElementById('ID').showModal() method */}
                          <dialog id="likes_modal" className="modal">
                            {likesDetails.length != 0 ? (
                              <div className="modal-box">
                                <form method="dialog">
                                  {/* if there is a button in form, it will close the modal */}
                                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    ✕
                                  </button>
                                </form>

                                {/* <h3 className="font-bold text-lg">{modalDataLikes + " "} {modalDataLikes > 1 ? "likes" : "like"}</h3> */}
                                <h3 className="font-bold text-lg">
                                  {likesDetails.length + " "}{" "}
                                  {likesDetails.length > 1 ? "likes" : "like"}
                                </h3>
                                <hr></hr>

                                {likesDetails.map((l) => (
                                  <div className="mt-5 flex flex-row justify-start items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#666a40] text-white text-[14px] font-medium flex justify-center items-center relative">
                                      <span>{l.f_name.charAt(0)}</span>{" "}
                                    </div>

                                    <div>
                                      <p className="leading-none text-[14px]">
                                        {l.f_name + " " + l.s_name}
                                      </p>
                                      <p className="text-[11px]">
                                        {l.position_name}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex justify-center align-center">
                                <span className="loading loading-spinner loading-lg"></span>
                              </div>
                            )}
                          </dialog>

                          <span className="text-[#8b8b8b] text-[12px]">•</span>

                          <p
                            className="text-[#8b8b8b] text-[12px] cursor-pointer"
                            onClick={
                              cp.num_comments > 0
                                ? () => handleCommentsModal(cp.cheer_post_id)
                                : null
                            }
                          >
                            {cp.num_comments}{" "}
                            {cp.num_comments > 1 ? "comments" : "comment"}
                          </p>
                        </div>
                      </div>

                      <div className="box-border flex flex-row justify-between gap-2 py-1  border-t border-[#e4e4e4]">
                        <button
                          onClick={(event) =>
                            handleLikeSubmit(cp.cheer_post_id, i)
                          }
                          className="box-border flex-1 flex flex-row flex-nowrap justify-center items-center gap-1 rounded-[5px] h-9 transition-all hover:bg-slate-100 active:scale-90"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={
                              likedPosts.some(
                                (obj) => obj.cheer_post_id === cp.cheer_post_id
                              )
                                ? `fill-blue-500 w-4`
                                : `fill-[#8b8b8b] w-4`
                            }
                            ref={(element) => (likeBtnRef.current[i] = element)}
                          >
                            <path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path>
                          </svg>

                          <p
                            className={
                              likedPosts.some(
                                (obj) => obj.cheer_post_id === cp.cheer_post_id
                              )
                                ? `text-blue-500 text-[14px]`
                                : `text-[#8b8b8b] text-[14px]`
                            }
                            ref={(element) =>
                              (likeTextRef.current[i] = element)
                            }
                          >
                            Like
                          </p>
                        </button>

                        <button className="box-border flex flex-1 flex-row flex-nowrap justify-center items-center gap-1 rounded-[5px] h-9 transition hover:bg-slate-100 active:scale-90">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="fill-[#8b8b8b] w-4"
                          >
                            <path d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path>
                          </svg>

                          <p className="text-[#8b8b8b] text-[13px]">Comment</p>
                        </button>
                      </div>

                      {/* You can open the modal using document.getElementById('ID').showModal() method */}
                      <dialog id="tagged_modal" className="modal">
                        {taggedDetails.length != 0 ? (
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>

                            <h3 className="font-bold text-lg">
                              {" "}
                              Tagged People
                            </h3>
                            <hr></hr>

                            {taggedDetails.map((t) => (
                              <div className="mt-5 flex flex-row justify-start items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#666a40] text-white text-[14px] font-medium flex justify-center items-center relative">
                                    {(t.emp_pic) ? 
                                    <img className="w-10 h-10 rounded-full" src={t.emp_pic} />
                                    :
                                    <span>{t.f_name.charAt(0)+t.s_name.charAt(0)}</span>
                                    
                                  }
                                </div>

                                <div>
                                  <p className="leading-none text-[14px]">
                                    {t.f_name + " " + t.s_name}
                                  </p>
                                  <p className="text-[11px]">
                                    {t.position_name}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex justify-center align-center">
                            <span className="loading loading-spinner loading-lg"></span>
                          </div>
                        )}
                      </dialog>

                      {/* You can open the modal using document.getElementById('ID').showModal() method */}
                      <dialog id="comments_modal" className="modal">
                        {postDetails.length != 0 &&
                        commentsDetails.length != 0 ? (
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>

                            {/* post body */}

                            {postDetails.map((po, i) => (
                              <>
                                <div className="box-border flex flex-row justify-between items-start">
                                  <div className="box-border flex flex-row justify-start items center gap-4 items-center">
                                    <p
                                      className={`box-border flex justify-center items-center w-10 h-10 rounded-full ${bgColor} text-white font-bold relative`}
                                    >
                                      {po.cheerer_f_name.charAt(0)}

                                      <p
                                        className={`box-border flex justify-center items-center w-5 h-5 text-[9px] rounded-full ${bgColor} text-white font-bold absolute border-2 border-white -bottom-1 -right-2`}
                                      >
                                        {po.peer_f_name.charAt(0)}
                                      </p>
                                    </p>

                                    <div className="box-border">
                                      <p className="text-[14px] text-[#363636] leading-none">
                                        <span className="font-medium">
                                          {po.cheerer_f_name +
                                            " " +
                                            po.cheerer_s_name}
                                        </span>{" "}
                                        cheered{" "}
                                        {cp.num_tagged === 1 ? (
                                          <span className="font-medium">
                                            {po.peer_f_name +
                                              " " +
                                              po.peer_s_name}
                                          </span>
                                        ) : (
                                          <span className="font-medium">
                                            {po.peer_f_name}
                                            <span className="font-light">
                                              {" "}
                                              and{" "}
                                            </span>
                                            <span
                                              className="font-medium"
                                              // onClick={() => {
                                              //   handleTaggedModal(po.cheer_post_id);
                                              // }}
                                            >
                                              {" "}
                                              others{" "}
                                            </span>
                                          </span>
                                        )}
                                      </p>

                                      <div className="box-border flex flex-row justify-start items-center gap-2 mt-1">
                                        <div className="box-border flex flex-row justify-center items-center gap-1">
                                          <svg
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4"
                                          >
                                            <circle
                                              cx="10"
                                              cy="10"
                                              r="10"
                                              fill="#FFD336"
                                            />
                                            <circle
                                              cx="10.0001"
                                              cy="9.99953"
                                              r="7.71242"
                                              fill="#FFAE36"
                                            />
                                            <path
                                              d="M14.0811 6.82735C13.8046 6.54889 13.4759 6.32782 13.1137 6.17687C12.7516 6.02592 12.3632 5.94805 11.9708 5.94775C11.2287 5.94788 10.5137 6.22671 9.96741 6.72906C9.42113 6.22663 8.70609 5.94778 7.96398 5.94775C7.57118 5.94816 7.18234 6.02627 6.81984 6.17757C6.45734 6.32887 6.12833 6.55038 5.85175 6.82935C4.67205 8.01435 4.67255 9.86782 5.85275 11.0478L9.96741 15.1634L14.0821 11.0478C15.2623 9.86782 15.2628 8.01435 14.0811 6.82735Z"
                                              fill="#FF4F18"
                                            />
                                            <g clip-path="url(#clip0_836_5364)">
                                              <path
                                                d="M13.321 8.89243C13.3088 8.8432 13.2809 8.79928 13.2415 8.76729C13.2022 8.73529 13.1535 8.71694 13.1028 8.71501C13.0521 8.71308 13.0022 8.72768 12.9605 8.75659C12.9189 8.78551 12.8877 8.82718 12.8718 8.87533L12.1256 11.1129L11.4342 9.55686C11.4154 9.5149 11.3847 9.47939 11.3458 9.45475C11.307 9.43011 11.2618 9.41742 11.2158 9.41827C11.1698 9.41912 11.1251 9.43346 11.0872 9.45952C11.0493 9.48558 11.0199 9.5222 11.0026 9.56483L10.5932 10.5888H9.81494V11.0572H10.5932C10.786 11.0572 10.9567 10.9415 11.0279 10.7628L11.2314 10.2541L11.9427 11.8549C11.9806 11.9399 12.0647 11.994 12.157 11.994L12.1682 11.9938C12.2154 11.9915 12.2608 11.975 12.2984 11.9465C12.3361 11.9179 12.3642 11.8786 12.379 11.8338L13.0615 9.78639L13.2908 10.7024C13.3159 10.8038 13.3743 10.8939 13.4567 10.9582C13.5391 11.0225 13.6406 11.0574 13.7451 11.0572H14.499V10.5888H13.7449L13.321 8.89243Z"
                                                fill="#FFAE36"
                                              />
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_836_5364">
                                                <rect
                                                  width="5.62091"
                                                  height="5.62091"
                                                  fill="white"
                                                  transform="translate(9.34656 7.77832)"
                                                />
                                              </clipPath>
                                            </defs>
                                          </svg>

                                          <p className="text-[12px] text-[#8b8b8b]">
                                            {"+" + po.hb_given}
                                          </p>
                                        </div>

                                        <span className="text-[#8b8b8b] text-[12px]">
                                          •
                                        </span>

                                        <p className="text-[12px] text-[#8b8b8b]">
                                          {moment(po.posted_at).fromNow()}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-[#8b8b8b]"
                          >
                            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                          </svg>
                        </button> */}
                                </div>

                                <div className="box-border my-10">
                                  <p
                                    className={`text-[#363636] ${
                                      po.post_body.length > 100
                                        ? `text-[14px]`
                                        : `text-[20px]`
                                    }`}
                                  >
                                    {po.post_body}
                                  </p>
                                </div>

                                <div className="box-border flex flex-row justify-between">
                                  <div className="box-border flex flex-row justify-start items-center gap-2">
                                    <p
                                      className="text-[#8b8b8b] text-[12px]"
                                      //onClick={(cp.num_likes > 0) ? () => {openModalData(cp.cheer_post_id, cp.num_likes)} : null}
                                      onClick={
                                        cp.num_likes > 0
                                          ? () => {
                                              handleLikesModal(
                                                cp.cheer_post_id,
                                                cp.num_likes
                                              );
                                            }
                                          : null
                                      }
                                    >
                                      {cp.num_likes}{" "}
                                      {cp.num_likes > 1 ? "likes" : "like"}
                                    </p>

                                    <span className="text-[#8b8b8b] text-[12px]">
                                      •
                                    </span>

                                    <p
                                      className="text-[#8b8b8b] text-[12px]"
                                      // onClick={
                                      //   cp.num_comments > 0
                                      //     ? () => handleCommentsModal(cp.cheer_post_id)
                                      //     : null
                                      // }
                                    >
                                      {po.num_comments}{" "}
                                      {po.num_comments > 1
                                        ? "comments"
                                        : "comment"}
                                    </p>
                                  </div>
                                </div>

                                <div className="box-border flex flex-row justify-between gap-2 py-1  border-t border-[#e4e4e4]">
                                  <button
                                    onClick={(event) =>
                                      handleLikeSubmit(po.cheer_post_id, i)
                                    }
                                    className="box-border flex-1 flex flex-row flex-nowrap justify-center items-center gap-1 rounded-[5px] h-9 transition-all hover:bg-slate-100 active:scale-90"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      className={
                                        likedPosts.some(
                                          (obj) =>
                                            obj.cheer_post_id ===
                                            po.cheer_post_id
                                        )
                                          ? `fill-blue-500 w-4`
                                          : `fill-[#8b8b8b] w-4`
                                      }
                                      ref={(element) =>
                                        (likeBtnRef.current[i] = element)
                                      }
                                    >
                                      <path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path>
                                    </svg>

                                    <p
                                      className={
                                        likedPosts.some(
                                          (obj) =>
                                            obj.cheer_post_id ===
                                            po.cheer_post_id
                                        )
                                          ? `text-blue-500 text-[14px]`
                                          : `text-[#8b8b8b] text-[14px]`
                                      }
                                      ref={(element) =>
                                        (likeTextRef.current[i] = element)
                                      }
                                    >
                                      Like
                                    </p>
                                  </button>

                                  <button className="box-border flex flex-1 flex-row flex-nowrap justify-center items-center gap-1 rounded-[5px] h-9 transition hover:bg-slate-100 active:scale-90">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      className="fill-[#8b8b8b] w-4"
                                    >
                                      <path d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path>
                                    </svg>

                                    <p className="text-[#8b8b8b] text-[13px]">
                                      Comment
                                    </p>
                                  </button>
                                </div>
                              </>
                            ))}

                            {/* end of post body */}

                            <hr></hr>

                            {commentsDetails.length != 0 && (
                              <div className="box-border border-t border-[#e4e4e4] flex flex-col gap-5 py-5">
                                {commentsDetails.map((co, i) => (
                                  <div className="box-border flex flex-row flex-nowrap justify-start items-start gap-2">
                                    <p
                                      className={`box-border flex justify-center items-center w-10 h-10 rounded-full ${bgColor} text-white font-bold`}
                                    >
                                      {co.f_name.charAt(0)}
                                    </p>

                                    {/* <div className="box-border bg-slate-100 p-2 rounded-[12px] rounded-tl-[3px] min-w-[220px] max-w-[500px]"> */}
                                    <div className="box-border bg-slate-100 p-2 rounded-[12px] rounded-tl-[3px] min-w-[220px] max-w-[700px]">
                                      <div className="box-border mb-3">
                                        <p className="text-[14px] text-[#363636] font-medium leading-none">
                                          {co.f_name + " " + co.s_name}
                                        </p>

                                        <div className="flex flex-row justify-start items-center gap-2">
                                          {/* Additional Heartbits Container */}

                                          {co.additional_heartbits && (
                                            <div className="flex flex-row justify-center items-center gap-1">
                                              <svg
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4"
                                              >
                                                <circle
                                                  cx="10"
                                                  cy="10"
                                                  r="10"
                                                  fill="#FFD336"
                                                />
                                                <circle
                                                  cx="10.0001"
                                                  cy="9.99953"
                                                  r="7.71242"
                                                  fill="#FFAE36"
                                                />
                                                <path
                                                  d="M14.0811 6.82735C13.8046 6.54889 13.4759 6.32782 13.1137 6.17687C12.7516 6.02592 12.3632 5.94805 11.9708 5.94775C11.2287 5.94788 10.5137 6.22671 9.96741 6.72906C9.42113 6.22663 8.70609 5.94778 7.96398 5.94775C7.57118 5.94816 7.18234 6.02627 6.81984 6.17757C6.45734 6.32887 6.12833 6.55038 5.85175 6.82935C4.67205 8.01435 4.67255 9.86782 5.85275 11.0478L9.96741 15.1634L14.0821 11.0478C15.2623 9.86782 15.2628 8.01435 14.0811 6.82735Z"
                                                  fill="#FF4F18"
                                                />
                                                <g clip-path="url(#clip0_836_5364)">
                                                  <path
                                                    d="M13.321 8.89243C13.3088 8.8432 13.2809 8.79928 13.2415 8.76729C13.2022 8.73529 13.1535 8.71694 13.1028 8.71501C13.0521 8.71308 13.0022 8.72768 12.9605 8.75659C12.9189 8.78551 12.8877 8.82718 12.8718 8.87533L12.1256 11.1129L11.4342 9.55686C11.4154 9.5149 11.3847 9.47939 11.3458 9.45475C11.307 9.43011 11.2618 9.41742 11.2158 9.41827C11.1698 9.41912 11.1251 9.43346 11.0872 9.45952C11.0493 9.48558 11.0199 9.5222 11.0026 9.56483L10.5932 10.5888H9.81494V11.0572H10.5932C10.786 11.0572 10.9567 10.9415 11.0279 10.7628L11.2314 10.2541L11.9427 11.8549C11.9806 11.9399 12.0647 11.994 12.157 11.994L12.1682 11.9938C12.2154 11.9915 12.2608 11.975 12.2984 11.9465C12.3361 11.9179 12.3642 11.8786 12.379 11.8338L13.0615 9.78639L13.2908 10.7024C13.3159 10.8038 13.3743 10.8939 13.4567 10.9582C13.5391 11.0225 13.6406 11.0574 13.7451 11.0572H14.499V10.5888H13.7449L13.321 8.89243Z"
                                                    fill="#FFAE36"
                                                  />
                                                </g>
                                                <defs>
                                                  <clipPath id="clip0_836_5364">
                                                    <rect
                                                      width="5.62091"
                                                      height="5.62091"
                                                      fill="white"
                                                      transform="translate(9.34656 7.77832)"
                                                    />
                                                  </clipPath>
                                                </defs>
                                              </svg>
                                              <span className="text-[12px] text-[#8b8b8b]">
                                                +{co.additional_heartbits}
                                              </span>
                                            </div>
                                          )}

                                          {co.additional_heartbits && (
                                            <span className="text-[#8b8b8b] text-[12px]">
                                              •
                                            </span>
                                          )}

                                          <p className="text-[12px] text-[#8b8b8b]">
                                            {moment(co.commented_at).fromNow()}
                                          </p>
                                        </div>
                                      </div>

                                      <p className="text-[14px] text-[#363636]">
                                        {co.cheer_comment}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex justify-center align-center">
                            <span className="loading loading-spinner loading-lg"></span>
                          </div>
                        )}
                      </dialog>

                      {/* <Accordion>
                <AccordionItem>
                  {({ open }) => (
                    <>
                      <AccordionHeader>
                        {distinctComments.map(
                          (dc, i) =>
                            cp.cheer_post_id === dc.cheer_post_id && (
                              <p
                                className={`accordion-title text-[14px] text-[#363636] font-medium leading-none mb-5`}
                              >
                                {!open ? <h1
                                onClick={handleCommentsModal(cp.cheer_post_id, cp.num_likes)}>View comments</h1> : null}
                              </p>
                            )
                        )}
                      </AccordionHeader>

                      <AccordionBody>
                        {commentsDetails.length != 0 && (
                          <div className="box-border border-t border-[#e4e4e4] flex flex-col gap-5 py-5">
                            {commentsDetails.map((co, i) => (
                              <div className="box-border flex flex-row flex-nowrap justify-start items-start gap-2">
                                <p
                                  className={`box-border flex justify-center items-center w-10 h-10 rounded-full ${bgColor} text-white font-bold`}
                                >
                                  {co.f_name.charAt(0)}
                                </p>

                                <div className="box-border bg-slate-100 p-2 rounded-[12px] rounded-tl-[3px] min-w-[220px] max-w-[500px]">
                                  <div className="box-border mb-3">
                                    <p className="text-[14px] text-[#363636] font-medium leading-none">
                                      {co.f_name + " " + co.s_name}
                                    </p>

                                    <p className="text-[12px] text-[#8b8b8b]">
                                      {moment(co.commented_at).fromNow()}
                                    </p>
                                  </div>

                                  <p className="text-[14px] text-[#363636]">
                                    {co.cheer_comment}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </AccordionBody>
                    </>
                  )}
                </AccordionItem>
              </Accordion> */}

                      <div className="box-border flex flex-row justify-between items-start gap-2 mb-5">
                        <p
                          className={`box-border flex justify-center items-center w-10 h-10 rounded-full ${bgColor} text-white font-bold relative`}
                        >
                          {(profile.emp_pic) ? <img className={`box-border w-10 h-10 rounded-full`} src={profile.emp_pic}/>
                          : 
                          profile.f_name?.charAt(0) +
                          profile.s_name?.charAt(0) }
                          
                        </p>

                        <div className="box-border flex-1">
                          <textarea
                            className={`w-full bg-slate-100 resize-none rounded-[12px] text-[14px] text-[#363636] p-3 outline-none`}
                            onChange={(event) => {
                              //handleCommentChange(i, event)}
                              setNewComment({
                                ...newComment,
                                cheer_post_id: cp.cheer_post_id,
                                cheer_comment: event.target.value,
                              });
                              console.log(JSON.stringify(newComment));
                            }}
                            ref={(element) =>
                              (textareaRef.current[i] = element)
                            }
                            //name={"survey_answer" + cp.cheer_post_id}
                            name="cheer_comment"
                            id={cp.cheer_post_id}
                            placeholder="Write a comment..."
                          />

                          <div className="flex flex-row justify-end gap-2">
                            {/* Additional Heartbits Container */}
                            <div className="flex flex-row justify-center items-center border border-[#e4e4e4] gap-2 p-1 rounded-[8px]">
                              <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5"
                              >
                                <circle cx="10" cy="10" r="10" fill="#FFD336" />
                                <circle
                                  cx="10.0001"
                                  cy="9.99953"
                                  r="7.71242"
                                  fill="#FFAE36"
                                />
                                <path
                                  d="M14.0811 6.82735C13.8046 6.54889 13.4759 6.32782 13.1137 6.17687C12.7516 6.02592 12.3632 5.94805 11.9708 5.94775C11.2287 5.94788 10.5137 6.22671 9.96741 6.72906C9.42113 6.22663 8.70609 5.94778 7.96398 5.94775C7.57118 5.94816 7.18234 6.02627 6.81984 6.17757C6.45734 6.32887 6.12833 6.55038 5.85175 6.82935C4.67205 8.01435 4.67255 9.86782 5.85275 11.0478L9.96741 15.1634L14.0821 11.0478C15.2623 9.86782 15.2628 8.01435 14.0811 6.82735Z"
                                  fill="#FF4F18"
                                />
                                <g clip-path="url(#clip0_836_5364)">
                                  <path
                                    d="M13.321 8.89243C13.3088 8.8432 13.2809 8.79928 13.2415 8.76729C13.2022 8.73529 13.1535 8.71694 13.1028 8.71501C13.0521 8.71308 13.0022 8.72768 12.9605 8.75659C12.9189 8.78551 12.8877 8.82718 12.8718 8.87533L12.1256 11.1129L11.4342 9.55686C11.4154 9.5149 11.3847 9.47939 11.3458 9.45475C11.307 9.43011 11.2618 9.41742 11.2158 9.41827C11.1698 9.41912 11.1251 9.43346 11.0872 9.45952C11.0493 9.48558 11.0199 9.5222 11.0026 9.56483L10.5932 10.5888H9.81494V11.0572H10.5932C10.786 11.0572 10.9567 10.9415 11.0279 10.7628L11.2314 10.2541L11.9427 11.8549C11.9806 11.9399 12.0647 11.994 12.157 11.994L12.1682 11.9938C12.2154 11.9915 12.2608 11.975 12.2984 11.9465C12.3361 11.9179 12.3642 11.8786 12.379 11.8338L13.0615 9.78639L13.2908 10.7024C13.3159 10.8038 13.3743 10.8939 13.4567 10.9582C13.5391 11.0225 13.6406 11.0574 13.7451 11.0572H14.499V10.5888H13.7449L13.321 8.89243Z"
                                    fill="#FFAE36"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_836_5364">
                                    <rect
                                      width="5.62091"
                                      height="5.62091"
                                      fill="white"
                                      transform="translate(9.34656 7.77832)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>

                              <input
                                name="additional_heartbits"
                                type="number"
                                placeholder="0"
                                onChange={(event) => {
                                  setNewComment({
                                    ...newComment,
                                    cheer_post_id: cp.cheer_post_id,
                                    additional_heartbits: event.target.value,
                                  });
                                  console.log(JSON.stringify(newComment));
                                }}
                                min={1}
                                id={cp.cheer_post_id}
                                className="remove-arrow focus:outline-none text-[#363636] text-[12px] leading-none w-[30px]"
                              />
                            </div>

                            <button
                              onChange={(event) => {
                                setNewComment({
                                  ...newComment,
                                  cheer_post_id: cp.cheer_post_id,
                                  submit: "yes",
                                });
                                console.log(JSON.stringify(newComment));
                              }}
                              onClick={(event) =>
                                handleCommentSubmit(
                                  i,
                                  event,
                                  fillColor,
                                  newComment.additional_heartbits,
                                  cp.num_tagged
                                )
                              }
                              disabled={
                                (newComment.additional_heartbits * cp.num_tagged) > myHeartbits.heartbits_balance ||
                                newComment.cheer_comment?.length == 0
                                  ? true
                                  : false
                              }
                              className={`${fillColor} ${disabledColor} disabled:cursor-not-allowed`}
                              ref={(element) =>
                                (submitBtnRef.current[i] = element)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className={`w-5 h-5`}
                              >
                                <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
                              </svg>
                            </button>
                          </div>

                          {newComment.additional_heartbits * cp.num_tagged >
                            myHeartbits.heartbits_balance && (
                            <p className="text-red-500 text-[10px] mt-2">
                              Not enough heartbits points
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mt-[20%] flex justify-center align-center">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                )}
              </div>
            </div>
          </InfiniteScroll>
        </div>

        <div className="w-[350px] sticky max-h-screen overflow-y-auto top-5">
          <div className="flex flex-col gap-5">
            <HeartbitsCard myHeartbits={myHeartbits} />

            <HeartBitsTransactionHistory transactionRef={transactionRef} />

            <MyRecentCheersLimited bgColor={bgColor}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRecentCheers;
