import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  RotateCcw, 
  Sparkles, 
  Filter, 
  Mail, 
  ArrowRight, 
  Clock, 
  CheckCircle,
  Code, 
  Paintbrush, 
  Megaphone, 
  Kanban, 
  Headphones, 
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Twitter,
  Github,
  Linkedin,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { Job, JobCategory } from './types';
import { INITIAL_JOBS, INITIAL_CATEGORIES } from './data';
import { 
  auth, 
  db, 
  googleProvider, 
  OperationType, 
  handleFirestoreError 
} from './lib/firebase';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  setDoc,
  deleteDoc
} from 'firebase/firestore';

const SLIDER_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=1200&q=80",
    caption: "Autonomy & Uninterrupted Blocks",
    tagline: "Work deep hours from cozy, distraction-free setups designed for absolute focus and execution."
  },
  {
    url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80",
    caption: "Writing-First Communication",
    tagline: "Replace persistent virtual sync check-ins with clear, precise specs and written documentation."
  },
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    caption: "Global Geographic Autonomy",
    tagline: "Coauthor pristine features across worldwide clocks without compromising personal morning routines."
  },
  {
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    caption: "High Trust & Output Standards",
    tagline: "No artificial presence dot trackers. Bring pristine engineering structures to production on your schedule."
  }
];
import Header from './components/Header';
import JobCard from './components/JobCard';
import JobDetailsModal from './components/JobDetailsModal';
import PostJobModal from './components/PostJobModal';
import AdminSettingsModal from './components/AdminSettingsModal';
import Testimonials from './components/Testimonials';
import InfoPages from './components/InfoPages';

