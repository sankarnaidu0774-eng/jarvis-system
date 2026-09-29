# 🔍 JARVIS Google Skills - Quick API Reference

## 📡 Base URL
```
http://localhost:3000/api
```

---

## 🎯 Google Skills Available

| Skill | Services | Status |
|-------|----------|--------|
| Search | Web, Images, News | ✅ Active |
| Gmail | Read, Send, Search | ✅ Active |
| Calendar | Create, Update, Delete Events | ✅ Active |
| Drive | Upload, List, Search Files | ✅ Active |
| Maps | Directions, Places | ✅ Active |
| Translate | Translate, Detect Language | ✅ Active |
| Sheets | Create, Edit Spreadsheets | ✅ Active |
| Docs | Create, Edit Documents | ✅ Active |
| YouTube | Search Videos, Create Playlists | ✅ Active |
| Tasks | Create, Complete Tasks | ✅ Active |
| Photos | Upload, Create Albums | ✅ Active |

---

## 🔧 API Endpoints & Examples

### 1. HEALTH CHECK
```bash
GET /health
```

**Response:**
```json
{
  "status": "online",
  "version": "3.0.0",
  "brain": "connected",
  "googleSkills": "active"
}
```

---

### 2. CHAT WITH JARVIS

```bash
POST /chat
Content-Type: application/json

{
  "message": "Hello JARVIS",
  "userId": "user123"
}
```

**Response:**
```json
{
  "userId": "user123",
  "input": "Hello JARVIS",
  "response": "Hello Sankar! How can I assist you today?",
  "confidence": "0.85",
  "usedGoogleSkills": false,
  "timestamp": "2026-09-30T10:24:00.000Z"
}
```

---

### 3. BRAIN STATISTICS

```bash
GET /brain/stats
```

**Response:**
```json
{
  "name": "JARVIS",
  "version": "3.0.0",
  "owner": "Sankar",
  "status": "online",
  "uptime": 3600,
  "stats": {
    "reasoning": 92,
    "learning": 87,
    "creativity": 76,
    "memory": 81,
    "problemSolving": 89,
    "googleSkillsIntegration": 95,
    "totalNeurons": 2847,
    "accuracy": 0.92
  }
}
```

---

### 4. LIST ALL GOOGLE SKILLS

```bash
GET /google/skills
```

**Response:**
```json
{
  "skills": [
    {
      "name": "search",
      "active": true,
      "methods": ["search", "searchImages", "searchNews"]
    },
    {
      "name": "gmail",
      "active": true,
      "methods": ["getEmails", "sendEmail", "searchEmails"]
    }
    // ... more skills
  ],
  "total": 11
}
```

---

### 5. EXECUTE GOOGLE SKILL

```bash
POST /google/execute
Content-Type: application/json

{
  "skill": "search",
  "command": "search",
  "params": ["machine learning"]
}
```

**Response:**
```json
{
  "success": true,
  "skill": "search",
  "command": "search",
  "result": {
    "results": [
      {
        "position": 1,
        "title": "Result 1",
        "url": "https://example.com"
      }
    ]
  },
  "timestamp": "2026-09-30T10:24:00.000Z"
}
```

---

## 🔍 GOOGLE SEARCH

### Web Search
```bash
GET /search?q=python+tutorial
GET /search?q=machine+learning
GET /search?q=node.js+express
```

**Response:**
```json
{
  "query": "python tutorial",
  "results": [
    {
      "position": 1,
      "title": "Python Tutorial",
      "url": "https://example.com/python",
      "snippet": "Learn Python programming...",
      "displayUrl": "example.com"
    }
  ],
  "searchTime": 0.42,
  "totalResults": 1500000
}
```

---

## 📧 GMAIL

### Get Emails
```bash
GET /gmail/emails
```

### Send Email
```bash
POST /gmail/send
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Meeting Tomorrow",
  "body": "Let's discuss the project details.",
  "cc": "optional@example.com",
  "bcc": "optional2@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent to recipient@example.com",
  "emailId": "email_1695974640000"
}
```

---

## 📅 GOOGLE CALENDAR

### Get Events
```bash
GET /calendar/events
```

### Create Event
```bash
POST /calendar/create
Content-Type: application/json

{
  "title": "Team Meeting",
  "start": "2026-10-01T10:00:00Z",
  "end": "2026-10-01T11:00:00Z",
  "description": "Weekly sync",
  "location": "Meeting Room A",
  "attendees": ["colleague@example.com"]
}
```

