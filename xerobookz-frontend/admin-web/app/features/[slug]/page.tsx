"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { XeroBookzLogo, Button, Card, Icon } from "@xerobookz/ui-shared";
import { ArrowLeft, CheckCircle2, Sparkles, Zap, Brain, TrendingUp, Shield, Globe, DollarSign, Heart, Users, Target, GraduationCap, MessageSquare, Receipt, CreditCard, Plane, Clock, Briefcase, Settings, BarChart3, FileCheck } from "lucide-react";

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  "dollar-sign": DollarSign,
  "heart": Heart,
  "users": Users,
  "target": Target,
  "graduation-cap": GraduationCap,
  "message-square": MessageSquare,
  "receipt": Receipt,
  "credit-card": CreditCard,
  "plane": Plane,
  "clock": Clock,
  "briefcase": Briefcase,
  "settings": Settings,
  "globe": Globe,
  "bar-chart-3": BarChart3,
  "file-check": FileCheck,
  "zap": Zap,
};

// Feature details mapping
const featureDetails: Record<string, {
  title: string;
  category: string;
  icon: string;
  color: "primary" | "accent";
  whatWeDo: string[];
  howWeDo: string[];
  whatMakesSpecial: string[];
  advantages: string[];
  aiAutomation: {
    aiAgents: string[];
    mlFeatures: string[];
    automation: string[];
  };
}> = {
  "compensation-management": {
    title: "Compensation Management",
    category: "HRIS & Core HR",
    icon: "dollar-sign",
    color: "primary",
    whatWeDo: [
      "Design and manage comprehensive compensation structures across your organization",
      "Create geo-based compensation bands that adjust for location and cost of living",
      "Establish salary ranges, pay grades, and compensation tiers",
      "Manage variable pay, bonuses, and incentive structures",
      "Track compensation history and changes over time"
    ],
    howWeDo: [
      "Intelligent compensation band creation with market data integration",
      "Automated salary recommendations based on role, experience, and location",
      "Workflow-driven approval processes for compensation changes",
      "Real-time compensation analytics and budget tracking",
      "Integration with performance reviews for merit-based adjustments"
    ],
    whatMakesSpecial: [
      "AI-powered market rate analysis using real-time salary data",
      "Predictive compensation modeling to forecast budget needs",
      "Automated compliance checking for pay equity regulations",
      "Multi-currency and multi-country compensation support",
      "Seamless integration with payroll and HRIS systems"
    ],
    advantages: [
      "Reduce compensation planning time by 70%",
      "Ensure pay equity and compliance automatically",
      "Make data-driven compensation decisions",
      "Attract and retain top talent with competitive packages",
      "Maintain budget control with real-time tracking"
    ],
    aiAutomation: {
      aiAgents: [
        "Compensation Advisor Agent: Provides real-time salary recommendations based on market data, role requirements, and internal equity",
        "Budget Optimizer Agent: Analyzes compensation budgets and suggests optimal allocation strategies",
        "Compliance Monitor Agent: Continuously checks for pay equity violations and regulatory compliance"
      ],
      mlFeatures: [
        "Market rate prediction using machine learning models trained on industry salary data",
        "Retention risk analysis based on compensation patterns and market trends",
        "Anomaly detection for unusual compensation changes or patterns"
      ],
      automation: [
        "Automatic salary band updates based on market changes",
        "Automated compensation review reminders and workflows",
        "Self-service compensation queries for employees and managers"
      ]
    }
  },
  "benefits-administration": {
    title: "Benefits Administration",
    category: "HRIS & Core HR",
    icon: "heart",
    color: "accent",
    whatWeDo: [
      "Manage comprehensive employee benefits programs including health, dental, vision, and retirement",
      "Handle open enrollment periods with automated workflows",
      "Track dependent and beneficiary information",
      "Manage benefits eligibility rules and qualification criteria",
      "Process benefits changes, life events, and terminations"
    ],
    howWeDo: [
      "Intuitive benefits plan builder with flexible configuration options",
      "Automated eligibility determination based on employee attributes",
      "Self-service enrollment portal for employees",
      "Integration with benefits carriers and payroll systems",
      "Real-time benefits cost tracking and reporting"
    ],
    whatMakesSpecial: [
      "AI-powered benefits recommendation engine based on employee demographics",
      "Predictive analytics for benefits utilization and cost forecasting",
      "Automated compliance with ACA, ERISA, and other regulations",
      "Multi-carrier integration with real-time data synchronization",
      "Personalized benefits communication and education"
    ],
    advantages: [
      "Reduce benefits administration time by 60%",
      "Improve employee satisfaction with self-service options",
      "Ensure regulatory compliance automatically",
      "Optimize benefits costs with data-driven insights",
      "Streamline carrier communications and data exchange"
    ],
    aiAutomation: {
      aiAgents: [
        "Benefits Advisor Agent: Helps employees choose optimal benefits packages based on their needs",
        "Compliance Guardian Agent: Monitors and ensures adherence to all benefits regulations",
        "Cost Optimizer Agent: Analyzes benefits utilization and suggests cost-saving opportunities"
      ],
      mlFeatures: [
        "Benefits utilization prediction to forecast costs",
        "Personalized benefits recommendations using employee data",
        "Fraud detection in benefits claims and enrollment"
      ],
      automation: [
        "Automated enrollment reminders and deadline notifications",
        "Life event detection and automatic benefits updates",
        "Benefits statement generation and distribution"
      ]
    }
  },
  "applicant-tracking-system": {
    title: "Applicant Tracking System",
    category: "Recruiting & Talent",
    icon: "users",
    color: "primary",
    whatWeDo: [
      "Post jobs across multiple channels and job boards automatically",
      "Track candidates through the entire recruitment lifecycle",
      "Schedule and manage interviews with calendar integration",
      "Collect and evaluate candidate assessments and feedback",
      "Generate and send offer letters with automated workflows"
    ],
    howWeDo: [
      "Unified candidate database with advanced search and filtering",
      "Automated resume parsing and candidate scoring",
      "Interview scheduling with calendar sync and reminders",
      "Collaborative hiring with team feedback and ratings",
      "Integration with background check and onboarding systems"
    ],
    whatMakesSpecial: [
      "AI-powered candidate matching using job requirements and candidate profiles",
      "Automated candidate sourcing from multiple channels",
      "Predictive analytics for candidate success and time-to-fill",
      "Bias detection and removal in hiring processes",
      "Real-time collaboration tools for hiring teams"
    ],
    advantages: [
      "Reduce time-to-fill by 40% with AI-powered matching",
      "Improve candidate experience with streamlined processes",
      "Ensure fair hiring practices with bias detection",
      "Make data-driven hiring decisions",
      "Scale recruiting efforts efficiently"
    ],
    aiAutomation: {
      aiAgents: [
        "Recruiting Assistant Agent: Automatically screens resumes and ranks candidates",
        "Interview Scheduler Agent: Coordinates interview times across multiple stakeholders",
        "Candidate Engagement Agent: Sends personalized communications and updates"
      ],
      mlFeatures: [
        "Resume parsing and skill extraction using NLP",
        "Candidate-job fit scoring with machine learning models",
        "Predictive analytics for candidate success and retention"
      ],
      automation: [
        "Automated job posting to multiple channels",
        "Resume screening and candidate ranking",
        "Interview feedback collection and analysis"
      ]
    }
  },
  "performance-management": {
    title: "Performance Management",
    category: "Performance & Development",
    icon: "target",
    color: "primary",
    whatWeDo: [
      "Set and track OKRs (Objectives and Key Results) across the organization",
      "Conduct regular performance reviews with structured feedback",
      "Plan and schedule 1-on-1 meetings between managers and employees",
      "Enable continuous feedback and recognition",
      "Manage performance cycles and review periods"
    ],
    howWeDo: [
      "Goal-setting framework with cascading objectives",
      "360-degree feedback collection and analysis",
      "Performance review templates and workflows",
      "Real-time performance dashboards and analytics",
      "Integration with compensation and development planning"
    ],
    whatMakesSpecial: [
      "AI-powered performance insights and recommendations",
      "Predictive analytics for performance trends and risks",
      "Automated goal suggestions based on role and career path",
      "Bias detection in performance evaluations",
      "Personalized development recommendations"
    ],
    advantages: [
      "Increase employee engagement by 35%",
      "Improve performance review completion rates",
      "Enable continuous feedback culture",
      "Make fair and objective performance evaluations",
      "Align individual goals with company objectives"
    ],
    aiAutomation: {
      aiAgents: [
        "Performance Coach Agent: Provides personalized performance improvement suggestions",
        "Goal Advisor Agent: Recommends relevant goals based on role and career progression",
        "Feedback Analyzer Agent: Analyzes feedback patterns and identifies development areas"
      ],
      mlFeatures: [
        "Performance prediction models to identify high performers",
        "Sentiment analysis of feedback to detect engagement issues",
        "Goal achievement probability forecasting"
      ],
      automation: [
        "Automated review reminders and deadline notifications",
        "Goal progress tracking and milestone alerts",
        "Performance summary generation and distribution"
      ]
    }
  },
  "payroll-processing": {
    title: "Payroll Processing",
    category: "Payroll & Finance",
    icon: "dollar-sign",
    color: "accent",
    whatWeDo: [
      "Process US and global payroll with multi-currency support",
      "Calculate wages, salaries, bonuses, and commissions",
      "Handle tax computations and deductions automatically",
      "Manage pay cycles (weekly, bi-weekly, monthly, etc.)",
      "Generate payroll reports and compliance documents"
    ],
    howWeDo: [
      "Automated payroll calculation engine with rule-based processing",
      "Tax computation using up-to-date tax tables and regulations",
      "Integration with time tracking and attendance systems",
      "Direct deposit and payment processing",
      "Comprehensive payroll audit trails and reporting"
    ],
    whatMakesSpecial: [
      "AI-powered payroll anomaly detection and error prevention",
      "Predictive analytics for payroll costs and trends",
      "Automated tax compliance across multiple jurisdictions",
      "Real-time payroll processing with instant calculations",
      "Self-service payroll inquiries for employees"
    ],
    advantages: [
      "Reduce payroll processing time by 80%",
      "Eliminate payroll errors with automated calculations",
      "Ensure tax compliance automatically",
      "Improve employee satisfaction with accurate, timely payments",
      "Reduce administrative burden on HR teams"
    ],
    aiAutomation: {
      aiAgents: [
        "Payroll Auditor Agent: Detects anomalies and errors before processing",
        "Tax Compliance Agent: Ensures adherence to all tax regulations",
        "Payroll Advisor Agent: Answers employee payroll questions automatically"
      ],
      mlFeatures: [
        "Anomaly detection in payroll data to catch errors",
        "Payroll cost forecasting using historical data",
        "Fraud detection in time and attendance records"
      ],
      automation: [
        "Automated payroll calculation and processing",
        "Tax computation and deduction management",
        "Payroll report generation and distribution"
      ]
    }
  }
};

