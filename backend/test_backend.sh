#!/bin/bash

echo "=== Flatshare Naija Backend Test Script ==="

EMAIL="charlie@example.com"
PASSWORD="password123"
BASE_URL="http://127.0.0.1:8000"

echo "1. Logging in as $EMAIL..."

# Login and get tokens
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=$EMAIL&password=$PASSWORD")

ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"refresh_token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "❌ Login failed!"
  echo "Response: $LOGIN_RESPONSE"
  exit 1
fi

echo "✅ Login successful!"
echo "Access Token: ${ACCESS_TOKEN:0:50}..."

# Test 2: Create a listing WITHOUT image first
echo -e "\n2. Creating a listing (without image)..."

CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/listings" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F "title=Beautiful 2 Bedroom Flat in Lekki" \
  -F "location=Lekki Phase 1, Lagos" \
  -F "price=450000" \
  -F "rooms=2" \
  -F "description=Spacious and modern 2 bedroom flat with all amenities" \
  -F "gender_preference=any" \
  -F "bathrooms=2" \
  -F "amenities=WiFi,Generator,Security,Car Park" \
  -F "furnished_status=semi-furnished" \
  -F "service_charge_included=true")

echo "$CREATE_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$CREATE_RESPONSE"

echo -e "\n=== Test Completed ==="
echo "If you saw a listing object with an 'id', everything is working!"
