/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";
import * as userAPI from "../api/userAPI";

// TODO: console.log 에러 메시지 제대로 핸들링하기

// 로그인 API를 호출하는 thunk
export const logInUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(setLoginStatus("idle"));
      const user = await userAPI.logInUser(email, password);
      dispatch(setCurrentUser(user));
    } catch (err) {
      dispatch(setLoginStatus("fail"));
      console.log("로그인 실패: ", err.message);
    }
  };
};

// 로그아웃 API thunk
export const logOutUser = () => {
  return async (dispatch) => {
    try {
      await userAPI.logOutUser();
      dispatch(setCurrentUser(null));
      dispatch(setLoginStatus("idle"));
    } catch (err) {
      console.log("로그아웃 에러: ", err.message);
    }
  };
};

export const signUpUser = (email, password, name, nickname) => {
  return async (dispatch) => {
    try {
      const newUser = { email, password, name };
      if (nickname) newUser["nickname"] = nickname;
      const user = await userAPI.signUpUser(newUser);
      dispatch(setCurrentUser(user));
      dispatch(setLoginStatus("success"));
    } catch (err) {
      console.log("회원가입 에러: ", err.message);
    }
  };
};

/**
 * status의 값은 세가지로 'idle, success, fail'이 있다.
 * 로그인 성공했을 경우 'success'를, 실패했을 경우 'fail'로 status 변경.
 * status에 따라서 유저에게 메시지를 띄워주는 용도.
 * ('아이디와 비밀번호를 확인해주세요' 등)
 */
export const userSlice = createSlice({
  name: "user",
  initialState: {
    loginStatus: "idle",
    currentUser: null,
    error: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.loginStatus = "success";
      state.currentUser = action.payload;
    },
    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
    },
  },
});

export default userSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
