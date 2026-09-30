import { MarketMetadata, EvaluationMetrics } from '../types/skills';

export const MARKET_METADATA: MarketMetadata = {
  datasetSource: 'Kaggle Data Science & ML Job Postings Telemetry (Aggregated Skill Frequency Distribution)',
  postingCount: null,
  postingCountLabel: 'Unavailable (Not specified in dataset metadata)',
  datasetPeriod: 'Unavailable (Not specified in dataset metadata)',
  geography: 'Unavailable (Not specified in dataset metadata)',
  lastUpdated: 'Bundled dataset (skill_demand.json: 43 evaluated market skills)',
  proxyDisclaimer:
    'Job postings frequency serves as an empirical proxy for market demand in job listings, not an exhaustive inventory of the global employment market or foundational educational theory.',
};

export const EVALUATION_METRICS: EvaluationMetrics = {
  hasLabelledBenchmark: false,
  statusLabel: 'Not Formally Benchmarked — No Independently Labeled Ground-Truth Dataset',
  precision: null,
  recall: null,
  f1Score: null,
  truePositives: null,
  falsePositives: null,
  falseNegatives: null,
  groundTruthSampleCount: null,
  evaluationNotes:
    'Precision, Recall, and F1 metrics are omitted to prevent fabricating unverified benchmark statistics. A legitimate quantitative benchmark requires a multi-institutional, human-labeled syllabus evaluation set. The application currently uses rule-based matching with transparent heuristic tiers (exact alias, synonym normalization, parent-child concept hierarchies, and related technology mappings).',
};

