import { persisted } from "svelte-persisted-store";
import type { IPages } from "../types";

type IData = {
  pages: IPages
};

export const globalStore = persisted<IData>("global", {
  pages: "HOME",
});
