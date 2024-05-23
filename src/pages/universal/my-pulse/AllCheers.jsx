import { useContext, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const AllRecentCheers = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [cheerPosts, setCheerPosts] = useState([]);

    const [newComment, setNewComment] = useState([]);

    const [newLike, setNewLike] = useState({});

    const [likedPosts, setLikedPosts] = useState([]);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const posts_res = await axios.get(BASE_URL + "/cap-getCheers");
            const liked_posts_res = await axios.get(BASE_URL + "/cap-getAllLikes");
            const comments_res = await axios.get(BASE_URL + "/cap-getAllComments");
            setLikedPosts(liked_posts_res.data);
            setCheerPosts(posts_res.data);
            setComments(comments_res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);

    const handleCommentChange = (i, event) => {
        newComment[i] = {
          cheer_post_id: event.target.id,
          cheer_comment: event.target.value,
        };
        setNewComment([...newComment]);

        console.log(JSON.stringify(newComment))
    };

    const handleCommentSubmit = async (i, event) => {
        await axios
        .post(BASE_URL + "/cap-addCommentToCheerPost", newComment[i])
    };

    // const handleLikeChange = (i, event) => {
    //     // newLike[i] = {
    //     //   cheer_post_id: event.target.id,
    //     // };
    //     // setNewLike([...newLike]);

    //     setNewLike({...newLike, 
    //         post_id: i});

    //     console.log(JSON.stringify(newLike))
    // };

    const handleLikeSubmit = async (i, event) => {
        setNewLike({...newLike, post_id: i});

        console.log(JSON.stringify(newLike))

        
        await axios.post(BASE_URL + "/cap-likeACheerPost", newLike)

        console.log(JSON.stringify(i))

    };

    const handleUnlikeSubmit = async (i, event) => {
        setNewLike({...newLike, post_id: i});

        console.log(JSON.stringify(newLike))

        try {
            await axios.post(BASE_URL + "/cap-unlikeACheerPost",newLike);
            window.location.reload()
        } catch(err){
            console.log(err)
        }

        console.log(JSON.stringify(i))

    };
    

    function checkIfLiked(i){
        return (!JSON.stringify(likedPosts).includes(i))
    }

    
    return(
        <>
        <h1>All Recent Cheers</h1>

        <>
                {cheerPosts.map((cp, i) => (
                  <div className="box-border">
                     <div className="box-border">
                        <p className="text-[15px] text-[#363636] leading-none">
                        {cp.cheerer_f_name + " " + cp.cheerer_s_name}
                        </p>
                        <p className="text-[12px] text-[#8b8b8b] leading-none">
                        {cp.cheerer_job}
                        </p>

                    </div>

                        <p className="text-[15px] text-[#363636] leading-none">
                            {cp.peer_f_name + " " + cp.peer_s_name} 
                        </p>
                        <p className="text-[12px] text-[#8b8b8b] leading-none">
                            {cp.peer_job}
                        </p>
                    <div>

                    <p>{cp.heartbits_given} heartbits </p> 
                    <p className="text-[15px] text-[#363636] leading-none">
                        {moment(cp.posted_at).fromNow()}
                    </p>
                        
                    </div>
                    
                    <div className="box-border">
                        <p className="text-[#363636] font-semibold">
                        {cp.post_body}
                        </p>
                    </div>

                        {comments.map((co, i) => (
                            (cp.cheer_post_id === co.cheer_post_id) &&
                            <div className="box-border">
                                <p>{co.f_name + " " + co.s_name} </p>
                                <p> {moment(co.commented_at).fromNow()}</p>
                                <p className="text-[#363636]">
                                    {co.cheer_comment}
                                </p>
                            </div>
                        ))}

                    <textarea
                      placeholder="Add Comment"
                      onChange={(event) => handleCommentChange(i, event)}
                      name={"survey_answer" + cp.cheer_post_id}
                      id={cp.cheer_post_id}
                    />

                    <div className="box-border flex justify-end">

                    {checkIfLiked(cp.cheer_post_id) 
                    ?  
                    <button
                        name="post_id"
                        onClick={(event) => handleLikeSubmit(cp.cheer_post_id, event)}
                        >
                        <span>Like</span>
                    </button> 
                    :   
                    <button
                        // name="post_id"
                        onClick={(event) => handleUnlikeSubmit(cp.cheer_post_id, event)}
                        >
                        <span>Unlike</span>
                    </button>}
                    

                        <button
                        onClick={(event) => handleCommentSubmit(i, event)}
                        >
                    
                        <span>Submit</span>
                        </button>
                    </div>

                  </div>

                ))}

              </>
        </>
    )
}

export default AllRecentCheers;