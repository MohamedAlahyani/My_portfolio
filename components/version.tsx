"use client"

export function VersionButton() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION || "0.0.0"

  return (
    <button
      className="px-4 py-2 text-sm text-white bg-gray-800 rounded hover:bg-gray-700 cursor-default"
      disabled
    >
      v{version}
    </button>
  )
}