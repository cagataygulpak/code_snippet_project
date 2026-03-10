"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Snippet } from "../types";
import allLanguagesData from "../data/languages.json";
import { toast } from "react-toastify";

interface ModalConfig {
    isOpen: boolean;
    type: "update" | "delete" | "";
    data: Snippet | string | null;
}

interface SnippetContextType {
    snippets: Snippet[];
    languages: string[];
    activeLanguage: string;
    activeSnippet: Snippet | null;
    isCreating: boolean;
    setActiveLanguage: (lang: string) => void;
    setActiveSnippet: (snippet: Snippet | null) => void;
    setIsCreating: (val: boolean) => void;
    addLanguage: (lang: string) => void;
    removeLanguage: (lang: string) => void;
    addSnippet: (data: Omit<Snippet, "id" | "createdAt">) => void;
    updateSnippet: (data: Snippet) => void;
    deleteSnippet: (id: string) => void;
    modalConfig: ModalConfig;
    setModalConfig: (config: ModalConfig) => void;
}

const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

export function SnippetProvider({ children }: { children: React.ReactNode }) {
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [activeLanguage, setActiveLanguage] = useState("Tümü");
    const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [modalConfig, setModalConfig] = useState<ModalConfig>({
        isOpen: false,
        type: "",
        data: null
    });

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const localSnippets = localStorage.getItem("snippets");
        if (localSnippets) setSnippets(JSON.parse(localSnippets));

        const localLangs = localStorage.getItem("languages");
        if (localLangs) {
            setLanguages(JSON.parse(localLangs));
        } else {
            const initial = allLanguagesData.slice(0, 5);
            setLanguages(initial);
            localStorage.setItem("languages", JSON.stringify(initial));
        }

        setIsMounted(true);
    }, []);

    const saveToLocal = (newSnippets: Snippet[]) => {
        setSnippets(newSnippets);
        localStorage.setItem("snippets", JSON.stringify(newSnippets));
    };

    const addSnippet = (data: Omit<Snippet, "id" | "createdAt">) => {
        const newSnippet = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
        const updated = [newSnippet, ...snippets];
        saveToLocal(updated);
        setIsCreating(false);
        toast.success("Yeni kod başarıyla eklendi!");
    };

    const updateSnippet = (data: Snippet) => {
        const updated = snippets.map(s => s.id === data.id ? data : s);
        saveToLocal(updated);
        setActiveSnippet(null);
        toast.info("Kod başarıyla güncellendi!");
    };

    const deleteSnippet = (id: string) => {
        const updated = snippets.filter(s => s.id !== id);
        saveToLocal(updated);
        setActiveSnippet(null);
        toast.error("Kod silindi!");
    };

    const addLanguage = (lang: string) => {
        if (languages.includes(lang)) return toast.warning("Bu dil zaten listenizde!");
        const updated = [...languages, lang];
        setLanguages(updated);
        localStorage.setItem("languages", JSON.stringify(updated));
        toast.success(`"${lang}" başarıyla eklendi.`);
    };

    const removeLanguage = (lang: string) => {
        if (snippets.some(s => s.language === lang)) {
            toast.warning(`"${lang}" dilinde kodlarınız var! Önce onları silin.`);
            return;
        }
        const updated = languages.filter(l => l !== lang);
        setLanguages(updated);
        localStorage.setItem("languages", JSON.stringify(updated));
        if (activeLanguage === lang) setActiveLanguage("Tümü");
        toast.error(`"${lang}" listeden kaldırıldı.`);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <SnippetContext.Provider value={{
            snippets, languages, activeLanguage, activeSnippet, isCreating,
            setActiveLanguage, setActiveSnippet, setIsCreating,
            addLanguage, removeLanguage, addSnippet, updateSnippet, deleteSnippet,
            modalConfig, setModalConfig
        }}>
            {children}
        </SnippetContext.Provider>
    );
}

export const useSnippets = () => {
    const context = useContext(SnippetContext);
    if (!context) throw new Error("useSnippets Provider içinde kullanılmalıdır!");
    return context;
};
