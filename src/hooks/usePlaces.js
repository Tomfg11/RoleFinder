import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from '../constants/index.jsx';
import { supabase } from '../services/supabaseClient';

const usePlaces = (userId) => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const storageKey = userId ? `${LOCAL_STORAGE_KEY}_${userId}` : LOCAL_STORAGE_KEY;

    const fetchPlaces = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('places')
                .select('*')
                .order('created_at', { ascending: false });

            if (userId) query = query.eq('user_id', userId);

            const { data, error } = await query;
            if (error) throw error;

            if (data) {
                setPlaces(data);
                setLoading(false);
                return;
            }
        } catch (err) {
            console.error("Supabase error, using fallback:", err.message);
        }

        const saved = localStorage.getItem(storageKey);
        setPlaces(saved ? JSON.parse(saved) : []);
        setLoading(false);
    };

    useEffect(() => {
        fetchPlaces();
    }, [userId]);

    useEffect(() => {
        if (places.length > 0) {
            localStorage.setItem(storageKey, JSON.stringify(places));
        } else {
            localStorage.removeItem(storageKey);
        }
    }, [places, storageKey]);

    const addPlace = async (newPlace) => {
        const placeWithId = {
            ...newPlace,
            id: Date.now(),
            created_at: new Date().toISOString(),
            user_id: userId
        };

        setPlaces(prev => [placeWithId, ...prev]);

        try {
            const { error } = await supabase.from('places').insert([placeWithId]);
            if (error) throw error;
        } catch (err) {
            console.error("DB Insert Error:", err.message);
        }
    };

    const updatePlace = async (id, updatedData) => {
        const { id: _id, created_at: _ca, ...payload } = updatedData;
        setPlaces(prev => prev.map(p => p.id === id ? { ...p, ...payload } : p));

        try {
            const { error } = await supabase.from('places').update(payload).eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error("DB Update Error:", err.message);
            fetchPlaces();
        }
    };

    const toggleVisited = async (id) => {
        const placeToUpdate = places.find(p => p.id === id);
        const newStatus = !placeToUpdate.visited;

        setPlaces(prev => prev.map(p => p.id === id ? { ...p, visited: newStatus } : p));

        try {
            const { error } = await supabase.from('places').update({ visited: newStatus }).eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error("DB Toggle Error:", err.message);
        }
    };

    const deletePlace = async (id) => {
        setPlaces(prev => prev.filter(p => p.id !== id));
        try {
            const { error } = await supabase.from('places').delete().eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error("DB Delete Error:", err.message);
        }
    };

    return {
        places,
        loading,
        addPlace,
        updatePlace,
        toggleVisited,
        deletePlace,
        refresh: fetchPlaces
    };
};

export default usePlaces;
