import { atom } from 'recoil';

export const boardsAtom = atom({
  key: 'views/boards/list',
  default: [],
});

export const boardAtom = atom({
  key: 'views/boards/item',
  default: null,
});
