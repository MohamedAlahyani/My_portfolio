# Product Requirements Document (PRD)
## Portfolio CMS Dashboard

### Document Information
- **Project**: Portfolio Content Management System & Analytics Dashboard
- **Version**: 1.0
- **Date**: January 2, 2026
- **Owner**: Mohamed Alahyani
- **Tech Stack**: Next.js, Express.js, MongoDB, TypeScript

---

## 1. Executive Summary

This document outlines the requirements for developing a comprehensive Content Management System (CMS) dashboard for the Mohamed Alahyani portfolio website. The system will provide full CRUD operations for portfolio content management and advanced analytics tracking to monitor website performance, user engagement, and visitor statistics.

### 1.1 Business Objectives
- **Content Management**: Enable easy management of portfolio content without code deployment
- **Performance Tracking**: Monitor website performance and user engagement metrics
- **SEO Optimization**: Track SEO metrics and optimize content performance
- **Professional Presentation**: Demonstrate full-stack development capabilities

---

## 2. Product Overview

### 2.1 Core Components
1. **CMS Dashboard**: Web-based interface for content management
2. **Analytics Engine**: Real-time tracking and reporting system
3. **REST API**: Backend services for data operations
4. **Database Layer**: MongoDB data storage and retrieval

### 2.2 Target Users
- **Primary**: Mohamed Alahyani (Portfolio Owner)
- **Secondary**: Potential clients/employers reviewing technical capabilities

---

## 3. Functional Requirements

### 3.1 Content Management System (CMS)

#### 3.1.1 Dashboard Overview
- **Landing Page**: Summary cards showing content counts and recent activities
- **Quick Actions**: Direct access to create new content
- **Recent Changes**: Timeline of recent content modifications
- **System Status**: API health checks and database connection status

#### 3.1.2 CRUD Operations by Section

##### A. Hero Section Management
**Entities**: HeroSection
- **Create/Read/Update/Delete**: Hero content
- **Fields**: headline, description, profile_picture_url
- **Features**:
  - Rich text editor for descriptions
  - Image upload with preview
  - Real-time preview of changes

##### B. About Me Management
**Entities**: AboutMe
- **Create/Read/Update/Delete**: Personal information
- **Fields**: content, name, email, location, availability
- **Features**:
  - Markdown editor for content
  - Email validation
  - Availability status toggle

##### C. Projects Management
**Entities**: Project
- **Create/Read/Update/Delete**: Project information
- **Fields**: title, description, tags, image_url, demo_url, repo_url, created_at, updated_at
- **Features**:
  - Drag-and-drop project reordering
  - Tag management system
  - Image upload and optimization
  - URL validation for demo and repository links
  - Project status (published/draft)
  - Bulk operations (publish/unpublish multiple projects)

##### D. Skills Management
**Entities**: Skill
- **Create/Read/Update/Delete**: Technical skills
- **Fields**: name, level, updated_at
- **Features**:
  - Skill level slider (1-100)
  - Skill categorization (Frontend, Backend, Tools, etc.)
  - Bulk import/export functionality
  - Skill trending analysis

##### E. Experience/Education Management
**Entities**: Experience
- **Create/Read/Update/Delete**: Work experience and education
- **Fields**: title, company, period, description, start_date, end_date
- **Features**:
  - Date range picker
  - Rich text editor for descriptions
  - Company logo upload
  - Timeline visualization
  - Current position toggle

##### F. Contact Information Management
**Entities**: ContactInfo
- **Create/Read/Update/Delete**: Contact details and social links
- **Fields**: email, linkedin_url, github_url, instagram_url, availability_status
- **Features**:
  - Social media URL validation
  - Link preview and status checking
  - Availability status management

#### 3.1.3 Media Management
- **File Upload**: Support for images (JPEG, PNG, WebP)
- **Image Optimization**: Automatic compression and multiple sizes
- **CDN Integration**: Optional integration with cloud storage
- **Alt Text Management**: SEO-friendly image descriptions

#### 3.1.4 Content Scheduling
- **Draft System**: Save content as drafts before publishing
- **Scheduled Publishing**: Schedule content to go live at specific times
- **Version Control**: Track changes and revert to previous versions

### 3.2 Analytics System

