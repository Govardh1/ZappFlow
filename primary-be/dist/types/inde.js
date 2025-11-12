import { z } from "zod";
export const signupSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(6),
    name: z.string()
});
export const signinSchema = z.object({
    username: z.string(),
    password: z.string(),
});
//# sourceMappingURL=inde.js.map