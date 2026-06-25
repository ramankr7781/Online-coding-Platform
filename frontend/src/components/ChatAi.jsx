import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send } from 'lucide-react';
import MarkdownRenderer from "./MarkdownRenderer";

function ChatAi({problem}) {
    const [messages, setMessages] = useState([]);

    const { register, handleSubmit, reset,formState: {errors} } = useForm();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSubmit = async (data) => {
        
        const newMessage = { role: 'user', parts:[{text: data.message}] };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        reset();

        try {
            
            const response = await axiosClient.post("/ai/chat", {
                messages: updatedMessages.filter(m => !m.isError),
                title:problem.title,
                description:problem.description,
                testCases: problem.visibleTestCases,
                startCode:problem.startCode
            });

           
            setMessages(prev => [...prev, { 
                role: 'model', 
                parts:[{text: response.data.message}] 
            }]);
        } catch (error) {
            console.error("API Error:", error);
            const errorMessage = error.response?.data?.message || "Error from AI Chatbot. Please wait a moment and try again.";
            setMessages(prev => [...prev, { 
                role: 'model', 
                parts:[{text: errorMessage}],
                isError: true
            }]);
        }
    };

    return (
        <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex mb-6 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                            msg.role === "user" 
                                ? "bg-indigo-600 text-white shadow-md rounded-br-none" 
                                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm rounded-bl-none"
                        }`}>
                            {msg.role === "user" ? (
                                <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
                            ) : (
                                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed">
                                    <MarkdownRenderer content={msg.parts[0].text} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="sticky bottom-0 p-4 bg-base-100 border-t"
            >
                <div className="flex items-center">
                    <input 
                        placeholder="Ask me anything" 
                        className="input input-bordered flex-1" 
                        {...register("message", { required: true, minLength: 2 })}
                    />
                    <button 
                        type="submit" 
                        className="btn btn-ghost ml-2"
                        disabled={errors.message}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatAi;