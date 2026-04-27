import React, { useState, useEffect } from 'react';
import { Search, Clock, Calendar, CheckCircle2, Dices, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Layout & UI
import Navbar from './components/layout/Navbar.jsx';
import PlaceCard from './components/places/PlaceCard.jsx';
import PlaceModal from './components/places/PlaceModal.jsx';
import RaffleModal from './components/places/RaffleModal.jsx';
import RaffleResultModal from './components/places/RaffleResultModal.jsx';
import AISuggestionsModal from './components/ai/AISuggestionsModal.jsx';
import AIInviteModal from './components/ai/AIInviteModal.jsx';
import LoginScreen from './components/auth/LoginScreen.jsx';
import StatsSection from './components/layout/StatsSection.jsx';

// Services & Hooks
import { suggestPlaces, generateInvites } from './services/geminiService.js';
import { getUserLocation } from './services/locationService.js';
import usePlaces from './hooks/usePlaces.js';
import { useAuth } from './hooks/useAuth.js';

// Carrega a chave da API das variáveis de ambiente (.env)
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function App() {
    const { user, loading: authLoading, signOut } = useAuth();
    const { places, addPlace, updatePlace, toggleVisited, deletePlace } = usePlaces(user?.id);

    // UI States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [placeToEdit, setPlaceToEdit] = useState(null);
    const [isRaffleModalOpen, setIsRaffleModalOpen] = useState(false);
    const [isRaffleResultOpen, setIsRaffleResultOpen] = useState(false);
    const [isAISuggestOpen, setIsAISuggestOpen] = useState(false);
    const [isAIInviteOpen, setIsAIInviteOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Wishlist');

    // Data States
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState("");
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [locationLoading, setLocationLoading] = useState(false);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
        );
    }

    if (!user) {
        return (
            <>
                <Toaster richColors position="top-center" />
                <LoginScreen />
            </>
        );
    }

    const handleGetLocation = async () => {
        setLocationLoading(true);
        try {
            const loc = await getUserLocation();
            setUserLocation(loc);
            toast.success("Localização obtida com sucesso!");
        } catch (error) {
            toast.error("Erro ao obter localização.");
        } finally {
            setLocationLoading(false);
        }
    };

    const handleSuggestPlaces = async (vibe) => {
        setAiLoading(true);
        const results = await suggestPlaces(GEMINI_KEY, userLocation, places, vibe);
        if (results) {
            setAiSuggestions(results);
            toast.success("Sugestões geradas!");
        }
        setAiLoading(false);
    };

    const handleGenerateInvite = async (place) => {
        setSelectedPlace(place);
        setIsAIInviteOpen(true);
        setAiLoading(true);
        const response = await generateInvites(GEMINI_KEY, place.name, place.notes);
        if (response) {
            setAiResponse(response);
        } else {
            toast.error("Erro ao gerar convites.");
        }
        setAiLoading(false);
    };

    const handleExecuteRaffle = (budgetTier) => {
        const possible = places.filter(p => !p.visited && !p.date && p.price.length <= budgetTier.length);
        if (possible.length === 0) {
            toast.error("Nenhum lugar encontrado nesse orçamento!");
            return;
        }
        const random = possible[Math.floor(Math.random() * possible.length)];
        setSelectedPlace(random);
        setIsRaffleModalOpen(false);
        setIsRaffleResultOpen(true);
        toast.success("Destino sorteado!");
    };

    const handleSavePlace = (formData) => {
        if (placeToEdit) {
            updatePlace(placeToEdit.id, formData);
            toast.success("Local atualizado!");
        } else {
            addPlace(formData);
            toast.success("Adicionado à lista!");
        }
        setIsModalOpen(false);
    };

    const handleDeletePlace = (id) => {
        if (window.confirm("Deseja mesmo excluir este local?")) {
            deletePlace(id);
            toast.success("Removido com sucesso.");
        }
    };

    const handleToggleVisited = (id) => {
        toggleVisited(id);
        toast.success("Status atualizado!");
    };

    const filteredPlaces = places.filter(p => {
        if (activeTab === 'Wishlist') return !p.visited && !p.date;
        if (activeTab === 'Agendados') return !p.visited && p.date;
        if (activeTab === 'Histórico') return p.visited;
        return true;
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-10 selection:bg-blue-100">
            <Toaster richColors position="top-center" />
            
            <Navbar
                onSuggest={() => setIsAISuggestOpen(true)}
                onAdd={() => { setPlaceToEdit(null); setIsModalOpen(true); }}
                onSignOut={() => { signOut(); toast.info("Até logo!"); }}
            />

            <main className="max-w-5xl mx-auto pt-24 md:pt-32 px-4 md:px-6">
                <div className="flex flex-col gap-6 md:gap-8 mb-8 md:mb-12">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                            Planejamento <span className="text-blue-600 italic">do Casal</span>
                        </h2>
                        <p className="text-slate-400 font-medium italic text-sm md:text-base">Onde a sua próxima memória começa.</p>
                    </div>

                    <StatsSection places={places} />

                    <div className="flex bg-white p-1 md:p-1.5 rounded-2xl border border-slate-200 shadow-sm self-center md:self-start overflow-x-auto no-scrollbar max-w-full">
                        {['Wishlist', 'Agendados', 'Histórico'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-[10px] md:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab
                                    ? (tab === 'Wishlist' ? 'bg-blue-600' : tab === 'Agendados' ? 'bg-indigo-600' : 'bg-green-600') + ' text-white shadow-md'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab === 'Wishlist' ? <Clock size={16} /> : tab === 'Agendados' ? <Calendar size={16} /> : <CheckCircle2 size={16} />}
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {filteredPlaces.length > 0 ? filteredPlaces.map(place => (
                        <PlaceCard
                            key={place.id}
                            place={place}
                            onInvite={handleGenerateInvite}
                            onToggleVisited={handleToggleVisited}
                            onDelete={handleDeletePlace}
                            onEdit={(p) => { setPlaceToEdit(p); setIsModalOpen(true); }}
                            formatDate={formatDate}
                        />
                    )) : (
                        <div className="col-span-full py-16 md:py-24 text-center bg-white border-2 border-dashed border-slate-100 rounded-[2rem] md:rounded-[3rem]">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                                <Search size={24} />
                            </div>
                            <p className="text-slate-400 font-bold italic text-sm px-6">Sua lista está vazia nesta categoria.</p>
                        </div>
                    )}
                </div>

                {activeTab === 'Wishlist' && filteredPlaces.length > 0 && (
                    <div className="mt-8 md:mt-12">
                        <button
                            onClick={() => setIsRaffleModalOpen(true)}
                            className="w-full bg-slate-900 text-white py-6 rounded-[2rem] flex flex-col items-center justify-center gap-2 transition-all hover:bg-blue-600 shadow-xl active:scale-95"
                        >
                            <Dices size={28} className="transition-transform group-hover:rotate-12" />
                            <span className="font-black uppercase text-[10px] tracking-widest">Sorteio Aleatório</span>
                        </button>
                    </div>
                )}
            </main>

            <PlaceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSavePlace}
                placeToEdit={placeToEdit}
            />

            <RaffleModal
                isOpen={isRaffleModalOpen}
                onClose={() => setIsRaffleModalOpen(false)}
                onRaffle={handleExecuteRaffle}
            />

            <RaffleResultModal
                isOpen={isRaffleResultOpen}
                onClose={() => setIsRaffleResultOpen(false)}
                selectedPlace={selectedPlace}
            />

            <AISuggestionsModal
                isOpen={isAISuggestOpen}
                onClose={() => setIsAISuggestOpen(false)}
                onGetLocation={handleGetLocation}
                userLocation={userLocation}
                locationLoading={locationLoading}
                aiLoading={aiLoading}
                suggestions={aiSuggestions}
                onAddSuggestion={(sug) => {
                    addPlace(sug);
                    setAiSuggestions(prev => prev.filter(s => s.name !== sug.name));
                    toast.success("Adicionado à lista! ✨");
                }}
                onRefresh={handleSuggestPlaces}
            />

            <AIInviteModal
                isOpen={isAIInviteOpen}
                onClose={() => setIsAIInviteOpen(false)}
                loading={aiLoading}
                response={aiResponse}
                selectedPlace={selectedPlace}
            />

            <footer className="max-w-5xl mx-auto px-6 py-12 text-center border-t border-slate-200 mt-16 md:mt-24">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Role Finder <span className="text-blue-400 mx-2">•</span> 2026</p>
            </footer>
        </div>
    );
}
