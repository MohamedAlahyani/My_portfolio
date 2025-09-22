import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Code, GraduationCap, Briefcase } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "About Me",
      value: "Active",
      description: "Profile section",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "My Skills",
      value: "11",
      description: "Technical skills",
      icon: Code,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Featured Projects",
      value: "6",
      description: "Portfolio items",
      icon: Briefcase,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Education",
      value: "3",
      description: "Academic entries",
      icon: GraduationCap,
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Portfolio CMS Dashboard
          </h1>
          <p className="text-slate-400 mt-2">Manage your portfolio content with ease and precision.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-200">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-slate-400">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-slate-400">
                Common tasks to manage your portfolio content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="h-2 w-2 bg-purple-500 rounded-full" />
                <span className="text-slate-300">Update about me section</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-slate-300">Add new featured project</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="h-2 w-2 bg-blue-500 rounded-full" />
                <span className="text-slate-300">Update skills proficiency</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="h-2 w-2 bg-orange-500 rounded-full" />
                <span className="text-slate-300">Add education timeline</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Portfolio Status</CardTitle>
              <CardDescription className="text-slate-400">Current state of your portfolio sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800">
                <span className="text-slate-300">About Me</span>
                <span className="text-green-400 text-sm">Complete</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800">
                <span className="text-slate-300">Skills</span>
                <span className="text-green-400 text-sm">Complete</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800">
                <span className="text-slate-300">Projects</span>
                <span className="text-green-400 text-sm">6 Items</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800">
                <span className="text-slate-300">Education</span>
                <span className="text-yellow-400 text-sm">Needs Update</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
