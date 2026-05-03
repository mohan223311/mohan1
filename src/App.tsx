import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, 
  Youtube, 
  Github, 
  Mail, 
  Phone, 
  Globe, 
  ChevronDown, 
  ExternalLink, 
  Code, 
  Building, 
  GraduationCap, 
  Star, 
  ArrowUp,
  Layout,
  Database,
  Search,
  MessageSquare,
  Bot,
  Zap,
  X
} from 'lucide-react';

// --- Constants & Data ---

const PROJECTS = [
  {
    id: 1,
    category: "Voice AI",
    title: "AI SDR System — Inbound-to-Booked-Meeting",
    description: "Voice agent calls leads on form submission, runs AI qualifying questions, books GHL calendar appointments automatically. Two-way call-to-text sync with vector DB conversation memory for returning leads.",
    metric: "Zero manual SDR",
    tags: ["Retell AI", "n8n", "GoHighLevel", "Twilio", "OpenAI"],
    color: "#06b6d4",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2071&auto=format&fit=crop",
    details: {
      capabilities: [
        "Lead fills out a marketing form → AI voice agent calls them within seconds",
        "Voice agent runs qualifying questions and books a meeting on GHL calendar instantly",
        "If the lead says 'call me in an hour' → system calls at exactly that time",
        "Returning leads are recognized — agent remembers previous conversations",
        "Two-way call-to-text sync: SMS AI agent handles text replies; can trigger voice calls from chat",
        "Automated multi-day follow-up sequences via SMS and WhatsApp",
        "CRM pipeline stages update automatically in Go High Level after every interaction",
        "Meeting reminders sent automatically before scheduled appointments",
        "Full call analysis runs post-call — data logged to CRM and spreadsheets",
        "Zero manual SDR work — the entire pipeline runs autonomously"
      ],
      techStackDetails: [
        { label: "Automation", value: "n8n (JSON expressions, regex, sub-workflows, HTTP nodes, conditional branching)" },
        { label: "Voice Agent", value: "Retell AI (conversation nodes, logic splits, variable extraction, function calls)" },
        { label: "CRM", value: "Go High Level (GHL) — calendar, pipelines, contacts, SMS" },
        { label: "SMS / Voice", value: "Twilio" },
        { label: "AI", value: "OpenAI GPT-4o (call analysis, SMS agent intelligence)" },
        { label: "Data Storage", value: "Google Sheets (lead tracking, follow-up status)" },
        { label: "APIs", value: "REST API integrations, webhook triggers, OAuth 2.0 flows" }
      ],
      workflows: [
        {
          name: "Call Analysis — n8n Workflow",
          description: "After every voice call ends, this workflow fires automatically. It pulls the full call transcript, runs it through GPT-4o for sentiment analysis, lead qualification scoring, and intent detection. Results are parsed and written back to the GHL CRM contact record and appended to the lead tracking sheet.",
          image: "/call-analysis.png"
        },
        {
          name: "Triggering Call Workflow — n8n",
          description: "When a lead submits the marketing form, this fires via webhook. It processes lead data, checks for existing contacts in GHL, waits, then fires the Retell AI voice call via REST API. Simultaneously sends an intro SMS via Twilio. Also handles callback scheduling via JS calculations.",
          image: "/triggering-call.png"
        },
        {
          name: "Daily Lead Followup Calling System — n8n",
          description: "Scheduled workflow runs daily, manages 7-day follow-up cadence automatically. Reads leads from tracking sheet, segments by follow-up day (1-7), retrieves GHL contact ID, and triggers follow-up voice call via Retell AI. A Switch node handles day-based routing logic.",
          image: "/daily-lead-followup.png"
        },
        {
          name: "Appointment GHL — Retell AI ↔ GHL Calendar",
          description: "Core appointment engine. When the voice agent needs to book/reschedule, it calls this webhook in real-time. Workflow checks calendar availability via GHL API, manages slot alternatives, creates/updates appointment & contact, yielding a rapid success/fail signal.",
          image: "/appointment-ghl.png"
        },
        {
          name: "Pipelines Movement for Daily Followup — GHL CRM",
          description: "Called by the daily follow-up system to move leads through the correct GHL CRM pipeline stage based on their day. A Switch node routes to branches (Day 1-7) firing HTTP Requests to the GHL API, ensuring an up-to-date sales view automatically.",
          image: "/pipelines-movement.png"
        },
        {
          name: "Conversational AI Voice Agent — Retell AI",
          description: "The multi-node conversational agent built inside Retell AI, running on GPT-4.1 Fast with Flex Mode. Features dozens of conversation, logic split, and function nodes to fire n8n webhooks in real-time. Global identity prompt dictates qualifying logic & objection handling with 1095–1475ms latency.",
          image: "/retell-agent.png"
        }
      ]
    }
  },
  {
    id: 2,
    category: "SaaS",
    title: "WaveLynk AI — AI-Powered Job Application Platform",
    description: "3-role SaaS (Admin/Recruiter/Candidate) with Supabase auth, payment-gated applications, AI-powered ATS resume rewriting, and n8n scraping pipeline for live job listings with analytics.",
    metric: "Full SaaS",
    tags: ["n8n", "Supabase", "OpenAI", "React.js", "Apify"],
    color: "#F59E0B",
    image: "/candidate.png",
    video: "https://drive.google.com/file/d/1kaVo-n34e22QCBq7hYgxdyZm7mEbxgpW/preview",
    details: {
      capabilities: [
        "Multi-role Architecture: 3 distinct portals (Admin, Recruiter, Candidate) with secure Row-Level Security on Supabase preventing privilege escalation.",
        "Admin Portal: Global oversight of recruiters, candidates, application pipelines, platform-wide analytics, and session tracking.",
        "Recruiter Portal: Full suite for managing assigned candidates, batch ATS scoring, chronological application tracking, and an AI-powered CV optimization tool.",
        "Candidate Portal: Dedicated dashboard with 30-day submission trends, multi-CV management (up to 3 resumes), and real-time messaging with recruiters.",
        "AI ATS Analysis: Edge function extracts PDF/DOCX text, passes to n8n webhook, returning match scores and skill gaps instantly.",
        "AI CV Update: Uses ATS feedback to contextually rewrite resumes, storing outputs in Supabase and generating downloadable PDFs via AI.",
        "Job Scraping Engine: Multi-platform job fetching (LinkedIn, Indeed) via n8n and Apify directly configurable from the recruiter dashboard.",
        "Real-Time Messaging: Direct chat interfaces bridging candidates and recruiters straight from within the platform."
      ],
      techStackDetails: [
        { label: "Frontend", value: "React 18, Vite, React Router, TanStack Query, Tailwind CSS, shadcn/ui" },
        { label: "Backend", value: "Supabase (Auth, RLS, Functions, Storage)" },
        { label: "AI Workflows", value: "n8n webhooks for ATS Analysis & AI CV updating" },
        { label: "Job Scraping", value: "Apify integration connected to Recruiter Dashboard" },
      ],
      workflows: [
        {
          name: "Recruiter Dashboard",
          description: "A complete overview for recruiters showing their candidates, active scraped jobs, recent applications and more.",
          image: "/recuriterd.png"
        },
        {
          name: "Find & Scrape Jobs",
          description: "Multi-platform scraping form where recruiters fetch specific job postings dynamically using Apify via n8n.",
          image: "/scrapejobs.png"
        },
        {
          name: "Job Board (Scraped Jobs)",
          description: "Live table and card views of scraped jobs, enabling batch ATS scoring and easy management.",
          image: "/jobs.png"
        },
        {
          name: "ATS Analysis",
          description: "Evaluates the candidate's original CV against the job description to provide match scores and identify missing skills. Used as the bedrock for the AI update.",
          image: "/ats.png"
        },
        {
          name: "Applications Pipeline",
          description: "Visual tracked pipeline grouped chronologically allowing recruiters to monitor candidate statuses at a glance.",
          image: "/applications.png"
        },
        {
          name: "Candidate Portal",
          description: "Dedicated view for candidates to track application progress, master resumes, and update their profiles.",
          image: "/candidate.png"
        },
        {
          name: "Candidate Messaging",
          description: "Direct real-time chat bridging candidates and recruiters straight from within the platform.",
          image: "/messaging.png"
        }
      ]
    }
  },
  {
    id: 3,
    category: "AI Automation",
    title: "AI Sales System — Hyper-Personalized Outreach Engine",
    description: "Telegram-triggered lead scraping and enrichment system. Analyzes each lead's website and LinkedIn to write custom cold email sequences, auto-pushes to Instantly for sending, handles replies and books appointments end-to-end.",
    metric: "500+ leads/day",
    tags: ["n8n", "Apollo", "Clay", "Instantly", "OpenAI", "Apify"],
    color: "#2563eb",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    category: "Automation",
    title: "LinkedIn Content Automation System",
    description: "Full automated content pipeline: competitor scraping → ICP analysis → AI copy → image generation → scheduling → LinkedIn auto-publish. Client achieved fully automated content operation within 1 week.",
    metric: "100% automated",
    tags: ["n8n", "OpenAI", "Airtable", "Perplexity", "Image Gen"],
    color: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop"
  }
];

