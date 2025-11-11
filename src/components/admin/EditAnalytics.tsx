import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Eye, Download, Globe, Calendar, Clock, MousePointer, AlertCircle, Database, Zap, Server, Activity, Info } from "lucide-react";
import { getFirebaseAnalytics } from "@/lib/analytics";

const EditAnalytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [eventStats, setEventStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [firestoreInfo] = useState({
    projectId: "myportfolio-50a76",
    region: "us-central1",
    docLimit: "1,000,000",
    readLimit: "100,000 reads/day",
    writeLimit: "20,000 writes/day",
  });

  // Load analytics on mount and subscribe to real-time updates
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const stats = await import("@/lib/analytics").then(m => m.getEventStatistics());
        setEventStats(stats);
      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAnalytics();
    
    // Set up interval to refresh analytics every 5 seconds
    const interval = setInterval(loadAnalytics, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Mock analytics data with time range
  const visitorsData = [
    { date: 'Day 1', visitors: 65, pageViews: 120 },
    { date: 'Day 2', visitors: 82, pageViews: 150 },
    { date: 'Day 3', visitors: 71, pageViews: 130 },
    { date: 'Day 4', visitors: 95, pageViews: 180 },
    { date: 'Day 5', visitors: 88, pageViews: 165 },
    { date: 'Day 6', visitors: 103, pageViews: 200 },
    { date: 'Day 7', visitors: 92, pageViews: 175 }
  ];

  const topPagesData = [
    { page: 'Home', visits: 1250, percentage: 35 },
    { page: 'Projects', visits: 890, percentage: 25 },
    { page: 'About', visits: 620, percentage: 17.5 },
    { page: 'Contact', visits: 445, percentage: 12.5 },
    { page: 'Experience', visits: 355, percentage: 10 }
  ];

  const trafficSourcesData = [
    { name: 'Direct', value: 40, color: '#3b82f6' },
    { name: 'Google', value: 30, color: '#10b981' },
    { name: 'LinkedIn', value: 15, color: '#6366f1' },
    { name: 'GitHub', value: 10, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#f59e0b' }
  ];

  const deviceData = [
    { device: 'Desktop', users: 65 },
    { device: 'Mobile', users: 30 },
    { device: 'Tablet', users: 5 }
  ];

  const stats = [
    {
      title: "Total Page Views",
      value: String(eventStats.totalPageViews || 0),
      change: "+12.5%",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Resume Downloads",
      value: String(eventStats.resumeDownloads || 0),
      change: "+15.3%",
      icon: Download,
      color: "text-purple-600"
    },
    {
      title: "Contact Submissions",
      value: String(eventStats.contactSubmissions || 0),
      change: "+8.2%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Project Views",
      value: String(eventStats.projectViews || 0),
      change: "+5.1%",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  const recentActivity = [
    { action: "Portfolio viewed", location: "San Francisco, CA", time: "2 minutes ago" },
    { action: "Resume downloaded", location: "New York, NY", time: "15 minutes ago" },
    { action: "Contact form submitted", location: "London, UK", time: "1 hour ago" },
    { action: "Project modal opened", location: "Berlin, DE", time: "2 hours ago" },
    { action: "About section viewed", location: "Tokyo, JP", time: "3 hours ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={timeRange === "7d" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("7d")}
          >
            7 Days
          </Button>
          <Button 
            variant={timeRange === "30d" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("30d")}
          >
            30 Days
          </Button>
          <Button 
            variant={timeRange === "90d" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("90d")}
          >
            90 Days
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Visitors & Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="pageViews" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficSourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPagesData.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{page.page}</p>
                      <p className="text-sm text-muted-foreground">{page.visits} visits</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{page.percentage}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {activity.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {activity.time}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Firebase Monitoring & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Firestore Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Firestore Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Free tier: 25,000 reads/day, unlimited writes (max 20,000/day), 1GB storage
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                  <p className="text-xs text-muted-foreground">Project ID</p>
                  <p className="font-mono text-sm font-semibold truncate">{firestoreInfo.projectId}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950">
                  <p className="text-xs text-muted-foreground">Region</p>
                  <p className="font-semibold text-sm">{firestoreInfo.region}</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
                  <p className="text-xs text-muted-foreground">Read Limit</p>
                  <p className="font-semibold text-sm">{firestoreInfo.readLimit}</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950">
                  <p className="text-xs text-muted-foreground">Write Limit</p>
                  <p className="font-semibold text-sm">{firestoreInfo.writeLimit}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Firebase Services Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Firebase Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">Firestore Database</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">Firebase Storage</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">Firebase Analytics</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">Firebase Hosting</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing & Cost Estimates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Billing & Cost Estimates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You're on Firebase's free tier. Costs only apply if you exceed free tier limits.
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Firestore Database</h3>
                <Badge variant="secondary">Free</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ 25,000 reads/day</li>
                <li>✓ 20,000 writes/day</li>
                <li>✓ 1 GB storage</li>
                <li>💰 $0.06/100k reads after</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Cloud Storage</h3>
                <Badge variant="secondary">Free</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ 1 GB storage included</li>
                <li>✓ Unlimited downloads</li>
                <li>✓ 1 GB uploads/month</li>
                <li>💰 $0.18/GB after limit</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Hosting</h3>
                <Badge variant="secondary">Free</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ 1 GB storage</li>
                <li>✓ 10 GB bandwidth/month</li>
                <li>✓ SSL certificates</li>
                <li>💰 $0.15/GB after limit</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Firebase Analytics</h3>
                <Badge variant="secondary">Free</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Unlimited events</li>
                <li>✓ Real-time dashboards</li>
                <li>✓ User properties</li>
                <li>💰 Always free</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Estimated Monthly Cost</h3>
                <Badge className="bg-green-100 text-green-800">$0</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Firestore: $0</li>
                <li>Storage: $0</li>
                <li>Hosting: $0</li>
                <li>Analytics: $0</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">When costs apply</h3>
                <Badge variant="outline">Threshold Based</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• &gt; 25k reads/day</li>
                <li>• &gt; 20k writes/day</li>
                <li>• &gt; 1GB storage</li>
                <li>• &gt; 10GB bandwidth</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <p className="text-sm text-muted-foreground mb-1">API Response Time</p>
                <p className="text-2xl font-bold">142ms</p>
                <p className="text-xs text-green-600 mt-1">✓ Excellent</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                <p className="text-sm text-muted-foreground mb-1">Database Query Time</p>
                <p className="text-2xl font-bold">89ms</p>
                <p className="text-xs text-green-600 mt-1">✓ Good</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                <p className="text-sm text-muted-foreground mb-1">Uptime</p>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-xs text-green-600 mt-1">✓ Reliable</p>
              </div>
            </div>
            <div className="p-4 rounded-lg border">
              <h3 className="font-semibold mb-3">Optimization Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Use Firestore indexing for frequently queried fields</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Enable Cloud CDN for Firebase Hosting</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Implement caching strategies for media files</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">→</span>
                  <span>Consider code splitting for large JavaScript bundles</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Data */}
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF Report
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAnalytics;