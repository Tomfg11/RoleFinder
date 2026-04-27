import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export const callGemini = async (prompt, apiKey, systemInstruction, isJson = true) => {
    if (!apiKey || apiKey.includes("SUA_CHAVE_AQUI")) {
        alert("Configure a chave no .env!");
        return null;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Usando a versão mais recente e ativa do Gemini (v3)
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
            systemInstruction: systemInstruction
        });

        // Força a IA a devolver um Array de Objetos válidos sem quebrar o texto
        const jsonSchema = {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    name: { type: SchemaType.STRING },
                    category: { type: SchemaType.STRING },
                    price: { type: SchemaType.STRING },
                    notes: { type: SchemaType.STRING }
                },
                required: ["name", "category", "price", "notes"]
            }
        };

        const generationConfig = {
            temperature: 0.7, // Reduzido um pouco para ser mais consistente
            maxOutputTokens: 2048,
            ...(isJson ? {
                responseMimeType: "application/json",
                responseSchema: jsonSchema
            } : {})
        };

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig
        });

        const response = await result.response;
        const text = response.text();

        if (isJson && text) {
            let cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
            const startIndex = cleanText.indexOf('[');
            const endIndex = cleanText.lastIndexOf(']');

            if (startIndex !== -1 && endIndex !== -1) {
                cleanText = cleanText.substring(startIndex, endIndex + 1);
            }

            try {
                return JSON.parse(cleanText);
            } catch (parseError) {
                console.error("JSON Error:", text);
                return null;
            }
        }

        return text;
    } catch (error) {
        console.error("Gemini Error:", error);
        return null;
    }
};

export const suggestPlaces = async (apiKey, userLocation, existingPlaces, vibe = "Romântico", radius = 10) => {
    let prompt = `Sugira 3 novos lugares reais (Restaurantes, Bares ou Parques) para um casal no Rio de Janeiro. `;
    prompt += `O estilo do rolê (Vibe) deve ser: "${vibe}". `;
    
    if (userLocation) {
        prompt += `Perto de Lat ${userLocation.lat}, Lng ${userLocation.lng}. `;
        prompt += `REGRA DE DISTÂNCIA: Sugira apenas locais em um raio máximo de ${radius}km de distância dessas coordenadas. `;
    }
    
    if (existingPlaces && existingPlaces.length > 0) {
        prompt += `\n\nREGRA CRÍTICA: É PROIBIDO sugerir qualquer um destes lugares (pois já fomos ou já estão na lista): ${existingPlaces.map(p => p.name).join(", ")}.`;
    }

    const systemInstruction = `Você é um guia especializado em encontros no Rio de Janeiro, focado na vibe "${vibe}". 
    Para o campo 'price', use estritamente um destes valores: 
    "Grátis" para locais sem custo (não use 'Gratuito'),
    "$" para Econômico, 
    "$$" para Justo, 
    "$$$" para Premium, 
    "$$$$" para Luxo. 
    Forneça sugestões curtas e diretas.`;

    return await callGemini(prompt, apiKey, systemInstruction, true);
};

export const generateInvites = async (apiKey, placeName, placeNotes) => {
    const prompt = `Crie 3 opções completas de convites criativos para WhatsApp. Destino: "${placeName}". Notas: ${placeNotes}.
    
    REGRA DE FORMATAÇÃO: Você deve separar CADA convite usando exatamente o texto "|||" (três barras). Não use "Opção 1", apenas entregue o texto do convite e separe com as barras.`;
    
    const systemInstruction = "Você é criativo e envia convites prontos para copiar e colar no WhatsApp, usando emojis.";
    return await callGemini(prompt, apiKey, systemInstruction, false);
};
