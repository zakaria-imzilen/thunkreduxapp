import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actions,
  fetchPosts,
  returnStatePosts,
  returnStateStatus,
} from "../../features/postsSlice";
import Post from "./post";

export const Posts = () => {
  const dispatch = useDispatch();
  const postsState = useSelector(returnStatePosts);
  const status = useSelector(returnStateStatus);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const renderContent = () => {
    if (status === "pending" || status === "start") {
      return (
        <button className="my-5 btn btn-primary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>{" "}
          Loading...
        </button>
      );
    } else if (status === "fulfilled") {
      alert("Deleted succesfully");
    } else {
      return (
        <header className="container-fluid text-center py-5 px-5 gap-2 m-auto row row-cols-2 row-cols-lg-3 row-cols-xl-4 justify-content-center align-items-center bg-secondary bg-opacity-10">
          {postsState.data?.length > 0
            && postsState.data?.map((post) => <Post key={post.id} data={post} />).reverse()}
        </header>
      );
    }
  };

  return (
    <div>
      <h1 className="display-1 my-5">Posts from an API ⚛</h1>
      {renderContent()}
    </div>
  );
};