#### 3.2.1 Website Performance Tracking
- **Page Views**: Track individual page visits
- **Unique Visitors**: Count unique users based on IP/session
- **Session Duration**: Average time spent on site
- **Bounce Rate**: Percentage of single-page sessions
- **Page Load Times**: Performance metrics for each page

#### 3.2.2 User Behavior Analytics
- **Navigation Patterns**: Most viewed sections and user flow
- **Device Analytics**: Desktop vs Mobile vs Tablet usage
- **Geographic Data**: Visitor location tracking (country/city level)
- **Referral Sources**: Traffic sources (direct, search, social, etc.)
- **Browser Analytics**: Browser and OS distribution

#### 3.2.3 Content Performance
- **Section Engagement**: Time spent on each portfolio section
- **Project Views**: Individual project page views and engagement
- **Contact Form Analytics**: Form submissions and conversion rates
- **Download Tracking**: Resume downloads and other file downloads

#### 3.2.4 SEO Analytics
- **Search Engine Rankings**: Track keyword performance
- **Meta Tag Performance**: Click-through rates from search results
- **Social Media Mentions**: Track shares and mentions
- **Backlink Monitoring**: Track incoming links

#### 3.2.5 Real-time Dashboard
- **Live Visitor Count**: Current active users
- **Real-time Events**: Live feed of user actions
- **Geographic Map**: Real-time visitor locations
- **Top Content**: Most popular content in real-time

#### 3.2.6 Reporting & Export
- **Custom Date Ranges**: Filter data by specific periods
- **Automated Reports**: Weekly/monthly email reports
- **Data Export**: CSV/PDF export capabilities
- **Comparative Analysis**: Compare different time periods

---

## 4. Technical Requirements

### 4.1 Architecture Overview
```
Frontend (Next.js)
├── Public Portfolio Site
└── Admin Dashboard

Backend (Express.js)
├── REST API Routes
├── Authentication Middleware
├── Analytics Tracking
└── Database Operations

Database (MongoDB)
├── Content Collections
├── Analytics Collections
└── User Sessions
```

### 4.2 Database Schema

#### 4.2.1 Content Collections

##### HeroSection Collection
```javascript
{
  _id: ObjectId,
  headline: String,
  description: String,
  profile_picture_url: String,
  created_at: Date,
  updated_at: Date
}
```

##### AboutMe Collection
```javascript
{
  _id: ObjectId,
  content: String, // Markdown content
  name: String,
  email: String,
  location: String,
  availability: String,
  image_url: String,
  created_at: Date,
  updated_at: Date
}
```

##### Projects Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  tags: [String],
  image_url: String,
  demo_url: String,
  repo_url: String,
  status: String, // 'published' | 'draft'
  featured: Boolean,
  order: Number,
  created_at: Date,
  updated_at: Date,
  published_at: Date
}
```

##### Skills Collection
```javascript
{
  _id: ObjectId,
  name: String,
  level: Number, // 1-100
  category: String, // 'frontend' | 'backend' | 'tools' | 'database'
  icon_url: String,
  created_at: Date,
  updated_at: Date
}
```

##### Experience Collection
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  period: String,
  description: String,
  start_date: Date,
  end_date: Date,
  current: Boolean,
  company_logo: String,
  location: String,
  type: String, // 'work' | 'education'
  created_at: Date,
  updated_at: Date
}
```

##### ContactInfo Collection
```javascript
{
  _id: ObjectId,
  email: String,
  linkedin_url: String,
  github_url: String,
  instagram_url: String,
  availability_status: String,
  resume_url: String,
  created_at: Date,
  updated_at: Date
}
```

#### 4.2.2 Analytics Collections

##### PageViews Collection
```javascript
{
  _id: ObjectId,
  page: String,
  visitor_id: String,
  session_id: String,
  timestamp: Date,
  user_agent: String,
  ip_address: String,
  referrer: String,
  duration: Number,
  device_type: String,
  browser: String,
  os: String,
  country: String,
  city: String
}
```

##### Sessions Collection
```javascript
{
  _id: ObjectId,
  session_id: String,
  visitor_id: String,
  start_time: Date,
  end_time: Date,
  page_count: Number,
  total_duration: Number,
  bounce: Boolean,
  entry_page: String,
  exit_page: String,
  device_info: Object,
  location: Object
}
```

