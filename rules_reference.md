# Career Tools Rules Reference

This file consolidates the rule definitions for Career Tools currently in the codebase.

## Scope

- Input validation rules come from each tool class `rules()` method in `app/Services/CareerTools/*`.
- Output structure rules come from each tool class `schema()` method.
- Tool grouping/type context comes from `database/seeders/CareerToolSeeder.php`.

## Resumes and Applications

### Cover Letter Builder

- Class: `App\Services\CareerTools\CoverLetterBuilder`
- Seeded group/type: `Resumes and Applications` / `resume`

```php
[
    'template' => ['required', 'string'],
    'full_name' => ['required', 'string'],
    'job_title' => ['required', 'string'],
    'company_name' => ['required', 'string'],
    'writing_tone' => ['required', 'string'],
    'job_description' => ['nullable', 'string', 'max:200'],
    'relevant_experience' => ['required', 'string', 'max:200'],
    'key_skills' => ['required', 'string'],
]
```

- Schema keys:
  - `cover_letter_text` (string, required)

### Email Writer

- Class: `App\Services\CareerTools\EmailWriter`
- Seeded group/type: `Resumes and Applications` / `resume`

```php
[
    'email_type' => ['required', 'string'],
    'email_tone' => ['required', 'string'],
    'recipient_name' => ['required', 'string'],
    'recipient_role' => ['required', 'string'],
    'company' => ['required', 'string'],
    'context_details' => ['required', 'string', 'max:200'],
]
```

- Schema keys:
  - `subject` (string, required)
  - `email_body` (string, required)

### Resume Optimizer

- Class: `App\Services\CareerTools\ResumeOptimizer`
- Seeded group/type: not currently present in `CareerToolSeeder` (class exists in codebase)

```php
[
    'current_resume' => ['required', 'string'],
    'job_description' => ['required', 'string'],
]
```

- Schema keys:
  - `overall_score` (integer, required)
  - `ats_score` (integer, required)
  - `strengths` (array of string, required)
  - `critical_issues` (array of string, required)
  - `optimized_resume` (string, required)

## LinkedIn and Personal Brand

### Headline Generator

- Class: `App\Services\CareerTools\LinkedInHeadlineGenerator`
- Seeded group/type: `LinkedIn and Personal Brand` / `linkedin`

```php
[
    'current_role' => ['required', 'string'],
    'target_role' => ['nullable', 'string'],
    'industry' => ['required', 'string'],
    'key_skills' => ['required', 'string'],
]
```

- Schema keys:
  - `headlines` (array of string, required)

### Post Writer

- Class: `App\Services\CareerTools\LinkedInPostWriter`
- Seeded group/type: `LinkedIn and Personal Brand` / `linkedin`

```php
[
    'post_topic' => ['required', 'string'],
    'additional_context' => ['nullable', 'string'],
    'post_type' => ['required', 'string'],
    'tone' => ['required', 'string'],
]
```

- Schema keys:
  - `post_text` (string, required)

### Summary Generator

- Class: `App\Services\CareerTools\LinkedInSummaryGenerator`
- Seeded group/type: `LinkedIn and Personal Brand` / `linkedin`

```php
[
    'current_role' => ['required', 'string'],
    'target_audience' => ['required', 'string'],
    'tone' => ['required', 'string'],
    'experience_background' => ['required', 'string'],
    'key_achievements' => ['required', 'string'],
]
```

- Schema keys:
  - `summary_text` (string, required)

## Career Development

### Explore Careers

- Class: `App\Services\CareerTools\ExploreCareers`
- Seeded group/type: `Career Development` / `career`

```php
[
    'career_job_title' => ['required', 'string'],
    'location' => ['required', 'string'],
]
```

