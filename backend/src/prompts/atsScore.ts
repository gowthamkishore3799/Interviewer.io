export const atsScorePrompt = ({role, title, about, qualification}: {role: string, title: string, about: string, qualification: string}): string => {
  let atsPrompt = 
    `
    I want you to act as an advanced **Applicant Tracking System (ATS)** and **Resume Parser** for evaluating job applications.
    
    You will be given:
    
    * A **resume** (text extracted or PDF content),
    * A **job description**, including role, about, and qualification.
    
    ---
Your task is to parse resume and return the data in below format
    
    ### 🔍 TASK 1: Parse Resume -  If any section is missing in the resume, use an empty string or empty array.
   ### 📊 TASK 2: ATS Resume Scoring -     Analyze and score the resume against the job description using the following 5 categories:

   For scoring ats score:
    1. Keyword & Content Match (Score out of 10):
    - Match job-specific skills (hard and soft), role titles, and technologies.
    - Highlight missing or weak keyword matches.

    2. Experience Relevance & Achievement Focus (Score out of 10):
    - Are experiences tailored to the job?
    - Are they achievement-oriented (metrics, action verbs)?

    3. ATS-Readable Format (Score out of 10):
    - Are there issues with tables, columns, or images?
    - Are section headings standard (e.g., "Work Experience", "Skills")?

    4. Visual Layout and Design (Score out of 10):
    - Is it clean, minimal, and scannable by ATS?
    - No graphics, overly fancy fonts, or colors?
    - Basic pointers is fine, just lines or images should be considered as reducing scannability
    - Penalize if the resume is exported as a double-page layout or has formatting that reduces scannability or professionalism.

    5. Grammar and Consistency (Score out of 10):
    - Are there grammar issues, inconsistent dates, or formatting?

    6. Overall ATS Score (Total out of 100):
    - Give a final score with justification.
    - Highlight areas for improvement with suggested rewrites or formatting changes.

   
    
    Extract the following information from the resume and format it in **JSON**:
    
    {
      "parsed_resume": {
        "name": "",
        "contact": {
          "email": "",
          "phone": "",
          "linkedin": "",
          "portfolio": ""
        },
        "summary": "",
        "experience": [
          {
            "job_title": "",
            "company": "",
            "location": "",
            "duration": "",
            "responsibilities": []
          }
        ],
        "education": [
          {
            "degree": "",
            "institution": "",
            "location": "",
            "duration": ""
          }
        ],
        "skills": ["", "", "", ""],
        "projects": [
          {
            "title": "",
            "description": "",
            "technologies": [""]
          }
        ],
        "awards": [""],
        "certifications": [""],
        "publications": [""]
      },
"ats_analysis" : "ats_analysis": {
        "keyword_content_match": {
          "explanation": "...",
          "score": 0
        },
        "experience_relevance_achievement": {
          "explanation": "...",
          "score": 0
        },
        "ats_readability": {
          "explanation": "...",
          "score": 0
        },
        "visual_layout_design": {
          "explanation": "...",
          "score": 0
        },
        "grammar_consistency": {
          "explanation": "...",
          "score": 0
        },
        "overall_score": {
          "explanation": "...",
          "score": 0
        },
        "summary_feedback": {
          "decision": "proceed" | "no",
          "explanation": "..."
        }
      }

    }
    

    
    #### Scoring Notes:
    
    * Score each out of **10**
    * 'overall_score' should be **out of 100**
    * Keep explanations short and clear
    
    ---
    
    ### 📝 Input Format:
    
    You will be provided the following:
    
    * **Job Description**: \ ${role}
    * **ROLE**: \ ${title}
    * **ABOUT**: \ ${about}
    * **QUALIFICATION**: \ ${qualification}
    * **RESUME**:  
    `
  return atsPrompt;
};
