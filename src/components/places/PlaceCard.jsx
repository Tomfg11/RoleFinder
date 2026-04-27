import React from 'react';
import { Star, Send, CheckCircle2, Trash2, Calendar, ExternalLink, Pencil, Clock } from 'lucide-react';
import { CATEGORIES } from '../../constants/index.jsx';

const PlaceCard = ({ place, onInvite, onToggleVisited, onDelete, onEdit, formatDate }) => {
    const categoryIcon = CATEGORIES.find(c => c.id === place.category)?.icon;

    return (
        <div className="bg-white border border-slate-100 p-5 md:p-7 rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:shadow-md transition-all flex flex-col relative group">
            <div className="flex justify-between items-start mb-4 md:mb-5">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center justify-center ${place.visited ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600'}`}>
                        {categoryIcon}
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">{place.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={10} fill={i < place.priority ? "currentColor" : "none"} className={i < place.priority ? "" : "text-slate-100"} />
                                ))}
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest">{place.category}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    {!place.visited && (
                        <button onClick={() => onInvite(place)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg">
                            <Send size={16} />
                        </button>
                    )}
                    <button 
                        onClick={() => onEdit(place)} 
                        className="p-2 text-slate-300 hover:text-blue-500 rounded-lg"
                        title="Editar"
                    >
                        <Pencil size={16} />
                    </button>
                    <button 
                        onClick={() => onToggleVisited(place.id)} 
                        className={`p-2 rounded-lg transition-all ${place.visited ? 'bg-green-50 text-green-600' : 'text-slate-300 hover:text-green-500'}`}
                    >
                        <CheckCircle2 size={16} />
                    </button>
                    <button 
                        onClick={() => onDelete(place.id)} 
                        className="p-2 text-slate-300 hover:text-red-500 rounded-lg"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {place.date && !place.visited && (
                    <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold">
                        <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        {formatDate(place.date)}
                    </div>
                )}

                {(place.start_time || place.end_time) && !place.visited && (
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold">
                        <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        {place.start_time || '--:--'} às {place.end_time || '--:--'}
                    </div>
                )}
            </div>

            {place.notes && (
                <div className="bg-slate-50 p-3 md:p-4 rounded-2xl mb-4 md:mb-5 border border-slate-100 italic text-[11px] md:text-xs font-semibold text-slate-500 leading-relaxed">
                    "{place.notes}"
                </div>
            )}

            <div className="mt-auto flex items-center justify-between">
                <span className="text-blue-600 font-black text-xs md:text-sm">{place.price}</span>
                {place.link && (
                    <a 
                        href={place.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[10px] md:text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1"
                    >
                        Maps <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </a>
                )}
            </div>
        </div>
    );
};

export default PlaceCard;