// Default feature details for features not in the mapping
const getDefaultFeatureDetails = (title: string, category: string) => ({
  title,
  category,
  icon: "zap",
  color: "primary" as const,
  whatWeDo: [
    `${title} provides comprehensive solutions for your organization's needs`,
    "Streamline processes and improve efficiency",
    "Ensure compliance and best practices",
    "Enable data-driven decision making"
  ],
  howWeDo: [
    "Intuitive interface with powerful features",
    "Automated workflows and processes",
    "Real-time analytics and reporting",
    "Seamless integrations with other systems"
  ],
  whatMakesSpecial: [
    "AI-powered insights and recommendations",
    "Predictive analytics for better planning",
    "Automated compliance monitoring",
    "Personalized user experience"
  ],
  advantages: [
    "Save time and reduce manual work",
    "Improve accuracy and reduce errors",
    "Enhance user experience",
    "Make better decisions with data insights"
  ],
  aiAutomation: {
    aiAgents: [
      "AI Assistant Agent: Provides intelligent guidance and recommendations",
      "Automation Agent: Handles routine tasks automatically",
      "Analytics Agent: Delivers insights and predictions"
    ],
    mlFeatures: [
      "Machine learning models for pattern recognition",
      "Predictive analytics for forecasting",
      "Anomaly detection for quality assurance"
    ],
    automation: [
      "Automated workflow execution",
      "Smart notifications and reminders",
      "Self-service capabilities"
    ]
  }
});