**Response:**
```json
{
  "success": true,
  "eventId": "event_1695974640000",
  "message": "Event created: Team Meeting",
  "timestamp": "2026-09-30T10:24:00.000Z"
}
```

---

## 💾 GOOGLE DRIVE

### List Files
```bash
GET /drive/files
```

### Upload File
```bash
POST /drive/upload
Content-Type: application/json

{
  "fileName": "document.pdf",
  "fileContent": "base64_encoded_content",
  "mimeType": "application/pdf"
}
```

**Response:**
```json
{
  "success": true,
  "fileId": "file_1695974640000",
  "message": "File uploaded: document.pdf"
}
```

---

## 🗺️ GOOGLE MAPS

### Get Directions
```bash
POST /maps/directions
Content-Type: application/json

{
  "origin": "New York",
  "destination": "Boston",
  "travelMode": "DRIVING"
}
```

**Response:**
```json
{
  "distance": "215 km",
  "duration": "3 hours 30 minutes",
  "origin": "New York",
  "destination": "Boston",
  "routes": [
    {
      "distance": "215 km",
      "duration": "3 hours 30 minutes",
      "steps": [...]
    }
  ]
}
```

---

## 🌐 GOOGLE TRANSLATE

### Translate Text
```bash
POST /translate
Content-Type: application/json

{
  "text": "Hello world",
  "targetLanguage": "es",
  "sourceLanguage": "en"
}
```

**Response:**
```json
{
  "originalText": "Hello world",
  "translatedText": "[Translated to es] Hello world",
  "targetLanguage": "es",
  "sourceLanguage": "en",
  "confidence": 0.95
}
```

**Supported Languages:**
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Japanese (ja)
- Korean (ko)
- Chinese (zh)
- Hindi (hi)
- Arabic (ar)
- Telugu (te)
- Tamil (ta)
+ Many more...

---

## 📊 GOOGLE SHEETS

### Create Spreadsheet
```bash
POST /sheets/create
Content-Type: application/json

{
  "title": "Q4 Budget Report",
  "locale": "en_US"
}
```

**Response:**
```json
{
  "success": true,
  "spreadsheetId": "sheet_1695974640000",
  "title": "Q4 Budget Report"
}
```

### Update Cells
```bash
POST /sheets/update
Content-Type: application/json

{
  "spreadsheetId": "sheet_1695974640000",
  "range": "Sheet1!A1:C10",
  "values": [
    ["Name", "Age", "City"],
    ["John", 30, "NYC"],
    ["Jane", 28, "LA"]
  ]
}
```

---

## 📄 GOOGLE DOCS

### Create Document
```bash
POST /docs/create
Content-Type: application/json

{
  "title": "Project Report",
  "content": "Initial document content"
}
```

**Response:**
```json
{
  "success": true,
  "documentId": "doc_1695974640000",
  "title": "Project Report",
  "webViewLink": "https://docs.google.com/document/d/..."
}
```

### Append Text
```bash
POST /docs/append
Content-Type: application/json

{
  "documentId": "doc_1695974640000",
  "text": "Additional content to append"
}
```

---

## 🎬 YOUTUBE

### Search Videos
```bash
GET /youtube/search?q=python+tutorial
GET /youtube/search?q=machine+learning&maxResults=10
```

**Response:**
```json
{
  "query": "python tutorial",
  "videos": [
    {
      "videoId": "dQw4w9WgXcQ",
      "title": "Python Tutorial - Beginners",
      "description": "Learn Python from scratch",
      "viewCount": 1500000,
      "likeCount": 50000,
      "publishedAt": "2026-09-30T10:00:00Z"
    }
  ],
  "totalResults": 150000
}
```

### Create Playlist
```bash
POST /youtube/create-playlist
Content-Type: application/json

{
  "title": "Learning Python",
  "description": "Tutorials to learn Python",
  "privacy": "PRIVATE"
}
```

---

## ✅ GOOGLE TASKS

### Create Task
```bash
POST /tasks/create
Content-Type: application/json

{
  "title": "Complete project proposal",
  "notes": "Due by end of week",
  "dueDate": "2026-10-05"
}
```

**Response:**
```json
{
  "success": true,
  "taskId": "task_1695974640000",
  "title": "Complete project proposal",
  "message": "Task created"
}
```

