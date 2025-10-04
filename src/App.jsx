import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Cloud, Globe, MessageSquare, Calendar, Factory, Leaf, Zap, Send, User } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, onSnapshot, addDoc, setLogLevel } from 'firebase/firestore';

// --- GLOBAL CONFIGURATION (MANDATORY CANVAS VARIABLES) ---
// These variables are provided by the hosting environment for Firebase setup and security.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// --- MOCK DATA FOR MALAYSIAN REGIONS AND CROPS ---
const allRegions = [
    { name: "Johor", districts: ["Johor Bahru", "Muar", "Kluang", "Batu Pahat"] },
    { name: "Kedah", districts: ["Alor Setar", "Sungai Petani", "Kubang Pasu", "Langkawi"] },
    { name: "Kelantan", districts: ["Kota Bharu", "Bachok", "Pasir Mas", "Tumpat"] },
    { name: "Melaka", districts: ["Melaka Tengah", "Alor Gajah", "Jasin"] },
    { name: "Negeri Sembilan", districts: ["Seremban", "Port Dickson", "Jempol", "Kuala Pilah"] },
    { name: "Pahang", districts: ["Kuantan", "Temerloh", "Raub", "Cameron Highlands"] },
    { name: "Perak", districts: ["Ipoh", "Taiping", "Manjung", "Kinta"] },
    { name: "Perlis", districts: ["Kangar", "Arau"] },
    { name: "Pulau Pinang", districts: ["Georgetown", "Seberang Perai"] },
    { name: "Sabah", districts: ["Kota Kinabalu", "Tawau", "Sandakan", "Kudat"] },
    { name: "Sarawak", districts: ["Kuching", "Miri", "Sibu", "Bintulu"] },
    { name: "Selangor", districts: ["Shah Alam", "Petaling Jaya", "Klang", "Sepang"] },
    { name: "Terengganu", districts: ["Kuala Terengganu", "Dungun", "Kemaman", "Besut"] },
    { name: "W.P. Kuala Lumpur", districts: ["Kuala Lumpur"] },
    { name: "W.P. Labuan", districts: ["Victoria"] },
    { name: "W.P. Putrajaya", districts: ["Putrajaya"] },
];

const cropCycles = [
    { name: "Rice (Padi)", cycle_days: 120, type: "staple", ref: "Local Agriculture Dept Avg" },
    { name: "Corn", cycle_days: 90, type: "vegetable", ref: "NASA-optimized growth" },
    { name: "Chilli", cycle_days: 75, type: "vegetable", ref: "NGO Certified data" },
    { name: "Watermelon", cycle_days: 85, type: "fruit", ref: "Standard local varieties" },
    { name: "Durian", cycle_days: 180, type: "fruit", ref: "Flowering to harvest cycle (Mock)" },
];

// --- UTILITY FUNCTIONS (COPIED FROM SNIPPET) ---
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Exponential backoff retry wrapper for API calls
const fetchWithRetry = async (url, options, maxRetries = 5) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response;
            if (response.status === 429 && i < maxRetries - 1) { // 429 Too Many Requests
                const delayTime = Math.pow(2, i) * 1000 + Math.random() * 1000;
                console.log(`Rate limit exceeded, retrying in ${delayTime / 1000}s...`);
                await delay(delayTime);
            } else {
                throw new Error(`API call failed with status: ${response.status}`);
            }
        } catch (error) {
            if (i === maxRetries - 1) throw error;
        }
    }
};

// --- API CALLING LOGIC (COPIED FROM SNIPPET) ---
const apiKey = ""; // Set by environment
const apiUrlBase = "https://generativelanguage.googleapis.com/v1beta/models/";

