"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Sofa,
  CuboidIcon as Cube,
  Camera,
  Menu,
  User,
  Settings,
} from "lucide-react";
import Chatbot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProfilePage from "@/components/ProfilePage";
import SettingsDialog from "@/components/SettingsDialog";

const DashboardCard = ({
  title,
  icon: Icon,
  description,
}: {
  title: string;
  icon: React.ElementType;
  description: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Icon className="w-5 h-5 mr-2 text-zinc-500" />
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
);

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const renderContent = () => {
    switch (currentPage) {
      case "profile":
        return <ProfilePage />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="Floor Plan Generator"
                icon={LayoutDashboard}
                description="Create and customize floor plans for your space."
              />
              <DashboardCard
                title="3D Furniture Models"
                icon={Cube}
                description="Explore a wide range of 3D furniture models."
              />
              <DashboardCard
                title="AR/VR Placement"
                icon={Camera}
                description="Place furniture in your space using AR/VR technology."
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-zinc-900">
                Need Help?
              </h3>
              <Card>
                <CardContent className="p-6">
                  <Chatbot />
                </CardContent>
              </Card>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 border-b border-zinc-200">
          <h1 className="text-xl font-bold text-zinc-900">Plan-it</h1>
        </div>
        <nav className="mt-6 px-3">
          <a
            href="#"
            onClick={() => setCurrentPage("dashboard")}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === "dashboard"
                ? "text-zinc-900 bg-zinc-100"
                : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mr-3 text-zinc-500" />
            Dashboard
          </a>
          <a
            href="floor-plan"
            onClick={() => setCurrentPage("floor-plans")}
            className="flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Sofa className="w-4 h-4 mr-3 text-zinc-400" />
            Floor Plans
          </a>
          <a
            href="#"
            onClick={() => setCurrentPage("3d-models")}
            className="flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Cube className="w-4 h-4 mr-3 text-zinc-400" />
            3D Models
          </a>
          <a
            href="#"
            onClick={() => setCurrentPage("arvr-placement")}
            className="flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Camera className="w-4 h-4 mr-3 text-zinc-400" />
            AR/VR Placement
          </a>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-zinc-200">
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={() => setCurrentPage("profile")}
              className="flex items-center text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-zinc-200">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-zinc-500 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="ml-4 text-xl font-semibold text-zinc-900">
              Dashboard
            </h2>
          </div>
          <div className="flex items-center">
            <Input className="mr-4 w-64" placeholder="Search..." />
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-50 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Settings Dialog */}
      {settingsOpen && (
        <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      )}
    </div>
  );
};

export default Page;
