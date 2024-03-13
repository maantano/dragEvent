import { createContext, Dispatch, SetStateAction } from 'react';

export type MainType = {
  main: boolean;
  setMain: Dispatch<SetStateAction<boolean>>;
};

const MainContext = createContext<MainType>({
  main: false,
  setMain: () => {},
});

export default MainContext;
