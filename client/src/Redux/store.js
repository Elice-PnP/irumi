import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import weeklyAgendaReducer from "./weeklyAgendaSlice";

export default configureStore({
  reducer: {
    user: userReducer, // state.user 생성
    weeklyAgenda: weeklyAgendaReducer, // state.weeklyAgenda 생성
  },
});