export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [categories, setCategories] = useState<JobCategory[]>(INITIAL_CATEGORIES);
  const [currentView, setCurrentView] = useState<'home' | 'jobs' | 'about' | 'contact' | 'terms' | 'faq'>('home');

  // Dynamic administrator configuration states
  const [adminEmail, setAdminEmail] = useState('kelvin.orji@gmail.com');
  const [isAdminSettingsOpen, setIsAdminSettingsOpen] = useState(false);

  // Dynamic Administrator Realtime Sync
  useEffect(() => {
    const adminDocRef = doc(db, 'settings', 'config');
    const unsubscribeConfig = onSnapshot(adminDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().adminEmail) {
        setAdminEmail(docSnap.data().adminEmail);
      } else {
        setDoc(adminDocRef, { adminEmail: 'kelvin.orji@gmail.com' }, { merge: true })
          .then(() => setAdminEmail('kelvin.orji@gmail.com'))
          .catch((err) => console.log("Config initialization bypassed:", err));
      }
    }, (err) => {
      console.log("Error loading dynamic settings:", err);
    });
    return () => unsubscribeConfig();
  }, []);

  const isAdmin = currentUser != null && (
    currentUser.email === 'kelvin.orji@gmail.com' || 
    currentUser.email === adminEmail
  );

  // Search parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Home page Slider active slide index
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play interval for home page image slider
  useEffect(() => {
    if (currentView !== 'home') return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentView]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Interactive filters
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  // Modals state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Auth Status listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
      
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        setDoc(userRef, {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: new Date().toISOString()
        }, { merge: true }).catch((err) => {
          console.error("Error saving user to users/ path:", err);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Google OAuth sign-in triggers
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Auth sign-in failed:", error);
    }
  };

  // Google OAuth sign-out triggers
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Google Auth sign-out failed:", error);
    }
  };

  // Listen to Firestore real-time client syncs
  useEffect(() => {
    const q = query(collection(db, 'jobs'), orderBy('postedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const loadedJobs: Job[] = [];
        snapshot.forEach((d) => {
          const data = d.data();
          loadedJobs.push({
            id: d.id,
            title: data.title || '',
            companyName: data.companyName || '',
            companyLogo: data.companyLogo || '',
            category: data.category || '',
            type: data.type || 'Full-time',
            location: data.location || '',
            salary: data.salary || '',
            postedAt: data.postedAt || '',
            description: data.description || '',
            requirements: data.requirements || [],
            benefits: data.benefits || [],
            featured: data.featured || false,
            applyUrl: data.applyUrl || '',
            companyWebsite: data.companyWebsite || '',
            companyDescription: data.companyDescription || '',
            ownerId: data.ownerId || ''
          } as Job);
        });
        setJobs(loadedJobs);
      } else {
        setJobs(INITIAL_JOBS);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'jobs');
    });
    return () => unsubscribe();
  }, []);

  // Sync category counts live based on current jobs
  useEffect(() => {
    const updated = INITIAL_CATEGORIES.map(category => {
      if (category.id === 'all') {
        return { ...category, count: jobs.length };
      }
      const count = jobs.filter(j => j.category === category.id).length;
      return { ...category, count };
    });
    setCategories(updated);
  }, [jobs]);

  // Handle posting a new job role to Firestore
  const handlePostJob = async (newJobData: Omit<Job, 'id' | 'postedAt'>) => {
    if (!isAdmin) {
      console.error("Permission denied: Only designated administrators can post jobs.");
      return;
    }

    const jobId = `job-${Date.now()}`;
    const newJob: Job = {
      ...newJobData,
      id: jobId,
      postedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ownerId: auth.currentUser?.uid || '',
      featured: false,
    };

    try {
      await setDoc(doc(db, 'jobs', jobId), newJob);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `jobs/${jobId}`);
    }
  };

  // Handle updating an existing job
  const handleUpdateJob = async (updatedJob: Job) => {
    if (!isAdmin) {
      throw new Error('Permission denied. Only designated administrators can edit job listings.');
    }
    try {
      const jobDocRef = doc(db, 'jobs', updatedJob.id);
      await setDoc(jobDocRef, updatedJob, { merge: true });
      setSelectedJob(updatedJob);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `jobs/${updatedJob.id}`);
      throw error;
    }
  };

  // Handle deleting a job listing
  const handleDeleteJob = async (jobId: string) => {
    if (!isAdmin) {
      throw new Error('Permission denied. Only designated administrators can delete job listings.');
    }
    try {
      const jobDocRef = doc(db, 'jobs', jobId);
      await deleteDoc(jobDocRef);
      setSelectedJob(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `jobs/${jobId}`);
      throw error;
    }
  };

  // Handle updating dynamic administrator email
  const handleUpdateAdminEmail = async (newEmail: string) => {
    if (!isAdmin) {
      throw new Error('Permission denied. Only designated administrators can modify settings.');
    }
    try {
      const adminDocRef = doc(db, 'settings', 'config');
      await setDoc(adminDocRef, { adminEmail: newEmail }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `settings/config`);
      throw error;
    }
  };

  // Filter computations
  const filteredJobs = jobs.filter(job => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && job.category !== selectedCategory) {
      return false;
    }

    // 2. Keyword Search (Title, Company, Description)
    const lowerQuery = searchQuery.toLowerCase();
    if (lowerQuery) {
      const matchTitle = job.title.toLowerCase().includes(lowerQuery);
      const matchCompany = job.companyName.toLowerCase().includes(lowerQuery);
      const matchDesc = job.description.toLowerCase().includes(lowerQuery);
      if (!matchTitle && !matchCompany && !matchDesc) return false;
    }

    // 3. Location Search
    const lowerLoc = locationQuery.toLowerCase();
    if (lowerLoc && !job.location.toLowerCase().includes(lowerLoc)) {
      return false;
    }

    // 4. Job Type Filters (Full-time, Part-time, Contract, Internship)
    if (selectedTypes.length > 0 && !selectedTypes.includes(job.type)) {
      return false;
    }

    return true;
  });

  const handleTypeFilterToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedCategory('all');
    setSelectedTypes([]);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  // Icon switcher helper for Categories
  const renderCategoryIcon = (iconName: string) => {
    const iconClass = "h-5 w-5";
    switch (iconName) {
      case 'Code': return <Code className={iconClass} />;
      case 'Paintbrush': return <Paintbrush className={iconClass} />;
      case 'Megaphone': return <Megaphone className={iconClass} />;
      case 'Kanban': return <Kanban className={iconClass} />;
      case 'Headphones': return <Headphones className={iconClass} />;
      default: return <Briefcase className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/40 flex flex-col justify-between">
      <div>
        <Header 
          onPostJobClick={() => {
            if (!currentUser) {
              handleSignIn();
            } else if (isAdmin) {
              setIsPostJobOpen(true);
            }
          }} 
          jobsCount={jobs.length} 
          onHomeClick={() => setCurrentView('home')}
          onTabClick={(tab) => setCurrentView(tab)}
          currentView={currentView}
          currentUser={currentUser}
          onSignInClick={handleSignIn}
          onSignOutClick={handleSignOut}
          isAdmin={isAdmin}
          adminEmail={adminEmail}
          onAdminSettingsClick={() => setIsAdminSettingsOpen(true)}
        />

        {currentView === 'home' ? (
          <>
            {/* Front Page / Landing Page View */}
            {/* 1. Full-Page Cover Hero Section */}
            <section className="relative w-full h-[calc(100vh-64px)] min-h-[650px] flex items-center justify-center overflow-hidden bg-slate-950 animate-fade-in border-b border-slate-900">
              {/* Cinematic Full-Page Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
                  alt="Written alignment and trust remote workspace background"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center opacity-40 select-none pointer-events-none transform scale-100 transition-transform duration-[12500ms] hover:scale-105"
                />
                {/* Visual Overlay Shaders */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/85 to-slate-950" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute inset-y-0 right-0 -z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 opacity-[0.02] pointer-events-none">
                  <div className="h-full w-full bg-[radial-gradient(#6366f1_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
                </div>
              </div>

              {/* Foreground Overlay Content Wrapper */}
              <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-8 select-none">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
                  <span className="tracking-wide">Work Nexis Asynchronous Paradigm</span>
                </div>

                <div className="space-y-4">
                  <h1 className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] drop-shadow-md">
                    A workspace built on <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">written alignment</span> and trust.
                  </h1>
                  
                  <p className="mx-auto max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed font-light drop-shadow-sm">
                    Reclaim control over your schedule. Work Nexis connects skilled creators with leading organizations that replace micro-managed check-ins with trust, recorded clarity, and absolute autonomy.
                  </p>
                </div>

                {/* Front-page Integrated Glassmorphic Search Submission Console */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCurrentView('jobs');
                  }}
                  className="w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row gap-2.5"
                >
                  <div className="relative flex-1">
                    <Search className="absolute top-3.5 left-4.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Job title, technical stack, key company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-sm placeholder-slate-500 pl-11 pr-3 py-3 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-950/50 text-white"
                    />
                  </div>

                  <div className="hidden md:block w-px bg-white/10 my-2" />

                  <div className="relative flex-1">
                    <MapPin className="absolute top-3.5 left-4.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Location preference (e.g. Worldwide, US)..."
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="w-full text-sm placeholder-slate-500 pl-11 pr-3 py-3 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-950/50 text-white"
                    />
                  </div>

                  <div className="flex shrink-0 gap-2">
                    {(searchQuery || locationQuery) && (
                      <button
                        type="button"
                        onClick={clearAllFilters}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 px-4 hover:bg-slate-950 transition-colors text-slate-400 hover:text-white"
                        title="Reset search filters"
                      >
                        <RotateCcw className="h-4.5 w-4.5" />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all hover:scale-[1.01] flex-1 md:flex-none border border-indigo-500/20"
                    >
                      <span>Find Jobs</span>
                    </button>
                  </div>
                </form>

                {/* Popular searches tags trigger */}
                <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-slate-400 pt-1">
                  <span className="font-medium text-slate-500">Popular searches:</span>
                  {[
                    { label: 'React', query: 'React' },
                    { label: 'Rust', query: 'Rust' },
                    { label: 'Figma', query: 'Figma' },
                    { label: 'Developer', query: 'Developer' },
                    { label: 'Golang', query: 'Go' }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (p.query) setSearchQuery(p.query);
                        setCurrentView('jobs');
                      }}
                      className="rounded-full bg-slate-900 border border-white/5 hover:border-indigo-500/30 hover:text-indigo-300 transition-all px-3 py-1 text-[11px]"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. Core Statistics Bar */}
            <section className="bg-gray-50/50 py-8 border-b border-gray-100/50">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-center">
                  <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-xs">
                    <span className="block text-xl md:text-2xl font-extrabold text-indigo-600">100% Async</span>
                    <span className="mt-1 block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider">Verified Written Workflows</span>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-xs">
                    <span className="block text-xl md:text-2xl font-extrabold text-indigo-600">12,400+</span>
                    <span className="mt-1 block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider">Engineers Subscribed</span>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-xs">
                    <span className="block text-xl md:text-2xl font-extrabold text-indigo-600">4.9 Days</span>
                    <span className="mt-1 block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider">Average Time-to-Hire</span>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-xs">
                    <span className="block text-xl md:text-2xl font-extrabold text-indigo-600">Worldwide</span>
                    <span className="mt-1 block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider">Boundary Free Talent</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Browse categories */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="text-center md:text-left mb-8">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-600 font-bold">Industry Sectors</span>
                  <span className="h-px bg-indigo-100/50 w-24 hidden md:block" />
                </div>
                <h2 className="font-sans text-xl font-extrabold tracking-tight text-gray-900 md:text-2xl">
                  Browse by Department
                </h2>
                <p className="mt-1 text-xs text-gray-500 max-w-xl">
                  Connect instantly with specialized asynchronous roles that sync with your skillset.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {categories.filter(c => c.id !== 'all').map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setCurrentView('jobs');
                    }}
                    className="flex flex-col items-start p-4 rounded-2xl border border-gray-100 bg-white hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-50/50 text-left transition-all duration-300 group w-full"
                  >
                    {/* Visual Graphic Banner with Overlay */}
                    <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden mb-4 bg-slate-100 border border-gray-100">
                      <img 
                        src={category.graphicUrl} 
                        alt={category.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Floating Category Icon */}
                      <div className="absolute top-2 left-2 p-1.5 rounded-lg bg-white/95 text-gray-700 shadow-sm backdrop-blur-xs transition-colors group-hover:bg-indigo-600 group-hover:text-white border border-gray-100">
                        {renderCategoryIcon(category.icon)}
                      </div>
                      
                      {/* Openings count badge */}
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                        {category.count} roles
                      </div>
                    </div>

                    <h3 className="text-xs font-bold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="mt-1.5 text-[11px] text-gray-500 leading-relaxed line-clamp-3">
                      {category.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            {/* 4. Featured Jobs Grid */}
            <section className="bg-indigo-50/10 border-y border-indigo-100/30 py-12">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100/50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 mb-2">
                    <Sparkles className="h-3 w-3" />
                    <span>PREMIUM SELECTIONS</span>
                  </div>
                  <h2 className="font-sans text-2xl font-extrabold tracking-tight text-gray-900">
                    Handpicked Featured Openings
                  </h2>
                  <p className="mx-auto mt-1 max-w-xl text-xs text-gray-500 leading-relaxed">
                    These prime positions represent top-tier companies offering premium async lifestyles, comprehensive benefits, and flexible timeframes.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {jobs.filter(j => j.featured).slice(0, 3).map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      onClick={() => setSelectedJob(job)} 
                    />
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <button
                    onClick={() => {
                      clearAllFilters();
                      setCurrentView('jobs');
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
                  >
                    <span>Browse All {jobs.length} Positions</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* 5. The Asynchronous Manifesto */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-b border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-12 xl:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    <span>THE ASYNC MANIFESTO</span>
                  </div>
                  <h2 className="font-sans text-2xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                    A workspace built on written alignment and trust.
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Say goodbye to endless alignment Syncs, timezone-induced lethargy, and artificial office desk indicators. Work Nexis promotes a new age of performance-first career design.
                  </p>
                  
                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentView('about')}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                    >
                      <span>Read our complete philosophy</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Zero Mandatory Alignment Syncs",
                      description: "Listings represent setups prioritizing standalone, distraction-free execution. Progress checks are delivered via written updates.",
                      icon: Clock,
                      color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white",
                      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
                    },
                    {
                      title: "Location Independent Careers",
                      description: "Timezone alignment bands are clearly labeled. Avoid waking up at 3 AM to accommodate an office three oceans away.",
                      icon: MapPin,
                      color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white",
                      imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80"
                    },
                    {
                      title: "Continuous Deep Flow blocks",
                      description: "Enjoy long, uninterrupted stretches of time that support creative flow states, detailed code output, and pristine interface structures.",
                      icon: Sparkles,
                      color: "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white",
                      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
                    },
                    {
                      title: "Pristine Written Documentation",
                      description: "Systems are carefully detailed inside searchable documents, helping you acquire immediate clarity without interrupting a coworker.",
                      icon: Mail,
                      color: "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white",
                      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80"
                    }
                  ].map((rule, index) => {
                    const IconComp = rule.icon;
                    return (
                      <div key={index} className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:border-indigo-650 hover:shadow-md transition-all duration-300 space-y-4">
                        {/* Core Tenet Graphic Banner with Overlays */}
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-50 border border-gray-100">
                          <img 
                            src={rule.imageUrl} 
                            alt={rule.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Top-standing overlay badge */}
                          <div className={`absolute top-2.5 left-2.5 p-2 rounded-xl transition-colors shadow-sm backdrop-blur-xs border border-white/40 ${rule.color}`}>
                            <IconComp className="h-4.5 w-4.5" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="font-sans text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {rule.title}
                          </h4>
                          <p className="text-[10.5px] text-gray-400 font-medium leading-relaxed">
                            {rule.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Testimonials block */}
            <Testimonials />
          </>
        ) : currentView === 'jobs' ? (
          <>
            {/* Dedicated Jobs Discovery Console View with Unsplash Image Backdrop */}
            <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-20 animate-fade-in border-b border-slate-800">
              {/* Cover Background Image with subtle dark overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80" 
                  alt="Remote coding desk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-15 filter grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/40" />
              </div>

              <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-[9px] font-bold text-indigo-300 mb-3 uppercase tracking-wider">
                    <Briefcase className="h-3 w-3 text-indigo-400" />
                    <span>Discovery Console</span>
                  </div>
                  <h1 className="font-sans text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Live Asynchronous Opportunities
                  </h1>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    Interact with verified remote developer and designer postings. Use keywords, locations, or categories to refine matches.
                  </p>
                </div>

                {/* Search Panel with customized high-contrast Inputs */}
                <div className="mt-8 max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/90 p-2.5 shadow-xl shadow-black/45 flex flex-col md:flex-row gap-2 backdrop-blur-md">
                  <div className="relative flex-1">
                    <Search className="absolute top-3.5 left-3 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Job title, technical stack, key company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs placeholder-slate-400 pl-9 pr-3 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-950/50 text-white"
                    />
                  </div>

                  <div className="hidden md:block w-px bg-slate-800 my-1.5" />

                  <div className="relative flex-1">
                    <MapPin className="absolute top-3.5 left-3 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Location preference (e.g. Worldwide, US)..."
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="w-full text-xs placeholder-slate-400 pl-9 pr-3 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-950/50 text-white"
                    />
                  </div>

                  <div className="flex shrink-0 gap-1.5">
                    {(searchQuery || locationQuery || selectedCategory !== 'all' || selectedTypes.length > 0) && (
                      <button
                        onClick={clearAllFilters}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-850 bg-slate-950/40 text-slate-400 px-3 hover:bg-slate-950 hover:text-white transition-colors"
                        title="Reset all filter states"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      id="search-analytics-trigger"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                    >
                      <span>Filter Listings</span>
                    </button>
                  </div>
                </div>

                {/* Full Width Category Selector Tags (Styled for Dark Section) */}
                <div className="mt-8 flex flex-wrap gap-2 items-center border-t border-slate-850/80 pt-6">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-2">Filter Category:</span>
                  {categories.map((category) => {
                    const isActive = selectedCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                          isActive 
                            ? 'bg-indigo-600 text-white shadow-xs' 
                            : 'bg-slate-900/60 border border-slate-805/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        {renderCategoryIcon(category.icon)}
                        <span>{category.name}</span>
                        <span className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[9px] font-mono font-medium ${
                          isActive ? 'bg-indigo-500 text-indigo-50' : 'bg-slate-800 border border-slate-705/50 text-slate-400 animate-fade-in'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Content Section: Sidebar controls + listings */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                
                {/* Sidebar Column: Filter parameters */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                        <Filter className="h-4 w-4" />
                        <span>Filter Positions</span>
                      </h2>
                      {(selectedTypes.length > 0) && (
                        <button 
                          onClick={() => setSelectedTypes([])}
                          className="text-[10px] font-semibold text-indigo-600 hover:underline"
                        >
                          Reset Types
                        </button>
                      )}
                    </div>

                    {/* Job Types Accordion */}
                    <div className="mt-5 pt-4 border-t border-gray-50">
                      <h4 className="font-sans text-xs font-bold text-gray-800">Job Schedule / Contract</h4>
                      <div className="mt-3 space-y-3">
                        {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => {
                          const id = `type-chk-${type.toLowerCase()}`;
                          return (
                            <label key={type} className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-600 hover:text-gray-900 select-none">
                              <input 
                                id={id}
                                type="checkbox" 
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleTypeFilterToggle(type)}
                                className="h-4 w-4 rounded-md border-gray-200 text-indigo-600 focus:ring-indigo-500 border"
                              />
                              <span>{type}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Asynchronous Pledge */}
                    <div className="mt-8 pt-5 border-t border-gray-100/80">
                      <div className="flex items-start gap-2.5 rounded-xl bg-indigo-50/30 p-3">
                        <Clock className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-sans text-[11px] font-bold text-indigo-900 leading-none">Async Guarantee</h5>
                          <p className="mt-1 text-[10px] leading-relaxed text-indigo-800/85">
                            Each listing on Work Nexis guarantees minimal status meetings, comprehensive documentation systems, and transparent team collaboration guidelines.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Newsletter subscribe card */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50/50 text-indigo-600">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="mt-3.5 font-sans text-xs font-bold uppercase tracking-wider text-gray-400">
                      Get high-signal openings
                    </h3>
                    <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">
                      Join 12,400+ developers receiving weekly visual remote digest emails. Zero spam.
                    </p>

                    {!newsletterSubscribed ? (
                      <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-2">
                        <input
                          required
                          type="email"
                          placeholder="alex.developer@gmail.com"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-gray-800 transition-colors"
                        >
                          <span>Join Free Digest</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </form>
                    ) : (
                      <div className="mt-4 flex items-start gap-2 rounded-lg bg-emerald-50 p-2.5 border border-emerald-100/50 text-emerald-800">
                        <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-[10px] leading-relaxed font-medium">
                          Subscribed! Watch your inbox soon for your initial Work Nexis bundle.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Listings Column */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <h2 className="font-sans text-sm font-bold text-gray-900">
                      {filteredJobs.length === jobs.length 
                        ? 'All Live Opportunities' 
                        : `${filteredJobs.length} position(s) found`}
                    </h2>
                    
                    <span className="font-mono text-[10px] text-gray-400">
                      SORTED BY RECENT
                    </span>
                  </div>

                  {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {filteredJobs.map((job) => (
                        <JobCard 
                          key={job.id} 
                          job={job} 
                          onClick={() => setSelectedJob(job)} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
                      <Search className="mx-auto h-8 w-8 text-gray-400" />
                      <h3 className="mt-4 font-sans text-sm font-bold text-gray-900">
                        No results match your filters
                      </h3>
                      <p className="mx-auto mt-2 max-w-sm text-xs text-gray-500 leading-relaxed">
                        Try deleting keywords, adjusting location scope, or clearing selected contract types to preview more remote workspaces.
                      </p>
                      <button
                        onClick={clearAllFilters}
                        className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Reset Parameters</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : (
          <InfoPages 
            initialTab={currentView as 'about' | 'contact' | 'terms' | 'faq'} 
            onNavigateHome={() => setCurrentView('home')} 
          />
        )}
      </div>

      {/* Sleek Modern High-Contrast Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-850 mt-auto py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-850/60">
            {/* Column 1: Brand & Description */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span className="font-sans text-sm font-bold tracking-tight text-white">
                  Work Nexis <span className="text-indigo-400 font-normal">| Async Hub</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                The premier verified launchpad for meeting-light, high-trust engineering and creative remote roles built around asynchronous written alignment.
              </p>
              
              {/* Premium Social Media Icons */}
              <div className="flex items-center gap-3 pt-1">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition duration-300"
                  title="Twitter / X"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition duration-300"
                  title="GitHub"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition duration-300"
                  title="LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a 
                  href="https://workspace.google.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition duration-300"
                  title="Global Ecosystem"
                >
                  <Globe className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Column 2: Browse Departments with Counters */}
            <div className="sm:col-span-6 lg:col-span-3 space-y-4">
              <h3 className="text-[11px] font-extrabold tracking-widest text-indigo-400 uppercase">
                Browse Departments
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                {categories.filter(c => c.id !== 'all').map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setCurrentView('jobs');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-white transition duration-200 flex items-center justify-between w-full group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">
                          {renderCategoryIcon(category.icon)}
                        </span>
                        <span>{category.name}</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded-md text-slate-500 border border-slate-850 group-hover:border-indigo-500/20 group-hover:text-indigo-300 transition duration-200">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Platform Resources */}
            <div className="sm:col-span-6 lg:col-span-2 space-y-4">
              <h3 className="text-[11px] font-extrabold tracking-widest text-indigo-400 uppercase">
                Platform Rules
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-white transition duration-200 text-left"
                  >
                    About Philosophy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentView('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-white transition duration-200 text-left"
                  >
                    Asynchronous FAQ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-white transition duration-200 text-left"
                  >
                    Write to Support
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentView('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-white transition duration-200 text-left"
                  >
                    Terms & Shield Compliance
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter Subscriber Form */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-[11px] font-extrabold tracking-widest text-indigo-400 uppercase">
                Synchronous-Free Digest
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Join 12,400+ remote developers receiving verified weekly visual job bundles.
              </p>
              
              {!newsletterSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2 max-w-sm">
                  <div className="relative">
                    <input
                      required
                      type="email"
                      placeholder="alex.developer@gmail.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="block w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-3 pr-10 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center justify-center rounded-lg bg-indigo-600 px-2.5 hover:bg-indigo-500 transition-colors"
                      title="Subscribe"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-white" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-start gap-2 rounded-xl bg-indigo-950/45 p-3 border border-indigo-500/25 text-indigo-200">
                  <CheckCircle className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed font-semibold">
                    Subscribed! Enjoy your initial asynchronous delivery soon.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Underlay Metadata and Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[11px] text-slate-500 gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center md:text-left">
              <span>&copy; {new Date().getFullYear()} Work Nexis. All rights reserved. </span>
              <span className="hidden sm:inline text-slate-800">|</span>
              <span className="flex items-center gap-1">
                Built for deep creators desiring high-trust autonomy.
              </span>
            </div>
            
            {/* Scroll back to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-850 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700 transition"
              title="Return to top of page"
            >
              <span>Back to Top</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Job Details Modal overlay */}
      <JobDetailsModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
        isAdmin={isAdmin}
        onSaveJob={handleUpdateJob}
        onDeleteJob={handleDeleteJob}
      />

      {/* Admin Settings Modal */}
      {isAdminSettingsOpen && (
        <AdminSettingsModal
          onClose={() => setIsAdminSettingsOpen(false)}
          currentAdminEmail={adminEmail}
          onUpdateAdminEmail={handleUpdateAdminEmail}
        />
      )}

      {/* Post a Job Modal form */}
      {isPostJobOpen && (
        <PostJobModal 
          onClose={() => setIsPostJobOpen(false)}
          onPostJob={(newJob) => {
            handlePostJob(newJob);
            // Delay closing slightly so user gets positive confirmation
            setTimeout(() => {
              setIsPostJobOpen(false);
            }, 1000);
          }}
        />
      )}
    </div>
  );
}
