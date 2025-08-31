# Dashboard Report API Specification

## Overview
This document outlines the required data structure for the **Dashboard Report Section** only. The frontend needs specific JSON responses to display reports, charts, and analytics in the dashboard.

## Report Endpoint
```
POST /api/dashboard/reports
```

## Request Format
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

## Required Response Structure

### Success Response (200)
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

## Field Descriptions

### Summary Statistics
- **total_posts_analyzed**: Total number of posts analyzed in the date range
- **hate_speech_count**: Number of posts flagged as hate speech
- **misinformation_count**: Number of posts flagged as misinformation
- **safe_content_count**: Number of posts marked as safe
- **average_confidence**: Average confidence score across all analyses
- **average_processing_time_ms**: Average processing time in milliseconds

### Platform Breakdown
- **platform**: Social media platform name (Twitter, Facebook, Instagram, LinkedIn)
- **total_posts**: Total posts from that platform
- **hate_speech**: Hate speech posts from that platform
- **misinformation**: Misinformation posts from that platform
- **safe**: Safe posts from that platform

### Severity Distribution
- **severity**: Severity level (low, medium, high)
- **count**: Number of posts at that severity level
- **percentage**: Percentage of total posts at that severity level

### Top Keywords
- **keyword**: Detected problematic keyword
- **frequency**: How many times this keyword appeared
- **severity**: Highest severity level associated with this keyword

### Location Insights
- **location**: Geographic location (Cameroonian cities/regions)
- **total_posts**: Total posts from that location
- **risk_level**: Overall risk level for that location (low, medium, high)
- **common_issues**: Array of common problems found in that location

### Trends
- **date**: Date of the data point
- **hate_speech_count**: Hate speech posts on that date
- **misinformation_count**: Misinformation posts on that date
- **average_risk_score**: Average risk score for that date

## Cameroon-Specific Requirements

### Locations to Include
- **Cities**: Douala, Yaoundé, Bamenda, Buea, Kribi, Garoua, Maroua, Ngaoundéré, Limbe, Bertoua
- **Regions**: Littoral, Centre, Northwest, Southwest, South, North, Far North, Adamawa, East

### Content Types
- **Hate Speech**: Ethnic targeting, regional tensions, violence incitement
- **Misinformation**: False health claims, conspiracy theories, fake news
- **Safe Content**: Positive community posts, legitimate discussions

## Sample Response for Dashboard

```json
{
  "success": true,
  "data": {
    "report_id": "report_2024_01_15",
    "generated_at": "2024-01-15T10:30:00Z",
    "date_range": {
      "start_date": "2024-01-08T00:00:00Z",
      "end_date": "2024-01-15T23:59:59Z"
    },
    "summary": {
      "total_posts_analyzed": 15420,
      "hate_speech_count": 2340,
      "misinformation_count": 1890,
      "safe_content_count": 11190,
      "average_confidence": 0.87,
      "average_processing_time_ms": 1200
    },
    "platform_breakdown": [
      {
        "platform": "Twitter",
        "total_posts": 8200,
        "hate_speech": 1200,
        "misinformation": 950,
        "safe": 6050
      },
      {
        "platform": "Facebook",
        "total_posts": 4500,
        "hate_speech": 680,
        "misinformation": 520,
        "safe": 3300
      },
      {
        "platform": "Instagram",
        "total_posts": 2720,
        "hate_speech": 460,
        "misinformation": 420,
        "safe": 1840
      }
    ],
    "severity_distribution": [
      {
        "severity": "high",
        "count": 890,
        "percentage": 15.2
      },
      {
        "severity": "medium",
        "count": 1450,
        "percentage": 24.8
      },
      {
        "severity": "low",
        "count": 1890,
        "percentage": 32.3
      }
    ],
    "top_keywords": [
      {
        "keyword": "Anglophones",
        "frequency": 156,
        "severity": "high"
      },
      {
        "keyword": "separatists",
        "frequency": 134,
        "severity": "high"
      },
      {
        "keyword": "Bamileke",
        "frequency": 98,
        "severity": "medium"
      },
      {
        "keyword": "bitter leaf",
        "frequency": 87,
        "severity": "low"
      }
    ],
    "location_insights": [
      {
        "location": "Bamenda",
        "total_posts": 2340,
        "risk_level": "high",
        "common_issues": ["Anglophone tensions", "separatist content"]
      },
      {
        "location": "Douala",
        "total_posts": 4560,
        "risk_level": "medium",
        "common_issues": ["economic grievances", "corruption claims"]
      },
      {
        "location": "Yaoundé",
        "total_posts": 3120,
        "risk_level": "medium",
        "common_issues": ["political content", "government criticism"]
      }
    ],
    "trends": [
      {
        "date": "2024-01-08",
        "hate_speech_count": 320,
        "misinformation_count": 245,
        "average_risk_score": 68
      },
      {
        "date": "2024-01-09",
        "hate_speech_count": 298,
        "misinformation_count": 267,
        "average_risk_score": 65
      },
      {
        "date": "2024-01-10",
        "hate_speech_count": 345,
        "misinformation_count": 289,
        "average_risk_score": 72
      }
    ]
  }
}
```

## Implementation Notes

1. **Data Aggregation**: Backend should aggregate data from the hate speech detection system
2. **Real-time Updates**: Consider providing real-time data updates for live dashboard
3. **Caching**: Implement caching for better performance on repeated requests
4. **Export Options**: Consider adding CSV/PDF export endpoints for reports

## Contact
For implementation questions, contact the frontend development team. 