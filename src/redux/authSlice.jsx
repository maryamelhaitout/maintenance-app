import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const users=[
  {id:1,name:"Maryam",email:"maryam@gmail.com",password:"abcd"},
];

// Simuler une API d'authentification
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    const { email, password } = credentials;

    // Vérifie si l'utilisateur existe
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: "fake-jwt-token",
      };
    } else {
      return thunkAPI.rejectWithValue("Identifiants incorrects");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, error: null, loading: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    modifyUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }; // Met à jour l'utilisateur connecté
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, modifyUser } = authSlice.actions;
export default authSlice.reducer;
