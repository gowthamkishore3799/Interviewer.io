import { resumeInterviewFeedback } from "./interviewFeedback";
import { detailedExplanation } from "./outputFormatATS";
import { resumeFormat } from "./outputFormatInterview";

export const outputFormatMap={
    "ats": detailedExplanation,
    "interview": resumeFormat,
    "interviewFeedback": resumeInterviewFeedback,
  }