##### Events Collection
```javascript
{
  _id: ObjectId,
  event_type: String, // 'click', 'download', 'contact_form', 'scroll'
  element: String,
  page: String,
  visitor_id: String,
  session_id: String,
  timestamp: Date,
  metadata: Object
}
```

### 4.3 API Endpoints

#### 4.3.1 Content Management API

##### Authentication
```
POST /api/admin/login
POST /api/admin/logout
GET  /api/admin/verify
```

##### Content CRUD Operations
```
# Hero Section
GET    /api/admin/hero
POST   /api/admin/hero
PUT    /api/admin/hero/:id
DELETE /api/admin/hero/:id

# About Me
GET    /api/admin/about
POST   /api/admin/about
PUT    /api/admin/about/:id
DELETE /api/admin/about/:id

# Projects
GET    /api/admin/projects
POST   /api/admin/projects
PUT    /api/admin/projects/:id
DELETE /api/admin/projects/:id
PUT    /api/admin/projects/reorder

# Skills
GET    /api/admin/skills
POST   /api/admin/skills
PUT    /api/admin/skills/:id
DELETE /api/admin/skills/:id
POST   /api/admin/skills/bulk

# Experience
GET    /api/admin/experience
POST   /api/admin/experience
PUT    /api/admin/experience/:id
DELETE /api/admin/experience/:id

# Contact Info
GET    /api/admin/contact
POST   /api/admin/contact
PUT    /api/admin/contact/:id
DELETE /api/admin/contact/:id

# Media Management
POST   /api/admin/media/upload
GET    /api/admin/media
DELETE /api/admin/media/:id
```

#### 4.3.2 Public API (for Portfolio Site)
```
GET /api/public/hero
GET /api/public/about
GET /api/public/projects
GET /api/public/skills
GET /api/public/experience
GET /api/public/contact
```

#### 4.3.3 Analytics API
```
# Tracking
POST /api/analytics/pageview
POST /api/analytics/event

# Admin Analytics
GET /api/admin/analytics/overview
GET /api/admin/analytics/pageviews
GET /api/admin/analytics/sessions
GET /api/admin/analytics/events
GET /api/admin/analytics/real-time
GET /api/admin/analytics/export
```

### 4.4 Frontend Components (Dashboard)

#### 4.4.1 Dashboard Layout
- **Sidebar Navigation**: Links to all management sections
- **Top Header**: User profile, notifications, logout
- **Main Content Area**: Dynamic content based on current section
- **Footer**: System information and quick links

#### 4.4.2 Content Management Components
- **Content List**: Table/grid view of content items
- **Content Editor**: Form-based editor with preview
- **Media Library**: Grid view of uploaded media
- **Rich Text Editor**: WYSIWYG editor for descriptions
- **Image Uploader**: Drag-and-drop file upload

#### 4.4.3 Analytics Components
- **Dashboard Cards**: Key metrics overview
- **Charts**: Line charts, bar charts, pie charts
- **Real-time Feed**: Live activity stream
- **Geographic Map**: Visitor location visualization
- **Data Tables**: Sortable and filterable data tables

### 4.5 Security Requirements

#### 4.5.1 Authentication & Authorization
- **JWT Tokens**: Secure API authentication
- **Session Management**: Automatic logout on inactivity
- **Role-based Access**: Future-proof for multiple admin levels
- **Password Security**: Bcrypt hashing

#### 4.5.2 Data Protection
- **Input Validation**: Sanitize all user inputs
- **XSS Protection**: Prevent cross-site scripting
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: API rate limiting to prevent abuse

#### 4.5.3 Privacy Compliance
- **IP Anonymization**: Partially anonymize visitor IPs
- **Data Retention**: Automatic cleanup of old analytics data
- **GDPR Compliance**: User data protection measures
- **Cookie Consent**: Transparent tracking disclosure

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **API Response Time**: < 200ms for content operations
- **Dashboard Load Time**: < 3 seconds initial load
- **Analytics Query Time**: < 5 seconds for complex reports
- **File Upload**: Support files up to 10MB

