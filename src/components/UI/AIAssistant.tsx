"use client";

import { useState, useRef, useEffect } from "react";
import { useGameState } from "@/store/gameStore";
import { X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const AI_RESPONSES: Record<string, string> = {
  who: "I am CYBERVERSE AI, a quantum-enhanced neural assistant designed to help you navigate the Cyber Defense Metropolis. Built using cutting-edge AI architecture.",
  about: "Aditya is a Cybersecurity Engineer & Full-Stack Developer passionate about building secure systems. Expertise spans from malware analysis to full-stack web development. Currently leading cybersecurity research initiatives.",
  projects:
    "Key Projects:\n\n1. **Android Malware Detector** - ML-powered detection system analyzing Android APKs using deep learning. Achieves 97.8% accuracy.\n\n2. **NetSentinel** - Network intrusion detection system using anomaly detection algorithms. Processes 10M+ packets/sec.\n\n3. **CYBERVERSE** - This very website. An immersive 3D cybersecurity experience.",
  networking:
    "Networking is the foundation of cybersecurity. Key concepts:\n\n• TCP/IP Protocol Stack\n• DNS Security (DNSSEC)\n• Network Segmentation\n• Zero Trust Architecture\n• VPN & Tunneling\n• Firewall Rule Management\n• IDS/IPS Systems\n\nWant me to deep-dive into any of these?",
  github: "Opening GitHub profile... Aditya's repositories include cybersecurity tools, Android apps, and web applications. Contributions to open-source security projects.",
  linkedin: "Opening LinkedIn profile... Connect with Aditya for cybersecurity insights, project collaborations, and professional networking.",
  malwaredetector:
    "Android Malware Detector uses a Convolutional Neural Network trained on 50,000+ Android applications. It analyzes:\n\n• Permission patterns\n• API call sequences\n• Network behavior\n• Code obfuscation levels\n\nAccuracy: 97.8% | False Positive Rate: 1.2%",
  netsentinel:
    "NetSentinel is a next-gen Network Intrusion Detection System that:\n\n• Monitors network traffic in real-time\n• Uses ML anomaly detection\n• Classifies attacks (DDoS, MITM, XSS, SQLi)\n• Provides automated response\n• Generates detailed threat reports\n\nProcessing speed: 10M packets/second",
  default:
    "I can help you with information about Aditya, cybersecurity concepts, projects, and more. Try asking about:\n\n• About Aditya\n• Projects\n• Networking\n• Android Malware Detector\n• NetSentinel",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("who") || lower.includes("what") || lower.includes("built")) return AI_RESPONSES.who;
  if (lower.includes("about") || lower.includes("aditya")) return AI_RESPONSES.about;
  if (lower.includes("project")) return AI_RESPONSES.projects;
  if (lower.includes("network") || lower.includes("tcp") || lower.includes("dns")) return AI_RESPONSES.networking;
  if (lower.includes("github")) return AI_RESPONSES.github;
  if (lower.includes("linkedin")) return AI_RESPONSES.linkedin;
  if (lower.includes("malware") || lower.includes("detector") || lower.includes("android")) return AI_RESPONSES.malwaredetector;
  if (lower.includes("netsentinel") || lower.includes("sentinel")) return AI_RESPONSES.netsentinel;
  return AI_RESPONSES.default;
}

export default function AIAssistant() {
  const { showAI, setShowAI } = useGameState();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Welcome, Commander. I am the CYBERVERSE AI. How may I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(input);
      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  if (!showAI) return null;

  return (
    <div className="fixed right-4 bottom-20 w-[360px] md:w-[400px] h-[500px] pointer-events-auto z-50 flex flex-col">
      <div className="glass-panel h-full flex flex-col relative corner-accent overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#00ff8822]">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-[#00d4ff]" />
            <span
              className="text-xs text-[#00d4ff] tracking-[0.2em] font-bold"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              AI ASSISTANT
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse-glow" />
          </div>
          <button
            onClick={() => setShowAI(false)}
            className="text-[#ffffff44] hover:text-[#ff0044] transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-6 h-6 rounded border border-[#00d4ff44] flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={10} className="text-[#00d4ff]" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-[#00ff8815] border border-[#00ff8822] text-[#00ff88]"
                    : "bg-[#00d4ff08] border border-[#00d4ff15] text-[#cccccc]"
                }`}
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-6 h-6 rounded border border-[#00ff8844] flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={10} className="text-[#00ff88]" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-[10px] text-[#00d4ff66]">
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1 h-1 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1 h-1 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              Processing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-[#00ff8822]">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask the AI anything..."
              className="flex-1 bg-[#0a0a1a] border border-[#00ff8822] px-3 py-2 text-[11px] text-[#00ff88] placeholder:text-[#00ff8844] focus:outline-none focus:border-[#00ff8866] transition-colors"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            />
            <button
              onClick={handleSend}
              className="px-3 py-2 border border-[#00ff8844] text-[#00ff88] hover:bg-[#00ff8815] transition-colors cursor-pointer"
            >
              <Send size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