### Get Tasks
```bash
GET /tasks/list
```

### Complete Task
```bash
POST /tasks/complete
Content-Type: application/json

{
  "taskId": "task_1695974640000"
}
```

---

## 📸 GOOGLE PHOTOS

### Upload Photo
```bash
POST /photos/upload
Content-Type: application/json

{
  "fileName": "vacation.jpg",
  "fileData": "base64_encoded_image",
  "creationTime": "2026-09-30T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "photoId": "photo_1695974640000",
  "fileName": "vacation.jpg",
  "message": "Photo uploaded"
}
```

### Create Album
```bash
POST /photos/create-album
Content-Type: application/json

{
  "title": "Summer Vacation 2026",
  "description": "Photos from summer trip"
}
```

### Add Photo to Album
```bash
POST /photos/add-to-album
Content-Type: application/json

{
  "albumId": "album_123",
  "photoId": "photo_456"
}
```

---

## 🎯 SMART COMMAND ROUTING

JARVIS automatically detects Google service keywords:

### Keyword Triggers

| Keyword | Service |
|---------|---------|
| search, lookup, find | Google Search |
| email, gmail, send, message | Gmail |
| calendar, event, meeting, schedule | Google Calendar |
| drive, file, upload, download | Google Drive |
| map, direction, location, nearby | Google Maps |
| translate, language | Google Translate |
| sheet, spreadsheet, data | Google Sheets |
| document, doc, write | Google Docs |
| youtube, video | YouTube |
| task, todo, reminder | Google Tasks |
| photo, picture, album | Google Photos |

### Example Commands

```
"Search for Python tutorials"
→ Triggers: Google Search

"Send email to boss with project update"
→ Triggers: Gmail

"What's the weather and nearby restaurants?"
→ Triggers: Google Maps (nearby places)

"Create a spreadsheet for Q4 budget"
→ Triggers: Google Sheets

"Translate 'good morning' to 10 languages"
→ Triggers: Google Translate

"Upload my vacation photos"
→ Triggers: Google Photos
```

---

## 📊 RESPONSE CODES

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (missing parameters) |
| 404 | Not Found |
| 500 | Server Error |

---

## 🔐 Authentication

Currently all endpoints work with **mock data** for testing.

To use **real Google APIs**:

1. Get API keys from Google Cloud Console
2. Add to `.env` file:
   ```
   GOOGLE_SEARCH_API_KEY=your_key
   GOOGLE_GMAIL_TOKEN=your_token
   GOOGLE_CALENDAR_TOKEN=your_token
   ... etc
   ```
3. Server will use real APIs instead of mock data

---

## 💡 Code Examples

### JavaScript/Node.js

```javascript
// Chat with JARVIS
const response = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Search for machine learning',
    userId: 'user123'
  })
});

const data = await response.json();
console.log(data.response);
```

### Python

```python
import requests
import json

url = 'http://localhost:3000/api/chat'
payload = {
  'message': 'Create a calendar event',
  'userId': 'user123'
}

response = requests.post(url, json=payload)
data = response.json()
print(data['response'])
```

### cURL

```bash
# Search
curl "http://localhost:3000/api/search?q=machine+learning"

# Send Email
curl -X POST http://localhost:3000/api/gmail/send \
  -H "Content-Type: application/json" \
  -d '{
    "to":"user@example.com",
    "subject":"Hello",
    "body":"Test message"
  }'

# Get Calendar
curl http://localhost:3000/api/calendar/events

# Create Task
curl -X POST http://localhost:3000/api/tasks/create \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Important task"
  }'
```

---

## 🚀 Quick Start

1. **Start Server:**
   ```bash
   npm start
   ```

2. **Open Frontend:**
   ```
   http://localhost:3000
   ```

3. **Try Commands:**
   - Type: "Search for Python"
   - Type: "Send email to john@example.com"
   - Type: "Create calendar event"

4. **Check API:**
   ```bash
   curl http://localhost:3000/api/health
   ```

---

## 📞 Support

For issues:
1. Check JARVIS_GOOGLE_SKILLS_SETUP.txt
2. Verify server is running
3. Check browser console (F12)
4. Test API endpoints with curl

---

## 🎉 You're All Set!

JARVIS v3.0 with 11 Google Skills is ready to use.

**Dream. Build. Achieve. 🚀**
