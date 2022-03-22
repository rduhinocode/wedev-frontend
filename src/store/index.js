import { createStore } from "vuex";
import { auth } from "@/store/auth.module";
import { common } from "@/store/common.module";

const store = createStore({
    modules: {
        auth,
        common
    },
});

export default store;