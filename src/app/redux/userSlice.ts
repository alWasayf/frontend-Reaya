import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const API_URL = "http://0.0.0.0:3001/api";

export interface Individual {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  numOfChild?: number;
  address?: string;
  id?: string;
  type?: string;
}

export interface Babysitter {
  id?: string;
  age?: number;
  firstName?: string;
  hourlyPrice?: number;
  lastName?: string;
  nationality?: string;
  phoneNumber?: string;
  skills?: string;
  experience?: number;
  isPhoneVerified?: boolean;
  noOfRates?: number;
  totalRates?: number;
  avatar?: string;
}

export interface User {
  numOfChild?: number;
  address?: string;
  type?: string;
  id?: string;
  age?: number;
  firstName?: string;
  hourlyPrice?: number;
  lastName?: string;
  nationality?: string;
  phoneNumber?: string;
  skills?: string;
  experience?: number;
  isPhoneVerified?: Boolean;
  noOfRates?: number;
  totalRates?: number;
  isIndividual?: boolean;
  avatar?: string;
}

export interface Appointment {
  individual: Individual;
  babysitter: Babysitter;
  status: string;
  isRated: boolean;
  numOfChildren?: number;
  address?: string;
}
export interface UserStateInterface {
  currentUser: User;
  currentNanny: Babysitter;
  currentAppointment: Appointment;
  individuals?: Array<Individual>;
  babysitters: Array<Babysitter>;
  appointments?: Array<Appointment>;
  isLoading: boolean;
  isIndividual: boolean;
  isLoggedIn: boolean;
  error: string;
}

