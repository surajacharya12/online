"use client";
import React from "react";

// Make sure these match how they're exported
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import { AppHeader } from "./_components/AppHeader";

export function AllinsightProvider({ children }) {
  return (
    <SidebarProvider>
             <AppSidebar />
      <div className="w-full text-2xl">
       <AppHeader />s
        {children}
      </div>
    </SidebarProvider>
  );
}
