import { useState, useEffect, useRef } from "react";
import {
  Moon, Sun, Menu, X, Zap, BarChart3, Users, GitBranch,
  FileText, CheckSquare, ArrowRight, Star, ChevronDown,
  ExternalLink, Mail, Play, TrendingUp,
  Shield,  Globe, Award,
  ChevronRight, Sparkles, Brain, 
} from "lucide-react";


const cn = (...classes) => classes.filter(Boolean).join(" ");


function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return [dark, setDark];
}


function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Animated Counter ───────────────────────────────────────────────────────
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useScrollReveal(0.5);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── Reveal Wrapper ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={cn(className, "transition-all duration-700")}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════════════════════════════════════
function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Features", "Pricing", "Testimonials", "Contact"];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-slate-700/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-indigo-500 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span>Nexus<span className="text-emerald-500">AI</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Home</a>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => setDark(!dark)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#pricing"
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20">
            Get Started
          </a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setDark(!dark)} className="p-2 text-slate-500">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-slate-500">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex flex-col gap-4">
          {["Home", ...links].map(l => (
            <a key={l} href={l === "Home" ? "#" : `#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {l}
            </a>
          ))}
          <a href="#pricing"
            className="mt-2 px-4 py-2.5 text-center text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-500 text-white">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════════════════════════
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 dark:via-slate-950/50 dark:to-slate-950" />

      {/* Gradient orbs */}
      <div className="absolute top-32 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8 animate-pulse">
          <Sparkles size={14} />
          Powered by next-gen AI — Now in Public Beta
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-6">
          Transform Your
          <br />
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
            Workflow
          </span>{" "}
          With AI
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          NexusAI unifies your team's tasks, analytics, and automations into one intelligent platform — so you ship faster and think less about process.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="#pricing"
            className="group flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-500 text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all">
            Start for free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#features"
            className="flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-800/60 backdrop-blur hover:border-slate-300 dark:hover:border-slate-600 transition-all">
            <Play size={16} className="text-emerald-500" />
            Watch demo
          </a>
        </div>

        {/* Dashboard mockup */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="mx-auto w-64 h-5 rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Mini dashboard inside hero ─────────────────────────────────────────────
function DashboardPreview() {
  const bars = [65, 80, 55, 90, 72, 88, 60, 95, 70, 85, 78, 92];
  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 grid grid-cols-12 gap-4 min-h-[320px]">
      {/* Sidebar */}
      <div className="col-span-2 hidden md:flex flex-col gap-3">
        {["Overview", "Tasks", "Analytics", "Team", "Settings"].map((item, i) => (
          <div key={item} className={cn(
            "px-3 py-2 rounded-xl text-xs font-medium",
            i === 0 ? "bg-emerald-500 text-white" : "text-slate-400 dark:text-slate-500"
          )}>{item}</div>
        ))}
      </div>

      {/* Main area */}
      <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Revenue", val: "$48.2K", up: "+18%" },
            { label: "Tasks", val: "1,284", up: "+32%" },
            { label: "Velocity", val: "94%", up: "+7%" },
          ].map(k => (
            <div key={k.label} className="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-100 dark:border-slate-700">
              <div className="text-xs text-slate-400 mb-1">{k.label}</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{k.val}</div>
              <div className="text-xs text-emerald-500 font-medium">{k.up}</div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 flex-1">
          <div className="text-xs font-semibold text-slate-500 mb-3">Revenue · Last 12 months</div>
          <div className="flex items-end gap-1.5 h-24">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500 to-indigo-500 opacity-80"
                style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="col-span-3 hidden md:flex flex-col gap-3">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-100 dark:border-slate-700">
          <div className="text-xs font-semibold text-slate-500 mb-2">Activity</div>
          {["Design review done", "Sprint 12 started", "PR merged", "Report exported"].map((a, i) => (
            <div key={i} className="flex items-center gap-2 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-xs text-slate-500 truncate">{a}</span>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-2xl p-3 text-white">
          <div className="text-xs font-semibold opacity-80 mb-1">AI Insight</div>
          <div className="text-xs leading-relaxed opacity-90">Your team's throughput is up 32% — on track to beat Q3 targets.</div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// TRUSTED BY
// ════════════════════════════════════════════════════════════════════════════
function TrustedBy() {
  const logos = [
    "Notion", "Linear", "Stripe", "Vercel", "Figma",
    "Loom", "Retool", "Supabase"
  ];
  return (
    <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-10">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {logos.map(name => (
            <div key={name}
              className="text-xl font-black text-slate-300 dark:text-slate-700 hover:text-slate-500 dark:hover:text-slate-500 transition-colors tracking-tight cursor-default select-none">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// FEATURES
// ════════════════════════════════════════════════════════════════════════════
const featureData = [
  { icon: Brain, title: "AI Assistant", desc: "Ask questions, generate summaries, and automate repetitive decisions using your own data — no prompt engineering needed.", color: "from-purple-500 to-indigo-500" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time metrics across every team and project. Custom widgets, drill-downs, and export to any format.", color: "from-emerald-500 to-teal-500" },
  { icon: Users, title: "Team Collaboration", desc: "Threads, comments, mentions, and shared docs — all contextual to the work, never buried in Slack.", color: "from-sky-500 to-blue-600" },
  { icon: GitBranch, title: "Workflow Automation", desc: "Visual if-this-then-that builder. Connect your tools, trigger actions, and never chase status updates again.", color: "from-orange-500 to-rose-500" },
  { icon: FileText, title: "Smart Reports", desc: "Auto-generated weekly reports with highlights, risks, and recommendations — ready to share with one click.", color: "from-pink-500 to-fuchsia-500" },
  { icon: CheckSquare, title: "Task Management", desc: "Kanban, list, timeline — your team's view, not ours. Linked to goals so every task has measurable impact.", color: "from-amber-500 to-yellow-500" },
];

function Features() {
  return (
    <section id="features" className="py-28 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 mb-4">
            Everything you need
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Six tools. One platform.
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Replace your stack of disconnected apps with a single intelligent workspace.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureData.map(({ icon: Icon, title, desc, color }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group relative bg-white dark:bg-slate-800 rounded-3xl p-7 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 shadow-lg", color)}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight size={16} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// INTERACTIVE DASHBOARD SHOWCASE
// ════════════════════════════════════════════════════════════════════════════
function DashboardShowcase() {
  const [tab, setTab] = useState(0);
  const tabs = ["Overview", "Analytics", "Team", "Automations"];
  const bars2 = [40, 65, 50, 80, 70, 90, 60, 85, 75, 95, 55, 88];
  

  return (
    <section className="py-28 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700 mb-4">
            Live dashboard
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Command your entire operation
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Every metric your team needs, one screen. No config required.
          </p>
        </Reveal>

        <Reveal>
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-center gap-1 p-4 border-b border-slate-100 dark:border-slate-700 overflow-x-auto">
              {tabs.map((t, i) => (
                <button key={t} onClick={() => setTab(i)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                    tab === i
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  )}>
                  {t}
                </button>
              ))}
            </div>

            <div className="p-6 grid grid-cols-12 gap-5 min-h-[440px]">
              {/* Left col */}
              <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
                {/* KPIs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Total Revenue", val: "$128.4K", delta: "+24%", icon: TrendingUp },
                    { label: "Active Users", val: "18,392", delta: "+11%", icon: Users },
                    { label: "Tasks Done", val: "4,821", delta: "+38%", icon: CheckSquare },
                    { label: "Uptime", val: "99.98%", delta: "+0.1%", icon: Shield },
                  ].map(({ label, val, delta, icon: Ico }) => (
                    <div key={label} className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400">{label}</span>
                        <Ico size={14} className="text-slate-400" />
                      </div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white">{val}</div>
                      <div className="text-xs text-emerald-500 font-semibold mt-0.5">{delta} vs last month</div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Revenue Trend</span>
                    <span className="text-xs text-slate-400">Last 12 months</span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {bars2.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-indigo-500"
                          style={{ height: `${h}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m => (
                      <span key={m} className="text-xs text-slate-400 flex-1 text-center">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Progress bars */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Project Progress</div>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "Platform Redesign", pct: 82, color: "from-emerald-400 to-emerald-500" },
                      { name: "API v3 Migration", pct: 61, color: "from-indigo-400 to-indigo-500" },
                      { name: "Mobile App Launch", pct: 45, color: "from-amber-400 to-orange-500" },
                      { name: "Data Pipeline", pct: 93, color: "from-pink-400 to-rose-500" },
                    ].map(p => (
                      <div key={p.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600 dark:text-slate-400 font-medium">{p.name}</span>
                          <span className="text-slate-400">{p.pct}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full bg-gradient-to-r", p.color)}
                            style={{ width: `${p.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right col */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
                {/* Donut placeholder */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Task Completion</div>
                  <div className="flex items-center justify-center mb-3">
                    <div className="relative w-24 h-24">
                      <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3.2" className="dark:stroke-slate-600" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#grad)" strokeWidth="3.2"
                          strokeDasharray={`${62} 38`} strokeLinecap="round" />
                        <defs>
                          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#6366F1" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-black text-slate-900 dark:text-white">62%</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> <span className="text-slate-500">Done</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-600" /> <span className="text-slate-500">Pending</span></div>
                  </div>
                </div>

                {/* Activity feed */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 flex-1">
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Recent Activity</div>
                  <div className="flex flex-col gap-3">
                    {[
                      { user: "Ana", action: "Completed Sprint 14 review", time: "2m ago", color: "bg-purple-400" },
                      { user: "Tom", action: "Merged PR #241", time: "14m ago", color: "bg-emerald-400" },
                      { user: "AI", action: "Generated weekly report", time: "1h ago", color: "bg-indigo-400" },
                      { user: "Mia", action: "Invited 3 new members", time: "3h ago", color: "bg-rose-400" },
                    ].map(a => (
                      <div key={a.action} className="flex items-start gap-2.5">
                        <div className={cn("w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold", a.color)}>
                          {a.user[0]}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">{a.action}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// BENEFITS
// ════════════════════════════════════════════════════════════════════════════
const benefits = [
  {
    tag: "Speed",
    title: "Ship 3× faster without the chaos",
    body: "NexusAI keeps every dependency visible and every blocker logged. Your team stops context-switching and starts delivering.",
    metrics: [{ val: "3×", label: "faster release cycles" }, { val: "68%", label: "fewer status meetings" }],
    icon: Zap,
    accent: "text-emerald-500",
    bg: "from-emerald-500/10 to-teal-500/10",
  },
  {
    tag: "Clarity",
    title: "Decisions backed by real-time data",
    body: "No more gut feeling. Every sprint, every initiative, every hire has a dashboard — and the AI surfaces what matters before you ask.",
    metrics: [{ val: "94%", label: "forecast accuracy" }, { val: "2.1×", label: "ROI on tracked projects" }],
    icon: BarChart3,
    accent: "text-indigo-500",
    bg: "from-indigo-500/10 to-purple-500/10",
  },
  {
    tag: "Scale",
    title: "Grows with your team, not against it",
    body: "From 5 to 5,000 seats. Granular permissions, org-level analytics, and SSO mean enterprise security at startup speed.",
    metrics: [{ val: "99.98%", label: "uptime SLA" }, { val: "<80ms", label: "global p95 latency" }],
    icon: Globe,
    accent: "text-rose-500",
    bg: "from-rose-500/10 to-orange-500/10",
  },
];

function Benefits() {
  return (
    <section className="py-28 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-700 mb-4">
            Why it works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Built for outcomes, not activity
          </h2>
        </Reveal>

        <div className="flex flex-col gap-16">
          {benefits.map(({ tag, title, body, metrics, icon: Icon, accent, bg }, i) => (
            <Reveal key={title} delay={100}>
              <div className={cn("flex flex-col gap-8 items-center", i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse")}>
                {/* Visual side */}
                <div className="flex-1">
                  <div className={cn("rounded-3xl bg-gradient-to-br p-8 min-h-[260px] flex items-center justify-center", bg)}>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600")}>
                        <Icon size={28} className={accent} />
                      </div>
                      <div className="flex gap-6">
                        {metrics.map(m => (
                          <div key={m.label} className="text-center">
                            <div className={cn("text-3xl font-black", accent)}>{m.val}</div>
                            <div className="text-xs text-slate-400 mt-1 max-w-[90px] leading-tight">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text side */}
                <div className="flex-1">
                  <span className={cn("text-xs font-bold uppercase tracking-widest", accent)}>{tag}</span>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-2 mb-4 leading-tight">{title}</h3>
                  <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{body}</p>
                  <a href="#pricing" className={cn("inline-flex items-center gap-1.5 font-semibold text-sm", accent, "hover:gap-3 transition-all")}>
                    Learn more <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ANALYTICS SECTION
// ════════════════════════════════════════════════════════════════════════════
function AnalyticsSection() {
  const kpis = [
    { label: "MAU", val: 18392, suffix: "", icon: Users, color: "text-indigo-500" },
    { label: "Revenue", val: 128, suffix: "K", icon: TrendingUp, color: "text-emerald-500" },
    { label: "Tasks", val: 4821, suffix: "", icon: CheckSquare, color: "text-rose-500" },
    { label: "NPS Score", val: 72, suffix: "", icon: Award, color: "text-amber-500" },
  ];
  return (
    <section className="py-28 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700 mb-4">
            Growth metrics
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Numbers that speak for themselves
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpis.map(({ label, val, suffix, icon: Icon, color }) => (
            <Reveal key={label}>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-7 border border-slate-100 dark:border-slate-700 text-center">
                <Icon size={28} className={cn(color, "mx-auto mb-3")} />
                <div className={cn("text-4xl font-black mb-1", color)}>
                  <Counter end={val} suffix={suffix} />
                </div>
                <div className="text-sm text-slate-400">{label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Growth visual */}
        <Reveal>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Growth</h3>
                <p className="text-sm text-slate-400">Month-over-month active users</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-500">
                <TrendingUp size={16} /> +142% YoY
              </div>
            </div>
            <div className="flex items-end gap-3 h-40">
              {[12,18,15,22,20,28,26,35,32,42,48,58].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-xl bg-gradient-to-t from-indigo-500 to-emerald-400 opacity-80 transition-all hover:opacity-100"
                    style={{ height: `${(h / 58) * 100}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m => (
                <span key={m} className="text-xs text-slate-400 flex-1 text-center">{m}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS
// ════════════════════════════════════════════════════════════════════════════
const testimonials = [
  { name: "Sarah Chen", role: "CTO · Prismatic Labs", stars: 5, text: "NexusAI replaced four tools overnight. Our sprint velocity went up 40% in the first month. The AI summaries alone save me an hour a day.", avatar: "SC" },
  { name: "Marcus Reid", role: "VP Eng · Arcadia", stars: 5, text: "The dashboard is breathtaking — and actually useful. I've never seen a tool that makes stakeholders happy *and* developers productive.", avatar: "MR" },
  { name: "Priya Nair", role: "Head of Ops · Fablr", stars: 5, text: "We onboarded 80 people in two weeks with zero training sessions. The UX is that intuitive. Genuinely the best SaaS we've adopted.", avatar: "PN" },
  { name: "Jake Torres", role: "Founder · Stackr", stars: 5, text: "Automation rules in NexusAI saved us from hiring an extra ops person. It literally pays for itself every month. Can't imagine going back.", avatar: "JT" },
  { name: "Lena Hofer", role: "PM · Helion Data", stars: 5, text: "The AI insight engine catches risks I'd have missed until sprint retro. It's like having a senior PM watching every project 24/7.", avatar: "LH" },
  { name: "David Kim", role: "Engineering Lead · Qubit", stars: 5, text: "Best onboarding I've seen in 12 years of B2B SaaS. We were live in 30 minutes and fully migrated in a week. Incredible team.", avatar: "DK" },
];

function Testimonials() {
  const colors = ["bg-indigo-500", "bg-emerald-500", "bg-rose-500", "bg-amber-500", "bg-purple-500", "bg-sky-500"];
  return (
    <section id="testimonials" className="py-28 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-700 mb-4">
            Social proof
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Loved by 18,000+ teams
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Don't take our word for it. Here's what real customers are saying.
          </p>
        </Reveal>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map(({ name, role, stars, text, avatar }, i) => (
            <Reveal key={name} delay={i * 60}>
              <div className="break-inside-avoid bg-white dark:bg-slate-800 rounded-3xl p-7 border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="flex mb-3">
                  {Array.from({ length: stars }).map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0", colors[i % colors.length])}>
                    {avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{name}</div>
                    <div className="text-xs text-slate-400">{role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRICING
// ════════════════════════════════════════════════════════════════════════════
const plans = [
  {
    name: "Starter",
    price: 0,
    desc: "For small teams just getting started.",
    features: ["Up to 5 users", "10 active projects", "Basic analytics", "Community support", "2GB storage"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: 49,
    desc: "For growing teams that need more power.",
    features: ["Unlimited users", "Unlimited projects", "Advanced analytics", "AI Assistant", "Priority support", "50GB storage", "Custom workflows", "SSO"],
    cta: "Start Pro trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: 199,
    desc: "For large orgs with custom requirements.",
    features: ["Everything in Pro", "Dedicated CSM", "99.99% SLA", "Custom contracts", "On-prem option", "Audit logs", "Advanced security", "Unlimited storage"],
    cta: "Contact sales",
    highlight: false,
  },
];

function Pricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <section id="pricing" className="py-28 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-700 mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-6">No surprises. Cancel any time.</p>
          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
            <button onClick={() => setAnnual(false)}
              className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                !annual ? "bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white" : "text-slate-500")}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)}
              className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                annual ? "bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white" : "text-slate-500")}>
              Annual <span className="text-emerald-500 text-xs ml-1">save 20%</span>
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(({ name, price, desc, features, cta, highlight }, i) => (
            <Reveal key={name} delay={i * 100}>
              <div className={cn(
                "relative rounded-3xl p-8 flex flex-col border transition-all",
                highlight
                  ? "bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-700 dark:to-slate-800 border-transparent shadow-2xl scale-105"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg"
              )}>
                {highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 text-white text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <div className={cn("text-xs font-bold uppercase tracking-widest mb-2", highlight ? "text-emerald-400" : "text-slate-400")}>{name}</div>
                <div className={cn("text-5xl font-black mb-1", highlight ? "text-white" : "text-slate-900 dark:text-white")}>
                  ${annual ? Math.round(price * 0.8) : price}
                  <span className="text-base font-normal opacity-50">/mo</span>
                </div>
                <p className={cn("text-sm mb-6", highlight ? "text-slate-400" : "text-slate-400")}>{desc}</p>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <div className={cn("w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                        highlight ? "bg-emerald-500/20" : "bg-emerald-50 dark:bg-emerald-900/30")}>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <span className={highlight ? "text-slate-300" : "text-slate-600 dark:text-slate-400"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={cn(
                  "w-full py-3.5 rounded-2xl text-sm font-semibold transition-all",
                  highlight
                    ? "bg-gradient-to-r from-emerald-500 to-indigo-500 text-white hover:opacity-90 shadow-lg shadow-indigo-500/30"
                    : "border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
                )}>
                  {cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// FAQ
// ════════════════════════════════════════════════════════════════════════════
const faqs = [
  { q: "How does the 14-day trial work?", a: "Sign up and get full Pro access for 14 days — no credit card required. At the end of the trial, downgrade to Starter or enter payment details to continue." },
  { q: "Can I import data from other tools?", a: "Yes. NexusAI has one-click importers for Jira, Asana, Linear, Trello, Notion, and CSV. Most teams are fully migrated in under a day." },
  { q: "How does the AI Assistant work?", a: "The AI is trained on your workspace data — tasks, docs, comments, metrics — and uses that context to answer questions, generate reports, and surface insights without sending your data to third-party models." },
  { q: "Is my data secure?", a: "NexusAI is SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Enterprise plans include dedicated tenancy." },
  { q: "Do you offer discounts for startups or nonprofits?", a: "Yes — startups under Series A and registered nonprofits get 50% off Pro. Apply through our startup program page." },
  { q: "What integrations are available?", a: "We integrate with Slack, GitHub, GitLab, Figma, Google Workspace, Microsoft 365, Salesforce, HubSpot, Zapier, and 80+ more. Custom webhooks and a REST API are available on all plans." },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-28 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Common questions</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">Still unsure? <a href="#contact" className="text-emerald-500 font-semibold">Talk to us.</a></p>
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqs.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 50}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                  <span className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">{q}</span>
                  <ChevronDown size={18} className={cn("flex-shrink-0 text-slate-400 transition-transform", open === i && "rotate-180")} />
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// CTA BANNER
// ════════════════════════════════════════════════════════════════════════════
function CTABanner() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-12 md:p-20 text-center">
            {/* Orbs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/20 mb-6">
                Start in 60 seconds
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Your team deserves<br />better tools.
              </h2>
              <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
                Join 18,000+ teams already building faster with NexusAI. Free forever plan, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#pricing"
                  className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-500 text-white hover:opacity-90 transition shadow-xl">
                  Get started free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-2xl border border-white/20 text-white hover:bg-white/10 transition">
                  Talk to sales
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════════════════════════
function Footer() {
  const [email, setEmail] = useState("");
  const handleSubscribe = async () => {
  if (!email) return;
  const { supabase } = await import('./supabase');
  const { error } = await supabase
    .from('Newsletter')
    .insert([{ Email: email }]);
  if (error) {
    alert('Something went wrong!');
  } else {
    alert('Subscribed successfully! ✅');
    setEmail('');
  }
};
  const cols = [
    { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap", "Status"] },
    { heading: "Company", links: ["About", "Blog", "Careers", "Press", "Partners"] },
    { heading: "Legal", links: ["Privacy", "Terms", "Security", "Cookies", "GDPR"] },
  ];
  return (
    <footer id="contact" className="bg-slate-900 dark:bg-slate-950 text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-indigo-500 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              Nexus<span className="text-emerald-400">AI</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              The intelligent workspace for modern teams. Built on AI, designed for humans.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
                <button 
                  onClick={handleSubscribe}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors flex-shrink-0">
                  Subscribe
          </button>
              
            </div>
          </div>

          {/* Link cols */}
          {cols.map(c => (
            <div key={c.heading}>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">{c.heading}</div>
              <ul className="flex flex-col gap-2.5">
                {c.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <p className="text-xs">© 2026 NexusAI Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[ExternalLink, ExternalLink, Mail].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-white transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      alert("Please fill all fields!");
      return;
    }
    const { supabase } = await import('./supabase');
    const { error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);
    if (error) {
      alert('Something went wrong!');
    } else {
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <section id="contact" className="py-28 bg-white dark:bg-slate-900">
      <div className="max-w-2xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700 mb-4">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Get In Touch With Us
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Have any questions? We're here to help!
          </p>
        </Reveal>
        {sent ? (
          <div className="text-center p-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-3xl border border-emerald-200 dark:border-emerald-700">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-slate-500">We'll get back to you soon!</p>
            <button onClick={() => setSent(false)}
              className="mt-4 px-6 py-2 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition">
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Your message..." rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors resize-none" />
              </div>
              <button onClick={handleSubmit}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-500 text-white font-semibold text-base hover:opacity-90 transition shadow-lg">
                Send Message 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Logging in with Email: ${email}, Password: ${password}`);
    } else {
      alert(`Signing up with Name: ${name}, Email: ${email}, Password: ${password}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a1a2f] to-[#1c2b40]">
      <div className="bg-gray-900 shadow-xl rounded-md p-8 w-[420px]">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center tracking-wide">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}














// ════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [dark, setDark] = useDarkMode();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased">
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <TrustedBy />
      <Features />
      <DashboardShowcase />
      <Benefits />
      <AnalyticsSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <ContactForm />
      <CTABanner />
      <AuthPage/>
      <Footer />
    </div>
  );
}
