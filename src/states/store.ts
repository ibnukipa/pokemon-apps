import {configureStore} from '@reduxjs/toolkit';
import ReduxFlipper from 'redux-flipper';
import db from './reducers/db';
import menu from './reducers/menu';

let reduxDebuggerFlipper: any = null;
if (__DEV__) {
  const createDebugger = ReduxFlipper;
  reduxDebuggerFlipper = createDebugger();
}

const store = configureStore({
  reducer: {
    db,
    menu,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(reduxDebuggerFlipper),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
