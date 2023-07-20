import { atom } from "recoil";

export const menuState = atom<boolean>({
    key: "menu",
    default: false,
});