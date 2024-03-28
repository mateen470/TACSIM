import { createSlice } from '@reduxjs/toolkit';

export const SimulationSlice = createSlice({
  name: 'selectedSimulation',
  initialState: {
    team: [],
  },
  reducers: {
    teamData: (state, action) => {
      state.team.push(action.payload);
    },
  },
});

export const { teamData } = SimulationSlice.actions;
export default SimulationSlice.reducer;
