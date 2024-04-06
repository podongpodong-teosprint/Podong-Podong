import { combineSlices, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddlewares) => defaultMiddlewares().concat(),
});

export type TypeAppStore = typeof store;
export type TypeAppDispatch = TypeAppStore['dispatch'];
export type TypeRootState = ReturnType<typeof rootReducer>;