const SKILLS_ROW_1 = [
  { name: "Python", color: "#3776AB" },
  { name: "LangChain", color: "#4A90D9" },
  { name: "LangGraph", color: "#4A90D9" },
  { name: "LangSmith", color: "#63B3ED" },
  { name: "OpenAI", color: "#ffffff" },
  { name: "Claude API", color: "#CC785C" },
  { name: "RAG", color: "#2563eb" },
  { name: "Vector DB", color: "#06b6d4" },
  { name: "AWS", color: "#FF9900" },
  { name: "Docker", color: "#2496ED" }
];

const SKILLS_ROW_2 = [
  { name: "Google Cloud", color: "#4285F4" },
  { name: "FastAPI", color: "#009688" },
  { name: "Pydantic", color: "#E92063" },
  { name: "n8n", color: "#FF6D5A" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "React.js", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "Next.js", color: "#000000" },
  { name: "Retell AI", color: "#7C3AED" },
  { name: "GoHighLevel", color: "#F97316" },
  { name: "Clay", color: "#8B5CF6" },
  { name: "Apollo", color: "#F97316" },
  { name: "REST API", color: "#2563eb" }
];

// --- Components ---

const SkillIcon = ({ name, color }: { name: string, color: string }) => {
  switch (name) {
    case "Python":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M16 3C9 3 9.5 6 9.5 6V10H16.5V11H6S2 10.5 2 17s4.5 6 4.5 6H8V19s-.2-4 4-4h8s4 .2 4-4V7s.5-4-4-4zm-2.5 2c.8 0 1.5.7 1.5 1.5S14.3 8 13.5 8 12 7.3 12 6.5 12.7 5 13.5 5z" fill="#3776AB"/>
          <path d="M16 29c7 0 6.5-3 6.5-3V22H15.5V21H25s4 .5 4-6.5S24.5 8 24.5 8H23v4s.2 4-4 4H11s-4-.2-4 4v7s-.5 4 9 4zm2.5-2c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" fill="#FFD43B"/>
        </svg>
      );
    case "OpenAI":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M29.7 13a8.8 8.8 0 00-.6-7.2 9 9 0 00-9.7-4.3A9 9 0 003.6 6.8a8.8 8.8 0 00-1.2 6A9 9 0 00.7 19a8.9 8.9 0 007.5 5.9 9 9 0 006.5 2.9 9 9 0 008.6-6.2 8.8 8.8 0 005.8-5.5 9 9 0 00.6-3.1zM20.7 24a6.6 6.6 0 01-4.2 1.5l-.4-.1 3.6-2.1.1-.5v-10l-3.6-2.1h-.1L12.5 13l-.1.1v4.1l3.5 2 .2.1 2.5-1.4v2.8l-2.5 1.5-4.3-2.5V15l4.3-7.5 4.3 2.5V24zM9.4 21.3l-2.5-1.4a6.6 6.6 0 01-3.3-5.7 6.7 6.7 0 011-3.6l.1.1-.1 4.2.4.4 8.7 5 .1.1 2.5-1.4v-2.8l-2.4-1.4-.1-.1-3.5 2-.5-.1-2.5-1.4V13l2.5-1.4.4.1-3.6 2.1-.1.5v5.6l3.6 2.1h.1l3.6-2.1V21l-3.6 2.1-.5.1L9.4 21.3z" fill={color}/>
        </svg>
      );
    case "AWS":
      return (
        <svg viewBox="0 0 40 24" className="w-8 h-5">
          <path d="M11.6 10.3c0 .4 0 .7.2 1 .1.2.3.4.6.6.2.1.5.2.8.3l1 .3v-.1c0 .3-.1.5-.3.7-.2.1-.5.2-.8.2-.3 0-.5 0-.7-.2-.2-.1-.4-.3-.5-.6l-1.2.4c.2.5.5.9 1 1.1.4.2.9.3 1.4.3.4 0 .7 0 1-.2.3-.1.6-.3.8-.5.2-.2.4-.5.5-.8.1-.3.2-.7.2-1v-4H14v.5c-.2-.2-.4-.4-.7-.5-.3-.1-.6-.2-.9-.2-.4 0-.8.1-1.1.3-.3.2-.6.5-.8.9-.2.4-.3.8-.3 1.3l.4.1zm1.3-1.8c.2 0 .4 0 .6.2.2.1.4.3.5.6.1.2.2.5.2.9 0 .3-.1.6-.2.9-.1.2-.3.4-.5.6-.2.1-.4.2-.6.2-.2 0-.4 0-.6-.2-.2-.1-.4-.3-.5-.6-.1-.2-.2-.5-.2-.9 0-.3.1-.6.2-.9.1-.2.3-.4.5-.6.2-.1.4-.2.6-.2.2 0 .4 0 .6.2.2.1.4.3.5.6.1.2.2.5.2.9 0 .3-.1.6-.2.9zM20 11.8c.1-.3.2-.6.2-1 0-.5-.1-.9-.3-1.3-.2-.4-.5-.7-.8-.9-.3-.2-.7-.3-1.1-.3-.3 0-.6.1-.9.2-.3.1-.5.3-.7.5v-.5h-1.2V15h1.2v-2.3c.2.2.4.4.7.5.3.1.6.2.9.2.4 0 .8-.1 1.1-.3.3-.1.6-.5.9-.8v-.5zm-1.2-.1c-.1.2-.3.4-.5.6-.2.1-.4.2-.6.2-.2 0-.4 0-.6-.2-.2-.1-.4-.3-.5-.6-.1-.2-.2-.5-.2-.9 0-.3.1-.6.2-.9.1-.2.3-.4.5-.6.2-.1.4-.2.6-.2.2 0 .4 0 .6.2.2.1.4.3.5.6.1.2.2.5.2.9 0 .3-.1.6-.2.9z" fill={color}/>
          <path d="M6 15.8c-3.4-2.5-5-6.8-3.7-10.8C3.5 1.2 7 .1 7 .1S5.4 3.5 6.4 7c1 3.3 4 5.5 4 5.5L6 15.8zM34 15.8c3.4-2.5 5-6.8 3.7-10.8C36.5 1.2 33 .1 33 .1s1.6 3.4.6 6.9c-1 3.3-4 5.5-4 5.5l4.4 3.3z" fill={color}/>
        </svg>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <rect x="2" y="14" width="6" height="5" rx="1" fill="#2496ED"/>
          <rect x="9" y="14" width="6" height="5" rx="1" fill="#2496ED"/>
          <rect x="16" y="14" width="6" height="5" rx="1" fill="#2496ED"/>
          <rect x="9" y="8" width="6" height="5" rx="1" fill="#2496ED"/>
          <rect x="16" y="8" width="6" height="5" rx="1" fill="#2496ED"/>
          <rect x="16" y="2" width="6" height="5" rx="1" fill="#2496ED"/>
          <path d="M30 16.5c-.5-1-2-1.5-3-1.5-.5-2-2.5-3-4-3v-.5H2l-.5 1C.5 15 1 18 3 20c2 2 5 3 8 3h12c4 0 6-2 7-4.5l.5-1.5-.5-1z" fill="#2496ED" opacity="0.6"/>
        </svg>
      );
    case "Google Cloud":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M16 8l2.4 2.4H13L9 14.7l-2.5-2.5A10 10 0 0116 8z" fill="#EA4335"/>
          <path d="M22.9 10.3l2.6-2.6A10 10 0 0126 16a10 10 0 01-.3 2.5l-3.5-3.5.7-4.7z" fill="#4285F4"/>
          <path d="M10 13.5h12l3.2 3.2a10 10 0 01-9.2 6A10 10 0 016.8 19l3.2-5.5z" fill="#34A853"/>
          <path d="M6 12.3l-2.5-2.5A10 10 0 016 8l2.5 2.5-2.5 1.8z" fill="#FBBC05"/>
        </svg>
      );
    case "FastAPI":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <circle cx="16" cy="16" r="14" fill="#009688"/>
          <path d="M18 4L8 18h8l-2 10 12-14h-8z" fill="white"/>
        </svg>
      );
    case "n8n":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <rect width="32" height="32" rx="8" fill="#FF6D5A"/>
          <circle cx="10" cy="16" r="3" fill="white"/>
          <circle cx="22" cy="10" r="3" fill="white"/>
          <circle cx="22" cy="22" r="3" fill="white"/>
          <line x1="13" y1="15" x2="19" y2="11" stroke="white" strokeWidth="2"/>
          <line x1="13" y1="17" x2="19" y2="21" stroke="white" strokeWidth="2"/>
        </svg>
      );
    case "Supabase":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M18 3L5 18h11l-2 11 14-16H17z" fill="#3ECF8E"/>
        </svg>
      );
    case "React.js":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <circle cx="16" cy="16" r="3" fill="#61DAFB"/>
          <ellipse cx="16" cy="16" rx="14" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.5"/>
          <ellipse cx="16" cy="16" rx="14" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)"/>
          <ellipse cx="16" cy="16" rx="14" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 16 16)"/>
        </svg>
      );
    case "LangChain":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M12.6 15.3c-2.3 2.3-1.6 5.8 0 7.4 1.6 1.6 5.1 2.3 7.4 0m-4.5-5.5c-2.3 2.3-6.1 2-7.8.3-1.7-1.7-1.9-5.4.3-7.7 2.3-2.3 5.9-2.2 7.7-.4 1.8 1.8 1.8 5.4-.2 7.8M19.4 16.7c2.3-2.3 6.1-2 7.8-.3 1.7 1.7 1.9 5.4-.3 7.7-2.3 2.3-5.9 2.2-7.7.4-1.8-1.8-1.8-5.4.2-7.8m-2.1-4c2.3-2.3 1.6-5.8 0-7.4-1.6-1.6-5.1-2.3-7.4 0" fill="none" stroke="#1C3A5Es" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.6 15.3c-2.3 2.3-1.6 5.8 0 7.4 1.6 1.6 5.1 2.3 7.4 0m-4.5-5.5c-2.3 2.3-6.1 2-7.8.3-1.7-1.7-1.9-5.4.3-7.7 2.3-2.3 5.9-2.2 7.7-.4 1.8 1.8 1.8 5.4-.2 7.8M19.4 16.7c2.3-2.3 6.1-2 7.8-.3 1.7 1.7 1.9 5.4-.3 7.7-2.3 2.3-5.9 2.2-7.7.4-1.8-1.8-1.8-5.4.2-7.8m-2.1-4c2.3-2.3 1.6-5.8 0-7.4-1.6-1.6-5.1-2.3-7.4 0" fill="none" stroke="#63B3ED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(-1, 0)"/>
        </svg>
      );
    case "LangGraph":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <circle cx="16" cy="6" r="4.5" fill="#63B3ED"/>
          <circle cx="8" cy="22" r="4.5" fill="#63B3ED"/>
          <circle cx="24" cy="22" r="4.5" fill="#63B3ED"/>
          <path d="M14 9l-4 9M18 9l4 9M11 22h10" stroke="#1C3A5E" strokeWidth="2"/>
        </svg>
      );
    case "LangSmith":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M16 6C9 6 4 11.5 4 16s5 10 12 10 12-4.5 12-10S23 6 16 6zm1 14.5v-2h-2v2h2zm2-5c0 1.1-.9 2-2 2h-2v-2c0-1.1.9-2 2-2h2v2z" fill="#93C5FD"/>
          <path d="M15 11v6h4c1.6 0 3-1.3 3-3s-1.4-3-3-3h-4z" fill="#1C3A5E"/>
        </svg>
      );
    case "Claude API":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M16 2.5a3 3 0 0 1 2.8 2l2.3 6.4h6.8a3 3 0 0 1 1.7 5.5l-5.5 4.1 2.1 6.5a3 3 0 0 1-4.6 3.3L16 26.2l-5.6 4a3 3 0 0 1-4.6-3.3l2.1-6.5-5.5-4a3 3 0 0 1 1.7-5.5h6.8l2.3-6.5A3 3 0 0 1 16 2.5z" fill="#CC785C"/>
        </svg>
      );
    case "RAG":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M16 4C9.4 4 4 6.7 4 10v12c0 3.3 5.4 6 12 6s12-2.7 12-6V10c0-3.3-5.4-6-12-6zm0 4.5c4.8 0 8.5 1.5 8.5 2.5S20.8 13.5 16 13.5 7.5 12 7.5 11 11.2 8.5 16 8.5z" fill="#2563eb" opacity="0.8"/>
          <path d="M4 16c0 3.3 5.4 6 12 6s12-2.7 12-6" stroke="#2563eb" strokeWidth="2.5" fill="none"/>
        </svg>
      );
    case "Vector DB":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M5 8h4v4H5zm9 0h4v4h-4zm9 0h4v4h-4zM5 14h4v4H5zm9 0h4v4h-4zm9 0h4v4h-4zM5 20h4v4H5zm9 0h4v4h-4zm9 0h4v4h-4z" fill="#2563eb"/>
          <path d="M7 10l9 6 9-6" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>
      );
    case "Pydantic":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm4 18h-4v4h-2V10h6c2.8 0 5 2.2 5 5s-2.2 5-5 5zm-4-2h4c1.7 0 3-1.3 3-3s-1.3-3-3-3h-4v6z" fill="#E92063"/>
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M16 3C9 3 4 8 4 16c0 6.6 4.6 12.1 10.8 12.9V18.1h-3V16h3v-2.2c0-3.3 2.1-5.1 5-5.1 1.4 0 2.9.2 2.9.2v3h-1.6c-1.5 0-2 .9-2 1.9V16h3.6l-.6 2.1h-3v10.8C25.4 28.1 30 22.6 30 16c0-8-6.1-13-14-13z" fill="#336791"/>
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="#339933"/>
          <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="monospace">N</text>
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <circle cx="16" cy="16" r="14" fill="#000000"/>
          <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="sans-serif">N</text>
        </svg>
      );
    case "Retell AI":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <rect x="11" y="3" width="10" height="16" rx="5" fill="#7C3AED"/>
          <path d="M6 16a10 10 0 0020 0" fill="none" stroke="#7C3AED" strokeWidth="2"/>
          <line x1="16" y1="26" x2="16" y2="30" stroke="#7C3AED" strokeWidth="2"/>
          <line x1="11" y1="30" x2="21" y2="30" stroke="#7C3AED" strokeWidth="2"/>
        </svg>
      );
    case "GoHighLevel":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M16 2l14 8-14 8L2 10l14-8zm0 18l14-8v8l-14 8-14-8v-8l14 8z" fill="#F97316"/>
        </svg>
      );
    case "Clay":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="#8B5CF6"/>
          <path d="M22 11c0-2-1.5-3.5-3.5-3.5H11v17h4v-7h3.5c2 0 3.5-1.5 3.5-3.5 0-1.5-1-2.5-2-3 1-.5 2-1.5 2-3z" fill="white"/>
        </svg>
      );
    case "Apollo":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M16 3L3 28h5l8-16 8 16h5L16 3z" fill="#F97316"/>
          <path d="M9.5 21h13V18h-13v3z" fill="#F97316"/>
        </svg>
      );
    case "REST API":
      return (
        <svg viewBox="0 0 32 32" className="w-5 h-5">
          <path d="M4 11h24M8 17h16M12 23h8" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" fill="none"/>
        </svg>
      );
    default:
      return <Zap size={18} style={{ color }} />;
  }
};

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; }[] = [];
    const count = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(37,99,235,0.4)';
      ctx.strokeStyle = 'rgba(37,99,235,0.1)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    draw();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

