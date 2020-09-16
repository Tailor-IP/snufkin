import { atom } from 'recoil';

export const selectedTaskState = atom({
  key: 'selectedTask',
  default: null,
});

export const editable = atom({
  key: 'editable',
  default: false,
});

export const undoStack = atom({
  key: 'undoStack',
  default: 0,
});

export const redoStack = atom({
  key: 'redoStack',
  default: 0,
});