export default function FeatureDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const feature = featureDetails[slug] || getDefaultFeatureDetails(
    slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Feature',
    'Enterprise Features'
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-grey-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <XeroBookzLogo size="lg" />
            </Link>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-b from-grey-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              feature.color === "primary" ? "bg-primary-50" : "bg-accent-50"
            }`}>
              {iconMap[feature.icon] && React.createElement(iconMap[feature.icon], {
                size: 32,
                className: feature.color === "primary" ? "text-primary-600" : "text-accent-600",
                strokeWidth: 2
              })}
            </div>
            <div>
              <p className="text-sm font-medium text-grey-600 mb-1">{feature.category}</p>
              <h1 className="text-4xl md:text-5xl font-semibold text-secondary-800">
                {feature.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* What We Do */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
            <h2 className="text-3xl font-semibold text-secondary-800">What We Do</h2>
          </div>
          <div className="grid gap-4">
            {feature.whatWeDo.map((item, index) => (
              <Card key={index} variant="default" className="p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-grey-700 leading-relaxed">{item}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How We Do It */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
            <h2 className="text-3xl font-semibold text-secondary-800">How We Do It</h2>
          </div>
          <div className="grid gap-4">
            {feature.howWeDo.map((item, index) => (
              <Card key={index} variant="default" className="p-6">
                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-grey-700 leading-relaxed">{item}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* What Makes Us Special */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
            <h2 className="text-3xl font-semibold text-secondary-800">What Makes Us Special</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {feature.whatMakesSpecial.map((item, index) => (
              <Card key={index} variant="floating" hover className="p-6">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                  <p className="text-grey-700 leading-relaxed">{item}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Advantages */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
            <h2 className="text-3xl font-semibold text-secondary-800">Key Advantages</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {feature.advantages.map((item, index) => (
              <Card key={index} variant="floating" hover className="p-6">
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-grey-700 leading-relaxed font-medium">{item}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* AI, ML & Automation */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
            <h2 className="text-3xl font-semibold text-secondary-800">AI, ML & Automation</h2>
          </div>

          {/* AI Agents */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary-600" />
              AI Agents
            </h3>
            <div className="grid gap-4">
              {feature.aiAutomation.aiAgents.map((agent, index) => (
                <Card key={index} variant="default" className="p-6 bg-primary-50/50">
                  <p className="text-grey-700 leading-relaxed">{agent}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* ML Features */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary-600" />
              Machine Learning Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {feature.aiAutomation.mlFeatures.map((feature, index) => (
                <Card key={index} variant="floating" className="p-6">
                  <p className="text-grey-700 leading-relaxed">{feature}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Automation */}
          <div>
            <h3 className="text-xl font-semibold text-secondary-800 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary-600" />
              Automation Capabilities
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {feature.aiAutomation.automation.map((item, index) => (
                <Card key={index} variant="floating" hover className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                    <p className="text-grey-700 leading-relaxed text-sm">{item}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card variant="floating" className="p-8 bg-gradient-to-r from-primary-50 to-accent-50">
            <h3 className="text-2xl font-semibold text-secondary-800 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-grey-600 mb-6">
              Experience the power of {feature.title} and transform your operations.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="default" onClick={() => router.push("/")}>
                Explore More Features
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/login")}>
                Sign In to Access
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-grey-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Link href="/">
            <XeroBookzLogo size="md" className="mb-4" />
          </Link>
          <p className="text-grey-600 text-sm">
            © 2025 XeroBookz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

