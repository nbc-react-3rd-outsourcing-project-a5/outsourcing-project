import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, setDoc, getDocs, getDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { festivalRef, db } from 'fb/firebase';
/**
 * CREATE
 * 축제 생성하기 가져오기
 * payload : 축제 데이터
 */
export const __createFestival = createAsyncThunk('createFestival', async (newFestivalData, thunkAPI) => {
  try {
    const { docID, data } = newFestivalData;
    const docRef = doc(db, 'festival', docID);
    await setDoc(docRef, data);

    return thunkAPI.fulfillWithValue(docID);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * READ
 * query로 해당하는 축제들 가져오기
 * payload : 축제 query
 */
export const __getQueryFestivals = createAsyncThunk('getAllFestivals', async (query, thunkAPI) => {
  try {
    const querySnapshot = await getDocs(query);
    const data = querySnapshot.docs.map((doc) => doc.data());

    const serializedData = data.map((item) => ({
      ...item,
      // 타임스탬프 > 날짜 > 문자로 변경
      startDate: item.startDate.toDate().toLocaleDateString(),
      endDate: item.endDate.toDate().toLocaleDateString()
    }));

    return serializedData;
  } catch (error) {
    console.error('Error fetching festivals:', error);

    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * (성공)
 * READ
 * id가 일치하는 축제 가져오기
 * payload : 축제 id
 */
export const __getFestival = createAsyncThunk('getFestival', async (festivalID, thunkAPI) => {
  try {
    const docRef = doc(db, 'festival', festivalID);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    if (docData?.startDate) {
      docData.startDate = String(docData.startDate.toDate());
      docData.endDate = String(docData.endDate.toDate());
    }
    return thunkAPI.fulfillWithValue(docData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * UPDATE
 * id가 일치하는 축제 업데이트
 * payload : 축제 데이터
 */
export const __updateFestival = createAsyncThunk('updateFestival', async (newFestivalData, thunkAPI) => {
  const [docID, updateData] = newFestivalData;
  try {
    const docRef = doc(db, 'festival', docID);
    await updateDoc(docRef, updateData);
    return thunkAPI.fulfillWithValue(updateData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * DELETE
 * id가 일치하는 축제 삭제
 * payload : 축제 id
 */
export const __deleteFestival = createAsyncThunk('deleteFestival', async (festivalID, thunkAPI) => {
  try {
    const docRef = doc(db, 'festival', festivalID);
    await deleteDoc(docRef);
    return thunkAPI.fulfillWithValue(festivalID);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  snapshotFestivals: [],
  targetFestival: null
};

export const festivalSlice = createSlice({
  name: 'festival',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = initialState.error;
      state.isError = initialState.isError;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__createFestival.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__createFestival.fulfilled, (state, action) => {
        state.isLoading = false;
        // TODO : 파일 생성 후 로직
        console.log('업로드 성공');
        console.log(action.payload);
      })
      .addCase(__createFestival.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__getQueryFestivals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getQueryFestivals.fulfilled, (state, action) => {
        if (action.payload) {
          const serializedData = action.payload;
          state.snapshotFestivals = serializedData;
          state.isLoading = false;
        }
      })
      .addCase(__getQueryFestivals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__getFestival.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getFestival.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('action.payload', action.payload);
        return action.payload;
      })
      .addCase(__getFestival.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__updateFestival.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__updateFestival.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(__updateFestival.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__deleteFestival.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__deleteFestival.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(__deleteFestival.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  }
});

export default festivalSlice.reducer;
export const { clearError } = festivalSlice.actions;
