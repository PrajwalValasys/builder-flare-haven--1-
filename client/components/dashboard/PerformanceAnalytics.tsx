import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";
import { TrendingUp, Target, Calendar, BarChart3 } from "lucide-react";

// Mock performance data
const performanceData = [
  {
    date: "2024-01",
    accounts: 920,
    credits: 12000,
    conversion: 89.2,
    goal: 1000,
  },
  {
    date: "2024-02",
    accounts: 1050,
    credits: 13500,
    conversion: 91.5,
    goal: 1000,
  },
  {
    date: "2024-03",
    accounts: 1180,
    credits: 14200,
    conversion: 88.7,
    goal: 1200,
  },
  {
    date: "2024-04",
    accounts: 1220,
    credits: 15100,
    conversion: 92.1,
    goal: 1200,
  },
  {
    date: "2024-05",
    accounts: 1350,
    credits: 16800,
    conversion: 94.3,
    goal: 1300,
  },
  {
    date: "2024-06",
    accounts: 1420,
    credits: 17200,
    conversion: 93.8,
    goal: 1400,
  },
];

const comparisonData = [
  { period: "This Week", current: 342, previous: 298, change: 14.8 },
  { period: "This Month", current: 1420, previous: 1350, change: 5.2 },
  { period: "This Quarter", current: 4190, previous: 3850, change: 8.8 },
  { period: "This Year", current: 14520, previous: 12800, change: 13.4 },
];

const conversionFunnelData = [
  { stage: "Leads Generated", value: 10000, percentage: 100, color: "#4A90E2" },
  { stage: "Qualified Leads", value: 7500, percentage: 75, color: "#F0675C" },
  { stage: "Engaged Prospects", value: 4500, percentage: 45, color: "#F5A243" },
  {
    stage: "Converted Accounts",
    value: 1420,
    percentage: 14.2,
    color: "#10b981",
  },
];

export default function PerformanceAnalytics() {
  const [activeTab, setActiveTab] = useState("trends");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-valasys-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-valasys-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-valasys-gray-900 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-valasys-orange" />
          Performance Analytics
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="goals">Goal Tracking</TabsTrigger>
        </TabsList>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-valasys-orange" />
                Performance Trends (6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="accounts"
                      stroke="#F0675C"
                      strokeWidth={3}
                      name="Accounts Verified"
                    />
                    <Line
                      type="monotone"
                      dataKey="credits"
                      stroke="#4A90E2"
                      strokeWidth={3}
                      name="Credits Used"
                    />
                    <Line
                      type="monotone"
                      dataKey="conversion"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Conversion Rate"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comparisonData.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-valasys-gray-600">
                      {item.period}
                    </h3>
                    <div
                      className={`flex items-center text-sm ${
                        item.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {item.change >= 0 ? "+" : ""}
                      {item.change}%
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-valasys-gray-900 mb-1">
                    {item.current.toLocaleString()}
                  </div>
                  <div className="text-xs text-valasys-gray-500">
                    vs {item.previous.toLocaleString()} previous
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Conversion Funnel Tab */}
        <TabsContent value="funnel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnelData.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-valasys-gray-700">
                        {stage.stage}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-valasys-gray-600">
                          {stage.value.toLocaleString()}
                        </span>
                        <span className="text-xs text-valasys-gray-500">
                          ({stage.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-valasys-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${stage.percentage}%`,
                          backgroundColor: stage.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goal Tracking Tab */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-valasys-orange" />
                Goal vs Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="accounts"
                      fill="#4A90E2"
                      radius={[4, 4, 0, 0]}
                      name="Actual"
                    />
                    <Bar
                      dataKey="goal"
                      fill="#F0675C"
                      radius={[4, 4, 0, 0]}
                      name="Goal"
                      opacity={0.7}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
