# Hate Speech Detection API Specification

## Overview
This document outlines the required data structure and endpoints for the Hate Speech Detection system. The frontend expects specific JSON responses to properly display analysis results, user information, and generate comprehensive reports.

## Base API Endpoint
```
POST /api/hate-speech-detection
```

## Request Format
```json
{
  "text": "string",
  "user_id": "string (optional)",
  "platform": "string (optional)",
  "language": "string (optional, defaults to 'en')"
}
```

## Required Response Structure

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "text": "string",
    "is_hate_speech": boolean,
    "is_misinformation": boolean,
    "confidence": number (0.0 - 1.0),
    "category": "string",
    "severity": "string (low|medium|high)",
    "detected_keywords": ["string"],
    "explanation": "string",
    "timestamp": "string (ISO 8601)",
    "processing_time_ms": number,
    "risk_score": number (0-100),
    "moderation_action": "string",
    "language": "string",
    "sentiment": "string (positive|negative|neutral)"
  }
}
```

### Error Response (400/500)
```json
{
  "success": false,
  "error": "string",
  "error_code": "string (optional)"
}
```

## Detailed Field Descriptions

### Core Analysis Fields
- **text**: Original input text that was analyzed
- **is_hate_speech**: Boolean indicating if hate speech was detected
- **is_misinformation**: Boolean indicating if misinformation was detected
- **confidence**: Confidence score between 0.0 and 1.0 (0% to 100%)
- **category**: Model identifier (e.g., "enhanced_twitter_model_v2", "cameroon_specific_model")

### Severity & Risk Assessment
- **severity**: Must be one of: "low", "medium", "high"
- **risk_score**: Integer from 0-100 representing overall risk level
- **moderation_action**: Suggested action (e.g., "flag_for_review", "fact_check_needed", "no_action", "immediate_removal")

### Content Analysis
- **detected_keywords**: Array of problematic keywords found in the text
- **explanation**: Human-readable explanation of why content was flagged
- **sentiment**: Overall sentiment analysis: "positive", "negative", or "neutral"

### Technical Metadata
- **timestamp**: ISO 8601 timestamp of when analysis was performed
- **processing_time_ms**: Processing time in milliseconds
- **language**: Detected or specified language code (e.g., "en", "fr", "ar")

## Social Media Post Analysis

### Extended Response for Social Media Posts
```json
{
  "success": true,
  "data": {
    // ... all core fields above ...
    "post_metadata": {
      "post_id": "string",
      "platform": "string (Twitter|Facebook|Instagram|LinkedIn)",
      "engagement": {
        "likes": number,
        "shares": number,
        "comments": number
      },
      "poster": {
        "username": "string",
        "display_name": "string",
        "verified": boolean,
        "followers": number,
        "location": "string",
        "join_date": "string (ISO 8601)"
      }
    }
  }
}
```

## Report Generation Endpoint

### Request
```
POST /api/generate-report
```

### Request Body
```json
{
  "report_type": "string (daily|weekly|monthly|custom)",
  "date_range": {
    "start_date": "string (ISO 8601)",
    "end_date": "string (ISO 8601)"
  },
  "filters": {
    "platforms": ["string"],
    "severity_levels": ["string"],
    "content_types": ["hate_speech", "misinformation", "safe"],
    "locations": ["string"]
  }
}
```

### Report Response
```json
{
  "success": true,
  "data": {
    "report_id": "string",
    "generated_at": "string (ISO 8601)",
    "date_range": {
      "start_date": "string (ISO 8601)",
      "end_date": "string (ISO 8601)"
    },
    "summary": {
      "total_posts_analyzed": number,
      "hate_speech_count": number,
      "misinformation_count": number,
      "safe_content_count": number,
      "average_confidence": number,
      "average_processing_time_ms": number
    },
    "platform_breakdown": [
      {
        "platform": "string",
        "total_posts": number,
        "hate_speech": number,
        "misinformation": number,
        "safe": number
      }
    ],
    "severity_distribution": [
      {
        "severity": "string",
        "count": number,
        "percentage": number
      }
    ],
    "top_keywords": [
      {
        "keyword": "string",
        "frequency": number,
        "severity": "string"
      }
    ],
    "location_insights": [
      {
        "location": "string",
        "total_posts": number,
        "risk_level": "string",
        "common_issues": ["string"]
      }
    ],
    "trends": [
      {
        "date": "string (ISO 8601)",
        "hate_speech_count": number,
        "misinformation_count": number,
        "average_risk_score": number
      }
    ]
  }
}
```

## Cameroon-Specific Requirements

### Localized Keywords
The system should recognize Cameroon-specific hate speech patterns:
- **Ethnic targeting**: "Anglophones", "Bamileke", "Fulani", "Beti", "Bassa"
- **Regional tensions**: "separatists", "Ambazonia", "Southern Cameroons"
- **Local misinformation**: Traditional medicine claims, government corruption
- **Cultural context**: Witchcraft references, tribal conflicts

### Language Support
- **Primary**: English, French
- **Secondary**: Local languages (Pidgin English, local dialects)
- **Language detection**: Automatic detection with fallback to specified language

### Geographic Context
- **Cities**: Douala, Yaoundé, Bamenda, Buea, Kribi, Garoua, Maroua, Ngaoundéré, Limbe, Bertoua
- **Regions**: Littoral, Centre, Northwest, Southwest, South, North, Far North, Adamawa, East
- **Cultural zones**: Anglophone regions, Francophone regions, Northern pastoralist areas

## Performance Requirements

### Response Times
- **Single text analysis**: < 2 seconds
- **Report generation**: < 30 seconds for daily reports, < 5 minutes for monthly reports

### Throughput
- **Text analysis**: 1000+ requests per minute
- **Batch processing**: Support for bulk analysis of up to 1000 texts per request

### Scalability
- **Concurrent users**: Support for 100+ simultaneous users
- **Data retention**: Store analysis results for minimum 2 years
- **Backup**: Daily automated backups of analysis data

## Security Requirements

### Authentication
- **API keys**: Required for all endpoints
- **Rate limiting**: Maximum 100 requests per minute per API key
- **IP whitelisting**: Optional for enterprise clients

### Data Privacy
- **PII handling**: No storage of personally identifiable information
- **Data encryption**: All data encrypted in transit and at rest
- **Audit logging**: Complete audit trail of all API requests

## Error Handling

### Common Error Codes
- **400**: Bad Request (invalid input)
- **401**: Unauthorized (invalid API key)
- **429**: Too Many Requests (rate limit exceeded)
- **500**: Internal Server Error
- **503**: Service Unavailable (maintenance mode)

### Error Response Format
```json
{
  "success": false,
  "error": "Human readable error message",
  "error_code": "ERROR_CODE",
  "details": {
    "field": "string (optional)",
    "suggestion": "string (optional)"
  }
}
```

## Testing & Validation

### Test Cases
The backend should provide test endpoints with sample data:
```
GET /api/test/sample-texts
GET /api/test/sample-responses
POST /api/test/validate-format
```

### Sample Test Data
Include Cameroon-specific examples:
- Positive content in local languages
- Hate speech targeting local ethnic groups
- Misinformation about local health practices
- Mixed-language content (French/English/Pidgin)

## Implementation Notes

1. **Model Versioning**: Include model version in responses for tracking improvements
2. **Confidence Thresholds**: Configurable confidence thresholds for different severity levels
3. **Keyword Updates**: Ability to update keyword lists without model retraining
4. **Multilingual Support**: Ensure proper handling of mixed-language content
5. **Cultural Sensitivity**: Avoid false positives on legitimate cultural expressions

## Contact & Support
For implementation questions or clarifications, contact the frontend development team. 