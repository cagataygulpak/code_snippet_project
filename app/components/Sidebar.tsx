"use client";

import { useState, useEffect, useRef } from "react";
import allLanguagesData from "../data/languages.json";
import { useSnippets } from "../context/SnippetContext";

export default function Sidebar() {
    const { languages, activeLanguage, setActiveLanguage, addLanguage, removeLanguage } = useSnippets();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const availableLanguages = [...allLanguagesData].sort().filter(lang => !languages.includes(lang));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        if (isDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownOpen]);

    return (
        <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shadow-xl z-10">
            <div className="p-6 border-b border-slate-700/50">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                    <span className="text-indigo-500">{"{ }"}</span> DevArchive
                </h1>
            </div>

            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                <ul className="space-y-1">
                    <li
                        onClick={() => setActiveLanguage("Tümü")}
                        className={`px-3 py-2 rounded-lg cursor-pointer transition font-medium ${activeLanguage === "Tümü" ? "bg-indigo-600 text-white" : "hover:bg-slate-800/50"}`}
                    >
                        Tüm Kodlar
                    </li>

                    {languages.map((lang) => (
                        <li
                            key={lang}
                            onClick={() => setActiveLanguage(lang)}
                            className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer transition group ${activeLanguage === lang ? "bg-indigo-600 text-white" : "hover:bg-slate-800/50"}`}
                        >
                            <span className="truncate text-sm">{lang}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeLanguage(lang);
                                }}
                                className={`text-slate-400 hover:text-red-400 font-bold px-2 rounded transition-opacity ${activeLanguage === lang ? "text-indigo-200 hover:text-white" : "opacity-0 group-hover:opacity-100"}`}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4 border-t border-slate-700/50 bg-slate-800/30 relative" ref={dropdownRef}>
                {isDropdownOpen && (
                    <div className="absolute bottom-18 left-4 right-4 bg-slate-800 border border-slate-600 rounded-lg shadow-2xl overflow-hidden z-50 flex flex-col">
                        <div className="bg-slate-900 px-3 py-2 text-xs font-bold text-slate-400 border-b border-slate-700 uppercase">
                            Bir Dil Seçin
                        </div>
                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                            {availableLanguages.map((lang) => (
                                <div
                                    key={lang}
                                    onClick={() => {
                                        addLanguage(lang);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="px-3 py-2 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white cursor-pointer transition"
                                >
                                    {lang}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex justify-between items-center bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg px-4 py-2.5 outline-none transition shadow-sm border border-slate-700/50"
                >
                    <span className="font-semibold">+ Dil Ekle</span>
                    <span>{isDropdownOpen ? "▼" : "▲"}</span>
                </button>
            </div>
        </div>
    );
}