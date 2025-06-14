'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Menu,
  X,
  Home,
  Gavel,
  Bot,
  ShoppingCart,
  FileText
} from 'lucide-react';

const NavItem = ({ href, label, icon: Icon, active }) => (
  <Link
    href={href}
    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      active
        ? 'bg-green-100 text-green-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
    }`}
  >
    <Icon className="h-4 w-4 mr-2" />
    <span>{label}</span>
  </Link>
);

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => pathname === href;

  const navItems = [
    { href: "/allinsight/home", label: "Home", icon: Home },
    { href: "/allinsight/legal", label: "Legal", icon: Gavel },
    { href: "/allinsight/thinkbot", label: "ThinkBot", icon: Bot },
    { href: "/allinsight/marketplace", label: "Marketplace", icon: ShoppingCart },
    { href: "/allinsight/resources", label: "Resources", icon: FileText }
  ];

  return (
    <nav className="flex items-center space-x-4">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-6 w-6 text-green-500" />
        <span className="font-bold text-gray-800 text-lg">AIInsights</span>
      </div>

      {/* Desktop nav items */}
      <div className="hidden md:flex items-center space-x-4 ml-4">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={isActive(item.href)}
          />
        ))}
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden ml-auto p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile menu items */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md border-t border-gray-200 md:hidden z-50">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={isActive(item.href)}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
