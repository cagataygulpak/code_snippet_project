import { useSnippets } from "../context/SnippetContext";

export default function SnippetList() {
    const { snippets, activeLanguage, activeSnippet, setActiveSnippet, setIsCreating } = useSnippets();
    const filteredSnippets = activeLanguage === "Tümü"
        ? snippets
        : snippets.filter(s => s.language === activeLanguage);

    return (
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full shadow-inner">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="font-bold text-slate-700 uppercase text-xs tracking-widest">Kod Listesi</h2>
                <button
                    onClick={() => {
                        setActiveSnippet(null);
                        setIsCreating(true);
                    }}
                    className="group relative flex items-center justify-center gap-2  bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] transition-all duration-300 ase-in-out active:scale-95 cursor-pointer overflow-hidden"
                >
                    {/* Parlama Efekti (Hover'da üzerinden geçer) */}
                    <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    {/* İkon */}
                    <span className="text-lg group-hover:rotate-90 transition-transform duration-300">+</span>
                    <span>Kod Ekle</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredSnippets.length === 0 ? (
                    <div className="p-10 text-center text-slate-400 text-sm italic">Henüz kod yok...</div>
                ) : (
                    filteredSnippets.map((snippet) => (
                        <div
                            key={snippet.id}
                            onClick={() => {
                                setActiveSnippet(snippet);
                                setIsCreating(false);
                            }}
                            className={`p-4 border-b border-slate-50 cursor-pointer transition hover:bg-indigo-50/30 ${activeSnippet?.id === snippet.id ? "bg-indigo-50 border-l-4 border-l-indigo-600" : ""}`}
                        >
                            <h3 className="font-bold text-slate-800 truncate text-sm mb-1">{snippet.title}</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-semibold uppercase">{snippet.language}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}