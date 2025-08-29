import React, { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  User,
  Menu,
  X,
  LayoutDashboard,
  Bot,
  Target,
  Users,
  BarChart3,
  Megaphone,
  Bell,
  Settings,
  HelpCircle,
  Ticket,
  LogOut,
  CreditCard,
  UserCog,
  Search,
  Crown,
  PlusCircle,
  Play,
  RotateCcw,
  Download,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DraggableChatSupport } from "@/components/ui/draggable-chat-support";
import { useTour } from "@/contexts/TourContext";
import PlatformTour from "@/components/tour/PlatformTour";

interface DashboardLayoutProps {
  children: ReactNode;
}

// Core navigation items for the middle section
const coreNavigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    tourId: "dashboard-nav",
  },
  { name: "VAIS Results", href: "/build-vais", icon: Bot, tourId: "vais-nav" },
  { name: "ABM/LAL", href: "/abm-lal", icon: Target, tourId: "abm-nav" },
  {
    name: "Find Prospect",
    href: "/find-prospect",
    icon: Search,
    tourId: "prospect-nav",
  },
  {
    name: "Build My Campaign",
    href: "/build-my-campaign",
    icon: Megaphone,
    tourId: "my-campaign-nav",
  },
  {
    name: "Reports",
    href: "/analytics",
    icon: BarChart3,
    tourId: "reports-nav",
  },
];

