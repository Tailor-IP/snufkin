import { atom } from 'recoil';

export const selectedTaskState = atom({
  key: 'selectedTask',
  default: null,
});

export const editable = atom({
  key: 'editable',
  default: false,
});