- Schema keys:
  - `page_title` (string, required)
  - `role_overview_title` (string, required)
  - `about_role` (string, required)
  - `day_in_life` (string, required)
  - `key_responsibilities` (array of string, required)
  - `certifications` (array of string, required)
  - `required_skills` (array of string, required)
  - `soft_skills` (array of string, required)
  - `your_strengths` (array of string, required)
  - `things_to_develop` (array of string, required)
  - `salary_section_title` (string, required)
  - `salary_section_intro` (string, required)
  - `salary_ranges.entry_level` (string, required)
  - `salary_ranges.mid_level` (string, required)
  - `salary_ranges.senior_level` (string, required)
  - `industry_outlook` (string, required)

### Career Roadmap

- Class: `App\Services\CareerTools\CareerRoadmapGenerator`
- Seeded group/type: `Career Development` / `career`

```php
[
    'current_role' => ['required', 'string'],
    'years_of_experience' => ['required', 'string'],
    'key_skills' => ['required', 'string'],
    'target_monthly_income' => ['required', 'string'],
    'timeline' => ['required', 'string'],
]
```

- Schema keys:
  - `header_title` (string, required)
  - `header_subtitle` (string, required)
  - `career_paths[]: label, track_title, track_role, target_multiple` (required)
  - `hidden_gems` (array of string, required)
  - `start_now` (array of string, required)
  - `selected_path_detail` object (required):
    - `title`, `overview`, `destination_role`, `destination_salary_range`, `destination_timeline`
    - `steps[]` with `step_number`, `role_title`, `duration`, `key_milestones[]`, `skills_to_stack[]`, `pro_tip`
    - `skills_to_stack[]` contains `priority`, `skill`, `resources`

### Salary Analyzer

- Class: `App\Services\CareerTools\SalaryAnalyzer`
- Seeded group/type: `Career Development` / `career`

```php
[
    'job_title' => ['required', 'string'],
    'location' => ['required', 'string'],
    'experience_level' => ['required', 'string'],
    'industry' => ['nullable', 'string'],
]
```

- Schema keys:
  - `average_salary` (string, required)
  - `salary_range` (string, required)
  - `experience_level_label` (string, required)
  - `salary_by_company_type[]: company_type, entry_level, mid_level, senior_level` (required)
  - `what_drives_higher_pay[]: title, description, uplift_percent` (required)
  - `negotiation_strategy.anchor_high` (string, required)
  - `negotiation_strategy.walk_away_point` (string, required)
  - `negotiation_strategy.leverage_points` (array of string, required)
  - `scripts_to_use[]: title, script` (required)
  - `hidden_compensation[]: title, description, estimated_annual_value` (required)

### Elevator Pitch

- Class: `App\Services\CareerTools\ElevatorPitchGenerator`
- Seeded group/type: `Career Development` / `career`

```php
[
    'current_role' => ['required', 'string'],
    'target_role' => ['required', 'string'],
    'context' => ['required', 'string'],
    'duration' => ['required', 'string'],
    'key_strengths_skills' => ['required', 'string'],
    'unique_achievements_perspectives' => ['required', 'string'],
]
```

- Schema keys:
  - `primary_pitch` (string, required)
  - `alternative_pitches` (array of string, required)
  - `practice_tip` (string, required)

### Personal Brand Audit

- Class: `App\Services\CareerTools\PersonalBrandAudit`
- Seeded group/type: `Career Development` / `career`

```php
[
    'page_image_file_id' => ['required', 'string'],
    'current_role' => ['required', 'string'],
    'desired_brand_perception' => ['required', 'string'],
    'linkedin_url' => ['nullable', 'string'],
    'twitter_handle' => ['nullable', 'string'],
    'instagram_handle' => ['nullable', 'string'],
    'portfolio_url' => ['nullable', 'string'],
    'github_url' => ['nullable', 'string'],
]
```

- Schema keys:
  - `average_score` (integer, required)
  - `score_context` (string, required)
  - `brand_statement_intro` (string, required)
  - `brand_statement_recommendation` (string, required)
  - `platform_analysis[]: platform, score, insight` (required)
  - `your_strengths` (array of string, required)
  - `areas_to_improve` (array of string, required)
  - `action_plan_30_days` (array of string, required)

