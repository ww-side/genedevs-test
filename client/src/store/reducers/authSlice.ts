import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegistrationSliceState {
  username: string;
  password: string;
}

const initialState: RegistrationSliceState = {
  username: '',
  password: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export default authSlice.reducer;
