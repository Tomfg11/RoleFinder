import React from 'react';
import { X, Navigation, Loader2, Sparkles, Plus } from 'lucide-react';

const AISuggestionsModal = ({ 
    isOpen, 
    onClose, 
    onGetLocation, 
    userLocation, 
    locationLoading, 
    aiLoading, 
    suggestions, 
    onAddSuggestion, 
    onRefresh 
}) => {
    const [selectedVibe, setSelectedVibe] = React.useState("Romântico");
    const [selectedRadius, setSelectedRadius] = React.useState(10);
    
    if (!isOpen) return null;

    const VIBES = [
        { id: "Romântico", icon: "❤️" },
        { id: "Econômico", icon: "💰" },
        { id: "Aventura", icon: "🧗" },
        { id: "Gourmet", icon: "🍕" }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-md">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
                <div className="p-6 md:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
                            <Sparkles className="text-blue-600 w-5 h-5" /> Sugestões de IA
                        </h3>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="mb-6 md:mb-8 p-4 md:p-5 bg-blue-50 rounded-2xl md:rounded-[2rem] border border-blue-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 text-white p-2 rounded-xl">
                                <Navigation size={16} />
                            </div>
                            <div>
                                <p className="text-[9px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest">Sua Localização</p>
                                <p className="text-xs md:text-sm font-bold text-slate-700">
                                    {userLocation ? `Localizado` : "Não compartilhada"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onGetLocation}
                            disabled={locationLoading}
                            className="bg-white text-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-black shadow-sm hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                        >
                            {locationLoading ? "..." : userLocation ? "Atualizar" : "Ativar GPS"}
                        </button>
                    </div>

                    <div className="flex flex-col gap-6 mb-8">
                        <div>
                            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2 flex justify-between">
                                <span>Distância Máxima</span>
                                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{selectedRadius} km</span>
                            </p>
                            <div className="px-2">
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="50" 
                                    value={selectedRadius} 
                                    onChange={(e) => setSelectedRadius(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-[8px] text-slate-300 font-bold mt-2 px-0.5">
                                    <span>1km</span>
                                    <span>25km</span>
                                    <span>50km</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Qual a vibe do casal?</p>
                            <div className="grid grid-cols-4 gap-2 px-1">
                                {VIBES.map(v => (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedVibe(v.id)}
                                        className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all ${selectedVibe === v.id 
                                            ? 'border-blue-600 bg-blue-50 text-blue-600' 
                                            : 'border-slate-50 bg-white text-slate-400 hover:border-slate-200'}`}
                                    >
                                        <span className="text-xl">{v.icon}</span>
                                        <span className="text-[8px] font-black uppercase tracking-tighter">{v.id}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {aiLoading ? (
                        <div className="py-12 md:py-20 text-center">
                            <Loader2 className="animate-spin text-blue-600 mx-auto mb-4 w-8 h-8" />
                            <p className="text-slate-500 font-bold italic text-sm">Consultando guia gastronômico...</p>
                        </div>
                    ) : (
                        <div className="space-y-3 md:space-y-4">
                            {suggestions.length > 0 ? (
                                <>
                                    {suggestions.map((sug, i) => (
                                        <div key={i} className="bg-slate-50 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-slate-100 flex justify-between items-center group hover:border-blue-500 transition-all">
                                            <div className="flex-1 pr-4">
                                                <h4 className="font-black text-slate-900 text-sm md:text-base">{sug.name}</h4>
                                                <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase mb-1 md:mb-2">{sug.category} • {sug.price}</p>
                                                <p className="text-[10px] md:text-[11px] text-slate-500 font-medium leading-tight italic">"{sug.notes}"</p>
                                            </div>
                                            <button 
                                                onClick={() => onAddSuggestion(sug)} 
                                                className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm transition-all"
                                            >
                                                <Plus className="w-4.5 h-4.5 md:w-5 md:h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={() => onRefresh(selectedVibe, selectedRadius)} className="w-full py-3 md:py-4 text-blue-600 font-black text-xs md:text-sm">Atualizar Opções</button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => onRefresh(selectedVibe, selectedRadius)} 
                                    className="w-full py-5 md:py-6 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest shadow-lg shadow-slate-200"
                                >
                                    Gerar Sugestões
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AISuggestionsModal;
