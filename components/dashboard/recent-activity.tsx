"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Search, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

interface RecentQuery {
  id: string
  query: string
  created_at: string
  projects: {
    name: string
  } | null
}

interface RecentPattern {
  id: string
  name: string
  pattern: string
  created_at: string
}

interface RecentActivityProps {
  recentQueries: RecentQuery[]
  recentPatterns: RecentPattern[]
}

export default function RecentActivity({ recentQueries, recentPatterns }: RecentActivityProps) {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const hasActivity = recentQueries.length > 0 || recentPatterns.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasActivity ? (
          <div className="text-center py-8">
            <Clock className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start using GitStack's features to see your activity here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Recent Repository Queries */}
            {recentQueries.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Repository Queries
                </h4>
                <div className="space-y-2">
                  {recentQueries.slice(0, 3).map((query) => (
                    <div key={query.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm line-clamp-2 mb-1">{query.query}</p>
                          <div className="flex items-center gap-2">
                            {query.projects && (
                              <Badge variant="outline" className="text-xs">
                                {query.projects.name}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">{formatTimeAgo(query.created_at)}</span>
                          </div>
                        </div>
                        <Link href="/dashboard/repo" className="text-muted-foreground hover:text-foreground">
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Regex Patterns */}
            {recentPatterns.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Regex Patterns
                </h4>
                <div className="space-y-2">
                  {recentPatterns.slice(0, 3).map((pattern) => (
                    <div key={pattern.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium mb-1">{pattern.name}</p>
                          <code className="text-xs bg-background px-2 py-1 rounded font-mono">
                            {pattern.pattern.length > 30 ? `${pattern.pattern.substring(0, 30)}...` : pattern.pattern}
                          </code>
                          <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(pattern.created_at)}</p>
                        </div>
                        <Link href="/dashboard/regex" className="text-muted-foreground hover:text-foreground">
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasActivity && (
              <div className="pt-2 border-t border-border">
                <Link
                  href="/dashboard/activity"
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  View all activity
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
