# Curriculum vs. Industry Market Gap Analyzer

## Overview

The **Curriculum vs. Industry Market Gap Analyzer** is a Business Analytics application that compares university curriculum content with skills demanded in the industry.

The system identifies which skills are adequately covered, partially covered, missing, or have relatively lower market demand. It then calculates a demand-weighted curriculum alignment score and provides data-driven recommendations for curriculum improvement.

## Problem Statement

Industry skill requirements change rapidly, while academic curricula may not always evolve at the same pace.

This project provides a data-driven approach to identify gaps between:

* Skills taught in an academic curriculum
* Skills demanded in industry job postings

## Key Features

* Upload and analyze curriculum/syllabus PDFs
* Automated skill extraction
* Skill normalization and semantic matching
* Curriculum depth scoring from 0–4
* Skill classification:

  * Covered
  * Partial
  * Gap
  * Surplus
* Demand-weighted curriculum alignment score
* Industry skill-demand analysis
* Critical skill-gap identification
* Domain/category analysis
* What-if curriculum scenario analysis
* AI-generated curriculum recommendations
* Executive dashboard
* Skill matrix and evidence-based analysis
* PDF and CSV reporting

## Methodology

### 1. Curriculum Skill Extraction

The system extracts relevant skills and topics from curriculum documents using NLP-based processing and rule-based skill identification.

### 2. Skill Normalization

Different names for the same or related skills are normalized.

Examples:

* K8s → Kubernetes
* sklearn → scikit-learn
* Postgres → PostgreSQL

The system also considers parent-child and related skill relationships when determining partial coverage.

### 3. Curriculum Depth

Each identified skill is assigned a curriculum depth:

| Depth | Meaning             |
| ----- | ------------------- |
| 0     | Not Covered         |
| 1     | Mentioned           |
| 2     | Theory              |
| 3     | Practical / Project |
| 4     | Advanced            |

### 4. Skill Classification

Skills are classified based on curriculum coverage and market relevance:

* **Covered** – sufficiently taught with practical or advanced depth
* **Partial** – foundational, theoretical, parent/child, or related coverage
* **Gap** – relevant market skill not adequately covered
* **Surplus** – academically covered skill with relatively lower market frequency

### 5. Demand-Weighted Alignment

The primary analytical metric is:

**Alignment Score =**

`Σ(Market Demand × Coverage Factor) / Σ(Market Demand) × 100`

Coverage factors:

* Depth 3–4 → 1.0
* Depth 2 → 0.5
* Depth 1 → 0.25
* Depth 0 → 0

This gives greater importance to skills with higher industry demand.

## AI Integration

Gemini AI is used where appropriate for:

* Curriculum/PDF skill extraction
* Interpreting curriculum content
* Generating curriculum improvement recommendations
* Creating strategic curriculum enhancement roadmaps

AI recommendations consider factors such as market demand, curriculum gaps, existing coverage, prerequisites, academic level, and implementation effort.

## Application Workflow

```text
Curriculum / Syllabus
        ↓
Skill Extraction
        ↓
Skill Normalization
        ↓
Industry Demand Analysis
        ↓
Skill Matching
        ↓
Coverage & Depth Classification
        ↓
Demand-Weighted Alignment Score
        ↓
Gap Analysis
        ↓
AI Recommendations
```

## Dashboard

The application provides:

* Executive Summary
* Alignment Score
* Top Industry-Demanded Skills
* Critical Skill Gaps
* Full Skill Matrix
* Domain Analysis
* What-If Scenario Analysis
* AI Action Plan
* Reports and Exports

## Business Value

The system can support academic decision-making by helping institutions:

* Identify curriculum-industry skill gaps
* Prioritize high-demand skills
* Review curriculum coverage
* Support evidence-based curriculum discussions
* Explore potential curriculum improvements

## Limitations

* Job postings are a proxy for industry demand and do not represent the entire labor market.
* Skill matching may not perfectly capture every semantic relationship.
* Curriculum PDFs may contain ambiguous or incomplete information.
* AI-generated recommendations should be reviewed by academic and subject-matter experts.
* Curriculum changes based on market demand alone should not replace broader academic objectives.

## Technology

* NLP / Text Processing
* Rule-based Skill Matching
* Semantic Skill Normalization
* Data Analytics
* Data Visualization
* Generative AI / Gemini
* JavaScript / TypeScript
* Web-based Dashboard

## Project Status

**Status:** Academic / Business Analytics Project

The application is designed as a decision-support tool for analyzing curriculum alignment with industry skill demand.

## Disclaimer

This project is intended for academic and analytical purposes. Industry demand data represents a snapshot/proxy of job-market requirements and should not be interpreted as a guarantee of employment outcomes or as an automated accreditation decision.

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
