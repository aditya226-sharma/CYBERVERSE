"use client";

import { useGameState } from "@/store/gameStore";
import { BUILDINGS } from "@/utils/constants";
import { X, ChevronUp, ChevronDown, ExternalLink, Mail, Globe, Code } from "lucide-react";

const PORTFOLIO_BUILDING = BUILDINGS.find((b) => b.id === "portfolio")!;

const SKILLS = [
  { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "C/C++", "Bash", "SQL"] },
  { category: "Frameworks", items: ["React", "Next.js", "Node.js", "Express", "Three.js", "Django"] },
  { category: "Cybersecurity", items: ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "Nmap", "Ghidra"] },
  { category: "Tools", items: ["Docker", "Git", "AWS", "Linux", "Prisma", "PostgreSQL"] },
];

const PROJECTS = [
  {
    name: "Android Malware Detector",
    desc: "ML-powered malware detection for Android devices using deep learning. Analyzes permissions, API calls, and code patterns.",
    tech: ["Python", "TensorFlow", "Android", "Keras"],
    metrics: "97.8% Accuracy",
  },
  {
    name: "NetSentinel",
    desc: "Network intrusion detection system using anomaly detection algorithms. Real-time traffic analysis and threat classification.",
    tech: ["Python", "Scikit-learn", "Pandas", "Socket"],
    metrics: "10M+ packets/sec",
  },
  {
    name: "CYBERVERSE",
    desc: "The world's first interactive 3D cybersecurity metropolis. Immersive Three.js experience with real-time threat visualization.",
    tech: ["Three.js", "React", "TypeScript", "Next.js"],
    metrics: "60 FPS",
  },
];

export default function PortfolioTower() {
  const { activeBuilding, setActiveBuilding, activeFloor, setActiveFloor } = useGameState();

  if (activeBuilding !== "portfolio") return null;

  const maxFloor = PORTFOLIO_BUILDING.floors.length - 1;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-auto">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => { setActiveBuilding(null); setActiveFloor(0); }}
      />

      <div className="relative w-[95vw] max-w-4xl h-[85vh] glass-panel corner-accent overflow-hidden flex">
        {/* Elevator shaft */}
        <div className="w-16 border-r border-[#00d4ff22] flex flex-col items-center py-4 gap-1">
          <button
            onClick={() => activeFloor < maxFloor && setActiveFloor(activeFloor + 1)}
            className="text-[#00d4ff66] hover:text-[#00d4ff] cursor-pointer disabled:opacity-20"
            disabled={activeFloor >= maxFloor}
          >
            <ChevronUp size={18} />
          </button>
          {PORTFOLIO_BUILDING.floors.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveFloor(i)}
              className={`w-12 h-7 text-[8px] border transition-all duration-500 cursor-pointer flex items-center justify-center ${
                i === activeFloor
                  ? "border-[#00d4ff] bg-[#00d4ff11] text-[#00d4ff]"
                  : "border-[#ffffff11] text-[#ffffff33] hover:border-[#00d4ff44]"
              }`}
              style={{
                fontFamily: "Orbitron, monospace",
                boxShadow: i === activeFloor ? "0 0 15px rgba(0,212,255,0.15)" : "none",
              }}
            >
              F{i + 1}
            </button>
          ))}
          <button
            onClick={() => activeFloor > 0 && setActiveFloor(activeFloor - 1)}
            className="text-[#00d4ff66] hover:text-[#00d4ff] cursor-pointer disabled:opacity-20"
            disabled={activeFloor <= 0}
          >
            <ChevronDown size={18} />
          </button>

          {/* Floor indicator */}
          <div className="mt-2 text-center">
            <div
              className="text-[10px] text-[#00d4ff] font-bold"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              {activeFloor + 1}
            </div>
            <div className="text-[7px] text-[#ffffff22]">/{maxFloor + 1}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#00d4ff22]">
            <div>
              <h2
                className="text-lg font-bold tracking-[0.15em] text-[#00d4ff]"
                style={{ fontFamily: "Orbitron, monospace", textShadow: "0 0 20px rgba(0,212,255,0.3)" }}
              >
                {PORTFOLIO_BUILDING.floors[activeFloor].title}
              </h2>
              <p className="text-[9px] text-[#ffffff33] tracking-wider">
                FLOOR {activeFloor + 1} • PORTFOLIO TOWER
              </p>
            </div>
            <button
              onClick={() => { setActiveBuilding(null); setActiveFloor(0); }}
              className="text-[#ffffff44] hover:text-[#ff0044] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Floor content */}
          <div className="flex-1 overflow-y-auto p-6">
            <FloorContent floor={activeFloor} />
          </div>

          {/* Bottom bar */}
          <div className="px-6 py-2 border-t border-[#00d4ff11] flex items-center justify-between text-[8px] text-[#ffffff22]">
            <span>CLEARANCE: AUTHORIZED</span>
            <span>PORTFOLIO TOWER // SECURE ACCESS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloorContent({ floor }: { floor: number }) {
  switch (floor) {
    case 0:
      return <AboutFloor />;
    case 1:
      return <SkillsFloor />;
    case 2:
      return <ProjectsFloor />;
    case 3:
      return <ExperienceFloor />;
    case 4:
      return <EducationFloor />;
    case 5:
      return <AchievementsFloor />;
    case 6:
      return <ResumeFloor />;
    case 7:
      return <ContactFloor />;
    default:
      return null;
  }
}

