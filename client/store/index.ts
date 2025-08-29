/* eslint-disable no-undef */
/*
 * @description: configure redux store
 */

import devStore from "./ConfigureStore.dev";
import prodStore from "./ConfigureStore.prod";

export default import.meta.env.NODE_ENV === "production" ? prodStore : devStore;
