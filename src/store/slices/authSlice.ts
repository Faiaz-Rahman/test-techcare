import { Api_Link } from '@constants'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import ApiService from '@utils/ApiService'
import axios, { AxiosResponse } from 'axios'
import { UserBasicDataType } from 'src/interfaces'

type LoginResponse = {
  message: string
  access_token: string
  user: {
    id: string
    email: string
    name: string
  }
  errors?: {
    message: string
  }
}

export const login = createAsyncThunk(
  Api_Link.loginEndPoint,
  async (
    values: {
      email: string
      password: string
    },
    thunkAPI,
  ) => {
    try {
      const response: AxiosResponse<LoginResponse> = await ApiService.post(
        Api_Link.loginEndPoint,
        JSON.stringify(values),
      )

      if (response.data?.access_token) {
        console.log(
          'data after successful login => async-thunk =>',
          response?.data,
        )

        return response.data
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message =
          (error?.response?.data as LoginResponse)?.errors?.message ||
          'Internal Error'

        throw new Error(message)
      }
    }
  },
)

interface SignupResponse extends LoginResponse {}

export const register = createAsyncThunk(
  '/auth/register',
  async (
    values: {
      email: string
      password: string
      name: string
    },
    thunkAPI,
  ) => {
    try {
      const response: AxiosResponse<SignupResponse> = await ApiService.post(
        Api_Link.registerEndpoint,
        JSON.stringify(values),
      )

      if (response?.data?.access_token) {
        console.log(
          'the access token from register, thunk is =>',
          response?.data?.access_token,
        )

        return response?.data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error?.response?.data?.errors?.email as string
        console.log('error => register => async-thunk =>', message)

        throw new Error(message)
      }
    }
  },
)

const initialState = {
  authLoader: false,
  isLoggedIn: false,
  user: {
    access_token: '',
    userEmail: '',
    userId: '',
    username: '',
  } as UserBasicDataType,
  token: '',
  uid: '',
  userTheme: '',
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthLoader: (state, actions) => {
      state.authLoader = actions.payload
    },
    updateIsLoggedIn: (state, actions) => {
      state.isLoggedIn = actions.payload
    },
    updateUserUid: (state, actions) => {
      state.uid = actions.payload
    },
    logoutUser: (state, actions) => {
      state.user = initialState.user
    },

    updateTheme: (
      state,
      actions: PayloadAction<{ theme: 'light' | 'dark' | '' }>,
    ) => {
      state.userTheme = actions.payload.theme
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.authLoader = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.authLoader = false
    })
    builder.addCase(login.fulfilled, (state, action) => {
      if (action?.payload) {
        state.user.access_token = action?.payload?.access_token
        state.user.userEmail = action?.payload?.user.email
        state.user.userId = action?.payload?.user.id
        state.user.username = action?.payload?.user.name
      }
    })

    builder.addCase(register.pending, (state, action) => {
      state.authLoader = true
    })

    builder.addCase(register.rejected, (state, action) => {
      state.authLoader = false
    })

    builder.addCase(register.fulfilled, (state, action) => {
      if (action?.payload) {
        state.user.access_token = action?.payload?.access_token
        state.user.userEmail = action?.payload?.user.email
        state.user.userId = action?.payload?.user.id
        state.user.username = action?.payload?.user.name
      }
    })
  },
})

export const {
  updateAuthLoader,
  updateIsLoggedIn,
  updateUserUid,
  logoutUser,
  updateTheme,
} = AuthSlice.actions

export default AuthSlice.reducer
