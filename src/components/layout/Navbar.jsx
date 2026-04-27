import React from 'react';
import { Heart, Sparkles, Plus, LogOut } from 'lucide-react';

const Navbar = ({ onSuggest, onAdd, onSignOut }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-4 py-3 md:px-6 md:py-4">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 md:p-2 rounded-xl shadow-lg flex items-center justify-center">
                        <Heart className="text-white fill-current w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <h1 className="text-base md:text-lg font-black tracking-tighter text-slate-900 uppercase italic">
                        Role<span className="text-blue-600">Finder</span>
                    </h1>
                </div>
                <div className="flex gap-2 items-center">
                    <button 
                        onClick={onSuggest} 
                        className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-2 md:px-4 md:py-2 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 hover:bg-blue-100 transition-colors"
                    >
                        <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" /> 
                        <span className="hidden sm:inline">IA Sugestão</span>
                    </button>
                    <button 
                        onClick={onAdd} 
                        className="bg-slate-900 text-white px-3 py-2 md:px-4 md:py-2 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg hover:bg-slate-800 transition-colors"
                    >
                        <Plus className="w-4 h-4 md:w-5 md:h-5" /> 
                        <span className="hidden sm:inline">Novo</span>
                    </button>
                    <button 
                        onClick={onSignOut} 
                        title="Sair da Conta"
                        className="p-2 ml-1 md:ml-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut className="w-4 h-4 md:w-5 md:h-5" /> 
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
