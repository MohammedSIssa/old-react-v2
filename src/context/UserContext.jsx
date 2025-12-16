import { createContext } from "react";
import { loadUser } from "../scripts/localStorage";

export const UserContext = createContext(loadUser);
