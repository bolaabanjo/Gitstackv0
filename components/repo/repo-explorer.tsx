"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FolderOpen, File, Search, Code } from "lucide-react"

interface Repository {
  id: string
  name: string
  full_name: string
  description: string
  url: string
  language: string
  stars: number
  forks: number
  updated_at: string
}

interface FileItem {
  name: string
  path: string
  type: "file" | "dir"
  size?: number
  content?: string
}

interface RepoExplorerProps {
  repository: Repository
}

export function RepoExplorer({ repository }: RepoExplorerProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentPath, setCurrentPath] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadDirectory("")
  }, [repository])

  const loadDirectory = async (path: string) => {
    setIsLoading(true)
    try {
      // In a real implementation, this would call GitHub API
      // For demo purposes, we'll simulate some file structure
      const mockFiles: FileItem[] = [
        { name: "src", path: "src", type: "dir" },
        { name: "components", path: "components", type: "dir" },
        { name: "pages", path: "pages", type: "dir" },
        { name: "README.md", path: "README.md", type: "file", size: 1024 },
        { name: "package.json", path: "package.json", type: "file", size: 512 },
        { name: ".gitignore", path: ".gitignore", type: "file", size: 256 },
      ]

      setFiles(mockFiles)
      setCurrentPath(path)
    } catch (error) {
      console.error("Error loading directory:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadFile = async (file: FileItem) => {
    if (file.type === "dir") {
      loadDirectory(file.path)
      return
    }

    try {
      // In a real implementation, this would fetch file content from GitHub API
      const mockContent = `// ${file.name}
// This is a demo file content for ${repository.full_name}

export default function ExampleComponent() {
  return (
    <div>
      <h1>Hello from ${file.name}</h1>
      <p>This file is part of ${repository.name}</p>
    </div>
  )
}`

      setSelectedFile({ ...file, content: mockContent })
    } catch (error) {
      console.error("Error loading file:", error)
    }
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getFileIcon = (file: FileItem) => {
    if (file.type === "dir") {
      return <FolderOpen className="h-4 w-4 text-blue-500" />
    }
    return <File className="h-4 w-4 text-gray-500" />
  }

  const getFileExtension = (filename: string) => {
    const ext = filename.split(".").pop()
    return ext ? ext.toUpperCase() : ""
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* File Browser */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Repository Explorer
          </CardTitle>
          <CardDescription>Browse files and folders in {repository.full_name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[400px]">
            <div className="space-y-1">
              {currentPath && (
                <div
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                  onClick={() => loadDirectory("")}
                >
                  <FolderOpen className="h-4 w-4" />
                  <span>..</span>
                </div>
              )}
              {filteredFiles.map((file) => (
                <div
                  key={file.path}
                  className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                  onClick={() => loadFile(file)}
                >
                  <div className="flex items-center gap-2">
                    {getFileIcon(file)}
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.type === "file" && getFileExtension(file.name) && (
                      <Badge variant="outline" className="text-xs">
                        {getFileExtension(file.name)}
                      </Badge>
                    )}
                    {file.size && (
                      <span className="text-xs text-muted-foreground">{Math.round(file.size / 1024)}KB</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* File Viewer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            File Viewer
          </CardTitle>
          <CardDescription>
            {selectedFile ? `Viewing ${selectedFile.name}` : "Select a file to view its content"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedFile && selectedFile.content ? (
            <ScrollArea className="h-[400px]">
              <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{selectedFile.content}</code>
              </pre>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
              <Code className="h-12 w-12 mb-4 opacity-50" />
              <p>Select a file from the explorer to view its content</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
