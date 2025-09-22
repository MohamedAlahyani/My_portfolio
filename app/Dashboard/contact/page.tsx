"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Save, Eye, Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactData {
  // Basic Contact Info
  email: string
  phone: string
  location: string
  availability: string

  // Social Media
  socialMedia: {
    website?: string
    linkedin?: string
    github?: string
    twitter?: string
  }

  // Contact Form Settings
  contactForm: {
    enabled: boolean
    title: string
    description: string
    buttonText: string
    successMessage: string
  }

  // Contact Preferences
  preferences: {
    preferredMethod: string
    responseTime: string
    availableForWork: boolean
  }
}

// Default contact data based on the user's portfolio
const defaultContactData: ContactData = {
  email: "yourname@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, Country",
  availability: "Available for freelance and full-time opportunities",
  socialMedia: {
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
  },
  contactForm: {
    enabled: true,
    title: "Get In Touch",
    description: "I'd love to hear from you. Send me a message and I'll respond as soon as possible.",
    buttonText: "Send Me a Message",
    successMessage: "Thank you for your message! I'll get back to you soon.",
  },
  preferences: {
    preferredMethod: "email",
    responseTime: "24-48 hours",
    availableForWork: true,
  },
}

const socialPlatforms = [
  { key: "website", label: "Website", icon: Globe, placeholder: "https://yourwebsite.com" },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/yourprofile" },
  { key: "github", label: "GitHub", icon: Github, placeholder: "https://github.com/yourusername" },
  { key: "twitter", label: "Twitter", icon: Twitter, placeholder: "https://twitter.com/yourusername" },
]

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactData>(defaultContactData)
  const [isPreview, setIsPreview] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const savedData = localStorage.getItem("cms-contact-data")
    if (savedData) {
      setContactData(JSON.parse(savedData))
    } else {
      // Load default contact data if none exist
      localStorage.setItem("cms-contact-data", JSON.stringify(defaultContactData))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("cms-contact-data", JSON.stringify(contactData))
    toast({
      title: "Success",
      description: "Contact information has been saved successfully.",
    })
  }

  const updateContactData = (path: string, value: any) => {
    setContactData((prev) => {
      const keys = path.split(".")
      const updated = { ...prev }
      let current: any = updated

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return updated
    })
  }

  if (isPreview) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Get In Touch Preview
              </h1>
              <p className="text-slate-400">Preview how your contact section will be displayed on your portfolio</p>
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
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6">
                  <span className="text-purple-300 text-sm font-medium">Let's Connect</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">{contactData.contactForm.title}</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{contactData.email}</p>
                          <p className="text-slate-400 text-sm">Email</p>
                        </div>
                      </div>

                      {contactData.phone && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Phone className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{contactData.phone}</p>
                            <p className="text-slate-400 text-sm">Phone</p>
                          </div>
                        </div>
                      )}

                      {contactData.location && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{contactData.location}</p>
                            <p className="text-slate-400 text-sm">Location</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Current Status</h3>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <p className="text-green-400 font-medium">{contactData.availability}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                {contactData.contactForm.enabled && (
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Send Me a Message</h3>
                    <p className="text-slate-400 mb-6">{contactData.contactForm.description}</p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-300">Your Name</Label>
                          <Input
                            placeholder="Enter your name"
                            disabled
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Your Email</Label>
                          <Input
                            placeholder="Enter your email"
                            disabled
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Subject</Label>
                        <Input
                          placeholder="What's this about?"
                          disabled
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Message</Label>
                        <Textarea
                          placeholder="Your message..."
                          rows={4}
                          disabled
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                        />
                      </div>
                      <Button
                        disabled
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        {contactData.contactForm.buttonText}
                      </Button>
                    </div>
                  </div>
                )}
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
              Contact Form Manager
            </h1>
            <p className="text-slate-400">Manage your contact information and form settings</p>
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
          {/* Basic Contact Information */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>Contact Information</span>
              </CardTitle>
              <CardDescription className="text-slate-400">Your primary contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={contactData.email}
                  onChange={(e) => updateContactData("email", e.target.value)}
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
                  value={contactData.phone}
                  onChange={(e) => updateContactData("phone", e.target.value)}
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
                  value={contactData.location}
                  onChange={(e) => updateContactData("location", e.target.value)}
                  placeholder="Your City, Country"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability" className="text-slate-300">
                  Availability Status
                </Label>
                <Input
                  id="availability"
                  value={contactData.availability}
                  onChange={(e) => updateContactData("availability", e.target.value)}
                  placeholder="Available for freelance and full-time opportunities"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Settings */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Globe className="w-5 h-5 text-purple-400" />
                <span>Contact Form Settings</span>
              </CardTitle>
              <CardDescription className="text-slate-400">Configure your contact form</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="form-enabled" className="text-slate-300">
                  Enable Contact Form
                </Label>
                <Switch
                  id="form-enabled"
                  checked={contactData.contactForm.enabled}
                  onCheckedChange={(checked) => updateContactData("contactForm.enabled", checked)}
                />
              </div>

              {contactData.contactForm.enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="form-title" className="text-slate-300">
                      Form Title
                    </Label>
                    <Input
                      id="form-title"
                      value={contactData.contactForm.title}
                      onChange={(e) => updateContactData("contactForm.title", e.target.value)}
                      placeholder="Get In Touch"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="form-description" className="text-slate-300">
                      Form Description
                    </Label>
                    <Textarea
                      id="form-description"
                      value={contactData.contactForm.description}
                      onChange={(e) => updateContactData("contactForm.description", e.target.value)}
                      placeholder="Brief description for your contact form..."
                      rows={3}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="button-text" className="text-slate-300">
                      Button Text
                    </Label>
                    <Input
                      id="button-text"
                      value={contactData.contactForm.buttonText}
                      onChange={(e) => updateContactData("contactForm.buttonText", e.target.value)}
                      placeholder="Send Me a Message"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card className="lg:col-span-2 bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Globe className="w-5 h-5 text-purple-400" />
                <span>Social Media & Online Presence</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your social media profiles and online presence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {socialPlatforms.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <div key={platform.key} className="space-y-2">
                      <Label htmlFor={platform.key} className="flex items-center gap-2 text-slate-300">
                        <Icon className="h-4 w-4 text-purple-400" />
                        {platform.label}
                      </Label>
                      <Input
                        id={platform.key}
                        value={contactData.socialMedia[platform.key as keyof typeof contactData.socialMedia] || ""}
                        onChange={(e) => updateContactData(`socialMedia.${platform.key}`, e.target.value)}
                        placeholder={platform.placeholder}
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Contact Preferences */}
          <Card className="lg:col-span-2 bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>Contact Preferences</span>
              </CardTitle>
              <CardDescription className="text-slate-400">How you prefer to be contacted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferred-method" className="text-slate-300">
                    Preferred Contact Method
                  </Label>
                  <Select
                    value={contactData.preferences.preferredMethod}
                    onValueChange={(value) => updateContactData("preferences.preferredMethod", value)}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="email" className="text-white">
                        Email
                      </SelectItem>
                      <SelectItem value="phone" className="text-white">
                        Phone
                      </SelectItem>
                      <SelectItem value="linkedin" className="text-white">
                        LinkedIn
                      </SelectItem>
                      <SelectItem value="any" className="text-white">
                        Any method
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="response-time" className="text-slate-300">
                    Typical Response Time
                  </Label>
                  <Select
                    value={contactData.preferences.responseTime}
                    onValueChange={(value) => updateContactData("preferences.responseTime", value)}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="within-hours" className="text-white">
                        Within a few hours
                      </SelectItem>
                      <SelectItem value="24-48 hours" className="text-white">
                        24-48 hours
                      </SelectItem>
                      <SelectItem value="2-3 days" className="text-white">
                        2-3 business days
                      </SelectItem>
                      <SelectItem value="1 week" className="text-white">
                        Within a week
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="available-work" className="text-slate-300">
                    Available for Work
                  </Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="available-work"
                      checked={contactData.preferences.availableForWork}
                      onCheckedChange={(checked) => updateContactData("preferences.availableForWork", checked)}
                    />
                    <Label htmlFor="available-work" className="text-sm text-slate-300">
                      Currently available
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
