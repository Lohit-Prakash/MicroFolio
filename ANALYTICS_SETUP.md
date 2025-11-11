# Analytics & Monitoring Setup Guide

## Overview

Your MicroFolio portfolio now includes comprehensive analytics and monitoring capabilities powered by Firebase Analytics, Firestore, and custom tracking. This guide explains all the features and how to monitor your portfolio's performance and usage.

## 🎯 What's Tracked

### Automatic Tracking (via Firebase Analytics)

1. **Page Views**
   - Homepage visits
   - Navigation between sections
   - User flow through portfolio

2. **User Events**
   - App launches
   - Theme toggles
   - Navigation clicks

3. **Device & Browser Info**
   - Device type (mobile, tablet, desktop)
   - Browser type and version
   - Operating system
   - Screen resolution

### Custom Event Tracking

Our custom analytics library logs the following events:

```typescript
// Page Navigation
logPageView(pageName)  // Called on every page change

// User Actions
logResumeDownload()    // When resume is downloaded
logContactSubmission() // When contact form is used
logProjectView(name)   // When a project is viewed
logModalOpen(type)     // When modals are opened
logCustomEvent()       // For custom tracking
```

### Event Counter Tracking

The app stores counters for:
- `totalPageViews` - Total portfolio visits
- `resumeDownloads` - Resume download count
- `contactSubmissions` - Contact form submissions
- `uniqueSessions` - Unique visitor sessions

## 📊 Analytics Dashboard

Access the analytics page at: `https://your-domain.com/#/admin/analytics`

### Dashboard Sections

#### 1. **Key Metrics Cards**
- Total Page Views
- Resume Downloads
- Contact Submissions
- Unique Sessions

#### 2. **Visitors & Page Views Chart**
- Line chart showing visitor trends
- Page view patterns over time
- Time range selector (7d, 30d, 90d)

#### 3. **Top Pages Section**
- Homepage
- Projects page
- About section
- Contact page
- Experience section

#### 4. **Device Usage**
- Desktop vs Mobile vs Tablet breakdown
- User distribution by device type

#### 5. **Recent Activity**
- Latest user interactions
- Timestamps and actions
- Geographic location (if available)

#### 6. **Firestore Usage Monitor**
- Real-time database usage stats
- Document count
- Storage consumption
- Read/write operations

#### 7. **Firebase Services Status**
- Database health
- Storage status
- Analytics status
- Hosting status

#### 8. **Billing & Cost Estimates**
Shows your free tier limits and estimated costs:

**Free Tier Limits:**
- ✓ 25,000 Firestore reads/day
- ✓ 20,000 Firestore writes/day
- ✓ 1GB Firestore storage
- ✓ 1GB Cloud Storage
- ✓ 10GB bandwidth/month for hosting
- ✓ Unlimited Firebase Analytics

**When You Start Paying:**
- Firestore: $0.06 per 100k reads after free tier
- Cloud Storage: $0.18/GB after 1GB
- Hosting Bandwidth: $0.15/GB after 10GB/month

#### 9. **Performance Metrics**
- API Response Time (target: < 200ms)
- Database Query Time (target: < 100ms)
- Uptime percentage (typical: 99.9%)

#### 10. **Export Options**
- Export analytics as CSV
- Export as PDF report
- Export as JSON data

## 🔧 How to Use Analytics Features

### Enable Analytics Tracking

Analytics are automatically enabled in the app. To use custom tracking:

```typescript
import { 
  logPageView, 
  logResumeDownload, 
  logContactSubmission,
  logProjectView,
  logCustomEvent 
} from "@/lib/analytics";

// Log page view
logPageView("about_section");

// Log resume download
logResumeDownload();

// Log contact submission
logContactSubmission(formData);

// Log project view
logProjectView("Drone Control System");

// Custom event
logCustomEvent("user_action", {
  action: "shared_project",
  projectName: "MyProject"
});
```

### View Real-Time Analytics

1. Navigate to Admin Dashboard
2. Click on **Analytics** tab
3. Real-time data loads automatically

### Monitor Firestore Usage

The Firestore Usage card shows:
- Current database documents
- Storage used vs limit
- Read/write operations
- Real-time sync status

### Check Billing Status

The Billing card displays:
- Current tier (Free/Paid)
- Estimated monthly cost
- Remaining free tier allocation
- Cost breakdown by service

## 📈 Performance Optimization Tips

Based on your analytics, consider these optimizations:

### If High Page Load Times:
1. Enable code splitting for large components
2. Lazy load images and modals
3. Compress static assets
4. Enable Cloud CDN

