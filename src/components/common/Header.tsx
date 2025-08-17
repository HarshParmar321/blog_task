'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import Link from 'next/link';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  return (
    <header className="w-full bg-global-4 shadow-[0px_2px_8px_#17181814] px-4 sm:px-6 lg:px-[60px] sticky top-0 z-50">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center w-full py-[18px] relative">
          {/* Logo Section */}
          <div className="flex justify-start items-center w-auto">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/img_frame_2147225766.png"
                alt="Suvit Logo"
                width={30}
                height={36}
                className="w-[30px] h-[36px]"
              />

              <span className="ml-[12px] text-[24px] font-bold leading-[30px] text-center text-global-1 font-inter">
                SUVIT
              </span>
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:flex items-center gap-[40px]">
            {/* Modules Dropdown */}
            <div className="relative">
              <div
                className="flex items-center gap-[8px] cursor-pointer hover:text-global-1 transition-colors"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={modulesOpen}
                onClick={() => setModulesOpen(!modulesOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setModulesOpen(!modulesOpen);
                  }
                }}
                tabIndex={0}
              >
                <span className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter">
                  Modules
                </span>
                <Image
                  src="/images/img_chevron_right.svg"
                  alt="Dropdown"
                  width={16}
                  height={16}
                  className={`w-[16px] h-[16px] transition-transform duration-200 ml-[4px] ${modulesOpen ? 'rotate-90' : 'rotate-0'}`}
                />
              </div>

              {/* Modules Dropdown Menu */}
              {modulesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 text-sm text-global-3 hover:bg-gray-50 cursor-pointer">
                    GST Management
                  </div>
                  <div className="px-4 py-2 text-sm text-global-3 hover:bg-gray-50 cursor-pointer">
                    Invoice Automation
                  </div>
                  <div className="px-4 py-2 text-sm text-global-3 hover:bg-gray-50 cursor-pointer">
                    Expense Tracking
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <span
              className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter cursor-pointer hover:text-global-1 transition-colors"
              role="menuitem"
            >
              Pricing
            </span>

            {/* About */}
            <span
              className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter cursor-pointer hover:text-global-1 transition-colors"
              role="menuitem"
            >
              About
            </span>

            {/* Resource Dropdown */}
            <div className="relative">
              <div
                className="flex items-center gap-[8px] cursor-pointer hover:text-global-1 transition-colors"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={resourceOpen}
                onClick={() => setResourceOpen(!resourceOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setResourceOpen(!resourceOpen);
                  }
                }}
                tabIndex={0}
              >
                <span className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter">
                  Resource
                </span>
                <Image
                  src="/images/img_chevron_right.svg"
                  alt="Dropdown"
                  width={16}
                  height={16}
                  className={`w-[16px] h-[16px] transition-transform duration-200 ml-[4px] ${resourceOpen ? 'rotate-90' : 'rotate-0'}`}
                />
              </div>

              {/* Resource Dropdown Menu */}
              {resourceOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 text-sm text-global-3 hover:bg-gray-50 cursor-pointer">
                    Blog
                  </div>
                  <div className="px-4 py-2 text-sm text-global-3 hover:bg-gray-50 cursor-pointer">
                    Documentation
                  </div>
                  <div className="px-4 py-2 text-sm text-global-3 hover:bg-gray-50 cursor-pointer">
                    Support
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex gap-[20px] items-center ml-[40px]">
            <Button
              variant="outline"
              className="text-[16px] font-semibold leading-[20px] text-center text-button-2 border border-button-2 rounded-[8px] py-[10px] px-[24px] hover:bg-button-2 hover:text-white transition-colors"
            >
              Sign up now
            </Button>
            <Button
              variant="primary"
              className="text-[16px] font-semibold leading-[20px] text-center text-global-5 bg-[linear-gradient(135deg,#1a48d3_0%,_#00b9fe_100%)] rounded-[8px] py-[10px] px-[24px] hover:shadow-lg transition-shadow"
            >
              Request Callback
            </Button>
          </div>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button
            className="flex lg:hidden p-2 rounded-[8px] hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6 text-global-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden absolute top-full left-0 right-0 bg-global-4 shadow-lg border-t border-gray-100 z-40 animate-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col w-full p-4 space-y-4">
              {/* Modules Dropdown */}
              <div className="flex flex-col space-y-2">
                <div
                  className="flex items-center justify-between py-2 cursor-pointer"
                  onClick={() => setModulesOpen(!modulesOpen)}
                >
                  <span className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter">
                    Modules
                  </span>
                  <Image
                    src="/images/img_chevron_right.svg"
                    alt="Dropdown"
                    width={16}
                    height={16}
                    className={`w-[16px] h-[16px] transition-transform duration-200 ${modulesOpen ? 'rotate-90' : 'rotate-0'}`}
                  />
                </div>
                {modulesOpen && (
                  <div className="pl-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="text-sm text-global-3 py-1 hover:text-global-1 cursor-pointer">
                      GST Management
                    </div>
                    <div className="text-sm text-global-3 py-1 hover:text-global-1 cursor-pointer">
                      Invoice Automation
                    </div>
                    <div className="text-sm text-global-3 py-1 hover:text-global-1 cursor-pointer">
                      Expense Tracking
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <span
                className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter py-2 border-b border-gray-100 cursor-pointer hover:text-global-1"
                role="menuitem"
              >
                Pricing
              </span>

              {/* About */}
              <span
                className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter py-2 border-b border-gray-100 cursor-pointer hover:text-global-1"
                role="menuitem"
              >
                About
              </span>

              {/* Resource Dropdown */}
              <div className="flex flex-col space-y-2">
                <div
                  className="flex items-center justify-between py-2 cursor-pointer"
                  onClick={() => setResourceOpen(!resourceOpen)}
                >
                  <span className="text-[16px] font-medium leading-[20px] text-left text-global-3 font-inter">
                    Resource
                  </span>
                  <Image
                    src="/images/img_chevron_right.svg"
                    alt="Dropdown"
                    width={16}
                    height={16}
                    className={`w-[16px] h-[16px] transition-transform duration-200 ${resourceOpen ? 'rotate-90' : 'rotate-0'}`}
                  />
                </div>
                {resourceOpen && (
                  <div className="pl-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="text-sm text-global-3 py-1 hover:text-global-1 cursor-pointer">
                      Blog
                    </div>
                    <div className="text-sm text-global-3 py-1 hover:text-global-1 cursor-pointer">
                      Documentation
                    </div>
                    <div className="text-sm text-global-3 py-1 hover:text-global-1 cursor-pointer">
                      Support
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  className="text-[16px] font-semibold leading-[20px] text-center text-button-2 border border-button-2 rounded-[8px] py-[10px] px-[24px] w-full"
                >
                  Sign up now
                </Button>
                <Button
                  variant="primary"
                  className="text-[16px] font-semibold leading-[20px] text-center text-global-5 bg-[linear-gradient(135deg,#1a48d3_0%,_#00b9fe_100%)] rounded-[8px] py-[10px] px-[24px] w-full"
                >
                  Request Callback
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
