import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, Download, Globe, Calendar, Clock, MousePointer } from "lucide-react";

const EditAnalytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock analytics data
  const visitorsData = [
    { date: 'Jan 1', visitors: 65, pageViews: 120 },
    { date: 'Jan 2', visitors: 82, pageViews: 150 },
    { date: 'Jan 3', visitors: 71, pageViews: 130 },
    { date: 'Jan 4', visitors: 95, pageViews: 180 },
    { date: 'Jan 5', visitors: 88, pageViews: 165 },
    { date: 'Jan 6', visitors: 103, pageViews: 200 },
    { date: 'Jan 7', visitors: 92, pageViews: 175 }
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
      title: "Total Visitors",
      value: "3,547",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Page Views",
      value: "8,243",
      change: "+8.2%",
      icon: Eye,
      color: "text-green-600"
    },
    {
      title: "Resume Downloads",
      value: "127",
      change: "+15.3%",
      icon: Download,
      color: "text-purple-600"
    },
    {
      title: "Avg. Session Duration",
      value: "2m 34s",
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