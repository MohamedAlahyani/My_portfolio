"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import {
  getProjects,
  getSkills,
  getExperience,
  getAboutMe,
  getContactInfo,
  getHeroSection,
  addProject,
  updateProject,
  deleteProject,
  addSkill,
  updateSkill,
  deleteSkill,
  addExperienceEntry,
  updateExperienceEntry,
  deleteExperienceEntry,
  updateAboutMe,
  updateContactInfo,
  updateHeroSection,
} from "../actions" // Re-added mutation actions

interface TestResult {
  name: string
  status: "success" | "error" | "pending"
  message: string
}

export default function TestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const addTestResult = (result: TestResult) => {
    setTestResults((prev) => [...prev, result])
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setTestResults([])

    // Test Projects
    await testProjects()

    // Test Skills
    await testSkills()

    // Test Experience
    await testExperience()

    // Test About Me
    await testAboutMe()

    // Test Contact Info
    await testContactInfo()

    // Test Hero Section
    await testHeroSection()

    setIsRunning(false)
  }

  const testProjects = async () => {
    try {
      // Test Get Projects
      const projects = await getProjects()
      addTestResult({
        name: "Get Projects",
        status: projects.length > 0 ? "success" : "error",
        message: `Found ${projects.length} projects`,
      })

      // Test Add Project
      const newProjectFormData = new FormData()
      newProjectFormData.append("title", "Test Project")
      newProjectFormData.append("description", "This is a test project.")
      newProjectFormData.append("tags", "Test, Demo")
      newProjectFormData.append("demoUrl", "https://test.com")
      newProjectFormData.append("repoUrl", "https://github.com/test")
      const addResult = await addProject({ success: false, message: "" }, newProjectFormData)
      addTestResult({
        name: "Add Project",
        status: addResult.success ? "success" : "error",
        message: addResult.message,
      })

      // Get projects again to find the newly added one
      const updatedProjects = await getProjects()
      const addedProject = updatedProjects.find((p) => p.title === "Test Project")

      if (addedProject) {
        // Test Update Project
        const updateProjectFormData = new FormData()
        updateProjectFormData.append("id", addedProject.id)
        updateProjectFormData.append("title", "Updated Test Project")
        updateProjectFormData.append("description", "This is an updated test project.")
        updateProjectFormData.append("tags", "Updated, Test")
        updateProjectFormData.append("demoUrl", "https://updated-test.com")
        updateProjectFormData.append("repoUrl", "https://github.com/updated-test")
        const updateResult = await updateProject({ success: false, message: "" }, updateProjectFormData)
        addTestResult({
          name: "Update Project",
          status: updateResult.success ? "success" : "error",
          message: updateResult.message,
        })

        // Test Delete Project
        const deleteResult = await deleteProject(addedProject.id)
        addTestResult({
          name: "Delete Project",
          status: deleteResult.success ? "success" : "error",
          message: deleteResult.message,
        })
      } else {
        addTestResult({
          name: "Update/Delete Project",
          status: "error",
          message: "Could not find added project for update/delete tests.",
        })
      }
    } catch (error: any) {
      addTestResult({
        name: "Projects Test",
        status: "error",
        message: `Error: ${error.message || error}`,
      })
    }
  }

  const testSkills = async () => {
    try {
      // Test Get Skills
      const skills = await getSkills()
      addTestResult({
        name: "Get Skills",
        status: skills.length > 0 ? "success" : "error",
        message: `Found ${skills.length} skills`,
      })

      // Test Add Skill
      const newSkillFormData = new FormData()
      newSkillFormData.append("name", "Test Skill")
      newSkillFormData.append("level", "75")
      const addResult = await addSkill({ success: false, message: "" }, newSkillFormData)
      addTestResult({
        name: "Add Skill",
        status: addResult.success ? "success" : "error",
        message: addResult.message,
      })

      // Get skills again to find the newly added one
      const updatedSkills = await getSkills()
      const addedSkill = updatedSkills.find((s) => s.name === "Test Skill")

      if (addedSkill) {
        // Test Update Skill
        const updateSkillFormData = new FormData()
        updateSkillFormData.append("id", addedSkill.id)
        updateSkillFormData.append("name", "Updated Test Skill")
        updateSkillFormData.append("level", "80")
        const updateResult = await updateSkill({ success: false, message: "" }, updateSkillFormData)
        addTestResult({
          name: "Update Skill",
          status: updateResult.success ? "success" : "error",
          message: updateResult.message,
        })

        // Test Delete Skill
        const deleteResult = await deleteSkill(addedSkill.id)
        addTestResult({
          name: "Delete Skill",
          status: deleteResult.success ? "success" : "error",
          message: deleteResult.message,
        })
      } else {
        addTestResult({
          name: "Update/Delete Skill",
          status: "error",
          message: "Could not find added skill for update/delete tests.",
        })
      }
    } catch (error: any) {
      addTestResult({
        name: "Skills Test",
        status: "error",
        message: `Error: ${error.message || error}`,
      })
    }
  }

  const testExperience = async () => {
    try {
      // Test Get Experience
      const experience = await getExperience()
      addTestResult({
        name: "Get Experience",
        status: experience.length > 0 ? "success" : "error",
        message: `Found ${experience.length} experience entries`,
      })

      // Test Add Experience Entry
      const newExperienceFormData = new FormData()
      newExperienceFormData.append("title", "Test Role")
      newExperienceFormData.append("company", "Test Company")
      newExperienceFormData.append("period", "2023 - Present")
      newExperienceFormData.append("description", "Did test things.")
      newExperienceFormData.append("start_date", "2023-01-01")
      const addResult = await addExperienceEntry({ success: false, message: "" }, newExperienceFormData)
      addTestResult({
        name: "Add Experience Entry",
        status: addResult.success ? "success" : "error",
        message: addResult.message,
      })

      // Get experience again to find the newly added one
      const updatedExperience = await getExperience()
      const addedExperience = updatedExperience.find((e) => e.title === "Test Role")

      if (addedExperience) {
        // Test Update Experience Entry
        const updateExperienceFormData = new FormData()
        updateExperienceFormData.append("id", addedExperience.id)
        updateExperienceFormData.append("title", "Updated Test Role")
        updateExperienceFormData.append("company", "Updated Test Company")
        updateExperienceFormData.append("period", "2023 - 2024")
        updateExperienceFormData.append("description", "Did updated test things.")
        updateExperienceFormData.append("start_date", "2023-01-01")
        updateExperienceFormData.append("end_date", "2024-01-01")
        const updateResult = await updateExperienceEntry({ success: false, message: "" }, updateExperienceFormData)
        addTestResult({
          name: "Update Experience Entry",
          status: updateResult.success ? "success" : "error",
          message: updateResult.message,
        })

        // Test Delete Experience Entry
        const deleteResult = await deleteExperienceEntry(addedExperience.id)
        addTestResult({
          name: "Delete Experience Entry",
          status: deleteResult.success ? "success" : "error",
          message: deleteResult.message,
        })
      } else {
        addTestResult({
          name: "Update/Delete Experience",
          status: "error",
          message: "Could not find added experience for update/delete tests.",
        })
      }
    } catch (error: any) {
      addTestResult({
        name: "Experience Test",
        status: "error",
        message: `Error: ${error.message || error}`,
      })
    }
  }

  const testAboutMe = async () => {
    try {
      // Test Get About Me
      const aboutMe = await getAboutMe()
      addTestResult({
        name: "Get About Me",
        status: aboutMe ? "success" : "error",
        message: aboutMe ? `Found about me data for ${aboutMe.name}` : "No about me data found",
      })

      if (aboutMe) {
        // Test Update About Me
        const updateAboutMeFormData = new FormData()
        updateAboutMeFormData.append("id", aboutMe.id)
        updateAboutMeFormData.append("name", "Test User")
        updateAboutMeFormData.append("email", "test@example.com")
        updateAboutMeFormData.append("location", "Test Location")
        updateAboutMeFormData.append("availability", "Test Availability")
        updateAboutMeFormData.append("content", "Test content for about me.")
        const updateResult = await updateAboutMe({ success: false, message: "" }, updateAboutMeFormData)
        addTestResult({
          name: "Update About Me",
          status: updateResult.success ? "success" : "error",
          message: updateResult.message,
        })
      }
    } catch (error: any) {
      addTestResult({
        name: "About Me Test",
        status: "error",
        message: `Error: ${error.message || error}`,
      })
    }
  }

  const testContactInfo = async () => {
    try {
      // Test Get Contact Info
      const contactInfo = await getContactInfo()
      addTestResult({
        name: "Get Contact Info",
        status: contactInfo ? "success" : "error",
        message: contactInfo ? `Found contact info for ${contactInfo.email}` : "No contact info found",
      })

      if (contactInfo) {
        // Test Update Contact Info
        const updateContactInfoFormData = new FormData()
        updateContactInfoFormData.append("id", contactInfo.id)
        updateContactInfoFormData.append("email", "updated@example.com")
        updateContactInfoFormData.append("linkedin_url", "https://linkedin.com/updated")
        updateContactInfoFormData.append("github_url", "https://github.com/updated")
        updateContactInfoFormData.append("instagram_url", "https://instagram.com/updated")
        updateContactInfoFormData.append("availability_status", "Updated Status")
        const updateResult = await updateContactInfo({ success: false, message: "" }, updateContactInfoFormData)
        addTestResult({
          name: "Update Contact Info",
          status: updateResult.success ? "success" : "error",
          message: updateResult.message,
        })
      }
    } catch (error: any) {
      addTestResult({
        name: "Contact Info Test",
        status: "error",
        message: `Error: ${error.message || error}`,
      })
    }
  }

  const testHeroSection = async () => {
    try {
      // Test Get Hero Section
      const heroSection = await getHeroSection()
      addTestResult({
        name: "Get Hero Section",
        status: heroSection ? "success" : "error",
        message: heroSection ? `Found hero section: ${heroSection.headline}` : "No hero section found",
      })

      if (heroSection) {
        // Test Update Hero Section
        const updateHeroSectionFormData = new FormData()
        updateHeroSectionFormData.append("id", heroSection.id)
        updateHeroSectionFormData.append("headline", "Updated Headline")
        updateHeroSectionFormData.append("description", "Updated description for hero section.")
        const updateResult = await updateHeroSection({ success: false, message: "" }, updateHeroSectionFormData)
        addTestResult({
          name: "Update Hero Section",
          status: updateResult.success ? "success" : "error",
          message: updateResult.message,
        })
      }
    } catch (error: any) {
      addTestResult({
        name: "Hero Section Test",
        status: "error",
        message: `Error: ${error.message || error}`,
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      default:
        return null
    }
  }

  const successCount = testResults.filter((r) => r.status === "success").length
  const errorCount = testResults.filter((r) => r.status === "error").length
  const totalTests = testResults.length

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Admin Panel Test Suite</h1>
          <p className="text-zinc-600">Test all read and write operations to verify functionality</p>
        </div>
        <Button onClick={runAllTests} disabled={isRunning} className="bg-zinc-900 hover:bg-zinc-800 text-white">
          {isRunning ? "Running Tests..." : "Run All Tests"}
        </Button>
      </div>

      {testResults.length > 0 && (
        <Card className="bg-white border border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Test Results</span>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{successCount} Passed</Badge>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{errorCount} Failed</Badge>
                <Badge className="bg-zinc-100 text-zinc-800 hover:bg-zinc-100">{totalTests} Total</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-200"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <div className="font-medium text-zinc-900">{result.name}</div>
                      <div className="text-sm text-zinc-600">{result.message}</div>
                    </div>
                  </div>
                  {getStatusBadge(result.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white border border-zinc-200 shadow-sm">
        <CardHeader>
          <CardTitle>Test Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Projects</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Get all projects</li>
                <li>• Add new project</li>
                <li>• Update existing project</li>
                <li>• Delete project</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Skills</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Get all skills</li>
                <li>• Add new skill</li>
                <li>• Update existing skill</li>
                <li>• Delete skill</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Experience</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Get all experience entries</li>
                <li>• Add new experience entry</li>
                <li>• Update existing experience entry</li>
                <li>• Delete experience entry</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <h3 className="font-semibold text-orange-900 mb-2">About Me</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Get about me data</li>
                <li>• Update about me data</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
              <h3 className="font-semibold text-pink-900 mb-2">Contact Info</h3>
              <ul className="text-sm text-pink-700 space-y-1">
                <li>• Get contact information</li>
                <li>• Update contact information</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
              <h3 className="font-semibold text-indigo-900 mb-2">Hero Section</h3>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Get hero section data</li>
                <li>• Update hero section data</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
