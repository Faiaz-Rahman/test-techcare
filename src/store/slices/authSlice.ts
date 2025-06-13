import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// export const userLogin = createAsyncThunk(
//   API_LINK.hitLoginLink,
//   async (
//     values: {
//       email: string;
//       password: string;
//     },
//     thunkAPI,
//   ) => {
//     try {
//       const response = await ApiService.post(API_LINK.hitLoginLink, values);

//       if (response.data?.role[0] === 'customer') {
//         return response;
//       } else {
//         throw new Error('Sorry! This is not a customer account.');
//       }
//     } catch (error: any) {
//       throw new Error('Sorry! This is not a customer account.');
//     }
//   },
// );

// type SignupResponse = {
//   success: boolean;
//   message: string;
// };

// export const userSignup = createAsyncThunk(
//   'auth/api/registration',
//   async (values: any, thunkAPI) => {
//     try {
//       const response: AxiosResponse<SignupResponse> = await ApiService.post(API_LINK.hitRegisterLink, values);
//       return response;
//     } catch (error) {
//       console.log(error);
//     }
//   },
// );

interface UserDataType {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  financialInstitution: string;
  accountType: string;
  routingNo: string;
  accNo: string;
  ssn: string;
  branchOfService: string;
}

export interface UserBasicDataType {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
}

export interface UserBasicAddressInfoType {
  street: string;
  unitNumber: string;
  city: string;
  province: string;
  zipCode: string;
}

export type authType = {
  authLoader: boolean;
  isLoggedIn: boolean;
  user: any;
  token: string;
  uid: string;
  userAddress: UserBasicAddressInfoType;
};

const initialState = {
  authLoader: false,
  isLoggedIn: false,
  user: {
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
  } as UserBasicDataType,
  userAddress: {
    street: '',
    unitNumber: '',
    city: '',
    province: '',
    zipCode: '',
  } as UserBasicAddressInfoType,
  token: '',
  uid: '',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthLoader: (state, actions) => {
      state.authLoader = actions.payload;
    },
    updateIsLoggedIn: (state, actions) => {
      state.isLoggedIn = actions.payload;
    },
    updateUserUid: (state, actions) => {
      state.uid = actions.payload;
    },
    logoutUser: (state, actions) => {
      state.user = initialState.user;
    },
    updateUserData: (state, actions) => {
      state.user.email = actions.payload.email;
      state.user.dob = actions.payload.dob;
      state.user.firstName = actions.payload.firstName;
      state.user.lastName = actions.payload.lastName;
      state.user.phone = actions.payload.phone;
    },
    updateUserAddress: (state, actions) => {
      state.userAddress.city = actions.payload.city;
      state.userAddress.street = actions.payload.street;
      state.userAddress.province = actions.payload.province;
      state.userAddress.unitNumber = actions.payload.unitNumber;
      state.userAddress.zipCode = actions.payload.zipCode;
    },
  },
  extraReducers(builder) {},
});

export const {
  updateAuthLoader,
  updateIsLoggedIn,
  updateUserUid,
  logoutUser,
  updateUserData,
  updateUserAddress,
} = AuthSlice.actions;

export default AuthSlice.reducer;