const StatCounter = ({ value, label, sub }: { value: string, label: string, sub: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const target = parseInt(value.replace(/\D/g, ''));
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    };

    const observer = new IntersectionObserver(handleScroll, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center p-6 card-glass rounded-2xl border-t-2 border-t-blue-brand/30">
      <div className="text-4xl md:text-5xl font-syne font-bold text-blue-brand mb-2">
        {count}{value.includes('+') ? '+' : ''}
      </div>
      <div className="text-sm font-dmsans text-text-secondary uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xs font-mono text-text-muted">{sub}</div>
    </div>
  );
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Simple typing effect that just types it out once
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 120);
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="inline-block min-w-[5ch]">
      {displayText}
      <span className="animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] border-r-4 border-blue-400 ml-1 inline-block h-[0.8em] align-middle"></span>
    </span>
  );
};

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-navy-900 border border-white/10 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl"
          style={{ borderTop: `4px solid ${project.color}` }}
        >
          <div className="relative h-64 sm:h-80 w-full bg-navy-800 shrink-0">
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-navy-800 text-text-muted">
                <Layout size={48} />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-navy-900/50 hover:bg-navy-900 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/10 z-10"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-6 left-8 right-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-navy-950/80 backdrop-blur-md rounded-full text-[10px] font-bold text-text-primary uppercase tracking-widest border border-white/10">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-blue-brand text-white rounded-full text-[10px] font-black uppercase shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                  {project.metric}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-syne font-bold text-white shadow-sm">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-12 bg-navy-900 flex-grow">
            <div>
              <h3 className="text-xl font-syne font-bold text-text-primary mb-4 flex items-center gap-2">
                <Bot className="text-blue-brand" size={20} /> Overview
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {project.video && (
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-navy-950 aspect-video relative">
                <iframe 
                  src={project.video} 
                  className="w-full h-full absolute inset-0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {project.details?.capabilities && (
              <div>
                <h3 className="text-xl font-syne font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Zap className="text-blue-brand" size={20} /> What This System Does (Business Outcome)
                </h3>
                <ul className="space-y-3">
                  {project.details.capabilities.map((cap: string, i: number) => (
                    <li key={i} className="flex gap-4 text-text-secondary text-sm md:text-base leading-relaxed items-start">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-brand shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.details?.techStackDetails && (
              <div>
                <h3 className="text-xl font-syne font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Code className="text-blue-brand" size={20} /> Detailed Tech Stack
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.details.techStackDetails.map((tech: any, i: number) => (
                    <div key={i} className="p-4 bg-navy-800 border border-white/5 rounded-xl text-sm leading-relaxed">
                      <span className="font-bold text-text-primary block mb-1">{tech.label}</span>
                      <span className="text-text-secondary">{tech.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.details?.workflows && (
              <div className="space-y-8">
                <h3 className="text-xl font-syne font-bold text-text-primary flex items-center gap-2 border-b border-white/10 pb-4">
                  <Layout className="text-blue-brand" size={20} /> Architected Workflows
                </h3>
                {project.details.workflows.map((wf: any, i: number) => (
                  <div key={i} className="bg-navy-950/50 border border-white/5 rounded-2xl overflow-hidden block md:flex gap-6">
                    {wf.image && (
                      <div className="w-full md:w-2/5 shrink-0 bg-navy-800">
                        <img src={wf.image} alt={wf.name} className="w-full h-full object-cover min-h-[200px]" />
                      </div>
                    )}
                    <div className="p-6 md:p-8 flex flex-col justify-center space-y-4">
                      <h4 className="text-lg font-syne font-bold text-white tracking-wide">{wf.name}</h4>
                      <p className="text-text-secondary text-sm text-balance leading-relaxed">
                        {wf.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!project.details && (
              <div>
                <h3 className="text-xl font-syne font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Code className="text-blue-brand" size={20} /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="px-4 py-2 bg-navy-800 border border-blue-brand/20 rounded-xl text-sm font-mono text-text-primary shadow-sm flex items-center gap-2">
                      <Zap size={14} className="text-blue-brand opacity-70" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4">
              <a href="#" className="px-6 py-3 bg-white text-navy-950 hover:bg-gray-100 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-lg">
                View Full Setup <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const [showScroller, setShowScroller] = useState(false);

  const { scrollY } = useScroll();
  const navBackground = useTransform(scrollY, [0, 60], ["rgba(6, 13, 31, 0)", "rgba(6, 13, 31, 0.9)"]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      setShowScroller(window.scrollY > 400);
      
      const sections = ['hero', 'about', 'stack', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.includes(activeFilter));

  if (loading) {
    return (
      <div className="fixed inset-0 bg-navy-950 z-[100] flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <img 
            src="/mohan.png" 
            alt="Mohan" 
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-brand shadow-[0_0_40px_rgba(37,99,235,0.4)]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== 'https://avatars.githubusercontent.com/u/1012108') {
                 target.src = 'https://avatars.githubusercontent.com/u/1012108';
              }
            }}
          />
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-syne font-bold text-white tracking-wider">Mohan</h1>
            <p className="text-blue-brand font-mono uppercase tracking-widest text-sm">Agentic AI Engineer</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* --- Navbar --- */}
      <motion.nav 
        style={{ background: navBackground as never }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300 rounded-full px-4 sm:px-6 flex items-center justify-between h-16 border ${isScrolled ? 'border-blue-brand/20 backdrop-blur-md shadow-lg shadow-blue-brand/5' : 'border-transparent'}`}
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/mohan.png" alt="Mohan" className="w-10 h-10 rounded-full object-cover border-2 border-blue-brand" onError={(e) => { const target = e.target as HTMLImageElement; if (target.src !== 'https://avatars.githubusercontent.com/u/1012108') { target.src = 'https://avatars.githubusercontent.com/u/1012108'; } }} />
          <span className="font-syne font-bold text-white text-lg hidden sm:block">Mohan</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {['About', 'Stack', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium transition-colors hover:text-blue-brand ${activeSection === item.toLowerCase() ? 'text-blue-brand' : 'text-text-secondary'}`}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.a 
            href="https://calendly.com/donthalamohanrao0/30min"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-blue-brand text-white rounded-full text-sm font-bold shadow-lg shadow-blue-brand/20 hidden sm:block"
          >
            Book a Call
          </motion.a>
          
          <button className="md:hidden text-text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <div className="w-6 h-0.5 bg-current transition-all" />
          </button>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-navy-900 border-b border-blue-brand/20 p-6 md:hidden flex flex-col gap-4"
            >
              {['About', 'Stack', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-text-secondary hover:text-blue-brand"
                >
                  {item}
                </a>
              ))}
              <a 
                href="https://calendly.com/donthalamohanrao0/30min"
                className="w-full py-3 bg-blue-brand text-white rounded-xl text-center font-bold"
              >
                Book a Call
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* --- Hero Section --- */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <ParticleCanvas />
        <div className="hero-glow top-1/4 -left-1/4" />
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10 w-full">
          <div className="md:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full card-glass border-blue-brand/40"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-text-secondary uppercase tracking-[0.2em]">Available for Full-time & Freelance</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-[80px] font-syne font-extrabold tracking-tighter text-white"
                style={{ lineHeight: 1.1 }}
              >
                Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-400"><TypewriterText text="Mohan" /></span>
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-[42px] font-syne font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-brand to-cyan-brand"
              >
                Agentic AI Engineer
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-xl text-text-secondary text-lg leading-relaxed"
              >
                I build production-ready Agentic AI systems that don't just demo — they ship. Multi-agent pipelines, RAG architectures, and LangGraph workflows engineered for real production traffic.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a 
                href="https://calendly.com/donthalamohanrao0/30min"
                target="_blank"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(37, 99, 235, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-brand text-white font-bold rounded-xl flex items-center gap-2 group"
              >
                Book a Discovery Call
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.a>
              <motion.a 
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-blue-brand text-blue-brand font-bold rounded-xl"
              >
                View My Work
              </motion.a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {[
                { val: "20+", label: "Projects Shipped" },
                { val: "3.5K+", label: "YouTube" },
                { val: "Global", label: "US · UK · India" }
              ].map((stat, i) => (
                <div key={i} className="px-4 py-2 rounded-lg border border-blue-brand/20 bg-blue-brand/5 text-xs font-mono text-text-secondary flex items-center gap-2">
                  <span className="text-blue-brand font-bold">{stat.val}</span>
                  <span className="opacity-60">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 border border-blue-brand/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-8 border border-blue-brand/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
              
              <div className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border-2 border-blue-brand shadow-[0_0_50px_rgba(37,99,235,0.3)] overflow-hidden bg-transparent flex items-center justify-center group">
                {/* The user provided a photo, I'll use a placeholder for now but reference the file name mohan.png as per user prompt context */}
                <img 
                  src="/mohan.png" 
                  alt="Mohan" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== 'https://avatars.githubusercontent.com/u/1012108') {
                       target.src = 'https://avatars.githubusercontent.com/u/1012108'; // fallback
                    }
                  }}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-blue-brand opacity-60"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-32 bg-navy-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-[2px] bg-blue-brand" />
            <h2 className="text-4xl font-syne font-bold uppercase tracking-widest">About Me</h2>
          </div>

          <div className="grid md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-5 space-y-12">
              <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-8xl md:text-9xl font-syne font-bold text-blue-brand">2+</span>
                  <span className="text-4xl md:text-5xl font-syne font-medium text-text-secondary">Years</span>
                </div>
                <div className="text-4xl md:text-5xl font-syne font-medium text-text-secondary">Building</div>
                <div className="text-4xl md:text-5xl font-syne font-bold">AI Systems</div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-8">
              <h3 className="text-2xl font-syne font-bold text-text-primary">
                "I started shipping before most people started learning."
              </h3>
              
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-dmsans">
                <p>
                  Most people spend their first year watching tutorials. I spent mine building systems that ran in production — for real clients, with real money on the line, solving real problems at scale.
                </p>
                <p>
                  In 2 years I founded <span className="text-blue-brand font-semibold">ProfitGrowthAI</span>, shipped <span className="text-blue-brand font-semibold">20+ end-to-end AI systems</span> for clients across the US, UK, and India, built outbound pipelines processing <span className="text-blue-brand font-semibold">500+ leads every single day</span>, and grew a YouTube channel to <span className="text-blue-brand font-semibold">3,000+ engineers</span> who follow my work.
                </p>
                <p className="italic text-blue-brand/80 font-medium pt-4 underline underline-offset-8">
                  Builder by nature. Not a prompt engineer.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-12">
                {[
                  { value: "20+", label: "Client Projects Delivered" },
                  { value: "3.5K+", label: "YouTube Subscribers" },
                  { value: "500+", label: "Leads Processed Daily" },
                  { value: "32+", label: "Happy Clients" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-navy-800 rounded-2xl border-t-2 border-blue-brand/40">
                    <div className="text-3xl font-syne font-bold text-blue-brand mb-1">{stat.value}</div>
                    <div className="text-xs text-text-secondary font-mono tracking-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Tech Stack Section --- */}
      <section id="stack" className="py-32 bg-navy-900 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-syne font-bold uppercase tracking-widest text-text-primary">Core Tech Stack</h2>
            <p className="text-text-secondary max-w-2xl text-lg">
              The tools and platforms I use to architect robust, scalable AI automation pipelines for production.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AI & Orchestration",
                description: "Building autonomous agents and workflow pipelines.",
                skills: ["OpenAI", "Claude API", "LangChain", "LangGraph", "LangSmith", "RAG", "Vector DB", "n8n"]
              },
              {
                title: "Backend & Cloud",
                description: "Architecting scalable systems and infrastructure.",
                skills: ["Python", "FastAPI", "Node.js", "AWS", "Google Cloud", "Docker", "REST API", "Pydantic"]
              },
              {
                title: "Database & Frontend",
                description: "Data persistence and user interfaces.",
                skills: ["PostgreSQL", "Supabase", "React.js", "Next.js"]
              },
              {
                title: "Automation & CRMs",
                description: "End-to-end outbound and voice systems.",
                skills: ["GoHighLevel", "Apollo", "Clay", "Retell AI"]
              }
            ].map((category, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.5, staggerChildren: 0.1 } 
                  }
                }}
                className="p-8 card-glass rounded-3xl border-t-2 border-blue-brand/20 hover:border-blue-brand/50 transition-colors"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-syne font-bold text-text-primary mb-2">{category.title}</h3>
                  <p className="text-text-secondary text-sm font-dmsans">{category.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map(skillName => {
                    const allSkills = [...SKILLS_ROW_1, ...SKILLS_ROW_2];
                    const skill = allSkills.find(s => s.name === skillName) || { name: skillName, color: '#2563eb' };
                    return (
                      <motion.div 
                        key={skillName} 
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } }
                        }}
                        whileHover={{ scale: 1.05, y: -2, zIndex: 10, borderColor: "rgba(37, 99, 235, 0.5)", backgroundColor: "rgba(37, 99, 235, 0.1)", boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.3)" }}
                        className="flex items-center gap-2.5 px-4 py-2.5 bg-navy-950/50 border border-white/5 rounded-xl transition-all cursor-default group shadow-sm"
                      >
                        <div className="w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                           <SkillIcon name={skill.name} color={skill.color} />
                        </div>
                        <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Experience Section --- */}
      <section id="experience" className="py-32 bg-navy-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-20">
            <div className="w-12 h-[2px] bg-blue-brand" />
            <h2 className="text-4xl font-syne font-bold uppercase tracking-widest text-center">Experience</h2>
          </div>

          <div className="relative border-l-2 border-blue-brand/30 ml-8 space-y-20 pb-10">
            {/* Card 1 */}
            <div className="relative pl-12 group">
              <div className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-navy-950 border-2 border-blue-brand z-10 p-1">
                <div className="w-full h-full bg-blue-brand rounded-full animate-pulse" />
              </div>
              
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 20 }}
                className="card-glass p-8 rounded-3xl space-y-6"
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="text-2xl font-syne font-bold text-text-primary">Founder & AI Automation Specialist</h4>
                    <div className="flex items-center gap-3">
                      <a href="https://profitgrowthai.in" target="_blank" className="text-blue-brand hover:underline font-medium">ProfitGrowthAI</a>
                      <span className="px-3 py-1 bg-blue-brand/10 text-blue-brand text-[10px] font-bold rounded-full uppercase">Agency Founder</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-text-primary font-mono font-bold">May 2025 – Jan 2026</div>
                    <div className="text-text-muted text-xs">Remote · India/US/UK</div>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Founded and ran a full-service AI automation agency — managed sales, delivery, and client success across 20+ projects independently",
                    "Shipped end-to-end AI systems for clients in marketing, SaaS, healthcare, and real estate across US, UK, and India",
                    "Built GoHighLevel CRM infrastructure from scratch — pipeline flows, lead tracking, booking sequences, automated reporting",
                    "Engineered outbound sales systems with Apollo, Clay, and OpenAI — processing 500+ leads/day with AI-personalized sequences",
                    "Built and sold AI automation course to 32+ students across 4+ countries",
                    "Grew @mofiAI YouTube channel to 3,500+ subscribers teaching agentic AI and n8n systems"
                  ].map((bullet, i) => (
                    <li key={i} className="flex gap-4 text-text-secondary text-sm leading-relaxed">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-brand shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4">
                  {["n8n", "Make.com", "OpenAI", "Claude API", "GHL", "Apollo", "Clay", "LangChain", "Retell AI"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-navy-950/50 border border-blue-brand/10 rounded-lg text-[10px] font-mono text-text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Card 2 */}
            <div className="relative pl-12 group">
              <div className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-navy-950 border-2 border-cyan-brand z-10 p-1">
                <div className="w-full h-full bg-cyan-brand rounded-full" />
              </div>
              
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 20 }}
                className="card-glass p-8 rounded-3xl space-y-6"
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="text-2xl font-syne font-bold text-text-primary">AI Automation Developer</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-brand font-medium">Pagentz</span>
                      <span className="px-3 py-1 bg-cyan-brand/10 text-cyan-brand text-[10px] font-bold rounded-full uppercase">Full-time</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-text-primary font-mono font-bold">Dec 2025 – Feb 2026</div>
                    <div className="text-text-muted text-xs">Remote · US-Based Startup</div>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Designed and deployed production-ready automation workflows — multi-channel lead qualification and AI outbound sequences for US clients",
                    "Engineered Retell AI voice agent systems with dynamic variable injection, conversation memory, and real-time CRM sync via REST API",
                    "Configured OAuth 2.0 flows connecting GHL, Supabase, Twilio, and OpenAI into unified pipelines",
                    "Achieved zero manual SDR workload — full pipeline from lead capture to appointment booking automated"
                  ].map((bullet, i) => (
                    <li key={i} className="flex gap-4 text-text-secondary text-sm leading-relaxed">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-brand shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4">
                  {["n8n", "Retell AI", "GoHighLevel", "Twilio", "OpenAI", "Supabase", "OAuth 2.0"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-navy-950/50 border border-cyan-brand/10 rounded-lg text-[10px] font-mono text-text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section id="projects" className="py-32 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-center text-4xl md:text-5xl font-syne font-bold uppercase tracking-widest">Projects</h2>
            <p className="text-text-secondary max-w-xl mx-auto">Production systems. Not side projects.</p>
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-16">
            {['All', 'Agentic AI', 'Automation', 'SaaS'].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-2.5 rounded-full font-bold transition-all ${activeFilter === filter ? 'bg-blue-brand text-white' : 'bg-navy-800 text-text-secondary border border-blue-brand/10 hover:border-blue-brand'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -6, boxShadow: "0 0 40px rgba(37, 99, 235, 0.2)" }}
                  className="card-glass rounded-3xl relative border-t-4 overflow-hidden flex flex-col group cursor-pointer"
                  style={{ borderTopColor: project.color }}
                  onClick={() => setSelectedProject(project)}
                >
                  {project.image && (
                    <div className="h-48 w-full relative overflow-hidden bg-navy-800">
                      <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors z-10" />
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  
                  <div className="p-8 space-y-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="px-3 py-1 bg-navy-950 rounded-full text-[10px] font-bold text-text-muted uppercase tracking-widest">
                        {project.category}
                      </div>
                      <div className="px-3 py-1 bg-blue-brand/10 text-blue-brand rounded-full text-[10px] font-black uppercase shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                        {project.metric}
                      </div>
                    </div>

                    <div className="space-y-4 flex-grow">
                      <h4 className="text-xl font-syne font-bold text-text-primary group-hover:text-blue-brand transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-text-secondary leading-relaxed text-sm">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-6 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-blue-brand/5 border border-blue-brand/10 rounded-md text-[10px] font-mono text-text-secondary">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-blue-brand/10">
                        <button 
                          className="px-4 py-2 bg-blue-brand/10 hover:bg-blue-brand text-blue-brand hover:text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                          View More <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Coming Soon card */}
            <div className="p-8 rounded-3xl border-2 border-dashed border-blue-brand/20 bg-blue-brand/5 flex flex-col items-center justify-center text-center space-y-4 py-20 min-h-[400px]">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-brand/40 flex items-center justify-center text-blue-brand">
                <Bot size={32} />
              </div>
              <div>
                <div className="text-xl font-syne font-bold">More Projects Coming Soon</div>
                <div className="text-text-muted text-sm font-mono mt-1">Building something new...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- YouTube Section --- */}
      <section id="youtube" className="py-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/5 z-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" fill="white">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </div>
                  <span className="text-3xl font-syne font-bold">@mofiAI</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-7xl font-syne font-bold text-blue-brand">3,500+</span>
                  </div>
                  <div className="text-2xl font-syne text-text-secondary">Engineers subscribed</div>
                </div>

                <p className="text-text-secondary text-lg leading-relaxed max-w-lg">
                  I teach Agentic AI and production automation workflows. No fluff. Just real strategies, systems, and code that grows revenue.
                </p>
              </div>

              <motion.a 
                href="https://www.youtube.com/@mofiAI123-f"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/30"
              >
                Visit Channel <ExternalLink size={18} />
              </motion.a>
            </div>

            <div className="space-y-8">
              <div className="p-8 card-glass rounded-3xl border-l-4 border-l-red-600 space-y-6">
                <div className="italic text-text-primary text-xl font-medium leading-relaxed">
                  "I build agentic AI systems and automation workflows in public. Real systems. Real code. Real problems being solved live — not polished demos."
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Agentic AI Systems", "n8n Workflows", "Voice Agent Dev"].map(pill => (
                    <span key={pill} className="px-3 py-1 bg-red-700/10 border border-red-700/20 text-red-500 rounded-md text-[10px] font-mono">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { id: "GuaKeDS6UKU", title: "Automate Cold Outreach with n8n", views: "1.2K" },
                  { id: "gVl2JjamvB4", title: "Build an AI Voice Agent in 10 mins", views: "3.4K" },
                  { id: "sw_IK4M7S0A", title: "LangChain vs LlamaIndex", views: "2.1K" }
                ].map(v => (
                  <div key={v.id} className="space-y-3">
                    <div className="aspect-video bg-navy-800 rounded-xl overflow-hidden shadow-lg border border-white/5">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${v.id}`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="border-none"
                      ></iframe>
                    </div>
                    <div className="text-xs text-text-primary font-medium line-clamp-1">{v.title}</div>
                    <div className="text-[10px] text-text-muted font-mono">{v.views} views</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Achievements Section --- */}
      <section className="py-32 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16 justify-center">
            <div className="w-12 h-[2px] bg-blue-brand" />
            <h2 className="text-4xl font-syne font-bold uppercase tracking-widest text-center">By the Numbers</h2>
            <div className="w-12 h-[2px] bg-blue-brand" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value="20+" label="Client Projects" sub="US · UK · India" />
            <StatCounter value="3,500+" label="YouTube Users" sub="@mofiAI Content" />
            <StatCounter value="500+" label="Leads/Day" sub="Per outbound system" />
            <StatCounter value="32+" label="Students Taught" sub="Across 4+ countries" />
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section className="py-32 bg-navy-900 overflow-hidden relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-10 pointer-events-none" 
             style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }} />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-syne font-bold uppercase tracking-widest">What Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((t) => (
              <motion.div 
                key={t}
                whileHover={{ y: -8, boxShadow: "0 0 40px rgba(37, 99, 235, 0.2)" }}
                className="p-8 card-glass rounded-2xl flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-text-secondary italic leading-relaxed text-sm">
                    "Mohan's ability to simplify complex AI architectures into production-ready workflows is unmatched. He helped us automate our entire outbound pipeline, saving us 40+ hours of manual work every week."
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-10">
                  <div className="w-10 h-10 bg-navy-600 flex items-center justify-center rounded-full text-white font-bold text-xs">
                    CN
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text-primary">Client Name</div>
                    <div className="text-[10px] text-text-muted">CEO, Startup Company</div>
                  </div>
                  <div className="ml-auto">
                    <span className="px-2 py-1 bg-blue-brand/10 text-blue-brand text-[8px] font-bold uppercase rounded">AI Project</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact + CTA --- */}
      <section id="contact" className="py-32 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-syne font-bold">Let's Build Something</h2>
            <p className="text-text-secondary max-w-xl mx-auto">Open to Agentic AI Engineer roles and high-quality freelance projects</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <div className="p-10 card-glass rounded-3xl space-y-12">
              <h4 className="text-2xl font-syne font-bold">Get In Touch</h4>
              
              <div className="space-y-8">
                {[
                  { icon: <Mail />, val: "donthalamohanrao@gmail.com", link: "mailto:donthalamohanrao@gmail.com" },
                  { icon: <Phone />, val: "+91-7075979578", link: "tel:+917075979578" },
                  { icon: <Linkedin />, val: "linkedin.com/in/mohan-rao", link: "https://www.linkedin.com/in/mohan-rao-b3b092257" },
                  { icon: <Youtube />, val: "@mofiAI", link: "https://www.youtube.com/@mofiAI123-f" },
                  { icon: <Globe />, val: "profitgrowthai.in", link: "https://profitgrowthai.in" },
                ].map((row, i) => (
                  <a key={i} href={row.link} target="_blank" className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-blue-brand/10 rounded-xl flex items-center justify-center text-blue-brand group-hover:bg-blue-brand group-hover:text-white transition-all">
                      {row.icon}
                    </div>
                    <span className="text-text-secondary group-hover:text-text-primary transition-all font-mono tracking-tighter">
                      {row.val}
                    </span>
                  </a>
                ))}
              </div>

              <div className="flex gap-4 pt-10 border-t border-blue-brand/10">
                {[
                  { icon: <Github size={20} />, link: "#" },
                  { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/mohan-rao-b3b092257" },
                  { icon: <Youtube size={20} />, link: "https://www.youtube.com/@mofiAI123-f" }
                ].map((s, i) => (
                  <motion.a 
                    key={i} 
                    href={s.link}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="w-12 h-12 bg-navy-800 border border-white/5 rounded-full flex items-center justify-center text-text-secondary hover:text-blue-brand hover:border-blue-brand transition-all"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-10 bg-blue-brand/10 border-2 border-blue-brand rounded-3xl space-y-10 shadow-[0_0_60px_rgba(37,99,235,0.15)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <h4 className="text-3xl font-syne font-bold">Book a Free Discovery Call</h4>
                <p className="text-text-secondary">If you're building an agentic product and need someone who's shipped in production — 30 minutes is all we need.</p>
              </div>

              <div className="space-y-4">
                {[
                  "Free 30-minute call",
                  "Technical discussion — no sales pitch",
                  "Clear next steps by end of call"
                ].map(p => (
                  <div key={p} className="flex items-center gap-3 text-text-primary font-medium">
                    <div className="w-6 h-6 bg-blue-brand rounded-full flex items-center justify-center p-1">
                      <Star size={12} fill="white" color="white" />
                    </div>
                    {p}
                  </div>
                ))}
              </div>

              <a 
                href="https://calendly.com/donthalamohanrao0/30min"
                target="_blank" 
                className="w-full py-5 bg-blue-brand text-white text-center font-syne font-bold text-xl rounded-2xl shadow-xl shadow-blue-brand/40 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Schedule 30-Min Call <ArrowUp className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </a>

              <div className="text-center text-text-muted text-xs font-mono uppercase tracking-[0.2em] pt-4">
                Free · No commitment · Response within 24h
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-20 bg-navy-950 border-t border-blue-brand/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-12">
          <div className="flex flex-col items-center space-y-4">
            <img src="/mohan.png" alt="Mohan" className="w-16 h-16 rounded-full object-cover border-2 border-blue-brand" onError={(e) => { const target = e.target as HTMLImageElement; if (target.src !== 'https://avatars.githubusercontent.com/u/1012108') { target.src = 'https://avatars.githubusercontent.com/u/1012108'; } }} />
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-syne font-bold">Mohan</h2>
              <p className="text-text-secondary mt-1">Agentic AI Engineer</p>
            </div>
          </div>

          <div className="flex gap-8 text-text-secondary">
            {['About', 'Stack', 'Experience', 'Projects', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-blue-brand transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="italic text-text-muted text-sm max-w-sm text-center font-dmsans">
            "Built with code. Shipped to production. Like everything else."
          </div>

          <div className="text-text-muted text-[10px] font-mono tracking-widest pt-8 border-t border-white/5 w-full text-center">
            © 2026 MOHAN RAO. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* --- Scroll Progress / Top --- */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-blue-brand text-white rounded-full flex items-center justify-center shadow-2xl transition-all z-40 transform ${showScroller ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <ArrowUp size={24} />
      </button>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
