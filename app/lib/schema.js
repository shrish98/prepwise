import { z } from "zod";

export const onboardingSchema = z.object({
    industry: z.string({
        required_error: "Please Select an industry",
    }),

    subIndustry: z.string({
        required_error: "Please Select a speacialization"
    }),
    bio: z.string().max(500).optional(),
    experience: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(
            z.number()
                .min(0, "Experience must be a positive number")
                .max(50, "Experience must be less than 50")
        ),
    skills: z.string().transform((val) =>
        val
            ? val.split(",").map((skill) => skill.trim())
                .filter(Boolean)
            : undefined
    ),

});