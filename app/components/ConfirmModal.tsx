"use client";
import { useSnippets } from "../context/SnippetContext";
import { Snippet } from "../types";

export default function ConfirmModal() {
    const { modalConfig, setModalConfig, deleteSnippet, updateSnippet } = useSnippets();

    if (!modalConfig.isOpen) return null;

    const handleConfirm = () => {
        if (modalConfig.type === "delete") {
            deleteSnippet(modalConfig.data as string); 
        } else if (modalConfig.type === "update") {
            updateSnippet(modalConfig.data as Snippet); 
        }
        setModalConfig({ isOpen: false, type: "", data: null });
    };

    const handleCancel = () => {
        setModalConfig({ isOpen: false, type: "", data: null });
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
                <div className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${modalConfig.type === "delete" ? "bg-red-100 text-red-600" : "bg-indigo-100 text-indigo-600"}`}>
                        <span className="text-2xl font-bold">{modalConfig.type === "delete" ? "!" : "?"}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {modalConfig.type === "delete" ? "Kodu Sil" : "Değişiklikleri Kaydet"}
                    </h3>
                    <p className="text-slate-500 text-sm">
                        {modalConfig.type === "delete"
                            ? "Bu kodu silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                            : "Yaptığınız değişiklikleri kaydetmek istiyor musunuz?"}
                    </p>
                </div>

                <div className="flex border-t border-slate-100">
                    <button
                        onClick={handleCancel}
                        className="flex-1 px-4 py-4 text-slate-600 font-bold hover:bg-slate-50 transition border-r border-slate-100 cursor-pointer"
                    >
                        Vazgeç
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`flex-1 px-4 py-4 font-bold text-white transition cursor-pointer ${modalConfig.type === "delete" ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
                    >
                        {modalConfig.type === "delete" ? "Sil" : "Güncelle"}
                    </button>
                </div>
            </div>
        </div>
    );
}