// Function to call Gemini for chat or analysis
const callGeminiApi = async (model, prompt, systemInstruction = null, useGrounding = false) => {
    const apiUrl = `${apiUrlBase}${model}:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        ...(systemInstruction && { systemInstruction: { parts: [{ text: systemInstruction }] } }),
        ...(useGrounding && { tools: [{ "google_search": {} }] }),
    };

    try {
        const response = await fetchWithRetry(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            const text = candidate.content.parts[0].text;
            let sources = [];
            const groundingMetadata = candidate.groundingMetadata;
            if (groundingMetadata && groundingMetadata.groundingAttributions) {
                sources = groundingMetadata.groundingAttributions
                    .map(attribution => ({
                        uri: attribution.web?.uri,
                        title: attribution.web?.title,
                    }))
                    .filter(source => source.uri && source.title);
            }
            return { text, sources };
        } else {
            // Handle error response from API
            console.error("Gemini API returned no text:", result);
            return { text: "Sorry, I couldn't get a response. Please check the console for API errors.", sources: [] };
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        return { text: "An error occurred while connecting to the assistant. Check your connection.", sources: [] };
    }
};

// --- SUB-COMPONENTS ---

// Sub-Component for Record Detail and Problem Solver (COMPLETED from original snippet)
const RecordDetailView = ({ record, onBack, handleRecordQuestion, recordQuestion, setRecordQuestion, recordSuggestion, isQuestionLoading, predictionReport }) => {
    return (
        <div className="flex flex-col h-full">
            <button onClick={onBack} className="self-start text-blue-600 hover:underline mb-4 text-sm font-semibold flex items-center">
                &larr; Back to Records List
            </button>

            <h4 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
                Analysis: {record.crop} in {record.district}
            </h4>

            {/* Record Summary */}
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4 border border-blue-100 space-y-1">
                <p className="text-md font-semibold text-gray-700">Crop: <span className="text-blue-600">{record.crop}</span></p>
                <p className="text-sm text-gray-600">Location: <span className="font-medium">{record.district}, {record.state}</span></p>
                <p className="text-sm text-green-600 font-medium">Planting Date: {record.plantingDate}</p>
                <p className="text-sm text-red-600 font-medium">Predicted Harvest: {record.predictedHarvestDate}</p>
            </div>

            {/* Prediction Report */}
            {predictionReport && predictionReport.text ? (
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-4">
                    <h5 className="font-bold text-yellow-800 flex items-center mb-2"><Factory className="w-4 h-4 mr-2" /> Initial Prediction Analysis</h5>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">{predictionReport.text}</div>
                </div>
            ) : null}

            {/* Problem Solver Input */}
            <div className="mt-4 border-t pt-4">
                <h5 className="font-bold text-gray-700 mb-2 flex items-center"><MessageSquare className="w-4 h-4 mr-2 text-green-600" /> Agronomy Assistant</h5>
                <textarea
                    rows="2"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition mb-2"
                    placeholder="E.g., 'My chilli leaves are turning yellow. What should I check based on the current weather and soil data?'"
                    value={recordQuestion}
                    onChange={(e) => setRecordQuestion(e.target.value)}
                    disabled={isQuestionLoading}
                ></textarea>
                <button
                    className="w-full p-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition disabled:bg-green-300 flex items-center justify-center"
                    onClick={handleRecordQuestion}
                    disabled={isQuestionLoading || !recordQuestion.trim()}
                >
                    {isQuestionLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Analyzing Climate & Soil Data...
                        </>
                    ) : (
                        <><Send className="w-4 h-4 mr-2" /> Get Expert Solution</>
                    )}
                </button>
            </div>

            {/* Problem Solver Output */}
            {recordSuggestion && (
                <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <h5 className="font-bold text-green-800 flex items-center mb-2"><Zap className="w-4 h-4 mr-2" /> Specialist Advice</h5>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">{recordSuggestion.text}</div>
                    {recordSuggestion.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-green-200">
                            <p className="font-semibold text-xs text-gray-600 mb-1">Sources (Simulated Grounding):</p>
                            <ul className="list-disc list-inside text-xs text-gray-500">
                                {recordSuggestion.sources.slice(0, 3).map((source, index) => (
                                    <li key={index}><a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:underline">{source.title}</a></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// 1. Global Crisis Tab
const GlobalCrisis = ({ isAuthReady }) => {
    const [topic, setTopic] = useState('El Niño/La Niña Weather Cycle');
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const topics = [
        "El Niño/La Niña Weather Cycle",
        "Global Supply Chain Disruption",
        "Fertilizer Price Volatility",
        "Ocean Acidification Impact on Fisheries",
    ];

    const generateReport = useCallback(async (selectedTopic) => {
        if (!isAuthReady) return;
        setReport(null);
        setIsLoading(true);

        const systemPrompt = "You are a specialized agricultural economist and climate analyst. Your task is to provide a comprehensive, actionable report for Malaysian farmers (max 300 words).";
        const userPrompt = `Analyze the current state of the global crisis: "${selectedTopic}". Explain its effect on Malaysian farmers (both negative and positive) and suggest concrete, data-driven solutions using information grounded from NASA, local government official websites, and NGO certified-information. Include a section on what to expect in the next 6 months.`;

        const { text, sources } = await callGeminiApi(
            'gemini-2.5-flash-preview-05-20',
            userPrompt,
            systemPrompt,
            true // Use Google Search Grounding
        );

        setReport({ text, sources, topic: selectedTopic });
        setIsLoading(false);
    }, [isAuthReady]);

    useEffect(() => {
        if (isAuthReady && !report) {
            generateReport(topic);
        }
    }, [isAuthReady, report, topic, generateReport]);

    return (
        <div className="flex flex-col h-full p-4 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-red-600" />
                Global Crisis Impact Report
            </h2>
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <select
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isLoading}
                >
                    {topics.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                <button
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:bg-red-300 sm:w-auto w-full"
                    onClick={() => generateReport(topic)}
                    disabled={isLoading || !isAuthReady}
                >
                    {isLoading ? 'Generating...' : 'Generate Report'}
                </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-50/70 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                            <p className="text-red-500 mt-2">Analyzing NASA & Global Data...</p>
                        </div>
                    </div>
                )}
                {report ? (
                    <div className="space-y-4 text-gray-700">
                        <h3 className="text-lg font-bold text-red-700">Analysis: {report.topic}</h3>
                        <div className="whitespace-pre-wrap">{report.text}</div>
                        {report.sources.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="font-semibold text-sm text-gray-600 mb-2">Sources (Simulated Grounding):</p>
                                <ul className="list-disc list-inside text-xs text-gray-500">
                                    {report.sources.slice(0, 3).map((source, index) => (
                                        <li key={index}><a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:underline">{source.title}</a></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 mt-10">Select a crisis and generate a tailored report for Malaysian agriculture.</p>
                )}
            </div>
        </div>
    );
};

// 2. Climate Crisis Chat
const ClimateCrisisChat = ({ isAuthReady }) => {
    const [character, setCharacter] = useState('Malaysia');
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Updated Characters with German and Arabic
    const crisisCharacters = {
        'Malaysia': { lang: 'Bahasa Melayu', voice: 'Malaysian Palm Oil Planter', problem: 'Increased flash floods and worker heat stress.', icon: '🇲🇾' },
        'Vietnam': { lang: 'Vietnamese', voice: 'Vietnamese Coffee Grower', problem: 'Late monsoon seasons and prolonged droughts affecting yields.', icon: '🇻🇳' },
        'China': { lang: 'Mandarin (Simplified)', voice: 'Chinese Grain Farmer', problem: 'Severe dust storms and unpredictable early frost.', icon: '🇨🇳' },
        'US': { lang: 'English', voice: 'US Corn Belt Farmer', problem: 'Record-breaking heat waves and flooding due to intense rainfall.', icon: '🇺🇸' },
        'Germany': { lang: 'German', voice: 'German Viticulturist', problem: 'Earlier grape ripening and new pests due to milder winters.', icon: '🇩🇪' },
        'UAE': { lang: 'Arabic', voice: 'UAE Hydroponic Operator', problem: 'Extreme ambient temperatures straining cooling infrastructure.', icon: '🇦🇪' },
    };

    const handleGenerateProblem = async (newCharacter) => {
        if (isLoading) return;

        const currentCharacter = crisisCharacters[newCharacter];
        setChatLog([]); // Clear previous problems
        setIsLoading(true);

        const nativeLang = currentCharacter.lang;
        const problem = currentCharacter.problem;
        const isEnglishNative = nativeLang === 'English';

        // Custom instruction based on language requirement
        const languageInstruction = isEnglishNative
            ? `State your problem concisely in English, which is your native language. Do not translate or repeat.`
            : `First, state your personal problem concisely in your native language (${nativeLang}). Then, provide the English translation immediately after. Use a clear separator (like a newline or " | ") between the two.`;

        const systemPrompt = `You are a farmer from ${newCharacter}. Your main problem due to climate change is "${problem}". Speak from a personal perspective. ${languageInstruction} Keep the total response concise (max 60 words combined).`;
        const userMessage = "Tell me about the biggest climate challenge your farm is facing right now.";

        const { text: responseText } = await callGeminiApi(
            'gemini-2.5-flash-preview-05-20',
            userMessage,
            systemPrompt
        );

        setChatLog([{ role: 'assistant', text: responseText, char: newCharacter, icon: currentCharacter.icon }]);
        setIsLoading(false);
    };

    useEffect(() => {
        if (isAuthReady) {
            handleGenerateProblem(character);
        }
    }, [character, isAuthReady]); // Regenerate when character changes

    return (
        <div className="flex flex-col h-full p-4 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <Cloud className="w-5 h-5 mr-2 text-indigo-600" />
                Climate Crisis Chat (Global Farmers)
            </h2>
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <select
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    value={character}
                    onChange={(e) => setCharacter(e.target.value)}
                    disabled={isLoading}
                >
                    {Object.keys(crisisCharacters).map(char => (
                        <option key={char} value={char}>{crisisCharacters[char].icon} {char} ({crisisCharacters[char].lang})</option>
                    ))}
                </select>
                <button
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-300 sm:w-auto w-full"
                    onClick={() => handleGenerateProblem(character)}
                    disabled={isLoading || !isAuthReady}
                >
                    {isLoading ? 'Listening...' : 'Hear Challenge'}
                </button>
            </div>
            <div className="flex-grow overflow-y-auto p-3 space-y-4 border border-gray-200 rounded-lg bg-gray-50 relative h-64">
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-50/70 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                            <p className="text-indigo-500 mt-2">Connecting to {character}...</p>
                        </div>
                    </div>
                )}
                {chatLog.length === 0 && !isLoading && (
                    <div className="text-center text-gray-400 mt-10">
                        Click 'Hear Challenge' to learn about the climate problems faced by farmers in {character}.
                    </div>
                )}
                {chatLog.map((message, index) => (
                    <div key={index} className={`flex justify-start`}>
                        <div className={`max-w-[90%] p-3 rounded-xl shadow-md bg-white text-gray-800 rounded-tl-none border border-gray-100`}>
                            <p className="font-semibold text-xs mb-1 text-indigo-600 flex items-center">{message.icon} {message.char}</p>
                            <p className="whitespace-pre-wrap">{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 3. Personalized Assistant Tab
const PersonalizedAssistant = ({ db, auth, isAuthReady, userId }) => {
    const [selectedState, setSelectedState] = useState(allRegions[0].name);
    const [selectedDistrict, setSelectedDistrict] = useState(allRegions[0].districts[0]);
    const [selectedCrop, setSelectedCrop] = useState(cropCycles[0].name);
    const [plantingDate, setPlantingDate] = useState('');
    const [predictedHarvest, setPredictedHarvest] = useState(null);
    const [predictionReport, setPredictionReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [plantingRecords, setPlantingRecords] = useState([]);

    // New state for record detail view
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [recordQuestion, setRecordQuestion] = useState('');
    const [recordSuggestion, setRecordSuggestion] = useState(null);
    const [isQuestionLoading, setIsQuestionLoading] = useState(false);

    const districts = useMemo(() => {
        return allRegions.find(r => r.name === selectedState)?.districts || [];
    }, [selectedState]);

    // Harvest Prediction Logic (Rule-based Mock)
    const calculateHarvestDate = () => {
        if (!plantingDate || !selectedCrop) {
            setPredictedHarvest(null);
            return;
        }

        const cropData = cropCycles.find(c => c.name === selectedCrop);
        if (!cropData) return;

        const pDate = new Date(plantingDate);
        if (isNaN(pDate.getTime())) return;

        // Calculate predicted harvest timestamp
        const harvestTimestamp = pDate.getTime() + cropData.cycle_days * 24 * 60 * 60 * 1000;
        const hDate = new Date(harvestTimestamp);
        const harvestDateString = hDate.toISOString().substring(0, 10);
        
        setPredictedHarvest({ date: harvestDateString, cropData });
        
        // Save the basic record first, then generate the report
        savePlantingRecord(selectedCrop, plantingDate, harvestDateString, selectedState, selectedDistrict);
        generatePredictionReport(selectedCrop, plantingDate, harvestDateString, selectedState, selectedDistrict);
    };

    // Gemini API call for Prediction Explanation
    const generatePredictionReport = async (crop, plantDate, harvestDate, state, district) => {
        setIsLoading(true);
        setPredictionReport(null);

        const cropData = cropCycles.find(c => c.name === crop);

        const systemPrompt = "You are an agricultural data scientist providing actionable insights to a Malaysian farmer. Response must be concise (max 200 words).";
        const userPrompt = `The farmer in ${district}, ${state} plans to plant ${crop} on ${plantDate} with a predicted harvest date of ${harvestDate} (based on an average cycle of ${cropData.cycle_days} days). Explain to the farmer how NASA satellite data (e.g., NDVI, rainfall), local government soil reports, and certified NGO climate information are used to validate and refine this prediction. Suggest one actionable step for the farmer based on this location's likely climate profile.`;

        const { text, sources } = await callGeminiApi(
            'gemini-2.5-flash-preview-05-20',
            userPrompt,
            systemPrompt,
            true
        );

        setPredictionReport({ text, sources });
        setIsLoading(false);
    };

    // Gemini API call for Problem Solver
    const handleRecordQuestion = async () => {
        if (!recordQuestion.trim() || !selectedRecord) return;
        setIsQuestionLoading(true);
        setRecordSuggestion(null);

        const systemPrompt = `You are a specialist agronomist for ${selectedRecord.crop} in ${selectedRecord.district}, ${selectedRecord.state}. Your advice must be based on best practices, drawing on local climate (from NASA data), soil science (from local government reports), and sustainable methods (from certified NGOs). Respond with a concise, actionable solution (max 150 words).`;
        const userPrompt = `My planting record for ${selectedRecord.crop} (planted on ${selectedRecord.plantingDate} in ${selectedRecord.district}) is facing this challenge/needs this suggestion: "${recordQuestion}". Provide a concrete solution.`;

        const { text, sources } = await callGeminiApi(
            'gemini-2.5-flash-preview-05-20',
            userPrompt,
            systemPrompt,
            true // Use Google Search Grounding for real-time problem solving
        );

        setRecordSuggestion({ text, sources });
        setIsQuestionLoading(false);
        setRecordQuestion('');
    };

    // Firestore: Save Record
    const savePlantingRecord = async (crop, plantDate, harvestDate, state, district) => {
        if (!db || !auth.currentUser) {
            console.error("Firestore not initialized or user not logged in.");
            return;
        }

        const collectionPath = `/artifacts/${appId}/users/${auth.currentUser.uid}/planting_records`;
        const recordsRef = collection(db, collectionPath);

        try {
            await addDoc(recordsRef, {
                state,
                district,
                crop,
                plantingDate: plantDate,
                predictedHarvestDate: harvestDate,
                timestamp: new Date().toISOString(),
                userId: auth.currentUser.uid,
            });
            console.log("Record saved to Firestore successfully.");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // Firestore: Load Records
    useEffect(() => {
        if (!db || !auth.currentUser || !isAuthReady) return;

        const collectionPath = `/artifacts/${appId}/users/${auth.currentUser.uid}/planting_records`;
        // Query only records belonging to the current user (private data scope)
        const q = query(collection(db, collectionPath), where("userId", "==", auth.currentUser.uid));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const records = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            // Sort by latest timestamp
            records.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setPlantingRecords(records);

            // If the selected record was just updated, refresh its data
            if (selectedRecord) {
                const updatedRecord = records.find(r => r.id === selectedRecord.id);
                if (updatedRecord) setSelectedRecord(updatedRecord);
            } else if (records.length > 0 && predictedHarvest) {
                // Automatically select the newly created record if it's the latest
                setSelectedRecord(records[0]);
            }
        }, (error) => {
            console.error("Error listening to records:", error);
        });

        return () => unsubscribe();
    }, [db, auth, isAuthReady, selectedRecord]);

    // Reset prediction report when selecting a new record
    useEffect(() => {
        if (selectedRecord) {
            setPredictionReport(null);
            setRecordSuggestion(null);
        }
    }, [selectedRecord]);


    // UI
    return (
        <div className="flex flex-col h-full p-4 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Planting & Harvest Predictor
            </h2>

            {/* Prediction Input Section */}
            {!selectedRecord && (
                <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* State Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State / Federal Territory:</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                                value={selectedState}
                                onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(allRegions.find(r => r.name === e.target.value).districts[0]); setPredictedHarvest(null); setPredictionReport(null); }}
                            >
                                {allRegions.map(region => (
                                    <option key={region.name} value={region.name}>{region.name}</option>
                                ))}
                            </select>
                        </div>
                        {/* District Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">District:</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                                value={selectedDistrict}
                                onChange={(e) => { setSelectedDistrict(e.target.value); setPredictedHarvest(null); setPredictionReport(null); }}
                            >
                                {districts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                        {/* Crop Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type:</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                                value={selectedCrop}
                                onChange={(e) => { setSelectedCrop(e.target.value); setPredictedHarvest(null); setPredictionReport(null); }}
                            >
                                {cropCycles.map(crop => (
                                    <option key={crop.name} value={crop.name}>{crop.name}</option>
                                ))}
                            </select>
                        </div>
                        {/* Planting Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Planting Date:</label>
                            <input
                                type="date"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                                value={plantingDate}
                                onChange={(e) => { setPlantingDate(e.target.value); setPredictedHarvest(null); setPredictionReport(null); }}
                            />
                        </div>
                    </div>

                    <button
                        className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 mb-4"
                        onClick={calculateHarvestDate}
                        disabled={!plantingDate || isLoading || !isAuthReady}
                    >
                        Predict & Save Harvest Date
                    </button>

                    {predictedHarvest && (
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-4">
                            <p className="text-xl font-bold text-blue-800 flex items-center">
                                <Leaf className="w-5 h-5 mr-2" />
                                Predicted Harvest: <span className="ml-2">{predictedHarvest.date}</span>
                            </p>
                            <p className="text-sm text-blue-700 mt-1">Based on a {predictedHarvest.cropData.cycle_days}-day cycle ({predictedHarvest.cropData.ref})</p>
                        </div>
                    )}
                </>
            )}

            <div className={`overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50 relative ${selectedRecord ? 'flex-1' : 'min-h-[250px]'}`}>
                {/* Loading State for Initial Prediction */}
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-50/70 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <p className="text-blue-500 mt-2">Generating Data-Driven Analysis...</p>
                        </div>
                    </div>
                )}

                {/* Record Detail View */}
                {selectedRecord ? (
                    <RecordDetailView
                        record={selectedRecord}
                        onBack={() => { setSelectedRecord(null); setRecordSuggestion(null); setPredictionReport(null); }}
                        handleRecordQuestion={handleRecordQuestion}
                        recordQuestion={recordQuestion}
                        setRecordQuestion={setRecordQuestion}
                        recordSuggestion={recordSuggestion}
                        isQuestionLoading={isQuestionLoading}
                        predictionReport={predictionReport}
                    />
                ) : (
                    <>
                        <h3 className="text-lg font-bold text-gray-700 mb-2 border-b pb-2 flex justify-between items-center">
                            My Planting Records ({plantingRecords.length})
                            {plantingRecords.length > 0 && <button onClick={() => setSelectedRecord(plantingRecords[0])} className='text-sm text-blue-500 hover:text-blue-700 font-normal'>View latest</button>}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">User ID: <span className="font-mono text-xs p-1 bg-gray-200 rounded break-all">{userId || "Loading..."}</span></p>

                        {plantingRecords.length === 0 ? (
                            <p className="text-sm text-gray-400">No records found. Make a prediction above to save your first record!</p>
                        ) : (
                            <div className="space-y-2">
                                {plantingRecords.map(record => (
                                    <div
                                        key={record.id}
                                        className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition duration-150"
                                        onClick={() => { setSelectedRecord(record); setRecordSuggestion(null); setPredictionReport(null);}}
                                    >
                                        <p className="font-bold text-gray-800 flex justify-between items-center">
                                            {record.crop}
                                            <span className='text-xs text-blue-500 flex items-center'>Analyze <Zap className='w-3 h-3 ml-1'/></span>
                                        </p>
                                        <p className="text-xs text-gray-500">{record.state} - {record.district}</p>
                                        <p className="text-sm text-green-600 mt-1">Plant: {record.plantingDate} | Harvest: {record.predictedHarvestDate}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            {!isAuthReady && <p className="text-center text-sm text-red-500 mt-2">Authentication services connecting...</p>}
        </div>
    );
};


// --- MAIN APP COMPONENT ---
const App = () => {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [currentTab, setCurrentTab] = useState('Assistant'); // 'Assistant', 'Global', 'Chat'

    // 1. Firebase Initialization and Authentication
    useEffect(() => {
        if (!firebaseConfig) {
            console.error("Firebase config is missing.");
            return;
        }

        try {
            // Set Firestore log level for debugging
            setLogLevel('debug');
            
            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const authentication = getAuth(app);

            setDb(firestore);
            setAuth(authentication);

            const unsubscribe = onAuthStateChanged(authentication, (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    // Fallback to anonymous sign-in if needed, though custom token should cover it
                    signInAnonymously(authentication)
                        .then((anonUserCredential) => {
                            setUserId(anonUserCredential.user.uid);
                        })
                        .catch((error) => {
                            console.error("Anonymous sign-in failed:", error);
                        });
                }
                setIsAuthReady(true);
            });

            // Handle custom token sign-in if provided
            if (initialAuthToken) {
                signInWithCustomToken(authentication, initialAuthToken)
                    .catch((error) => {
                        console.error("Custom token sign-in failed:", error);
                        // Fallback to anonymous sign-in if custom token fails
                        signInAnonymously(authentication).catch((e) => console.error("Anon sign-in failed:", e));
                    });
            } else {
                 // Sign in anonymously if no token is available
                 signInAnonymously(authentication).catch((e) => console.error("Anon sign-in failed:", e));
            }
            
            return () => unsubscribe();

        } catch (error) {
            console.error("Firebase initialization failed:", error);
            setIsAuthReady(true); // Stop loading even on failure
        }
    }, []);

    const renderContent = () => {
        if (!isAuthReady) {
            return (
                <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                        <p className="mt-4 text-lg text-indigo-600">Connecting to Firebase & LLM Services...</p>
                    </div>
                </div>
            );
        }

        const commonProps = { isAuthReady, db, auth, userId };

        switch (currentTab) {
            case 'Global':
                return <GlobalCrisis {...commonProps} />;
            case 'Chat':
                return <ClimateCrisisChat {...commonProps} />;
            case 'Assistant':
            default:
                return <PersonalizedAssistant {...commonProps} />;
        }
    };
    
    // Tabs configuration
    const tabs = [
        { id: 'Assistant', name: 'Predictor & Agronomist', icon: Calendar, color: 'blue' },
        { id: 'Global', name: 'Global Impact Report', icon: Globe, color: 'red' },
        { id: 'Chat', name: 'Climate Farmer Chat', icon: Cloud, color: 'indigo' },
    ];

    const TabButton = ({ id, name, icon: Icon, color }) => (
        <button
            className={`flex-1 flex flex-col items-center justify-center p-3 rounded-t-xl transition-colors text-sm font-semibold 
                ${currentTab === id 
                    ? `bg-white text-${color}-600 border-t-4 border-${color}-600 shadow-t` 
                    : `bg-gray-100 text-gray-500 hover:bg-gray-200 border-t border-gray-300`}`
            }
            onClick={() => setCurrentTab(id)}
        >
            <Icon className="w-5 h-5 mb-1" />
            <span className="hidden sm:inline">{name}</span>
            <span className="sm:hidden">{id}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
            <style jsx global>{`
                /* Custom styles for Tailwind's limitations in the sandbox environment */
                .shadow-t {
                    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.06);
                }
                .min-h-\[600px\] {
                    min-height: 600px;
                }
            `}</style>
            
            <header className="text-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center">
                    <Leaf className="w-8 h-8 mr-3 text-green-600" />
                    AgriSense AI Platform
                </h1>
                <p className="text-gray-600 mt-1">Data-Driven Agriculture for Malaysian Farmers, Powered by Gemini & Firebase</p>
                <div className="mt-2 text-xs text-gray-500">
                    <User className="w-3 h-3 inline-block mr-1"/> Logged in as: <span className='font-mono break-all'>{userId || "Pending Auth"}</span>
                </div>
            </header>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl min-h-[600px] flex flex-col">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-300">
                    {tabs.map(tab => (
                        <TabButton key={tab.id} {...tab} />
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-0 overflow-hidden">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default App;