// Utility items for the bottom section
const utilityItems = [
  {
    name: "Downloaded List",
    href: "/my-downloads",
    icon: Download,
    tourId: "downloads-nav",
  },
  {
    name: "Manage Users",
    href: "/manage-users",
    icon: Users,
    tourId: "users-nav",
  },
  {
    name: "Support Ticket",
    href: "/support",
    icon: Ticket,
    tourId: "support-nav",
  },
  { name: "FAQs", href: "/faqs", icon: HelpCircle, tourId: "faqs-nav" },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    tourId: "settings-nav",
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start with sidebar closed on mobile
  const [unreadNotifications] = useState(3); // Mock unread count

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true); // Open on desktop
      } else {
        setSidebarOpen(false); // Closed on mobile
      }
    };

    // Set initial state
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [chatOpen, setChatOpen] = useState(false);

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "VAIS Campaign Completed",
      message:
        "Your 'Enterprise Software Q3' campaign has been successfully processed with 1,247 prospects identified.",
      time: "2 minutes ago",
      type: "success",
      unread: true,
      icon: "✅",
    },
    {
      id: 2,
      title: "Credit Usage Alert",
      message:
        "You have used 85% of your monthly credits. Consider upgrading your plan.",
      time: "1 hour ago",
      type: "warning",
      unread: true,
      icon: "⚠️",
    },
    {
      id: 3,
      title: "New Feature Available",
      message:
        "Check out our new Intent Signal Analytics dashboard for deeper insights.",
      time: "3 hours ago",
      type: "info",
      unread: true,
      icon: "🚀",
    },
    {
      id: 4,
      title: "Weekly Report Ready",
      message: "Your weekly performance report is ready for download.",
      time: "1 day ago",
      type: "info",
      unread: false,
      icon: "📊",
    },
    {
      id: 5,
      title: "Support Ticket Update",
      message: "Your support ticket #12345 has been resolved.",
      time: "2 days ago",
      type: "success",
      unread: false,
      icon: "🎫",
    },
  ];

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    // In a real app, this would make an API call
    console.log("Marking all notifications as read");
  };

  const [chatMinimized, setChatMinimized] = useState(true);
  const {
    isTourOpen,
    hasCompletedTour,
    startTour,
    closeTour,
    completeTour,
    resetTour,
  } = useTour();

  const getCurrentPageTitle = () => {
    const currentItem =
      coreNavigationItems.find((item) => item.href === location.pathname) ||
      utilityItems.find((item) => item.href === location.pathname);
    return currentItem?.name || "Dashboard";
  };

  const handleChatToggle = () => {
    if (chatMinimized) {
      setChatMinimized(false);
      setChatOpen(true);
    } else {
      setChatMinimized(true);
      setChatOpen(false);
    }
  };

  const handleChatClose = () => {
    setChatOpen(false);
    setChatMinimized(true);
  };

  const handleMobileNavigationClick = () => {
    // Close sidebar on mobile when navigating
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-valasys-gray-50 flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div
        data-tour="sidebar"
        className={cn(
          "bg-white shadow-lg border-r border-valasys-gray-200 transition-all duration-300 flex flex-col fixed left-0 top-0 h-screen z-50",
          // Mobile: Hidden by default, overlay when open
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Desktop: Always visible with width changes
          "lg:w-64 lg:block",
          !sidebarOpen && "lg:w-16",
          "w-64",
        )}
      >
        {/* Sidebar Header with Toggle */}
        <div className="p-4 border-b border-valasys-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "flex items-center space-x-2 transition-opacity duration-200",
                sidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-0",
              )}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-valasys-orange to-valasys-orange-light rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
              {sidebarOpen && (
                <span className="text-lg font-semibold text-valasys-gray-900">
                  VALASYS AI
                </span>
              )}
            </div>
            {/* Desktop-only toggle button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 p-0 hidden lg:flex"
            >
              {sidebarOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="h-8 w-8 p-0 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Core Navigation Section */}
          <nav className="p-4">
            <div
              className={cn(
                "mb-3 text-xs font-semibold text-valasys-gray-500 uppercase tracking-wide",
                sidebarOpen ? "block" : "hidden lg:hidden",
              )}
            >
              Navigation
            </div>
            <ul className="space-y-1">
              {coreNavigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                const IconComponent = item.icon;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      data-tour={item.tourId}
                      onClick={handleMobileNavigationClick}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                        isActive
                          ? "bg-valasys-orange text-white shadow-sm"
                          : "text-valasys-gray-600 hover:text-valasys-gray-900 hover:bg-valasys-gray-100",
                      )}
                      title={!sidebarOpen ? item.name : undefined}
                    >
                      <IconComponent
                        className={cn(
                          "w-4 h-4 flex-shrink-0",
                          sidebarOpen ? "mr-3" : "mx-auto",
                          isActive ? "text-white" : "text-valasys-gray-500",
                        )}
                      />
                      {sidebarOpen && (
                        <span className="truncate">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Utility Features Section */}
          <div className="p-4 border-t border-valasys-gray-200">
            <div
              className={cn(
                "mb-3 text-xs font-semibold text-valasys-gray-500 uppercase tracking-wide",
                sidebarOpen ? "block" : "hidden lg:hidden",
              )}
            >
              Utilities
            </div>
            <ul className="space-y-1">
              {utilityItems.map((item) => {
                const isActive = location.pathname === item.href;
                const IconComponent = item.icon;

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      data-tour={item.tourId}
                      onClick={handleMobileNavigationClick}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                        isActive
                          ? "bg-valasys-orange text-white shadow-sm"
                          : "text-valasys-gray-600 hover:text-valasys-gray-900 hover:bg-valasys-gray-100",
                      )}
                      title={!sidebarOpen ? item.name : undefined}
                    >
                      <IconComponent
                        className={cn(
                          "w-4 h-4 flex-shrink-0",
                          sidebarOpen ? "mr-3" : "mx-auto",
                          isActive ? "text-white" : "text-valasys-gray-500",
                        )}
                      />
                      {sidebarOpen && (
                        <span className="truncate">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Upgrade Card - Bottom of Sidebar */}
          <div
            className={cn(
              "p-4 border-t border-valasys-gray-200",
              sidebarOpen ? "block" : "hidden lg:hidden",
            )}
          >
            <div
              data-tour="upgrade"
              className="bg-gradient-to-br from-valasys-orange to-valasys-orange-light rounded-lg p-4 text-white"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm mb-1">
                    Become Pro Access
                  </h3>
                  <p className="text-blue-100 text-xs leading-relaxed">
                    Try your experience for using more features.
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-white text-valasys-blue hover:bg-gray-50 font-medium text-xs h-8"
              >
                <Crown className="w-3 h-3 mr-2" />
                Upgrade Pro
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300",
          // Mobile: Always full width (sidebar overlays)
          "lg:ml-16",
          // Desktop: Adjust based on sidebar state
          sidebarOpen && "lg:ml-64",
        )}
      >
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-valasys-gray-200 sticky top-0 z-40">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="h-8 w-8 p-0 lg:hidden"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="h-4 w-4" />
                </Button>

                {/* Mobile Logo */}
                <div className="flex items-center space-x-2 lg:hidden">
                  <div className="w-8 h-8 bg-gradient-to-r from-valasys-orange to-valasys-orange-light rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">VS</span>
                  </div>
                  <span className="text-lg font-semibold text-valasys-gray-900">
                    VALASYS AI
                  </span>
                </div>

                <div className="text-sm text-valasys-gray-500 hidden lg:block">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>

              {/* Right side - Notification, G2 Reviews, Profile */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {/* Tour Trigger Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={hasCompletedTour ? resetTour : startTour}
                    className="h-8 px-3 text-valasys-orange border-valasys-orange hover:bg-valasys-orange hover:text-white transition-all duration-200"
                    title={
                      hasCompletedTour
                        ? "Reset Platform Tour"
                        : "Take Platform Tour"
                    }
                  >
                    {hasCompletedTour ? (
                      <RotateCcw className="h-4 w-4 mr-1" />
                    ) : (
                      <Play className="h-4 w-4 mr-1" />
                    )}
                    Tour
                  </Button>

                  {/* Notification Dropdown */}
                  <div data-tour="notifications" className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-valasys-gray-100 relative"
                          title="Notifications"
                        >
                          <Bell className="h-5 w-5 text-valasys-gray-600" />
                          {unreadNotifications > 0 && (
                            <Badge
                              variant="destructive"
                              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-valasys-orange border-valasys-orange"
                            >
                              {unreadNotifications}
                            </Badge>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-96 max-h-[500px] overflow-y-auto overflow-x-hidden"
                        sideOffset={8}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                          <DropdownMenuLabel className="text-base font-semibold">
                            Notifications
                          </DropdownMenuLabel>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {unreadNotifications} new
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-xs hover:bg-gray-100"
                              title="Mark all as read"
                              onClick={markAllAsRead}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Notification List */}
                        <div className="max-h-80 overflow-y-auto overflow-x-hidden">
                          {notifications.map((notification, index) => (
                            <div key={notification.id}>
                              <DropdownMenuItem className="p-0 focus:bg-gray-50">
                                <div
                                  className={cn(
                                    "w-full p-4 cursor-pointer transition-colors hover:bg-gray-50",
                                    notification.unread &&
                                      "bg-blue-50/50 border-l-4 border-l-valasys-orange",
                                  )}
                                >
                                  <div className="flex items-start space-x-3">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 mt-1">
                                      <div
                                        className={cn(
                                          "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                                          notification.type === "success" &&
                                            "bg-green-100 text-green-600",
                                          notification.type === "warning" &&
                                            "bg-yellow-100 text-yellow-600",
                                          notification.type === "info" &&
                                            "bg-blue-100 text-blue-600",
                                        )}
                                      >
                                        {notification.type === "success" && (
                                          <CheckCircle className="w-4 h-4" />
                                        )}
                                        {notification.type === "warning" && (
                                          <AlertTriangle className="w-4 h-4" />
                                        )}
                                        {notification.type === "info" && (
                                          <Info className="w-4 h-4" />
                                        )}
                                      </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 overflow-hidden">
                                      <div className="flex items-center justify-between">
                                        <h4
                                          className={cn(
                                            "text-sm font-medium text-gray-900",
                                            notification.unread &&
                                              "font-semibold",
                                          )}
                                        >
                                          {notification.title}
                                        </h4>
                                        {notification.unread && (
                                          <div className="w-2 h-2 bg-valasys-orange rounded-full ml-2 flex-shrink-0"></div>
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-600 mt-1 line-clamp-2 break-words">
                                        {notification.message}
                                      </p>
                                      <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-gray-400 flex items-center">
                                          <Clock className="w-3 h-3 mr-1" />
                                          {notification.time}
                                        </span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                          <MoreHorizontal className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </DropdownMenuItem>
                              {index < notifications.length - 1 && (
                                <DropdownMenuSeparator className="my-0" />
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <DropdownMenuSeparator />
                        <div className="p-3">
                          <Link to="/notifications" className="block">
                            <Button
                              variant="ghost"
                              className="w-full text-sm text-valasys-orange hover:bg-valasys-orange/10"
                            >
                              View All Notifications
                            </Button>
                          </Link>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* G2 Review Logo */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-valasys-gray-100"
                    title="G2 Reviews"
                    asChild
                  >
                    <Link to="/reviews" target="_blank">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F9db3df5b68bf4ece8531cd0e6ed60d89%2F3fa5ac398f0e491bb8a3c77b5810eb8a?format=webp&width=800"
                        alt="G2 Reviews"
                        className="h-5 w-5"
                      />
                    </Link>
                  </Button>

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        data-tour="profile"
                        variant="ghost"
                        className="flex items-center space-x-2 h-8 px-3 hover:bg-valasys-gray-100"
                        title="Profile Menu"
                      >
                        <div className="w-6 h-6 bg-valasys-orange rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-valasys-gray-700">
                          John Smith
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>John Smith</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <UserCog className="mr-2 h-4 w-4" />
                        Account Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Plan Info
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link to="/spending-history">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Spending History
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/* Draggable Chat Support Widget */}
      <div data-tour="chat">
        <DraggableChatSupport
          isOpen={chatOpen}
          onClose={handleChatClose}
          isMinimized={chatMinimized}
          onMinimize={handleChatToggle}
          enableDrag={true}
        />
      </div>

      {/* Platform Tour */}
      <PlatformTour
        isOpen={isTourOpen}
        onClose={closeTour}
        onComplete={completeTour}
      />
    </div>
  );
}
