import { useState, useEffect, useContext, useReducer, useRef } from "react";
import { ThemeContext } from "../../CheerAPeer";
import axios from "axios";
import { notifyFailed, notifySuccess } from "../../../../../assets/toast";

import { MentionsInput, Mention } from "react-mentions";

const CheerAPeerPostComponent = ({
  cheerPosts,
  setCheerPosts,
  setNotif,
  myHeartbits,
  setMyHeartbits,
  bgColor,
  hoverColor,
  disabledColor,
  focusBorder,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [newPost, setNewPost] = useState({
    peer_id: "",
    post_body: "",
    heartbits_given: 0,
    hashtag: ""
  });

  const [peers, setPeers] = useState([]);

  const [heartbits, setHeartbits] = useState([]);

  const postRef = useRef(null);
  const pointsRef = useRef(null);
  const peerRef = useRef(null);
  const btnRef = useRef(null);

  const [value, setValue] = useState("");

  const [isDisabled, setIsDisabled] = useState("");

  //Temporary Mentions
  const [mentionedPeers, setMentionedPeers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const my_peers_res = await axios.get(BASE_URL + "/cap-getMentionPeers");
        setPeers(my_peers_res.data);

        const hashtags_res = await axios.get(BASE_URL + "/cap-getHashtags");
        setHashtags(hashtags_res.data);

        const heartbits_points = await axios.get(BASE_URL + "/cap-getMyHeartbits");
        setHeartbits(heartbits_points.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  //Final Mentions before inserting to database
  const [finalMentions, setFinalMentions] = useState();

  //Hashtags
  const [hashtags, setHashtags] = useState("");
  

  function onAddPeers(id, display) {
    if (!mentionedPeers.includes({ id: id, display: display })) {
      mentionedPeers.push({ id: id, display: display });
      //setMentionedPeers({...mentionedPeers, id: id, display: display})
      console.log("Added to Array:", JSON.stringify(mentionedPeers));
    }
  }

  function finalizeMentions(post) {

    //
    var tempArr = mentionedPeers.reduce((unique, o) => {
      if (!unique.some((obj) => obj.id === o.id && obj.display === o.display)) {
        unique.push(o);

        if (!post.includes(o.display)) {
          unique.pop(o);
          console.log("Popped " + o.display);
        }
      }
      return unique;
    }, []);

    console.log("Final Mentions:", JSON.stringify(finalMentions))

    console.log("Final Hashtags: ", hashtags)

    console.log("Match: ", post.match(/#\w+/g))

    setNewPost({
      ...newPost,
      peer_id: tempArr,
      post_body: post
        .replaceAll("[", "")
        .replaceAll("]", ""),
      hashtags: post.match(/#\w+/g)?.join()
    });

    // if (post.match(/#\w+/g)){
    //   hashMatches = post.match(/#\w+/g);

    //   if (hashMatches.length > 1){
    //     btnRef.current.disabled = true
    //   }
    // }

    console.log("Data to Send:", JSON.stringify(newPost));
    console.log("Peer ID length", newPost.peer_id.length)

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(BASE_URL + "/cap-modifiedCheerAPeer", newPost)
      .then((response) => {
        if (response != null) {
          notifySuccess("Posted successfully!");
          setNotif("success");

          //postRef.current.value = "";
          //postRef.current.value = null;
          // peerRef.current.value = "";
          setValue("")
          pointsRef.current.value = null;
          btnRef.current.disabled = false;

          setMyHeartbits({
            ...myHeartbits,
            heartbits_balance:
              myHeartbits.heartbits_balance  - (newPost.heartbits_given * newPost.peer_id.length),
          });

          if (setCheerPosts != undefined && cheerPosts != undefined) {
            setCheerPosts([response.data[0], ...cheerPosts]);
          }

          setNewPost({
            ...newPost,
            peer_id: [],
            post_body: ""
          });

          // setIsDisabled(false);
          
        } else {
          notifyFailed("Something went wrong!");
          setNotif("error");
        }
      });
  };

  const theme = useContext(ThemeContext);

  return (
    <>
      <div className="box-border bg-white border border-[#E4E4E4] rounded-[15px] p-3 flex-1 flex flex-col gap-8 md:gap-0">
        <div className="box-border gap-2">
          <h2 className="text-[16px] text-[#363636] font-bold mb-5">Create a Cheer Post</h2>

          <flex className="flex flex-row justify-between gap-1">
            <MentionsInput
              name="post_body"
              value={value}
              //ref={postRef}
              placeholder="Mention a peer using '@', Use hashtags using '#"
              //singleLine
              className="border border-[#er4e4e4] text-[14px] rounded-[6px] flex-1"
              onChange={(e) => {
                setValue(e.target.value);
                finalizeMentions(e.target.value);
              }}
            >
              <Mention
                trigger="@"
                name="mentioned_peers"
                markup="@[__display__]"
                data={(search) => {
                  const filteredUsers = peers.filter((p) =>
                    p.display.toLowerCase().includes(search.toLowerCase())
                  );
                  console.log(JSON.stringify(filteredUsers));
                  return filteredUsers;
                }}
                displayTransform={(id, display) => `@${display}`}
                onAdd={onAddPeers}
                appendSpaceOnAdd
              />

              {/* <Mention
                  trigger="#"
                  name="hashtags"
                  markup="#[__display__]"
                  data={hashtags}
                  displayTransform={(display) => `#${display}`}
                  onAdd={onAddTags}
                  appendSpaceOnAdd
                /> */}
              
            </MentionsInput>

            <div className="box-border flex flex-row flex-nowrap justify-between items-center border-[1.3px] border-[#e4e4e4] rounded-[6px] p-1 w-[20%] gap-1">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5"
              >
                <circle cx="10" cy="10" r="10" fill="#FFD336" />
                <circle cx="10.0001" cy="9.99953" r="7.71242" fill="#FFAE36" />
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
                name="heartbits_given"
                type="number"
                onChange={(e) => {
                  setNewPost({
                    ...newPost,
                    heartbits_given: e.target.value,
                  });
                }}
                ref={pointsRef}
                min={1}
                max={myHeartbits}
                className="remove-arrow focus:outline-none text-[#363636] text-[12px] flex-1 w-5"
              />
            </div>
          </flex>

          <button
            onClick={(event) => {handleSubmit(event);
            setIsDisabled(true)}}
            ref={btnRef}
            disabled={
              newPost.peer_id == "" ||
              newPost.post_body == "" ||
              newPost.heartbits_given == 0 ||
              newPost.heartbits_given == "" ||
              newPost.heartbits_given < 1 ||
              heartbits.heartbits_balance == 0 ||
              (newPost.heartbits_given * mentionedPeers.length) > heartbits.heartbits_balance ||
              value.match(/#\w+/g)?.length > 1 
                ? true
                : false
              // || isDisabled
            }
            className={`transition ${bgColor} ${hoverColor} ${disabledColor} flex-1 rounded-[6px] text-white text-[12px] px-3 py-2 w-[100px] leading-none mt-3 float-right`}
          >
            Post
          </button>
        </div>

        {(newPost.heartbits_given * mentionedPeers.length) > heartbits.heartbits_balance && (
          <p className="text-red-500 text-[10px] mt-2">
            Not enough heartbits points
          </p>
        )}

        {value.match(/#\w+/g)?.length > 1  && (
          <p className="text-red-500 text-[10px] mt-2">
            Please only use one hashtag per post.
          </p>
        )}

        
      </div>
    </>
  );
};

export default CheerAPeerPostComponent;
