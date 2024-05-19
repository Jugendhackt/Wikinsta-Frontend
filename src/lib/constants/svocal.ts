import { localstorage } from "svocal"

type UUID = string

export const favourites = localstorage<UUID[]>("favourites", []);
