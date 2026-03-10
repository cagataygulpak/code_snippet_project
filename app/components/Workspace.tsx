"use client";
import { useState } from "react";
import { useSnippets } from "../context/SnippetContext";

export default function Workspace() {
    const { languages, activeSnippet, isCreating, addSnippet, setActiveSnippet, setIsCreating, setModalConfig } = useSnippets();
    const [formData, setFormData] = useState({
        title: activeSnippet ? activeSnippet.title : "",
        language: activeSnippet ? activeSnippet.language : (languages.length > 0 ? languages[0] : ""),
        code: activeSnippet ? activeSnippet.code : "",
    });

    const hasChanges = isCreating ? true : (
        activeSnippet && (
            formData.title !== activeSnippet.title ||
            formData.language !== activeSnippet.language ||
            formData.code !== activeSnippet.code
        )
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isCreating) {
            addSnippet({
                title: formData.title,
                language: formData.language,
                code: formData.code,
                tags: []
            });
        } else if (activeSnippet) {
            setModalConfig({
                isOpen: true,
                type: "update",
                data: { ...activeSnippet, ...formData }
            });
        }
    };

    if (!activeSnippet && !isCreating) {
        return (
            <div className="flex-1 bg-slate-100/50 flex items-center justify-center p-6 text-center">
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
                    <div className="text-indigo-500 text-5xl mb-4">{"</>"}</div>
                    <h2 className="text-xl font-bold text-slate-700">Çalışma Alanı</h2>
                    <p className="text-slate-500">Görüntülemek için soldan bir kod seçin veya yeni ekleyin.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white p-8 overflow-y-auto custom-scrollbar">
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-extrabold text-slate-800">
                        {isCreating ? "Yeni Kod Parçacığı" : "Kodu Düzenle"}
                    </h2>
                    {!isCreating && activeSnippet && (
                        <button
                            type="button"
                            onClick={() => setModalConfig({
                                isOpen: true,
                                type: "delete",
                                data: activeSnippet.id
                            })}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-semibold transition cursor-pointer"
                        >
                            Kodu Sil
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Başlık</label>
                        <input
                            type="text" required
                            className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-indigo-500 outline-none transition"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Dil</label>
                        <select
                            className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-indigo-500 outline-none transition bg-white"
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        >
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Kod İçeriği</label>
                    <textarea
                        required rows={15} spellCheck={false}
                        className="w-full border-2 border-slate-200 rounded-xl p-4 font-mono text-sm bg-slate-900 text-green-400 focus:border-indigo-500 outline-none transition shadow-inner resize-none"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={() => { setIsCreating(false); setActiveSnippet(null); }}
                        className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition cursor-pointer"
                    >
                        İptal
                    </button>
                    <button
                        type="submit"
                        disabled={!hasChanges}
                        className={`px-6 py-2.5 font-bold rounded-xl shadow-md transition ${hasChanges
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 cursor-pointer"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                            }`}
                    >
                        {isCreating ? "Kaydet" : "Güncelle"}
                    </button>
                </div>
            </form>
        </div>
    );
}
