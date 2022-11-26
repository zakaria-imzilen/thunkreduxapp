import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "start",
    error: null,
    data: [],
    postDeletedId: null,
  },
  reducers: {
    deletePost: (state, action) => {
      return {
        ...state,
        data: state.data.filter((post) => post.id !== action.payload),
      };
    },
    updatePost: (state, payload) => {
      // const updatedPost = state.data.filter((post) => post.id === payload.id);
      // updatedPost[0].title = payload.title;
      // updatedPost[0].body = payload.body;

      console.log(payload.payload.title);

      return {
        ...state,
        status: "updated",
        data: [
          ...state.data.filter((post) => post.id !== payload.payload.id),
          payload.payload,
        ],
      };

      // state = {
      //   ...state,
      //   status: "success",
      //   data: [...state.data, updatedPost],
      // };
      // return {
      // };
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "pending";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.status = "failed";
      state.error = "Something went wrong";
    },
  },
});

export const returnStatePosts = (state) => state.posts;
export const returnStateStatus = (state) => state.posts.status;
export const actions = postsSlice.actions;

export default postsSlice.reducer;