### 5.2 Scalability
- **Concurrent Users**: Support up to 100 admin sessions
- **Analytics Data**: Efficiently handle 10,000+ daily page views
- **Database Optimization**: Indexed queries for fast retrieval
- **Caching Strategy**: Redis caching for frequently accessed data

### 5.3 Reliability
- **Uptime**: 99.9% availability target
- **Error Handling**: Graceful error recovery and user feedback
- **Data Backup**: Automated daily database backups
- **Monitoring**: Real-time system health monitoring

### 5.4 Usability
- **Responsive Design**: Mobile-friendly dashboard interface
- **Intuitive Navigation**: Clear information architecture
- **Loading States**: Progressive loading indicators
- **Error Messages**: Clear, actionable error feedback

---

## 6. Implementation Phases

### Phase 1: Core CMS (Weeks 1-3)
- Basic CRUD operations for all content types
- Simple admin authentication
- Database setup and basic API endpoints
- Basic dashboard UI

### Phase 2: Enhanced CMS Features (Weeks 4-5)
- Rich text editing capabilities
- Image upload and management
- Content scheduling and drafts
- Improved dashboard UI/UX

### Phase 3: Analytics Foundation (Weeks 6-7)
- Basic tracking implementation
- Analytics data collection
- Simple reporting dashboard
- Real-time visitor tracking

### Phase 4: Advanced Analytics (Weeks 8-9)
- Advanced reporting features
- Geographic and device analytics
- Performance metrics
- Export functionality

### Phase 5: Polish & Optimization (Week 10)
- Performance optimization
- Security hardening
- UI/UX refinements
- Documentation completion

---

## 7. Success Metrics

### 7.1 Technical Metrics
- **API Performance**: All endpoints respond within target times
- **Database Efficiency**: Query optimization and proper indexing
- **Code Quality**: 90%+ test coverage
- **Security Audit**: Pass security vulnerability assessment

### 7.2 User Experience Metrics
- **Dashboard Usability**: Intuitive content management workflow
- **Data Accuracy**: Analytics data matches external validation tools
- **System Reliability**: Minimal downtime and error rates
- **Feature Adoption**: Regular use of all major features

### 7.3 Business Impact
- **Portfolio Performance**: Improved SEO and user engagement metrics
- **Content Management Efficiency**: Reduced time to update portfolio content
- **Professional Demonstration**: Showcase of full-stack development skills
- **Future Opportunities**: Foundation for potential client CMS projects

---

## 8. Risk Assessment & Mitigation

### 8.1 Technical Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Database performance with analytics data | High | Medium | Implement data archiving and indexing strategies |
| Third-party API dependencies | Medium | Low | Build fallback mechanisms for external services |
| Security vulnerabilities | High | Medium | Regular security audits and best practice implementation |

### 8.2 Project Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Scope creep | Medium | Medium | Clear requirements documentation and change control |
| Timeline delays | Medium | Medium | Agile development with regular milestone reviews |
| Resource constraints | Low | Low | Single developer project with realistic scope |

---

## 9. Future Enhancements

### 9.1 Potential Features
- **Multi-language Support**: Internationalization capabilities
- **Advanced SEO Tools**: Meta tag optimization and suggestions
- **Email Integration**: Newsletter management and contact form integration
- **Social Media Integration**: Auto-posting to social platforms
- **A/B Testing**: Content variation testing capabilities
- **API Documentation**: Auto-generated API documentation
- **Third-party Integrations**: Google Analytics, Hotjar, etc.

### 9.2 Scalability Considerations
- **Multi-tenant Architecture**: Support multiple portfolio sites
- **Microservices Migration**: Break down into smaller services
- **Cloud Deployment**: Container-based deployment strategy
- **CDN Integration**: Global content delivery network

---

## 10. Conclusion

This Portfolio CMS Dashboard represents a comprehensive solution for content management and analytics tracking. The system will demonstrate advanced full-stack development capabilities while providing practical value for portfolio maintenance and performance monitoring.

The implementation follows industry best practices for security, performance, and scalability, ensuring the system can serve as both a functional tool and a professional showcase of technical expertise.

---

**Document Version**: 1.0  
**Last Updated**: January 2, 2026  
**Next Review**: February 1, 2026