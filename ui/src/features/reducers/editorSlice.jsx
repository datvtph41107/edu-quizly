import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    editorMoute: false,
    content: '',
    valueContentLength: '',
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
        setEditorMoute: (state, action) => {
            state.editorMoute = action.payload;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        setValueContentLength: (state, action) => {
            state.valueContentLength = action.payload;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(verifyBankAccount.pending, (state, action) => {
        //     state.status = 'loadingBank';
        // });
    },
});

export const createIdentity = createAsyncThunk('main/createIdentity', async (request, thunkAPI) => {
    const { data } = request;
    console.log(data);

    const formattedData = {
        full_name: data?.kyc_name,
        id_number: data?.kyc_id,
        country: data?.country,
        id_front: data?.front_id[0],
        id_back: data?.back_id[0],
    };
    console.log(formattedData);

    try {
        const response = await httpRequest.postChannel('channel/create-identity', formattedData);
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message });
    }
});

export const { showLoading, hideLoading, setEditorMoute, setContent, setValueContentLength } = editorSlice.actions;
export default editorSlice.reducer;