function AboutFloor() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        {/* Avatar placeholder */}
        <div className="w-24 h-24 border-2 border-[#00d4ff44] flex items-center justify-center flex-shrink-0 relative">
          <div className="text-3xl font-bold text-[#00d4ff]" style={{ fontFamily: "Orbitron, monospace" }}>
            A
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00ff88] rounded-full animate-pulse-glow" />
        </div>
        <div>
          <h3
            className="text-xl font-bold text-white tracking-wider"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            ADITYA SHARMA
          </h3>
          <p className="text-[#00d4ff] text-xs tracking-[0.2em] mt-1">
            CYBERSECURITY ENGINEER & FULL-STACK DEVELOPER
          </p>
          <p className="text-[#ffffff66] text-[11px] leading-relaxed mt-3">
            Passionate about building secure systems and fighting cybercrime. With expertise spanning from malware analysis to full-stack web development, I create tools that protect the digital world. Currently focused on AI-powered threat detection and immersive cybersecurity experiences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "PROJECTS", value: "15+" },
          { label: "CTF WINS", value: "8" },
          { label: "BUG BOUNTIES", value: "12" },
          { label: "EXPERIENCE", value: "3+ YRS" },
        ].map((stat) => (
          <div key={stat.label} className="p-3 border border-[#00d4ff22] text-center">
            <div className="text-lg font-bold text-[#00d4ff]" style={{ fontFamily: "Orbitron, monospace" }}>
              {stat.value}
            </div>
            <div className="text-[8px] text-[#ffffff44] tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsFloor() {
  return (
    <div className="space-y-6">
      {SKILLS.map((group) => (
        <div key={group.category}>
          <h4 className="text-[10px] text-[#00d4ff] tracking-[0.2em] mb-3 font-bold">
            {group.category.toUpperCase()}
          </h4>
          <div className="flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <div
                key={skill}
                className="px-3 py-1.5 border border-[#00d4ff22] text-[11px] text-[#cccccc] hover:border-[#00d4ff66] hover:bg-[#00d4ff08] transition-all duration-300 cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsFloor() {
  return (
    <div className="space-y-4">
      {PROJECTS.map((project, i) => (
        <div
          key={i}
          className="p-4 border border-[#00d4ff15] hover:border-[#00d4ff33] transition-all duration-300 group"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-bold text-white tracking-wider group-hover:text-[#00d4ff] transition-colors">
                {project.name}
              </h4>
              <p className="text-[10px] text-[#ffffff55] mt-1 leading-relaxed">
                {project.desc}
              </p>
            </div>
            <span className="text-[9px] text-[#00ff88] px-2 py-0.5 border border-[#00ff8833] flex-shrink-0 ml-4">
              {project.metrics}
            </span>
          </div>
          <div className="flex gap-2 mt-3">
            {project.tech.map((t) => (
              <span key={t} className="text-[8px] text-[#00d4ff88] px-1.5 py-0.5 bg-[#00d4ff08]">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceFloor() {
  const experiences = [
    {
      role: "Cybersecurity Analyst Intern",
      company: "TechCorp Security Division",
      period: "2023 - Present",
      desc: "Conducting penetration testing, vulnerability assessments, and security audits for enterprise clients. Developed automated scanning tools.",
    },
    {
      role: "CTF Team Lead",
      company: "Cyber Warriors",
      period: "2022 - Present",
      desc: "Leading a team of 8 security researchers in national CTF competitions. Specialized in binary exploitation and reverse engineering.",
    },
    {
      role: "Bug Bounty Hunter",
      company: "HackerOne / Bugcrowd",
      period: "2022 - Present",
      desc: "Discovered 12+ vulnerabilities in major platforms. Focus areas: authentication bypass, SSRF, and access control flaws.",
    },
  ];
  return (
    <div className="space-y-4">
      {experiences.map((exp, i) => (
        <div key={i} className="p-4 border border-[#00d4ff15] relative">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#00d4ff44]" />
          <div className="pl-3">
            <h4 className="text-sm font-bold text-white">{exp.role}</h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] text-[#00d4ff]">{exp.company}</span>
              <span className="text-[8px] text-[#ffffff33]">{exp.period}</span>
            </div>
            <p className="text-[10px] text-[#ffffff55] mt-2 leading-relaxed">{exp.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationFloor() {
  return (
    <div className="space-y-4">
      <div className="p-4 border border-[#00d4ff15]">
        <h4 className="text-sm font-bold text-white">B.Tech in Computer Science</h4>
        <p className="text-[10px] text-[#00d4ff] mt-1">Specialization in Cybersecurity</p>
        <p className="text-[9px] text-[#ffffff33] mt-1">2021 - 2025</p>
        <div className="mt-3 space-y-1">
          {["Network Security", "Cryptography", "Malware Analysis", "Digital Forensics", "Ethical Hacking"].map((course) => (
            <div key={course} className="text-[9px] text-[#ffffff55] pl-2 border-l border-[#00d4ff22]">
              {course}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AchievementsFloor() {
  const achievements = [
    "Top 1% on TryHackMe",
    "DEF CON 31 Qualifier",
    "Published Research on Android Malware Analysis",
    "National CTF Champion 2023",
    "Google Bug Bounty Recognition",
    "AWS Certified Security Specialty",
    "OSCP Certified",
  ];
  return (
    <div className="space-y-2">
      {achievements.map((a, i) => (
        <div key={i} className="flex items-center gap-3 p-2 border border-[#00d4ff11] hover:border-[#00d4ff33] transition-colors">
          <div className="w-5 h-5 border border-[#00d4ff44] flex items-center justify-center text-[8px] text-[#00d4ff]" style={{ fontFamily: "Orbitron, monospace" }}>
            {i + 1}
          </div>
          <span className="text-[11px] text-[#cccccc]">{a}</span>
        </div>
      ))}
    </div>
  );
}

function ResumeFloor() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4" style={{ fontFamily: "Orbitron, monospace" }}>
          <span className="text-[#00d4ff]">CV</span>
        </div>
        <p className="text-xs text-[#ffffff55]">Download or view the complete resume</p>
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 border border-[#00d4ff44] text-[#00d4ff] text-[10px] tracking-wider hover:bg-[#00d4ff11] transition-colors cursor-pointer">
          DOWNLOAD PDF
        </button>
        <button className="px-4 py-2 border border-[#00ff8844] text-[#00ff88] text-[10px] tracking-wider hover:bg-[#00ff8811] transition-colors cursor-pointer">
          VIEW ONLINE
        </button>
      </div>
    </div>
  );
}

function ContactFloor() {
  return (
    <div className="space-y-6">
      <p className="text-xs text-[#ffffff55] text-center">
        Ready to collaborate on cybersecurity projects? Let&apos;s connect.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Code, label: "GITHUB", value: "github.com/aditya", color: "#ffffff" },
          { icon: Globe, label: "LINKEDIN", value: "linkedin.com/in/aditya", color: "#0077B5" },
          { icon: Mail, label: "EMAIL", value: "aditya@cybverse.io", color: "#00ff88" },
        ].map((contact) => (
          <a
            key={contact.label}
            href="#"
            className="p-4 border border-[#00d4ff15] flex flex-col items-center gap-2 hover:border-[#00d4ff44] transition-colors group"
          >
            <contact.icon size={20} style={{ color: contact.color }} className="group-hover:scale-110 transition-transform" />
            <span className="text-[9px] tracking-wider" style={{ color: contact.color }}>
              {contact.label}
            </span>
            <span className="text-[9px] text-[#ffffff44]">{contact.value}</span>
            <ExternalLink size={8} className="text-[#ffffff22]" />
          </a>
        ))}
      </div>
    </div>
  );
}
