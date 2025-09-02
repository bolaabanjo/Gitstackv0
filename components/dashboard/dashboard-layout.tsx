"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  CodeBracketIcon,
  BeakerIcon,
  BookOpenIcon,
  FolderOpenIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline"
import { Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { signOut } from "@/lib/actions"

interface DashboardLayoutProps {
  children: React.ReactNode
  user: SupabaseUser
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: FolderOpenIcon, current: true },
    { name: "Private Coding Assistant", href: "/dashboard/assistant", icon: CodeBracketIcon, current: false },
    { name: "Regex Lab", href: "/dashboard/regex", icon: BeakerIcon, current: false },
    { name: "Ask My Repo", href: "/dashboard/repo", icon: BookOpenIcon, current: false },
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Mobile sidebar */}
        <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Gitstack" width={24} height={24} className="h-6 w-6" />
                <span className="font-serif font-bold text-lg">gitstack</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="rounded-full">
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    item.current
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div
          className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block transition-all duration-300 ${sidebarCollapsed ? "lg:w-16" : "lg:w-64"}`}
        >
          <div className="flex flex-col h-full bg-card border-r border-border">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div
                className={`flex items-center gap-2 transition-opacity duration-300 ${sidebarCollapsed ? "opacity-0" : "opacity-100"}`}
              >
                <Image src="/logo.png" alt="Gitstack" width={32} height={32} className="h-8 w-8" />
                {!sidebarCollapsed && <span className="font-serif font-bold text-xl">gitstack</span>}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="rounded-full"
              >
                {sidebarCollapsed ? (
                  <ChevronDoubleRightIcon className="h-5 w-5" />
                ) : (
                  <ChevronDoubleLeftIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => (
                <Tooltip key={item.name} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                        item.current
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-6 w-6" />
                      {!sidebarCollapsed && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {sidebarCollapsed && (
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
            <div className="p-4 border-t border-border">
              <div
                className={`flex items-center gap-2 text-xs text-muted-foreground transition-opacity duration-300 ${sidebarCollapsed ? "opacity-0" : "opacity-100"}`}
              >
                {!sidebarCollapsed && (
                  <>
                    <Badge variant="secondary" className="rounded-full">
                      Open Source
                    </Badge>
                    <span>v1.0.0</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className={`transition-all duration-300 ${sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"}`}>
          {/* Top header */}
          <header className="bg-background border-b border-border">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden rounded-full"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Bars3Icon className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3 lg:hidden">
                  <Image src="/logo.png" alt="Gitstack" width={24} height={24} className="h-6 w-6" />
                  <h1 className="font-serif font-bold text-xl">Dashboard</h1>
                </div>
                <h1 className="font-serif font-bold text-xl hidden lg:block">Dashboard</h1>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="rounded-full" asChild>
                  <Link href="https://github.com/gitstack/gitstack" target="_blank">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.user_metadata?.avatar_url || "/placeholder.svg"}
                          alt={user.user_metadata?.full_name}
                        />
                        <AvatarFallback>
                          {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || (
                            <UserCircleIcon className="h-5 w-5" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-2xl" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings">
                        <Cog6ToothIcon className="mr-2 h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <form action={signOut}>
                        <button type="submit" className="flex w-full items-center">
                          <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />
                          <span>Log out</span>
                        </button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}
