"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../../../components/ui/sidebar";

import { Button } from "../../../components/ui/button";
import {
  GraduationCap,
  Plus,
  Home,
  LayoutDashboard,
  Lightbulb,
  Compass,
  BrainCircuit,
} from "lucide-react";

import { AddNewCourseDialog } from "./AddNewCourseDialog";

export function AppSidebar() {
  const pathname = usePathname();

  // Remove trailing slash if any
  const normalizedPath = pathname?.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  const navItems = [
    { icon: Home, label: "Home", path: "/allinsight/home" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/allinsight/dashboard" },
    { icon: Lightbulb, label: "Quiz", path: "/allinsight/quiz" }, // lowercase
    { icon: Compass, label: "Explore Courses", path: "/allinsight/explore-courses" },
    { icon: BrainCircuit, label: "AI Tools", path: "/allinsight/ai-tools" },
  ];

  return (
    <Sidebar className="bg-white shadow-lg border-r border-gray-200">
      <SidebarHeader className="flex items-center space-x-3 px-6 py-5 border-b border-gray-100 mt-14">
        <GraduationCap className="h-10 w-10 text-green-600" />
        <span className="text-2xl font-extrabold text-gray-900 tracking-wide">
          AIInsights
        </span>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 space-y-6">
        <SidebarGroup className="flex flex-col space-y-4">
          <AddNewCourseDialog>
            <Button
              variant="outline"
              className="group relative flex items-center space-x-3 px-5 py-3 rounded-lg border border-green-600 text-green-600 font-semibold bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-green-50 hover:text-green-700"
            >
              <span className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-green-100 p-2 rounded-full group-hover:scale-110 transition-transform duration-200">
                <Plus className="h-5 w-5 text-green-600" />
              </span>
              <span className="pl-6">Create New Course</span>
            </Button>
          </AddNewCourseDialog>
        </SidebarGroup>

        <SidebarGroup className="flex flex-col space-y-2">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive =
              normalizedPath === path ||
              normalizedPath.startsWith(path + "/");

            return (
              <Link
                key={label}
                href={path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-md transition font-medium text-base
                  ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-green-600" : "text-gray-600"
                  }`}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
        © 2025 AIInsights
      </SidebarFooter>
    </Sidebar>
  );
}
