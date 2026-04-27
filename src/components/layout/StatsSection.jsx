import React from 'react';
import { Trophy, Heart, MapPin, CheckCircle } from 'lucide-react';

const StatsSection = ({ places }) => {
    const total = places.length;
    const visited = places.filter(p => p.visited).length;
    const wishlist = total - visited;
    const completionRate = total > 0 ? Math.round((visited / total) * 100) : 0;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 md:mb-12">
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-50 p-2 rounded-xl text-blue-600 mb-2">
                    <MapPin size={18} />
                </div>
                <span className="text-xl font-black text-slate-900">{total}</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total de Locais</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="bg-green-50 p-2 rounded-xl text-green-600 mb-2">
                    <CheckCircle size={18} />
                </div>
                <span className="text-xl font-black text-slate-900">{visited}</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Visitados</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="bg-amber-50 p-2 rounded-xl text-amber-600 mb-2">
                    <Heart size={18} />
                </div>
                <span className="text-xl font-black text-slate-900">{wishlist}</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Na Wishlist</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600 mb-2">
                    <Trophy size={18} />
                </div>
                <span className="text-xl font-black text-slate-900">{completionRate}%</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Concluído</span>
            </div>
        </div>
    );
};

export default StatsSection;
