# Medical Q&A Server

A high-performance Express.js server providing medical questions and answers through RESTful APIs. Built with caching, security, and scalability in mind.

## 🚀 Features

- **Medical Q&A Database**: Access to comprehensive medical questions and answers
- **Smart Search**: Text-based search with intelligent suggestions
- **Caching System**: In-memory caching for improved performance (10-minute TTL)
- **Question Submission**: Users can submit new questions for review
- **Performance Optimized**: Compression, helmet security, and rate limiting
- **Mobile-Ready**: CORS enabled for cross-platform mobile app integration

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Node-Cache for in-memory caching
- **Security**: Helmet.js for security headers
- **Performance**: Compression middleware
- **Environment**: dotenv for configuration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd medical-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/medical-qa
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

## 📋 API Endpoints

### 1. Get Medical Questions (Paginated)
```http
GET /medical-questions?page=1&limit=10
```
**Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)

**Response:**
```json
[
  {
    "_id": "...",
    "input": "What causes headaches?",
    "output": "Headaches can be caused by..."
  }
]
```

### 2. Get Search Suggestions
```http
GET /suggestion?query=headache
```
**Parameters:**
- `query` (required): Search term

**Response:**
```json
[
  {
    "_id": "...",
    "input": "What causes headaches?"
  }
]
```

### 3. Get Answer for Specific Question
```http
GET /answer?query=What causes headaches?
```
**Parameters:**
- `query` (required): Exact question text

**Response:**
```json
{
  "answer": "Headaches can be caused by stress, dehydration, lack of sleep..."
}
```

### 4. Submit Question for Review
```http
POST /submit-question
Content-Type: application/json

{
  "input": "What are the symptoms of diabetes?"
}
```

**Response:**
```json
{
  "message": "Question submitted for review."
}
```

## 🏗️ Database Schema

### Medical Questions Model
```javascript
{
  input: String,    // The medical question
  output: String    // The corresponding answer
}
```

### Review Questions Model
```javascript
{
  input: String,           // Question submitted for review
  createdAt: Date         // Timestamp
}
```

## ⚡ Performance Features

- **Caching**: 10-minute TTL cache for frequently accessed data
- **Compression**: Gzip compression for faster response times
- **Security**: Helmet.js for security headers
- **Rate Limiting**: Maximum 50 items per page to prevent abuse
- **Lean Queries**: Mongoose lean() for faster database queries

## 🔧 Configuration

The server includes several optimizations:

- **CORS**: Configured for cross-origin requests (mobile app support)
- **Cache Control**: Browser caching headers (10 minutes)
- **Text Search**: MongoDB text indexing for efficient search
- **Error Handling**: Comprehensive error responses

## 📱 Mobile App Integration

This server is designed to work with:
- **React Native/Expo** applications
- **Cross-platform** mobile frameworks
- **Web applications** via CORS

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Yogesh Saini** - Self-Taught Web Developer
- Email: ys30371@gmail.com
- Phone: 6367365117

## 🔄 API Status Codes

- `200` - Success
- `400` - Bad Request (missing parameters)
- `404` - Not Found
- `409` - Conflict (duplicate question)
- `500` - Internal Server Error

## 🎯 Future Enhancements

- [ ] User authentication system
- [ ] Admin panel for question management
- [ ] Question categorization
- [ ] Advanced search filters
- [ ] API rate limiting
- [ ] Automated answer validation

---

*Built with ❤️ for better healthcare accessibility*
