"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { XeroBookzLogo, Button, Card, Icon } from "@xerobookz/ui-shared";
import { Shield, Building2, UserCircle, FileCheck, Plane, UserPlus, Files, Clock, Zap, DollarSign, TrendingUp, GraduationCap, MessageSquare, Receipt, CreditCard, Globe, Heart, Settings, Briefcase, Target, Users, BarChart3, CheckCircle2, Sparkles, ArrowRight, Star, Award, Brain, Rocket, ChevronDown } from "lucide-react";

// Helper function to generate URL-friendly slugs
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function Home() {
  const router = useRouter();
  const [isSignInDropdownOpen, setIsSignInDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSignInDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll position tracking for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-reveal-id");
          if (id) {
            setRevealedElements((prev) => new Set([...prev, id]));
          }
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-reveal-id]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleFeatureClick = (title: string) => {
    const slug = generateSlug(title);
    router.push(`/features/${slug}`);
  };

  const features = [
    {
      title: "I-9 Compliance",
      description: "Complete, update and retain your Form I-9s digitally with effortless compliance management.",
      icon: "file-check" as const,
    },
    {
      title: "Immigration Management",
      description: "File, track and manage H-1B petitions and immigration cases under one unified platform.",
      icon: "plane" as const,
    },
    {
      title: "Employee Onboarding",
      description: "Onboard multiple employees at once and manage their work authorization seamlessly.",
      icon: "user-plus" as const,
    },
    {
      title: "Document Management",
      description: "Collect, manage and retain employee documentation with digital signatures and audit trails.",
      icon: "files" as const,
    },
    {
      title: "Timesheets & Leave",
      description: "Track employee tasks, approve timesheets and manage leave requests efficiently.",
      icon: "clock" as const,
    },
    {
      title: "PAF Automation",
      description: "Auto-generate Public Access Files in seconds and maintain compliance effortlessly.",
      icon: "zap" as const,
    },
  ];

  // Enterprise HRIS Features
  const enterpriseFeatures = [
    {
      category: "HRIS & Core HR",
      items: [
        {
          title: "Compensation Management",
          description: "Manage compensation bands, salary structures, and geo-based compensation with approval workflows.",
          icon: DollarSign,
          color: "primary",
        },
        {
          title: "Benefits Administration",
          description: "Comprehensive benefits plans, enrollment, open enrollment workflows, and dependent management.",
          icon: Heart,
          color: "accent",
        },
        {
          title: "Job Architecture",
          description: "Define job codes, families, levels, and categories with structured job hierarchies.",
          icon: Briefcase,
          color: "primary",
        },
        {
          title: "Employment History",
          description: "Track employee position changes, promotions, and career progression within the organization.",
          icon: TrendingUp,
          color: "accent",
        },
        {
          title: "Global HRIS Profiles",
          description: "Country-specific employee fields, localized documents, and global compliance integrations.",
          icon: Globe,
          color: "primary",
        },
        {
          title: "Skills Inventory",
          description: "Track employee skills, proficiency levels, and verified competencies.",
          icon: Target,
          color: "accent",
        },
      ],
    },
    {
      category: "Recruiting & Talent",
      items: [
        {
          title: "Applicant Tracking System",
          description: "Complete ATS with job postings, application management, interview scheduling, and offer workflows.",
          icon: Users,
          color: "primary",
        },
        {
          title: "Core HR Agent",
          description: "AI-powered HR agent for policy guidance, form auto-filling, and document classification.",
          icon: MessageSquare,
          color: "accent",
        },
      ],
    },
    {
      category: "Performance & Development",
      items: [
        {
          title: "Performance Management",
          description: "OKRs, performance reviews, 1-on-1 planning, continuous feedback, and performance cycles.",
          icon: Target,
          color: "primary",
        },
        {
          title: "Learning Management System",
          description: "Course creation, learning path assignments, completion tracking, and certificate management.",
          icon: GraduationCap,
          color: "accent",
        },
        {
          title: "Employee Surveys",
          description: "Survey builder, templates, employee engagement surveys, anonymous feedback, and analytics.",
          icon: MessageSquare,
          color: "primary",
        },
      ],
    },
    {
      category: "Payroll & Finance",
      items: [
        {
          title: "Payroll Processing",
          description: "US and global payroll calculations, pay cycles, deductions, tax computation, and payroll reports.",
          icon: DollarSign,
          color: "accent",
        },
        {
          title: "Headcount Planning",
          description: "Workforce projections, budget planning, hiring plans, and position management.",
          icon: BarChart3,
          color: "primary",
        },
        {
          title: "Expense Management",
          description: "Expense claims, receipt management, policy validation, and reimbursement workflows.",
          icon: Receipt,
          color: "accent",
        },
        {
          title: "Corporate Cards",
          description: "Virtual cards, spending limits, merchant controls, and card management.",
          icon: CreditCard,
          color: "primary",
        },
        {
          title: "Bill Pay",
          description: "Vendor management, payables processing, and remittances.",
          icon: DollarSign,
          color: "accent",
        },
        {
          title: "Travel Management",
          description: "Travel requests, approvals, per diem rules, and travel expense tracking.",
          icon: Plane,
          color: "primary",
        },
      ],
    },
    {
      category: "Time & Operations",
      items: [
        {
          title: "Time & Attendance",
          description: "Clock-in/out, schedules, overtime rules, and shift management.",
          icon: Clock,
          color: "accent",
        },
        {
          title: "Project Management",
          description: "Project creation, task management, sprint boards, and milestone tracking.",
          icon: Briefcase,
          color: "primary",
        },
      ],
    },
    {
      category: "IT & Support",
      items: [
        {
          title: "ITSM Agent",
          description: "IT service requests, identity requests, and approval flows.",
          icon: Settings,
          color: "accent",
        },
      ],
    },
    {
      category: "Sales & CRM",
      items: [
        {
          title: "CRM Agent",
          description: "CRM contacts, lead scoring, and opportunity management.",
          icon: Users,
          color: "primary",
        },
      ],
    },
    {
      category: "Global Workforce",
      items: [
        {
          title: "Global Contractors & EOR",
          description: "Contractor records, EOR workflows, and global contractor payouts.",
          icon: Globe,
          color: "accent",
        },
      ],
    },
  ];

  const portals = [
    {
      name: "Admin Portal",
      description: "Manage tenants, users, and system configuration",
      icon: Shield,
      href: "/login",
      color: "primary",
      port: 3000,
    },
    {
      name: "Employer Portal",
      description: "HR management, compliance, and employee oversight",
      icon: Building2,
      href: "http://localhost:3001/login",
      color: "secondary",
      port: 3001,
    },
    {
      name: "Employee Portal",
      description: "Self-service access to documents and information",
      icon: UserCircle,
      href: "http://localhost:3002/login",
      color: "accent",
      port: 3002,
    },
  ];

  const handlePortalClick = (portal: typeof portals[0]) => {
    if (portal.href.startsWith("http")) {
      window.location.href = portal.href;
    } else {
      router.push(portal.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-grey-200' 
          : 'bg-white/80 backdrop-blur-md border-b border-grey-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <XeroBookzLogo size="lg" />
            </Link>
            <div className="flex gap-3">
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  onClick={() => setIsSignInDropdownOpen(!isSignInDropdownOpen)}
                  className="flex items-center gap-2"
                >
                  Sign In
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${isSignInDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </Button>
                
                {isSignInDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-grey-200 rounded-xl shadow-elevated z-50 overflow-hidden">
                    <div className="p-2">
                      {portals.map((portal) => {
                        const IconComponent = portal.icon;
                        return (
                          <button
                            key={portal.name}
                            onClick={() => {
                              setIsSignInDropdownOpen(false);
                              handlePortalClick(portal);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-grey-50 transition-colors text-left group"
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              portal.color === "primary" 
                                ? "bg-primary-50 group-hover:bg-primary-100" 
                                : portal.color === "secondary"
                                ? "bg-secondary-50 group-hover:bg-secondary-100"
                                : "bg-accent-50 group-hover:bg-accent-100"
                            }`}>
                              <IconComponent
                                size={20}
                                strokeWidth={2}
                                className={
                                  portal.color === "primary" 
                                    ? "text-primary-600" 
                                    : portal.color === "secondary"
                                    ? "text-secondary-600"
                                    : "text-accent-600"
                                }
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-secondary-800 text-sm">
                                {portal.name}
                              </div>
                              <div className="text-xs text-grey-600 truncate">
                                {portal.description}
                              </div>
                            </div>
                            <ArrowRight 
                              size={16} 
                              className="text-grey-400 group-hover:text-primary-600 transition-colors flex-shrink-0"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Logo and Company Name */}
      <section className="pt-32 pb-32 px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
        {/* Animated decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl animate-float"
            style={{ 
              transform: `translateY(${scrollY * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl animate-float"
            style={{ 
              transform: `translateY(${scrollY * -0.2}px)`,
              transition: 'transform 0.1s ease-out',
              animationDelay: '1s'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-100/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ 
              transform: `translate(${-50 + scrollY * 0.1}%, ${-50 + scrollY * 0.15}%)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8 animate-fade-in">
              <Link href="/">
                <XeroBookzLogo size="2xl" />
              </Link>
            </div>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6 animate-fade-in hover-lift">
              <Sparkles size={16} className="animate-pulse-slow" />
              <span>AI-Powered Automation</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-secondary-900 mb-6 leading-tight animate-fade-in-up bg-gradient-to-r from-primary-600 via-secondary-700 to-accent-600 bg-clip-text text-transparent animate-gradient">
              XeroBookz
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-secondary-700 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Enterprise HR & Compliance Platform
            </p>
            <p className="text-xl md:text-2xl text-grey-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              A comprehensive SaaS platform for Immigration & HR Compliance with full enterprise HRIS, Payroll, Performance, Recruiting, and Global HR capabilities powered by AI.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {[
                { value: "26+", label: "Microservices" },
                { value: "AI", label: "Powered" },
                { value: "100%", label: "Compliant" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-grey-200/50 hover-lift hover-glow transition-all duration-300"
                  data-reveal-id={`stat-${index}`}
                >
                  <div className={`text-3xl md:text-4xl font-bold text-primary-600 mb-1 transition-all duration-300 hover:scale-110 inline-block ${revealedElements.has(`stat-${index}`) ? 'scroll-reveal-scale revealed' : 'scroll-reveal-scale'}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-grey-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                variant="gradient"
                size="lg"
                onClick={() => {
                  document.getElementById("portals")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group hover-lift hover-glow relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group hover-lift transition-all duration-300 hover:border-primary-500 hover:bg-primary-50"
              >
                Explore Features
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Highlight Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-20 px-6 lg:px-8 text-white relative overflow-hidden animate-gradient">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Brain size={16} />
              <span>Powered by AI</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Automate Manual Tasks with AI
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Our AI integration automates document processing, form filling, and data extraction to save you hours of manual work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FileCheck, title: "Document Processing", desc: "Auto-extract data from I-9 forms, passports, visas, and receipts with AI-powered OCR." },
              { icon: Zap, title: "Form Auto-Fill", desc: "Automatically fill onboarding forms, timesheets, and expense claims using AI intelligence." },
              { icon: Target, title: "Smart Suggestions", desc: "Get AI-powered SOC code predictions, autocomplete, and personalized recommendations." },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index}
                  variant="glass" 
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white p-6 hover-lift transition-all duration-300 hover:bg-white/20 hover:scale-105"
                  data-reveal-id={`ai-feature-${index}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110 hover:rotate-6 ${revealedElements.has(`ai-feature-${index}`) ? 'scroll-reveal-scale revealed' : 'scroll-reveal-scale'}`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portal Selection Section */}
      <section id="portals" className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 bg-white">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
            <Shield size={16} />
            <span>Secure Access</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4">
            Choose Your Portal
          </h2>
          <p className="text-xl text-grey-600 max-w-3xl mx-auto leading-relaxed">
            Access the right tools for your role. Each portal is tailored to specific user needs and responsibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {portals.map((portal, index) => {
            const IconComponent = portal.icon;

            return (
              <Card
                key={portal.name}
                variant="floating"
                hover
                className="text-center p-8 cursor-pointer group hover-lift transition-all duration-300 hover:scale-105"
                onClick={() => handlePortalClick(portal)}
                data-reveal-id={`portal-${index}`}
              >
                <div className="flex justify-center mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                    portal.color === "primary" 
                      ? "bg-primary-50 group-hover:bg-primary-100 group-hover:shadow-lg" 
                      : portal.color === "secondary"
                      ? "bg-secondary-50 group-hover:bg-secondary-100 group-hover:shadow-lg"
                      : "bg-accent-50 group-hover:bg-accent-100 group-hover:shadow-lg"
                  }`}>
                    <IconComponent
                      size={40}
                      strokeWidth={2}
                      className={`transition-all duration-300 group-hover:scale-110 ${
                        portal.color === "primary" 
                          ? "text-primary-600" 
                          : portal.color === "secondary"
                          ? "text-secondary-600"
                          : "text-accent-600"
                      }`}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-secondary-800 mb-3">
                  {portal.name}
                </h3>
                <p className="text-grey-600 mb-8 leading-relaxed">
                  {portal.description}
                </p>

                <Button
                  variant={portal.color === "primary" ? "default" : portal.color === "secondary" ? "secondary" : "accent"}
                  className="w-full"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePortalClick(portal);
                  }}
                >
                  Access {portal.name}
                </Button>

                <p className="text-xs text-grey-500 mt-4">Port: {portal.port}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Core Compliance Features Section */}
      <section className="bg-gradient-to-b from-white to-grey-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`text-center mb-16 scroll-reveal ${revealedElements.has('core-features-header') ? 'revealed' : ''}`} data-reveal-id="core-features-header">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 text-accent-700 text-sm font-medium mb-6">
              <Award size={16} />
              <span>Core Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4">
              Core Compliance Features
            </h2>
            <p className="text-xl text-grey-600 max-w-3xl mx-auto leading-relaxed">
              Essential tools for HR compliance and immigration management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="floating"
                hover
                className="p-8 group cursor-pointer transition-all duration-300 hover:scale-[1.05] hover-lift"
                onClick={() => handleFeatureClick(feature.title)}
                data-reveal-id={`core-feature-${index}`}
              >
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 group-hover:bg-primary-100 group-hover:shadow-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon
                      name={feature.icon}
                      size={32}
                      variant="primary"
                      className="text-primary-600 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-grey-600 text-sm leading-relaxed flex-grow">{feature.description}</p>
                  <div className="mt-4 flex items-center text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                    Learn more →
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features Section */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`text-center mb-20 scroll-reveal ${revealedElements.has('enterprise-features-header') ? 'revealed' : ''}`} data-reveal-id="enterprise-features-header">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
              <Star size={16} />
              <span>Enterprise Grade</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4">
              Enterprise HRIS & HR Features
            </h2>
            <p className="text-xl text-grey-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive enterprise-grade HR, Payroll, Performance, and Talent Management capabilities.
            </p>
          </div>

          {enterpriseFeatures.map((category, categoryIndex) => {
            // Check if this is one of the single-item categories that should be grouped
            const singleItemCategories = ["IT & Support", "Sales & CRM", "Global Workforce"];
            const isSingleItemCategory = singleItemCategories.includes(category.category) && category.items.length === 1;
            
            // Check if we're at the start of the single-item categories group
            const isFirstSingleItem = categoryIndex > 0 && 
              enterpriseFeatures[categoryIndex - 1].category !== "IT & Support" &&
              category.category === "IT & Support";
            
            // Check if we should skip rendering this category individually (it will be in the grouped section)
            const shouldSkip = isSingleItemCategory && !isFirstSingleItem;
            
            if (shouldSkip) {
              return null;
            }
            
            // If this is the first single-item category, render all three together
            if (isFirstSingleItem) {
              const singleItemCats = enterpriseFeatures.filter(cat => 
                singleItemCategories.includes(cat.category) && cat.items.length === 1
              );
              
              return (
                <div key={categoryIndex} className="mb-20 last:mb-0">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-grey-200"></div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-secondary-800 px-4">
                      Enterprise Solutions
                    </h3>
                    <div className="h-px flex-1 bg-grey-200"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {singleItemCats.map((singleCat, singleCatIndex) => 
                      singleCat.items.map((item, itemIndex) => {
                        const IconComponent = item.icon;
                        return (
                          <Card
                            key={`${singleCatIndex}-${itemIndex}`}
                            variant="floating"
                            hover
                            className="p-8 group cursor-pointer transition-all duration-300 hover:scale-[1.05] hover-lift"
                            onClick={() => handleFeatureClick(item.title)}
                            data-reveal-id={`enterprise-feature-${singleCatIndex}-${itemIndex}`}
                          >
                            <div className="flex flex-col h-full">
                              <div className="mb-3">
                                <p className="text-sm font-medium text-grey-500 mb-2">{singleCat.category}</p>
                              </div>
                              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                                item.color === "primary" 
                                  ? "bg-primary-50 group-hover:bg-primary-100 group-hover:shadow-lg" 
                                  : "bg-accent-50 group-hover:bg-accent-100 group-hover:shadow-lg"
                              }`}>
                                <IconComponent
                                  size={32}
                                  strokeWidth={2}
                                  className={`transition-transform duration-300 group-hover:scale-110 ${item.color === "primary" ? "text-primary-600" : "text-accent-600"}`}
                                />
                              </div>
                              <h4 className="text-xl font-semibold text-secondary-800 mb-3 group-hover:text-primary-600 transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-grey-600 text-sm leading-relaxed flex-grow">
                                {item.description}
                              </p>
                              <div className="mt-4 flex items-center text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                                Learn more →
                              </div>
                            </div>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            }
            
            // Regular category rendering
            return (
              <div key={categoryIndex} className="mb-20 last:mb-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-grey-200"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-secondary-800 px-4">
                    {category.category}
                  </h3>
                  <div className="h-px flex-1 bg-grey-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item, itemIndex) => {
                    const IconComponent = item.icon;
                    return (
                      <Card
                        key={itemIndex}
                        variant="floating"
                        hover
                        className="p-8 group cursor-pointer transition-all duration-300 hover:scale-[1.05] hover-lift"
                        onClick={() => handleFeatureClick(item.title)}
                        data-reveal-id={`enterprise-${categoryIndex}-${itemIndex}`}
                      >
                        <div className="flex flex-col h-full">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                            item.color === "primary" 
                              ? "bg-primary-50 group-hover:bg-primary-100 group-hover:shadow-lg" 
                              : "bg-accent-50 group-hover:bg-accent-100 group-hover:shadow-lg"
                          }`}>
                            <IconComponent
                              size={32}
                              strokeWidth={2}
                              className={`transition-transform duration-300 group-hover:scale-110 ${item.color === "primary" ? "text-primary-600" : "text-accent-600"}`}
                            />
                          </div>
                          <h4 className="text-xl font-semibold text-secondary-800 mb-3 group-hover:text-primary-600 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-grey-600 text-sm leading-relaxed flex-grow">
                            {item.description}
                          </p>
                          <div className="mt-4 flex items-center text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                            Learn more →
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 bg-gradient-to-b from-grey-50 to-white">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 text-secondary-700 text-sm font-medium mb-6">
            <Zap size={16} />
            <span>Key Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4">
            Key Capabilities
          </h2>
          <p className="text-xl text-grey-600 max-w-3xl mx-auto leading-relaxed">
            Powerful tools to streamline your HR operations and ensure compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card variant="floating" hover className="p-8 group">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center flex-shrink-0 transition-all duration-200">
                <Icon name="file-check" size={28} variant="primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                  Electronic Form I-9 & E-Verify
                </h3>
                <p className="text-grey-600 text-sm mb-4 leading-relaxed">
                  Complete, update and retain your Form I-9s digitally.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Digital Form I-9 completion</span>
                  </li>
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>E-Verify integration</span>
                  </li>
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Work authorization alerts</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card variant="floating" hover className="p-8 group">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center flex-shrink-0 transition-all duration-200">
                <Icon name="plane" size={28} variant="primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                  Immigration Case Management
                </h3>
                <p className="text-grey-600 text-sm mb-4 leading-relaxed">
                  File, track and manage your immigration cases under one platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>H-1B petition management</span>
                  </li>
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Case tracking and updates</span>
                  </li>
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Form I-983 automation</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card variant="floating" hover className="p-8 group">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center flex-shrink-0 transition-all duration-200">
                <Icon name="zap" size={28} variant="primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                  Public Access File Automation
                </h3>
                <p className="text-grey-600 text-sm mb-4 leading-relaxed">
                  Auto-generate your Public Access File in seconds.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Instant PAF generation</span>
                  </li>
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Historical PAF management</span>
                  </li>
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>LCA integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card variant="floating" hover className="p-8 group">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center flex-shrink-0 transition-all duration-200">
                <Icon name="user-circle" size={28} variant="primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                  Employee Self Service
                </h3>
                <p className="text-grey-600 text-sm mb-4 leading-relaxed">
                  Enable your employees to access and manage all their documents.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Document access</span>
                  </li>
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Mobile ESS application</span>
                  </li>
                  <li className="flex items-start gap-2 text-grey-600 text-sm">
                    <CheckCircle2 size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>Timesheet submission</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl animate-pulse-slow" style={{ transform: 'translate(-50%, -50%)' }}></div>
        </div>
        
        <div className={`max-w-4xl mx-auto relative z-10 scroll-reveal ${revealedElements.has('cta-section') ? 'revealed' : ''}`} data-reveal-id="cta-section">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6 animate-pulse-slow">
            <Rocket size={16} className="animate-float" />
            <span>Get Started Today</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-800 mb-6">
            Ready to Transform Your HR Operations?
          </h2>
          <p className="text-xl md:text-2xl text-grey-600 mb-12 leading-relaxed">
            Choose your portal above and get started with XeroBookz today. Experience the power of enterprise-grade HR, Payroll, and Compliance management powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {portals.map((portal) => {
              const baseStyles = portal.color === "primary" 
                ? { 
                    backgroundColor: '#0EA5E9', 
                    color: '#FFFFFF',
                    boxShadow: '0 4px 14px 0 rgba(14, 165, 233, 0.5)',
                  }
                : portal.color === "secondary"
                ? { 
                    backgroundColor: '#525252', 
                    color: '#FFFFFF',
                    boxShadow: '0 4px 14px 0 rgba(82, 82, 82, 0.5)',
                  }
                : { 
                    backgroundColor: '#22C55E', 
                    color: '#FFFFFF',
                    boxShadow: '0 4px 14px 0 rgba(34, 197, 94, 0.5)',
                  };
              
              const hoverBg = portal.color === "primary" 
                ? '#0284C7'
                : portal.color === "secondary"
                ? '#404040'
                : '#16A34A';
              
              return (
                <button
                  key={portal.name}
                  onClick={() => handlePortalClick(portal)}
                  style={{
                    ...baseStyles,
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px 32px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    minWidth: '200px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = hoverBg;
                    e.currentTarget.style.boxShadow = portal.color === "primary" 
                      ? '0 6px 20px 0 rgba(14, 165, 233, 0.6)'
                      : portal.color === "secondary"
                      ? '0 6px 20px 0 rgba(82, 82, 82, 0.6)'
                      : '0 6px 20px 0 rgba(34, 197, 94, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = baseStyles.backgroundColor as string;
                    e.currentTarget.style.boxShadow = baseStyles.boxShadow as string;
                  }}
                >
                  {portal.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-grey-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Link href="/">
                <XeroBookzLogo size="md" />
              </Link>
              <p className="text-grey-600 text-sm">
                © 2025 XeroBookz. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6 text-sm text-grey-600">
              <Link href="/privacy" className="hover:text-secondary-800 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-secondary-800 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-secondary-800 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
