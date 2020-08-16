import { atom } from 'recoil';

export const selectedTaskState = atom({
  key: 'selectedTask',
  default: null,
});

