import { createEntityClient } from "../utils/entityWrapper";
import schema from "./Fern.json";
export const Fern = createEntityClient("Fern", schema);
