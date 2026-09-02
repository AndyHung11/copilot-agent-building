/* edm/index.js — canonical newsletter location and agent-to-file map (v2) */
const EDM_BASE_URL = new URL("./", document.currentScript.src).href;
const EDM = {
 "A001": {
  "zh": "A001_ExecNewsAggregator.html",
  "en": "A001_ExecNewsAggregator_EN.html"
 },
 "A002": {
  "zh": "A002_DailyChallengeAgent.html",
  "en": "A002_DailyChallengeAgent_EN.html"
 },
 "A003": {
  "zh": "A003_SWOTAnalysisAgent.html",
  "en": "A003_SWOTAnalysisAgent_EN.html"
 },
 "A004": {
  "zh": "A004_StatementOfWorkAgent.html",
  "en": "A004_StatementOfWorkAgent_EN.html"
 },
 "A005": {
  "zh": "A005_EventAgent.html",
  "en": "A005_EventAgent_EN.html"
 },
 "A006": {
  "zh": "A006_KnowledgeExtractor.html",
  "en": "A006_KnowledgeExtractor_EN.html"
 },
 "A007": {
  "zh": "A007_ScenarioSimulator.html",
  "en": "A007_ScenarioSimulator_EN.html"
 },
 "A008": {
  "zh": "A008_M365ProjectHelper.html",
  "en": "A008_M365ProjectHelper_EN.html"
 },
 "A009": {
  "zh": "A009_YourNamesake.html",
  "en": "A009_YourNamesake_EN.html"
 },
 "A010": {
  "zh": "A010_AIMindsetAgent.html",
  "en": "A010_AIMindsetAgent_EN.html"
 },
 "A011": {
  "zh": "A011_PromptingMentor.html",
  "en": "A011_PromptingMentor_EN.html"
 },
 "A012": {
  "zh": "A012_DocumentClassificator.html",
  "en": "A012_DocumentClassificator_EN.html"
 },
 "A013": {
  "zh": "A013_SMARTGoals.html",
  "en": "A013_SMARTGoals_EN.html"
 },
 "A014": {
  "zh": "A014_NDAComparisonAgent.html",
  "en": "A014_NDAComparisonAgent_EN.html"
 },
 "A015": {
  "zh": "A015_AgentCrafter.html",
  "en": "A015_AgentCrafter_EN.html"
 },
 "A016": {
  "zh": "A016_YourProofreader.html",
  "en": "A016_YourProofreader_EN.html"
 },
 "A017": {
  "zh": "A017_YourProblemSolver.html",
  "en": "A017_YourProblemSolver_EN.html"
 },
 "A018": {
  "zh": "A018_NewsAggregatorAgent.html",
  "en": "A018_NewsAggregatorAgent_EN.html"
 },
 "A019": {
  "zh": "A019_ChecklistManifestoAgent.html",
  "en": "A019_ChecklistManifestoAgent_EN.html"
 },
 "A020": {
  "zh": "A020_DealcrafterAgent.html",
  "en": "A020_DealcrafterAgent_EN.html"
 },
 "A021": {
  "zh": "A021_TrainingContentWriter.html",
  "en": "A021_TrainingContentWriter_EN.html"
 },
 "A022": {
  "zh": "A022_DecisionArchitect.html",
  "en": "A022_DecisionArchitect_EN.html"
 },
 "A023": {
  "zh": "A023_WellnessProductivityCoach.html",
  "en": "A023_WellnessProductivityCoach_EN.html"
 },
 "A024": {
  "zh": "A024_InnovationRadarAgent.html",
  "en": "A024_InnovationRadarAgent_EN.html"
 },
 "A025": {
  "zh": "A025_ProductCrafter.html",
  "en": "A025_ProductCrafter_EN.html"
 },
 "A026": {
  "zh": "A026_CoherenceAgent.html",
  "en": "A026_CoherenceAgent_EN.html"
 },
 "A027": {
  "zh": "A027_ResolutionAgent.html",
  "en": "A027_ResolutionAgent_EN.html"
 },
 "A028": {
  "zh": "A028_StorytellingMentor.html",
  "en": "A028_StorytellingMentor_EN.html"
 },
 "A029": {
  "zh": "A029_MarketingAgent.html",
  "en": "A029_MarketingAgent_EN.html"
 },
 "A030": {
  "zh": "A030_PeerFeedbackAgent.html",
  "en": "A030_PeerFeedbackAgent_EN.html"
 },
 "A031": {
  "zh": "A031_PresentationOptimizerAgent.html",
  "en": "A031_PresentationOptimizerAgent_EN.html"
 },
 "A032": {
  "zh": "A032_PorterFiveForcesProfiler.html",
  "en": "A032_PorterFiveForcesProfiler_EN.html"
 },
 "A033": {
  "zh": "A033_SayNoCoach2.html",
  "en": "A033_SayNoCoach2_EN.html"
 },
 "A034": {
  "zh": "A034_OKRCoachAgent.html",
  "en": "A034_OKRCoachAgent_EN.html"
 },
 "A035": {
  "zh": "A035_ABTestingIdeas.html",
  "en": "A035_ABTestingIdeas_EN.html"
 },
 "A036": {
  "zh": "A036_MeetingRecapCompanion.html",
  "en": "A036_MeetingRecapCompanion_EN.html"
 },
 "A037": {
  "zh": "A037_PolicyAuthorPro.html",
  "en": "A037_PolicyAuthorPro_EN.html"
 },
 "A038": {
  "zh": "A038_MonthlyKPIComparator.html",
  "en": "A038_MonthlyKPIComparator_EN.html"
 },
 "A039": {
  "zh": "A039_AgentOfChange.html",
  "en": "A039_AgentOfChange_EN.html"
 },
 "A040": {
  "zh": "A040_MeetingPrep.html",
  "en": "A040_MeetingPrep_EN.html"
 },
 "A041": {
  "zh": "A041_PolicySimplifier.html",
  "en": "A041_PolicySimplifier_EN.html"
 },
 "A042": {
  "zh": "A042_Evite.html",
  "en": "A042_Evite_EN.html"
 },
 "A043": {
  "zh": "A043_DevilsAdvocate.html",
  "en": "A043_DevilsAdvocate_EN.html"
 },
 "A044": {
  "zh": "A044_TeamMoraleAssistant.html",
  "en": "A044_TeamMoraleAssistant_EN.html"
 },
 "A045": {
  "zh": "A045_MonthlyKPIComparator.html",
  "en": "A045_MonthlyKPIComparator_EN.html"
 },
 "A046": {
  "zh": "A046_BusinessCaseBuilder.html",
  "en": "A046_BusinessCaseBuilder_EN.html"
 },
 "A047": {
  "zh": "A047_ProcessOptimizer.html",
  "en": "A047_ProcessOptimizer_EN.html"
 },
 "A048": {
  "zh": "A048_WorkshopDesigner.html",
  "en": "A048_WorkshopDesigner_EN.html"
 },
 "A049": {
  "zh": "A049_ArgumentationCoach.html",
  "en": "A049_ArgumentationCoach_EN.html"
 },
 "A050": {
  "zh": "A050_ExecBriefingBuilder.html",
  "en": "A050_ExecBriefingBuilder_EN.html"
 },
 "A051": {
  "zh": "A051_WorkshopPlanningFacilitator.html",
  "en": "A051_WorkshopPlanningFacilitator_EN.html"
 },
 "A052": {
  "zh": "A052_CopilotVsCoworkGuide.html",
  "en": "A052_CopilotVsCoworkGuide_EN.html"
 },
 "A053": {
  "zh": "A053_RequirementsDetective.html",
  "en": "A053_RequirementsDetective_EN.html"
 },
 "A054": {
  "zh": "A054_OnboardingAgent.html",
  "en": "A054_OnboardingAgent_EN.html"
 },
 "A055": {
  "zh": "A055_PersonalChiefOfStaff.html",
  "en": "A055_PersonalChiefOfStaff_EN.html"
 },
 "A056": {
  "zh": "A056_CustomerFeedbackSynthesizer.html",
  "en": "A056_CustomerFeedbackSynthesizer_EN.html"
 },
 "A057": {
  "zh": "A057_StrategicOnePager.html",
  "en": "A057_StrategicOnePager_EN.html"
 },
 "A058": {
  "zh": "A058_CopilotCompass.html",
  "en": "A058_CopilotCompass_EN.html"
 }
};
