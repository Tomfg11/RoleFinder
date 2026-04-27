import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { CATEGORIES, PRICE_LEVELS } from '../../constants/index.jsx';

const PlaceModal = ({ isOpen, onClose, onSave, placeToEdit = null }) => {
    const initialState = {
        name: '',
        category: 'Restaurante',
        price: '$$',
        link: '',
        notes: '',
        priority: 3,
        date: '',
        start_time: '',
        end_time: '',
        visited: false
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (placeToEdit) {
            setFormData(placeToEdit);
        } else {
            setFormData(initialState);
        }
    }, [placeToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name) return;
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            {/* Div externa: Formato e fundo */}
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl animate-in zoom-in-95 overflow-hidden">
                
                {/* Div interna: Rolagem e Padding */}
                <div className="overflow-y-auto max-h-[90vh] p-6 md:p-10 custom-scrollbar">
                    
                    <div className="flex justify-between items-center mb-6 md:mb-8">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                            {placeToEdit ? 'Editar Local' : 'Novo Plano'}
                        </h3>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900"><X size={24} /></button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div>
                            <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2 px-2">Nome do Local</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="Ex: Terraço Itália" 
                                className="w-full bg-slate-50 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 outline-none font-bold text-sm md:text-base border border-transparent focus:border-blue-500 transition-colors" 
                                value={formData.name} 
                                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                            />
                        </div>

                        <div>
                            <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2 px-2">Link do Google Maps</label>
                            <input 
                                type="url" 
                                placeholder="https://maps.google.com/..." 
                                className="w-full bg-slate-50 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 outline-none font-bold text-sm md:text-base border border-transparent focus:border-blue-500 transition-colors" 
                                value={formData.link || ''} 
                                onChange={e => setFormData({ ...formData, link: e.target.value })} 
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div>
                                <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2 px-2">Categoria</label>
                                <select 
                                    className="w-full bg-slate-50 rounded-xl md:rounded-2xl px-3 py-3 md:px-5 md:py-4 font-bold text-xs md:text-sm appearance-none border border-transparent focus:border-blue-500 transition-colors" 
                                    value={formData.category} 
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2 px-2">Preço</label>
                                <select 
                                    className="w-full bg-slate-50 rounded-xl md:rounded-2xl px-3 py-3 md:px-5 md:py-4 font-bold text-xs md:text-sm appearance-none border border-transparent focus:border-blue-500 transition-colors" 
                                    value={formData.price} 
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                >
                                    {PRICE_LEVELS.map(l => <option key={l.id} value={l.id}>{l.id} - {l.label}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div>
                                <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2 px-2">Data (Agendamento)</label>
                                <input 
                                    type="date" 
                                    className="w-full bg-slate-50 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 font-bold text-sm text-slate-600 border border-transparent focus:border-blue-500 transition-colors" 
                                    value={formData.date || ''} 
                                    onChange={e => setFormData({ ...formData, date: e.target.value })} 
                                />
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2 px-2">Início</label>
                                    <input 
                                        type="time" 
                                        className="w-full bg-slate-50 rounded-xl md:rounded-2xl px-3 py-3 md:px-4 md:py-4 font-bold text-xs md:text-sm text-slate-600 border border-transparent focus:border-blue-500 transition-colors" 
                                        value={formData.start_time || ''} 
                                        onChange={e => setFormData({ ...formData, start_time: e.target.value })} 
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2 px-2">Fim</label>
                                    <input 
                                        type="time" 
                                        className="w-full bg-slate-50 rounded-xl md:rounded-2xl px-3 py-3 md:px-4 md:py-4 font-bold text-xs md:text-sm text-slate-600 border border-transparent focus:border-blue-500 transition-colors" 
                                        value={formData.end_time || ''} 
                                        onChange={e => setFormData({ ...formData, end_time: e.target.value })} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2 px-2">Prioridade</label>
                            <div className="flex gap-2 bg-slate-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-transparent">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, priority: star })}
                                        className={`transition-colors p-1 ${formData.priority >= star ? 'text-amber-400' : 'text-slate-300 hover:text-amber-200'}`}
                                    >
                                        <Star className="w-6 h-6 md:w-8 md:h-8" fill={formData.priority >= star ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2 px-2">Notas do Casal</label>
                            <textarea 
                                placeholder="O que pedir? Alguma dica?" 
                                className="w-full bg-slate-50 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 font-semibold text-xs md:text-sm h-20 md:h-24 border border-transparent focus:border-blue-500 transition-colors resize-none" 
                                value={formData.notes || ''} 
                                onChange={e => setFormData({ ...formData, notes: e.target.value })} 
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button 
                                type="button" 
                                onClick={onClose} 
                                className="flex-1 py-3 md:py-4 text-slate-400 font-bold text-sm md:text-base"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="flex-[2] bg-blue-600 py-3 md:py-4 rounded-xl md:rounded-2xl text-white font-black text-sm md:text-base shadow-xl shadow-blue-100 active:scale-95 transition-transform"
                            >
                                {placeToEdit ? 'Atualizar' : 'Salvar Destino'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlaceModal;
