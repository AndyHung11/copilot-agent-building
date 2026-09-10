/* edm/index.js — canonical newsletter location and agent-to-file map (v2) */
const EDM_BASE_URL = new URL("./", document.currentScript.src).href;
const EDM = {
 "A001": {
  "zh": "A001_ExecNewsAggregator.html",
  "cn": "A001_ExecNewsAggregator_CN.html",
  "en": "A001_ExecNewsAggregator_EN.html"
 },
 "A002": {
  "zh": "A002_DailyChallengeAgent.html",
  "cn": "A002_DailyChallengeAgent_CN.html",
  "en": "A002_DailyChallengeAgent_EN.html"
 },
 "A003": {
  "zh": "A003_SWOTAnalysisAgent.html",
  "cn": "A003_SWOTAnalysisAgent_CN.html",
  "en": "A003_SWOTAnalysisAgent_EN.html"
 },
 "A004": {
  "zh": "A004_StatementOfWorkAgent.html",
  "cn": "A004_StatementOfWorkAgent_CN.html",
  "en": "A004_StatementOfWorkAgent_EN.html"
 },
 "A005": {
  "zh": "A005_EventAgent.html",
  "cn": "A005_EventAgent_CN.html",
  "en": "A005_EventAgent_EN.html"
 },
 "A006": {
  "zh": "A006_KnowledgeExtractor.html",
  "cn": "A006_KnowledgeExtractor_CN.html",
  "en": "A006_KnowledgeExtractor_EN.html"
 },
 "A007": {
  "zh": "A007_ScenarioSimulator.html",
  "cn": "A007_ScenarioSimulator_CN.html",
  "en": "A007_ScenarioSimulator_EN.html"
 },
 "A008": {
  "zh": "A008_M365ProjectHelper.html",
  "cn": "A008_M365ProjectHelper_CN.html",
  "en": "A008_M365ProjectHelper_EN.html"
 },
 "A009": {
  "zh": "A009_YourNamesake.html",
  "cn": "A009_YourNamesake_CN.html",
  "en": "A009_YourNamesake_EN.html"
 },
 "A010": {
  "zh": "A010_AIMindsetAgent.html",
  "cn": "A010_AIMindsetAgent_CN.html",
  "en": "A010_AIMindsetAgent_EN.html"
 },
 "A011": {
  "zh": "A011_PromptingMentor.html",
  "cn": "A011_PromptingMentor_CN.html",
  "en": "A011_PromptingMentor_EN.html"
 },
 "A012": {
  "zh": "A012_DocumentClassificator.html",
  "cn": "A012_DocumentClassificator_CN.html",
  "en": "A012_DocumentClassificator_EN.html"
 },
 "A013": {
  "zh": "A013_SMARTGoals.html",
  "cn": "A013_SMARTGoals_CN.html",
  "en": "A013_SMARTGoals_EN.html"
 },
 "A014": {
  "zh": "A014_NDAComparisonAgent.html",
  "cn": "A014_NDAComparisonAgent_CN.html",
  "en": "A014_NDAComparisonAgent_EN.html"
 },
 "A015": {
  "zh": "A015_AgentCrafter.html",
  "cn": "A015_AgentCrafter_CN.html",
  "en": "A015_AgentCrafter_EN.html"
 },
 "A016": {
  "zh": "A016_YourProofreader.html",
  "cn": "A016_YourProofreader_CN.html",
  "en": "A016_YourProofreader_EN.html"
 },
 "A017": {
  "zh": "A017_YourProblemSolver.html",
  "cn": "A017_YourProblemSolver_CN.html",
  "en": "A017_YourProblemSolver_EN.html"
 },
 "A018": {
  "zh": "A018_NewsAggregatorAgent.html",
  "cn": "A018_NewsAggregatorAgent_CN.html",
  "en": "A018_NewsAggregatorAgent_EN.html"
 },
 "A019": {
  "zh": "A019_ChecklistManifestoAgent.html",
  "cn": "A019_ChecklistManifestoAgent_CN.html",
  "en": "A019_ChecklistManifestoAgent_EN.html"
 },
 "A020": {
  "zh": "A020_DealcrafterAgent.html",
  "cn": "A020_DealcrafterAgent_CN.html",
  "en": "A020_DealcrafterAgent_EN.html"
 },
 "A021": {
  "zh": "A021_TrainingContentWriter.html",
  "cn": "A021_TrainingContentWriter_CN.html",
  "en": "A021_TrainingContentWriter_EN.html"
 },
 "A022": {
  "zh": "A022_DecisionArchitect.html",
  "cn": "A022_DecisionArchitect_CN.html",
  "en": "A022_DecisionArchitect_EN.html"
 },
 "A023": {
  "zh": "A023_WellnessProductivityCoach.html",
  "cn": "A023_WellnessProductivityCoach_CN.html",
  "en": "A023_WellnessProductivityCoach_EN.html"
 },
 "A024": {
  "zh": "A024_InnovationRadarAgent.html",
  "cn": "A024_InnovationRadarAgent_CN.html",
  "en": "A024_InnovationRadarAgent_EN.html"
 },
 "A025": {
  "zh": "A025_ProductCrafter.html",
  "cn": "A025_ProductCrafter_CN.html",
  "en": "A025_ProductCrafter_EN.html"
 },
 "A026": {
  "zh": "A026_CoherenceAgent.html",
  "cn": "A026_CoherenceAgent_CN.html",
  "en": "A026_CoherenceAgent_EN.html"
 },
 "A027": {
  "zh": "A027_ResolutionAgent.html",
  "cn": "A027_ResolutionAgent_CN.html",
  "en": "A027_ResolutionAgent_EN.html"
 },
 "A028": {
  "zh": "A028_StorytellingMentor.html",
  "cn": "A028_StorytellingMentor_CN.html",
  "en": "A028_StorytellingMentor_EN.html"
 },
 "A029": {
  "zh": "A029_MarketingAgent.html",
  "cn": "A029_MarketingAgent_CN.html",
  "en": "A029_MarketingAgent_EN.html"
 },
 "A030": {
  "zh": "A030_PeerFeedbackAgent.html",
  "cn": "A030_PeerFeedbackAgent_CN.html",
  "en": "A030_PeerFeedbackAgent_EN.html"
 },
 "A031": {
  "zh": "A031_PresentationOptimizerAgent.html",
  "cn": "A031_PresentationOptimizerAgent_CN.html",
  "en": "A031_PresentationOptimizerAgent_EN.html"
 },
 "A032": {
  "zh": "A032_PorterFiveForcesProfiler.html",
  "cn": "A032_PorterFiveForcesProfiler_CN.html",
  "en": "A032_PorterFiveForcesProfiler_EN.html"
 },
 "A033": {
  "zh": "A033_SayNoCoach2.html",
  "cn": "A033_SayNoCoach2_CN.html",
  "en": "A033_SayNoCoach2_EN.html"
 },
 "A034": {
  "zh": "A034_OKRCoachAgent.html",
  "cn": "A034_OKRCoachAgent_CN.html",
  "en": "A034_OKRCoachAgent_EN.html"
 },
 "A035": {
  "zh": "A035_ABTestingIdeas.html",
  "cn": "A035_ABTestingIdeas_CN.html",
  "en": "A035_ABTestingIdeas_EN.html"
 },
 "A036": {
  "zh": "A036_MeetingRecapCompanion.html",
  "cn": "A036_MeetingRecapCompanion_CN.html",
  "en": "A036_MeetingRecapCompanion_EN.html"
 },
 "A037": {
  "zh": "A037_PolicyAuthorPro.html",
  "cn": "A037_PolicyAuthorPro_CN.html",
  "en": "A037_PolicyAuthorPro_EN.html"
 },
 "A038": {
  "zh": "A038_MonthlyKPIComparator.html",
  "cn": "A038_MonthlyKPIComparator_CN.html",
  "en": "A038_MonthlyKPIComparator_EN.html"
 },
 "A039": {
  "zh": "A039_AgentOfChange.html",
  "cn": "A039_AgentOfChange_CN.html",
  "en": "A039_AgentOfChange_EN.html"
 },
 "A040": {
  "zh": "A040_MeetingPrep.html",
  "cn": "A040_MeetingPrep_CN.html",
  "en": "A040_MeetingPrep_EN.html"
 },
 "A041": {
  "zh": "A041_PolicySimplifier.html",
  "cn": "A041_PolicySimplifier_CN.html",
  "en": "A041_PolicySimplifier_EN.html"
 },
 "A042": {
  "zh": "A042_Evite.html",
  "cn": "A042_Evite_CN.html",
  "en": "A042_Evite_EN.html"
 },
 "A043": {
  "zh": "A043_DevilsAdvocate.html",
  "cn": "A043_DevilsAdvocate_CN.html",
  "en": "A043_DevilsAdvocate_EN.html"
 },
 "A044": {
  "zh": "A044_TeamMoraleAssistant.html",
  "cn": "A044_TeamMoraleAssistant_CN.html",
  "en": "A044_TeamMoraleAssistant_EN.html"
 },
 "A045": {
  "zh": "A045_MonthlyKPIComparator.html",
  "cn": "A045_MonthlyKPIComparator_CN.html",
  "en": "A045_MonthlyKPIComparator_EN.html"
 },
 "A046": {
  "zh": "A046_BusinessCaseBuilder.html",
  "cn": "A046_BusinessCaseBuilder_CN.html",
  "en": "A046_BusinessCaseBuilder_EN.html"
 },
 "A047": {
  "zh": "A047_ProcessOptimizer.html",
  "cn": "A047_ProcessOptimizer_CN.html",
  "en": "A047_ProcessOptimizer_EN.html"
 },
 "A048": {
  "zh": "A048_WorkshopDesigner.html",
  "cn": "A048_WorkshopDesigner_CN.html",
  "en": "A048_WorkshopDesigner_EN.html"
 },
 "A049": {
  "zh": "A049_ArgumentationCoach.html",
  "cn": "A049_ArgumentationCoach_CN.html",
  "en": "A049_ArgumentationCoach_EN.html"
 },
 "A050": {
  "zh": "A050_ExecBriefingBuilder.html",
  "cn": "A050_ExecBriefingBuilder_CN.html",
  "en": "A050_ExecBriefingBuilder_EN.html"
 },
 "A051": {
  "zh": "A051_WorkshopPlanningFacilitator.html",
  "cn": "A051_WorkshopPlanningFacilitator_CN.html",
  "en": "A051_WorkshopPlanningFacilitator_EN.html"
 },
 "A052": {
  "zh": "A052_CopilotVsCoworkGuide.html",
  "cn": "A052_CopilotVsCoworkGuide_CN.html",
  "en": "A052_CopilotVsCoworkGuide_EN.html"
 },
 "A053": {
  "zh": "A053_RequirementsDetective.html",
  "cn": "A053_RequirementsDetective_CN.html",
  "en": "A053_RequirementsDetective_EN.html"
 },
 "A054": {
  "zh": "A054_OnboardingAgent.html",
  "cn": "A054_OnboardingAgent_CN.html",
  "en": "A054_OnboardingAgent_EN.html"
 },
 "A055": {
  "zh": "A055_PersonalChiefOfStaff.html",
  "cn": "A055_PersonalChiefOfStaff_CN.html",
  "en": "A055_PersonalChiefOfStaff_EN.html"
 },
 "A056": {
  "zh": "A056_CustomerFeedbackSynthesizer.html",
  "cn": "A056_CustomerFeedbackSynthesizer_CN.html",
  "en": "A056_CustomerFeedbackSynthesizer_EN.html"
 },
 "A057": {
  "zh": "A057_StrategicOnePager.html",
  "cn": "A057_StrategicOnePager_CN.html",
  "en": "A057_StrategicOnePager_EN.html"
 },
 "A058": {
  "zh": "A058_CopilotCompass.html",
  "cn": "A058_CopilotCompass_CN.html",
  "en": "A058_CopilotCompass_EN.html"
 },
 "A059": {
  "zh": "A059_ContractReviewAgent.html",
  "cn": "A059_ContractReviewAgent_CN.html",
  "en": "A059_ContractReviewAgent_EN.html"
 }
};
