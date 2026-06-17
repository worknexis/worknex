import { useState } from 'react';
import { Briefcase, Plus, Menu, X, Settings, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onPostJobClick: () => void;
  jobsCount: number;
  onHomeClick: () => void;
  onTabClick: (tab: 'home' | 'jobs' | 'about' | 'contact' | 'terms' | 'faq') => void;
  currentView: 'home' | 'jobs' | 'about' | 'contact' | 'terms' | 'faq';
  currentUser: any;
  onSignInClick: () => void;
  onSignOutClick: () => void;
  isAdmin: boolean;
  adminEmail: string;
  onAdminSettingsClick: () => void;
}

export default function Header({ 
  onPostJobClick, 
  jobsCount, 
  onHomeClick, 
  onTabClick, 
  currentView,
  currentUser,
  onSignInClick,
  onSignOutClick,
  isAdmin,
  adminEmail,
  onAdminSettingsClick
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button 
          onClick={() => {
            onHomeClick();
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 group-hover:bg-indigo-500 transition-colors">
            <Briefcase className="h-5.5 w-5.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                Work <span className="text-indigo-600">Nexis</span>
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-wider text-gray-500 uppercase">
              Premium Remote Workspace
            </p>
          </div>
        </button>

        {/* Navigation & Action Container */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 border-r border-gray-100 pr-6">
            <button
              onClick={onHomeClick}
              className={`text-xs font-semibold ${
                currentView === 'home' ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-900'
              } transition-colors`}
            >
              Home
            </button>
            <button
              onClick={() => onTabClick('jobs')}
              className={`text-xs font-semibold ${
                currentView === 'jobs' ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-900'
              } transition-colors`}
            >
              Find Jobs
            </button>
            <button
              onClick={() => onTabClick('about')}
              className={`text-xs font-semibold ${
                currentView === 'about' ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-900'
              } transition-colors`}
            >
              About Us
            </button>
            <button
              onClick={() => onTabClick('faq')}
              className={`text-xs font-semibold ${
                currentView === 'faq' ? 'text-indigo-600 font-bold' : 'text-gray-550 hover:text-gray-900'
              } transition-colors`}
            >
              FAQs
            </button>
            <button
              onClick={() => onTabClick('contact')}
              className={`text-xs font-semibold ${
                currentView === 'contact' ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-900'
              } transition-colors`}
            >
              Contact
            </button>
          </nav>

          {currentUser && !isAdmin ? (
            <button
              id="post-job-button-disabled"
              disabled
              title={`Only the Administrator (${adminEmail}) can post new jobs.`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gray-100 px-3.5 sm:px-4 py-2.5 text-xs font-semibold text-gray-400 border border-gray-200 cursor-not-allowed"
            >
              <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="hidden xs:inline">Admin Only</span>
              <span className="xs:hidden">Locked</span>
            </button>
          ) : (
            <button
              onClick={onPostJobClick}
              id="post-job-button"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-3.5 sm:px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-gray-800 hover:shadow-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden xs:inline">Post a Job</span>
              <span className="xs:hidden">Post</span>
            </button>
          )}

          {/* Desktop Authentication Panel */}
          <div className="hidden md:flex items-center gap-2">
            {currentUser ? (
              <div id="desktop-profile-widget" className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl pl-3 pr-2 py-1">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-900 leading-none truncate max-w-[100px]">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </p>
                  <p className={`text-[9px] font-medium mt-0.5 leading-none ${isAdmin ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>
                    {isAdmin ? 'Administrator' : 'User'}
                  </p>
                </div>
                <img
                  src={currentUser.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40&q=80"}
                  alt="User Profile"
                  referrerPolicy="no-referrer"
                  className="h-8 w-8 rounded-lg object-cover ring-1 ring-gray-100"
                />
                {isAdmin && (
                  <button
                    onClick={onAdminSettingsClick}
                    className="rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-indigo-600 transition-colors cursor-pointer"
                    title="Change Admin Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={onSignOutClick}
                  id="sign-out-button"
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                id="sign-in-button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none transition-all shadow-xs cursor-pointer"
              >
                <svg className="h-3.5 w-3.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.25.61 4.45 1.61l2.45-2.45C17.35 1.57 14.93 1 12.24 1 6.58 1 2 5.58 2 11.24s4.58 10.24 10.24 10.24c5.9 0 9.81-4.14 9.81-9.98 0-.67-.06-1.18-.18-1.72H12.24z"/>
                </svg>
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden border-t border-gray-100 bg-white"
          >
            <div className="space-y-1 px-4 pt-2 pb-4">
              {[
                { label: 'Home', id: 'home', action: onHomeClick },
                { label: 'Find Jobs', id: 'jobs', action: () => onTabClick('jobs') },
                { label: 'About Us', id: 'about', action: () => onTabClick('about') },
                { label: 'FAQs', id: 'faq', action: () => onTabClick('faq') },
                { label: 'Contact', id: 'contact', action: () => onTabClick('contact') },
              ].map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center rounded-xl px-4 py-3 text-xs font-semibold ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    } transition-colors`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile Authentication Section */}
              <div className="border-t border-gray-100 pt-3 mt-3">
                {currentUser ? (
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentUser.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40&q=80"}
                        alt="User Profile"
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900 leading-none">
                          {currentUser.displayName || currentUser.email?.split('@')[0]}
                        </p>
                        <p className={`text-[10px] font-medium mt-1 leading-none ${isAdmin ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>
                          {isAdmin ? 'Administrator' : 'User'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isAdmin && (
                        <button
                          onClick={() => {
                            onAdminSettingsClick();
                            setIsMobileMenuOpen(false);
                          }}
                          className="rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1.5 text-xs font-semibold transition cursor-pointer"
                        >
                          Settings
                        </button>
                      )}
                      <button
                        onClick={() => {
                          onSignOutClick();
                          setIsMobileMenuOpen(false);
                        }}
                        className="rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 px-2.5 py-1.5 text-xs font-semibold transition cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onSignInClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 transition cursor-pointer"
                  >
                    <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.25.61 4.45 1.61l2.45-2.45C17.35 1.57 14.93 1 12.24 1 6.58 1 2 5.58 2 11.24s4.58 10.24 10.24 10.24c5.9 0 9.81-4.14 9.81-9.98 0-.67-.06-1.18-.18-1.72H12.24z"/>
                    </svg>
                    <span>Sign In with Google</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
