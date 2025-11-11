import { analytics, db } from "./firebase";
import { getDoc, doc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { logEvent } from "firebase/analytics";

export interface AnalyticsMetrics {
  totalPageViews: number;
  resumeDownloads: number;
  contactSubmissions: number;
  projectViews: number;
  emailClicks: number;
  totalEvents: number;
  lastUpdated: string;
}

// Log custom events to Firebase Analytics
export const logCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  try {
    logEvent(analytics, eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
    });
    
    // Also increment counter in Firestore
    incrementEventCounter(eventName);
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
  incrementEventCounter("totalPageViews");
};

// Log resume download
export const logResumeDownload = () => {
  logCustomEvent("resume_download", {
    download_type: "PDF",
    timestamp: new Date().toISOString(),
  });
  incrementEventCounter("resumeDownloads");
};

// Log contact form submission
export const logContactSubmission = (formData: Record<string, any>) => {
  logCustomEvent("contact_form_submission", {
    name: formData.name ? "provided" : "not_provided",
    email: formData.email ? "provided" : "not_provided",
    message_length: formData.message?.length || 0,
  });
  incrementEventCounter("contactSubmissions");
};

// Log project view
export const logProjectView = (projectName: string) => {
  logCustomEvent("project_view", {
    project_name: projectName,
  });
  incrementEventCounter("projectViews");
};

// Log email click
export const logEmailClick = () => {
  logCustomEvent("email_contact_click");
  incrementEventCounter("emailClicks");
};

// Log modal open
export const logModalOpen = (modalType: string) => {
  logCustomEvent("modal_open", {
    modal_type: modalType,
  });
};

// Increment event counter in Firestore
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

// Get analytics metrics from Firestore (Real Data)
export const getAnalyticsMetrics = async (): Promise<AnalyticsMetrics> => {
  try {
    const eventsRef = doc(db, "analytics", "events");
    const snap = await getDoc(eventsRef);
    const data = snap.data() || {};

    const metrics: AnalyticsMetrics = {
      totalPageViews: data.totalPageViews || 0,
      resumeDownloads: data.resumeDownloads || 0,
      contactSubmissions: data.contactSubmissions || 0,
      projectViews: data.projectViews || 0,
      emailClicks: data.emailClicks || 0,
      totalEvents: (data.totalPageViews || 0) + (data.resumeDownloads || 0) + (data.contactSubmissions || 0) + (data.projectViews || 0) + (data.emailClicks || 0),
      lastUpdated: data.lastUpdated || new Date().toISOString(),
    };

    return metrics;
  } catch (error) {
    console.error("Error fetching analytics metrics:", error);
    return {
      totalPageViews: 0,
      resumeDownloads: 0,
      contactSubmissions: 0,
      projectViews: 0,
      emailClicks: 0,
      totalEvents: 0,
      lastUpdated: new Date().toISOString(),
    };
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
