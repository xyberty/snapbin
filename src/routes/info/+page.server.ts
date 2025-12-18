import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        timeoutHours: parseInt(env.ENTRY_TIMEOUT_HOURS || "12", 10)
    };
};

