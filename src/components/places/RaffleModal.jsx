import React from 'react';
import { Wallet } from 'lucide-react';
import { PRICE_LEVELS } from '../../constants/index.jsx';

const RaffleModal = ({ isOpen, onClose, onRaffle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <div className="bg-white w-full max-w-sm rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl text-center animate-in zoom-in-95">
                <div className="bg-blue-50 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <Wallet className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-2 text-slate-900">Qual o orçamento?</h3>
                <p className="text-slate-400 text-[10px] md:text-xs font-medium mb-6 md:mb-8">Filtraremos apenas os locais que cabem no bolso hoje.</p>
                
                <div className="grid gap-2 md:gap-3">
                    {PRICE_LEVELS.map(l => (
                        <button
                            key={l.id}
                            onClick={() => onRaffle(l.id)}
                            className="p-4 md:p-5 rounded-2xl border-2 border-slate-50 hover:border-blue-500 hover:bg-blue-50 font-bold flex justify-between items-center transition-all group"
                        >
                            <span className="text-xs md:text-sm text-slate-600 group-hover:text-slate-900">{l.label}</span>
                            <span className="text-blue-600 font-black text-xs md:text-sm">{l.id}</span>
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className="mt-6 text-slate-400 font-bold text-xs md:text-sm">Cancelar</button>
            </div>
        </div>
    );
};

export default RaffleModal;
