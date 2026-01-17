"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, Bot, User } from "lucide-react";

interface Message {
    role: "user" | "agent";
    text: string;
}

interface FloatingChatProps {
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
    initialQuery?: string;
}

export function FloatingChat({ onSendMessage, isLoading = false, initialQuery }: FloatingChatProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize chat with the user's first search query
    useEffect(() => {
        if (initialQuery && messages.length === 0) {
            setMessages([
                { role: "user", text: initialQuery },
                { role: "agent", text: "Based on your request, we've found these items. Need help refining your search? Just ask!" }
            ]);
        }
    }, [initialQuery, messages.length]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            const userMessage = message.trim();
            setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
            setMessage("");

            // Trigger search
            onSendMessage(userMessage);

            // Simulate agent response (will be replaced with Gemini API)
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { role: "agent", text: "Got it! I'm updating the results based on your preferences..." }
                ]);
            }, 1000);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 glow-primary shadow-2xl flex items-center justify-center transition-all"
                    >
                        <MessageCircle className="h-6 w-6 text-primary-foreground" />
                        {/* Notification dot for new messages */}
                        {messages.length > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent animate-pulse" />
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 glass-card rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-primary/20">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                                <span className="font-medium text-white">Trovato Assistant</span>
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="h-72 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 ? (
                                <div className="text-center text-muted-foreground text-sm py-4">
                                    Your conversation will appear here
                                </div>
                            ) : (
                                messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        {/* Avatar */}
                                        <div className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center ${msg.role === "user"
                                                ? "bg-accent/20"
                                                : "bg-primary/20"
                                            }`}>
                                            {msg.role === "user" ? (
                                                <User className="h-4 w-4 text-accent" />
                                            ) : (
                                                <Bot className="h-4 w-4 text-primary" />
                                            )}
                                        </div>

                                        {/* Message bubble */}
                                        <div
                                            className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${msg.role === "user"
                                                    ? "bg-accent text-white rounded-br-md"
                                                    : "glass rounded-bl-md text-white"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Refine your search..."
                                    className="flex-1 h-10 px-4 rounded-full glass-input text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!message.trim() || isLoading}
                                    className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
