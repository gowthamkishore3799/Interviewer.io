import z from "zod";

const detailed_explanation = z.object({
    explanation: z.string()
})

export const resumeInterviewFeedback = z.object({
    technical_alignment: detailed_explanation,
    communication_and_clarity: detailed_explanation,
    behavioral_indicators: detailed_explanation,
    resume_alignment: detailed_explanation,
    suggestions_for_improvement: detailed_explanation,
    role_fit_suggestion: detailed_explanation,
    overall_result: detailed_explanation,
});