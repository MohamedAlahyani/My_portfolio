"use client"
import Link from 'next/link';
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Eye, Upload, User, Mail, MapPin, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AboutData {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  profileImage: string
  socialLinks: {
    linkedin: string
    github: string
    twitter: string
    website: string
  }
  availability: string
}

const defaultAboutData: AboutData = {
  name: "",
  title: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  profileImage: "",
  socialLinks: {
    linkedin: "",
    github: "",
    twitter: "",
    website: "",
  },
  availability: "Open for opportunities",
}
export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData)
  const [isPreview, setIsPreview] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const savedData = localStorage.getItem("cms-about-data")
    if (savedData) {
      setAboutData(JSON.parse(savedData))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("cms-about-data", JSON.stringify(aboutData))
    toast({
      title: "Success",
      description: "About me section has been saved successfully.",
    })
  }

  const handleInputChange = (field: keyof AboutData, value: string) => {
    setAboutData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSocialLinkChange = (platform: keyof AboutData["socialLinks"], value: string) => {
    setAboutData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  if (isPreview) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me Preview
              </h1>
              <p className="text-slate-400">Preview how your about section will look on your portfolio</p>
            </div>
            <Button
              onClick={() => setIsPreview(false)}
              variant="outline"
              className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
            >
              <Eye className="mr-2 h-4 w-4" />
              Edit Mode
            </Button>
          </div>

          <div className="bg-slate-950 rounded-lg p-8 border border-slate-800">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6">
                  <span className="text-purple-300 text-sm font-medium">My Professional Journey</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">About Me</h2>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  {aboutData.profileImage ? (
                    <img
                      src={
                        aboutData.profileImage || "/placeholder.svg?height=300&width=300&query=professional headshot"
                      }
                      alt={aboutData.name}
                      className="w-64 h-80 rounded-2xl object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="w-64 h-80 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
                      <User className="w-16 h-16 text-slate-600" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {aboutData.bio ||
                        "As a passionate Computer Scientist, I have experience in creating web applications, mobile applications, and databases. Building strong technical skills through projects and hands-on learning."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{aboutData.name || "Your Name"}</p>
                        <p className="text-slate-400 text-sm">{aboutData.title || "Computer Scientist"}</p>
                      </div>
                    </div>

                    {aboutData.email && (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{aboutData.email}</p>
                          <p className="text-slate-400 text-sm">Email</p>
                        </div>
                      </div>
                    )}

                    {aboutData.location && (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{aboutData.location}</p>
                          <p className="text-slate-400 text-sm">Location</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-green-400 font-medium">{aboutData.availability}</p>
                        <p className="text-slate-400 text-sm">Status</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me Editor
            </h1>
            <p className="text-slate-400">Manage your personal information and professional bio</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsPreview(true)}
              variant="outline"
              className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <User className="w-5 h-5 text-purple-400" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription className="text-slate-400">Your core personal and professional details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={aboutData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300">
                  Professional Title
                </Label>
                <Input
                  id="title"
                  value={aboutData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Computer Scientist, Full Stack Developer"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-slate-300">
                  Professional Bio
                </Label>
                <Textarea
                  id="bio"
                  value={aboutData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell your professional story and highlight your expertise..."
                  rows={6}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability" className="text-slate-300">
                  Availability Status
                </Label>
                <Input
                  id="availability"
                  value={aboutData.availability}
                  onChange={(e) => handleInputChange("availability", e.target.value)}
                  placeholder="e.g., Open for opportunities, Available for freelance"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>Contact Information</span>
              </CardTitle>
              <CardDescription className="text-slate-400">How people can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={aboutData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-300">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={aboutData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-slate-300">
                  Location
                </Label>
                <Input
                  id="location"
                  value={aboutData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, State/Country"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profileImage" className="text-slate-300">
                  Profile Image URL
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="profileImage"
                    value={aboutData.profileImage}
                    onChange={(e) => handleInputChange("profileImage", e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Globe className="w-5 h-5 text-purple-400" />
                <span>Social Links & Online Presence</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your professional social media and portfolio links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-slate-300">
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    value={aboutData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github" className="text-slate-300">
                    GitHub Profile
                  </Label>
                  <Input
                    id="github"
                    value={aboutData.socialLinks.github}
                    onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-slate-300">
                    Twitter/X Profile
                  </Label>
                  <Input
                    id="twitter"
                    value={aboutData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                    placeholder="https://twitter.com/yourusername"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-slate-300">
                    Personal Website
                  </Label>
                  <Input
                    id="website"
                    value={aboutData.socialLinks.website}
                    onChange={(e) => handleSocialLinkChange("website", e.target.value)}
                    placeholder="https://yourportfolio.com"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
