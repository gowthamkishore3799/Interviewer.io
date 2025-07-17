import z from "zod";


const resumeFormat = z.object({
    "type": z.string(),
  "questionNo": z.string(),
  "response": z.string(),
  "status": z.string(),
  "formattedUserresponse": z.string(),
})

export { resumeFormat };
