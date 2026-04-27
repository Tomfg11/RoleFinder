import React from 'react';
import { Dices } from 'lucide-react';

const RaffleResultModal = ({ isOpen, onClose, selectedPlace }) => {
    if (!isOpen || !selectedPlace) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-600/20 backdrop-blur-xl animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 text-center shadow-2xl border-4 border-blue-600 animate-in zoom-in-90 duration-300">
                <div className="bg-blue-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-6 shadow-xl">
                    <Dices className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <p className="text-blue-600 font-black uppercase text-[8px] md:text-[10px] tracking-[0.3em] mb-2">A sorte escolheu:</p>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">{selectedPlace.name}</h2>
                <button 
                    onClick={onClose} 
                    className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black shadow-xl active:scale-95 transition-transform"
                >
                    Partiu!
                </button>
            </div>
        </div>
    );
};

export default RaffleResultModal;