export const createNannyAsync: any = createAsyncThunk(
  "user/createNannyAsync",
  async (data, thunkAPI) => {
    console.log("🚀 ~ data", data);
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      const toPassToServer = Object.assign({}, data) as Individual;

      const res: any = await axios.post(
        `${API_URL}/babysitter/add/`,
        toPassToServer
      );
      console.log("🚀 ~ res", res.data);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createIndividualAsync: any = createAsyncThunk(
  "user/createIndividualAsync",
  async (data, thunkAPI) => {
    console.log("🚀 ~ data", data);
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      const toPassToServer = Object.assign({}, data) as Individual;

      const res: any = await axios.post(
        `${API_URL}/individual/add/`,
        toPassToServer
      );
      console.log("🚀 ~ res", res.data);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginAsync: any = createAsyncThunk(
  "user/loginAsync",
  async (data: any, thunkAPI) => {
    const { phoneNumber } = data;

    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      const res: any = await axios.post(`${API_URL}/user/`, {
        phoneNumber,
      });
      console.log("🚀 ~ res", res.data);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// book an appointment
export const bookAppointmentAsync: any = createAsyncThunk(
  "user/bookAppointmentAsync",
  async (data: any, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      const res: any = await axios.post(`${API_URL}/appointment/make/`, data);
      console.log("🚀 ~ res", res.data);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// update current user [individual or nanny]

export const updateUserAsync: any = createAsyncThunk(
  "user/updateUserAsync",
  async (data: any, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;

    const { currentUser } = getState() as UserStateInterface;
    const { isIndividual } = currentUser as typeof currentUser;
    try {
      const res: any = await axios.put(
        `${API_URL}/${isIndividual ? "individual" : "babysitter"}/update/`,
        data
      );
      console.log("🚀 ~ res", res.data);

      return res.data;
    } catch (error: any) {
      console.log("🚀 ~ error", error);
      return rejectWithValue(error.message);
    }
  }
);

// get all the nannies
export const getNanniesAsync: any = createAsyncThunk(
  "user/getNanniesAsync",
  async (data, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      const res: any = await axios.get(`${API_URL}/babysitter/all/`);
      console.log("🚀 ~ res", res.data);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get all appointments
export const getAppointmentsAsync: any = createAsyncThunk(
  "user/getAppointmentsAsync",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res: any = await axios.get(`${API_URL}/appointment/all/`);
      console.log("🚀 ~ res", res.data);

      return res.data;
    } catch (error: any) {
      console.log("🚀 ~ error", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState: UserStateInterface = {
  currentUser: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    numOfChild: 0,
    address: "",
    id: "",
  },
  currentNanny: {
    id: "",
    age: 0,
    firstName: "",
    hourlyPrice: 0,
    lastName: "",
    nationality: "",
    phoneNumber: "",
    skills: "",
    experience: 0,
    isPhoneVerified: false,
    noOfRates: 0,
    totalRates: 0,
  },
  currentAppointment: {
    individual: {},
    babysitter: {},
    status: "",
    isRated: false,
    numOfChildren: 0,
    address: "",
  },
  individuals: [],
  babysitters: [],
  appointments: [],
  isLoading: false,
  isIndividual: false,
  isLoggedIn: false,
  error: "",
};

export const userSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.currentUser = action.payload;
    },
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    loginIndividual: (state, action) => {
      state.currentUser = action.payload;
      state.isIndividual = true;
      state.isLoggedIn = true;
    },
    loginBabysitter: (state, action) => {
      state.currentUser = action.payload;
      state.isIndividual = false;
      state.isLoggedIn = true;
    },
    setCurrentNanny: (state, action) => {
      state.currentNanny = action.payload;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    logout: (state) => {
      state.currentUser = initialState.currentUser;
      state.currentNanny = initialState.currentNanny;
      state.currentAppointment = initialState.currentAppointment;

      state.appointments = initialState.appointments;
      state.babysitters = initialState.babysitters;
      state.individuals = initialState.individuals;

      state.isIndividual = false;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: {
    // createNannyAsync
    [createNannyAsync.pending]: (state: any, action: any) => {
      state.isLoading = true;
    },
    [createNannyAsync.fulfilled]: (state: any, action: any) => {
      state.currentUser = action.payload?.user;
      state.isLoading = false;
    },
    [createNannyAsync.rejected]: (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // createIndividualAsync
    [createIndividualAsync.pending]: (state: any, action: any) => {
      state.isLoading = true;
    },
    [createIndividualAsync.fulfilled]: (state: any, action: any) => {
      state.currentUser = action.payload?.user;
      state.isLoading = false;
    },
    [createIndividualAsync.rejected]: (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // loginAsync
    [loginAsync.pending]: (state: any, action: any) => {
      state.isLoading = true;
    },
    [loginAsync.fulfilled]: (state: any, action: any) => {
      state.currentUser = action.payload?.user;
      state.isIndividual = action.payload?.type === "individual";
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [loginAsync.rejected]: (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    // getNanniesAsync
    [getNanniesAsync.pending]: (state: any, action: any) => {
      state.isLoading = true;
    },
    [getNanniesAsync.fulfilled]: (state: any, action: any) => {
      // state.babysitters = action.payload;
      state.isLoading = false;
    },
    [getNanniesAsync.rejected]: (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // bookAppointmentAsync
    [bookAppointmentAsync.pending]: (state: any, action: any) => {
      state.isLoading = true;
    },
    [bookAppointmentAsync.fulfilled]: (state: any, action: any) => {
      state.appointments = action.payload;
      state.isLoading = false;
    },
    [bookAppointmentAsync.rejected]: (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // getAppointmentsAsync
    [getAppointmentsAsync.pending]: (state: any, action: any) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [getAppointmentsAsync.fulfilled]: (state: any, action: any) => {
      return {
        ...state,
        appointments: action.payload,
        isLoading: false,
      };
    },
    [getAppointmentsAsync.rejected]: (state: any, action: any) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    //
  },
  // updateUserAsync
  [updateUserAsync.pending]: (state: any, action: any) => {
    state.isLoading = true;
  },
  [updateUserAsync.fulfilled]: (state: any, action: any) => {
    state.currentUser = action.payload;
  },
  [updateUserAsync.rejected]: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createNannyAsync.pending, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: true,
  //       };
  //     })
  //     .addCase(createNannyAsync.fulfilled, (state, action) => {
  //       return {
  //         ...state,
  //         currentUser: action.payload?.user,
  //         isLoading: false,
  //       };
  //     })
  //     .addCase(createNannyAsync.rejected, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: action.payload,
  //       };
  //     })
  //     .addCase(createIndividualAsync.pending, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: true,
  //       };
  //     })
  //     .addCase(createIndividualAsync.fulfilled, (state, action) => {
  //       return {
  //         ...state,
  //         currentUser: action.payload?.user,
  //         isLoading: false,
  //       };
  //     })
  //     .addCase(createIndividualAsync.rejected, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: action.payload,
  //       };
  //     })

  //     .addCase(bookAppointmentAsync.pending, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: true,
  //       };
  //     })
  //     .addCase(bookAppointmentAsync.fulfilled, (state, action) => {
  //       return {
  //         ...state,
  //         appointments: action.payload,
  //         isLoading: false,
  //       };
  //     })
  //     .addCase(bookAppointmentAsync.rejected, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: action.payload,
  //       };
  //     })
  //     .addMatcher(loginAsync.pending, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: true,
  //       };
  //     })
  //     .addMatcher(loginAsync.fulfilled, (state, action) => {
  //       return {
  //         ...state,
  //         currentUser: action.payload?.user,
  //         isIndividual: action.payload?.type === "individual",
  //         isLoggedIn: true,
  //         isLoading: false,
  //       };
  //     })
  //     .addMatcher(loginAsync.rejected, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: action.payload,
  //       };
  //     })
  //     .addMatcher(getNanniesAsync.pending, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: true,
  //       };
  //     })
  //     .addMatcher(getNanniesAsync.fulfilled, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         babysitters: action.payload,
  //       };
  //     })
  //     .addMatcher(getNanniesAsync.rejected, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: action.payload,
  //       };
  //     })

  //     .addMatcher(getAppointmentsAsync.pending, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: true,
  //       };
  //     })
  //     .addMatcher(getAppointmentsAsync.fulfilled, (state, action) => {
  //       return {
  //         ...state,
  //         appointments: action.payload,
  //         isLoading: false,
  //       };
  //     })
  //     .addMatcher(getAppointmentsAsync.rejected, (state, action) => {
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: action.payload,
  //       };
  //     });
  // },
});

export const { createUser, logout, login, setCurrentNanny, setCurrentUser } =
  userSlice.actions;
export default userSlice.reducer;
