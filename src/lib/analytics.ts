import { analytics, db } from "./firebase";
import { collection, query, where, getDocs, getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { logEvent } from "firebase/analytics";

export interface PageViewEvent {
  page: string;
  timestamp: Date;
  sessionId: string;
  userAgent: string;
  referrer: string;
}

export interface AnalyticsMetrics {
  totalVisitors: number;
  totalPageViews: number;
  uniqueSessions: number;
  avgSessionDuration: number;
  resumeDownloads: number;
  contactSubmissions: number;
  topPages: Array<{ page: string; views: number; percentage: number }>;
  trafficSources: Array<{ source: string; count: number; percentage: number }>;
  deviceBreakdown: Array<{ device: string; count: number; percentage: number }>;
  topLocations: Array<{ location: string; count: number }>;
}

// Log custom events to Firebase Analytics
export const logCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  try {
    logEvent(analytics, eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error logging analytics event:", error);
  }
};

// Log page view
export const logPageView = (pageName: string) => {
  logCustomEvent("page_view", {
    page_name: pageName,
    page_title: document.title,
    page_path: window.location.pathname,
  });
};

// Log resume download
export const logResumeDownload = () => {
  logCustomEvent("resume_download", {
    download_type: "PDF",
    timestamp: new Date().toISOString(),
  });
};

// Log contact form submission
export const logContactSubmission = (formData: Record<string, any>) => {
  logCustomEvent("contact_form_submission", {
    name: formData.name ? "provided" : "not_provided",
    email: formData.email ? "provided" : "not_provided",
    message_length: formData.message?.length || 0,
  });
};

// Log project view
export const logProjectView = (projectName: string) => {
  logCustomEvent("project_view", {
    project_name: projectName,
  });
};

// Log modal open
export const logModalOpen = (modalType: string) => {
  logCustomEvent("modal_open", {
    modal_type: modalType,
  });
};

// Store analytics data to Firestore
export const storeAnalyticsSnapshot = async () => {
  try {
    const analyticsRef = doc(db, "analytics", "snapshots");
    const existingDoc = await getDoc(analyticsRef);
    const existingData = existingDoc.data() || {};

    await setDoc(analyticsRef, {
      ...existingData,
      lastUpdated: serverTimestamp(),
      pageViews: (existingData.pageViews || 0) + 1,
    }, { merge: true });
  } catch (error) {
    console.error("Error storing analytics snapshot:", error);
  }
};

// Get analytics metrics from Firestore
export const getAnalyticsMetrics = async (): Promise<AnalyticsMetrics> => {
  try {
    const analyticsRef = doc(db, "analytics", "snapshots");
    const snap = await getDoc(analyticsRef);
    const data = snap.data() || {};

    return {
      totalVisitors: data.totalVisitors || 0,
      totalPageViews: data.pageViews || 0,
      uniqueSessions: data.uniqueSessions || 0,
      avgSessionDuration: data.avgSessionDuration || 0,
      resumeDownloads: data.resumeDownloads || 0,
      contactSubmissions: data.contactSubmissions || 0,
      topPages: data.topPages || [],
      trafficSources: data.trafficSources || [],
      deviceBreakdown: data.deviceBreakdown || [],
      topLocations: data.topLocations || [],
    };
  } catch (error) {
    console.error("Error fetching analytics metrics:", error);
    return {
      totalVisitors: 0,
      totalPageViews: 0,
      uniqueSessions: 0,
      avgSessionDuration: 0,
      resumeDownloads: 0,
      contactSubmissions: 0,
      topPages: [],
      trafficSources: [],
      deviceBreakdown: [],
      topLocations: [],
    };
  }
};

// Get Firestore usage information
export const getFirestoreUsageInfo = () => {
  return {
    projectId: "myportfolio-50a76",
    region: "us-central1",
    docLimit: "1,000,000",
    readLimit: "100,000 reads/day",
    writeLimit: "20,000 writes/day",
    deleteLimit: "20,000 deletes/day",
    storageLimit: "1 GB",
  };
};

// Get Firebase pricing info
export const getFirebasePricingInfo = () => {
  return {
    hosting: "Free tier available",
    firestore: "25,000 free reads/day, Pay-as-you-go after",
    storage: "1 GB free storage, $0.18/GB after",
    analytics: "Free tier",
    authentication: "Free tier",
  };
};

// Export Firebase Analytics instance
export const getFirebaseAnalytics = () => analytics;

// Track user behavior
export const trackUserBehavior = (action: string, details?: Record<string, any>) => {
  logCustomEvent("user_behavior", {
    action,
    ...details,
    timestamp: new Date().toISOString(),
  });
};

// Increment event counter
export const incrementEventCounter = async (eventName: string) => {
  try {
    const eventsRef = doc(db, "analytics", "events");
    const existingDoc = await getDoc(eventsRef);
    const existingData = existingDoc.data() || {};

    const currentCount = existingData[eventName] || 0;
    await setDoc(eventsRef, {
      ...existingData,
      [eventName]: currentCount + 1,
      lastUpdated: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error incrementing event counter:", error);
  }
};

// Get event statistics
export const getEventStatistics = async () => {
  try {
    const eventsRef = doc(db, "analytics", "events");
    const snap = await getDoc(eventsRef);
    return snap.data() || {};
  } catch (error) {
    console.error("Error fetching event statistics:", error);
    return {};
  }
};
