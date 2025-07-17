import z from "zod";
import { outputFormatMap } from "./responseFormat";

const stepResponse = z.object({
  explanation: z.string(),
  score: z.string(),
});

const jobRes = z.object({
  job_title: z.string(),
  company: z.string(),
  location: z.string(),
  duration: z.string(),
  responsibilities: z.string(),
});

const education = z.object({
  degree: z.string(),
  institution: z.string(),
  location: z.string(),
  duration: z.string(),
});

const projects = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
});

const resumeInfo = z.object({
  name: z.string(),
  content: z.object({
    email: z.string(),
    phone: z.string(),
    linkedin: z.string(),
    portfolio: z.string(),
  }),
  summary: z.string(),
  experience: z.array(jobRes),
  education: z.array(education),
  skills: z.array(z.string()),
  projects: z.array(projects),
});

const ats_resume_analysis = z.object({
  keyword_content_match: stepResponse,
  experience_relevance_achievement: stepResponse,
  ats_readability: stepResponse,
  visual_layout_design: stepResponse,
  grammar_consistency: stepResponse,
  overall_score: stepResponse,
  summary_feedback: stepResponse,
  recommended_keywords: stepResponse,
});

const detailedExplanation = z.object({
  parsed_resume: resumeInfo,
  ats_analysis: ats_resume_analysis,
});


type OutputFormatMap = typeof outputFormatMap;
type OutputFormatTypes = {
  [K in keyof OutputFormatMap]: z.infer<OutputFormatMap[K]>;
};



export { OutputFormatTypes, detailedExplanation };

