"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiShoppingBag,
  FiSettings,
  FiHelpCircle,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronDown,
} from "react-icons/fi";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";

type SidebarUser = {
  name: string;
  username: string;
  avatarUrl?: string | null;
};

const NAV_LINKS = [
  { name: "Store", path: "", icon: FiShoppingBag },
  { name: "Settings", path: "settings", icon: FiSettings },
  { name: "Analytics", path: "analytics", icon: FiHelpCircle },
];

export default function Sidebar({ user }: { user: SidebarUser }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const basePath = useMemo(() => {
    if (!pathname) return null;
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "experiences" && segments[1]) {
      return `/experiences/${segments[1]}`;
    }
    return null;
  }, [pathname]);

  const buildPath = (subPath: string) => {
    if (!basePath) return "#";
    if (!subPath) return basePath;
    return `${basePath}/${subPath}`;
  };

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === basePath) return pathname === basePath;
    return pathname.startsWith(`${href}/`) || pathname === href;
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-[#111] flex flex-col transition-all duration-300 ${
        collapsed ? "w-14" : "w-64"
      }`}
    >
      {/* Brand */}
      <div
        className={`p-4 border-b mb-10 border-white/10 flex items-center justify-between transition-all duration-300 ${
          collapsed ? "px-2" : "px-4"
        }`}
      >
        <h1
          className={`text-xl font-bold text-[#fa4616] tracking-tight transition-opacity duration-300 ${
            collapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          SELLOO
        </h1>

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="text-gray-400 cursor-pointer hover:text-white transition-transform duration-300"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-6">
        <div className="flex flex-col gap-2 px-3">
          {isClient &&
            basePath &&
            NAV_LINKS.map((link) => {
              const href = buildPath(link.path);
              const active = isActive(href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={href}
                  className={`relative group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                    ${active
                      ? "text-[#fa4616]"
                      : "text-gray-300 hover:text-white hover:bg-[#222]"
                    }`}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-xl bg-[#fa4616]/20" />
                  )}

                  <Icon
                    size={18}
                    className={`relative z-10 ${
                      active
                        ? "text-[#fa4616]"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />

                  <span
                    className={`relative z-10 transition-opacity duration-300 ${
                      collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
        </div>
      </nav>

      {/* User Profile */}
      <div
        className={`border-t border-white/10 p-4 transition-all duration-300 ${
          collapsed ? "px-2" : "px-4"
        }`}
      >
        <button
          onClick={() => setUserMenuOpen((v) => !v)}
          className="flex w-full items-center cursor-pointer justify-between gap-3"
          aria-expanded={userMenuOpen}
          aria-haspopup="true"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-[#222] flex items-center justify-center">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-white">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>

            {!collapsed && (
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-white truncate">
                  {user.name}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {user.username}
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <FiChevronDown
              className={`text-gray-400 transition-transform ${
                userMenuOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {userMenuOpen && !collapsed && (
          <div className="mt-3 rounded-xl bg-[#111] border border-white/10 overflow-hidden">
            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-[#1e1e1e] hover:text-white transition">
              <FiHelpCircle className="text-gray-400" />
              Help & Support
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
