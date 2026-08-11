interface BuildOpportunityMatchContextParams {
  profile: any;
  resume: any;
  opportunity: any;
}

export function buildOpportunityMatchContext({
  profile,
  resume,
  opportunity,
}: BuildOpportunityMatchContextParams) {
  return {
    student: {
      educationLevel: profile.educationLevel ?? "",
      course: profile.course ?? "",
      specialization: profile.specialization ?? "",
      cgpa: profile.cgpa ?? null,
    },

    resume: {
      overallScore: resume.overallScore,
      atsScore: resume.atsScore,
      strengths: resume.strengths ?? [],
      weaknesses: resume.weaknesses ?? [],
      missingSkills: resume.missingSkills ?? [],
    },

    skills: Array.isArray(profile.skills)
      ? profile.skills.map((skill: any) =>
          typeof skill === "string" ? skill : skill.name || skill.title || ""
        )
      : [],

    interests: Array.isArray(profile.interests)
      ? profile.interests.map((interest: any) =>
          typeof interest === "string" ? interest : interest.name || interest.title || ""
        )
      : [],

    careerGoals: Array.isArray(profile.careerGoals)
      ? profile.careerGoals.map((goal: any) =>
          typeof goal === "string" ? goal : goal.title || goal.name || ""
        )
      : [],

    opportunity: {
      title: opportunity.title ?? "",
      organization: opportunity.organization ?? "",
      description: opportunity.description ?? "",
      requirements: opportunity.requirements ?? [],
      type: opportunity.type ?? "",
      deadline: opportunity.deadline ?? "",
    },
  };
}