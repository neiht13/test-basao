"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            <div className={cn(
                "absolute bottom-20 right-0 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-500 transform origin-bottom-right",
                isOpen
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-90 opacity-0 translate-y-4 pointer-events-none"
            )}>
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 hover:rotate-90 flex items-center justify-center transition-all duration-300"
                >
                    <X size={16} className="text-slate-600" />
                </button>

                {/* Iframe Container - Full size */}
                <div className="w-full h-full">
                    {isOpen && (
                        <iframe
                            src="https://ai.dongthap.gov.vn/chat-frame/985cbd9b-96bb-41b9-8caf-fa31393ca31b/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmVjM2JlZDUtMmMxNi00N2VkLWE1MjItNWUzYmE2MDM1M2U1IiwicGVybWlzc2lvbnMiOlsiRVhQRVJJRU5DRV9NQU5BR0VSIiwiRklMRV9NQU5BR0VSIiwiUE9TSVRJT05fTUFOQUdFUiIsIlNZU1RFTV9NQU5BR0VSIiwiVVNFUl9NQU5BR0VSIiwiQk9UX01BTkFHRVIiXSwiZXhwIjoxMjcxODAyNjM1Nzh9.9qElPdiVX2j-qNMFius0bpLkw-Qt13PdzFl6Y4SJN1o"
                            id="chatbot-frame"
                            allow="microphone"
                            frameBorder="0"
                            className="w-full h-full"
                        />
                    )}
                </div>
            </div>

            {/* Toggle Button with Tooltip */}
            <div className="relative group">
                {/* Tooltip - Left side, always visible with bounce animation */}
                <div className={cn(
                    "absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-2 bg-slate-700 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none shadow-lg transition-all duration-300",
                    isOpen ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0 animate-bounce-subtle"
                )}>
                    Trợ lý tra cứu TTHC
                    <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-slate-700"></div>
                </div>

                {/* Pulse Ring Effect */}
                {!isOpen && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></span>
                        <span className="absolute inset-[-4px] rounded-full bg-primary/20 animate-pulse"></span>
                    </>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-500",
                        isOpen
                            ? "bg-slate-600 hover:bg-slate-700 rotate-0"
                            : "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 hover:scale-110 hover:shadow-xl hover:shadow-primary/25"
                    )}
                >
                    <div className={cn(
                        "transition-all duration-500",
                        isOpen ? "rotate-0" : "animate-wiggle"
                    )}>
                        {isOpen ? (
                            <X size={24} className="text-white" />
                        ) : (
                            <Bot size={24} className="text-white" />
                        )}
                    </div>
                </button>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes bounce-subtle {
                    0%, 100% {
                        transform: translateY(-50%) translateX(0);
                    }
                    50% {
                        transform: translateY(-50%) translateX(-3px);
                    }
                }
                @keyframes wiggle {
                    0%, 100% {
                        transform: rotate(0deg);
                    }
                    25% {
                        transform: rotate(-5deg);
                    }
                    75% {
                        transform: rotate(5deg);
                    }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s ease-in-out infinite;
                }
                .animate-wiggle {
                    animation: wiggle 1s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
