import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../features/postsSlice";
import "../../css/post.css";

const Post = ({ data }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(data.title);
  const [titleVS, setTitleVS] = useState(true);

  const [body, setBody] = useState(data.body);
  const [bodyVS, setBodyVS] = useState(true);

  const handleDelete = () => {
    dispatch(actions.deletePost(data.id));
  };

  const saveChangesEvent = () => {
    dispatch(
      actions.updatePost({ id: data.id, title, body, userId: data.userId })
    );
    setTitleVS(true);
    setBodyVS(true);
  };

  const renderTitle = () => {
    return titleVS ? (
      <h4 onClick={() => setTitleVS(false)} className="card-title textHover">
        {data.title}
      </h4>
    ) : (
      <textarea
        rows="2"
        cols="33"
        type="text"
        value={title}
        className="fw-bold text-dark w-100 text-center"
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>
    );
  };

  const renderBody = () => {
    return bodyVS ? (
      <p onClick={() => setBodyVS(false)} className="card-text textHover">
        {data.body}
      </p>
    ) : (
      <textarea
        rows="5"
        cols="33"
        type="text"
        value={body}
        className="text-dark text-center w-100"
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
    );
  };

  const renderSaveChangesBtn = () => {
    if (!titleVS || !bodyVS) {
      return (
        <button onClick={saveChangesEvent} className="btn btn-success btn-sm">
          Save Changes
        </button>
      );
    }
    return "";
  };

  return (
    <div className="card px-0">
      <div className="card-body">
        {renderTitle()}
        {renderBody()}
        {/* <p className="card-text">{data.body}</p> */}
      </div>
      <div
        onClick={() => {
          setTitleVS(true);
          setBodyVS(true);
        }}
        className="card-footer justify-content-end gap-2 d-flex"
      >
        {(!titleVS || !bodyVS) && (
          <span className="text-secondary fst-italic">
            Touch the gray bar release focus
          </span>
        )}
        {renderSaveChangesBtn()}

        <button onClick={handleDelete} className="btn btn-danger btn-sm">
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Post;
