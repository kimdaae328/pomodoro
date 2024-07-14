import { atom } from "recoil";

export const timerState = atom({
  key: "timerState",
  default: {
    minutes: 25,
    seconds: 0,
    start: false,
    timer: null,
  },
});

export const roundsState = atom({
  key: "roundsState",
  default: 0,
});

export const goalsState = atom({
  key: "goalsState",
  default: 0,
});
