#!/bin/zsh

# Replace with your PostHog project API key
POSTHOG_API_KEY="YOUR_PROJECT_API_KEY"
POSTHOG_HOST="https://app.posthog.com"

# Create Investor Insights dashboard
DASHBOARD_ID=$(curl -s -X POST "$POSTHOG_HOST/api/dashboards/" \
  -H "Authorization: Bearer $POSTHOG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"Investor Insights","description":"Tracks registration funnel, search performance, and retention"}' \
  | jq -r '.id')

echo "✅ Created dashboard Investor Insights with ID $DASHBOARD_ID"

# Add Registration Funnel insight
curl -s -X POST "$POSTHOG_HOST/api/insights/" \
  -H "Authorization: Bearer $POSTHOG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Registration Funnel",
    "filters": {
      "events": [
        {"id":"registration_start","type":"events"},
        {"id":"registration_complete","type":"events"}
      ]
    },
    "dashboard": '"$DASHBOARD_ID"',
    "type": "Funnel"
  }' > /dev/null

echo "✅ Added Registration Funnel insight"

# Add Search Performance insight
curl -s -X POST "$POSTHOG_HOST/api/insights/" \
  -H "Authorization: Bearer $POSTHOG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Search Performance",
    "filters": {
      "events": [{"id":"search","type":"events"}],
      "properties": [{"key":"location","value":"Lagos"}]
    },
    "dashboard": '"$DASHBOARD_ID"',
    "type": "Trends"
  }' > /dev/null

echo "✅ Added Search Performance insight"

# Add Retention insight
curl -s -X POST "$POSTHOG_HOST/api/insights/" \
  -H "Authorization: Bearer $POSTHOG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User Retention",
    "filters": {
      "events": [{"id":"app_loaded","type":"events"}]
    },
    "dashboard": '"$DASHBOARD_ID"',
    "type": "Retention"
  }' > /dev/null

echo "✅ Added User Retention insight"
