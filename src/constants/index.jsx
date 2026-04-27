import React from 'react';
import { Utensils, Beer, TreePine, Film, MapPin } from 'lucide-react';

export const GEMINI_MODEL = "gemini-2.0-flash";

export const CATEGORIES = [
    { id: 'Restaurante', icon: <Utensils size={18} /> },
    { id: 'Bar', icon: <Beer size={18} /> },
    { id: 'Parque', icon: <TreePine size={18} /> },
    { id: 'Cinema', icon: <Film size={18} /> },
    { id: 'Outros', icon: <MapPin size={18} /> },
];

export const PRICE_LEVELS = [
    { id: '$', label: 'Econômico' },
    { id: '$$', label: 'Justo' },
    { id: '$$$', label: 'Premium' },
    { id: '$$$$', label: 'Luxo' },
];

export const LOCAL_STORAGE_KEY = 'role-finder-v5-final';
