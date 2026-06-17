import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  Users, 
  CheckCircle,
  Clock, 
  Sparkles,
  Search,
  MessageSquare,
  Globe2,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';

interface InfoPagesProps {
  initialTab?: 'about' | 'contact' | 'terms' | 'faq';
  onNavigateHome: () => void;
}

export default function InfoPages({ initialTab = 'about', onNavigateHome }: InfoPagesProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'terms' | 'faq'>(initialTab);
  
  // Contact Us form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ state for individual accordion toggles
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  const faqs = [
    {
      question: "What makes digital workspaces truly \"asynchronous\"?",
      answer: "Asynchronous work means communication doesn't happen in real-time. Instead of scheduled Zoom status updates or immediate Slack pings, teams rely heavily on clear, structured written descriptions, comprehensive specifications in GitHub, Google Docs, or Notion, and recorded screencasts. This guarantees deep focus blocks, flexible hours regardless of timezone, and transparent output-oriented team alignment.",
      icon: Clock
    },
    {
      question: "Are all listed positions officially verified?",
      answer: "Yes, 100%. Our compliance system checks every company submission against rigorous async-standards. Companies listing on Work Nexis declare their core hours, writing-first policies, meeting caps (max 2 hours of scheduled sync meetings per week), and complete geographical location preferences before any posting goes live.",
      icon: ShieldCheck
    },
    {
      question: "How do I apply to premium openings listed on the board?",
      answer: "Each listing operates transparently. Simply click the custom 'Apply Now' trigger at the bottom of the job specs modal. It will route you directly to the company's verified application gateway or prompt you with a specialized employer link. Work Nexis never puts applications behind paywalls or annoying proxy forms.",
      icon: Sparkles
    },
    {
      question: "How can my company list a remote role?",
      answer: "Click the 'Post a Job' button in the header bar. You will be prompted with a full-stack submission modal to detail your company description, specific role criteria, compensation scale range, and async workplace benefits. Once verified, your opening becomes live across our active candidate listings immediately.",
      icon: Building2
    },
    {
      question: "Is there a fee for listing interactive openings?",
      answer: "Standard listings are free under our open developer-community plan. Premium 'Featured' placements that remain highlighted at the top of category feeds are available for a flat rate, which covers targeted newsletter distribution to our active async developer subscriber base of 12,400+ members.",
      icon: HelpCircle
    }
  ];

  // Tab-specific Hero config helper
  const getTabHeroDetails = () => {
    switch (activeTab) {
      case 'about':
        return {
          bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
          title: "Our Philosophy & Mission",
          subtitle: "Explore the written values that empower a focus-oriented, meeting-light workspace.",
          badge: "About Work Nexis",
          badgeColor: "bg-indigo-500/20 text-indigo-200"
        };
      case 'contact':
        return {
          bgImage: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1600&q=80",
          title: "Get in touch asynchronously",
          subtitle: "Have suggestions, custom listing requests, or feed integrations? We're listening.",
          badge: "Contact Support",
          badgeColor: "bg-emerald-500/20 text-emerald-200"
        };
      case 'terms':
        return {
          bgImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80",
          title: "Platform Terms of Service",
          subtitle: "Read the guidelines governing asynchronous verification standards and publisher rules.",
          badge: "Compliance Terms",
          badgeColor: "bg-purple-500/20 text-purple-200"
        };
      case 'faq':
        return {
          bgImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80",
          title: "Frequently Asked Questions",
          subtitle: "Clear, direct responses about listing, verification audits, and search parameters.",
          badge: "Knowledge Base",
          badgeColor: "bg-amber-500/20 text-yellow-200"
        };
    }
  };

  const hero = getTabHeroDetails();

  return (
    <div className="w-full">
      {/* Page Hero Header with Unsplash Image */}
      <div className="relative overflow-hidden bg-slate-950 text-white mb-10 py-16 sm:py-20 animate-fade-in border-b border-gray-800">
        <div className="absolute inset-0 z-0">
          <img 
            src={hero.bgImage} 
            alt={hero.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-20 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-905/30" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Back to Home action */}
            <button 
              onClick={onNavigateHome}
              className="group mb-5 inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span>Back to live open roles</span>
            </button>

            <div className="mt-1">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${hero.badgeColor}`}>
                {hero.badge}
              </span>
            </div>
            
            <h1 className="mt-3 font-sans text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Navigation Rail */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <h2 className="px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Platform Directory
            </h2>
            <nav className="space-y-1">
              {[
                { id: 'about', label: 'About Us', icon: Users },
                { id: 'contact', label: 'Contact Us', icon: Mail },
                { id: 'terms', label: 'Terms of Service', icon: FileText },
                { id: 'faq', label: 'Platform FAQs', icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setSubmitted(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold transition ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-900 ring-1 ring-indigo-100' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 text-indigo-500" />}
                  </button>
                );
              })}
            </nav>

          </div>
        </aside>

        {/* Core Content Container */}
        <main className="lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-6 sm:p-10 shadow-sm min-h-[500px]">
          
          {/* ABOUT US TAB */}
          {activeTab === 'about' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                  <Sparkles className="h-3 w-3" />
                  <span>The Asynchronous Movement</span>
                </span>
                <h1 className="mt-3 font-sans text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  Reclaiming deep focus, autonomy, and lifestyle design.
                </h1>
                <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                  Work Nexis was engineered to catalog only high-quality opportunities at premium organizations that are completely designed for asynchronous production. We believe that professional knowledge works should never be restricted by continuous back-to-back status calls or rigid 9-to-5 schedules.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 border-y border-gray-100 py-8">
                <div className="text-center sm:text-left">
                  <div className="font-mono text-3xl font-extrabold text-indigo-600">12,400+</div>
                  <div className="mt-1 font-sans text-xs font-bold text-gray-800">Subscriber Engineers</div>
                  <p className="mt-1 text-[10px] text-gray-400">Receiving weekly curated async listings without fluff.</p>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-mono text-3xl font-extrabold text-indigo-600">100%</div>
                  <div className="font-sans text-xs font-bold text-gray-800">Async Audited</div>
                  <p className="mt-1 text-[10px] text-gray-400">Strict constraints on meeting volume and communication habits.</p>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-mono text-3xl font-extrabold text-indigo-600">2 Hours</div>
                  <div className="font-sans text-xs font-bold text-gray-800">Weekly Meeting Cap</div>
                  <p className="mt-1 text-[10px] text-gray-400">Standard team constraint for listed job properties.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-400">Our Core Principles</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-100 bg-gray-50/20 p-4">
                    <h4 className="font-sans text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">1</span>
                      Writing is Thinking
                    </h4>
                    <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                      Exceptional communication is rooted in meticulous writing. Organizations built around writing construct deep specifications rather than holding unnecessary audio alignments.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50/20 p-4">
                    <h4 className="font-sans text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">2</span>
                      Focus over Presence
                    </h4>
                    <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                      We celebrate the code committed, the design polished, and the strategy formulated — not your active dot indicator on an instant messenger client.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50/20 p-4">
                    <h4 className="font-sans text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">3</span>
                      Geographic Neutrality
                    </h4>
                    <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                      Talent is evenly distributed, but opportunity has remained historically centralized. We promote organizations that enable team members to reside anywhere.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50/20 p-4">
                    <h4 className="font-sans text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">4</span>
                      Radical Autonomy
                    </h4>
                    <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                      Adults do not need supervision. We empower engineers and designers with direct objectives and full liberty over when and how their works are conceived.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT US TAB */}
          {activeTab === 'contact' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                  <Mail className="h-3 w-3" />
                  <span>Get In Touch</span>
                </span>
                <h1 className="mt-3 font-sans text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  Contact Work Nexis Support
                </h1>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  Have a suggestion to improve the platform, or encountering problems with a featured listing? Submit your information and our moderation team will respond within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-8 text-center sm:p-12">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-sans text-sm font-bold text-gray-900">Message sent successfully!</h3>
                  <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-gray-500">
                    Thank you for reaching out. We have logged your ticket under reference **NX-{Math.floor(Date.now() / 100000)}** and will process your query asynchronously.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                  {/* Form */}
                  <form onSubmit={handleContactSubmit} className="space-y-4 lg:col-span-3">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Elena Rostova"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="elena@rostova.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Query Category</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="block w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option>General Inquiry</option>
                        <option>Job Poster Account Help</option>
                        <option>Report Fraudulent Listing</option>
                        <option>Premium Advertising Solutions</option>
                        <option>API & SDK Integration Feed</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Message Details</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Detail your inquiry. Kindly supply any relevant job listing IDs, company domain names, or error messages so we can analyze them right away."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                    </button>
                  </form>

                  {/* Sidebar Contact Info */}
                  <div className="lg:col-span-2 space-y-6 lg:pl-4">
                    <div className="rounded-xl bg-gray-50 p-5 space-y-4">
                      <h4 className="font-sans text-xs font-bold text-gray-900">Direct Inquiries</h4>
                      
                      <div className="flex gap-3 text-xs text-gray-600">
                        <Mail className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-800">General Support</p>
                          <a href="mailto:support@worknexis.net" className="hover:underline text-indigo-600">support@worknexis.net</a>
                        </div>
                      </div>

                      <div className="flex gap-3 text-xs text-gray-600">
                        <Building2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-800">Employer Listings</p>
                          <a href="mailto:partners@worknexis.net" className="hover:underline text-indigo-600">partners@worknexis.net</a>
                        </div>
                      </div>

                      <div className="flex gap-3 text-xs text-gray-600">
                        <MapPin className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-800">Creative Hub</p>
                          <p className="text-gray-500 leading-tight">One Sansome St, Suite 3500<br />San Francisco, CA 94104</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-indigo-50 bg-indigo-50/10 p-5">
                      <p className="text-[10px] leading-relaxed text-indigo-900/80">
                        <strong>🛡️ Security Verified:</strong> Work Nexis strictly encrypts all form entries. Under no circumstances is candidate contact metrics leased or syndicated to spam rosters.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TERMS OF SERVICE TAB */}
          {activeTab === 'terms' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                  <FileText className="h-3 w-3" />
                  <span>Platform Rules</span>
                </span>
                <h1 className="mt-3 font-sans text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  Terms of Service
                </h1>
                <p className="mt-2 text-xs text-gray-400 font-mono">
                  LAST REVISED: JUNE 13, 2026 • WORK NEXIS PREVIEW CONSTRAINTS
                </p>
              </div>

              <div className="space-y-6 text-xs text-gray-600 leading-relaxed">
                <section className="space-y-2">
                  <h3 className="font-sans text-sm font-bold text-gray-900">1. Acceptance of Terms</h3>
                  <p>
                    By accessing or submitting information to Work Nexis (hereinafter "Platform", "we", "us"), you agree to fully comply with, and be bound by, the general terms and conditions set forth herein. These rules govern job listings, search execution parameters, applications, and general informational browsing.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-sans text-sm font-bold text-gray-900">2. Employer Submission Rules</h3>
                  <p>
                    Organizations publishing remote job roles declare that each listing represents a real, funded position. Over-marketing, multi-level marketing (MLM) schemes, speculative listings, or positions requiring application fees are strictly forbidden. You must accurately fill in salary parameters and respect geographic workspace requirements.
                  </p>
                  <p className="font-mono text-[10px] bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    CRITICAL: Listed positions must commit to an "Asynchronous Workspace Guarantee", specifying limited synchronous visual calls, prioritizing written specs, and offering flexible daily schedules.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-sans text-sm font-bold text-gray-900">3. Candidate Conduct and Applications</h3>
                  <p>
                    Candidates applying to positions on this platform must provide honest representations of their technical experience, credentials, and work history. Creating fictitious profiles, automating high-frequency template spam submissions, or attempting to compromise employer database infrastructure will result in key credential blocklisting.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-sans text-sm font-bold text-gray-900">4. Platform Warranties and Liability</h3>
                  <p>
                    Work Nexis compiles and hosts listings curated directly by third-party organizations. We do not inspect external office sites, directly execute hiring decisions, or guarantee placement. The Platform is provided on an "as is" and "as available" basis without warranties of any kind, whether formal or implied.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-sans text-sm font-bold text-gray-900">5. Modifying Platform Rules</h3>
                  <p>
                    We reserve the absolute right to alter, adjust, or completely replace parts of these Terms of Service without direct individual alert notifications. Users can monitor system revision metrics printed directly at the top of this documentation module.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* FAQS TAB */}
          {activeTab === 'faq' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                  <HelpCircle className="h-3 w-3" />
                  <span>Interactive Resolution</span>
                </span>
                <h1 className="mt-3 font-sans text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  Frequently Asked Questions
                </h1>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  Clear, asynchronous answers to help you navigate the Work Nexis platform, manage listed jobs, or transition your team to synchronous-free workflows.
                </p>
              </div>

              {/* Accordion List */}
              <div className="divide-y divide-gray-100 border-t border-gray-100 mt-6">
                {faqs.map((faq, index) => {
                  const Icon = faq.icon;
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="py-4">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg transition-colors ${
                            isOpen ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400 group-hover:text-gray-600'
                          }`}>
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <span className="font-sans text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {faq.question}
                          </span>
                        </div>
                        <span className="ml-4 shrink-0 p-1 rounded-md hover:bg-gray-50">
                          {isOpen ? (
                            <Minus className="h-4 w-4 text-indigo-600" />
                          ) : (
                            <Plus className="h-4 w-4 text-gray-400" />
                          )}
                        </span>
                      </button>
                      
                      {isOpen && (
                        <div className="mt-3 pl-11 text-xs text-gray-600 leading-relaxed animate-slide-down">
                          <p className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Still have questions banner */}
              <div className="rounded-xl bg-indigo-50/30 border border-indigo-100/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="font-sans text-xs font-bold text-indigo-900">Still have unanswered questions?</h4>
                  <p className="mt-0.5 text-xs text-indigo-700/80">Our asynchronous squad has answers. Submit a clean support ticket.</p>
                </div>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-sm"
                >
                  Create Ticket
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
    </div>
  );
}
