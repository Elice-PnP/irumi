import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as weeklyAgendaAPI from "../api/weeklyAgendaAPI";

//TODO: 뼈대 단계. 점차 필요한 dispatch를 확립하며 완성해 나갈 것.

const initialState = {
  weeklyAgenda: [],
  status: "idle",
  error: null,
};

export const fetchWeeklyAgenda = createAsyncThunk(
  "weeklyAgenda/fetchWeeklyAgenda",
  async (date) => {
    const response = await weeklyAgendaAPI.fetchAgenda(date);
    return response.data;
  }
);

export const toggleTodo = (weekdayNum, todoId) => {
  return async (dispatch) => {
    try {
      await weeklyAgendaAPI.toggleTodo(todoId);
      dispatch(todoToggled(weekdayNum, todoId));
    } catch (err) {
      console.log(err.message);
    }
  };
};

const weeklyAgendaSlice = createSlice({
  name: "weeklyAgenda",
  initialState,
  reducers: {
    todoToggled(state, action) {
      const { weekdayNum, todoId } = action.payload;
      const todo = state.weeklyAgenda[weekdayNum].todos.find(
        (todo) => todo.id === todoId
      );
      if (todo) {
        todo.done = !todo.done;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeeklyAgenda.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeeklyAgenda.fulfilled, (state, action) => {
        state.status = "success";
        state.weeklyAgenda.concat(action.payload);
      })
      .addCase(fetchWeeklyAgenda.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default weeklyAgendaSlice.reducer;
