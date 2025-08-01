import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ManageImagesPage() {
  return (
    <Card className="bg-white border border-zinc-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-zinc-900">Manage Images</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-zinc-600">Content for managing uploaded images will go here.</p>
      </CardContent>
    </Card>
  )
}
