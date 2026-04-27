import React from 'react';
import { X, Loader2, Plus, Send } from 'lucide-react';
import { toast } from 'sonner';

const AIInviteModal = ({ isOpen, onClose, loading, response, selectedPlace }) => {
    if (!isOpen) return null;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Convite pronto para colar no Zap! 💌");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <div className="bg-white w-full max-w-md rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
                        <Send className="text-blue-600" size={20} /> Convites de IA
                    </h3>
                    <button onClick={onClose} className="p-2 text-slate-400"><X size={20} /></button>
                </div>
                
                {loading ? (
                    <div className="py-12 text-center">
                        <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={32} />
                        <p className="text-slate-400 font-bold italic text-sm">A IA está escrevendo algo fofo...</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
                        {response ? response.split('|||').filter(t => t.trim().length > 5).map((t, i) => (
                            <div 
                                key={i} 
                                className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs md:text-sm font-semibold text-slate-700 relative group transition-all hover:bg-white whitespace-pre-wrap"
                            >
                                {t.trim()}
                                <button
                                    onClick={() => copyToClipboard(t.trim())}
                                    className="absolute top-2 right-2 p-1.5 bg-white rounded-lg text-blue-600 shadow-sm md:opacity-0 group-hover:opacity-100 transition-opacity border"
                                    title="Copiar convite"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        )) : (
                            <p className="text-center text-slate-400 text-sm italic">Nenhum convite gerado.</p>
                        )}
                    </div>
                )}
                
                <button 
                    onClick={onClose} 
                    className="w-full mt-6 bg-slate-900 text-white py-3 md:py-4 rounded-xl font-black text-sm md:text-base"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default AIInviteModal;