### If High Database Costs:
1. Add database indexes for frequent queries
2. Implement query filtering
3. Use document caching
4. Batch operations where possible

### If High Storage Usage:
1. Compress images (use WebP format)
2. Remove unused files
3. Implement cleanup routines
4. Use thumbnail generation

### If High Bandwidth:
1. Enable HTTP compression
2. Optimize bundle size
3. Implement browser caching
4. Use content delivery network (CDN)

## 🔐 Firestore Security with Analytics

### Current Rules (Development)
```javascript
match /databases/{database}/documents {
  match /{document=**} {
    allow read, write: if true;
  }
}
```

### Recommended Production Rules
```javascript
match /databases/{database}/documents {
  // Public read for portfolio data
  match /portfolios/{document=**} {
    allow read: if true;
    allow write: if request.auth != null;
  }

  // Analytics writes from app
  match /analytics/{document=**} {
    allow read: if request.auth != null;
    allow write: if request.auth != null;
  }

  // Events collection
  match /events/{document=**} {
    allow read: if request.auth != null;
    allow write: if request.auth != null;
  }
}
```

## 📱 Mobile Analytics

Analytics automatically track:
- Mobile vs Desktop sessions
- Touch interactions
- Device rotation events
- App resume/suspend states

### Mobile-Specific Metrics
- Session duration on mobile (typically shorter)
- Mobile conversion rates
- Device-specific errors

## 🌍 Geographic Analytics

Firebase Analytics provides:
- Country/Region distribution
- City-level data (with privacy)
- Language preferences
- Timezone information

Access this in Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to Analytics → Geo
4. View geographic distribution of users

## 🚨 Monitoring & Alerts

### Key Metrics to Monitor

1. **Bounce Rate** (pages without interaction)
2. **Session Duration** (engagement indicator)
3. **Error Rate** (technical issues)
4. **API Response Time** (performance)
5. **Database Latency** (query speed)

### Set Up Alerts

Monitor these thresholds:
- API Response > 500ms ⚠️
- Error rate > 1% ⚠️
- Database reads/day > 20,000 📊
- Storage usage > 800MB 📊

## 📊 Analytics in Firebase Console

For more detailed analytics, visit [Firebase Console](https://console.firebase.google.com):

1. **Realtime Dashboard**
   - Current active users
   - Live events
   - Geographic distribution

2. **Events Tab**
   - All logged events
   - Event parameters
   - Event frequencies

3. **Users Tab**
   - User count trends
   - User retention
   - Cohort analysis

4. **Audience Tab**
   - Create custom segments
   - User demographics
   - Behavior analysis

## 🔍 Debugging Analytics

### Check if Analytics is Working

1. Open browser Developer Tools (F12)
2. Go to Application → Cookies → Analytics
3. Look for `_ga`, `_gat` cookies
4. In Console, check for Firebase messages

### Common Issues

**Analytics not logging:**
- Check Firebase config in `src/lib/firebase.ts`
- Verify `measurementId` is correct
- Check browser console for errors
- Ensure analytics is enabled in Firebase Console

**Missing page views:**
- Verify `logPageView()` is called on navigation
- Check that routes are being tracked
- Review analytics.ts implementation

**High latency:**
- Check network tab in DevTools
- Monitor Firestore database performance
- Review query efficiency

## 📚 Additional Resources

- [Firebase Analytics Documentation](https://firebase.google.com/docs/analytics)
- [Firebase Firestore Pricing](https://firebase.google.com/pricing)
- [Firebase Console](https://console.firebase.google.com)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Performance Monitoring](https://firebase.google.com/docs/perf-mod)

## 🎓 Best Practices

1. **Privacy First**
   - Respect user privacy
   - Don't track sensitive data
   - Follow GDPR/CCPA compliance

2. **Regular Monitoring**
   - Check analytics weekly
   - Review trends monthly
   - Plan optimizations quarterly

3. **Data Retention**
   - Set data retention policies
   - Archive old data
   - Delete unnecessary records

4. **Cost Management**
   - Monitor free tier usage
   - Set up billing alerts
   - Optimize queries regularly

5. **Performance**
   - Keep API response < 200ms
   - Optimize database queries
   - Cache frequently accessed data

## 🤝 Support

For issues or questions:
1. Check [Firebase Documentation](https://firebase.google.com/docs)
2. Review Analytics implementation in `src/lib/analytics.ts`
3. Check Firebase Console for service status
4. Review browser console for errors

---

**Last Updated:** November 11, 2025
**Status:** ✅ Production Ready
