import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderDot, ImageIcon, Eye, Clock, ArrowRight, Plus, Upload } from "lucide-react"
import Link from "next/link"
import { getProjects, getSkills, getExperience } from "./actions"
import { redirect } from 'next/navigation'

export default async function DashboardOverviewPage() {
  redirect('/')


  // Fetch data for dashboard stats
  const [projects, skills, experience] = await Promise.all([getProjects(), getSkills(), getExperience()])

  const stats = [
    {
      title: "Total Projects",
      value: projects.length.toString(),
      description: `${projects.length > 0 ? "+" : ""}${projects.length} projects`,
      icon: <FolderDot className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Skills",
      value: skills.length.toString(),
      description: `${skills.length} technical skills`,
      icon: <ImageIcon className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Experience",
      value: experience.length.toString(),
      description: `${experience.length} work experiences`,
      icon: <Eye className="h-5 w-5 text-purple-600" />,
    },
    {
      title: "Last Updated",
      value: "Recently",
      description: "Content is up to date",
      icon: <Clock className="h-5 w-5 text-orange-600" />,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      description: `Portfolio has ${projects.length} projects`,
      time: "Current",
    },
    {
      id: 2,
      description: `${skills.length} skills are configured`,
      time: "Current",
    },
    {
      id: 3,
      description: `${experience.length} work experiences listed`,
      time: "Current",
    },
    {
      id: 4,
      description: "Database connection is active",
      time: "Now",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="bg-white border border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-zinc-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/dashboard/projects" className="block">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
                <Plus className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Add New Project</span>
              </div>
            </Link>
            <Link href="/dashboard/skills" className="block">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors">
                <Plus className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Add New Skill</span>
              </div>
            </Link>
            <Link href="/dashboard/experience" className="block">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors">
                <Plus className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-800">Add Experience Entry</span>
              </div>
            </Link>
            <Link href="/dashboard/images" className="block">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors">
                <Upload className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-800">Upload New Image</span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-gray-900">System Status</CardTitle>
          <Link href="/dashboard/test" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
            Run Tests <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0"
              >
                <p className="text-sm text-gray-700 flex-1">{activity.description}</p>
                <span className="text-xs text-gray-500 ml-4">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
