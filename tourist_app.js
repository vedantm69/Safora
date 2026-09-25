
(function() {
    var React = window.React;
    var ReactDOM = window.ReactDOM;
    if (!React || !ReactDOM) {
        console.error("React or ReactDOM not loaded.");
        return;
    }
    const { useState, useEffect, useRef, useMemo } = React;
    const e = React.createElement;

    // --- COUNTRIES LIST ---
    const COUNTRIES_LIST = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", 
        "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
        "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", 
        "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Chile", "China", 
        "Colombia", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic", 
        "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Fiji", "Finland", "France", 
        "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "Hungary", 
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", 
        "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", 
        "Latvia", "Lebanon", "Lithuania", "Luxembourg", "Malaysia", "Maldives", "Malta", "Mauritius", 
        "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Myanmar", "Nepal", 
        "Netherlands", "New Zealand", "Nicaragua", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", 
        "Palestine", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", 
        "Romania", "Russia", "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia", 
        "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria", 
        "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", 
        "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    // --- COMPREHENSIVE LIVE UI TRANSLATIONS (EN, HI, MR) ---
    const UI_I18N = {
        "English": {
            appTitle: "SAFORA",
            byDietCode: "by Diet Code",
            statusLinked: "POLICE + EMS LINKED • LIVE GPS SECURED",
            radarAlert: "RADAR ALERT",
            tabSafety: "Safety",
            tabAi: "AI Assist",
            tabTranslate: "Translate",
            tabGroup: "Group",
            tabLost: "Lost",
            tabProfile: "Profile",
            emergencyDispatch: "Emergency Dispatch",
            selectDistress: "SELECT DISTRESS REASON",
            sosButton: "SOS EMERGENCY DISPATCH",
            sosSubtext: "Instant police & hospital dispatch with live GPS",
            southMumbaiMap: "South Mumbai Coastal Safety Map",
            liveGpsMap: "● LIVE GPS MAP",
            liveShorelineHazard: "Live GPS telemetry & interactive safety corridor",
            emergencyActive: "EMERGENCY ACTIVE",
            emergencyActiveSub: "Your live GPS is being shared with responders.",
            dispatchStatus: "DISPATCH STATUS",
            distressType: "Distress type:",
            location: "Location:",
            dispatched: "Dispatched:",
            callEmergency: "CALL EMERGENCY LINE",
            cancelEmergency: "CANCEL EMERGENCY",
            aiTitle: "AI Safety Assistant",
            aiOnline: "● Online • Ready to assist",
            askLocation: "Ask about any location...",
            safetyRating: "SAFETY RATING",
            lostTitle: "Lost & Found",
            securedBadge: "SECURED",
            reportLostTab: "Report Lost",
            foundItemsTab: "Found Items",
            recentLostReports: "RECENT LOST REPORTS",
            verifiedFoundItems: "VERIFIED FOUND ITEMS",
            clearMyReports: "Clear My Reports",
            reportLostButton: "REPORT LOST ITEM",
            fileClaim: "File Official Lost Property Claim",
            fileClaimSub: "Direct broadcast to Tourism Police & Authority Desk",
            itemCategory: "Item Category *",
            itemName: "Item Name / Description *",
            lastSeenLocation: "Last Seen Location *",
            contactReturn: "Contact for Return *",
            submitClaim: "Submit Claim",
            cancel: "Cancel",
            identityPass: "Identity Pass",
            editPass: "Edit Pass",
            touristFullName: "TOURIST FULL NAME",
            currentStaying: "CURRENT STAYING ACCOMMODATION",
            activeReservation: "Active Reservation",
            checkout: "Check-out: 24 Oct",
            passportId: "PASSPORT / GOVT ID",
            emergencyPhone: "EMERGENCY PHONE",
            bloodGroup: "BLOOD GROUP",
            tourismHelpdesk: "TOURISM HELPDESK",
            digitalQr: "Digital Identity Pass QR",
            digitalQrSub: "Tap to show official boarding & verification QR"
        },
        "Hindi": {
            appTitle: "सफोरा (SAFORA) 2.0",
            byDietCode: "द्वारा डाइट कोड (Diet Code)",
            statusLinked: "पुलिस + एम्बुलेंस लिंक • लाइव GPS सुरक्षित",
            radarAlert: "अलर्ट सूचना",
            tabSafety: "सुरक्षा",
            tabAi: "AI सहायक",
            tabTranslate: "अनुवाद",
            tabGroup: "समूह",
            tabLost: "खोया-पाया",
            tabProfile: "प्रोफ़ाइल",
            emergencyDispatch: "आपातकालीन सहायता (SOS)",
            selectDistress: "आपातकाल का कारण चुनें",
            sosButton: "SOS आपातकालीन सहायता भेजें",
            sosSubtext: "लाइव GPS के साथ तत्काल पुलिस और अस्पताल सहायता",
            southMumbaiMap: "दक्षिण मुंबई तटीय सुरक्षा नक्शा",
            liveGpsMap: "● लाइव GPS मैप",
            liveShorelineHazard: "लाइव GPS टेलीमेट्री और इंटरैक्टिव सुरक्षा कॉरिडोर",
            emergencyActive: "आपातकाल सक्रिय है",
            emergencyActiveSub: "आपका लाइव GPS पुलिस और अस्पताल के साथ साझा हो रहा है।",
            dispatchStatus: "भेजने की स्थिति",
            distressType: "समस्या का प्रकार:",
            location: "स्थान:",
            dispatched: "भेजी गई टीम:",
            callEmergency: "हेल्पलाइन 112 पर कॉल करें",
            cancelEmergency: "आपातकाल रद्द करें",
            aiTitle: "AI सुरक्षा सहायक",
            aiOnline: "● ऑनलाइन • सहायता के लिए तैयार",
            askLocation: "किसी भी स्थान या सुरक्षा के बारे में पूछें...",
            safetyRating: "सुरक्षा रेटिंग",
            lostTitle: "खोया और पाया",
            securedBadge: "सुरक्षित",
            reportLostTab: "खोई वस्तु रिपोर्ट करें",
            foundItemsTab: "मिली वस्तुएं",
            recentLostReports: "हाल की खोई रिपोर्टें",
            verifiedFoundItems: "सत्यापित मिली वस्तुएं",
            clearMyReports: "मेरी रिपोर्ट हटाएं",
            reportLostButton: "खोई वस्तु दर्ज करें",
            fileClaim: "आधिकारिक खोई संपत्ति रिपोर्ट दर्ज करें",
            fileClaimSub: "पर्यटन पुलिस और प्राधिकरण डेस्क को सीधा प्रसारण",
            itemCategory: "वस्तु की श्रेणी *",
            itemName: "वस्तु का नाम / विवरण *",
            lastSeenLocation: "अंतिम बार देखा गया स्थान *",
            contactReturn: "वापसी के लिए संपर्क नंबर *",
            submitClaim: "रिपोर्ट सबमिट करें",
            cancel: "रद्द करें",
            identityPass: "पहचान पास (ID)",
            editPass: "विवरण बदलें",
            touristFullName: "पर्यटक का पूरा नाम",
            currentStaying: "वर्तमान ठहरने का स्थान / होटल",
            activeReservation: "सक्रिय आरक्षण",
            checkout: "चेक-आउट: 24 अक्टूबर",
            passportId: "पासपोर्ट / सरकारी ID",
            emergencyPhone: "आपातकालीन फोन",
            bloodGroup: "ब्लड ग्रुप",
            tourismHelpdesk: "पर्यटन हेल्पडेस्क",
            digitalQr: "डिजिटल पहचान पास QR",
            digitalQrSub: "आधिकारिक सत्यापन QR देखने के लिए टैप करें"
        },
        "Marathi": {
            appTitle: "सफोरा (SAFORA) 2.0",
            byDietCode: "डाइट कोड (Diet Code) निर्मित",
            statusLinked: "पोलीस + रुग्णवाहिका लिंक • थेट GPS सुरक्षित",
            radarAlert: "सतर्कता सूचना",
            tabSafety: "सुरक्षा",
            tabAi: "AI मदतनीस",
            tabTranslate: "भाषांतर",
            tabGroup: "ग्रुप",
            tabLost: "हरवले-सापडले",
            tabProfile: "प्रोफाइल",
            emergencyDispatch: "आपत्कालीन साहाय्य (SOS)",
            selectDistress: "आपत्कालीन कारण निवडा",
            sosButton: "SOS आपत्कालीन मदत बोलवा",
            sosSubtext: "थेट GPS सह तात्काळ पोलीस आणि रुग्णालय मदत",
            southMumbaiMap: "दक्षिण मुंबई किनारपट्टी सुरक्षा नकाशा",
            liveGpsMap: "● थेट GPS नकाशा",
            liveShorelineHazard: "थेट GPS आणि परस्परसंवादी सुरक्षा मार्ग",
            emergencyActive: "आपत्कालीन साहाय्य सक्रिय",
            emergencyActiveSub: "आपले थेट GPS लोकेशन मदत पथकासोबत शेअर केले जात आहे.",
            dispatchStatus: "मदत स्थिती",
            distressType: "समस्येचा प्रकार:",
            location: "ठिकाण:",
            dispatched: "पाठवलेले पथक:",
            callEmergency: "हेल्पलाइन 112 वर कॉल करा",
            cancelEmergency: "मदत रद्द करा",
            aiTitle: "AI सुरक्षा मदतनीस",
            aiOnline: "● ऑनलाइन • मदतीसाठी सज्ज",
            askLocation: "कोणत्याही ठिकाणाबद्दल विचारा...",
            safetyRating: "सुरक्षा मानांकन",
            lostTitle: "हरवले आणि सापडले",
            securedBadge: "सुरक्षित",
            reportLostTab: "हरवलेली वस्तू नोंदवा",
            foundItemsTab: "सापडलेल्या वस्तू",
            recentLostReports: "अलीकडील हरवलेल्या वस्तू",
            verifiedFoundItems: "तपासणी झालेल्या सापडलेल्या वस्तू",
            clearMyReports: "माझ्या नोंदी हटवा",
            reportLostButton: "हरवलेली वस्तू नोंदवा",
            fileClaim: "अधिकृत हरवलेली मालमत्ता नोंदणी",
            fileClaimSub: "पर्यटन पोलीस व नियंत्रण कक्षाकडे थेट नोंद",
            itemCategory: "वस्तूचा प्रकार *",
            itemName: "वस्तूचे नाव / वर्णन *",
            lastSeenLocation: "शेवटचे पाहिलेले ठिकाण *",
            contactReturn: "परतीसाठी संपर्क क्रमांक *",
            submitClaim: "नोंदणी सबमिट करा",
            cancel: "रद्द करा",
            identityPass: "ओळखपत्र पास (ID)",
            editPass: "माहिती बदला",
            touristFullName: "पर्यटकाचे पूर्ण नाव",
            currentStaying: "सध्याचे मुक्कामाचे ठिकाण / हॉटेल",
            activeReservation: "सक्रिय आरक्षण",
            checkout: "चेक-आउट: 24 ऑक्टोबर",
            passportId: "पासपोर्ट / शासकीय ID",
            emergencyPhone: "आपत्कालीन फोन",
            bloodGroup: "रक्तगट",
            tourismHelpdesk: "पर्यटन हेल्पडेस्क",
            digitalQr: "डिजिटल ओळख पास QR",
            digitalQrSub: "सत्यापन QR पाहण्यासाठी टॅप करा"
        }
    };

    // --- AUDIO SYNTHESIS HELPER ---
    let globalActiveAudio = null;
    const speakText = (text, lang = "en-US", onEndCallback = null) => {
        try {
            const cleanText = (text || "").replace(/[*#_]/g, '').trim().slice(0, 300);
            if (!cleanText) return;
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = lang;
            utterance.rate = 0.95;
            utterance.pitch = 1.0;
            if (onEndCallback) {
                utterance.onend = onEndCallback;
                utterance.onerror = onEndCallback;
            }
            window.speechSynthesis.speak(utterance);
        } catch (err) {
            console.warn("SpeechSynthesis error:", err);
            if (onEndCallback) onEndCallback();
        }
    };

    // --- COMPREHENSIVE TRANSLATION ENGINE & DICTIONARY ---
    const phrasebook = {
        emergency: [
            { en: "Please help me! Call the police!", hi: "कृपया मेरी मदद कीजिए! पुलिस को बुलाइए!", mr: "कृपया मला मदत करा! पोलिसांना बोलवा!", pronHi: "Krupaya meri madad kijiye! Police ko bulaiye!", pronMr: "Krupaya malaa madat karaa! Polisaanna bolwaa!" },
            { en: "Where is the nearest hospital?", hi: "पास में सबसे नजदीकी अस्पताल कहाँ है?", mr: "जवळचे सर्वात जवळचे रुग्णालय कुठे आहे?", pronHi: "Paas mein sabse nazdeeki aspatal kahan hai?", pronMr: "Javalche sarvaat javalche rugnaalay kuthe aahe?" },
            { en: "Someone stole my bag / wallet!", hi: "किसी ने मेरा बैग / पर्स चुरा लिया!", mr: "कोणीतरी माझी बॅग / पाकीट चोरले!", pronHi: "Kisi ne mera bag / purse churaa liya!", pronMr: "Konitari maajhi bag / paakit chorle!" },
            { en: "I am feeling unwell / need medical help.", hi: "मेरी तबीयत ठीक नहीं लग रही है, डॉक्टर चाहिए।", mr: "माझी प्रकृती बरी नाहीये, डॉक्टर हवे आहेत.", pronHi: "Meri tabiyat theek nahi lag rahi hai, doctor chahiye.", pronMr: "Maajhi prakruti bari naahiye, doctor havey aahet." }
        ],
        transport: [
            { en: "Bhaiya, will you go by meter?", hi: "भैया, मीटर से चलोगे क्या?", mr: "दादा, मीटरने चालणार का?", pronHi: "Bhaiya, meter se chaloge kya?", pronMr: "Dada, meter-ne chaalnaar ka?" },
            { en: "How much to Gateway of India?", hi: "गेटवे ऑफ इंडिया का कितना लोगे?", mr: "गेटवे ऑफ इंडियाचे किती घेणार?", pronHi: "Gateway of India ka kitna loge?", pronMr: "Gateway of India-che kiti ghenaar?" },
            { en: "Please turn on the AC.", hi: "भैया, AC चालू कर दीजिए ना।", mr: "दादा, कृपया AC चालू करा ना.", pronHi: "Bhaiya, AC chaaloo kar deejiye na.", pronMr: "Dada, krupaya AC chaaloo karaa na." },
            { en: "Please stop here on the left side.", hi: "भैया, यहाँ लेफ्ट साइड में रोक दीजिए।", mr: "दादा, इथे डाव्या बाजूला थांबवा.", pronHi: "Bhaiya, yahan left side mein rok dijiye.", pronMr: "Dada, ithe daavya baajula thaambwa." }
        ],
        food: [
            { en: "Please don't make it too spicy.", hi: "भैया, ज्यादा तीखा मत बनाना, कम मिर्च रखना।", mr: "दादा, जास्त तिखट करू नका, कमी तिखट ठेवा.", pronHi: "Bhaiya, zyada teekha mat banana, kam mirch rakhna.", pronMr: "Dada, jaast tikhat karu naka, kami tikhat theva." },
            { en: "Is this pure veg (no eggs / meat)?", hi: "ये प्योर वेज है ना? इसमें अंडा या मीट तो नहीं है?", mr: "हे पूर्ण शाकाहारी (व्हेज) आहे ना? यात अंडी किंवा मटण नाही ना?", pronHi: "Yeh pure veg hai na? Isme anda ya meat toh nahi hai?", pronMr: "He poorna shakahari aahe na? Yaat andi kiva meat naahi na?" },
            { en: "Bhaiya, the bill please.", hi: "भैया, बिल देना / कितने पैसे हुए?", mr: "दादा, बिल द्या / किती झाले?", pronHi: "Bhaiya, bill dena / kitne paise hue?", pronMr: "Dada, bill dya / kiti jhaale?" },
            { en: "Please bring a bottle of mineral water.", hi: "एक बोतल मिनरल वाटर (पानी) देना।", mr: "एक बाटली मिनरल वॉटर (पाणी) द्या.", pronHi: "Ek botal mineral water dena.", pronMr: "Ek baatli mineral water dya." }
        ],
        shopping: [
            { en: "How much does this cost?", hi: "भैया, ये कितने का है?", mr: "दादा, हे किती रुपयांचे आहे?", pronHi: "Bhaiya, yeh kitne ka hai?", pronMr: "Dada, he kiti rupyanche aahe?" },
            { en: "Can you give a little discount?", hi: "थोड़ा कम कर दीजिए ना / कुछ डिस्काउंट मिलेगा?", mr: "थोडे कमी करा ना / काही डिस्काउंट मिळेल का?", pronHi: "Thoda kam kar dijiye na / discount milega?", pronMr: "Thode kami kara na / discount milel ka?" },
            { en: "Do you accept online UPI (GPay/PhonePe)?", hi: "ऑनलाइन पेमेंट / UPI (GPay, PhonePe, Paytm) चलेगा?", mr: "ऑनलाइन पेमेंट / UPI (GPay, PhonePe) चालेल का?", pronHi: "Online payment / UPI chalega?", pronMr: "Online payment / UPI chaalel ka?" }
        ]
    };

    const langCodeMap = {
        "English": "en", "Hindi": "hi", "Marathi": "mr", "Gujarati": "gu", "Tamil": "ta", "Bengali": "bn", "Spanish": "es", "French": "fr", "German": "de", "Japanese": "ja", "Russian": "ru", "Arabic": "ar"
    };

    const comprehensiveDict = {
        "police station": { hi: "पुलिस स्टेशन (थाना)", mr: "पोलीस ठाणे", pronHi: "Police Station (Thana)", pronMr: "Police Thane" },
        "police booth": { hi: "पुलिस चौकी / बूथ", mr: "पोलीस चौकी", pronHi: "Police Chowki", pronMr: "Police Chowki" },
        "police": { hi: "पुलिस", mr: "पोलीस", pronHi: "Police", pronMr: "Police" },
        "hospital": { hi: "अस्पताल (हॉस्पिटल)", mr: "रुग्णालय (हॉस्पिटल)", pronHi: "Aspatal (Hospital)", pronMr: "Rugnaalay (Hospital)" },
        "pharmacy": { hi: "दवा की दुकान (मेडिकल स्टोर)", mr: "औषध दुकान (मेडिकल स्टोअर)", pronHi: "Dawai ki dukan (Medical Store)", pronMr: "Aushadh dukan (Medical Store)" },
        "medical store": { hi: "मेडिकल स्टोर", mr: "मेडिकल स्टोअर", pronHi: "Medical Store", pronMr: "Medical Store" },
        "medicine": { hi: "दवाई", mr: "औषध", pronHi: "Dawai", pronMr: "Aushadh" },
        "doctor": { hi: "डॉक्टर", mr: "डॉक्टर", pronHi: "Doctor", pronMr: "Doctor" },
        "hotel": { hi: "होटल", mr: "हॉटेल", pronHi: "Hotel", pronMr: "Hotel" },
        "room": { hi: "कमरा / रूम", mr: "खोली / रूम", pronHi: "Kamra / Room", pronMr: "Kholi / Room" },
        "toilet": { hi: "शौचालय (वॉशरूम)", mr: "शौचालय (वॉशरूम)", pronHi: "Shauchalay (Washroom)", pronMr: "Shauchalay (Washroom)" },
        "washroom": { hi: "वॉशरूम (शौचालय)", mr: "वॉशरूम (शौचालय)", pronHi: "Washroom (Shauchalay)", pronMr: "Washroom (Shauchalay)" },
        "restroom": { hi: "वॉशरूम / शौचालय", mr: "वॉशरूम / शौचालय", pronHi: "Washroom", pronMr: "Washroom" },
        "atm": { hi: "ATM मशीन", mr: "ATM मशीन", pronHi: "ATM Machine", pronMr: "ATM Machine" },
        "bank": { hi: "बैंक", mr: "बँक", pronHi: "Bank", pronMr: "Bank" },
        "airport": { hi: "एयरपोर्ट (हवाई अड्डा)", mr: "एअरपोर्ट (विमानतळ)", pronHi: "Airport (Hawai Adda)", pronMr: "Airport (Vimantal)" },
        "railway station": { hi: "रेलवे स्टेशन", mr: "रेल्वे स्टेशन", pronHi: "Railway Station", pronMr: "Railway Station" },
        "train station": { hi: "रेलवे स्टेशन", mr: "रेल्वे स्टेशन", pronHi: "Railway Station", pronMr: "Railway Station" },
        "train": { hi: "ट्रेन / लोकल", mr: "ट्रेन / लोकल", pronHi: "Train / Local", pronMr: "Train / Local" },
        "metro station": { hi: "मेट्रो स्टेशन", mr: "मेट्रो स्टेशन", pronHi: "Metro Station", pronMr: "Metro Station" },
        "metro": { hi: "मेट्रो", mr: "मेट्रो", pronHi: "Metro", pronMr: "Metro" },
        "bus stand": { hi: "बस स्टैंड / स्टॉप", mr: "बस स्टँड / थांबा", pronHi: "Bus Stand / Stop", pronMr: "Bus Stand" },
        "bus stop": { hi: "बस स्टॉप", mr: "बस थांबा", pronHi: "Bus Stop", pronMr: "Bus Stop" },
        "bus": { hi: "बस", mr: "बस", pronHi: "Bus", pronMr: "Bus" },
        "taxi stand": { hi: "टैक्सी स्टैंड", mr: "टॅक्सी स्टँड", pronHi: "Taxi Stand", pronMr: "Taxi Stand" },
        "taxi": { hi: "टैक्सी / कैब", mr: "टॅक्सी / कॅब", pronHi: "Taxi", pronMr: "Taxi" },
        "cab": { hi: "कैब / टैक्सी", mr: "कॅब / टॅक्सी", pronHi: "Cab / Taxi", pronMr: "Cab / Taxi" },
        "auto": { hi: "ऑटो रिक्शा", mr: "रिक्षा / ऑटो", pronHi: "Auto Rickshaw", pronMr: "Rickshaw" },
        "rickshaw": { hi: "रिक्शा", mr: "रिक्षा", pronHi: "Rickshaw", pronMr: "Rickshaw" },
        "station": { hi: "स्टेशन", mr: "स्टेशन", pronHi: "Station", pronMr: "Station" },
        "beach": { hi: "समुद्र तट / बीच (जैसे चौपाटी)", mr: "समुद्रकिनारा / बीच", pronHi: "Beach / Chowpatty", pronMr: "Samudrakinara / Beach" },
        "market": { hi: "मार्केट / बाज़ार", mr: "मार्केट / बाजार", pronHi: "Market / Bazaar", pronMr: "Market / Bazaar" },
        "water": { hi: "पानी / मिनरल वाटर", mr: "पाणी / मिनरल वॉटर", pronHi: "Paani", pronMr: "Paani" },
        "food": { hi: "खाना / भोजन", mr: "जेवण / खाणे", pronHi: "Khaana", pronMr: "Jevan" },
        "tea": { hi: "चाय", mr: "चहा", pronHi: "Chai", pronMr: "Chaha" },
        "coffee": { hi: "कॉफ़ी", mr: "कॉफी", pronHi: "Coffee", pronMr: "Coffee" },
        "bill": { hi: "बिल / कितने पैसे हुए", mr: "बिल / किती झाले", pronHi: "Bill / Kitne paise hue", pronMr: "Bill / Kiti jhaale" },
        "how much": { hi: "कितने का है? / कितना हुआ?", mr: "किती रुपयांचे आहे? / किती झाले?", pronHi: "Kitne ka hai?", pronMr: "Kiti rupyanche aahe?" },
        "price": { hi: "कीमत / कितने का है", mr: "किंमत / कितीचे आहे", pronHi: "Keemat / Kitne ka hai", pronMr: "Kimmat / Kitiche aahe" },
        "discount": { hi: "डिस्काउंट / थोड़ा कम कीजिए", mr: "सवलत / थोडे कमी करा", pronHi: "Discount / Thoda kam kijiye", pronMr: "Discount / Thode kami kara" },
        "money": { hi: "पैसे / रुपये", mr: "पैसे / रुपये", pronHi: "Paise / Rupaye", pronMr: "Paise / Rupaye" },
        "cash": { hi: "नकद / कैश", mr: "रोख / कॅश", pronHi: "Nakad / Cash", pronMr: "Rokh / Cash" },
        "card": { hi: "कार्ड चलेगा?", mr: "कार्ड चालेल का?", pronHi: "Card chalega?", pronMr: "Card chaalel ka?" },
        "upi": { hi: "UPI / ऑनलाइन पेमेंट चलेगा?", mr: "UPI / ऑनलाइन पेमेंट चालेल का?", pronHi: "UPI chalega?", pronMr: "UPI chaalel ka?" },
        "hi": { hi: "नमस्ते", mr: "नमस्कार", pronHi: "Namaste", pronMr: "Namaskar" },
        "hello": { hi: "नमस्ते", mr: "नमस्कार", pronHi: "Namaste", pronMr: "Namaskar" },
        "hey": { hi: "नमस्ते / हैलो", mr: "नमस्कार / हॅलो", pronHi: "Namaste / Hello", pronMr: "Namaskar / Hello" },
        "how are you": { hi: "आप कैसे हैं?", mr: "तुम्ही कसे आहात?", pronHi: "Aap kaise hain?", pronMr: "Tumhi kase aahaat?" },
        "how are u": { hi: "आप कैसे हैं?", mr: "तुम्ही कसे आहात?", pronHi: "Aap kaise hain?", pronMr: "Tumhi kase aahaat?" },
        "i am fine": { hi: "मैं ठीक हूँ", mr: "मी ठीक आहे", pronHi: "Main theek hoon", pronMr: "Mee theek aahe" },
        "what is your name": { hi: "आपका नाम क्या है?", mr: "तुमचे नाव काय आहे?", pronHi: "Aapka naam kya hai?", pronMr: "Tumche naav kaay aahe?" },
        "my name is": { hi: "मेरा नाम ... है", mr: "माझे नाव ... आहे", pronHi: "Mera naam ... hai", pronMr: "Maajhe naav ... aahe" },
        "thank you": { hi: "धन्यवाद / थैंक यू", mr: "धन्यवाद / थँक्यू", pronHi: "Dhanyawad / Thank you", pronMr: "Dhanyawad / Thank you" },
        "thanks": { hi: "धन्यवाद", mr: "धन्यवाद", pronHi: "Dhanyawad", pronMr: "Dhanyawad" },
        "please": { hi: "कृपया / प्लीज", mr: "कृपया / प्लीज", pronHi: "Krupaya / Please", pronMr: "Krupaya / Please" },
        "yes": { hi: "हाँ", mr: "हो", pronHi: "Haan", pronMr: "Ho" },
        "no": { hi: "नहीं", mr: "नाही", pronHi: "Nahi", pronMr: "Naahi" },
        "okay": { hi: "ठीक है", mr: "ठीक आहे", pronHi: "Theek hai", pronMr: "Theek aahe" },
        "ok": { hi: "ठीक है", mr: "ठीक आहे", pronHi: "Theek hai", pronMr: "Theek aahe" },
        "help": { hi: "मदद कीजिए / हेल्प", mr: "मदत करा", pronHi: "Madad kijiye", pronMr: "Madat kara" },
        "emergency": { hi: "आपातकालीन स्थिति / इमरजेंसी", mr: "आपत्कालीन प्रसंग", pronHi: "Aapatkaleen sthiti", pronMr: "Aapatkaleen prasang" },
        "good morning": { hi: "शुभ प्रभात / नमस्ते", mr: "शुभ सकाळ / नमस्कार", pronHi: "Shubh Prabhat / Namaste", pronMr: "Shubh Sakaal / Namaskar" },
        "good evening": { hi: "शुभ संध्या / नमस्ते", mr: "शुभ संध्याकाळ / नमस्कार", pronHi: "Shubh Sandhya", pronMr: "Shubh Sandhyakaal" },
        "good night": { hi: "शुभ रात्रि", mr: "शुभ रात्री", pronHi: "Shubh Raatri", pronMr: "Shubh Raatri" },
        "bye": { hi: "अलविदा / फिर मिलेंगे", mr: "पुन्हा भेटू / नमस्कार", pronHi: "Alvida / Phir milenge", pronMr: "Poonha bhetu" },
        "goodbye": { hi: "अलविदा / नमस्ते", mr: "पुन्हा भेटू / नमस्कार", pronHi: "Alvida / Namaste", pronMr: "Poonha bhetu" },
        "sorry": { hi: "माफ़ कीजिए", mr: "माफ करा", pronHi: "Maaf kijiye", pronMr: "Maaf kara" },
        "excuse me": { hi: "सुनिए / माफ़ कीजिए", mr: "ऐका / माफ करा", pronHi: "Suniye / Maaf kijiye", pronMr: "Aika / Maaf kara" },
        "stop": { hi: "रोकिए / रुकिए", mr: "थांबवा / थांबा", pronHi: "Rokiye / Rukiye", pronMr: "Thaambwa / Thaamba" },
        "left": { hi: "बाएँ (लेफ्ट)", mr: "डावीकडे (लेफ्ट)", pronHi: "Baayein (Left)", pronMr: "Daavikade (Left)" },
        "right": { hi: "दाएँ (राइट)", mr: "उजवीकडे (राइट)", pronHi: "Daayein (Right)", pronMr: "Ujavikade (Right)" },
        "straight": { hi: "सीधे (स्ट्रेट)", mr: "सरळ (स्ट्रेट)", pronHi: "Seedhe (Straight)", pronMr: "Saral (Straight)" }
    };

    const getLocalWord = (word, target = "Hindi") => {
        const w = (word || "").toLowerCase().trim();
        const isMr = target === "Marathi";

        if (comprehensiveDict[w]) {
            return {
                text: isMr ? comprehensiveDict[w].mr : comprehensiveDict[w].hi,
                pron: isMr ? comprehensiveDict[w].pronMr : comprehensiveDict[w].pronHi,
                matched: true
            };
        }
        return { text: word, pron: word, matched: false };
    };

    const translateViaLocalEngine = (text, target) => {
        const lower = (text || "").toLowerCase().trim().replace(/[?!.,]/g, '');
        const isMr = target === "Marathi";

        // 1. Exact Phrasebook Match (Strict equality only - NO substring collisions)
        for (let cat in phrasebook) {
            const hit = phrasebook[cat].find(p => p.en.toLowerCase().replace(/[?!.,]/g, '').trim() === lower);
            if (hit) {
                return {
                    translated: isMr ? (hit.mr || hit.hi) : hit.hi,
                    phonetic: isMr ? (hit.pronMr || hit.pronHi) : hit.pronHi,
                    isDirect: true
                };
            }
        }

        // 2. Direct dictionary / phrase match
        if (comprehensiveDict[lower]) {
            return {
                translated: isMr ? comprehensiveDict[lower].mr : comprehensiveDict[lower].hi,
                phonetic: isMr ? comprehensiveDict[lower].pronMr : comprehensiveDict[lower].pronHi,
                isDirect: true
            };
        }

        // 3. Location Question Intent (where is ... / is there a ... nearby)
        const whereMatch = lower.match(/(?:where is|where are|where can i find|is there)\s+(?:the\s+|a\s+|an\s+)?(.+)/i);
        if (whereMatch) {
            const subjectRaw = whereMatch[1].trim();
            const isNearest = /\b(nearest|closest)\b/i.test(subjectRaw) || /\b(nearest|closest)\b/i.test(lower);
            const isNear = /\b(near|nearby|near by)\b/i.test(subjectRaw) || /\b(near|nearby|near by)\b/i.test(lower) || isNearest;
            const cleanSub = subjectRaw.replace(/\b(nearest|closest|near|nearby|near by|the|a|an)\b/gi, '').trim();

            let matchedObj = null;
            for (let k of Object.keys(comprehensiveDict).sort((a, b) => b.length - a.length)) {
                if (cleanSub.includes(k) || k.includes(cleanSub)) {
                    matchedObj = comprehensiveDict[k];
                    break;
                }
            }

            const targetName = matchedObj ? (isMr ? matchedObj.mr : matchedObj.hi) : cleanSub;
            const targetPron = matchedObj ? (isMr ? matchedObj.pronMr : matchedObj.pronHi) : cleanSub;

            if (isMr) {
                const prefix = isNearest ? "जवळचे सर्वात जवळचे " : (isNear ? "जवळचे " : "");
                const pronPrefix = isNearest ? "Javalche sarvaat javalche " : (isNear ? "Javalche " : "");
                return {
                    translated: `${prefix}${targetName} कुठे आहे?`,
                    phonetic: `${pronPrefix}${targetPron} kuthe aahe?`,
                    isDirect: true
                };
            } else {
                const prefix = isNearest ? "पास में सबसे नजदीकी " : (isNear ? "पास में " : "");
                const pronPrefix = isNearest ? "Paas mein sabse nazdeeki " : (isNear ? "Paas mein " : "");
                return {
                    translated: `${prefix}${targetName} कहाँ है?`,
                    phonetic: `${pronPrefix}${targetPron} kahan hai?`,
                    isDirect: true
                };
            }
        }

        // 4. Direction & Travel Intent (take me to / i want to go to / how to reach)
        const gotoMatch = lower.match(/(?:i want to go to|take me to|i need to reach|how to go to|how to reach)\s+(?:the\s+|a\s+|an\s+)?(.+)/i);
        if (gotoMatch) {
            const subjectRaw = gotoMatch[1].trim();
            const isNear = /\b(near|nearby|near by)\b/i.test(subjectRaw);
            const cleanSub = subjectRaw.replace(/\b(nearest|closest|near|nearby|near by|the|a|an)\b/gi, '').trim();

            let matchedObj = null;
            for (let k of Object.keys(comprehensiveDict).sort((a, b) => b.length - a.length)) {
                if (cleanSub.includes(k) || k.includes(cleanSub)) {
                    matchedObj = comprehensiveDict[k];
                    break;
                }
            }

            const targetName = matchedObj ? (isMr ? matchedObj.mr : matchedObj.hi) : cleanSub;
            const targetPron = matchedObj ? (isMr ? matchedObj.pronMr : matchedObj.pronHi) : cleanSub;

            if (isMr) {
                return {
                    translated: `दादा, मला ${isNear ? 'जवळच्या ' : ''}${targetName} ला घेऊन चला.`,
                    phonetic: `Dada, mala ${isNear ? 'javalchya ' : ''}${targetPron} la gheun chala.`,
                    isDirect: true
                };
            } else {
                return {
                    translated: `भैया, मुझे ${isNear ? 'पास के ' : ''}${targetName} ले चलिए / छोड़ दीजिए।`,
                    phonetic: `Bhaiya, mujhe ${isNear ? 'paas ke ' : ''}${targetPron} le chaliye.`,
                    isDirect: true
                };
            }
        }

        // 5. Pricing & Shopping Intent (how much is ... / what is the price of ...)
        const priceMatch = lower.match(/(?:how much is|how much for|what is the price of|what is the cost of)\s+(?:the\s+|a\s+|an\s+)?(.+)/i);
        if (priceMatch || lower.includes("how much")) {
            const itemRaw = priceMatch ? priceMatch[1].trim() : "this";
            const cleanItem = itemRaw.replace(/\b(the|a|an)\b/gi, '').trim();

            let matchedObj = null;
            for (let k of Object.keys(comprehensiveDict).sort((a, b) => b.length - a.length)) {
                if (cleanItem.includes(k) || k.includes(cleanItem)) {
                    matchedObj = comprehensiveDict[k];
                    break;
                }
            }

            const targetName = matchedObj ? (isMr ? matchedObj.mr : matchedObj.hi) : (cleanItem === "this" ? (isMr ? "हे" : "ये") : cleanItem);
            const targetPron = matchedObj ? (isMr ? matchedObj.pronMr : matchedObj.pronHi) : (cleanItem === "this" ? "yeh" : cleanItem);

            if (isMr) {
                return {
                    translated: `दादा, ${targetName} किती रुपयांचे आहे? / किती झाले?`,
                    phonetic: `Dada, ${targetPron} kiti rupyanche aahe?`,
                    isDirect: true
                };
            } else {
                return {
                    translated: `भैया, ${targetName} कितने का है?`,
                    phonetic: `Bhaiya, ${targetPron} kitne ka hai?`,
                    isDirect: true
                };
            }
        }

        // 6. Word-by-word synthesis with phonetics
        const words = lower.split(/\s+/);
        const outWords = [];
        const pronWords = [];
        let anyMatched = false;
        for (let w of words) {
            const cleaned = w.replace(/[^a-zA-Z0-9]/g, '');
            const obj = getLocalWord(cleaned, target);
            outWords.push(obj.text);
            pronWords.push(obj.pron);
            if (obj.matched) anyMatched = true;
        }

        return {
            translated: outWords.join(' '),
            phonetic: pronWords.join(' '),
            isDirect: anyMatched
        };
    };

    const makeNaturalHindustani = (text, target = "Hindi") => {
        if (!text) return "";
        if (target === "Marathi") {
            return text
                .replace(/रुग्णालय/g, 'रुग्णालय (हॉस्पिटल)')
                .replace(/वैद्य/g, 'डॉक्टर')
                .replace(/औषधालय/g, 'मेडिकल स्टोर')
                .replace(/आरक्षक/g, 'पोलीस')
                .replace(/स्थानक/g, 'स्टेशन')
                .replace(/विमानतळ/g, 'विमानतळ (एअरपोर्ट)')
                .replace(/कृपया मला/g, 'दादा मला');
        }
        return text
            .replace(/चिकित्सालय/g, 'अस्पताल (हॉस्पिटल)')
            .replace(/चिकित्सक/g, 'डॉक्टर')
            .replace(/औषधालय/g, 'मेडिकल स्टोर')
            .replace(/आरक्षी/g, 'पुलिस')
            .replace(/स्थानक/g, 'स्टेशन')
            .replace(/मूल्य क्या है/g, 'कितने का है')
            .replace(/कृपया मुझे/g, 'भैया मुझे')
            .replace(/धन्यवाद सहित/g, 'धन्यवाद');
    };

        // Helper: Calculate distance in kilometers using Haversine formula
    function calculateDistanceKm(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return 9999;
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    function formatDistance(distKm) {
        if (distKm === null || distKm === undefined || isNaN(distKm)) return "";
        if (distKm < 1) {
            return Math.round(distKm * 1000) + " m away";
        }
        return distKm.toFixed(1) + " km away";
    }

    function estimateTravelTime(distKm) {
        if (distKm < 0.5) return "~5 min walk";
        if (distKm < 1.2) return "~12 min walk • 3 min cab";
        if (distKm < 3) return "~7 min cab • 25 min walk";
        if (distKm < 8) return "~15-20 min cab";
        if (distKm < 20) return "~35-45 min drive";
        return `~${Math.round(distKm * 2)} min drive`;
    }

    // Master Tourist Places Registry with deep summaries, timings, fee, highlights, and GPS coords
    const MASTER_TOURIST_PLACES = [
        // =========================================================================
        // NAVI MUMBAI & NEARBY (NERUL, SARSOLE, SEAWOODS, BELAPUR, KHARGHAR, VASHI)
        // =========================================================================
        {
            id: "nm-flamingo",
            city: "Navi Mumbai",
            area: "Nerul / TS Chanakya",
            name: "Flamingo Sanctuary & Coastal Mangrove Boardwalk",
            type: "Coastal Wetland & Migratory Flamingo Sanctuary",
            rating: 4.8,
            reviews: "16,400+",
            safetyScore: 9.9,
            lat: 19.0250,
            lng: 73.0150,
            timings: "06:00 AM – 06:30 PM (Daily)",
            openStatus: "Open 06:00 AM - 6:30 PM",
            fee: "Free Public Access",
            duration: "1.5 to 2 Hours",
            bestTime: "Early Morning (06:30 AM – 09:00 AM) or Sunset (05:00 PM – 06:30 PM)",
            image: "./images/navi_mumbai_flamingos.jpg",
            desc: "World-renowned wetland reserve hosting thousands of migratory pink flamingos and scenic birdwatching trails along Thane Creek.",
            fullSummary: "Located in Nerul along the Thane Creek coastline just minutes from Sarsole Village, the TS Chanakya and Nerul Wetlands are world-renowned for hosting hundreds of thousands of migratory pink flamingos every winter and spring. The lush mangrove ecosystem and tidal mudflats offer a serene escape from city bustle.\n\nNature lovers, families, and wildlife photographers visit from all over India with binoculars and telephoto lenses to observe the flamingos feeding in synchrony against the backdrop of the Palm Beach Road skyline. The morning sunlight reflecting off the calm coastal waters filled with thousands of pink wings is an unforgettable spectacle.",
            highlights: [
                "Witness thousands of migratory pink greater and lesser flamingos in flight",
                "Walk along the peaceful marine mangrove boardwalk trails",
                "Birdwatching sanctuary hosting over 80 species of migratory wetland birds",
                "Scenic sunrise and sunset photography over the coastal creek"
            ],
            safetyNotes: "Patrolled wetland corridor with marked observation tracks and forest department checkpoints.",
            visitorTips: "Carry binoculars and telephoto camera lenses for prime wildlife photography; morning low tides offer the best sightings."
        },
        {
            id: "nm-jewel",
            city: "Navi Mumbai",
            area: "Nerul / Seawoods",
            name: "Jewel of Navi Mumbai",
            type: "Scenic Lakefront Promenade & Ecological Park",
            rating: 4.7,
            reviews: "19,200+",
            safetyScore: 9.9,
            lat: 19.0270,
            lng: 73.0230,
            timings: "05:30 AM – 10:00 PM (Open 7 Days)",
            openStatus: "Open 05:30 AM - 10 PM",
            fee: "Free Public Entry",
            duration: "1.5 Hours",
            bestTime: "Evening 05:30 PM – 08:30 PM (Cool lake breeze & illuminated track)",
            image: "./images/jewel_navi_mumbai.jpg",
            desc: "Navi Mumbai's premier 2.6-kilometer lake promenade along Palm Beach Road featuring scenic green islands and jogging tracks.",
            fullSummary: "Developed around a vast natural lake along the iconic Palm Beach Road corridor, Jewel of Navi Mumbai is the city's premier open-air leisure and fitness landmark. The park boasts a wide, smoothly paved 2.6 km pedestrian walkway encircling the freshwater lake, landscaped lawns, open-air fitness zones, and tranquil shaded seating gazebos.\n\nWaterbirds flock to the center island while cooling sea breezes sweep across from the creek. At twilight, modern LED illumination turns the water's edge into a safe, lively promenade for evening walks, family relaxation, and fitness.",
            highlights: [
                "Stroll or jog along the 2.6 km continuous track encircling the lake",
                "Relax on comfortable stone benches overlooking peaceful waters and green islands",
                "Enjoy outdoor fitness equipment, meditation gazebos, and children's play areas",
                "Experience refreshing evening lake breezes along Palm Beach Road"
            ],
            safetyNotes: "Continuous municipal security presence, clean paved walkways, and bright floodlighting after sunset.",
            visitorTips: "Evening walks between 6:00 PM and 8:00 PM are particularly pleasant with cool breezes and vibrant local ambiance."
        },
        {
            id: "nm-wonderspark",
            city: "Navi Mumbai",
            area: "Nerul",
            name: "Wonders Park & Nerul Lake",
            type: "Themed Heritage & Family Leisure Park",
            rating: 4.6,
            reviews: "24,000+",
            safetyScore: 9.8,
            lat: 19.0340,
            lng: 73.0370,
            timings: "06:00 AM – 12:00 PM & 03:00 PM – 09:00 PM (Closed Mondays)",
            openStatus: "Open 03:00 PM - 9:00 PM",
            fee: "₹35 (Adults), ₹25 (Children)",
            duration: "2 to 3 Hours",
            bestTime: "04:30 PM – 08:00 PM (Pleasant weather & musical fountains)",
            image: "./images/wonders_park_nerul.jpg",
            desc: "Sprawling 30-acre park featuring life-size replicas of the Seven Wonders of the World, a toy train, and musical fountains.",
            fullSummary: "Spanning over 30 acres in Nerul, Wonders Park is one of the premier amusement and leisure parks in the Mumbai metropolitan region. Its centerpiece is an exquisite collection of life-size replicas of the Seven Wonders of the World, including the Taj Mahal, Great Pyramid of Giza, Eiffel Tower, Colosseum, and Leaning Tower of Pisa.\n\nThe park also features an artificial lake with a scenic toy train circuit, children's amusement rides, open-air amphitheaters for cultural events, and high-tech musical dancing laser fountains that light up after sundown.",
            highlights: [
                "Marvel at life-size replicas of the Seven Wonders of the World",
                "Ride the scenic toy train encircling the landscaped gardens and lake",
                "Enjoy the colorful musical dancing laser fountain show at dusk",
                "Spacious amphitheater hosting cultural events and family weekend activities"
            ],
            safetyNotes: "CCTV surveillance, entry ticket screening, on-site first aid desk, and dedicated park attendants.",
            visitorTips: "Visit late afternoon to explore the replica monuments in daylight and enjoy the musical fountain show at dusk."
        },
        {
            id: "nm-parsikhill",
            city: "Navi Mumbai",
            area: "CBD Belapur",
            name: "Parsik Hill & Sunset Viewpoint",
            type: "Hilltop Scenic Lookout & Green Retreat",
            rating: 4.8,
            reviews: "13,500+",
            safetyScore: 9.8,
            lat: 19.0190,
            lng: 73.0420,
            timings: "Open 24 Hours (Best 06:00 AM – 08:30 PM)",
            openStatus: "Open 24 Hours",
            fee: "Free Public Access",
            duration: "1 to 2 Hours",
            bestTime: "05:30 PM – 07:15 PM (Sunset over the creek and skyline)",
            image: "./images/parsik_hill_sunset.jpg",
            desc: "Elevated hilltop offering panoramic 360-degree vistas across Navi Mumbai, the creek wetlands, and Western Ghats ridges.",
            fullSummary: "Rising steeply above CBD Belapur, Parsik Hill is an upscale, verdant residential hill elevated 150 meters above sea level. It provides the finest bird's-eye views in Navi Mumbai, looking out across the vast Thane Creek wetlands, Palm Beach corridor, and the rugged Sahyadri mountain ranges in the distance.\n\nThe winding uphill roads are flanked by lush green trees, upscale villas, and peaceful lookouts. It is a favored sanctuary for nature lovers, morning cyclists, and travelers seeking cool hilltop breezes and golden sunsets.",
            highlights: [
                "Catch sweeping 360-degree panoramic views of Navi Mumbai and the Arabian Sea creek",
                "Enjoy fresh hilltop breezes and lush greenery along scenic winding roads",
                "Watch the sun dip below the creek horizon as city lights illuminate",
                "Visit the scenic lookouts near the Mayor's bungalow and peaceful gardens"
            ],
            safetyNotes: "Quiet residential hill with 24/7 beat police patrols and illuminated street corridors.",
            visitorTips: "Great for scenic evening drives; carry a camera for sunset cityscapes."
        },
        {
            id: "nm-belapurfort",
            city: "Navi Mumbai",
            area: "CBD Belapur",
            name: "Historic Belapur Fort (1560 AD)",
            type: "16th-Century Portuguese & Maratha Coastal Fort",
            rating: 4.5,
            reviews: "8,900+",
            safetyScore: 9.7,
            lat: 19.0060,
            lng: 73.0370,
            timings: "06:00 AM – 07:00 PM (Daily)",
            openStatus: "Open 06:00 AM - 7 PM",
            fee: "Free Public Entry",
            duration: "1.5 Hours",
            bestTime: "Morning 07:00 AM – 10:00 AM",
            image: "./images/belapur_fort_historic.jpg",
            desc: "Historic 16th-century stone fortress perched on a hillock overlooking Panvel Creek, with restored bastions and ramparts.",
            fullSummary: "Originally constructed in 1560 by the Siddis of Janjira and subsequently captured by the Portuguese and later by Maratha warrior Chimaji Appa in 1737, Belapur Fort was strategically positioned atop a hillock guarding the entrance to Panvel Creek.\n\nMaharashtra Tourism and the archaeological department have restored its ancient laterite bastions, defensive stone walls, and arched gateways. Visitors can walk along the historical ramparts while learning about the maritime battles that shaped the Mumbai coastline.",
            highlights: [
                "Explore authentic stone bastions captured by Maratha Sardar Chimaji Appa",
                "Walk along restored 16th-century ramparts overlooking the Panvel Creek mouth",
                "Panoramic watchtower views across the creek waters and mangrove forests",
                "Peaceful heritage walking trail with informative archaeological signboards"
            ],
            safetyNotes: "Restored archaeological site with stone pathways, safety railings, and daytime guards.",
            visitorTips: "Wear comfortable walking shoes for the gentle stone stairs and elevated ramparts."
        },
        {
            id: "nm-centralpark",
            city: "Navi Mumbai",
            area: "Kharghar",
            name: "Kharghar Central Park & ISKCON Temple",
            type: "Asia's Largest Urban Botanical Park & Grand Vedic Temple",
            rating: 4.8,
            reviews: "36,000+",
            safetyScore: 9.9,
            lat: 19.0550,
            lng: 73.0720,
            timings: "Central Park: 06:00 AM – 09:00 AM & 04:00 PM – 08:00 PM | ISKCON: 04:30 AM – 08:30 PM",
            openStatus: "Open 04:00 PM - 8:00 PM",
            fee: "Free Entry",
            duration: "2 to 3 Hours",
            bestTime: "04:30 PM – 07:30 PM",
            image: "./images/kharghar_central_park.jpg",
            desc: "Magnificent 80-hectare botanical park modeled after London's Hyde Park, paired with the grand Makrana marble ISKCON temple.",
            fullSummary: "Modeled after Hyde Park in London and Central Park in New York, Kharghar Central Park spans over 80 hectares of landscaped botanical gardens, jogger tracks, musical ponds, amphitheaters, and open lawns set against the stunning backdrop of the Kharghar Hills.\n\nAdjacent to the park stands the majestic ISKCON Sri Sri Radha Madanmohanji Temple ('Glory of Maharashtra'), an awe-inspiring Vedic temple constructed from pure white Makrana marble. Visitors can stroll through the gardens and experience uplifting evening kirtans and traditional prasadam.",
            highlights: [
                "Stroll through 80 hectares of manicured gardens, theme parks, and water bodies",
                "Visit the monumental marble ISKCON Glory of Maharashtra temple complex",
                "Jog along winding landscaped tree-canopied trails and botanical groves",
                "Enjoy peaceful evening spiritual atmosphere and sattvic vegetarian dining"
            ],
            safetyNotes: "24/7 security marshals, extensive CCTV surveillance, and designated family zones.",
            visitorTips: "Evenings are lively and cool; modest clothing recommended for the temple sanctum."
        },
        {
            id: "nm-pandavkada",
            city: "Navi Mumbai",
            area: "Kharghar Hills",
            name: "Pandavkada Waterfalls & Caves",
            type: "107-Meter Plunge Waterfall & Historic Caves",
            rating: 4.6,
            reviews: "21,000+",
            safetyScore: 9.6,
            lat: 19.0680,
            lng: 73.0850,
            timings: "08:00 AM – 05:00 PM (Monsoon/Post-Monsoon)",
            openStatus: "Open 08:00 AM - 5 PM",
            fee: "₹50 Forest Dept Eco-Tariff",
            duration: "2 to 3 Hours",
            bestTime: "July to November (Peak waterfall flow & lush mist)",
            image: "./images/pandavkada_waterfalls.jpg",
            desc: "Spectacular 107-meter plunge waterfall nestled in the lush Kharghar Sahyadri hills, famous for ancient Buddhist rock shelters.",
            fullSummary: "Plunging from a sheer cliff height of 107 meters in the Kharghar Hills, Pandavkada Waterfall is an awe-inspiring natural wonder in the Mumbai metropolitan area. Local legend holds that the Pandava brothers bathed beneath these cascading waters during their exile.\n\nSurrounded by emerald Sahyadri hills, mist, and mountain streams, the area features ancient Buddhist rock-cut caves and serene rocky trails that attract trekkers and nature enthusiasts during and after the monsoon season.",
            highlights: [
                "Watch the roaring 107-meter natural waterfall plunge into the rock basin",
                "Explore ancient rock shelters and forested foothill paths",
                "Trek through green Sahyadri hills with cascading mountain streams",
                "Forest department security post and regulated eco-tourism zone"
            ],
            safetyNotes: "Forest police post on duty; swimming directly under the plunge pool is restricted for visitor safety.",
            visitorTips: "Wear sturdy trekking shoes with good grip; visiting between August and November provides peak waterfall volume."
        },
        {
            id: "nm-sagarvihar",
            city: "Navi Mumbai",
            area: "Vashi",
            name: "Sagar Vihar Waterfront & Sunset Garden",
            type: "Marine Promenade & Sunset Park",
            rating: 4.6,
            reviews: "17,200+",
            safetyScore: 9.8,
            lat: 19.0710,
            lng: 72.9920,
            timings: "05:30 AM – 10:00 PM (Daily)",
            openStatus: "Open 05:30 AM - 10 PM",
            fee: "Free Public Entry",
            duration: "1.5 Hours",
            bestTime: "Sunset 05:30 PM – 07:30 PM",
            image: "./images/sagar_vihar_vashi.jpg",
            desc: "Tranquil coastal waterfront promenade in Vashi with views across Thane Creek to the Mumbai skyline and sunset gardens.",
            fullSummary: "Situated at the western edge of Vashi facing the serene waters of Thane Creek, Sagar Vihar is a cherished coastal sanctuary. Lined with mature shade trees, blooming bougainvillea, and a stone coastal promenade, it offers sweeping views across the creek waters toward the Mumbai island skyline.\n\nVisitors gather in the evenings to enjoy the sea breeze, watch waterbirds and local fishing boats sail at dusk, and enjoy local snacks like cutting chai and sev puri from authorized vendors.",
            highlights: [
                "Relax along the tranquil marine promenade overlooking Thane Creek",
                "Enjoy wide green gardens with gentle sea breezes and open gazebos",
                "Watch fishing boats and migratory coastal birds glide at dusk",
                "Sample fresh local street delicacies including hot tea and Mumbai chaat"
            ],
            safetyNotes: "Well-illuminated park with municipal guards and continuous pedestrian presence.",
            visitorTips: "Sunset between 6:00 PM and 7:15 PM is the best time to visit for scenic photography."
        },

        // =========================================================================
        // MUMBAI CITY LANDMARKS
        // =========================================================================
        {
            id: "mum-gateway",
            city: "Mumbai",
            area: "Colaba",
            name: "Gateway of India",
            type: "Indo-Saracenic Triumphal Arch & Waterfront",
            rating: 4.9,
            reviews: "54,200+",
            safetyScore: 9.9,
            lat: 18.9220,
            lng: 72.8347,
            timings: "Open 24 Hours (Best 06:00 AM – 10:30 PM)",
            openStatus: "Open Now",
            fee: "Free Public Entry",
            duration: "1.5 to 2 Hours",
            bestTime: "05:00 PM – 07:30 PM (Sunset & Sea Breeze)",
            image: "./images/place_mum_gateway.jpg",
            desc: "Mumbai's most recognizable colonial seaside monument overlooking the Arabian Sea, flanked by the historic Taj Mahal Palace.",
            fullSummary: "Erected in 1924 to commemorate the landing of King George V and Queen Mary at Apollo Bunder, the Gateway of India is Mumbai's defining cultural symbol. Masterfully designed by architect George Wittet in the Indo-Saracenic style using yellow basalt stone, the 26-meter-high arch seamlessly harmonizes elements of 16th-century Gujarati architecture with traditional European triumphal arches.\n\nStanding dramatically at the edge of Mumbai Harbour, it serves as the historic departure dock for passenger boats to the ancient Elephanta Caves. The surrounding plaza buzzes with tourists, local photographers, seagulls hovering over the waves, and street vendors. At night, golden illumination reflects off the stone facade against the dark sea.",
            highlights: [
                "Take the 1-hour scenic motorboat cruise across Mumbai Harbour",
                "Photograph the yellow basalt arch framed against the Taj Mahal Palace",
                "Stroll along the stone seawall during golden sunset hour",
                "Relish fresh roasted bhutta and chilled tender coconut by the sea"
            ],
            safetyNotes: "24/7 Mumbai Police Coastal Vigilance and Tourist Assistance Booth stationed directly on the promenade. High-density CCTV coverage.",
            visitorTips: "Visit early morning around 7 AM for crowd-free photography, or evening 6 PM for magical sunset sea breezes."
        },
        {
            id: "mum-csmvs",
            city: "Mumbai",
            area: "Fort / Kala Ghoda",
            name: "CSMVS Heritage Museum (Prince of Wales)",
            type: "UNESCO Heritage Museum & Art Gallery",
            rating: 4.8,
            reviews: "28,400+",
            safetyScore: 9.9,
            lat: 18.9269,
            lng: 72.8327,
            timings: "10:15 AM – 06:00 PM (Open All 7 Days)",
            openStatus: "Open 10:15 AM - 6 PM",
            fee: "₹150 (Indians), ₹650 (Foreigners), ₹35 (Students)",
            duration: "2 to 3 Hours",
            bestTime: "11:00 AM – 02:00 PM (Quiet indoor galleries)",
            image: "./images/place_mum_csmvs.jpg",
            desc: "Premier art, archaeology, and natural history museum housed inside a magnificent Grade I Indo-Saracenic palace.",
            fullSummary: "Founded in the early 20th century to commemorate the visit of the Prince of Wales, Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS) is one of India's preeminent cultural institutions. The magnificent Grade I heritage building is crowned by an imposing white dome inspired by the Gol Gumbaz of Bijapur and surrounded by palm-fringed heritage lawns in the Kala Ghoda art precinct.\n\nThe museum houses over 50,000 priceless artifacts spanning ancient Indus Valley relics, Gandhara Buddhist sculptures, miniature Mughal paintings, decorative Asian porcelain, and European oil masterpieces. The complex features world-class acoustic audio guides and an open-air amphitheater.",
            highlights: [
                "Examine original 4,500-year-old Harappa and Mohenjo-Daro antiquities",
                "Marvel at intricate Mughal miniature paintings and decorative jade artifacts",
                "Walk through the Himalayan art gallery featuring Tibetan thangkas",
                "Enjoy artisanal coffee in the leafy courtyard garden cafe"
            ],
            safetyNotes: "High-security museum perimeter with bag scanners, trained museum docents, and climate-controlled galleries.",
            visitorTips: "Audio guides in 7 languages available at the entrance; photography tickets can be purchased at counter."
        },
        {
            id: "mum-causeway",
            city: "Mumbai",
            area: "Colaba",
            name: "Colaba Heritage Causeway",
            type: "Historic Shopping Boulevard & Cultural Hub",
            rating: 4.7,
            reviews: "36,900+",
            safetyScore: 9.8,
            lat: 18.9225,
            lng: 72.8290,
            timings: "10:30 AM – 10:30 PM (Daily)",
            openStatus: "Open 10:30 AM - 10:30 PM",
            fee: "Free Public Stroll",
            duration: "1.5 to 2 Hours",
            bestTime: "04:30 PM – 07:30 PM (Vibrant evening market)",
            image: "./images/place_mum_causeway.jpg",
            desc: "Mumbai's legendary street-market boulevard packed with vintage brass curios, handcrafted silver, and heritage cafes.",
            fullSummary: "Colaba Causeway (Shahid Bhagat Singh Road) is Mumbai's most vibrant cultural shopping artery. Connecting the historic British cantonment to South Mumbai, the street presents an unforgettable sensory kaleidoscope. Hundreds of street stalls offer antique brass nautical compasses, hand-woven Pashmina shawls, bohemian jewelry, and leather Kolhapuri sandals.\n\nNestled alongside the bustling stalls are historic institutions such as Leopold Cafe (established 1871) and Cafe Mondegar with its famous Mario Miranda cartoons. It is the definitive spot for tourists seeking authentic Mumbai street souvenirs and culinary culture.",
            highlights: [
                "Bargain for vintage brass antiques, retro clocks, and silver jewelry",
                "Dine at legendary Leopold Cafe and admire historic heritage interiors",
                "Sample street snacks like Frankie rolls and fresh fruit juices",
                "Explore colonial art-deco facades along the pedestrian sidewalk"
            ],
            safetyNotes: "Designated Tourist Police patrol zone with regular foot marshals and lit pavements throughout the evening.",
            visitorTips: "Friendly bargaining is customary for street stalls; carry small cash denominations for quick purchases."
        },
        {
            id: "mum-marinedrive",
            city: "Mumbai",
            area: "Marine Lines / Churchgate",
            name: "Marine Drive & Queen's Necklace",
            type: "Seaside Coastal Promenade & UNESCO Art Deco",
            rating: 4.9,
            reviews: "62,000+",
            safetyScore: 9.9,
            lat: 18.9432,
            lng: 72.8230,
            timings: "Open 24 Hours (Best 05:30 PM – 11:00 PM)",
            openStatus: "Open 24 Hours",
            fee: "Free Public Access",
            duration: "1 to 2 Hours",
            bestTime: "06:00 PM – 08:30 PM (Golden hour & glittering night arc)",
            image: "./images/place_mum_marinedrive.jpg",
            desc: "Breathtaking 3.6-kilometer seaside curve flanked by the Arabian Sea and the world's second-largest collection of Art Deco buildings.",
            fullSummary: "Curving gracefully along Netaji Subhash Chandra Bose Road, Marine Drive is Mumbai's beloved waterfront promenade. Known universally as 'The Queen's Necklace' because its arc of streetlights glistens like pearls when viewed from Malabar Hill at dusk, it offers unmatched tranquility against the bustling city.\n\nLined with iconic giant concrete tetrapods that break incoming ocean waves, it is flanked by UNESCO-inscribed Art Deco residential buildings. Families, travelers, joggers, and street musicians congregate along the wide granite walkway to take in the sea breeze and stunning Arabian Sea sunsets.",
            highlights: [
                "Sit on the sea wall tetrapods watching the Arabian Sea waves crash",
                "Experience the glittering Queen's Necklace curve illuminate as dusk sets in",
                "Savor roasted masala corn (bhutta) seasoned with lime and chili",
                "Walk past the historic UNESCO Art Deco residential precinct"
            ],
            safetyNotes: "Continuous CCTV surveillance, 24/7 dedicated beat police, and emergency SOS pillars every 200 meters.",
            visitorTips: "Evenings are breezy and cool; perfect spot for sunset photography and evening strolls."
        },
        {
            id: "mum-csmt",
            city: "Mumbai",
            area: "Fort",
            name: "CSMT Victorian Terminus",
            type: "UNESCO World Heritage Masterpiece",
            rating: 4.8,
            reviews: "41,000+",
            safetyScore: 9.8,
            lat: 18.9400,
            lng: 72.8354,
            timings: "Open 24 Hours (Museum: 10:00 AM – 05:00 PM Mon-Fri)",
            openStatus: "Open 24 Hours",
            fee: "Free for Concourse; ₹200 for Heritage Museum Tour",
            duration: "1 Hour",
            bestTime: "07:00 PM – 09:30 PM (Dynamic evening facade illumination)",
            image: "./images/place_mum_csmt.jpg",
            desc: "Magnificent Victorian Gothic revival railway palace completed in 1888, blending European High Gothic arches with Indian domes.",
            fullSummary: "A UNESCO World Heritage Site and an engineering wonder of the Victorian era, Chhatrapati Shivaji Maharaj Terminus was designed by British architect F. W. Stevens and inaugurated in 1888. Serving as the monumental gateway to India's commercial capital, its architecture represents an extraordinary blend of Victorian Italianate Gothic Revival and traditional Indian palace ornamentation.\n\nThe facade features intricate stone gargoyles, carved peacock spandrels, pointed Gothic arches, and a monumental 330-foot central octagonal dome crowned by the allegorical statue of 'Progress'. Over 3 million commuters pass through daily, making it a pulsating celebration of Mumbai's historic soul.",
            highlights: [
                "Admire the soaring 330-ft octagonal ribbed dome and stone peacock friezes",
                "Visit the vintage railway heritage museum housing 19th-century engines",
                "Photograph the dynamic multi-colored LED facade lighting after sunset",
                "Witness the synchronized energy of Mumbai local suburban train transit"
            ],
            safetyNotes: "Railway Protection Force (RPF) and Mumbai Police operate around the clock with integrated bag scanners and metal detectors.",
            visitorTips: "Best photography angles are from the pedestrian viewing bridge across Dr. Dadabhai Naoroji Road."
        },
        {
            id: "mum-bandra",
            city: "Mumbai",
            area: "Bandra West",
            name: "Bandra Bandstand & Fort (Castella de Aguada)",
            type: "17th-Century Portuguese Fort & Ocean Promenade",
            rating: 4.7,
            reviews: "31,500+",
            safetyScore: 9.7,
            lat: 19.0435,
            lng: 72.8193,
            timings: "06:00 AM – 08:30 PM (Daily)",
            openStatus: "Open 06:00 AM - 8:30 PM",
            fee: "Free Entry",
            duration: "1.5 Hours",
            bestTime: "05:00 PM – 07:00 PM (Sunset over the Sea Link)",
            image: "./images/place_goa_bomjesus.jpg",
            desc: "Scenic hilltop fort ruins perched at Land's End with direct panoramic vistas of the Bandra-Worli Sea Link.",
            fullSummary: "Built by the Portuguese in 1640 as a strategic watchtower guarding Mahim Bay, Castella de Aguada (Bandra Fort) sits dramatically at Land's End in western Mumbai. The stone ramparts provide majestic open views of the expansive Arabian Sea and the modern engineering icon, the cable-stayed Bandra-Worli Sea Link.\n\nThe adjoining kilometer-long Bandstand promenade features an ocean amphitheater, lush hillside rock gardens, and celebrity villas including Shah Rukh Khan's Mannat. It is a premier destination for sunset strolls, romantic sea views, and heritage exploration.",
            highlights: [
                "Climb the Portuguese ramparts for uninterrupted views of the Sea Link",
                "Stroll along the Land's End amphitheater with ocean breezes",
                "Catch views of famous Bollywood celebrity residences along the ridge",
                "Watch crashing ocean waves from the rocky headland during high tide"
            ],
            safetyNotes: "Regular municipal marshals and coastal police patrolling during all public visiting hours.",
            visitorTips: "Wear comfortable walking footwear for climbing the stone fort stairs and rocky terraces."
        },

        // =========================================================================
        // GOA LANDMARKS
        // =========================================================================
        {
            id: "goa-aguada",
            city: "Goa",
            area: "Candolim / Sinquerim",
            name: "Fort Aguada & Lighthouse",
            type: "17th-Century Portuguese Fort & Marine Citadel",
            rating: 4.8,
            reviews: "38,000+",
            safetyScore: 9.9,
            lat: 15.4925,
            lng: 73.7736,
            timings: "09:30 AM – 06:00 PM (Everyday)",
            openStatus: "Open 09:30 AM - 6 PM",
            fee: "₹25 (Indians), ₹300 (Foreigners)",
            duration: "2 Hours",
            bestTime: "04:00 PM – 06:00 PM (Mellow sunshine & ocean breeze)",
            image: "./images/place_goa_aguada.jpg",
            desc: "Panoramic 1612 Portuguese fortress overlooking Sinquerim Beach with a four-story lighthouse and freshwater cistern.",
            fullSummary: "Perched majestically at the mouth of the Mandovi River, Fort Aguada was constructed by the Portuguese in 1612 to protect against Dutch and Maratha maritime attacks. Its name Aguada ('water') stems from the immense subterranean freshwater spring that replenished passing European ships with 2.37 million gallons of pure water.\n\nThe upper fort features a monumental four-story stone lighthouse built in 1864, one of the oldest in Asia, and broad ramparts offering sweeping 360-degree vistas over Sinquerim Beach, Candolim, and the Arabian Sea. It stands as an enduring testament to Portuguese military architecture in the tropics.",
            highlights: [
                "Climb the upper fortress bastion overlooking the mouth of the Mandovi River",
                "Inspect the four-story 1864 historic lighthouse and gunpowder rooms",
                "Walk along the intact laterite stone battlements with coastal breeze",
                "Take panoramic photographs of Sinquerim bay and fishing boats"
            ],
            safetyNotes: "Goa Tourist Police post on duty at the entry gate with clearly barricaded cliff-edge safety fences.",
            visitorTips: "Carry a sun hat and drinking water; guided heritage tours available at the visitor counter."
        },
        {
            id: "goa-bomjesus",
            city: "Goa",
            area: "Old Goa",
            name: "Basilica of Bom Jesus",
            type: "UNESCO World Heritage Baroque Basilica",
            rating: 4.9,
            reviews: "45,000+",
            safetyScore: 9.9,
            lat: 15.5009,
            lng: 73.9116,
            timings: "09:00 AM – 06:30 PM (Mon-Sat), 10:30 AM – 06:30 PM (Sun)",
            openStatus: "Open 09:00 AM - 6:30 PM",
            fee: "Free Entry (Modest attire required)",
            duration: "1.5 Hours",
            bestTime: "Morning 09:30 AM – 11:30 AM",
            image: "./images/place_goa_bomjesus.jpg",
            desc: "400-year-old landmark of Baroque architecture housing the sacred relics of St. Francis Xavier in Old Goa.",
            fullSummary: "Consecrated in 1605, the Basilica of Bom Jesus is one of the finest examples of Jesuit Baroque architecture in Asia and a designated UNESCO World Heritage Site. Built of unplastered reddish laterite stone with carved basalt pillars, the church holds the incorrupt mortal remains of St. Francis Xavier within an exquisite silver casket crafted by 17th-century Florentine sculptors.\n\nThe interior features an opulent gilded altar depicting the infant Jesus under the protection of the Holy Trinity, intricately carved wooden pulpits, and centuries-old oil paintings illustrating missionary journeys across Asia.",
            highlights: [
                "View the venerated silver casket holding the sacred relics of St. Francis Xavier",
                "Admire the soaring 17th-century gold-gilded reredos behind the main altar",
                "Explore the adjacent modern Christian art gallery and museum",
                "Walk through the historic Old Goa heritage corridor including Se Cathedral"
            ],
            safetyNotes: "Strict decorum and tourist police marshals on site. Well-lit wheelchair-accessible ramps throughout.",
            visitorTips: "Modest attire covering shoulders and knees is strictly requested; photography permitted without flash."
        },

        // =========================================================================
        // JAIPUR LANDMARKS
        // =========================================================================
        {
            id: "jai-hawamahal",
            city: "Jaipur",
            area: "Old Walled City",
            name: "Hawa Mahal (Palace of Winds)",
            type: "Iconic Rajput Sandstone Monument",
            rating: 4.8,
            reviews: "51,000+",
            safetyScore: 9.9,
            lat: 26.9239,
            lng: 75.8267,
            timings: "09:00 AM – 05:00 PM (Daily)",
            openStatus: "Open 09:00 AM - 5 PM",
            fee: "₹50 (Indians), ₹200 (Foreigners)",
            duration: "1.5 Hours",
            bestTime: "Early Morning 08:30 AM – 10:00 AM (Golden morning sun on facade)",
            image: "./images/place_jai_hawamahal.jpg",
            desc: "Extraordinary five-story pink sandstone palace with 953 delicately carved jharokha honeycomb windows.",
            fullSummary: "Built in 1799 by Maharaja Sawai Pratap Singh and designed by Lal Chand Ustad, Hawa Mahal is Jaipur's most celebrated architectural wonder. Resembling the crown of Lord Krishna, this five-story pink and red sandstone palace features a mesmerizing honeycomb facade composed of 953 intricately carved casements ('jharokhas').\n\nThese windows were ingeniously engineered to allow cool breezes to circulate naturally via the Venturi effect, keeping the royal apartments chilled during Rajasthan's scorching summers. The lattice screens allowed royal ladies to observe colorful street processions in the bazaars below while maintaining strict seclusion.",
            highlights: [
                "Photograph the iconic honeycomb facade from the rooftop cafes opposite",
                "Walk through the narrow sloping ramps that replace staircases inside the palace",
                "Peer through original stained-glass windows overlooking the Old City bazaars",
                "Visit the heritage archaeological museum exhibiting royal weaponry and coins"
            ],
            safetyNotes: "Stationed on the prime Rajasthan Tourist Police vigilance corridor with continuous foot patrols.",
            visitorTips: "Cross over to the rooftop cafes opposite Hawa Mahal for the classic postcard panoramic photo."
        },
        {
            id: "jai-amberfort",
            city: "Jaipur",
            area: "Amer",
            name: "Amber Fort & Palace",
            type: "UNESCO World Heritage Hilltop Fortress",
            rating: 4.9,
            reviews: "68,000+",
            safetyScore: 9.8,
            lat: 26.9855,
            lng: 75.8513,
            timings: "08:00 AM – 05:30 PM & 06:30 PM – 09:15 PM (Night Fort Tour)",
            openStatus: "Open 08:00 AM - 5:30 PM",
            fee: "₹100 (Indians), ₹500 (Foreigners), ₹200 (Sound & Light Show)",
            duration: "3 Hours",
            bestTime: "Morning 08:30 AM – 11:30 AM or Evening 06:30 PM (Night Tour)",
            image: "./images/place_jai_amberfort.jpg",
            desc: "Majestic hilltop Rajput citadel overlooking Maota Lake, famous for the magical Sheesh Mahal mirror palace.",
            fullSummary: "Constructed in 1592 by Raja Man Singh I and expanded by Mirza Raja Jai Singh, Amber Fort crowns the rugged Aravalli hills overlooking the tranquil waters of Maota Lake. An opulent UNESCO World Heritage fortress, it seamlessly blends traditional Rajput martial architecture with refined Mughal decorative arts across four sprawling courtyards.\n\nIts crowning jewel is the world-famous Sheesh Mahal (Mirror Palace), whose walls and ceilings are inlaid with concave convex Belgian convex glass mirrors that illuminate an entire hall with the spark of a single candle. Other marvels include the Diwan-e-Aam, the Ganesh Pol gateway, and the lakeside Kesar Kyari saffron garden.",
            highlights: [
                "Be dazzled by the thousands of imported mirrors inside the Sheesh Mahal",
                "Walk through the monumental Ganesh Pol royal gate adorned with fresco paintings",
                "Ride the eco-friendly battery electric jeep from the lake up to the main gate",
                "Attend the evening Sound & Light spectacle narrating the legends of Rajput rulers"
            ],
            safetyNotes: "Dedicated Tourism Police precinct, medical first-aid desk, and regulated shuttle transport.",
            visitorTips: "Wear comfortable walking shoes; the palace complex has gentle ramps and extensive courtyards."
        },

        // =========================================================================
        // DELHI LANDMARKS
        // =========================================================================
        {
            id: "del-redfort",
            city: "Delhi",
            area: "Old Delhi",
            name: "Red Fort (Lal Qila)",
            type: "UNESCO Mughal Imperial Citadel",
            rating: 4.7,
            reviews: "58,000+",
            safetyScore: 9.9,
            lat: 28.6562,
            lng: 77.2410,
            timings: "09:30 AM – 04:30 PM (Closed on Mondays)",
            openStatus: "Open 09:30 AM - 4:30 PM",
            fee: "₹50 (Indians), ₹500 (Foreigners)",
            duration: "2.5 Hours",
            bestTime: "Morning 09:30 AM – 12:00 PM",
            image: "./images/place_del_redfort.jpg",
            desc: "Imposing red sandstone citadel of Mughal emperors commissioned by Shah Jahan in 1638 on the banks of Yamuna.",
            fullSummary: "Constructed between 1638 and 1648 when Mughal Emperor Shah Jahan moved his imperial capital from Agra to Shahjahanabad (Old Delhi), the Red Fort is an iconic masterpiece of Mughal court architecture. Enclosed within 2.4 kilometers of towering red sandstone battlements, the palace served as the focal point of the empire for nearly two centuries.\n\nInside, visitors explore the Diwan-i-Aam (Hall of Public Audience), the exquisite white marble Diwan-i-Khas where the Peacock Throne once stood, the Chhatta Chowk covered royal bazaar, and tranquil Persian Charbagh gardens. It is also the historic site where India's Prime Minister hoists the national flag on Independence Day.",
            highlights: [
                "Walk through the grand Lahore Gate into the historic Chhatta Chowk covered bazaar",
                "Admire the inlaid marble pillars of the Diwan-i-Khas (Hall of Private Audience)",
                "Explore the newly curated Subhash Chandra Bose and Freedom Fighter museums",
                "Experience the evening Hindi and English Sound and Light projection show"
            ],
            safetyNotes: "Heavy CISF paramilitary and Delhi Police security perimeter with multi-tier screening.",
            visitorTips: "Book tickets online via ASI portal to skip long entry queues; closed on Mondays."
        },
        {
            id: "del-qutub",
            city: "Delhi",
            area: "Mehrauli",
            name: "Qutub Minar Complex",
            type: "UNESCO World's Tallest Brick Minaret",
            rating: 4.8,
            reviews: "49,500+",
            safetyScore: 9.9,
            lat: 28.5244,
            lng: 77.1855,
            timings: "07:00 AM – 05:00 PM (Daily)",
            openStatus: "Open 07:00 AM - 5 PM",
            fee: "₹40 (Indians), ₹600 (Foreigners)",
            duration: "2 Hours",
            bestTime: "Late Afternoon 03:00 PM – 05:00 PM",
            image: "./images/place_del_qutub.jpg",
            desc: "72.5-meter red sandstone victory tower built in 1192, standing amidst manicured green archaeological gardens.",
            fullSummary: "Towering 72.5 meters into the South Delhi sky, Qutub Minar is the tallest brick minaret in the world and an exemplary masterpiece of early Indo-Islamic architecture. Commissioned by Qutb-ud-din Aibak in 1192 and completed by his successors Iltutmish and Firoz Shah Tughlaq, the tapering fluted tower features five distinct stories adorned with delicate Arabic calligraphy and projecting balconies supported by intricate stone corbels.\n\nThe surrounding archaeological park features the Quwwat-ul-Islam Mosque, the intricately carved tomb of Iltutmish, and the legendary 4th-century Iron Pillar of Chandragupta II, which has stood exposed to Delhi's monsoons for over 1,600 years without rusting.",
            highlights: [
                "Marvel at the 72.5-meter tapering fluted tower carved with Quranic calligraphy",
                "Examine the mysterious 1,600-year-old rust-resistant metallurgical Iron Pillar",
                "Walk through the serene colonnades of the ancient Quwwat-ul-Islam mosque",
                "Relax on the expansive manicured green lawns under the shade of ancient neem trees"
            ],
            safetyNotes: "Archaeological Survey of India security and tourist marshals patrolling the park continuously.",
            visitorTips: "The monument is beautifully illuminated in the evenings; carry water and sun protection."
        },

        // =========================================================================
        // KASHMIR LANDMARKS
        // =========================================================================
        {
            id: "kas-dallake",
            city: "Kashmir",
            area: "Srinagar",
            name: "Dal Lake Shikara Promenade",
            type: "Iconic Alpine Waterfront & Floating Gardens",
            rating: 4.9,
            reviews: "43,000+",
            safetyScore: 9.9,
            lat: 34.0837,
            lng: 74.8370,
            timings: "Sunrise – 09:30 PM (Daily)",
            openStatus: "Open Sunrise - 9:30 PM",
            fee: "₹700 / hr Standard Shikara (Govt Regulated)",
            duration: "2 to 3 Hours",
            bestTime: "05:00 AM (Floating vegetable market) or 05:30 PM (Sunset)",
            image: "./images/place_kas_dallake.jpg",
            desc: "Known as the 'Jewel in the crown of Kashmir', Dal Lake is famous for intricately carved cedar houseboats and gliding shikaras.",
            fullSummary: "Spanning 18 square kilometers and framed by the dramatic snow-dusted peaks of the Zabarwan mountain range, Dal Lake is the poetic heart of Srinagar. Renowned worldwide for its floating gardens ('rad'), labyrinthine waterways, and hand-carved cedarwood houseboats dating back to the British era, the lake offers an otherworldly sense of serene tranquility.\n\nGliding gently on a cushioned wooden Shikara boat, travelers encounter floating flower bazaars, local saffron merchants, and the historic morning vegetable market where villagers barter produce from boat to boat just as they have for centuries.",
            highlights: [
                "Take a peaceful sunset Shikara cruise to Char Chinar island and lotus clusters",
                "Experience the early morning (5:30 AM) traditional floating vegetable market",
                "Sip authentic Kashmiri Kahwa tea brewed with saffron, cinnamon, and slivered almonds",
                "Photograph the reflections of the Pir Panjal mountains shimmering on the still waters"
            ],
            safetyNotes: "J&K Tourist Police booths located along Boulevard Road docks with emergency water rescue boats on standby.",
            visitorTips: "Govt-approved rates for Shikara rides are displayed at major Ghats; bargain politely for longer tours."
        }
    ];

    // Helper to get nearest places to given lat, lng
    function getPlacesNearLocation(userLat, userLng, limit = 20) {
        if (!userLat || !userLng) return MASTER_TOURIST_PLACES.slice(0, limit);
        return [...MASTER_TOURIST_PLACES].map(place => {
            const dist = calculateDistanceKm(userLat, userLng, place.lat, place.lng);
            return {
                ...place,
                distKm: dist,
                formattedDist: formatDistance(dist),
                travelTime: estimateTravelTime(dist)
            };
        }).sort((a, b) => a.distKm - b.distKm).slice(0, limit);
    }

    // =========================================================================
    // WELCOME SCREEN — CLEAN PROFESSIONAL DESIGN WITH REAL LOGO + CSS DOODLES
    // =========================================================================
    function AppleWelcomeScreen({ onContinue }) {
        const [logoVisible, setLogoVisible] = useState(false);
        const [headingVisible, setHeadingVisible] = useState(false);
        const [taglineVisible, setTaglineVisible] = useState(false);
        const [btnVisible, setBtnVisible] = useState(false);

        useEffect(() => {
            const timers = [];
            timers.push(setTimeout(() => setLogoVisible(true),    200));
            timers.push(setTimeout(() => setHeadingVisible(true), 700));
            timers.push(setTimeout(() => setTaglineVisible(true), 1200));
            timers.push(setTimeout(() => setBtnVisible(true),     1750));
            return () => timers.forEach(t => clearTimeout(t));
        }, []);

        const fastForward = () => {
            setLogoVisible(true);
            setHeadingVisible(true);
            setTaglineVisible(true);
            setBtnVisible(true);
        };

        // Travel doodle icon data: [symbol, top%, left%, fontSize, rotate, opacity]
        const doodles = [
            ["✈",   6,  12,  28, -20, 0.18],
            ["✈",   9,  75,  18,  15, 0.12],
            ["⛰",  14,  50,  22,   0, 0.13],
            ["🗺",  22,   8,  20,   8, 0.14],
            ["📷",  20,  82,  20, -10, 0.13],
            ["⚑",  32,  18,  16,   5, 0.12],
            ["🧭",  34,  72,  18,  -5, 0.13],
            ["📄",  45,   5,  16,  12, 0.11],
            ["📍",  43,  88,  18,   0, 0.12],
            ["☀",  55,  25,  20, -15, 0.13],
            ["🌐",  54,  65,  18,  10, 0.12],
            ["🧳",  65,   8,  18,  -8, 0.12],
            ["🌴",  62,  85,  20,   5, 0.13],
            ["✦",  72,  40,  14,  15, 0.14],
            ["✦",  78,  60,  10,  -5, 0.13],
            ["✈",  82,  20,  16,  20, 0.10],
            ["⛵",  80,  75,  18,  -8, 0.11],
        ];

        return e("div", {
            onClick: !btnVisible ? fastForward : undefined,
            className: "mobile-container w-full min-h-screen flex flex-col items-center relative overflow-hidden select-none",
            style: { backgroundColor: "#ffffff" }
        },
            // ── CSS Keyframes ──────────────────────────────────────────
            e("style", null, `
                @keyframes wFadeUp {
                    from { opacity: 0; transform: translateY(22px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes wLogoIn {
                    0%   { opacity: 0; transform: scale(0.72) translateY(10px); }
                    60%  { opacity: 1; transform: scale(1.05) translateY(-3px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes wPulse {
                    0%, 100% { box-shadow: 0 16px 48px -8px rgba(59,56,220,0.38); }
                    50%      { box-shadow: 0 20px 56px -6px rgba(59,56,220,0.55); }
                }
                @keyframes wBtnPop {
                    from { opacity: 0; transform: translateY(28px) scale(0.95); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes wDoodleDrift {
                    0%,100% { transform: translateY(0px); }
                    50%     { transform: translateY(-6px); }
                }
                .w-doodle { animation: wDoodleDrift linear infinite alternate; }
            `),

            // ── Doodle layer (pure CSS absolutely-placed) ──────────────
            e("div", {
                className: "absolute inset-0 pointer-events-none overflow-hidden",
                style: { zIndex: 0 }
            },
                ...doodles.map(([sym, top, left, size, rot, opa], i) =>
                    e("span", {
                        key: i,
                        className: "w-doodle absolute font-sans leading-none",
                        style: {
                            top: `${top}%`,
                            left: `${left}%`,
                            fontSize: `${size}px`,
                            transform: `rotate(${rot}deg)`,
                            opacity: opa,
                            color: "#3b38dc",
                            animationDuration: `${3.5 + (i * 0.37)}s`,
                            animationDelay: `${(i * 0.15)}s`,
                            filter: "grayscale(40%)"
                        }
                    }, sym)
                ),

                // Dashed route curves (SVG)
                e("svg", {
                    viewBox: "0 0 430 900",
                    preserveAspectRatio: "xMidYMid slice",
                    style: {
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0.07
                    }
                },
                    e("path", {
                        d: "M 30 80 Q 220 200 380 120",
                        fill: "none",
                        stroke: "#3b38dc",
                        strokeWidth: "2",
                        strokeDasharray: "6 8"
                    }),
                    e("path", {
                        d: "M 380 250 Q 150 320 60 420",
                        fill: "none",
                        stroke: "#3b38dc",
                        strokeWidth: "2",
                        strokeDasharray: "6 8"
                    }),
                    e("path", {
                        d: "M 50 520 Q 280 580 390 680",
                        fill: "none",
                        stroke: "#3b38dc",
                        strokeWidth: "2",
                        strokeDasharray: "6 8"
                    })
                )
            ),

            // ── Main content ───────────────────────────────────────────
            e("div", {
                className: "relative flex flex-col items-center w-full px-6 z-10",
                style: { paddingTop: "clamp(64px, 14vh, 110px)" }
            },

                // Logo
                e("div", {
                    style: {
                        opacity: logoVisible ? 1 : 0,
                        animation: logoVisible ? "wLogoIn 0.75s cubic-bezier(0.34,1.56,0.64,1) both, wPulse 3s ease-in-out 1.2s infinite" : "none",
                        borderRadius: "32px",
                        overflow: "hidden",
                        width: "120px",
                        height: "120px",
                        flexShrink: 0
                    }
                },
                    e("img", {
                        src: "images/safora_logo.jpg",
                        alt: "SAFORA",
                        style: {
                            width: "120px",
                            height: "120px",
                            display: "block",
                            borderRadius: "32px",
                            objectFit: "cover"
                        }
                    })
                ),

                // Heading "Welcome to SAFORA!"
                e("h1", {
                    style: {
                        marginTop: "32px",
                        fontFamily: "inherit",
                        fontWeight: 800,
                        fontSize: "clamp(24px, 6.5vw, 30px)",
                        color: "#11152b",
                        letterSpacing: "-0.5px",
                        textAlign: "center",
                        lineHeight: 1.2,
                        opacity: headingVisible ? 1 : 0,
                        transform: headingVisible ? "translateY(0)" : "translateY(18px)",
                        transition: "opacity 0.65s ease, transform 0.65s ease"
                    }
                }, "Welcome to SAFORA!"),

                // Tagline
                e("p", {
                    style: {
                        marginTop: "14px",
                        fontSize: "clamp(13px, 2.2vw, 16px)",
                        color: "#707589",
                        textAlign: "center",
                        lineHeight: 1.65,
                        maxWidth: "min(92vw, 480px)",
                        fontWeight: 500,
                        opacity: taglineVisible ? 1 : 0,
                        transform: taglineVisible ? "translateY(0)" : "translateY(16px)",
                        transition: "opacity 0.65s ease, transform 0.65s ease"
                    }
                }, "Your smart travel companion for safer journeys, real-time support and seamless exploration.")
            ),

            // ── Bottom zone (dots + button) ────────────────────────────
            e("div", {
                className: "absolute flex flex-col items-center w-full px-6 z-10",
                style: {
                    bottom: "clamp(36px, 8vh, 64px)",
                    opacity: btnVisible ? 1 : 0,
                    animation: btnVisible ? "wBtnPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
                    gap: "20px",
                    display: "flex"
                }
            },
                // 2 pagination dots
                e("div", { style: { display: "flex", gap: "8px", alignItems: "center" } },
                    e("div", { style: { width: "24px", height: "7px", borderRadius: "4px", background: "#3b38dc" } }),
                    e("div", { style: { width: "7px",  height: "7px", borderRadius: "50%", background: "#d0d3e8" } })
                ),

                // Get started button
                e("button", {
                    type: "button",
                    onClick: (ev) => { ev.stopPropagation(); onContinue(); },
                    style: {
                        width: "100%",
                        maxWidth: "min(90vw, 420px)",
                        padding: "17px 0",
                        borderRadius: "18px",
                        background: "linear-gradient(135deg, #3b38dc 0%, #5b4ce4 100%)",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "16px",
                        letterSpacing: "0.2px",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        boxShadow: "0 10px 32px -6px rgba(59,56,220,0.45)"
                    }
                },
                    e("span", null, "Get started"),
                    e("svg", {
                        width: 20, height: 20,
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: 2.5,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                    },
                        e("path", { d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" })
                    )
                )
            )
        );
    }

    // =========================================================================
    // ONBOARDING LOGIN COMPONENT (BLANK FOR USER TO FILL)
    // =========================================================================
    // IN-APP AVATAR PRESETS (9 ILLUSTRATED CHARACTERS + TRAVEL EMOJIS)
    const APP_AVATAR_PRESETS = [{"id": "avatar_1", "name": "Sunita", "role": "Culture Explorer", "src": "data:image/webp;base64,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", "path": "images/avatars/avatar_1.webp"}, {"id": "avatar_2", "name": "Rohan", "role": "Tech Navigator", "src": "data:image/webp;base64,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", "path": "images/avatars/avatar_2.webp"}, {"id": "avatar_3", "name": "Kabir", "role": "Solo Backpacker", "src": "data:image/webp;base64,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", "path": "images/avatars/avatar_3.webp"}, {"id": "avatar_4", "name": "Meera", "role": "City Wanderer", "src": "data:image/webp;base64,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", "path": "images/avatars/avatar_4.webp"}, {"id": "avatar_5", "name": "Arjun", "role": "Heritage Guide", "src": "data:image/webp;base64,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", "path": "images/avatars/avatar_5.webp"}, {"id": "avatar_6", "name": "Vikram", "role": "Coastal Captain", "src": "data:image/webp;base64,UklGRtALAABXRUJQVlA4IMQLAADwOQCdASqMAIwAPjEWiUOiISESyk3IIAMEoA0xz3i/+q/kh+UnVAbE+DPWTpBHjf6j/yfJu9iv5e9gD9Pv8B/MPVg9QH9A/2nqA/nX9w/6n/L94/0EegB/iv8l1h/oGfrv6Z37k/Bf+437lfAX+xX//1mVk/976LHy97S7rtqQfIfuv908xv8b4S++P+O9QL8S/if9z/KL8yOUwzjzAvWL6H/k/7d+33jAeincuf4vjtaAH5k/5fpuf7P+h/Lz21/nf96/4/+V/JH7Bf5J/Tv9p/bv3f/f/6wPZF+6Hsxft4ZWYXBvP3J2fnWWXFt3bzAvabL85Z/BhQGVSPBNWF9kLb+GRfytxxQj6lFP5bS/dn5s7O2hWWimk6wokbsvSAcKVLIy4nX4UX2vIdXIM7551p9RQXeuGmz6teoyRDPB9reYHDtakYfGRma/ADsjmXw+ONzdVgViFrx/fGz5ToYFTAGYPh+/CK4J4NIoQk2MzI5MPrNFDFYavFcirPOwKT/db7I/hWxHfVX0YzLiChGSnfcP/8xAvcY5LZOor1IY+dsYXZ4iL8oSdV6IMBJSaHNLtJRzORFdRtWEyBa4jbb/5plEB1i6UwGDpsvQSUxY2IjOdGNSCu5gAP7+3Xkxe4uegRUCm/Pe1Otex+WVc0s4xuI9laz2OUwgkGl3i/kf+/DBGIJvWlF1rWUj6n7X/Msh6IMGXOwfwZ3tASY+MbONujNbbcJGGLDe6k3M0X+CWBdt3L/Q5c0D3jv1Koe+YonJ67bsJV5mJoXCcL3iuD09Iuzhn5mml3WzlFiVK1UPOPpx7taUdv1Ja6gt4KnbPn4QDq/3g30QAv/Ou5yT1WGMZEan57PVnRkYLeCTaDUDqhCIKyFdJywvOkBsVmwmjlwgkkksTuFRw5cXecFY32s0hVLByI0sL4BiAECFiVtBOeL8f791W5yJEHPseb+O1p3Aj14rH/6f+0NtUI7LiU84WwgenlBu/yLq32h67Q4MinDsjdLctugR16TpSVn0mo8zTbkDAzxDCkAv7qDXEItzS2f4zmuBSi6G3UGyCUuQtar3YwP786FNJlmY4zl4h9hNGsqLaGTT4HVyeblH6eQ2jzO+iKQgzRkH05uLWE+thveq25cBwpANnucOiDLtba2nbtD9rLtA4/ot21cqHhHD5W0xi7smnJWhy0o2XD0p0fNd/KX5iTPEHioSxa+XddlCT8qu86Jv7wuY72Zya3l4DIzY5G27ovSI0Q1XfUtT77ZNYBfIM+4D4un6S5i7d6nSph3L+i7G1+iKjMSA0kipeIUn5Z9L6VxMpo4Wq0DxDSgmwP4INs54Pxwnmz770DC0dT8+XISB6wFCrPYqQz6dCPIg0pb6fmTxUr/G+YmdVIS21zb8Unwd2QvWf71me8N0/9H//+ax0u8uKcpo7Ej2bH6/fiwe65E1NGhqFgzOZoki03llpJy491f+eMqz63mAaP7JnJxqb2rAnMD2eSZo80OOyCIAOCSsnGoRcfHAN+H1a+claQ5un8f0N1+EaJvI73AP2ETVR8VdqOXULqZBC9HAGBPs51OElGNbXjDTBNkUooc3EjGmF4/jVpQ7T9y4KknV/8sajkZb9wNQQ+WzBZ5CowelaTGgcjzc8umUSl4FzORvI7OsC23C/zoBwP8YUcR6GQjV5J9DIaSNYcgCy5P+lXV/+52eexXK5IQqUisbJN4sVcfk9v94DyEoQ/xH1Xq4cfI8LfF+RgJ4Lc7O7SBNONrl/OKJBZFMqGzTLyAKbJlgj3gYIgAzwjwpB4G4r/fwx3RVsLdGlFM/ufL73DpQqGwItzEsP5dPnQNofIpQbDVCRTpg4UmpKGkA7b++Uo/ulVJPK/Do1kfEPrS02i/RjkR5OYDCe3T3BV9fYpb0n8Ns7DTy8fYpUaiabYUJuC4hDGyOt/kI5qsPPtjblD+sAEU8Tz9fGBjLStIFcGr0oR6MwYf35kJbjk6Y7q95WiAhqbNym5UpcPv312ViPp7xBxGdOgPUX2hN7t2EYzTlxD9RZjQmsG8Dio/Q9gdymUH6ka6kjircGwjUIFcNtkYpQNLkHnZeOmyVTh6hdiCJlr97Thhf1duLSDfRx+YgBtEe9bvnbIg/aO9waiJIZoL9yHIOQdYXSFml3OkkZEEnctYgWxOIj9yWb/brT85pEOWmYVaKi33R1bT9zOUUamJi6OMsnVjRyECjeXOlK59GeZA7/xg7/XjM6IA/jZ58KhtAAMrghOXoz/1y7XElCTNPirFop7+HApx8wDFd9sQiLCn9kKkBePdReOlYZ4aALE4iVoeUR5f9hz8VZYkhz5yPzi9jWHDw04SFn4eRnOIOKWLfCa7sw31P1J1xoJMCo+HhuMdzhZt56/SptLdE2LShh4uYGC6/VdCcPJtUfdRKG47BXSeveRYAbQfLGxpdyQBzTco6LbwJu7GPjkvBUh9F2NF8QRS5lnl5jo/Os5x90H5n7LXGXg6feI9AYWL2wsm6/7rIIW4wp99NpMgOPd2JlV69MEiA9EXOxjbHHYT7jL7VR2R0IPFTcwGl7mExPR8Ay3hoOwAkiaR0pf/9hiINXNkYKC0pgPBMaWCX4hPlQChaolSbXxTtcmPRFn7SRpZCYiHI1C1Yi08iFAPB7c5366y7F5TfNfj9vknJZ1zk1bkCAt50+bAWf3rs+ST2dgWhRppiVGr+JjKdyvGKyEUY+a9N/OiBd/92sK1xKF4vfmH5OdTQgxZoHH47mKc+b1D82yPqUcT0TvBFSBOxxMmHBWtOcJH6mij0pQ6AbJvbcZzxFy5iBxLgyp89fXRmA/GrzIU/dv/J7GPRZ6W2dOy8J6+XZpzMXgcDINTG/CtQgBp4puXBWmQCky6mBkeDyYvsDwWNUqU/0r3bbPC9cI6aMJBTw8wb5q63d4qWKEPGSOfZ+pDlJ2FAjzC7it+v9mBxz2UTnSB38b/bwa78lq70z5aM8eIZClBwujPDVndQDEmB4kzvnH1PwwPIfUV6WDv0vnL64Y4AfwrBjitIldMu9MXE5Bn4rzcF6MdmwIGVYLewyfQ3lTZjZ1+O85ATmW5jXqedciJta+XWfepVXXh3KgPA2fT9eawZwekWCfd36SrC5VSreDTwj+j3yCh+KXDsZvzE/1J6xAm5/xpRXHuaG2tXd6rIUjN3Qr4WyeZ4AXzns7z1/ZqEuJ12bOo6nWmM/Dbmb4/nltH9Mk6/WvXmZ0SywA4qeoaKFPpToViCy480OqouYKau1uStHdc4lH2IGdfn2SbKF860jgXbpvJHlJmI+/XQaKSuf94udV8AOMUaDMaM2ZGHHI/5gatTZ7sxA3IotFcCCrdwloPtf+wz4wyxWtZdT1rIhD9W5qlvbBQMouUMEBkhH91lKAAal4omkiG7En8GrpP4e8A5LQF4qQmSgZE1N1x+bYhr/3q9bVVRbckA29H7STO18t7owrr4d53grx31OhEQcjUbAAoXKr6gGVPpuS41pxxtmvxE1N1LvJk3bkS5EaST8UPGiaWXxHJgLfaNAJdZ81+DhRdja7Nyf8p7g/i++XJ+GjGNAgwSX8BL6w6Ou/Sszl8IfxTpbPGOfV9KJ55oRTYbkAMZcENNaxt7k9TkDs7xxcqG6V0becHI6LVSJCefwOhbl/tOc2UB/Sw+/4igN3oRWJoI6aD+ZituTuITKJDDAfeHOlF3v5/kfEljWsm95QQsIQ7Kv91UYmHMStlxA8G1h+2JsyBEfXS3g4rLdrgV7Y7h407/qExaiKgCR/1Ih57Fw4b4KJZEwsTSO/g0AAmOy2UQZhU1k9vOgzEo9na4VLclWGJDZwycN8cldZouUGwXmicYDKkWJmB3Za3/y0tQcl2xttnir6gkYQGvREJngGM2OQYisVqkzYFwWfVhgrhjEoCJcnCnZ5xpkeqWB4GNMxIR0YQhXRRYz/liJEK0bZb6lxflvbgEii9T5uLK2bc+q/H9vRpDzOuxi/VUsgXlR+gOyxtubhMmFDqpa2t+mAAAAAA=", "path": "images/avatars/avatar_6.webp"}, {"id": "avatar_7", "name": "Zara", "role": "Adventure Seeker", "src": "data:image/webp;base64,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", "path": "images/avatars/avatar_7.webp"}, {"id": "avatar_8", "name": "Simba", "role": "Travel Mascot", "src": "data:image/webp;base64,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", "path": "images/avatars/avatar_8.webp"}, {"id": "avatar_9", "name": "Tara", "role": "Mountain Trekkie", "src": "data:image/webp;base64,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", "path": "images/avatars/avatar_9.webp"}];
    const TRAVEL_EMOJI_PRESETS = ['🎒', '🏖️', '✈️', '🧭', '🏔️', '🏕️', '🦁', '🌴', '🛵', '🗺️', '🚀', '📷'];

    // HELPER: GET DEFAULT AVATAR FOR GENDER (MALE, FEMALE, OTHER -> MOUNTAIN EMOJI)
    function getDefaultAvatarForGender(gender) {
        if (!gender) return (typeof APP_AVATAR_PRESETS !== "undefined" && APP_AVATAR_PRESETS[0]) ? APP_AVATAR_PRESETS[0].src : "images/avatars/avatar_1.webp";
        var g = String(gender).trim().toLowerCase();
        if (g === "male" || g === "m" || g === "man" || g === "boy") {
            // Default Male PFP (Rohan - avatar_2)
            return (typeof APP_AVATAR_PRESETS !== "undefined" && APP_AVATAR_PRESETS[1]) ? APP_AVATAR_PRESETS[1].src : "images/avatars/avatar_2.webp";
        }
        if (g === "female" || g === "f" || g === "woman" || g === "girl") {
            // Default Female PFP (Sunita - avatar_1)
            return (typeof APP_AVATAR_PRESETS !== "undefined" && APP_AVATAR_PRESETS[0]) ? APP_AVATAR_PRESETS[0].src : "images/avatars/avatar_1.webp";
        }
        // User selects "Other": mountain emoji selected by default!
        return "🏔️";
    }

    function LoginPage({ onLogin, onBackToWelcome }) {
        const [name, setName] = useState("");
        const [gender, setGender] = useState("");
        const [phone, setPhone] = useState("");
        const [nationality, setNationality] = useState("");

        const handleSubmit = (ev) => {
            if (ev && ev.preventDefault) ev.preventDefault();
            const trimmedName = name.trim();
            if (!trimmedName) return;

            const selectedGender = gender || "Female";
            const autoAvatar = getDefaultAvatarForGender(selectedGender);

            if (onLogin) {
                onLogin({
                    name: trimmedName,
                    gender: selectedGender,
                    avatar: autoAvatar,
                    contact: phone.trim() || "",
                    nationality: nationality.trim() || "",
                    email: "",
                    hotel: "Registered Accommodation",
                    emergencyContact: "+91 112",
                    emergencyName: "Local Tourist Police & EMS",
                    bloodGroup: "O+",
                    medicalNotes: "Tourist Safety Profile Active",
                    homeCity: nationality.trim() || "",
                    isVerified: true
                });
            }
        };

        return e("div", { className: "mobile-container w-full min-h-screen flex flex-col justify-center px-6 py-8 bg-[#f8fafc] text-slate-900 shadow-2xl relative" },
            e("div", { className: "w-full max-w-sm mx-auto flex flex-col gap-5" },
                // Back to Welcome button
                onBackToWelcome && e("button", {
                    type: "button",
                    onClick: onBackToWelcome,
                    className: "self-start text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                }, "← Welcome"),

                // Header Branding with Real SAFORA Logo
                e("div", { className: "flex flex-col items-center text-center gap-2" },
                    e("img", {
                        src: "images/safora_logo.jpg",
                        alt: "SAFORA",
                        style: { width: "64px", height: "64px", borderRadius: "18px", objectFit: "cover" }
                    }),
                    e("h1", { className: "font-heading font-black text-2xl tracking-tight text-slate-950 mt-1" }, "Welcome to SAFORA"),
                    e("p", { className: "text-xs font-semibold text-slate-500" }, "Smart Tourist Safety & Travel Ecosystem"),
                    e("p", { className: "text-xs text-slate-400 mt-0.5" }, "Fill in your details to start exploring")
                ),

                // Form Card
                e("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm" },
                    // 1. Name
                    e("div", { className: "flex flex-col gap-1" },
                        e("label", { className: "text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono-data" }, "Your Name *"),
                        e("input", {
                            type: "text",
                            required: true,
                            value: name,
                            onChange: (e) => setName(e.target.value),
                            placeholder: "Enter your full name...",
                            className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-slate-950 focus:bg-white transition-all"
                        })
                    ),

                    // 2. Gender
                    e("div", { className: "flex flex-col gap-1" },
                        e("label", { className: "text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono-data" }, "Gender"),
                        e("div", { className: "grid grid-cols-3 gap-2" },
                            ["Female", "Male", "Other"].map(g => e("button", {
                                key: g,
                                type: "button",
                                onClick: () => setGender(g),
                                className: "py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center " + (gender === g ? "bg-slate-950 text-white border-slate-950 shadow-xs" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300")
                            }, g))
                        )
                    ),

                    // 3. Phone Number
                    e("div", { className: "flex flex-col gap-1" },
                        e("label", { className: "text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono-data" }, "Phone Number"),
                        e("input", {
                            type: "tel",
                            value: phone,
                            onChange: (e) => setPhone(e.target.value),
                            placeholder: "Enter mobile number (e.g. +91 98765 43210)...",
                            className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold font-mono-data focus:outline-none focus:border-slate-950 focus:bg-white transition-all"
                        })
                    ),

                    // 4. Nationality
                    e("div", { className: "flex flex-col gap-1" },
                        e("label", { className: "text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono-data" }, "Nationality"),
                        e("input", {
                            type: "text",
                            value: nationality,
                            onChange: (e) => setNationality(e.target.value),
                            placeholder: "e.g. India, United States, UK...",
                            className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-slate-950 focus:bg-white transition-all"
                        })
                    ),

                    // Submit Button
                    e("button", {
                        type: "submit",
                        className: "w-full mt-2 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-heading font-black text-xs tracking-wider uppercase shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    }, "CONTINUE TO SAFORA ➔")
                ),

                e("div", { className: "flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono-data" },
                    e("span", { className: "inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
                    "SAFE & VERIFIED TOURIST PASS"
                )
            )
        );
    }


    function HomeDashboard({
        userProfile,
        livePlaceName,
        onNavigate,
        onOpenNotifications,
        unreadNotificationsCount,
        onOpenProfile,
        // Safety Section Props
        isSosActive,
        setIsSosActive,
        selectedCategory,
        setSelectedCategory,
        handleSosTrigger,
        handleCancelEmergency,
        playSirenSound,
        touristLatLong,
        setTouristLatLong,
        isUsingRealGps,
        setIsUsingRealGps,
        profile,
        setProfile,
        lostReports,
        setLostReports,
        myLocalLostIds,
        setMyLocalLostIds,
        handleLostFoundSubmit,
        handleDismissMyReport,
        handleClearAllMyReports,
        isFilingLostModalOpen,
        setIsFilingLostModalOpen,
        broadcastAlerts,
        selectedLang
    }) {
        const displayName = (userProfile && userProfile.name) ? userProfile.name.split(' ')[0] : "Traveler";

        return e("div", { className: "flex flex-col gap-4 pb-4" },
            // Top Bar
            e("header", { className: "flex items-center justify-between pt-3 md:pt-4 pb-1.5 border-b border-slate-200/80" },
                e("div", { className: "flex flex-col" },
                    e("h2", { className: "text-base md:text-xl font-heading font-black text-slate-900 tracking-tight flex items-center gap-1.5" },
                        "👋 Welcome, " + displayName
                    ),
                    e("div", { className: "flex items-center gap-1.5 text-[11px] md:text-xs font-semibold text-slate-500 mt-0.5" },
                        e("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" }),
                        e("span", { className: "truncate max-w-[210px] md:max-w-none" }, "📍 " + (livePlaceName || "Colaba Corridor, Mumbai"))
                    )
                ),
                e("div", { className: "flex items-center gap-2" },
                    e("button", {
                        onClick: onOpenNotifications,
                        className: "relative w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs flex items-center justify-center transition-all active:scale-95"
                    },
                        e("span", { className: "text-base" }, "🔔"),
                        unreadNotificationsCount > 0 && e("span", {
                            className: "absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center border-2 border-white"
                        }, unreadNotificationsCount)
                    ),
                    e("button", {
                        onClick: onOpenProfile,
                        title: "Open Profile",
                        className: "w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-700 text-white font-heading font-black text-xs md:text-sm shadow-md border border-slate-800 flex items-center justify-center hover:ring-2 hover:ring-indigo-400/60 transition-all active:scale-95 overflow-hidden p-0.5"
                    },
                        (userProfile && userProfile.avatar) ? (
                            (userProfile.avatar.startsWith("data:") || userProfile.avatar.startsWith("images/") || userProfile.avatar.startsWith("http")) ?
                                e("img", { src: userProfile.avatar, alt: "Profile", className: "w-full h-full object-cover rounded-xl" }) :
                                e("span", { className: "text-base md:text-lg select-none leading-none" }, userProfile.avatar)
                        ) : displayName.charAt(0).toUpperCase()
                    )
                )
            ),

            // Weather Card
            e("div", { className: "rounded-3xl p-4 md:p-6 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden flex flex-col gap-2.5 md:gap-3" },
                e("div", { className: "flex items-start justify-between relative z-10" },
                    e("div", null,
                        e("div", { className: "flex items-center gap-2" },
                            e("span", { className: "text-2xl" }, "🌤"),
                            e("span", { className: "text-2xl font-heading font-black tracking-tight" }, "28°C"),
                            e("span", { className: "text-xs font-bold text-sky-100 bg-white/20 px-2 py-0.5 rounded-full" }, "Partly Sunny")
                        ),
                        e("p", { className: "text-xs font-black tracking-wide uppercase text-sky-100 mt-1" },
                            "Safe To Travel Today"
                        )
                    ),
                    e("div", { className: "text-right font-mono-data text-[10px] text-sky-100/90" },
                        e("p", null, "AQI: 42 (Good)"),
                        e("p", null, "UV: Index 2 (Low)"),
                        e("p", null, "Wind: 12 km/h")
                    )
                ),
                e("div", { className: "pt-2 border-t border-white/20 flex items-center gap-2 overflow-hidden" },
                    e("span", { className: "px-2 py-0.5 rounded-full bg-rose-500/85 text-white text-[9px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-xs" },
                        e("span", { className: "w-1.5 h-1.5 rounded-full bg-white animate-pulse" }),
                        "RADAR ALERT"
                    ),
                    e("div", { className: "ticker-container flex-1 overflow-hidden", style: { overflow: "hidden", whiteSpace: "nowrap", position: "relative", width: "100%" } },
                        e("div", {
                            className: "ticker-content font-bold text-[11px] text-white/95 tracking-wide",
                            style: {
                                display: "inline-block",
                                whiteSpace: "nowrap",
                                paddingLeft: "100%",
                                animation: "radarMarquee 26s linear infinite"
                            }
                        },
                            "🚨 High tide coastal alert active after 18:00   ✦   🛡️ 24/7 Police safety booths & mobile patrols active   ✦   🚑 EMS 108/112 telemetry linked with live GPS   ✦   📍 All green tourist corridors open & secured   ✦   ⚠️ Emergency SOS net online"
                        )
                    )
                )
            ),

            // Safety Section Feature on Front Page (Replacing the 4 options)
            e(StaySafeSection, {
                hideHeader: true,
                onBackToHome: null,
                isSosActive: isSosActive,
                setIsSosActive: setIsSosActive,
                selectedCategory: selectedCategory,
                setSelectedCategory: setSelectedCategory,
                handleSosTrigger: handleSosTrigger,
                handleCancelEmergency: handleCancelEmergency,
                playSirenSound: playSirenSound,
                touristLatLong: touristLatLong,
                setTouristLatLong: setTouristLatLong,
                isUsingRealGps: isUsingRealGps,
                setIsUsingRealGps: setIsUsingRealGps,
                livePlaceName: livePlaceName,
                profile: userProfile || profile,
                setProfile: setProfile,
                lostReports: lostReports,
                setLostReports: setLostReports,
                myLocalLostIds: myLocalLostIds,
                setMyLocalLostIds: setMyLocalLostIds,
                handleLostFoundSubmit: handleLostFoundSubmit,
                handleDismissMyReport: handleDismissMyReport,
                handleClearAllMyReports: handleClearAllMyReports,
                isFilingLostModalOpen: isFilingLostModalOpen,
                setIsFilingLostModalOpen: setIsFilingLostModalOpen,
                broadcastAlerts: broadcastAlerts || [],
                selectedLang: selectedLang
            })
        );
    }

    function generateSmartTripPlan({
        destination = "Goa",
        days = 3,
        travelStyle = "group", // "solo" or "group"
        peopleCount = 4,
        travelMode = "Road / Car Rental", // "Flight", "Train", "Road / Car Rental", "Tourist Bus", "Local Cabs"
        budgetTier = "Moderate" // "Budget", "Moderate", "Luxury"
    }) {
        const dest = (destination || "Goa").trim();
        const dCount = parseInt(days) || 3;
        const pCount = travelStyle === "solo" ? 1 : Math.max(2, parseInt(peopleCount) || 2);
        const roomsCount = Math.ceil(pCount / 2);
        const nights = Math.max(1, dCount - 1);

        // Baseline rates per day / unit
        let roomRatePerNight = 3500;
        let foodPerPersonDay = 1200;
        let sightsPerPersonDay = 600;
        let emergencyPerPerson = 500;

        let transitFlight = 6000;
        let transitTrain = 2000;
        let transitCarDay = 3800;
        let transitBus = 1200;
        let transitLocalDay = 700;

        if (budgetTier === "Budget") {
            roomRatePerNight = 1400;
            foodPerPersonDay = 600;
            sightsPerPersonDay = 300;
            emergencyPerPerson = 250;
            transitFlight = 4500;
            transitTrain = 1000;
            transitCarDay = 2400;
            transitBus = 800;
            transitLocalDay = 400;
        } else if (budgetTier === "Luxury") {
            roomRatePerNight = 9500;
            foodPerPersonDay = 2800;
            sightsPerPersonDay = 1400;
            emergencyPerPerson = 1200;
            transitFlight = 12000;
            transitTrain = 3500;
            transitCarDay = 7500;
            transitBus = 2200;
            transitLocalDay = 1800;
        }

        const totalStay = roomRatePerNight * roomsCount * nights;
        const totalFood = foodPerPersonDay * pCount * dCount;
        const totalSights = sightsPerPersonDay * pCount * dCount;
        const totalEmergency = emergencyPerPerson * pCount;

        let totalTransit = 0;
        if (travelMode.toLowerCase().includes("flight")) {
            totalTransit = transitFlight * pCount;
        } else if (travelMode.toLowerCase().includes("train")) {
            totalTransit = transitTrain * pCount;
        } else if (travelMode.toLowerCase().includes("road") || travelMode.toLowerCase().includes("car")) {
            totalTransit = transitCarDay * dCount;
        } else if (travelMode.toLowerCase().includes("bus")) {
            totalTransit = transitBus * pCount;
        } else {
            totalTransit = transitLocalDay * pCount * dCount;
        }

        const totalCost = totalStay + totalTransit + totalFood + totalSights + totalEmergency;
        const perPersonCost = Math.round(totalCost / pCount);

        // Day-by-day itinerary tailored to Solo vs Group and Destination
        const itinerary = [];
        const isGroup = travelStyle === "group";

        for (let i = 1; i <= dCount; i++) {
            let dayPlan = {
                day: i,
                title: `Day ${i}: Highlights of ${dest}`,
                morning: isGroup
                    ? `Group meetup at hotel lobby at 08:30 AM. Travel together via ${travelMode} to primary heritage sites in ${dest} before noon crowds.`
                    : `Morning solo exploration at registered heritage monuments in ${dest}. Well-patrolled walking corridors and licensed audio guide recommended.`,
                afternoon: isGroup
                    ? `Shared group lunch at verified hygiene-certified restaurant with family dining tables. Visit iconic markets and group photo viewpoints.`
                    : `Relaxed solo lunch at a cozy local cafe. Quiet afternoon museum visit and authentic handicraft shopping.`,
                evening: isGroup
                    ? `Sunset gathering along the prominent waterfront or scenic overlook. Group dinner and lively cultural entertainment along safe corridors.`
                    : `Peaceful sunset walk along illuminated promenade. Safe solo dining at verified tourist restaurant monitored by local police post.`,
                safetyNote: isGroup
                    ? `Group Safety Rule: Keep group live tracking enabled on WhatsApp/SAFORA. Designate meeting points.`
                    : `Solo Traveler Safety: Dedicated Tourist Police SOS booth within 1km. Lit walkways throughout evening schedule.`,
                estimatedDayCost: isGroup
                    ? `₹${Math.round((totalFood + totalSights) / dCount / pCount).toLocaleString('en-IN')} / person (excl. stay)`
                    : `₹${Math.round((totalFood + totalSights) / dCount).toLocaleString('en-IN')} (excl. stay)`
            };

            const destLower = dest.toLowerCase();
            if (destLower.includes("goa")) {
                if (i === 1) {
                    dayPlan.title = "Day 1: Coastal Forts & Golden Beaches";
                    dayPlan.morning = isGroup
                        ? `Head to Fort Aguada & 1864 Lighthouse via ${travelMode}. Great group photo spots overlooking Sinquerim bay.`
                        : `Visit Fort Aguada & historic lighthouse at 09:00 AM. Safe pedestrian path and tourist police assistance available.`;
                    dayPlan.afternoon = "Authentic Goan lunch (Fish thali / vegetarian Xacuti) at Ritz Classic. Relax at Sinquerim beach.";
                    dayPlan.evening = isGroup
                        ? "Sunset beach gathering at Baga promenade. Group beach shack dinner with live acoustic music. Drishti lifeguards on duty."
                        : "Sunset walk along Baga-Calangute illuminated promenade. Safe dining near well-lit central strip.";
                } else if (i === 2) {
                    dayPlan.title = "Day 2: UNESCO Old Goa & Latin Quarter";
                    dayPlan.morning = "Explore Basilica of Bom Jesus and Se Cathedral. Marvel at 400-year-old Baroque architecture.";
                    dayPlan.afternoon = "Stroll through colorful Portuguese streets of Fontainhas in Panaji. Coffee and traditional Bebinca pastry.";
                    dayPlan.evening = isGroup
                        ? "Sunset Mandovi river cruise with live Konkani folk performances. Book group tickets together at government jetty."
                        : "Scenic Mandovi river twilight ferry ride. Evening dinner at peaceful heritage bistro in Fontainhas.";
                } else {
                    dayPlan.title = "Day 3: South Goa Nature & Serene Bays";
                    dayPlan.morning = "Drive to tranquil Pomburpa Natural Spring or secluded Butterfly Beach.";
                    dayPlan.afternoon = "Lunch at Martin's Corner in Betalbatim. Renowned coastal cuisine and verified hygiene.";
                    dayPlan.evening = "Sunset at Palolem beach or Colva promenade. Safe, peaceful atmosphere to wrap up your trip.";
                }
            } else if (destLower.includes("jaipur")) {
                if (i === 1) {
                    dayPlan.title = "Day 1: Royal Fortresses of the Pink City";
                    dayPlan.morning = isGroup
                        ? `Group arrival at Amber Fort via ${travelMode}. Take authorized electric shuttle up the hill. Explore Sheesh Mahal mirrors together.`
                        : `Amber Fort & Palace morning tour. Authorized audio guide and easy walking ramps. Explore the exquisite Sheesh Mahal.`;
                    dayPlan.afternoon = "Stop at Jal Mahal lake viewpoint and Panna Meena Stepwell. Lunch at LMB (authentic Dal Baati Churma).";
                    dayPlan.evening = "Hawa Mahal night illumination view from rooftop cafes. Safe Rajasthan Tourist Police vigilance zone.";
                } else if (i === 2) {
                    dayPlan.title = "Day 2: Royal Palaces & Astronomical Marvels";
                    dayPlan.morning = "City Palace royal courtyards and Jantar Mantar UNESCO observatory.";
                    dayPlan.afternoon = "Traditional block-printing demonstration and royal Ghevar sweet tasting at Kanha Sweets.";
                    dayPlan.evening = "Nahargarh Fort panoramic sunset view overlooking the entire illuminated Pink City skyline.";
                } else {
                    dayPlan.title = "Day 3: Heritage Bazaars & Folk Culture";
                    dayPlan.morning = "Gatore Ki Chhatriyan marble cenotaphs nestled quietly beneath the Aravalli hills.";
                    dayPlan.afternoon = "Johari Bazaar and Bapu Bazaar handicraft shopping with government fixed-price emporiums.";
                    dayPlan.evening = "Traditional Rajasthani folk dance and cultural dinner evening at Chokhi Dhani.";
                }
            } else if (destLower.includes("kashmir")) {
                if (i === 1) {
                    dayPlan.title = "Day 1: Dal Lake & Mughal Gardens";
                    dayPlan.morning = isGroup
                        ? `Board traditional wooden Shikara boats for a group morning cruise through Dal Lake floating flower markets.`
                        : `Serene morning Shikara ride on Dal Lake visiting lotus clusters and floating gardens. J&K tourist police on patrol.`;
                    dayPlan.afternoon = "Visit Nishat Bagh and Shalimar Bagh Mughal gardens. Lunch at Ahdoos (Kashmiri Wazwan & Kahwa).";
                    dayPlan.evening = "Boulevard Road lakeside walk admiring sunset reflections on the Pir Panjal mountains.";
                } else if (i === 2) {
                    dayPlan.title = "Day 2: Gulmarg High Altitude Gondola";
                    dayPlan.morning = `Drive to Gulmarg via ${travelMode}. Take the world's highest cable car (Gondola Phase 1 & 2) up to Apharwat peak.`;
                    dayPlan.afternoon = "Snow walk or skiing with certified state guides. Savor hot Kahwa tea at 13,000 ft.";
                    dayPlan.evening = "Return to Srinagar. Relax aboard a heritage hand-carved cedar houseboat.";
                } else {
                    dayPlan.title = "Day 3: Pahalgam Valley of Shepherds";
                    dayPlan.morning = "Scenic drive past Pampore saffron fields to Betaab Valley and Aru Valley.";
                    dayPlan.afternoon = "Riverside walk along Lidder River. Fresh trout lunch at authorized riverside cafe.";
                    dayPlan.evening = "Visit local Kashmiri handicraft cooperative for authentic GI-tagged Pashmina shawls.";
                }
            } else if (destLower.includes("navi mumbai") || destLower.includes("mumbai")) {
                if (i === 1) {
                    dayPlan.title = "Day 1: Iconic Waterfront & Heritage Landmarks";
                    dayPlan.morning = "Gateway of India and historic Taj Mahal Palace. Scenic ferry cruise across Mumbai Harbour.";
                    dayPlan.afternoon = "CSMVS Museum (Prince of Wales) art galleries and lunch at Colaba Causeway heritage cafes.";
                    dayPlan.evening = "Marine Drive Queen's Necklace promenade walk watching the sunset and sparkling night curve.";
                } else if (i === 2) {
                    dayPlan.title = "Day 2: Coastal Wetlands & Flamingos";
                    dayPlan.morning = "Visit TS Chanakya Flamingo Sanctuary boardwalk in Nerul. Witness thousands of pink flamingos.";
                    dayPlan.afternoon = "Jewel of Navi Mumbai lake promenade and lunch along Palm Beach Road.";
                    dayPlan.evening = "Wonders Park Seven Wonders replicas and evening dancing musical fountain show.";
                } else {
                    dayPlan.title = "Day 3: Hilltop Views & Historic Forts";
                    dayPlan.morning = "Parsik Hill elevated viewpoint and 16th-century Belapur Fort stone ramparts.";
                    dayPlan.afternoon = "Kharghar Central Park botanical gardens and Grand ISKCON Vedic marble temple.";
                    dayPlan.evening = "Sagar Vihar waterfront sunset walk in Vashi overlooking the Thane Creek waters.";
                }
            }

            itinerary.push(dayPlan);
        }

        return {
            destination: dest,
            days: dCount,
            travelStyle,
            peopleCount: pCount,
            travelMode,
            budgetTier,
            budgetSummary: {
                totalCost,
                perPersonCost,
                roomsCount,
                nights,
                breakdown: {
                    stay: { total: totalStay, perPerson: Math.round(totalStay / pCount), label: `Accommodation / Hotel (${roomsCount} ${roomsCount > 1 ? "Rooms" : "Room"}, ${nights}N)` },
                    transit: { total: totalTransit, perPerson: Math.round(totalTransit / pCount), label: `Travel & Transit (${travelMode})` },
                    food: { total: totalFood, perPerson: Math.round(totalFood / pCount), label: `Food & Dining (${dCount} Days)` },
                    sights: { total: totalSights, perPerson: Math.round(totalSights / pCount), label: `Activities & Monument Sightseeing` },
                    emergency: { total: totalEmergency, perPerson: Math.round(totalEmergency / pCount), label: `SAFORA Safety & Emergency Buffer` }
                }
            },
            itinerary
        };
    }

    function generateSmartTripItinerary(destination, days, budgetTier) {
        return generateSmartTripPlan({ destination, days, budgetTier }).itinerary;
    }

        const VERIFIED_HOTELS_DATA = [
        {
            name: "Taj Mahal Palace & Tower",
            city: "Mumbai (Colaba)",
            safetyScore: 9.9,
            rating: 4.9,
            priceRange: "₹₹₹₹",
            accreditation: "Ministry of Tourism 5-Star Deluxe",
            features: ["24/7 Security & Baggage Scanner", "Solo-Female Traveler Floor", "Doctor on Call", "Direct Police Hotline"],
            phone: "+91-22-6665-3366",
            address: "Apollo Bunder, Colaba, Mumbai"
        },
        {
            name: "Rambagh Palace",
            city: "Jaipur (Bhawani Singh Rd)",
            safetyScore: 9.8,
            rating: 4.9,
            priceRange: "₹₹₹₹",
            accreditation: "Heritage Grand Verified",
            features: ["CCTV Corridors", "Government Regd Chauffeur Fleet", "24/7 Paramedic Desk"],
            phone: "+91-141-221-1919",
            address: "Bhawani Singh Rd, Jaipur, Rajasthan"
        },
        {
            name: "The Lalit Grand Palace",
            city: "Srinagar, Kashmir",
            safetyScore: 9.8,
            rating: 4.8,
            priceRange: "₹₹₹",
            accreditation: "J&K Tourism Gold Certified",
            features: ["Gated Perimeter with CRPF Guard", "Direct Helipad Access", "24/7 Heated Emergency Care"],
            phone: "+91-194-250-1001",
            address: "Gupkar Road, Srinagar, Jammu & Kashmir"
        },
        {
            name: "ITC Grand Goa Resort & Spa",
            city: "Goa (Arossim Beach)",
            safetyScore: 9.7,
            rating: 4.8,
            priceRange: "₹₹₹",
            accreditation: "Green & Safe Tourism Certified",
            features: ["Private Guarded Beach Corridor", "Drishti Certified Lifeguards", "24/7 Clinic"],
            phone: "+91-832-272-1234",
            address: "Arossim Beach, Cansaulim, South Goa"
        },
        {
            name: "The Imperial",
            city: "New Delhi (Janpath)",
            safetyScore: 9.8,
            rating: 4.8,
            priceRange: "₹₹₹₹",
            accreditation: "Delhi Tourism Safe Stay Certified",
            features: ["Automated Safety Keycards", "Embassy Corridor Escorts", "Night Concierge Desk"],
            phone: "+91-11-2334-1234",
            address: "Janpath, Connaught Place, New Delhi"
        }
    ];

    const SCAM_ALERTS_DATA = [
        {
            title: "Unmetered Taxi / Hotel Diversion Scam",
            severity: "High",
            locations: "Delhi Airport, Mumbai CST, Goa Airport",
            description: "Drivers claim the meter is broken or that your booked hotel is closed or under maintenance to redirect you to an overpriced commission hotel.",
            preventionTip: "Always use prepaid police airport taxi counters or app-based cabs. Never alter your destination based on driver claims without calling your hotel directly.",
            helpline: "National Tourist Police: 1800-11-1363"
        },
        {
            title: "Gemstone & Souvenir Export Trap",
            severity: "Medium",
            locations: "Jaipur Johari Bazaar, Agra, Delhi",
            description: "Unverified vendors offer 'duty-free gemstones' promising high resale value abroad with fake certificates.",
            preventionTip: "Purchase gemstones only from government-approved emporiums with genuine BIS Hallmark and GIA lab certification.",
            helpline: "National Consumer Helpline: 1915"
        },
        {
            title: "Unauthorized Monument Touts & Fake Queue Skips",
            severity: "Medium",
            locations: "Amber Fort, Taj Mahal, Red Fort",
            description: "Touts without official government badges demand cash for fake skip-the-line privileges.",
            preventionTip: "Official monument entry passes are issued only at ASI counters or the official ASI ticketing website. Demand to see the Ministry of Tourism photo ID badge.",
            helpline: "Archaeological Survey of India: 011-2301-3574"
        },
        {
            title: "Beach Shack Unquoted Seafood Surcharge",
            severity: "Low - Medium",
            locations: "North Goa Beaches",
            description: "Shack bills include unquoted seafood weights or undisclosed extra service taxes.",
            preventionTip: "Always verify per-gram pricing and exact weight before ordering fresh catch. Request itemized printed bills.",
            helpline: "Goa Tourism Helpline: 1364"
        }
    ];

    const NEARBY_EMERGENCY_SERVICES = [
        { name: "Bombay Hospital & Medical Research Centre", type: "Hospital (EMS)", distance: "1.2 km", phone: "108", time: "4 mins", status: "24/7 Trauma Care Active" },
        { name: "Colaba Police Station & Tourism Safety Post", type: "Police Station", distance: "0.4 km", phone: "112", time: "2 mins", status: "Active Patrolling Unit" },
        { name: "Apollo Pharmacy 24/7 Heritage Outlet", type: "Pharmacy", distance: "0.3 km", phone: "+91-22-2282-1400", time: "1 min", status: "Open Now • Multi-lingual Staff" },
        { name: "Consulate General Assistance Helpdesk", type: "Embassy / Consulate", distance: "2.8 km", phone: "+91-22-2672-4000", time: "8 mins", status: "Diplomatic Emergency Liaison" }
    ];

    const BEST_TIME_TO_VISIT_DATA = [
        { city: "Goa", season: "Nov – Feb", label: "Peak Season", weather: "22°C – 31°C", advice: "Pleasant sea breezes, open beach shacks and clear waters. Advance hotel bookings recommended." },
        { city: "Jaipur", season: "Oct – Mar", label: "Best Season", weather: "15°C – 28°C", advice: "Sunny cool afternoons, ideal for exploring forts and heritage bazaars comfortably." },
        { city: "Kashmir", season: "Apr – Oct (Meadows) / Dec – Feb (Snow)", label: "All Seasons", weather: "8°C – 24°C", advice: "Spring & summer offer blooming tulip valleys; winter brings world-class powder snow in Gulmarg." },
        { city: "Delhi", season: "Oct – Mar", label: "Pleasant Winter", weather: "12°C – 26°C", advice: "Crisp sunny afternoons, great food walks and open monuments. Light woolens recommended in Dec/Jan." },
        { city: "Mumbai", season: "Nov – Feb", label: "Milder Winter", weather: "20°C – 30°C", advice: "Low humidity, cool sea breezes along Marine Drive. Best time for walking tours." }
    ];

    const FIVE_DAY_WEATHER = [
        { day: "Today", temp: "28°C", condition: "Sunny & Clear", icon: "🌤", aqi: "42 (Good)", safe: true },
        { day: "Tomorrow", temp: "29°C", condition: "Gentle Sea Breeze", icon: "🌤", aqi: "48 (Good)", safe: true },
        { day: "Day 3", temp: "27°C", condition: "Passing Clouds", icon: "⛅", aqi: "50 (Moderate)", safe: true },
        { day: "Day 4", temp: "28°C", condition: "Clear Skies", icon: "☀️", aqi: "44 (Good)", safe: true },
        { day: "Day 5", temp: "30°C", condition: "Warm & Sunny", icon: "☀️", aqi: "52 (Moderate)", safe: true }
    ];



// =========================================================================
    // CARD 1 : PLAN MODULE (STEP-BY-STEP QUESTIONNAIRE WIZARD)
    // =========================================================================
    function PlanSection({ onBackToHome, initialSubTab = "planner", savedTrips, setSavedTrips }) {
        const [subTab, setSubTab] = useState(initialSubTab);
        const [currentStep, setCurrentStep] = useState(1); // 1: Traveler, 2: Destination, 3: Trip Style, 4: Review

        // Questionnaire State
        const [travelStyle, setTravelStyle] = useState("group"); // "solo" or "group"
        const [peopleCount, setPeopleCount] = useState(4);
        const [dreamPrompt, setDreamPrompt] = useState("");
        const [destination, setDestination] = useState("Goa");
        const [days, setDays] = useState(3);
        const [travelMode, setTravelMode] = useState("Road / Car Rental");
        const [styleTheme, setStyleTheme] = useState("Relaxed & Leisure");
        const [budgetTier, setBudgetTier] = useState("Moderate");

        const [isGenerating, setIsGenerating] = useState(false);
        const [generatedPlan, setGeneratedPlan] = useState(null);
        const [saveToast, setSaveToast] = useState("");
        const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

        const handleGeneratePlan = () => {
            setIsGenerating(true);
            setTimeout(() => {
                const plan = generateSmartTripPlan({
                    destination,
                    days,
                    travelStyle,
                    peopleCount: travelStyle === "solo" ? 1 : peopleCount,
                    travelMode,
                    budgetTier
                });
                setGeneratedPlan(plan);
                setIsGenerating(false);
                setCurrentStep(4);
                window.scrollTo({ top: 120, behavior: "smooth" });
            }, 350);
        };

        const handleSaveTrip = () => {
            if (!generatedPlan) return;
            const isSolo = generatedPlan.travelStyle === "solo" || generatedPlan.peopleCount <= 1;
            const newTrip = {
                id: Date.now(),
                destination: generatedPlan.destination,
                days: generatedPlan.days,
                travelStyle: generatedPlan.travelStyle,
                peopleCount: isSolo ? 1 : generatedPlan.peopleCount,
                travelMode: generatedPlan.travelMode,
                budgetTier: generatedPlan.budgetTier,
                totalCost: generatedPlan.budgetSummary.totalCost,
                perPersonCost: generatedPlan.budgetSummary.perPersonCost,
                createdAt: new Date().toLocaleDateString(),
                title: `${generatedPlan.destination} (${isSolo ? "Solo Traveler" : `Group of ${generatedPlan.peopleCount}`})`,
                budget: isSolo
                    ? `₹${generatedPlan.budgetSummary.totalCost.toLocaleString('en-IN')} (Total)`
                    : `₹${generatedPlan.budgetSummary.perPersonCost.toLocaleString('en-IN')} / person`
            };
            const updated = [newTrip, ...(savedTrips || [])];
            if (setSavedTrips) setSavedTrips(updated);
            try {
                localStorage.setItem("safora_saved_trips_v2", JSON.stringify(updated));
            } catch (e) {}
            setSaveToast(isSolo
                ? `✓ Saved solo trip to ${generatedPlan.destination} to your profile!`
                : `✓ Saved group trip to ${generatedPlan.destination} with budget split to your profile!`);
            setTimeout(() => setSaveToast(""), 3500);
        };

        const handleDeleteSavedTrip = (id) => {
            const updated = (savedTrips || []).filter(t => t.id !== id);
            if (setSavedTrips) setSavedTrips(updated);
            try {
                localStorage.setItem("safora_saved_trips_v2", JSON.stringify(updated));
            } catch (e) {}
        };

        const handleShareWhatsApp = () => {
            if (!generatedPlan) return;
            const b = generatedPlan.budgetSummary;
            const isSolo = generatedPlan.travelStyle === "solo" || generatedPlan.peopleCount <= 1;
            const text = isSolo
                ? `✈️ Solo Trip to ${generatedPlan.destination} (${generatedPlan.days} Days)\n` +
                  `🎒 Travel Style: Solo Traveler\n` +
                  `🚗 Mode: ${generatedPlan.travelMode}\n` +
                  `🎨 Style: ${styleTheme}\n\n` +
                  `💰 Total Estimated Budget: ₹${b.totalCost.toLocaleString('en-IN')}\n` +
                  `📅 Avg. Daily Cost: ₹${Math.round(b.totalCost / (generatedPlan.days || 1)).toLocaleString('en-IN')} / day\n\n` +
                  `Cost Breakdown:\n` +
                  `• Stay: ₹${b.breakdown.stay.total.toLocaleString('en-IN')}\n` +
                  `• Transit: ₹${b.breakdown.transit.total.toLocaleString('en-IN')}\n` +
                  `• Food: ₹${b.breakdown.food.total.toLocaleString('en-IN')}\n` +
                  `• Sights: ₹${b.breakdown.sights.total.toLocaleString('en-IN')}\n` +
                  `• Safety Buffer: ₹${b.breakdown.emergency.total.toLocaleString('en-IN')}\n\n` +
                  `Planned on SAFORA Tourist Safety & Smart Planner`
                : `✈️ Trip to ${generatedPlan.destination} (${generatedPlan.days} Days)\n` +
                  `👥 Travel Style: Group of ${generatedPlan.peopleCount} People\n` +
                  `🚗 Mode: ${generatedPlan.travelMode}\n` +
                  `🎨 Style: ${styleTheme}\n\n` +
                  `💰 Total Estimated Budget: ₹${b.totalCost.toLocaleString('en-IN')}\n` +
                  `👉 SPLIT PER PERSON: ₹${b.perPersonCost.toLocaleString('en-IN')}\n\n` +
                  `Breakdown per person:\n` +
                  `• Stay: ₹${b.breakdown.stay.perPerson.toLocaleString('en-IN')}\n` +
                  `• Transit: ₹${b.breakdown.transit.perPerson.toLocaleString('en-IN')}\n` +
                  `• Food: ₹${b.breakdown.food.perPerson.toLocaleString('en-IN')}\n` +
                  `• Sights: ₹${b.breakdown.sights.perPerson.toLocaleString('en-IN')}\n` +
                  `• Safety Buffer: ₹${b.breakdown.emergency.perPerson.toLocaleString('en-IN')}\n\n` +
                  `Planned on SAFORA Tourist Safety & Smart Planner`;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text);
                setCopiedWhatsApp(true);
                setTimeout(() => setCopiedWhatsApp(false), 3000);
            }
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
        };

        const STEPS = [
            { num: 1, label: "Traveler", icon: "🎒" },
            { num: 2, label: "Destination", icon: "📍" },
            { num: 3, label: "Trip Style", icon: "🚗" },
            { num: 4, label: "Review", icon: "✨" }
        ];

        return e("div", { className: "flex flex-col gap-4 pb-8" },
            // Section Header (small < back button + centered "Trip Plan")
            e("div", { className: "flex items-center justify-between pt-2 pb-1 border-b border-slate-200 min-h-[40px]" },
                e("button", {
                    onClick: onBackToHome,
                    className: "w-8 h-8 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-50 font-bold active:scale-95 transition-all shrink-0",
                    title: "Back to Home"
                },
                    e("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5 },
                        e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" })
                    )
                ),
                e("h2", { className: "font-heading font-black text-xl text-slate-900 tracking-tight text-center flex-1" },
                    "Trip Plan"
                ),
                e("div", { className: "w-8 shrink-0" })
            ),

            // Navigation Subtabs
            e("div", { className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5" },
                [
                    { id: "planner", label: "Smart Planner (4-Step)" },
                    { id: "bestTime", label: "Best Seasons" },
                    { id: "weather", label: "Live Weather" },
                    { id: "saved", label: `Saved Trips (${savedTrips ? savedTrips.length : 0})` }
                ].map(item => e("button", {
                    key: item.id,
                    onClick: () => setSubTab(item.id),
                    className: "px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all " + (subTab === item.id ? "bg-slate-950 text-white shadow-xs" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50")
                }, item.label))
            ),

            // Toast Alert
            saveToast && e("div", { className: "p-3 rounded-xl bg-slate-950 text-white text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in" },
                e("span", null, saveToast),
                e("button", { onClick: () => setSaveToast(""), className: "text-slate-400 hover:text-white" }, "✕")
            ),

            // =============================================================
            // TAB 1: STEP-BY-STEP QUESTIONNAIRE & GENERATED ITINERARY
            // =============================================================
            subTab === "planner" && e("div", { className: "flex flex-col gap-4" },
                // 4-STEP PROGRESS INDICATOR (Matching Reference)
                e("div", { className: "w-full p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs" },
                    e("div", { className: "flex items-center justify-between relative px-2" },
                        // Background Connecting Bar
                        e("div", { className: "absolute left-6 right-6 top-4 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" },
                            e("div", {
                                className: "h-full bg-slate-950 transition-all duration-300",
                                style: { width: `${((currentStep - 1) / 3) * 100}%` }
                            })
                        ),
                        STEPS.map((s) => {
                            const isCompleted = currentStep > s.num;
                            const isCurrent = currentStep === s.num;
                            const isAccessible = s.num <= currentStep || (s.num === 4 && !!generatedPlan);
                            return e("button", {
                                key: s.num,
                                type: "button",
                                disabled: !isAccessible,
                                onClick: () => {
                                    if (isAccessible) setCurrentStep(s.num);
                                },
                                className: "relative z-10 flex flex-col items-center gap-1 focus:outline-none transition-all cursor-pointer disabled:cursor-not-allowed"
                            },
                                e("div", {
                                    className: "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all " +
                                        (isCompleted
                                            ? "bg-emerald-600 text-white shadow-xs"
                                            : isCurrent
                                                ? "bg-slate-950 text-white ring-4 ring-slate-900/10 shadow-sm scale-110"
                                                : "bg-white border-2 border-slate-200 text-slate-400")
                                },
                                    isCompleted ? "✓" : s.num
                                ),
                                e("span", {
                                    className: "text-[10px] sm:text-[11px] transition-colors " +
                                        (isCurrent
                                            ? "font-black text-slate-950"
                                            : isCompleted
                                                ? "font-bold text-emerald-700"
                                                : "font-medium text-slate-400")
                                }, s.label)
                            );
                        })
                    )
                ),

                // =========================================================
                // STEP 1: WHO IS TRAVELING? (SOLO OR GROUP)
                // =========================================================
                currentStep === 1 && e("div", { className: "p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4 animate-in fade-in duration-200" },
                    // Step header
                    e("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2.5" },
                        e("h3", { className: "font-heading font-black text-xs text-slate-950 uppercase tracking-wider flex items-center gap-1.5" },
                            e("span", null, "🧭"),
                            e("span", null, "Step-by-Step Travel Details")
                        ),
                        e("span", { className: "text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200" },
                            "Smart AI Tailored"
                        )
                    ),

                    // Question 1: Solo or Group
                    e("div", { className: "flex flex-col gap-2" },
                        e("div", null,
                            e("h4", { className: "text-xs font-black text-slate-900" }, "1. Who is traveling?"),
                            e("p", { className: "text-[11px] text-slate-500" }, "Select whether you are roaming solo or with companions")
                        ),
                        e("div", { className: "grid grid-cols-2 gap-2.5" },
                            [
                                { id: "solo", icon: "🎒", title: "Solo Traveler", desc: "Solo explorer routes & freedom" },
                                { id: "group", icon: "👥", title: "Group Trip", desc: "Friends or family adventure" }
                            ].map(st => e("button", {
                                key: st.id,
                                type: "button",
                                onClick: () => {
                                    setTravelStyle(st.id);
                                    if (st.id === "solo") setPeopleCount(1);
                                    else if (peopleCount < 2) setPeopleCount(4);
                                },
                                className: "p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all " +
                                    (travelStyle === st.id
                                        ? "bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-slate-950/20"
                                        : "bg-slate-50/80 text-slate-800 border-slate-200 hover:bg-slate-100")
                            },
                                e("span", { className: "text-2xl shrink-0 mt-0.5" }, st.icon),
                                e("div", { className: "flex-1 min-w-0" },
                                    e("p", { className: "font-black text-xs leading-tight" }, st.title),
                                    e("p", { className: "text-[10px] mt-0.5 " + (travelStyle === st.id ? "text-slate-300" : "text-slate-500") }, st.desc)
                                )
                            ))
                        )
                    ),

                    // If Group Trip: Group Counter
                    travelStyle === "group" && e("div", { className: "flex flex-col gap-2 pt-2 border-t border-slate-100 animate-in fade-in" },
                        e("div", { className: "flex items-center justify-between" },
                            e("label", { className: "text-xs font-bold text-slate-800" },
                                "How many people in the group?"
                            ),
                            e("span", { className: "text-xs font-black font-mono-data text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200" },
                                `${peopleCount} People`
                            )
                        ),
                        e("div", { className: "flex items-center gap-2" },
                            e("button", {
                                type: "button",
                                onClick: () => setPeopleCount(prev => Math.max(2, prev - 1)),
                                className: "w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-black flex items-center justify-center text-lg shrink-0 transition-all"
                            }, "−"),
                            e("div", { className: "flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5" },
                                [2, 3, 4, 5, 6, 8, 10, 12].map(cnt => e("button", {
                                    key: cnt,
                                    type: "button",
                                    onClick: () => setPeopleCount(cnt),
                                    className: "flex-1 min-w-[38px] py-2 px-2 rounded-xl text-xs font-bold shrink-0 transition-all " +
                                        (peopleCount === cnt
                                            ? "bg-slate-950 text-white shadow-xs"
                                            : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100")
                                }, `${cnt}P`))
                            ),
                            e("button", {
                                type: "button",
                                onClick: () => setPeopleCount(prev => Math.min(25, prev + 1)),
                                className: "w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-black flex items-center justify-center text-lg shrink-0 transition-all"
                            }, "+")
                        )
                    ),

                    // Quick Dream Trip / Voice Prompt Box (From Reference)
                    e("div", { className: "flex flex-col gap-2 pt-2 border-t border-slate-100" },
                        e("label", { className: "text-xs font-bold text-slate-800 flex items-center gap-1.5" },
                            e("span", null, "🎙️"),
                            e("span", null, "Or describe your dream trip in one sentence:")
                        ),
                        e("div", { className: "relative" },
                            e("input", {
                                type: "text",
                                value: dreamPrompt,
                                onChange: (ev) => setDreamPrompt(ev.target.value),
                                placeholder: "e.g. 3 days in Goa with beach parties & seafood under ₹15,000...",
                                className: "w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 text-xs font-medium text-slate-900 outline-none transition-colors"
                            }),
                            dreamPrompt && e("button", {
                                type: "button",
                                onClick: () => setDreamPrompt(""),
                                className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                            }, "✕")
                        ),
                        e("div", { className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5" },
                            [
                                { label: "🏖️ Goa Beach Holiday", city: "Goa", days: 3, style: "group", count: 4, mode: "Road / Car Rental" },
                                { label: "🏰 Jaipur Royal Forts", city: "Jaipur", days: 3, style: "group", count: 4, mode: "Train" },
                                { label: "🏔️ Kashmir Snow & Valley", city: "Kashmir", days: 4, style: "solo", count: 1, mode: "Flight" },
                                { label: "🌆 Mumbai Coastal Walk", city: "Mumbai", days: 2, style: "group", count: 2, mode: "Local Cabs / Metro" }
                            ].map((preset, idx) => e("button", {
                                key: idx,
                                type: "button",
                                onClick: () => {
                                    setDestination(preset.city);
                                    setDays(preset.days);
                                    setTravelStyle(preset.style);
                                    setPeopleCount(preset.count);
                                    setTravelMode(preset.mode);
                                    setDreamPrompt(`${preset.days} days in ${preset.city} (${preset.style === "solo" ? "Solo" : preset.count + " Pax"})`);
                                },
                                className: "px-2.5 py-1 rounded-lg text-[10px] font-bold shrink-0 transition-all bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }, preset.label))
                        )
                    ),

                    // Step 1 CTA Button
                    e("button", {
                        type: "button",
                        onClick: () => {
                            setCurrentStep(2);
                            window.scrollTo({ top: 120, behavior: "smooth" });
                        },
                        className: "w-full mt-2 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs tracking-wide shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                    },
                        e("span", null, "Continue to Destination"),
                        e("span", { className: "text-sm" }, "➔")
                    )
                ),

                // =========================================================
                // STEP 2: WHERE ARE YOU TRAVELING & HOW LONG?
                // =========================================================
                currentStep === 2 && e("div", { className: "p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4 animate-in fade-in duration-200" },
                    // Step header
                    e("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2.5" },
                        e("h3", { className: "font-heading font-black text-xs text-slate-950 uppercase tracking-wider flex items-center gap-1.5" },
                            e("span", null, "📍"),
                            e("span", null, "Destination & Trip Duration")
                        ),
                        e("span", { className: "text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full" },
                            "Step 2 of 4"
                        )
                    ),

                    // Question 2: Destination
                    e("div", { className: "flex flex-col gap-2" },
                        e("div", null,
                            e("h4", { className: "text-xs font-black text-slate-900" }, "2. Where do you want to go?"),
                            e("p", { className: "text-[11px] text-slate-500" }, "Enter any city or select a popular destination")
                        ),
                        e("div", { className: "relative" },
                            e("span", { className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" }, "📍"),
                            e("input", {
                                type: "text",
                                value: destination,
                                onChange: (ev) => setDestination(ev.target.value),
                                placeholder: "Type destination (e.g. Goa, Manali, Jaipur, Mumbai)...",
                                className: "w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 text-xs font-bold text-slate-900 outline-none transition-colors"
                            })
                        ),
                        e("div", { className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5" },
                            ["Goa", "Jaipur", "Kashmir", "Navi Mumbai", "Mumbai", "Delhi", "Manali", "Kerala"].map(city => e("button", {
                                key: city,
                                type: "button",
                                onClick: () => setDestination(city),
                                className: "px-3 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all " +
                                    (destination.toLowerCase() === city.toLowerCase()
                                        ? "bg-slate-950 text-white shadow-xs"
                                        : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100")
                            }, city))
                        )
                    ),

                    // Duration Counter
                    e("div", { className: "flex flex-col gap-2 pt-2 border-t border-slate-100" },
                        e("div", { className: "flex items-center justify-between" },
                            e("div", null,
                                e("h4", { className: "text-xs font-black text-slate-900" }, "How many days is your trip?"),
                                e("p", { className: "text-[11px] text-slate-500" }, "Select total duration of your stay")
                            ),
                            e("span", { className: "text-xs font-black font-mono-data text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200" },
                                `${days} Days`
                            )
                        ),
                        e("div", { className: "flex items-center gap-2" },
                            e("button", {
                                type: "button",
                                onClick: () => setDays(prev => Math.max(1, prev - 1)),
                                className: "w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-black flex items-center justify-center text-lg shrink-0 transition-all"
                            }, "−"),
                            e("div", { className: "flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5" },
                                [1, 2, 3, 4, 5, 7, 10].map(d => e("button", {
                                    key: d,
                                    type: "button",
                                    onClick: () => setDays(d),
                                    className: "flex-1 min-w-[42px] py-2 px-2 rounded-xl text-xs font-bold shrink-0 transition-all " +
                                        (days === d
                                            ? "bg-slate-950 text-white shadow-xs"
                                            : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100")
                                }, `${d}D`))
                            ),
                            e("button", {
                                type: "button",
                                onClick: () => setDays(prev => Math.min(14, prev + 1)),
                                className: "w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-black flex items-center justify-center text-lg shrink-0 transition-all"
                            }, "+")
                        )
                    ),

                    // Navigation Buttons
                    e("div", { className: "grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100" },
                        e("button", {
                            type: "button",
                            onClick: () => setCurrentStep(1),
                            className: "py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                        }, "← Back"),
                        e("button", {
                            type: "button",
                            onClick: () => {
                                setCurrentStep(3);
                                window.scrollTo({ top: 120, behavior: "smooth" });
                            },
                            className: "py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
                        },
                            e("span", null, "Continue to Style"),
                            e("span", null, "➔")
                        )
                    )
                ),

                // =========================================================
                // STEP 3: TRIP STYLE, TRANSIT & BUDGET TIER
                // =========================================================
                currentStep === 3 && e("div", { className: "p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4 animate-in fade-in duration-200" },
                    // Step header
                    e("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2.5" },
                        e("h3", { className: "font-heading font-black text-xs text-slate-950 uppercase tracking-wider flex items-center gap-1.5" },
                            e("span", null, "🚗"),
                            e("span", null, "Style, Transit & Budget")
                        ),
                        e("span", { className: "text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full" },
                            "Step 3 of 4"
                        )
                    ),

                    // Question 3: Travel Mode
                    e("div", { className: "flex flex-col gap-2" },
                        e("h4", { className: "text-xs font-black text-slate-900" }, "3. How will you travel? (Transit Mode)"),
                        e("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2" },
                            [
                                { id: "Flight", icon: "✈️", label: "Flight", desc: "Fast & Long distance" },
                                { id: "Train", icon: "🚆", label: "Train", desc: "Scenic & Economical" },
                                { id: "Road / Car Rental", icon: "🚗", label: "Road Trip", desc: "Car / Self-drive" },
                                { id: "Tourist Bus", icon: "🚌", label: "Tourist Bus", desc: "Group coach" },
                                { id: "Local Cabs / Metro", icon: "🚕", label: "City Cabs", desc: "Metro & Taxis" }
                            ].map(m => e("button", {
                                key: m.id,
                                type: "button",
                                onClick: () => setTravelMode(m.id),
                                className: "p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all " +
                                    (travelMode === m.id
                                        ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100")
                            },
                                e("span", { className: "text-lg shrink-0 mt-0.5" }, m.icon),
                                e("div", { className: "min-w-0" },
                                    e("p", { className: "font-bold text-xs truncate" }, m.label),
                                    e("p", { className: "text-[10px] " + (travelMode === m.id ? "text-slate-300" : "text-slate-400") }, m.desc)
                                )
                            ))
                        )
                    ),

                    // Question 4: Travel Style
                    e("div", { className: "flex flex-col gap-2 pt-2 border-t border-slate-100" },
                        e("h4", { className: "text-xs font-black text-slate-900" }, "4. What is your travel style?"),
                        e("div", { className: "grid grid-cols-2 gap-2" },
                            [
                                { id: "Relaxed & Leisure", icon: "🌴", title: "Relaxed & Leisure", desc: "Beaches, cafes & slow walks" },
                                { id: "Heritage & Culture", icon: "🏛️", title: "Heritage & Culture", desc: "Forts, museums & bazaars" },
                                { id: "Food & Nightlife", icon: "🍲", title: "Food & Nightlife", desc: "Street eats & night views" },
                                { id: "Adventure & Nature", icon: "⛰️", title: "Adventure & Nature", desc: "Treks, hills & scenic views" }
                            ].map(st => e("button", {
                                key: st.id,
                                type: "button",
                                onClick: () => setStyleTheme(st.id),
                                className: "p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all " +
                                    (styleTheme === st.id
                                        ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100")
                            },
                                e("span", { className: "text-lg shrink-0" }, st.icon),
                                e("div", { className: "min-w-0" },
                                    e("p", { className: "font-bold text-xs" }, st.title),
                                    e("p", { className: "text-[10px] " + (styleTheme === st.id ? "text-slate-300" : "text-slate-400") }, st.desc)
                                )
                            ))
                        )
                    ),

                    // Question 5: Budget Comfort Tier
                    e("div", { className: "flex flex-col gap-2 pt-2 border-t border-slate-100" },
                        e("h4", { className: "text-xs font-black text-slate-900" }, "5. Budget Comfort Tier"),
                        e("div", { className: "grid grid-cols-3 gap-2" },
                            [
                                { id: "Budget", icon: "🪙", title: "Budget", desc: "Economy / Hostels" },
                                { id: "Moderate", icon: "💎", title: "Moderate", desc: "Comfort 3★ / AC" },
                                { id: "Luxury", icon: "👑", title: "Luxury", desc: "Premium 5★" }
                            ].map(b => e("button", {
                                key: b.id,
                                type: "button",
                                onClick: () => setBudgetTier(b.id),
                                className: "p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all " +
                                    (budgetTier === b.id
                                        ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100")
                            },
                                e("span", { className: "text-xl" }, b.icon),
                                e("p", { className: "font-bold text-xs" }, b.title),
                                e("p", { className: "text-[9px] " + (budgetTier === b.id ? "text-slate-300" : "text-slate-400") }, b.desc)
                            ))
                        )
                    ),

                    // Navigation Buttons (Submit & Generate)
                    e("div", { className: "grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100" },
                        e("button", {
                            type: "button",
                            onClick: () => setCurrentStep(2),
                            className: "py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                        }, "← Back"),
                        e("button", {
                            type: "button",
                            onClick: handleGeneratePlan,
                            disabled: isGenerating,
                            className: "py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-colors disabled:opacity-75"
                        },
                            isGenerating
                                ? [e("span", { key: "sp", className: "animate-spin text-sm" }, "⟳"), e("span", { key: "tx" }, "Generating Trip...")]
                                : [e("span", { key: "ic" }, "🚀"), e("span", { key: "tx" }, "Generate Plan ➔")]
                        )
                    )
                ),

                // =========================================================
                // STEP 4: REVIEW & COMPLETE TRIP INFO (SHOWN AT LAST!)
                // =========================================================
                currentStep === 4 && generatedPlan && (() => {
                    const isSolo = generatedPlan.travelStyle === "solo" || generatedPlan.peopleCount <= 1;
                    return e("div", { className: "flex flex-col gap-4 animate-in fade-in duration-300" },
                        // Review Header & Banner
                        e("div", { className: "p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md flex flex-col gap-3" },
                            e("div", { className: "flex items-center justify-between" },
                                e("span", { className: "text-[10px] font-mono-data text-emerald-400 font-black uppercase tracking-wider bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30" },
                                    isSolo ? "✨ AI Tailored Solo Itinerary" : "✨ AI Tailored Group Itinerary & Split"
                                ),
                                e("button", {
                                    type: "button",
                                    onClick: () => {
                                        setCurrentStep(1);
                                        window.scrollTo({ top: 120, behavior: "smooth" });
                                    },
                                    className: "text-[11px] font-bold text-slate-300 hover:text-white underline underline-offset-2"
                                }, "✏️ Edit Questions")
                            ),
                            e("div", { className: "flex flex-col gap-1" },
                                e("h3", { className: "font-heading font-black text-xl text-white tracking-tight" },
                                    `${generatedPlan.destination} Travel Plan`
                                ),
                                e("div", { className: "flex flex-wrap items-center gap-1.5 pt-1" },
                                    e("span", { className: "text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-lg" },
                                        isSolo ? "🎒 Solo Traveler" : `👥 Group of ${generatedPlan.peopleCount} People`
                                    ),
                                    e("span", { className: "text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-lg" },
                                        `📅 ${generatedPlan.days} Days`
                                    ),
                                    e("span", { className: "text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-lg" },
                                        `🚗 ${generatedPlan.travelMode}`
                                    ),
                                    e("span", { className: "text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-lg" },
                                        `💎 ${generatedPlan.budgetTier} Tier`
                                    ),
                                    styleTheme && e("span", { className: "text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-lg" },
                                        styleTheme
                                    )
                                )
                            )
                        ),

                        // Day-by-Day Customized Schedule
                        e("div", { className: "flex flex-col gap-2.5" },
                            e("h3", { className: "font-heading font-black text-xs text-slate-900 uppercase tracking-wider px-1 flex items-center justify-between" },
                                e("span", null, `📅 Day-by-Day Schedule (${generatedPlan.days} Days)`),
                                e("span", { className: "text-[10px] font-medium text-slate-500 font-mono-data" }, "Verified Corridors Included")
                            ),
                            generatedPlan.itinerary.map((dPlan) => e("div", {
                                key: dPlan.day,
                                className: "p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-2.5"
                            },
                                e("div", { className: "flex items-center justify-between border-b border-slate-100 pb-1.5" },
                                    e("h4", { className: "font-heading font-black text-xs text-slate-950" }, dPlan.title),
                                    e("span", { className: "text-[10px] font-mono-data font-bold text-slate-500" }, dPlan.estimatedDayCost)
                                ),
                                e("div", { className: "flex flex-col gap-2 text-xs text-slate-600 leading-relaxed" },
                                    e("p", null, e("b", { className: "text-slate-900" }, "🌅 Morning: "), dPlan.morning),
                                    e("p", null, e("b", { className: "text-slate-900" }, "☀️ Afternoon: "), dPlan.afternoon),
                                    e("p", null, e("b", { className: "text-slate-900" }, "🌙 Evening & Dinner: "), dPlan.evening)
                                ),
                                e("div", { className: "pt-1.5 border-t border-slate-100 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5" },
                                    e("span", null, "🛡️"),
                                    e("span", null, dPlan.safetyNote)
                                )
                            ))
                        ),

                        // AT LAST: COMPLETE TOTAL BUDGET & EXPENSE / BILL SPLIT
                        e("div", { className: "p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-900 shadow-md flex flex-col gap-4" },
                            e("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2" },
                                e("div", null,
                                    e("h3", { className: "font-heading font-black text-sm text-slate-950 flex items-center gap-1.5" },
                                        e("span", null, "💰"),
                                        e("span", null, isSolo ? "Trip Budget & Total Cost" : "Trip Budget & Bill Split")
                                    ),
                                    e("p", { className: "text-[11px] text-slate-500 font-medium" },
                                        isSolo
                                            ? "Solo traveler comprehensive budget (1 Person)"
                                            : `Split equally among ${generatedPlan.peopleCount} group members`
                                    )
                                ),
                                e("span", { className: "px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200" },
                                    "Calculated"
                                )
                            ),

                            // Cards: If solo, show Total Solo Budget + Avg Daily Cost. If group, show Total Trip Cost + Split Per Person.
                            isSolo
                                ? e("div", { className: "grid grid-cols-2 gap-2.5" },
                                    // Total Budget
                                    e("div", { className: "p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-0.5" },
                                        e("span", { className: "text-[10px] text-slate-500 font-bold uppercase tracking-wider" }, "Total Solo Budget"),
                                        e("span", { className: "font-mono-data font-black text-base sm:text-lg text-slate-950" },
                                            `₹${generatedPlan.budgetSummary.totalCost.toLocaleString('en-IN')}`
                                        ),
                                        e("span", { className: "text-[10px] text-slate-400 font-medium" },
                                            `Complete ${generatedPlan.days}-Day Budget`
                                        )
                                    ),
                                    // Daily Cost
                                    e("div", { className: "p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-col gap-0.5" },
                                        e("span", { className: "text-[10px] text-emerald-800 font-bold uppercase tracking-wider" }, "📅 Avg. Daily Cost"),
                                        e("span", { className: "font-mono-data font-black text-base sm:text-lg text-emerald-900" },
                                            `₹${Math.round(generatedPlan.budgetSummary.totalCost / (generatedPlan.days || 1)).toLocaleString('en-IN')}`
                                        ),
                                        e("span", { className: "text-[10px] text-emerald-700 font-medium" },
                                            "Estimated per day"
                                        )
                                    )
                                )
                                : e("div", { className: "grid grid-cols-2 gap-2.5" },
                                    // Total Budget
                                    e("div", { className: "p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-0.5" },
                                        e("span", { className: "text-[10px] text-slate-500 font-bold uppercase tracking-wider" }, "Total Trip Cost"),
                                        e("span", { className: "font-mono-data font-black text-base sm:text-lg text-slate-950" },
                                            `₹${generatedPlan.budgetSummary.totalCost.toLocaleString('en-IN')}`
                                        ),
                                        e("span", { className: "text-[10px] text-slate-400 font-medium" },
                                            `For ${generatedPlan.days} Days (${generatedPlan.peopleCount} Pax)`
                                        )
                                    ),
                                    // Split Per Person (Only for Group!)
                                    e("div", { className: "p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-col gap-0.5" },
                                        e("span", { className: "text-[10px] text-emerald-800 font-bold uppercase tracking-wider" }, "👉 Split Per Person"),
                                        e("span", { className: "font-mono-data font-black text-base sm:text-lg text-emerald-900" },
                                            `₹${generatedPlan.budgetSummary.perPersonCost.toLocaleString('en-IN')}`
                                        ),
                                        e("span", { className: "text-[10px] text-emerald-700 font-medium" },
                                            "Each member pays"
                                        )
                                    )
                                ),

                            // Itemized Breakdown Table
                            e("div", { className: "flex flex-col gap-1.5 text-xs" },
                                e("span", { className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider" },
                                    isSolo ? "Itemized Expense Breakdown" : "Itemized Split Breakdown"
                                ),
                                [
                                    { key: "stay", icon: "🏨" },
                                    { key: "transit", icon: "🚗" },
                                    { key: "food", icon: "🍲" },
                                    { key: "sights", icon: "🎟️" },
                                    { key: "emergency", icon: "🛡️" }
                                ].map(item => {
                                    const bItem = generatedPlan.budgetSummary.breakdown[item.key];
                                    return e("div", {
                                        key: item.key,
                                        className: "p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                                    },
                                        e("div", { className: "flex items-center gap-2" },
                                            e("span", { className: "text-sm shrink-0" }, item.icon),
                                            e("div", null,
                                                e("p", { className: "font-bold text-slate-900 leading-snug" }, bItem.label),
                                                !isSolo && e("p", { className: "text-[10px] text-slate-400" }, `Total: ₹${bItem.total.toLocaleString('en-IN')}`)
                                            )
                                        ),
                                        e("div", { className: "text-right" },
                                            e("span", { className: "font-mono-data font-bold text-slate-950 text-xs" },
                                                isSolo
                                                    ? `₹${bItem.total.toLocaleString('en-IN')}`
                                                    : `₹${bItem.perPerson.toLocaleString('en-IN')}`
                                            ),
                                            e("p", { className: "text-[10px] text-slate-500" }, isSolo ? "Estimated" : "/ person")
                                        )
                                    );
                                })
                            ),

                            // Actions (WhatsApp Share, Save to Profile, Reset)
                            e("div", { className: "flex flex-col gap-2 pt-2 border-t border-slate-100" },
                                e("div", { className: "grid grid-cols-2 gap-2" },
                                    e("button", {
                                        type: "button",
                                        onClick: handleShareWhatsApp,
                                        className: "py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                                    },
                                        e("span", null, "📤"),
                                        e("span", null, copiedWhatsApp ? (isSolo ? "Copied Budget!" : "Copied Split!") : "Share on WhatsApp")
                                    ),
                                    e("button", {
                                        type: "button",
                                        onClick: handleSaveTrip,
                                        className: "py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                                    },
                                        e("span", null, "🧳"),
                                        e("span", null, "Save to Profile")
                                    )
                                ),
                                e("button", {
                                    type: "button",
                                    onClick: () => {
                                        setCurrentStep(1);
                                        window.scrollTo({ top: 120, behavior: "smooth" });
                                    },
                                    className: "w-full py-2.5 rounded-xl text-slate-700 hover:text-slate-950 text-xs font-bold bg-slate-100 hover:bg-slate-200 transition-colors text-center flex items-center justify-center gap-1.5"
                                },
                                    e("span", null, "🔄"),
                                    e("span", null, "Plan Another Trip / Modify Answers")
                                )
                            )
                        )
                    );
                })()
            ),

            // 2. SEASONS TAB
            subTab === "bestTime" && e("div", { className: "flex flex-col gap-2.5" },
                BEST_TIME_TO_VISIT_DATA.map((item, idx) => e("div", {
                    key: idx,
                    className: "p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-1"
                },
                    e("div", { className: "flex items-center justify-between" },
                        e("h4", { className: "font-heading font-black text-xs text-slate-950" }, item.city),
                        e("span", { className: "text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full" }, item.label)
                    ),
                    e("p", { className: "text-xs font-semibold text-slate-600" }, item.season + " • " + item.weather),
                    e("p", { className: "text-xs text-slate-500 mt-0.5" }, item.advice)
                ))
            ),

            // 3. WEATHER TAB
            subTab === "weather" && e("div", { className: "flex flex-col gap-2" },
                FIVE_DAY_WEATHER.map((w, idx) => e("div", {
                    key: idx,
                    className: "p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between"
                },
                    e("div", { className: "flex items-center gap-3" },
                        e("span", { className: "text-xl" }, w.icon),
                        e("div", null,
                            e("p", { className: "text-xs font-bold text-slate-950" }, w.day),
                            e("p", { className: "text-[11px] text-slate-500" }, w.condition)
                        )
                    ),
                    e("div", { className: "text-right" },
                        e("span", { className: "text-sm font-mono-data font-black text-slate-950" }, w.temp),
                        e("p", { className: "text-[10px] text-emerald-700 font-bold" }, "Safe")
                    )
                ))
            ),

            // 4. SAVED TRIPS TAB
            subTab === "saved" && e("div", { className: "flex flex-col gap-2.5" },
                (!savedTrips || savedTrips.length === 0)
                    ? e("div", { className: "p-8 rounded-2xl bg-white border border-slate-200 text-center flex flex-col items-center gap-2" },
                        e("span", { className: "text-2xl" }, "🧳"),
                        e("h4", { className: "text-xs font-black text-slate-800" }, "No Saved Trips Yet"),
                        e("p", { className: "text-[11px] text-slate-400 max-w-xs" }, "Generate an itinerary in the Smart Planner and tap 'Save to Profile' to store it here."),
                        e("button", {
                            type: "button",
                            onClick: () => {
                                setSubTab("planner");
                                setCurrentStep(1);
                            },
                            className: "mt-2 px-3.5 py-2 rounded-xl bg-slate-950 text-white text-xs font-bold"
                        }, "Start Trip Questionnaire ➔")
                    )
                    : savedTrips.map(t => e("div", {
                        key: t.id,
                        className: "p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3"
                    },
                        e("div", { className: "flex-1 min-w-0" },
                            e("h4", { className: "text-xs font-black text-slate-950 truncate" }, t.title || (t.destination + " (" + t.days + " Days)")),
                            e("p", { className: "text-[11px] text-slate-500 font-mono-data" }, `${t.budget || t.budgetTier || "Planned"} • ${t.createdAt || "Saved"}`),
                            t.destination && e("button", {
                                type: "button",
                                onClick: () => {
                                    setDestination(t.destination);
                                    if (t.days) setDays(t.days);
                                    if (t.travelStyle) setTravelStyle(t.travelStyle);
                                    if (t.peopleCount) setPeopleCount(t.peopleCount);
                                    if (t.travelMode) setTravelMode(t.travelMode);
                                    if (t.budgetTier) setBudgetTier(t.budgetTier);
                                    const plan = generateSmartTripPlan({
                                        destination: t.destination,
                                        days: t.days || 3,
                                        travelStyle: t.travelStyle || "group",
                                        peopleCount: t.peopleCount || 4,
                                        travelMode: t.travelMode || "Road / Car Rental",
                                        budgetTier: t.budgetTier || "Moderate"
                                    });
                                    setGeneratedPlan(plan);
                                    setSubTab("planner");
                                    setCurrentStep(4);
                                },
                                className: "mt-1.5 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                            }, "View Full Itinerary ➔")
                        ),
                        e("button", {
                            type: "button",
                            onClick: () => handleDeleteSavedTrip(t.id),
                            className: "text-[11px] font-bold text-slate-400 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors"
                        }, "Remove")
                    ))
            )
        );
    }


    // =========================================================================
    // PLACE SUMMARY MODAL (COMPLETE DETAILS, TIMINGS, HIGHLIGHTS & SUMMARY)
    // =========================================================================
    function PlaceSummaryModal({ place, userCoords, onClose, onSaveToItinerary }) {
        const [copied, setCopied] = useState(false);
        const [saved, setSaved] = useState(false);

        if (!place) return null;

        const distKm = place.lat && place.lng && userCoords
            ? calculateDistanceKm(userCoords.lat, userCoords.lng, place.lat, place.lng)
            : place.distKm;
        const distFormatted = distKm ? formatDistance(distKm) : null;
        const travelEst = distKm ? estimateTravelTime(distKm) : null;

        const handleSave = () => {
            if (onSaveToItinerary) {
                onSaveToItinerary(place);
            }
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        };

        const handleShare = () => {
            const shareText = `${place.name} (${place.area ? place.area + ", " : ""}${place.city || "Tourist Attraction"})\nTimings: ${place.timings || "Open"}\nEntry: ${place.fee || "Free"}\nDiscovered on SAFORA Tourist Safety`;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(shareText);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } else {
                alert(`Share ${place.name}:\n${shareText}`);
            }
        };

        return e("div", {
            className: "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto",
            onClick: (ev) => { if (ev.target === ev.currentTarget) onClose(); }
        },
            e("div", {
                className: "bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col no-scrollbar relative animate-in fade-in slide-in-from-bottom-4 duration-200"
            },
                // Hero Image & Close Button
                e("div", { className: "relative h-56 w-full bg-slate-900 shrink-0" },
                    e("img", {
                        src: place.image || "./images/navi_mumbai_flamingos.jpg",
                        alt: place.name,
                        loading: "eager",
                        decoding: "async",
                        className: "w-full h-full object-cover"
                    }),
                    e("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" }),
                    e("button", {
                        onClick: onClose,
                        className: "absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center text-sm font-bold backdrop-blur-xs transition-colors"
                    }, "✕"),
                    // Floating badges on image
                    e("div", { className: "absolute top-3.5 left-3.5 flex items-center gap-1.5" },
                        place.rating && e("span", { className: "px-2.5 py-1 rounded-lg bg-white/95 text-slate-950 text-xs font-bold shadow-xs flex items-center gap-1" },
                            "⭐ " + place.rating + (place.reviews ? " (" + place.reviews + ")" : "")
                        ),
                        place.safetyScore && e("span", { className: "px-2.5 py-1 rounded-lg bg-emerald-950/85 text-emerald-200 text-xs font-bold border border-emerald-500/30 backdrop-blur-xs" },
                            "🛡 Safety " + place.safetyScore + "/10"
                        )
                    ),
                    // Title over gradient
                    e("div", { className: "absolute bottom-3 left-4 right-4 text-white" },
                        e("span", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-white/15 backdrop-blur-xs px-2 py-0.5 rounded" },
                            place.type || "Tourist Landmark"
                        ),
                        e("h2", { className: "font-heading font-black text-lg text-white leading-tight mt-1" }, place.name),
                        distFormatted && e("p", { className: "text-xs text-emerald-300 font-semibold flex items-center gap-1 mt-0.5" },
                            "📍 " + distFormatted + (travelEst ? " • " + travelEst : "") + (place.area ? " • " + place.area : "")
                        )
                    )
                ),

                // Content Body
                e("div", { className: "p-4 sm:p-5 flex flex-col gap-4 text-slate-800" },
                    // 4 Quick Facts Grid
                    e("div", { className: "grid grid-cols-2 gap-2 text-xs" },
                        e("div", { className: "p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-0.5" },
                            e("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider" }, "⏰ Timings"),
                            e("span", { className: "font-bold text-slate-900 leading-tight" }, place.timings || "Open Regular Hours"),
                            place.openStatus && e("span", { className: "text-[10px] font-semibold text-emerald-600" }, "● " + place.openStatus)
                        ),
                        e("div", { className: "p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-0.5" },
                            e("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider" }, "🎟 Entry Fee"),
                            e("span", { className: "font-bold text-slate-900 leading-tight" }, place.fee || "Free Public Access"),
                            e("span", { className: "text-[10px] text-slate-500 font-medium" }, "Official Govt Tariff")
                        ),
                        e("div", { className: "p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-0.5" },
                            e("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider" }, "⏳ Ideal Duration"),
                            e("span", { className: "font-bold text-slate-900" }, place.duration || "1.5 to 2 Hours"),
                            e("span", { className: "text-[10px] text-slate-500 font-medium" }, "Recommended Visit")
                        ),
                        e("div", { className: "p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-0.5" },
                            e("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider" }, "🌅 Best Time"),
                            e("span", { className: "font-bold text-slate-900 leading-tight" }, place.bestTime || "Morning & Sunset"),
                            e("span", { className: "text-[10px] text-slate-500 font-medium" }, "Optimal Experience")
                        )
                    ),

                    // Detailed Summary / Description
                    e("div", { className: "flex flex-col gap-1.5" },
                        e("h3", { className: "font-heading font-black text-xs text-slate-900 uppercase tracking-wider" },
                            "About This Place"
                        ),
                        e("div", { className: "text-xs text-slate-600 leading-relaxed space-y-2 whitespace-pre-line bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100" },
                            place.fullSummary || place.desc || "Iconic tourist destination welcoming visitors from around the world."
                        )
                    ),

                    // Key Highlights
                    place.highlights && place.highlights.length > 0 && e("div", { className: "flex flex-col gap-2" },
                        e("h3", { className: "font-heading font-black text-xs text-slate-900 uppercase tracking-wider" },
                            "Top Things To Do & Highlights"
                        ),
                        e("div", { className: "flex flex-col gap-1.5" },
                            place.highlights.map((hl, hIdx) => e("div", {
                                key: hIdx,
                                className: "flex items-start gap-2 p-2 rounded-xl bg-white border border-slate-100 shadow-2xs text-xs text-slate-700"
                            },
                                e("span", { className: "text-emerald-600 font-bold shrink-0 mt-0.5" }, "✓"),
                                e("span", { className: "font-medium leading-snug" }, hl)
                            ))
                        )
                    ),

                    // Safety & Police Support
                    place.safetyNotes && e("div", { className: "p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-950" },
                        e("span", { className: "text-base shrink-0" }, "🛡"),
                        e("div", { className: "flex flex-col gap-0.5" },
                            e("span", { className: "font-bold text-emerald-900" }, "Verified Safe Tourist Zone"),
                            e("p", { className: "text-[11px] text-emerald-800 leading-relaxed font-medium" }, place.safetyNotes),
                            place.visitorTips && e("p", { className: "text-[10px] text-emerald-700 italic mt-0.5" }, "Tip: " + place.visitorTips)
                        )
                    ),

                    // Action Buttons
                    e("div", { className: "flex flex-col gap-2 pt-1 pb-8 border-t border-slate-100" },
                        e("div", { className: "grid grid-cols-2 gap-2" },
                            e("button", {
                                onClick: () => {
                                    const q = encodeURIComponent((place.name || "") + " " + (place.area ? place.area + " " : "") + (place.city || ""));
                                    window.open("https://www.google.com/maps/search/?api=1&query=" + q, "_blank");
                                },
                                className: "py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                            },
                                e("span", null, "🧭"),
                                e("span", null, "Directions (Maps)")
                            ),
                            e("button", {
                                onClick: handleSave,
                                className: "py-2.5 px-3 rounded-xl " + (saved ? "bg-emerald-600 text-white" : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50") + " text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                            },
                                e("span", null, saved ? "✓" : "🧳"),
                                e("span", null, saved ? "Saved to Trip!" : "Add to Itinerary")
                            )
                        ),
                        e("button", {
                            onClick: handleShare,
                            className: "w-full py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors flex items-center justify-center gap-1.5"
                        },
                            e("span", null, "📤"),
                            e("span", null, copied ? "Copied Place Summary to Clipboard!" : "Share Place Summary")
                        )
                    )
                )
            )
        );
    }

    // Helper to enrich any place object with full summary, timings, highlights and metadata
    function getEnrichedPlace(item, city) {
        if (!item) return null;
        const nameLower = (item.name || "").toLowerCase();
        const matched = MASTER_TOURIST_PLACES.find(p => {
            const pName = (p.name || "").toLowerCase();
            return pName.includes(nameLower) || nameLower.includes(pName) || (p.id && item.id && p.id === item.id);
        });
        return {
            ...item,
            city: city || item.city || matched?.city || "Tourist Attraction",
            area: item.area || matched?.area || "",
            ...(matched || {}),
            fullSummary: (matched && matched.fullSummary) || item.fullSummary || item.desc || "Iconic tourist landmark celebrated for its unique history, culture, and architecture.",
            highlights: (matched && matched.highlights) || item.highlights || [
                "Experience the unique cultural heritage of this celebrated landmark",
                "Capture scenic travel photographs of the monument and grounds",
                "Explore nearby verified safe walking corridors and local cafes",
                "Learn about regional history and traditional architectural craftsmanship"
            ],
            timings: item.timings || matched?.timings || "09:00 AM – 06:00 PM (Daily)",
            fee: item.fee || matched?.fee || "Free Public Access",
            duration: item.duration || matched?.duration || "1.5 to 2 Hours",
            bestTime: item.bestTime || matched?.bestTime || "Morning & Sunset",
            safetyNotes: item.safetyNotes || matched?.safetyNotes || "SAFORA monitored tourist corridor with 24/7 patrol assistance."
        };
    }

    // =========================================================================
    // CARD 2 : EXPLORE MODULE (CLEAN SEARCH BAR + NEAR ME GPS BUTTON)
    // =========================================================================
    function ExploreSection({
        onBackToHome,
        initialCity = "nearMe",
        touristLatLong = { lat: 19.0330, lng: 73.0180 },
        setTouristLatLong,
        livePlaceName = "Sarsole Village, Navi Mumbai, Maharashtra",
        onSaveToItinerary,
        onModalToggle
    }) {
        const [searchQuery, setSearchQuery] = useState("");
        const [activeFilter, setActiveFilter] = useState("nearMe"); // "nearMe", "Nerul", "Vashi", "Colaba", "Fort", "Goa", etc.
        const [isScanningGps, setIsScanningGps] = useState(false);
        const [selectedPlaceSummary, setSelectedPlaceSummary] = useState(null);
        const [directionsModalItem, setDirectionsModalItem] = useState(null);

        // Tinder-Style Deck State
        const [viewMode, setViewMode] = useState("tinder"); // "tinder" or "list"
        const [cardIndex, setCardIndex] = useState(0);
        const [savedPlaces, setSavedPlaces] = useState([]);
        const [passedPlaces, setPassedPlaces] = useState([]);
        const [history, setHistory] = useState([]);
        const [swipeAnimation, setSwipeAnimation] = useState(null); // { dir: 'right' | 'left', id }
        const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
        const [isDragging, setIsDragging] = useState(false);
        const dragStartRef = useRef({ x: 0, y: 0 });
        const [actionToast, setActionToast] = useState(null);

        const showToast = (message, type = "slate") => {
            setActionToast({ message, type });
            setTimeout(() => setActionToast(null), 2200);
        };

        const handleOpenPlace = (place) => {
            const enriched = getEnrichedPlace(place, place.city);
            setSelectedPlaceSummary(enriched);
            if (onModalToggle) onModalToggle(true);
        };

        const handleClosePlace = () => {
            setSelectedPlaceSummary(null);
            if (onModalToggle) onModalToggle(false);
        };

        // Calculate distances for all places from current GPS coordinates
        const allPlacesWithDistances = useMemo(() => {
            const uLat = touristLatLong?.lat || 19.0330;
            const uLng = touristLatLong?.lng || 73.0180;
            return MASTER_TOURIST_PLACES.map(place => {
                const dist = calculateDistanceKm(uLat, uLng, place.lat, place.lng);
                return {
                    ...place,
                    distKm: dist,
                    formattedDist: formatDistance(dist),
                    travelTime: estimateTravelTime(dist)
                };
            }).sort((a, b) => a.distKm - b.distKm);
        }, [touristLatLong]);

        // Filtered places based on search query AND activeFilter / area
        const displayedPlaces = useMemo(() => {
            const query = (searchQuery || "").trim().toLowerCase();
            let list = [...allPlacesWithDistances];

            if (query) {
                return list.filter(p =>
                    (p.name && p.name.toLowerCase().includes(query)) ||
                    (p.city && p.city.toLowerCase().includes(query)) ||
                    (p.area && p.area.toLowerCase().includes(query)) ||
                    (p.type && p.type.toLowerCase().includes(query)) ||
                    (p.desc && p.desc.toLowerCase().includes(query))
                );
            }

            if (activeFilter === "nearMe") {
                return list;
            } else {
                return list.filter(p =>
                    (p.city && p.city.toLowerCase() === activeFilter.toLowerCase()) ||
                    (p.area && p.area.toLowerCase().includes(activeFilter.toLowerCase()))
                );
            }
        }, [allPlacesWithDistances, searchQuery, activeFilter]);

        // Reset deck when search query or filter changes
        useEffect(() => {
            setCardIndex(0);
            setSwipeAnimation(null);
            setDragOffset({ x: 0, y: 0 });
        }, [searchQuery, activeFilter]);

        // Preload next cards in memory for instant photo rendering
        useEffect(() => {
            if (displayedPlaces && displayedPlaces.length && typeof window !== "undefined") {
                displayedPlaces.slice(0, 10).forEach(p => {
                    if (p.image) {
                        const img = new Image();
                        img.src = p.image;
                    }
                });
            }
        }, [displayedPlaces]);

        // Trigger Tinder Swipe (Right = Save/Visit, Left = Pass/Unlikely)
        const triggerSwipe = (direction) => {
            if (cardIndex >= displayedPlaces.length || swipeAnimation) return;
            const currentPlace = displayedPlaces[cardIndex];
            if (!currentPlace) return;

            setSwipeAnimation({ dir: direction, id: currentPlace.id });

            if (direction === "right") {
                // Save to visit -> adds to itinerary
                if (onSaveToItinerary) {
                    onSaveToItinerary(currentPlace);
                }
                setSavedPlaces(prev => [...prev, currentPlace]);
                setHistory(prev => [...prev, { place: currentPlace, action: "save" }]);
                showToast(`❤️ Saved "${currentPlace.name}" to Visit!`, "green");
            } else {
                // Pass / Unlikely to visit
                setPassedPlaces(prev => [...prev, currentPlace]);
                setHistory(prev => [...prev, { place: currentPlace, action: "pass" }]);
                showToast(`✕ Skipped "${currentPlace.name}"`, "slate");
            }

            setTimeout(() => {
                setCardIndex(prev => prev + 1);
                setSwipeAnimation(null);
                setDragOffset({ x: 0, y: 0 });
            }, 330);
        };

        const handleUndo = () => {
            if (history.length === 0 || cardIndex <= 0) return;
            const lastItem = history[history.length - 1];
            setHistory(prev => prev.slice(0, -1));
            if (lastItem.action === "save") {
                setSavedPlaces(prev => prev.filter(p => p.id !== lastItem.place.id));
            } else {
                setPassedPlaces(prev => prev.filter(p => p.id !== lastItem.place.id));
            }
            setCardIndex(prev => Math.max(0, prev - 1));
            setDragOffset({ x: 0, y: 0 });
            setSwipeAnimation(null);
            showToast(`↺ Restored "${lastItem.place.name}"`, "slate");
        };

        // Touch event handlers for mobile swiping
        const handleTouchStart = (e) => {
            if (swipeAnimation) return;
            const touch = e.touches[0];
            dragStartRef.current = { x: touch.clientX, y: touch.clientY };
            setIsDragging(true);
        };

        const handleTouchMove = (e) => {
            if (!isDragging || swipeAnimation) return;
            const touch = e.touches[0];
            const dx = touch.clientX - dragStartRef.current.x;
            const dy = touch.clientY - dragStartRef.current.y;
            setDragOffset({ x: dx, y: dy });
        };

        const handleTouchEnd = () => {
            if (!isDragging || swipeAnimation) return;
            setIsDragging(false);
            const threshold = 70;
            if (dragOffset.x > threshold) {
                triggerSwipe("right");
            } else if (dragOffset.x < -threshold) {
                triggerSwipe("left");
            } else {
                setDragOffset({ x: 0, y: 0 });
            }
        };

        // Mouse drag handlers for desktop support
        const handleMouseDown = (e) => {
            if (swipeAnimation) return;
            dragStartRef.current = { x: e.clientX, y: e.clientY };
            setIsDragging(true);

            const onMouseMove = (moveEvent) => {
                const dx = moveEvent.clientX - dragStartRef.current.x;
                const dy = moveEvent.clientY - dragStartRef.current.y;
                setDragOffset({ x: dx, y: dy });
            };

            const onMouseUp = (upEvent) => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
                setIsDragging(false);
                const dx = upEvent.clientX - dragStartRef.current.x;
                const threshold = 70;
                if (dx > threshold) {
                    triggerSwipe("right");
                } else if (dx < -threshold) {
                    triggerSwipe("left");
                } else {
                    setDragOffset({ x: 0, y: 0 });
                }
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        };

        // Handle "Near Me" button click
        const handleNearMeClick = () => {
            setActiveFilter("nearMe");
            setSearchQuery("");
            setIsScanningGps(true);

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const newCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                        if (setTouristLatLong) setTouristLatLong(newCoords);
                        setIsScanningGps(false);
                    },
                    (err) => {
                        console.warn("GPS lookup:", err);
                        setIsScanningGps(false);
                    },
                    { enableHighAccuracy: true, timeout: 6000 }
                );
            } else {
                setIsScanningGps(false);
            }
        };

        // Active Places for Stacking
        const currentPlace = displayedPlaces[cardIndex];
        const nextPlace = displayedPlaces[cardIndex + 1];
        const thirdPlace = displayedPlaces[cardIndex + 2];

        // Smooth physical drag progress factor (0 to 1)
        const dragProgress = Math.min(1, Math.abs(dragOffset.x) / 100);

        const getCardTransform = () => {
            if (swipeAnimation) {
                const exitX = swipeAnimation.dir === "right" ? 650 : -650;
                const exitRot = swipeAnimation.dir === "right" ? 30 : -30;
                return `translate3d(${exitX}px, 25px, 0) rotate(${exitRot}deg)`;
            }
            const rot = Math.max(-25, Math.min(25, dragOffset.x * 0.085));
            return `translate3d(${dragOffset.x}px, ${dragOffset.y * 0.3}px, 0) rotate(${rot}deg)`;
        };

        const getCardTransition = () => {
            if (swipeAnimation) return "transform 0.34s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.32s ease-out";
            if (isDragging) return "none";
            return "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.25)";
        };

        const getCardOpacity = () => {
            if (swipeAnimation) return 0;
            return 1;
        };

        // Smooth reactive scaling for Card 2 as Card 1 is dragged
        const getNextCardTransform = () => {
            if (swipeAnimation) {
                return "translate3d(0, 0, 0) scale(1)";
            }
            const scale = 0.94 + dragProgress * 0.06;
            const translateY = 14 - dragProgress * 14;
            return `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        };

        const getNextCardOpacity = () => {
            if (swipeAnimation) return 1;
            return 0.82 + dragProgress * 0.18;
        };

        const getNextCardTransition = () => {
            if (swipeAnimation) return "transform 0.34s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.34s ease-out";
            if (isDragging) return "transform 0.05s ease-out, opacity 0.05s ease-out";
            return "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease-out";
        };

        // Smooth reactive scaling for Card 3 as Card 1 is dragged
        const getThirdCardTransform = () => {
            if (swipeAnimation) {
                return "translate3d(0, 14px, 0) scale(0.94)";
            }
            const scale = 0.88 + dragProgress * 0.06;
            const translateY = 28 - dragProgress * 14;
            return `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        };

        const getThirdCardOpacity = () => {
            if (swipeAnimation) return 0.82;
            return 0.45 + dragProgress * 0.37;
        };

        const getThirdCardTransition = () => {
            if (swipeAnimation) return "transform 0.34s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.34s ease-out";
            if (isDragging) return "transform 0.05s ease-out, opacity 0.05s ease-out";
            return "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease-out";
        };

        const visitStampOpacity = swipeAnimation?.dir === "right" ? 1 : Math.max(0, Math.min(1, (dragOffset.x - 20) / 60));
        const passStampOpacity = swipeAnimation?.dir === "left" ? 1 : Math.max(0, Math.min(1, (-dragOffset.x - 20) / 60));

        return e("div", { className: "flex flex-col gap-4 pb-8 select-none" },
            // Header Bar (small < back button + centered "Explore")
            e("div", { className: "flex items-center justify-between pt-2 pb-1 border-b border-slate-200 min-h-[40px]" },
                e("button", {
                    onClick: onBackToHome,
                    className: "w-8 h-8 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-50 font-bold active:scale-95 transition-all shrink-0",
                    title: "Back to Home"
                },
                    e("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5 },
                        e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" })
                    )
                ),
                e("h2", { className: "font-heading font-black text-xl text-slate-900 tracking-tight text-center flex-1" },
                    "Explore"
                ),
                e("div", { className: "w-8 shrink-0" })
            ),

            // Search Bar + Near Me Button
            e("div", { className: "flex flex-col gap-2" },
                e("div", { className: "flex items-center gap-2" },
                    // Search Input Box
                    e("div", { className: "relative flex-1" },
                        e("span", { className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" }, "🔍"),
                        e("input", {
                            type: "text",
                            value: searchQuery,
                            onChange: (e) => setSearchQuery(e.target.value),
                            placeholder: "Search area (e.g. Nerul, Vashi, Colaba, Fort)...",
                            className: "w-full pl-9 pr-8 py-2.5 rounded-2xl bg-white border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 text-xs font-semibold text-slate-900 placeholder:text-slate-400 shadow-2xs outline-none transition-all"
                        }),
                        searchQuery && e("button", {
                            onClick: () => setSearchQuery(""),
                            className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                        }, "✕")
                    ),
                    // "Near Me" Button
                    e("button", {
                        onClick: handleNearMeClick,
                        disabled: isScanningGps,
                        className: "px-3 py-2.5 rounded-2xl " + (activeFilter === "nearMe" && !searchQuery ? "bg-slate-950 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-800 hover:bg-slate-50") + " text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all active:scale-95"
                    },
                        e("span", { className: isScanningGps ? "animate-spin text-xs" : "text-sm" }, isScanningGps ? "⟳" : "📍"),
                        e("span", null, "Near Me")
                    )
                ),

                // Area / Location Context Banner
                e("div", { className: "flex items-center justify-between px-1 text-[11px]" },
                    e("div", { className: "flex items-center gap-1.5 text-slate-600 font-medium truncate" },
                        e("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" }),
                        e("span", { className: "truncate" },
                            activeFilter === "nearMe" && !searchQuery
                                ? `Area: ${livePlaceName || "Current Location"}`
                                : (searchQuery ? `Searching: "${searchQuery}"` : `Area: ${activeFilter}`)
                        )
                    ),
                    e("span", { className: "text-[10px] font-bold text-slate-400 font-mono-data shrink-0 ml-2" },
                        `${displayedPlaces.length} places`
                    )
                )
            ),

            // Quick Area & City Chips
            e("div", { className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5" },
                [
                    { id: "nearMe", label: "📍 Near Me" },
                    { id: "Nerul", label: "Nerul" },
                    { id: "Vashi", label: "Vashi" },
                    { id: "Belapur", label: "Belapur" },
                    { id: "Kharghar", label: "Kharghar" },
                    { id: "Colaba", label: "Colaba" },
                    { id: "Marine Drive", label: "Marine Drive" },
                    { id: "Fort", label: "Fort" },
                    { id: "Goa", label: "Goa" },
                    { id: "Jaipur", label: "Jaipur" },
                    { id: "Delhi", label: "Delhi" }
                ].map(pill => e("button", {
                    key: pill.id,
                    onClick: () => {
                        setActiveFilter(pill.id);
                        setSearchQuery("");
                    },
                    className: "px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all " + (activeFilter === pill.id && !searchQuery ? "bg-slate-950 text-white shadow-xs" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50")
                }, pill.label))
            ),

            // Toast Floating Notification
            actionToast && e("div", {
                className: `fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl text-xs font-black shadow-xl flex items-center gap-2 animate-bounce transition-all ${actionToast.type === 'green' ? 'bg-emerald-600 text-white shadow-emerald-500/30' : 'bg-slate-900 text-white shadow-slate-900/30'}`
            },
                actionToast.message
            ),

            // =========================================================================
            // 1. TINDER-STYLE CARD SWIPING DECK VIEW (DEFAULT)
            // =========================================================================
            viewMode === "tinder" && (
                displayedPlaces.length === 0 ? (
                    e("div", { className: "p-8 text-center rounded-3xl bg-white border border-slate-200 text-xs text-slate-500 my-4 shadow-sm" },
                        e("span", { className: "text-3xl block mb-2" }, "🔍"),
                        e("p", { className: "font-bold text-slate-800 text-sm mb-1" }, "No places found for this area"),
                        e("p", null, "Try searching for a different area (e.g. Nerul, Vashi, Colaba, Marine Drive) or clear your search.")
                    )
                ) : cardIndex >= displayedPlaces.length ? (
                    // Deck Completion Card
                    e("div", { className: "p-6 rounded-3xl bg-white border border-slate-200 text-center flex flex-col items-center gap-3.5 shadow-md my-2" },
                        e("div", { className: "w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl shadow-inner" }, "🎉"),
                        e("div", null,
                            e("h3", { className: "font-heading font-black text-base text-slate-950" }, "All Places Explored!"),
                            e("p", { className: "text-xs text-slate-500 mt-1" },
                                `You've reviewed all ${displayedPlaces.length} places in this area.`
                            )
                        ),
                        e("div", { className: "grid grid-cols-2 gap-2 w-full max-w-xs text-xs font-bold" },
                            e("div", { className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col items-center" },
                                e("span", { className: "text-xl font-black text-emerald-600" }, savedPlaces.length),
                                e("span", { className: "text-[11px] text-emerald-700" }, "Saved to Visit")
                            ),
                            e("div", { className: "p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 flex flex-col items-center" },
                                e("span", { className: "text-xl font-black text-slate-600" }, passedPlaces.length),
                                e("span", { className: "text-[11px] text-slate-500" }, "Skipped")
                            )
                        ),
                        e("div", { className: "flex flex-col gap-2 w-full max-w-xs mt-1" },
                            e("button", {
                                onClick: () => { setCardIndex(0); setHistory([]); },
                                className: "w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-heading font-black text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
                            }, "🔄 Re-explore This Area"),
                            e("button", {
                                onClick: () => { setSearchQuery(""); setActiveFilter("nearMe"); setCardIndex(0); },
                                className: "w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs active:scale-98 transition-all"
                            }, "🔍 Search Another Area")
                        )
                    )
                ) : (
                    // Active Tinder Swiping Deck
                    e("div", { className: "flex flex-col gap-3 w-full max-w-md mx-auto" },
                        // Deck Counter Bar
                        e("div", { className: "flex items-center justify-between px-1 text-xs font-semibold text-slate-500" },
                            e("span", { className: "font-mono-data font-bold text-slate-700" },
                                `Card ${cardIndex + 1} of ${displayedPlaces.length}`
                            ),
                            e("span", { className: "text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]" },
                                `❤️ ${savedPlaces.length} Saved to Visit`
                            )
                        ),

                        // Card Stack Container (Relative with Perspective)
                        e("div", {
                            className: "relative w-full h-[470px] flex items-center justify-center overflow-visible",
                            style: { perspective: "1000px" }
                        },
                            // 3rd Background Card (Depth Effect)
                            thirdPlace && e("div", {
                                key: "third-" + thirdPlace.id,
                                className: "absolute inset-0 rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden pointer-events-none",
                                style: {
                                    transform: getThirdCardTransform(),
                                    opacity: getThirdCardOpacity(),
                                    transition: getThirdCardTransition(),
                                    willChange: "transform, opacity",
                                    zIndex: 10
                                }
                            },
                                e("img", { src: thirdPlace.image, alt: thirdPlace.name, loading: "eager", decoding: "async", className: "w-full h-full object-cover" })
                            ),

                            // 2nd Background Card (Full Content - Emerges Straight From Underneath)
                            nextPlace && e("div", {
                                key: "next-" + nextPlace.id,
                                className: "absolute inset-0 rounded-3xl bg-slate-900 shadow-xl overflow-hidden pointer-events-none border border-slate-200/80",
                                style: {
                                    transformOrigin: "50% 105%",
                                    transform: getNextCardTransform(),
                                    opacity: getNextCardOpacity(),
                                    transition: getNextCardTransition(),
                                    willChange: "transform, opacity",
                                    zIndex: 20
                                }
                            },
                                e("img", { src: nextPlace.image, alt: nextPlace.name, loading: "eager", decoding: "async", className: "w-full h-full object-cover" }),
                                // Top Badges
                                e("div", { className: "absolute top-3 inset-x-3 flex items-center justify-between z-10" },
                                    nextPlace.formattedDist ? e("div", {
                                        className: "px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-bold font-mono-data flex items-center gap-1 shadow-md"
                                    },
                                        e("span", null, "📍"),
                                        e("span", null, nextPlace.formattedDist)
                                    ) : e("div", null),
                                    e("div", { className: "flex items-center gap-1.5" },
                                        nextPlace.rating && e("span", {
                                            className: "px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-md text-slate-950 text-[11px] font-black shadow-md"
                                        }, "⭐ " + nextPlace.rating),
                                        nextPlace.safetyScore && e("span", {
                                            className: "px-2 py-0.5 rounded-lg bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[11px] font-bold border border-emerald-500/40 shadow-md"
                                        }, "🛡️ " + nextPlace.safetyScore + "/10")
                                    )
                                ),
                                // Bottom Content Dark Gradient
                                e("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-5 text-white"
                                },
                                    e("div", { className: "flex flex-col gap-1.5" },
                                        e("div", { className: "flex items-center gap-1.5 text-[11px] font-bold text-slate-300" },
                                            e("span", { className: "bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs" },
                                                nextPlace.area || nextPlace.city || "Attraction"
                                            ),
                                            nextPlace.travelTime && e("span", { className: "text-sky-300" },
                                                "• " + nextPlace.travelTime
                                            )
                                        ),
                                        e("h3", {
                                            className: "font-heading font-black text-lg sm:text-xl text-white leading-tight drop-shadow-md"
                                        }, nextPlace.name),
                                        e("p", {
                                            className: "text-xs text-slate-200/90 line-clamp-2 leading-relaxed font-medium drop-shadow-xs"
                                        }, nextPlace.desc),
                                        e("div", { className: "flex items-center justify-between text-[11px] text-slate-300 font-medium pt-1 border-t border-white/15 mt-1" },
                                            e("span", { className: "flex items-center gap-1 truncate max-w-[190px]" },
                                                "⏰ " + (nextPlace.timings?.split("(")[0] || "Open Today")
                                            ),
                                            e("span", { className: "font-bold text-amber-300 shrink-0" },
                                                nextPlace.fee?.split(",")[0] || "Free Entry"
                                            )
                                        )
                                    )
                                )
                            ),

                            // Top Interactive Tinder Card
                            currentPlace && e("div", {
                                key: "top-" + currentPlace.id,
                                onTouchStart: handleTouchStart,
                                onTouchMove: handleTouchMove,
                                onTouchEnd: handleTouchEnd,
                                onMouseDown: handleMouseDown,
                                className: "absolute inset-0 rounded-3xl bg-slate-900 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none border border-slate-200/80",
                                style: {
                                    zIndex: 30,
                                    transformOrigin: "50% 105%",
                                    touchAction: "none",
                                    transform: getCardTransform(),
                                    transition: getCardTransition(),
                                    opacity: getCardOpacity(),
                                    willChange: "transform, opacity"
                                }
                            },
                                // Card Hero Image
                                e("img", {
                                    src: currentPlace.image,
                                    alt: currentPlace.name,
                                    loading: "eager",
                                    decoding: "async",
                                    draggable: false,
                                    className: "w-full h-full object-cover pointer-events-none"
                                }),

                                // Top Badges Overlay (Distance, Rating, Safety)
                                e("div", { className: "absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10" },
                                    currentPlace.formattedDist ? e("div", {
                                        className: "px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-bold font-mono-data flex items-center gap-1 shadow-md"
                                    },
                                        e("span", null, "📍"),
                                        e("span", null, currentPlace.formattedDist)
                                    ) : e("div", null),

                                    e("div", { className: "flex items-center gap-1.5" },
                                        currentPlace.rating && e("span", {
                                            className: "px-2 py-0.5 rounded-lg bg-white/95 backdrop-blur-md text-slate-950 text-[11px] font-black shadow-md flex items-center gap-0.5"
                                        }, "⭐ " + currentPlace.rating),
                                        currentPlace.safetyScore && e("span", {
                                            className: "px-2 py-0.5 rounded-lg bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[11px] font-bold border border-emerald-500/40 shadow-md"
                                        }, "🛡️ " + currentPlace.safetyScore + "/10")
                                    )
                                ),

                                // LIVE TINDER STAMPS (VISIT vs UNLIKELY)
                                // Green "VISIT / SAVE" Stamp (Right Drag)
                                e("div", {
                                    className: "absolute top-12 left-5 z-20 pointer-events-none border-4 border-emerald-400 text-emerald-400 bg-emerald-950/85 font-heading font-black text-lg sm:text-xl px-4 py-1.5 rounded-2xl uppercase tracking-widest shadow-2xl backdrop-blur-xs",
                                    style: {
                                        opacity: visitStampOpacity,
                                        transform: `scale(${0.82 + visitStampOpacity * 0.28}) rotate(-14deg)`,
                                        transition: isDragging ? "none" : "opacity 0.2s ease, transform 0.2s ease"
                                    }
                                },
                                    "VISIT ❤️"
                                ),

                                // Red "UNLIKELY / PASS" Stamp (Left Drag)
                                e("div", {
                                    className: "absolute top-12 right-5 z-20 pointer-events-none border-4 border-rose-500 text-rose-500 bg-rose-950/85 font-heading font-black text-lg sm:text-xl px-4 py-1.5 rounded-2xl uppercase tracking-widest shadow-2xl backdrop-blur-xs",
                                    style: {
                                        opacity: passStampOpacity,
                                        transform: `scale(${0.82 + passStampOpacity * 0.28}) rotate(14deg)`,
                                        transition: isDragging ? "none" : "opacity 0.2s ease, transform 0.2s ease"
                                    }
                                },
                                    "UNLIKELY ✕"
                                ),

                                // Bottom Content Dark Gradient Overlay
                                e("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-5 text-white pointer-events-none"
                                },
                                    e("div", { className: "flex flex-col gap-1.5" },
                                        // Area & Type Pill
                                        e("div", { className: "flex items-center gap-1.5 text-[11px] font-bold text-slate-300" },
                                            e("span", { className: "bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs" },
                                                currentPlace.area || currentPlace.city || "Attraction"
                                            ),
                                            currentPlace.travelTime && e("span", { className: "text-sky-300" },
                                                "• " + currentPlace.travelTime
                                            )
                                        ),

                                        // Place Name
                                        e("h3", {
                                            className: "font-heading font-black text-lg sm:text-xl text-white leading-tight drop-shadow-md"
                                        }, currentPlace.name),

                                        // Short Description
                                        e("p", {
                                            className: "text-xs text-slate-200/90 line-clamp-2 leading-relaxed font-medium drop-shadow-xs"
                                        }, currentPlace.desc),

                                        // Timings & Fee Row
                                        e("div", { className: "flex items-center justify-between text-[11px] text-slate-300 font-medium pt-1 border-t border-white/15 mt-1" },
                                            e("span", { className: "flex items-center gap-1 truncate max-w-[190px]" },
                                                "⏰ " + (currentPlace.timings?.split("(")[0] || "Open Today")
                                            ),
                                            e("span", { className: "font-bold text-amber-300 shrink-0" },
                                                currentPlace.fee?.split(",")[0] || "Free Entry"
                                            )
                                        ),

                                        // View Detailed Guide Button (Interactive Click)
                                        e("button", {
                                            onClick: (ev) => {
                                                ev.stopPropagation();
                                                handleOpenPlace(currentPlace);
                                            },
                                            className: "pointer-events-auto mt-2 self-start flex items-center gap-1.5 text-xs font-extrabold text-sky-200 hover:text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/30 transition-all active:scale-95 shadow-sm"
                                        },
                                            "📖 View Full Details & Guide →"
                                        )
                                    )
                                )
                            )
                        ),

                        // Tinder Action Control Buttons (Pass, Info, Save, Undo)
                        e("div", { className: "flex items-center justify-center gap-4 pt-3 pb-1" },
                            // Undo / Reset button
                            e("button", {
                                onClick: handleUndo,
                                disabled: history.length === 0,
                                title: "Undo last swipe",
                                className: "w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-md flex items-center justify-center text-lg active:scale-90 transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                            }, "↺"),

                            // ✕ Pass Button (Swipe Left)
                            e("button", {
                                onClick: () => triggerSwipe("left"),
                                title: "Unlikely (Swipe Left)",
                                className: "w-14 h-14 rounded-full bg-white border-2 border-rose-300 text-rose-600 hover:bg-rose-50 shadow-lg shadow-rose-500/15 flex items-center justify-center text-2xl font-black active:scale-90 transition-all"
                            }, "✕"),

                            // ℹ️ Info / Guide Modal Button
                            e("button", {
                                onClick: () => currentPlace && handleOpenPlace(currentPlace),
                                title: "Full Place Information",
                                className: "w-11 h-11 rounded-full bg-white border border-slate-200 text-sky-600 hover:bg-sky-50 shadow-md flex items-center justify-center text-base font-bold active:scale-90 transition-all"
                            }, "ℹ️"),

                            // ❤️ Visit / Save Button (Swipe Right)
                            e("button", {
                                onClick: () => triggerSwipe("right"),
                                title: "Save to Visit (Swipe Right)",
                                className: "w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center text-2xl font-bold active:scale-90 transition-all"
                            }, "❤️")
                        )
                    )
                )
            ),

            // =========================================================================
            // 2. GRID / LIST VIEW (OPTIONAL TOGGLE FOR BROWSING)
            // =========================================================================
            viewMode === "list" && e("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" },
                displayedPlaces.length === 0 ? e("div", { className: "p-8 text-center rounded-2xl bg-white border border-slate-200 text-xs text-slate-500" },
                    e("p", { className: "font-bold text-slate-800 text-sm mb-1" }, "No places found"),
                    e("p", null, "Try searching for a different area or city.")
                ) : displayedPlaces.map((place, idx) => e("div", {
                    key: place.id || idx,
                    onClick: () => handleOpenPlace(place),
                    className: "group cursor-pointer rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col"
                },
                    // Card Image
                    e("div", { className: "relative h-40 w-full bg-slate-100 overflow-hidden" },
                        e("img", {
                            src: place.image,
                            alt: place.name,
                            loading: "lazy",
                            decoding: "async",
                            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        }),
                        place.formattedDist && e("div", { className: "absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-xs text-white text-[11px] font-bold font-mono-data flex items-center gap-1 shadow-sm" },
                            e("span", null, "📍"),
                            e("span", null, place.formattedDist)
                        ),
                        e("div", { className: "absolute top-2.5 right-2.5 flex items-center gap-1" },
                            place.rating && e("span", { className: "px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-slate-950 text-[10px] font-bold shadow-xs" },
                                "⭐ " + place.rating
                            ),
                            place.safetyScore && e("span", { className: "px-2 py-0.5 rounded-md bg-emerald-950/85 backdrop-blur-xs text-emerald-200 text-[10px] font-bold border border-emerald-500/30" },
                                "🛡 " + place.safetyScore + "/10"
                            )
                        ),
                        e("div", { className: "absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-semibold" },
                            (place.area ? place.area + " • " : (place.city ? place.city + " • " : "")) + (place.travelTime || "")
                        )
                    ),
                    // Card Body
                    e("div", { className: "p-3.5 flex flex-col gap-2" },
                        e("div", { className: "flex items-start justify-between gap-2" },
                            e("div", null,
                                e("h4", { className: "font-heading font-black text-xs text-slate-950 group-hover:text-rose-600 transition-colors" }, place.name),
                                e("p", { className: "text-[11px] text-slate-500 font-medium" }, place.type)
                            ),
                            e("div", { className: "flex items-center gap-1.5" },
                                e("button", {
                                    onClick: (ev) => {
                                        ev.stopPropagation();
                                        if (onSaveToItinerary) onSaveToItinerary(place);
                                        showToast(`❤️ Saved "${place.name}"!`, "green");
                                    },
                                    className: "p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs"
                                }, "❤️"),
                                e("button", {
                                    onClick: (ev) => {
                                        ev.stopPropagation();
                                        handleOpenPlace(place);
                                    },
                                    className: "px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] shrink-0"
                                }, "Guide →")
                            )
                        ),
                        e("p", { className: "text-xs text-slate-600 line-clamp-2 leading-snug" }, place.desc),
                        e("div", { className: "pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500" },
                            e("span", { className: "flex items-center gap-1" },
                                e("span", null, "⏰"),
                                e("span", null, place.timings?.split("(")[0] || "Open Hours")
                            ),
                            e("span", { className: "font-medium text-slate-700" }, place.fee?.split(",")[0] || "Free Entry")
                        )
                    )
                ))
            ),

            // Rich Place Summary Modal
            selectedPlaceSummary && e(PlaceSummaryModal, {
                place: selectedPlaceSummary,
                userCoords: touristLatLong,
                onClose: handleClosePlace,
                onSaveToItinerary: onSaveToItinerary
            }),

            // Directions Quick Modal
            directionsModalItem && e("div", { className: "fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4" },
                e("div", { className: "bg-white rounded-2xl p-5 max-w-sm w-full shadow-xl flex flex-col gap-3" },
                    e("div", { className: "flex items-start justify-between" },
                        e("div", null,
                            e("h3", { className: "font-heading font-black text-sm text-slate-950" }, directionsModalItem.name),
                            e("p", { className: "text-xs text-slate-500" }, "Green Safe Corridor Route")
                        ),
                        e("button", { onClick: () => setDirectionsModalItem(null), className: "text-slate-400 hover:text-slate-700 font-bold" }, "✕")
                    ),
                    e("div", { className: "p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1" },
                        e("p", { className: "font-bold text-emerald-700" }, "✓ Verified Safe Route Active"),
                        e("p", null, "Estimated travel time: Cab: ~8m • Walking: ~24m"),
                        e("p", { className: "text-[11px] text-slate-500" }, "Lit walkways & active tourist police patrol en route.")
                    ),
                    e("button", {
                        onClick: () => {
                            const destQuery = encodeURIComponent(directionsModalItem.name + " " + (directionsModalItem.city || ""));
                            window.open("https://www.google.com/maps/search/?api=1&query=" + destQuery, "_blank");
                            setDirectionsModalItem(null);
                        },
                        className: "w-full py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold"
                    }, "Open in Google Maps →")
                )
            )
        );
    }


    // =========================================================================
    // TRANSLATOR SECTION (TOURIST SMART TRANSLATOR)
    // =========================================================================
    // =========================================================================
    // MODERN TRANSLATE SECTION (ALIGNED WITH SAFORA THEME)
    // =========================================================================
    function TranslateSection({ onBackToHome }) {
        const [sourceLang, setSourceLang] = useState("en");
        const [targetLang, setTargetLang] = useState("hi");
        const [inputText, setInputText] = useState("");
        const [translatedText, setTranslatedText] = useState("");
        const [phoneticText, setPhoneticText] = useState("");
        const [isTranslating, setIsTranslating] = useState(false);
        const [copied, setCopied] = useState(false);
        const [activeCategory, setActiveCategory] = useState("emergency");
        const [isListening, setIsListening] = useState(false);
        const [showPhrasebook, setShowPhrasebook] = useState(false);
        const recognitionRef = useRef(null);
        const textareaRef = useRef(null);

        const languages = [
            { code: "en", name: "English (UK)", speechCode: "en-US" },
            { code: "hi", name: "हिन्दी (Hindi)", speechCode: "hi-IN" },
            { code: "mr", name: "मराठी (Marathi)", speechCode: "mr-IN" },
            { code: "ar", name: "العربية (Arabic)", speechCode: "ar-SA" },
            { code: "es", name: "Español (Spanish)", speechCode: "es-ES" },
            { code: "fr", name: "Français (French)", speechCode: "fr-FR" },
            { code: "de", name: "Deutsch (German)", speechCode: "de-DE" },
            { code: "ja", name: "日本語 (Japanese)", speechCode: "ja-JP" },
            { code: "zh", name: "中文 (Chinese)", speechCode: "zh-CN" },
            { code: "tr", name: "Türkçe (Turkish)", speechCode: "tr-TR" },
            { code: "pt", name: "Português (Brazilian)", speechCode: "pt-BR" },
            { code: "ru", name: "Русский (Russian)", speechCode: "ru-RU" },
            { code: "gu", name: "ગુજરાતી (Gujarati)", speechCode: "gu-IN" },
            { code: "bn", name: "বাংলা (Bengali)", speechCode: "bn-IN" },
            { code: "ta", name: "தமிழ் (Tamil)", speechCode: "ta-IN" },
            { code: "te", name: "తెలుగు (Telugu)", speechCode: "te-IN" },
            { code: "kn", name: "ಕನ್ನಡ (Kannada)", speechCode: "kn-IN" }
        ];

        const touristPhraseCategories = [
            { id: "emergency", label: "🚨 Emergency" },
            { id: "transit", label: "🚕 Transit & Cab" },
            { id: "food", label: "🍲 Food & Dining" },
            { id: "shopping", label: "🛍️ Shopping & Bargain" },
            { id: "basics", label: "👋 Common Greetings" }
        ];

        const touristPhrases = {
            emergency: [
                { en: "Please help me!", hi: "कृपया मेरी मदद करें!", hiPhonetic: "Kripya meri madad karein!", mr: "कृपया मला मदत करा!", mrPhonetic: "Kripya mala madat kara!" },
                { en: "Call an ambulance or doctor immediately", hi: "तुरंत एम्बुलेंस या डॉक्टर को बुलाइए", hiPhonetic: "Turant ambulance ya doctor ko bulaiye", mr: "त्वरीत रुग्णवाहिका किंवा डॉक्टरांना बोलवा", mrPhonetic: "Twarit rugnavahika kinva doctoranna bolwa" },
                { en: "Where is the nearest police station?", hi: "नजदीकी पुलिस स्टेशन कहाँ है?", hiPhonetic: "Najdeeki police station kahan hai?", mr: "जवळचे पोलीस ठाणे कुठे आहे?", mrPhonetic: "Javalche police thane kuthe aahe?" },
                { en: "I am lost, can you guide me?", hi: "मैं रास्ता भटक गया हूँ, क्या आप रास्ता बता सकते हैं?", hiPhonetic: "Main raasta bhatak gaya hoon, kya aap raasta bata sakte hain?", mr: "मी रस्ता चुकलो आहे, मला मार्गदर्शन कराल का?", mrPhonetic: "Mi rasta chuklo aahe, mala margadarshan karal ka?" },
                { en: "I need to go to a hospital", hi: "मुझे अस्पताल जाना है", hiPhonetic: "Mujhe aspatal jaana hai", mr: "मला रुग्णालयात जायचे आहे", mrPhonetic: "Mala rugnalayat jayche aahe" }
            ],
            transit: [
                { en: "Please turn on the taxi meter", hi: "कृपया मीटर चालू करें", hiPhonetic: "Kripya meter chalu karein", mr: "कृपया मीटर चालू करा", mrPhonetic: "Kripya meter chalu kara" },
                { en: "How much will this ride cost?", hi: "इस यात्रा का कितना किराया होगा?", hiPhonetic: "Is yatra ka kitna kiraya hoga?", mr: "या प्रवासाचे भाडे किती होईल?", mrPhonetic: "Ya pravasache bhade kiti hoil?" },
                { en: "Please take me to the airport / railway station", hi: "कृपया मुझे एयरपोर्ट / रेलवे स्टेशन ले चलिए", hiPhonetic: "Kripya mujhe airport / railway station le chaliye", mr: "कृपया मला विमानतळ / रेल्वे स्थानकावर घेऊन चला", mrPhonetic: "Kripya mala vimantal / railway sthanakavar gheun chala" },
                { en: "Please stop here", hi: "कृपया यहाँ रोकिए", hiPhonetic: "Kripya yahan rokiye", mr: "कृपया येथे थांबा", mrPhonetic: "Kripya yethe thamba" }
            ],
            food: [
                { en: "Is this food purely vegetarian?", hi: "क्या यह भोजन पूर्णतः शाकाहारी है?", hiPhonetic: "Kya yeh bhojan poornatah shakahari hai?", mr: "हे जेवण पूर्णपणे शाकाहारी आहे का?", mrPhonetic: "He jevan purnapane shakahari aahe ka?" },
                { en: "Please make it less spicy", hi: "कृपया कम तीखा बनाइए", hiPhonetic: "Kripya kam teekha banaiye", mr: "कृपया कमी तिखट करा", mrPhonetic: "Kripya kami tikhat kara" },
                { en: "Please give me packaged drinking water", hi: "कृपया पैकेज्ड पीने का पानी दीजिए", hiPhonetic: "Kripya packaged peene ka paani dijiye", mr: "कृपया बाटलीबंद पिण्याचे पाणी द्या", mrPhonetic: "Kripya baatliband pinyache paani dya" },
                { en: "Please bring the bill", hi: "कृपया बिल ले आइए", hiPhonetic: "Kripya bill le aaiye", mr: "कृपया बिल आणा", mrPhonetic: "Kripya bill aana" }
            ],
            shopping: [
                { en: "How much is this item?", hi: "यह कितने का है?", hiPhonetic: "Yeh kitne ka hai?", mr: "हे किती रुपयांचे आहे?", mrPhonetic: "He kiti rupayanche aahe?" },
                { en: "Can you give a little discount?", hi: "क्या कुछ कम कर सकते हैं?", hiPhonetic: "Kya kuch kam kar sakte hain?", mr: "काही सूट देऊ शकता का?", mrPhonetic: "Kahi soot deu shakta ka?" },
                { en: "Do you accept UPI / QR code payment?", hi: "क्या आप UPI या QR कोड से पेमेंट लेते हैं?", hiPhonetic: "Kya aap UPI ya QR code se payment lete hain?", mr: "तुम्ही UPI किंवा QR कोड पेमेंट स्वीकारता का?", mrPhonetic: "Tumhi UPI kinva QR code payment swikarta ka?" }
            ],
            basics: [
                { en: "Hello / Greetings", hi: "नमस्ते (Namaste)", hiPhonetic: "Namaste", mr: "नमस्कार (Namaskar)", mrPhonetic: "Namaskar" },
                { en: "Thank you very much", hi: "बहुत-बहुत धन्यवाद", hiPhonetic: "Bahut bahut dhanyavaad", mr: "खूप खूप धन्यवाद", mrPhonetic: "Khoop khoop dhanyavaad" },
                { en: "Where is the washroom / toilet?", hi: "शौचालय कहाँ है?", hiPhonetic: "Shauchalay kahan hai?", mr: "शौचालय कुठे आहे?", mrPhonetic: "Shauchalay kuthe aahe?" },
                { en: "Do you speak English?", hi: "क्या आप अंग्रेजी बोलते हैं?", hiPhonetic: "Kya aap angrezi bolte hain?", mr: "तुम्ही इंग्रजीत बोलू शकता का?", mrPhonetic: "Tumhi ingrajit बोलता का?" }
            ]
        };

        const currentSource = languages.find(l => l.code === sourceLang) || languages[0];
        const currentTarget = languages.find(l => l.code === targetLang) || languages[1];

        useEffect(() => {
            return () => {
                if (recognitionRef.current) {
                    try { recognitionRef.current.abort(); } catch (e) {}
                }
                if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    try { window.speechSynthesis.cancel(); } catch (e) {}
                }
            };
        }, []);

        const swapLanguages = () => {
            const nextSrc = targetLang;
            const nextTgt = sourceLang;
            const nextInput = translatedText;
            const nextTrans = inputText;
            setSourceLang(nextSrc);
            setTargetLang(nextTgt);
            setInputText(nextInput);
            setTranslatedText(nextTrans);
            setPhoneticText("");
            if (nextInput) {
                handleTranslate(nextInput, nextSrc, nextTgt);
            }
        };

        const handleTranslate = async (textToTranslate = inputText, src = sourceLang, tgt = targetLang) => {
            const query = (textToTranslate !== undefined ? textToTranslate : inputText || "").trim();
            if (!query) {
                setTranslatedText("");
                setPhoneticText("");
                return;
            }

            if (src === tgt) {
                setTranslatedText(query);
                setPhoneticText("");
                setIsTranslating(false);
                return;
            }

            setIsTranslating(true);

            // Check in local phrasebook first for instant response
            let localMatch = null;
            for (const cat of Object.keys(touristPhrases)) {
                for (const item of touristPhrases[cat]) {
                    if (item.en.toLowerCase() === query.toLowerCase()) {
                        localMatch = item;
                        break;
                    }
                }
                if (localMatch) break;
            }

            if (localMatch) {
                if (tgt === "hi") {
                    setTranslatedText(localMatch.hi);
                    setPhoneticText(localMatch.hiPhonetic || "");
                    setIsTranslating(false);
                    return;
                } else if (tgt === "mr") {
                    setTranslatedText(localMatch.mr);
                    setPhoneticText(localMatch.mrPhonetic || "");
                    setIsTranslating(false);
                    return;
                } else if (tgt === "en") {
                    setTranslatedText(localMatch.en);
                    setPhoneticText("");
                    setIsTranslating(false);
                    return;
                }
            }

            // Expanded tourist fallback dictionary
            const touristDict = {
                "hi": { hi: "नमस्ते", mr: "नमस्कार", ar: "مرحباً", zh: "你好", tr: "Merhaba", es: "Hola", pt: "Olá" },
                "hello": { hi: "नमस्ते", mr: "नमस्कार", ar: "مرحباً", zh: "你好", tr: "Merhaba", es: "Hola", pt: "Olá" },
                "hey": { hi: "नमस्ते", mr: "नमस्कार", ar: "أهلاً", zh: "嗨", tr: "Selam", es: "Hola", pt: "Oi" },
                "bye": { hi: "अलविदा", mr: "पुन्हा भेटू", ar: "مع السلامة", zh: "再见", tr: "Hoşçakal", es: "Adiós", pt: "Adeus" },
                "goodbye": { hi: "अलविदा", mr: "पुन्हा भेटू", ar: "وداعاً", zh: "再见", tr: "Güle güle", es: "Adiós", pt: "Tchau" },
                "thank you": { hi: "धन्यवाद", mr: "धन्यवाद", ar: "شكراً", zh: "谢谢", tr: "Teşekkür ederim", es: "Gracias", pt: "Obrigado" },
                "thanks": { hi: "धन्यवाद", mr: "धन्यवाद", ar: "شكراً لك", zh: "多谢", tr: "Sağol", es: "Gracias", pt: "Valeu" },
                "welcome": { hi: "स्वागत है", mr: "स्वागत आहे", ar: "أهلاً وسهلاً", zh: "欢迎", tr: "Hoş geldiniz", es: "Bienvenido", pt: "Bem-vindo" },
                "good morning": { hi: "शुभ प्रभात", mr: "शुभ प्रभात", ar: "صباح الخير", zh: "早上好", tr: "Günaydın", es: "Buenos días", pt: "Bom dia" },
                "good evening": { hi: "शुभ संध्या", mr: "शुभ संध्या", ar: "مساء الخير", zh: "晚上好", tr: "İyi akşamlar", es: "Buenas tardes", pt: "Boa tarde" },
                "good night": { hi: "शुभ रात्रि", mr: "शुभ रात्री", ar: "تصبح على خير", zh: "晚安", tr: "İyi geceler", es: "Buenas noches", pt: "Boa noite" },
                "how are you": { hi: "आप कैसे हैं?", mr: "तुम्ही कसे आहात?", ar: "كيف حالك؟", zh: "你好吗？", tr: "Nasılsın?", es: "¿Cómo estás?", pt: "Como você está?" },
                "water": { hi: "पानी", mr: "पाणी", ar: "ماء", zh: "水", tr: "Su", es: "Agua", pt: "Água" },
                "food": { hi: "खाना / भोजन", mr: "जेवण", ar: "طعام", zh: "食物", tr: "Yemek", es: "Comida", pt: "Comida" },
                "help": { hi: "मदद", mr: "मदत", ar: "مساعدة", zh: "救命 / 帮助", tr: "Yardım", es: "Ayuda", pt: "Ajuda" },
                "police": { hi: "पुलिस", mr: "पोलीस", ar: "شرطة", zh: "警察", tr: "Polis", es: "Policía", pt: "Polícia" },
                "doctor": { hi: "डॉक्टर", mr: "डॉक्टर", ar: "طبيب", zh: "医生", tr: "Doktor", es: "Médico", pt: "Médico" },
                "hospital": { hi: "अस्पताल", mr: "रुग्णालय", ar: "مستشفى", zh: "医院", tr: "Hastane", es: "Hospital", pt: "Hospital" },
                "where": { hi: "कहाँ", mr: "कुठे", ar: "أين", zh: "在哪里", tr: "Nerede", es: "Dónde", pt: "Onde" },
                "how much": { hi: "कितने का", mr: "किती", ar: "بكم هذا", zh: "多少钱", tr: "Ne kadar", es: "¿Cuánto cuesta?", pt: "Quanto custa?" }
            };

            const cleanKey = query.toLowerCase().replace(/[!.?]+$/, '').trim();

            // 1. Primary Engine: Google Translate GTX (Neural translation with live romanization)
            try {
                const gtxUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + encodeURIComponent(src) + "&tl=" + encodeURIComponent(tgt) + "&dt=t&dt=rm&q=" + encodeURIComponent(query);
                const response = await fetch(gtxUrl);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && Array.isArray(data[0])) {
                        const translated = data[0].filter(x => x && x[0]).map(x => x[0]).join('');
                        const romObj = data[0].find(x => x && !x[0] && (x[2] || x[3]));
                        const phonetic = romObj ? (romObj[2] || romObj[3] || '') : '';
                        if (translated && translated.trim() && (translated.trim().toLowerCase() !== query.toLowerCase() || src === tgt)) {
                            setTranslatedText(translated.trim());
                            setPhoneticText(phonetic.trim());
                            setIsTranslating(false);
                            return;
                        }
                    }
                }
            } catch (err) {
                console.log("Google Translate GTX error:", err);
            }

            // 2. Secondary Engine: Local Server Translate Proxy (/api/translate)
            try {
                const srvUrl = "/api/translate?sl=" + encodeURIComponent(src) + "&tl=" + encodeURIComponent(tgt) + "&q=" + encodeURIComponent(query);
                const srvRes = await fetch(srvUrl);
                if (srvRes.ok) {
                    const srvData = await srvRes.json();
                    if (srvData && srvData.translation && srvData.translation.trim()) {
                        setTranslatedText(srvData.translation.trim());
                        setPhoneticText((srvData.phonetic || "").trim());
                        setIsTranslating(false);
                        return;
                    }
                }
            } catch (err) {
                console.log("Server translate proxy error:", err);
            }

            // 3. Tertiary Engine: Local Tourist Dictionary Match
            if (touristDict[cleanKey] && touristDict[cleanKey][tgt]) {
                const matchVal = touristDict[cleanKey][tgt];
                setTranslatedText(matchVal);
                setPhoneticText("");
                setIsTranslating(false);
                return;
            }

            // 4. Quaternary Engine: MyMemory API
            try {
                const mmRes = await fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(query) + "&langpair=" + src + "|" + tgt);
                if (mmRes.ok) {
                    const data = await mmRes.json();
                    if (data && data.responseData && data.responseData.translatedText) {
                        const mmText = data.responseData.translatedText.trim();
                        if (mmText.toLowerCase() !== query.toLowerCase() || src === tgt) {
                            setTranslatedText(mmText);
                            setPhoneticText("");
                            setIsTranslating(false);
                            return;
                        }
                    }
                }
            } catch (err) {
                console.log("MyMemory fallback error:", err);
            }

            setTranslatedText(query);
            setPhoneticText("");
            setIsTranslating(false);
        };

        const speakText = (text, langCode = targetLang) => {
            if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
            try {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                const targetLanguage = languages.find(l => l.code === langCode);
                if (targetLanguage && targetLanguage.speechCode) {
                    utterance.lang = targetLanguage.speechCode;
                }
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
            } catch (e) {
                console.log("Speech synthesis error:", e);
            }
        };

        const copyTranslation = () => {
            if (!translatedText) return;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(translatedText).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                });
            } else {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        };

        const handleShare = () => {
            const shareText = `${inputText}\n\nTranslation (${currentTarget.name}):\n${translatedText}`;
            if (navigator.share) {
                navigator.share({
                    title: "SAFORA Tourist Translator",
                    text: shareText
                }).catch(() => {});
            } else if (navigator.clipboard) {
                navigator.clipboard.writeText(shareText).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                });
            }
        };

        const toggleListening = () => {
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRec) {
                alert("Voice speech recognition is not supported in this browser. Please type your phrase in the input box.");
                return;
            }
            if (isListening) {
                if (recognitionRef.current) {
                    try { recognitionRef.current.stop(); } catch (e) {}
                }
                setIsListening(false);
                return;
            }
            try {
                const rec = new SpeechRec();
                recognitionRef.current = rec;
                const srcLanguage = languages.find(l => l.code === sourceLang);
                rec.lang = (srcLanguage && srcLanguage.speechCode) ? srcLanguage.speechCode : "en-US";
                rec.interimResults = false;
                rec.continuous = false;

                rec.onstart = () => setIsListening(true);
                rec.onresult = (ev) => {
                    const text = ev.results && ev.results[0] && ev.results[0][0] && ev.results[0][0].transcript;
                    if (text) {
                        setInputText(text);
                        handleTranslate(text, sourceLang, targetLang);
                    }
                    setIsListening(false);
                };
                rec.onerror = (ev) => {
                    console.log("Speech recognition error:", ev.error);
                    setIsListening(false);
                };
                rec.onend = () => setIsListening(false);
                rec.start();
            } catch (err) {
                console.log("Speech recognition start failed:", err);
                setIsListening(false);
            }
        };

        const selectQuickPhrase = (phrase) => {
            setInputText(phrase.en);
            if (targetLang === "hi") {
                setTranslatedText(phrase.hi);
                setPhoneticText(phrase.hiPhonetic || "");
            } else if (targetLang === "mr") {
                setTranslatedText(phrase.mr);
                setPhoneticText(phrase.mrPhonetic || "");
            } else {
                handleTranslate(phrase.en, sourceLang, targetLang);
            }
        };

        return e("div", { className: "flex flex-col gap-4 pb-16 select-none" },
            // 1. TOP HEADER BAR (small < back button + centered "Translate" + share button)
            e("div", { className: "flex items-center justify-between pt-2 pb-1 border-b border-slate-200 min-h-[40px]" },
                e("button", {
                    type: "button",
                    onClick: onBackToHome,
                    className: "w-8 h-8 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-50 font-bold active:scale-95 transition-all shrink-0",
                    title: "Back to Home"
                },
                    e("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5 },
                        e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" })
                    )
                ),

                e("h2", { className: "font-heading font-black text-xl text-slate-900 tracking-tight text-center flex-1" },
                    "Translate"
                ),

                e("button", {
                    type: "button",
                    onClick: handleShare,
                    className: "w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 font-bold active:scale-95 transition-all shrink-0",
                    title: "Share translation"
                },
                    e("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                        e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" })
                    )
                )
            ),

            // 2. DUAL CARD CONTAINER (WHITE SOURCE CARD + SLATE-900 TARGET CARD + CENTRAL SWAP BUTTON)
            e("div", { className: "w-full max-w-3xl mx-auto flex flex-col relative" },
                // --- TOP SOURCE CARD (WHITE) ---
                e("div", {
                    className: "w-full p-5 rounded-t-[32px] rounded-b-[20px] bg-white border border-slate-200/90 shadow-sm flex flex-col gap-3 relative z-10"
                },
                    // Header inside Top Card
                    e("div", { className: "flex items-center justify-between gap-2" },
                        // Action Icons: Mic & Speaker
                        e("div", { className: "flex items-center gap-1.5" },
                            e("button", {
                                type: "button",
                                onClick: toggleListening,
                                className: "w-8 h-8 rounded-full flex items-center justify-center transition-all " +
                                    (isListening ? "bg-rose-500 text-white animate-pulse" : "bg-slate-100 hover:bg-slate-200 text-slate-700"),
                                title: isListening ? "Stop listening" : "Voice speech input"
                            }, "🎙️"),
                            e("button", {
                                type: "button",
                                onClick: () => speakText(inputText, sourceLang),
                                className: "w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all",
                                title: "Listen to source text"
                            }, "🔊"),
                            inputText && e("button", {
                                type: "button",
                                onClick: () => { setInputText(""); setTranslatedText(""); setPhoneticText(""); },
                                className: "text-[11px] font-bold text-slate-400 hover:text-slate-600 ml-1 px-1.5 py-0.5 rounded"
                            }, "✕")
                        ),

                        // Source Language Pill (Right) - Default: English
                        e("div", {
                            className: "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer border border-slate-200/60"
                        },
                            e("span", { className: "text-xs font-bold text-slate-800" }, currentSource.name),
                            e("span", { className: "text-[10px] text-slate-500" }, "▾"),
                            e("select", {
                                value: sourceLang,
                                onChange: (e) => {
                                    const next = e.target.value;
                                    setSourceLang(next);
                                    handleTranslate(inputText, next, targetLang);
                                },
                                className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            },
                                languages.map(l => e("option", { key: l.code, value: l.code }, l.name))
                            )
                        )
                    ),

                    // Source Text Input / Editable Display
                    e("div", { className: "pt-1 pb-3" },
                        e("textarea", {
                            ref: textareaRef,
                            rows: 3,
                            value: inputText,
                            onChange: (e) => {
                                const val = e.target.value;
                                setInputText(val);
                                handleTranslate(val, sourceLang, targetLang);
                            },
                            placeholder: "Enter text to translate...",
                            className: "w-full bg-transparent text-slate-950 font-bold text-base sm:text-lg leading-relaxed resize-none focus:outline-none placeholder:text-slate-600 placeholder:font-medium selection:bg-slate-200"
                        })
                    )
                ),

                // --- CENTRAL CIRCULAR SWAP BUTTON (OVERLAPPING THE SEAM) ---
                e("div", { className: "relative w-full flex items-center justify-center -my-5 z-20 pointer-events-none" },
                    e("button", {
                        type: "button",
                        onClick: swapLanguages,
                        className: "pointer-events-auto w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/30 border-4 border-[#f1f3f7] flex items-center justify-center font-bold text-sm hover:scale-110 active:scale-95 transition-all cursor-pointer",
                        title: "Swap source & target languages"
                    },
                        e("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.4 },
                            e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" })
                        )
                    )
                ),

                // --- BOTTOM TARGET CARD (SLATE-900 MATCHING SAFORA APP UI) ---
                e("div", {
                    className: "w-full p-5 rounded-t-[20px] rounded-b-[32px] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white shadow-xl shadow-slate-900/20 border border-slate-800 flex flex-col gap-3 relative z-10"
                },
                    // Header inside Bottom Card
                    e("div", { className: "flex items-center justify-between gap-2" },
                        // Target Language Pill (Left) - Default: Hindi
                        e("div", {
                            className: "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md transition-colors cursor-pointer text-white border border-white/10"
                        },
                            e("span", { className: "text-xs font-bold text-white tracking-wide" }, currentTarget.name),
                            e("span", { className: "text-[10px] text-white/70" }, "▾"),
                            e("select", {
                                value: targetLang,
                                onChange: (e) => {
                                    const next = e.target.value;
                                    setTargetLang(next);
                                    handleTranslate(inputText, sourceLang, next);
                                },
                                className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full text-slate-900"
                            },
                                languages.map(l => e("option", { key: l.code, value: l.code }, l.name))
                            )
                        ),

                        // Action Icons: Copy & Speaker
                        e("div", { className: "flex items-center gap-1.5" },
                            e("button", {
                                type: "button",
                                onClick: copyTranslation,
                                className: "w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all text-xs",
                                title: "Copy translation"
                            }, copied ? "✓" : "📋"),
                            e("button", {
                                type: "button",
                                onClick: () => speakText(translatedText, targetLang),
                                className: "w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all text-xs",
                                title: "Listen to translated speech"
                            }, "🔊")
                        )
                    ),

                    // Translated Content Area
                    e("div", { className: "pt-1 pb-3 flex flex-col gap-2.5 min-h-[72px]" },
                        isTranslating ? (
                            e("div", { className: "flex items-center gap-2 text-emerald-400 text-sm font-semibold py-2" },
                                e("span", { className: "inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" }),
                                "Translating in real-time..."
                            )
                        ) : translatedText ? (
                            e("p", {
                                className: "text-white font-bold text-base sm:text-lg leading-relaxed tracking-wide",
                                style: {
                                    direction: (targetLang === "ar") ? "rtl" : "ltr",
                                    textAlign: (targetLang === "ar") ? "right" : "left"
                                }
                            }, translatedText)
                        ) : (
                            e("p", { className: "text-slate-400 text-sm font-medium italic" },
                                "Translation will appear here..."
                            )
                        ),

                        // Phonetic transcription badge
                        phoneticText && e("div", {
                            className: "self-start px-3 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono-data tracking-wide"
                        }, "Pronounce: \"" + phoneticText + "\"")
                    )
                )
            ),

            // 3. QUICK TOURIST PHRASEBOOK (ALIGNED WITH SAFORA THEME)
            e("div", { className: "w-full max-w-3xl mx-auto flex flex-col gap-2.5 pt-2" },
                e("button", {
                    type: "button",
                    onClick: () => setShowPhrasebook(!showPhrasebook),
                    className: "w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all text-left cursor-pointer group"
                },
                    e("div", { className: "flex items-center gap-2.5" },
                        e("span", { className: "text-base" }, "🧳"),
                        e("div", null,
                            e("h3", { className: "font-heading font-black text-xs text-slate-900 uppercase tracking-wider font-mono-data" },
                                "Quick Tourist Phrases"
                            ),
                            e("p", { className: "text-[11px] text-slate-500 font-medium" },
                                showPhrasebook ? "Tap to collapse quick phrases" : "Tap to view quick phrases & emergency words"
                            )
                        )
                    ),
                    e("div", { className: "flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 group-hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors shrink-0" },
                        e("span", null, showPhrasebook ? "Hide" : "Show"),
                        e("span", { className: "text-[10px]" }, showPhrasebook ? "▲" : "▼")
                    )
                ),

                showPhrasebook && e("div", { className: "flex flex-col gap-2.5 transition-all" },
                    // Category Pills
                    e("div", { className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1" },
                        touristPhraseCategories.map(cat => e("button", {
                            key: cat.id,
                            type: "button",
                            onClick: () => setActiveCategory(cat.id),
                            className: "px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all " +
                                (activeCategory === cat.id ? "bg-slate-900 text-white shadow-xs" : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900")
                        }, cat.label))
                    ),

                    // Phrases List
                    e("div", { className: "flex flex-col gap-2.5" },
                        (touristPhrases[activeCategory] || []).map((phrase, idx) => e("div", {
                            key: idx,
                            onClick: () => selectQuickPhrase(phrase),
                            className: "p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 shadow-2xs transition-all cursor-pointer flex flex-col gap-1 active:scale-98"
                        },
                            e("div", { className: "flex items-center justify-between" },
                                e("p", { className: "text-xs font-bold text-slate-800" }, phrase.en),
                                e("button", {
                                    type: "button",
                                    onClick: (ev) => {
                                        ev.stopPropagation();
                                        speakText(targetLang === "mr" ? phrase.mr : phrase.hi, targetLang);
                                    },
                                    className: "w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs shrink-0"
                                }, "🔊")
                            ),
                            e("p", { className: "text-xs font-bold text-slate-900" }, targetLang === "mr" ? phrase.mr : phrase.hi),
                            e("p", { className: "text-[11px] text-slate-400 italic" }, targetLang === "mr" ? phrase.mrPhonetic : phrase.hiPhonetic)
                        ))
                    )
                )
            ),

            // 4. FLOATING BOTTOM ACTION BAR (MATCHING SAFORA THEME DOCK)
            e("div", { className: "w-full flex items-center justify-center pt-2 pb-1" },
                e("div", {
                    className: "px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/10 flex items-center gap-4"
                },
                    // Keyboard Focus Button
                    e("button", {
                        type: "button",
                        onClick: () => {
                            if (textareaRef.current) {
                                textareaRef.current.focus();
                            }
                        },
                        className: "w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold transition-all active:scale-95",
                        title: "Type custom text"
                    }, "⌨️"),

                    // Big Center Mic Button
                    e("button", {
                        type: "button",
                        onClick: toggleListening,
                        className: "w-12 h-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center text-xl shadow-lg shadow-slate-900/30 transition-all active:scale-95 relative " +
                            (isListening ? "animate-pulse ring-4 ring-rose-400" : ""),
                        title: isListening ? "Stop listening" : "Tap to speak and translate"
                    },
                        e("span", null, isListening ? "⏹️" : "🎙️"),
                        isListening && e("span", { className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 animate-ping" })
                    ),

                    // Quick Phrasebook / Library Toggle
                    e("button", {
                        type: "button",
                        onClick: () => setShowPhrasebook(!showPhrasebook),
                        className: "w-9 h-9 rounded-full " + (showPhrasebook ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700") +
                            " flex items-center justify-center text-sm font-bold transition-all active:scale-95",
                        title: "Toggle Phrasebook"
                    }, "📚")
                )
            )
        );
    }

    // =========================================================================
    // SECTION: ULTRA-SMOOTH SLIDE-TO-SOS COMPONENT (SLIDE-ONLY ACTIVATION)
    // =========================================================================
    function SlideToSosButton({ onTrigger, selectedLang }) {
        const trackRef = useRef(null);
        const [dragX, setDragX] = useState(0);
        const [isDragging, setIsDragging] = useState(false);
        const [isCompleted, setIsCompleted] = useState(false);
        const startXRef = useRef(0);

        const labelText = selectedLang === "Hindi"
            ? "स्लाइड करके SOS भेजें"
            : selectedLang === "Marathi"
            ? "स्लाइड करून SOS पाठवा"
            : "SLIDE TO DISPATCH SOS";

        const handleStart = (clientX) => {
            if (isCompleted) return;
            setIsDragging(true);
            startXRef.current = clientX;
        };

        const handleMove = (clientX, e) => {
            if (!isDragging || !trackRef.current || isCompleted) return;
            if (e && e.cancelable) e.preventDefault();
            const trackWidth = trackRef.current.offsetWidth;
            const thumbWidth = 46;
            const maxDrag = Math.max(0, trackWidth - thumbWidth - 8);
            const currentDelta = Math.max(0, Math.min(clientX - startXRef.current, maxDrag));
            setDragX(currentDelta);
            if (currentDelta >= maxDrag * 0.85 && !isCompleted) {
                setIsCompleted(true);
                setIsDragging(false);
                setDragX(maxDrag);
                if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
                onTrigger();
                setTimeout(() => { setDragX(0); setIsCompleted(false); }, 1500);
            }
        };

        const handleEnd = () => {
            if (!isDragging) return;
            setIsDragging(false);
            if (!isCompleted) setDragX(0);
        };

        useEffect(() => {
            const onMouseMove = (e) => handleMove(e.clientX, e);
            const onMouseUp = () => handleEnd();
            const onTouchMove = (e) => { if (e.touches && e.touches[0]) handleMove(e.touches[0].clientX, e); };
            const onTouchEnd = () => handleEnd();
            if (isDragging) {
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
                window.addEventListener('touchmove', onTouchMove, { passive: false });
                window.addEventListener('touchend', onTouchEnd);
            }
            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
                window.removeEventListener('touchmove', onTouchMove);
                window.removeEventListener('touchend', onTouchEnd);
            };
        }, [isDragging, isCompleted]);

        return e("div", {
            ref: trackRef,
            className: "w-full h-14 rounded-full bg-[#0f172a] relative overflow-hidden flex items-center select-none shadow-xl border border-slate-700/50 touch-none"
        },
            e("div", {
                className: "absolute left-0 top-0 bottom-0 bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-full",
                style: {
                    width: `${dragX + 46}px`,
                    opacity: dragX > 3 ? 0.95 : 0,
                    transition: isDragging ? 'none' : 'width 0.35s cubic-bezier(0.25,1,0.5,1), opacity 0.3s ease'
                }
            }),
            e("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none text-center pl-10 pr-3" },
                e("span", {
                    className: "font-heading font-black text-xs uppercase tracking-wider text-white text-center drop-shadow-md block",
                    style: {
                        opacity: Math.max(0.1, 1 - (dragX / 110)),
                        transition: isDragging ? 'none' : 'opacity 0.3s ease'
                    }
                }, isCompleted ? "🚨 SOS DISPATCHED!" : labelText)
            ),
            e("div", {
                onMouseDown: (e) => { e.stopPropagation(); handleStart(e.clientX); },
                onTouchStart: (e) => { e.stopPropagation(); if (e.touches && e.touches[0]) handleStart(e.touches[0].clientX); },
                className: "w-11 h-11 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center font-black text-base cursor-grab active:cursor-grabbing z-10 select-none",
                style: {
                    transform: `translate3d(${dragX + 4}px, 0, 0)`,
                    boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
                    transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25,1,0.5,1)',
                    willChange: 'transform'
                }
            }, isCompleted ? "✓" : "➔")
        );
    }

    // =========================================================================
    // SECTION: WORKING OPENSTREETMAP LEAFLET COMPONENT WITH REAL GPS
    // =========================================================================
    function WorkingSafetyMap({ touristLatLong, setTouristLatLong, isUsingRealGps, setIsUsingRealGps }) {
        const mapContainerRef = useRef(null);
        const mapInstanceRef = useRef(null);
        const markerRef = useRef(null);
        const circleRef = useRef(null);
        const [isFetchingGps, setIsFetchingGps] = useState(false);

        const fetchRealGps = () => {
            if (!("geolocation" in navigator)) { alert("⚠️ Geolocation not supported."); return; }
            setIsFetchingGps(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    if (setTouristLatLong) setTouristLatLong({ lat, lng });
                    if (setIsUsingRealGps) setIsUsingRealGps(true);
                    setIsFetchingGps(false);
                    if (mapInstanceRef.current) mapInstanceRef.current.setView([lat, lng], 16);
                },
                (err) => { setIsFetchingGps(false); alert("📍 Please allow Location / GPS permission."); },
                { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
            );
        };

        useEffect(() => {
            if (!mapContainerRef.current) return;
            function initMap() {
                if (mapInstanceRef.current || !mapContainerRef.current) return;
                const L = window.L;
                if (!L) return;
                const lat = touristLatLong.lat || 18.9242;
                const lng = touristLatLong.lng || 72.8310;
                const map = L.map(mapContainerRef.current, { center: [lat, lng], zoom: 15, zoomControl: false, attributionControl: false });
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
                const circle = L.circle([lat, lng], { color: '#10b981', fillColor: '#10b981', fillOpacity: 0.14, radius: 350, weight: 2 }).addTo(map);
                circleRef.current = circle;
                const userIcon = L.divIcon({ className: 'custom-user-pin', html: '<div style="width:20px;height:20px;background:#2563eb;border:3px solid #ffffff;border-radius:50%;box-shadow:0 0 12px rgba(37,99,235,0.9);"></div>', iconSize: [20, 20], iconAnchor: [10, 10] });
                const marker = L.marker([lat, lng], { icon: userIcon }).addTo(map).bindPopup(`<b>📍 ${isUsingRealGps ? 'Your Real Location' : 'Tourist Location'}</b><br>Lat: ${lat.toFixed(4)}°, Lng: ${lng.toFixed(4)}°`).openPopup();
                const policeIcon = L.divIcon({ className: 'custom-police-pin', html: '<div style="background:#0b192c;color:#ffffff;border:2px solid #38bdf8;padding:2px 6px;border-radius:8px;font-size:10px;font-weight:800;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3);">🚔 Police Post</div>', iconSize: [75, 24], iconAnchor: [37, 12] });
                L.marker([lat - 0.002, lng + 0.002], { icon: policeIcon }).addTo(map).bindPopup('<b>🚔 Tourism Police Assistance Unit</b><br>Active 24/7 (Tel: 112)');
                const hospitalIcon = L.divIcon({ className: 'custom-ems-pin', html: '<div style="background:#dc2626;color:#ffffff;border:2px solid #ffffff;padding:2px 6px;border-radius:8px;font-size:10px;font-weight:800;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3);">🏥 Trauma EMS</div>', iconSize: [85, 24], iconAnchor: [42, 12] });
                L.marker([lat + 0.003, lng + 0.001], { icon: hospitalIcon }).addTo(map).bindPopup('<b>🏥 Emergency Trauma Centre</b><br>Hospital Grid (400m)');
                mapInstanceRef.current = map;
                markerRef.current = marker;
                setTimeout(() => { map.invalidateSize(); }, 250);
            }
            if (!window.L) {
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                script.onload = initMap;
                document.head.appendChild(script);
            } else { initMap(); }
            return () => { if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; } };
        }, []);

        useEffect(() => {
            if (mapInstanceRef.current && markerRef.current) {
                const lat = touristLatLong.lat || 18.9242;
                const lng = touristLatLong.lng || 72.8310;
                markerRef.current.setLatLng([lat, lng]);
                markerRef.current.setPopupContent(`<b>📍 ${isUsingRealGps ? 'Your Real Location' : 'Tourist Location'}</b><br>Lat: ${lat.toFixed(4)}°, Lng: ${lng.toFixed(4)}°`);
                if (circleRef.current) circleRef.current.setLatLng([lat, lng]);
                mapInstanceRef.current.setView([lat, lng], 15);
            }
        }, [touristLatLong, isUsingRealGps]);

        const handleRecenter = () => { if (mapInstanceRef.current) mapInstanceRef.current.setView([touristLatLong.lat || 18.9242, touristLatLong.lng || 72.8310], 16); };

        return e("div", { className: "flex flex-col gap-3" },
            e("div", { className: "flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5" },
                e("button", { onClick: fetchRealGps, disabled: isFetchingGps, className: `px-3.5 py-1.5 rounded-full ${isUsingRealGps ? 'bg-emerald-600' : 'bg-[#0f172a]'} text-white text-[11px] font-bold shadow-xs whitespace-nowrap active:scale-95 transition-all flex items-center gap-1.5 shrink-0` },
                    e("span", { className: `w-2 h-2 rounded-full ${isFetchingGps ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}` }),
                    isFetchingGps ? "Acquiring GPS..." : (isUsingRealGps ? "📍 Real GPS Active" : "📍 Use My Real Location")
                ),
                e("button", { onClick: handleRecenter, className: "px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-bold shadow-xs whitespace-nowrap active:scale-95 transition-all flex items-center gap-1.5 shrink-0 hover:bg-slate-50" }, "🎯 Recenter"),
                e("button", { onClick: () => { if (mapInstanceRef.current) mapInstanceRef.current.setView([(touristLatLong.lat || 18.9242) - 0.002, (touristLatLong.lng || 72.8310) + 0.002], 16); }, className: "px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-bold shadow-xs whitespace-nowrap active:scale-95 transition-all flex items-center gap-1.5 shrink-0 hover:bg-slate-50" }, "🚔 Police Booth"),
                e("button", { onClick: () => { if (mapInstanceRef.current) mapInstanceRef.current.setView([(touristLatLong.lat || 18.9242) + 0.003, (touristLatLong.lng || 72.8310) + 0.001], 16); }, className: "px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-bold shadow-xs whitespace-nowrap active:scale-95 transition-all flex items-center gap-1.5 shrink-0 hover:bg-slate-50" }, "🏥 Trauma EMS")
            ),
            e("div", { className: "relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm" },
                e("div", { ref: mapContainerRef, style: { width: '100%', height: '260px', background: '#e2e8f0', zIndex: 1 } }),
                e("div", { className: "absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-mono-data font-bold text-slate-800 shadow-sm flex items-center gap-1.5" },
                    e("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
                    isUsingRealGps ? "Live Physical GPS Corridor" : "Gateway Heritage Corridor"
                ),
                e("button", { onClick: fetchRealGps, title: "Fetch Real GPS Location", className: "absolute top-3 right-3 z-10 bg-white/95 hover:bg-white backdrop-blur-md p-2 rounded-full border border-slate-200 text-xs font-bold text-slate-800 shadow-sm active:scale-95 transition-all flex items-center justify-center" }, isFetchingGps ? "⏳" : "📍"),
                e("div", { className: "absolute bottom-3 left-3 right-3 z-10 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-200 flex items-center justify-between text-[11px] font-mono-data text-slate-700 shadow-sm" },
                    e("span", { className: "font-bold text-slate-900" }, `GPS: ${Number(touristLatLong.lat || 18.9242).toFixed(4)}° N, ${Number(touristLatLong.lng || 72.8310).toFixed(4)}° E`),
                    e("span", { className: `font-bold px-2.5 py-0.5 rounded-full border text-[10px] ${isUsingRealGps ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'}` }, isUsingRealGps ? "Real GPS Active" : "Zone Secured")
                )
            ),
            e("div", { className: "bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between" },
                e("div", { className: "flex items-center gap-3" },
                    e("div", { className: "w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-lg shadow-xs" }, "👮"),
                    e("div", null,
                        e("h4", { className: "font-heading font-black text-xs text-slate-900 leading-tight" }, "Tourism Police & Emergency Unit"),
                        e("p", { className: "text-[10px] text-slate-500" }, isUsingRealGps ? "Linked to Local Emergency Grid • 24/7 Active" : "Colaba Post • 50m away • 24/7 Monitored")
                    )
                ),
                e("div", { className: "flex items-center gap-1.5" },
                    e("button", { onClick: () => { window.location.href = 'tel:112'; }, className: "w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shadow-xs active:scale-95 transition-all" }, "📞"),
                    e("button", { onClick: fetchRealGps, title: "Locate Me", className: "w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs shadow-xs active:scale-95 transition-all" }, "📍")
                )
            )
        );
    }


    // =========================================================================
    // MASTER EMERGENCY SERVICES REGISTRY (HOSPITALS, POLICE, PHARMACIES)
    // =========================================================================
    const MASTER_EMERGENCY_SERVICES = [
        // --- HOSPITALS: NAVI MUMBAI ---
        {
            name: "D. Y. Patil Multi-Specialty Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0435,
            lng: 73.0253,
            area: "Sector 5, Nerul, Navi Mumbai",
            phone: "108 / +91-22-2770-5935",
            status: "24/7 Trauma Care Open",
            specialty: "Level 1 Apex Emergency & Trauma Ward"
        },
        {
            name: "Terna Speciality Hospital & Research Centre",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0357,
            lng: 73.0189,
            area: "Sector 22, Nerul West, Navi Mumbai",
            phone: "108 / +91-22-6157-8300",
            status: "24/7 Casualty & ICU Active",
            specialty: "Advanced Critical Care & Cath Lab"
        },
        {
            name: "Sunshine Multi-Specialty Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0320,
            lng: 73.0220,
            area: "Sector 20, Nerul, Navi Mumbai",
            phone: "+91-22-2771-4444",
            status: "24/7 Casualty Open",
            specialty: "Emergency Surgery & Critical Care"
        },
        {
            name: "Apollo Hospital Navi Mumbai",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0185,
            lng: 73.0401,
            area: "Sector 23, CBD Belapur, Navi Mumbai",
            phone: "1066 / +91-22-6280-6280",
            status: "24/7 Emergency & Stroke Center",
            specialty: "JCI Accredited Emergency Center"
        },
        {
            name: "MGM New Bombay Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0707,
            lng: 72.9975,
            area: "Sector 3, Vashi, Navi Mumbai",
            phone: "108 / +91-22-2788-0000",
            status: "24/7 Trauma & Critical Care",
            specialty: "Emergency Medical Services (EMS)"
        },
        {
            name: "Fortis Hiranandani Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0754,
            lng: 72.9989,
            area: "Mini Sea Shore Road, Sector 10A, Vashi",
            phone: "1057 / +91-22-3919-9222",
            status: "24/7 Emergency Room Open",
            specialty: "Comprehensive Trauma & ICU"
        },
        {
            name: "Tata Memorial Centre - ACTREC",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0456,
            lng: 73.0682,
            area: "Sector 22, Kharghar, Navi Mumbai",
            phone: "108 / +91-22-2740-5000",
            status: "24/7 Super-Specialty Emergency",
            specialty: "Govt Advanced Referral & Trauma"
        },
        {
            name: "MITR Hospital & Laparoscopy Institute",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0321,
            lng: 73.0645,
            area: "Sector 12, Kharghar, Navi Mumbai",
            phone: "+91-22-2774-3558",
            status: "Day & Night Emergency",
            specialty: "Emergency Medicine & Diagnostics"
        },
        {
            name: "Motherhood Hospital Kharghar",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0340,
            lng: 73.0680,
            area: "Sector 7, Kharghar, Navi Mumbai",
            phone: "+91-80-6723-8833",
            status: "24/7 Emergency Care",
            specialty: "Maternity & Pediatric Emergency"
        },
        {
            name: "Reliance Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.1032,
            lng: 73.0084,
            area: "Sector 9, Koparkhairane, Navi Mumbai",
            phone: "+91-22-6861-7777",
            status: "24/7 Trauma & Emergency",
            specialty: "Cardiac & Neuro Emergency Care"
        },
        {
            name: "Kokilaben Dhirubhai Ambani Hospital Navi Mumbai",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.1070,
            lng: 73.0070,
            area: "Kopar Khairane, Navi Mumbai",
            phone: "+91-22-4890-0000",
            status: "24/7 Emergency Care Open",
            specialty: "Full-Time Emergency Doctors"
        },
        {
            name: "MGM Medical College & Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0200,
            lng: 73.0900,
            area: "Kamothe, Navi Mumbai",
            phone: "108 / +91-22-2743-3404",
            status: "24/7 Govt Trauma Center",
            specialty: "Govt Casualty & 24/7 Blood Bank"
        },
        {
            name: "Jupiter Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.2085,
            lng: 72.9723,
            area: "Eastern Express Highway, Thane West",
            phone: "108 / +91-22-2172-5555",
            status: "24/7 Super-Specialty Trauma",
            specialty: "NABH Accredited Apex Trauma"
        },

        // --- HOSPITALS: MUMBAI CITY ---
        {
            name: "Bombay Hospital & Medical Research Centre",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 18.9405,
            lng: 72.8285,
            area: "Marine Lines, Mumbai",
            phone: "108 / +91-22-2206-7676",
            status: "24/7 Trauma Care Open",
            specialty: "Major Referral & Critical Care"
        },
        {
            name: "Lilavati Hospital & Research Centre",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0515,
            lng: 72.8290,
            area: "Bandra West, Mumbai",
            phone: "108 / +91-22-2675-1000",
            status: "24/7 Emergency & Cardiac Care",
            specialty: "Multi-Specialty Emergency Center"
        },
        {
            name: "Sir H. N. Reliance Foundation Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 18.9567,
            lng: 72.8185,
            area: "Girgaon, Mumbai",
            phone: "108 / +91-22-6130-5005",
            status: "24/7 Emergency & Trauma",
            specialty: "Advanced Critical & Cardiac Care"
        },
        {
            name: "KEM Hospital (King Edward Memorial)",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0028,
            lng: 72.8428,
            area: "Parel, Mumbai",
            phone: "108 / +91-22-2410-7000",
            status: "24/7 State Trauma Level 1",
            specialty: "Govt Level-1 Apex Trauma Center"
        },
        {
            name: "Hinduja National Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0330,
            lng: 72.8398,
            area: "Veer Savarkar Marg, Mahim, Mumbai",
            phone: "+91-22-2445-1515",
            status: "24/7 Emergency Services",
            specialty: "Multi-Disciplinary Emergency Unit"
        },
        {
            name: "Nanavati Max Super Speciality Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.0963,
            lng: 72.8420,
            area: "Vile Parle West, Mumbai",
            phone: "108 / +91-22-2626-7500",
            status: "24/7 Emergency & ICU",
            specialty: "24/7 Cardiac & Neuro Trauma"
        },
        {
            name: "Kokilaben Dhirubhai Ambani Hospital",
            type: "Hospital (EMS)",
            category: "hospital",
            lat: 19.1311,
            lng: 72.8252,
            area: "Four Bungalows, Andheri West, Mumbai",
            phone: "108 / +91-22-4269-6969",
            status: "24/7 Level 1 Trauma Center",
            specialty: "Full-Time Specialist System"
        },

        // --- POLICE STATIONS ---
        {
            name: "Nerul Police Station & Tourist Assistance",
            type: "Police Station",
            category: "police",
            lat: 19.0345,
            lng: 73.0180,
            area: "Sector 19, Nerul, Navi Mumbai",
            phone: "112 / +91-22-2770-2233",
            status: "Active Patrolling Unit 24/7",
            specialty: "Tourist Safety & Rapid Response"
        },
        {
            name: "CBD Belapur Police Station",
            type: "Police Station",
            category: "police",
            lat: 19.0190,
            lng: 73.0390,
            area: "CBD Belapur, Navi Mumbai",
            phone: "112 / +91-22-2757-4466",
            status: "Rapid Response Unit Active",
            specialty: "Highway & Urban Patrol"
        },
        {
            name: "Kharghar Police Station",
            type: "Police Station",
            category: "police",
            lat: 19.0430,
            lng: 73.0640,
            area: "Sector 12, Kharghar, Navi Mumbai",
            phone: "112 / +91-22-2774-2244",
            status: "24/7 Active Patrol",
            specialty: "Patrol & Emergency Squad"
        },
        {
            name: "Vashi Police Station",
            type: "Police Station",
            category: "police",
            lat: 19.0720,
            lng: 72.9980,
            area: "Sector 17, Vashi, Navi Mumbai",
            phone: "112 / +91-22-2789-2233",
            status: "Tourist Safety Squad On-Duty",
            specialty: "Urban Law & Order"
        },
        {
            name: "Colaba Police Station & Tourism Safety Post",
            type: "Police Station",
            category: "police",
            lat: 18.9180,
            lng: 72.8280,
            area: "Colaba Causeway, Mumbai",
            phone: "112 / +91-22-2285-6817",
            status: "Active Patrolling Unit",
            specialty: "Heritage Zone Tourist Post"
        },

        // --- 24/7 PHARMACIES ---
        {
            name: "Apollo Pharmacy 24/7 Nerul Outlet",
            type: "Pharmacy",
            category: "pharmacy",
            lat: 19.0335,
            lng: 73.0205,
            area: "Sector 15, Nerul West, Navi Mumbai",
            phone: "+91-22-2771-8890",
            status: "Open 24 Hours • Emergency Medicine",
            specialty: "24/7 Life Saving Drugs"
        },
        {
            name: "Wellness Forever 24/7 Vashi",
            type: "Pharmacy",
            category: "pharmacy",
            lat: 19.0740,
            lng: 72.9990,
            area: "Sector 17, Vashi, Navi Mumbai",
            phone: "+91-22-2789-1122",
            status: "Open 24/7 • Prescription Medicine",
            specialty: "Emergency First Aid & Cold Storage"
        },
        {
            name: "Apollo Pharmacy 24/7 Heritage Outlet",
            type: "Pharmacy",
            category: "pharmacy",
            lat: 18.9220,
            lng: 72.8315,
            area: "Colaba, Mumbai",
            phone: "+91-22-2282-1400",
            status: "Open Now • Multi-lingual Staff",
            specialty: "International Travel Meds"
        },
        {
            name: "Consulate General Assistance Helpdesk",
            type: "Embassy / Consulate",
            category: "embassy",
            lat: 18.9890,
            lng: 72.8210,
            area: "BKC / South Mumbai",
            phone: "+91-22-2672-4000",
            status: "Diplomatic Emergency Liaison",
            specialty: "Consular & Tourist Emergency Liaison"
        }
    ];

    // =========================================================================
    // REFERENCE-MATCHING LOST & FOUND COMPONENT
    // =========================================================================
    // =========================================================================
    // REFERENCE-MATCHING LOST & FOUND COMPONENT
    // =========================================================================
    function ReferenceLostSection({ profile, lostReports, setLostReports, myLocalLostIds, setMyLocalLostIds, handleLostFoundSubmit, handleDismissMyReport, handleClearAllMyReports, isFilingModalOpen: externalIsFilingModalOpen, setIsFilingModalOpen: externalSetIsFilingModalOpen, selectedLang = "English" }) {
        const t = UI_I18N[selectedLang] || UI_I18N["English"];
        const [activeSubTab, setActiveSubTab] = useState("reportLost");
        const [internalIsFilingModalOpen, internalSetIsFilingModalOpen] = useState(false);
        const isFilingModalOpen = externalIsFilingModalOpen !== undefined ? externalIsFilingModalOpen : internalIsFilingModalOpen;
        const setIsFilingModalOpen = externalSetIsFilingModalOpen || internalSetIsFilingModalOpen;
        const [modalCategory, setModalCategory] = useState("Passport");
        const [otherCategoryText, setOtherCategoryText] = useState("");

        // STRICT DEVICE/USER CLAIM ISOLATION: A tourist ONLY sees what THEY personally logged
        const filteredList = useMemo(() => {
            const all = lostReports || [];
            const myIds = Array.isArray(myLocalLostIds) ? myLocalLostIds : [];
            
            // Only reports submitted from THIS device (present in myLocalLostIds)
            const myReports = all.filter(r => r && r.id && myIds.includes(r.id));

            if (activeSubTab === "reportLost") {
                return myReports.map(r => {
                    const isFound = r.status === "Resolved" || r.status === "Found" || r.status === "Item Located" || r.status === "Resolved & Returned";
                    return {
                        id: r.id,
                        item: r.item,
                        location: r.location || "Gateway Promenade",
                        timestamp: r.timestamp || "Just now",
                        status: isFound ? "Found" : "Searching",
                        color: isFound ? "green" : "orange",
                        isUserClaim: true
                    };
                });
            } else {
                // In Found Items, show user's own items that have been located/resolved
                return myReports.filter(r => {
                    return r.status === "Resolved" || r.status === "Found" || r.status === "Item Located" || r.status === "Resolved & Returned";
                }).map(r => ({
                    id: r.id,
                    item: r.item,
                    location: r.location || "Tourism Police Helpdesk",
                    timestamp: r.timestamp || "Today",
                    status: "Found",
                    color: "green",
                    isUserClaim: true
                }));
            }
        }, [lostReports, activeSubTab, myLocalLostIds]);

        return e("div", { className: "flex flex-col gap-4" },
            e("div", { className: "flex items-center justify-between pt-1 pb-1" },
                e("h2", { className: "font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight" }, t.lostTitle),
                e("span", { className: "text-[11px] font-mono-data font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider" }, t.securedBadge)
            ),
            e("div", { className: "bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-2 gap-1.5 text-center font-heading text-xs font-bold" },
                e("button", {
                    onClick: () => setActiveSubTab("reportLost"),
                    className: `py-2.5 rounded-xl transition-all ${activeSubTab === 'reportLost' ? 'bg-[#0b192c] text-white font-extrabold shadow-sm' : 'text-slate-600 hover:text-slate-900'}`
                }, t.reportLostTab),
                e("button", {
                    onClick: () => setActiveSubTab("foundItems"),
                    className: `py-2.5 rounded-xl transition-all ${activeSubTab === 'foundItems' ? 'bg-[#0b192c] text-white font-extrabold shadow-sm' : 'text-slate-600 hover:text-slate-900'}`
                }, t.foundItemsTab)
            ),
            e("div", { className: "flex items-center justify-between px-1 mt-1" },
                e("span", { className: "text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-mono-data" },
                    activeSubTab === "reportLost" ? t.recentLostReports : t.verifiedFoundItems
                ),
                lostReports.length > 0 && e("button", {
                    onClick: handleClearAllMyReports,
                    className: "text-[10px] font-bold text-slate-400 hover:text-red-600 transition-colors"
                }, t.clearMyReports)
            ),
            e("div", { className: "flex flex-col gap-3" },
                filteredList.length === 0 ? e("div", { className: "bg-white rounded-3xl p-8 border border-slate-200 text-center text-slate-500 text-xs flex flex-col items-center gap-2 shadow-xs" },
                    e("span", { className: "text-2xl" }, "📦"),
                    e("p", { className: "font-bold text-slate-800" }, selectedLang === "Hindi" ? "अभी तक कोई रिपोर्ट दर्ज नहीं है।" : selectedLang === "Marathi" ? "अद्याप कोणतीही नोंद नाही." : "No reports in this category yet."),
                    e("p", { className: "text-[11px] text-slate-400" }, selectedLang === "Hindi" ? "नई रिपोर्ट दर्ज करने के लिए नीचे बटन दबाएं।" : selectedLang === "Marathi" ? "नवीन नोंदणी करण्यासाठी खालील बटण दाबा." : "Tap '+ REPORT LOST ITEM' below to log a new missing property claim.")
                ) :
                filteredList.map((item, idx) => {
                    const isGreen = item.status === "Found" || item.color === "green";
                    return e("div", {
                        key: idx,
                        className: "bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center justify-between relative overflow-hidden hover:shadow-md transition-shadow"
                    },
                        e("div", {
                            className: `absolute left-0 top-0 bottom-0 w-1.5 ${isGreen ? 'bg-emerald-500' : 'bg-amber-500'}`
                        }),
                        e("div", { className: "pl-2 flex flex-col gap-0.5" },
                            e("h3", { className: "font-heading font-black text-sm sm:text-base text-slate-900 leading-tight" }, item.item),
                            e("p", { className: "text-xs text-slate-500 font-medium mt-0.5" },
                                "Last seen: ",
                                e("span", { className: "text-slate-700 font-semibold" }, item.location)
                            ),
                            e("span", { className: "text-[10px] text-slate-400 font-mono-data mt-0.5" }, item.timestamp)
                        ),
                        e("div", { className: "flex items-center gap-2" },
                            e("span", {
                                className: `px-3 py-1 rounded-xl text-xs font-black tracking-wide font-heading ${
                                    isGreen 
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/80' 
                                        : 'bg-amber-50 text-amber-600 border border-amber-200/80'
                                }`
                            }, item.status),
                            item.isUserClaim && e("button", {
                                onClick: () => handleDismissMyReport(item.id),
                                title: "Remove report",
                                className: "text-slate-300 hover:text-red-500 text-xs p-1"
                            }, "✕")
                        )
                    );
                })
            ),
            e("button", {
                onClick: () => setIsFilingModalOpen(true),
                className: "w-full py-4 rounded-2xl bg-[#0b192c] hover:bg-slate-800 text-white font-heading font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all mt-2"
            },
                e("span", { className: "text-base font-bold" }, "+"),
                e("span", null, t.reportLostButton)
            ),
            isFilingModalOpen && e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4" },
                e("div", { className: "bg-white border border-slate-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col" },
                    e("div", { className: "bg-[#0b192c] p-5 flex justify-between items-center text-white" },
                        e("div", null,
                            e("h3", { className: "font-heading font-black text-base sm:text-lg text-white" }, t.fileClaim),
                            e("p", { className: "text-xs text-slate-300 font-medium" }, t.fileClaimSub)
                        ),
                        e("button", {
                            onClick: () => setIsFilingModalOpen(false),
                            className: "w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-sm font-bold"
                        }, "✕")
                    ),
                    e("form", {
                        onSubmit: (e) => {
                            handleLostFoundSubmit(e, modalCategory, otherCategoryText);
                            setIsFilingModalOpen(false);
                            setOtherCategoryText("");
                        },
                        className: "p-5 sm:p-6 overflow-y-auto flex flex-col gap-3.5 text-xs sm:text-sm"
                    },
                        e("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" },
                            e("div", null,
                                e("label", { className: "text-xs text-slate-800 font-extrabold block mb-1 uppercase tracking-wider" }, t.itemCategory),
                                e("select", {
                                    name: "category",
                                    value: modalCategory,
                                    onChange: (e) => setModalCategory(e.target.value),
                                    className: "w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:border-blue-500 cursor-pointer shadow-xs"
                                },
                                    e("option", { value: "Passport" }, "🛂 Passport / Official ID"),
                                    e("option", { value: "Wallet" }, "👛 Wallet / Cash / Cards"),
                                    e("option", { value: "Bag" }, "🎒 Backpack / Luggage"),
                                    e("option", { value: "Phone / Electronics" }, "📱 Phone / Camera / Laptop"),
                                    e("option", { value: "Jewelry / Watch" }, "⌚ Jewelry / Watch"),
                                    e("option", { value: "Other" }, "📦 Other (Custom Specification)")
                                )
                            ),
                            modalCategory === "Other" ? e("div", null,
                                e("label", { className: "text-xs text-blue-700 font-extrabold block mb-1 uppercase tracking-wider" }, 'Specify "Other" Category *'),
                                e("input", {
                                    required: true,
                                    name: "otherSpecification",
                                    type: "text",
                                    value: otherCategoryText,
                                    onChange: (e) => setOtherCategoryText(e.target.value),
                                    placeholder: "e.g. Prescription Glasses, Drone...",
                                    className: "w-full bg-slate-50 border border-blue-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs font-bold"
                                })
                            ) : e("div", null,
                                e("label", { className: "text-xs text-slate-800 font-extrabold block mb-1 uppercase tracking-wider" }, t.itemName),
                                e("input", {
                                    required: true,
                                    name: "item",
                                    type: "text",
                                    placeholder: "e.g. Blue Backpack, Camera",
                                    className: "w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs font-bold"
                                })
                            )
                        ),
                        e("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" },
                            e("div", null,
                                e("label", { className: "text-xs text-slate-800 font-extrabold block mb-1 uppercase tracking-wider" }, t.lastSeenLocation),
                                e("input", {
                                    required: true,
                                    name: "location",
                                    type: "text",
                                    placeholder: "e.g. Churchgate Station, Marine Drive",
                                    className: "w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs font-bold"
                                })
                            ),
                            e("div", null,
                                e("label", { className: "text-xs text-slate-800 font-extrabold block mb-1 uppercase tracking-wider" }, t.contactReturn),
                                e("input", {
                                    required: true,
                                    name: "contactInfo",
                                    type: "text",
                                    defaultValue: profile.contact,
                                    placeholder: "Phone or Hotel Room #",
                                    className: "w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs font-mono-data font-bold"
                                })
                            )
                        ),
                        e("div", { className: "flex gap-2.5 justify-end mt-3 pt-3 border-t border-slate-200" },
                            e("button", {
                                type: "button",
                                onClick: () => setIsFilingModalOpen(false),
                                className: "bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-bold"
                            }, t.cancel),
                            e("button", {
                                type: "submit",
                                className: "bg-[#0b192c] hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-black shadow-md uppercase tracking-wider"
                            }, t.submitClaim)
                        )
                    )
                )
            )
        );
    }



        function StaySafeSection({
        hideHeader = false,
        onBackToHome,
        initialSubTab = "sos",
        isSosActive,
        setIsSosActive,
        selectedCategory,
        setSelectedCategory,
        handleSosTrigger,
        handleCancelEmergency,
        playSirenSound,
        touristLatLong,
        setTouristLatLong,
        isUsingRealGps,
        setIsUsingRealGps,
        livePlaceName,
        profile,
        setProfile,
        lostReports,
        setLostReports,
        myLocalLostIds,
        setMyLocalLostIds,
        handleLostFoundSubmit,
        handleDismissMyReport,
        handleClearAllMyReports,
        isFilingLostModalOpen,
        setIsFilingLostModalOpen,
        broadcastAlerts,
        selectedLang
    }) {
        const [subTab, setSubTab] = useState(initialSubTab);
        const [copiedLink, setCopiedLink] = useState(false);
        const [emergencyFilter, setEmergencyFilter] = useState("hospital");
        const [isScanningGpsOutposts, setIsScanningGpsOutposts] = useState(false);

        // Auto-locate GPS coordinates when entering Emergency Services tab
        useEffect(() => {
            if (subTab === "emergency" && typeof navigator !== "undefined" && "geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        if (setTouristLatLong) setTouristLatLong({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                        if (setIsUsingRealGps) setIsUsingRealGps(true);
                    },
                    (err) => console.log("Using current GPS coordinates:", err.message),
                    { enableHighAccuracy: true, timeout: 6000 }
                );
            }
        }, [subTab]);

        const [communityReports, setCommunityReports] = useState([
            { id: 1, category: "High Tide Warning", location: "Apollo Bunder Pier", text: "Waves splashing over promenade wall after 18:00. Responders advising tourists to stay behind railing.", time: "10 mins ago" },
            { id: 2, category: "Heavy Traffic Corridor", location: "Colaba Causeway", text: "Slow vehicle movement near Regal Cinema junction. Walking corridor is clear and lit.", time: "25 mins ago" }
        ]);
        const [showReportModal, setShowReportModal] = useState(false);
        const [reportText, setReportText] = useState("");
        const [reportLoc, setReportLoc] = useState("");

        const handleShareLocation = () => {
            const trackingUrl = window.location.origin + "/?trackLat=" + (touristLatLong.lat || 18.9242) + "&trackLng=" + (touristLatLong.lng || 72.8310);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(trackingUrl).then(() => {
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 3000);
                });
            } else {
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 3000);
            }
        };

        const handleAddCommunityReport = (e) => {
            e.preventDefault();
            if (!reportText.trim()) return;
            const newRep = {
                id: Date.now(),
                category: "User Safety Notice",
                location: reportLoc || livePlaceName || "Current Location",
                text: reportText.trim(),
                time: "Just now"
            };
            setCommunityReports([newRep, ...communityReports]);
            setReportText("");
            setReportLoc("");
            setShowReportModal(false);
        };

        return e("div", { className: "flex flex-col gap-4 pb-6" },
            !hideHeader && e("div", { className: "flex items-center justify-between pt-2 pb-1 border-b border-slate-200" },
                onBackToHome ? e("button", {
                    onClick: onBackToHome,
                    className: "flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-xs active:scale-95 transition-all"
                }, "← Back") : e("span", { className: "w-8" }),
                e("h2", { className: "font-heading font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5" },
                    "🛡️ Stay Safe Command"
                ),
                e("span", { className: "w-8" })
            ),

            e("div", { className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1" },
                [
                    { id: "sos", label: "🚨 Smart SOS" },
                    { id: "route", label: "🗺️ Safe Route" },
                    { id: "location", label: "📍 Live Share" },
                    { id: "emergency", label: "🏥 Emergency Services" },
                    { id: "alerts", label: "📢 Community Alerts" },
                    { id: "lost", label: "🧳 Lost & Found" }
                ].map(item => e("button", {
                    key: item.id,
                    onClick: () => setSubTab(item.id),
                    className: "px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all " + (subTab === item.id ? "bg-rose-600 text-white shadow-xs" : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900")
                }, item.label))
            ),

            subTab === "sos" && e("div", { className: "flex flex-col gap-4" },
                isSosActive && e("div", { className: "p-4 rounded-3xl bg-rose-600 text-white shadow-xl flex flex-col gap-2.5 animate-pulse" },
                    e("div", { className: "flex items-center justify-between" },
                        e("span", { className: "text-xs font-mono-data font-black uppercase tracking-wider" }, "🚨 SOS EMERGENCY ACTIVE"),
                        e("span", { className: "text-[10px] bg-white/20 px-2 py-0.5 rounded-full" }, "Telemetry Transmitting")
                    ),
                    e("p", { className: "text-xs font-semibold" }, "Your live GPS coordinate is being shared with Police Patrol & EMS Units."),
                    e("p", { className: "text-xs font-mono-data" }, "Location: " + livePlaceName),
                    e("div", { className: "flex items-center gap-2 mt-1" },
                        e("a", {
                            href: "tel:112",
                            className: "flex-1 py-2 rounded-xl bg-white text-rose-700 font-bold text-xs text-center shadow-md"
                        }, "📞 CALL 112 DIRECT"),
                        e("button", {
                            onClick: handleCancelEmergency,
                            className: "flex-1 py-2 rounded-xl bg-rose-900/60 text-white font-bold text-xs text-center border border-white/20"
                        }, "Cancel SOS")
                    )
                ),

                e("div", { className: "flex flex-col gap-4 items-stretch" },
                    e("div", { className: "p-4 md:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between gap-3" },
                        e("h3", { className: "font-heading font-black text-xs text-slate-800 uppercase tracking-wider font-mono-data" },
                            "Select Distress Reason"
                        ),
                        e("div", { className: "grid grid-cols-2 gap-2 md:gap-3" },
                            [
                                { id: "Medical Emergency", icon: "🏥", desc: "Injury, Cardiac, Heat Stroke" },
                                { id: "Threat / Harassment", icon: "⚠️", desc: "Suspicious stalker, theft" },
                                { id: "Lost in Corridor", icon: "📍", desc: "Separated from group/guide" },
                                { id: "Accident / Vehicle", icon: "🚗", desc: "Road collision, breakdown" }
                            ].map(cat => e("button", {
                                key: cat.id,
                                type: "button",
                                onClick: () => setSelectedCategory(cat.id),
                                className: "p-2.5 md:p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all " + (selectedCategory === cat.id ? "bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500" : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800")
                            },
                                e("span", { className: "text-xl shrink-0" }, cat.icon),
                                e("div", null,
                                    e("p", { className: "text-xs font-heading font-black" }, cat.id),
                                    e("p", { className: "text-[10px] text-slate-500 leading-tight mt-0.5" }, cat.desc)
                                )
                            ))
                        )
                    ),

                    e("div", { className: "p-4 md:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col items-center justify-center gap-3.5 text-center" },
                        e("h3", { className: "font-heading font-black text-xs text-slate-800 uppercase tracking-wider font-mono-data text-center" },
                            "Slide for Emergency Dispatch"
                        ),
                        e(SlideToSosButton, {
                            onTrigger: handleSosTrigger,
                            selectedLang: selectedLang
                        }),
                        e("p", { className: "text-[11px] text-slate-400 text-center font-medium max-w-xs" },
                            "Slides trigger loud alert siren & transmits live GPS to Mumbai Police Net."
                        )
                    )
                )
            ),

            subTab === "route" && e("div", { className: "flex flex-col gap-3" },
                e("div", { className: "flex items-center justify-between px-1" },
                    e("h3", { className: "font-heading font-black text-xs text-slate-800 uppercase tracking-wider font-mono-data" },
                        "Green Safest Corridor Map"
                    ),
                    e("span", { className: "text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full" }, "● High Police Presence")
                ),
                e("div", { className: "h-[380px] md:h-[520px] lg:h-[600px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-sm" },
                    e(WorkingSafetyMap, {
                        touristLatLong: touristLatLong,
                        setTouristLatLong: setTouristLatLong,
                        isUsingRealGps: isUsingRealGps,
                        setIsUsingRealGps: setIsUsingRealGps
                    })
                ),
                e("div", { className: "p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between" },
                    e("span", null, "📍 Current Pin: " + livePlaceName),
                    e("button", {
                        onClick: () => {
                            if ("geolocation" in navigator) {
                                navigator.geolocation.getCurrentPosition((p) => {
                                    setTouristLatLong({ lat: p.coords.latitude, lng: p.coords.longitude });
                                    setIsUsingRealGps(true);
                                });
                            }
                        },
                        className: "font-bold text-rose-600 underline"
                    }, "Recenter GPS")
                )
            ),

            subTab === "location" && e("div", { className: "p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col gap-3.5" },
                e("h3", { className: "font-heading font-black text-xs text-slate-800 uppercase tracking-wider font-mono-data" },
                    "Share Real-Time Location"
                ),
                e("p", { className: "text-xs text-slate-600" },
                    "Share your encrypted live telemetry link with your family, friends or travel companions so they can monitor your safety in real-time."
                ),
                e("div", { className: "p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono-data text-slate-700 truncate" },
                    window.location.origin + "/?track=" + (profile.name || "Aarya")
                ),
                copiedLink && e("div", { className: "p-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold text-center" },
                    "✓ Link copied to clipboard!"
                ),
                e("div", { className: "grid grid-cols-2 gap-2 mt-1" },
                    e("button", {
                        onClick: handleShareLocation,
                        className: "py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all active:scale-95"
                    }, "📋 Copy Tracking Link"),
                    e("a", {
                        href: "https://api.whatsapp.com/send?text=" + encodeURIComponent("I am currently traveling with SAFORA safety app. View my live safe corridor telemetry here: " + window.location.href),
                        target: "_blank",
                        className: "py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center hover:bg-emerald-700 transition-all active:scale-95"
                    }, "💬 Share on WhatsApp")
                )
            ),

            subTab === "emergency" && (() => {
                const userLat = touristLatLong && touristLatLong.lat ? touristLatLong.lat : 19.0330;
                const userLng = touristLatLong && touristLatLong.lng ? touristLatLong.lng : 73.0180;

                const computedServices = MASTER_EMERGENCY_SERVICES.map(srv => {
                    const d = calculateDistanceKm(userLat, userLng, srv.lat, srv.lng);
                    return {
                        ...srv,
                        distKm: d,
                        distanceStr: formatDistance(d),
                        timeStr: estimateTravelTime(d)
                    };
                }).sort((a, b) => a.distKm - b.distKm);

                const hospCount = computedServices.filter(s => s.category === "hospital").length;
                const polCount = computedServices.filter(s => s.category === "police").length;
                const pharmCount = computedServices.filter(s => s.category === "pharmacy").length;

                const displayList = emergencyFilter === "all" 
                    ? computedServices 
                    : computedServices.filter(s => s.category === emergencyFilter);

                return e("div", { className: "flex flex-col gap-3.5" },
                    // Header & GPS Status Row
                    e("div", { className: "flex items-center justify-between px-1" },
                        e("div", null,
                            e("h3", { className: "font-heading font-black text-xs text-slate-900 uppercase tracking-wider font-mono-data" },
                                "Nearby Emergency Outposts"
                            ),
                            e("p", { className: "text-[11px] text-slate-500 font-medium mt-0.5" },
                                "Hospitals & critical care centers near your live location"
                            )
                        ),
                        e("span", { className: "inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0" },
                            e("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-ping" }),
                            isUsingRealGps ? "Live GPS Active" : "Corridor GPS"
                        )
                    ),

                    // Live Location Card with Refresh Button
                    e("div", { className: "p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3" },
                        e("div", { className: "flex items-center gap-2.5 min-w-0" },
                            e("div", { className: "w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 text-base font-bold shadow-xs border border-rose-100" }, "📍"),
                            e("div", { className: "min-w-0" },
                                e("p", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono-data" }, "Your Current Location"),
                                e("p", { className: "text-xs font-black text-slate-900 truncate" }, livePlaceName || `${userLat.toFixed(4)}° N, ${userLng.toFixed(4)}° E`)
                            )
                        ),
                        e("button", {
                            onClick: () => {
                                setIsScanningGpsOutposts(true);
                                if (typeof navigator !== "undefined" && "geolocation" in navigator) {
                                    navigator.geolocation.getCurrentPosition(
                                        (pos) => {
                                            if (setTouristLatLong) setTouristLatLong({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                                            if (setIsUsingRealGps) setIsUsingRealGps(true);
                                            setIsScanningGpsOutposts(false);
                                        },
                                        (err) => {
                                            console.warn("GPS lookup:", err);
                                            setIsScanningGpsOutposts(false);
                                        },
                                        { enableHighAccuracy: true, timeout: 8000 }
                                    );
                                } else {
                                    setIsScanningGpsOutposts(false);
                                }
                            },
                            disabled: isScanningGpsOutposts,
                            className: "px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-bold shrink-0 transition-all shadow-xs flex items-center gap-1"
                        },
                            isScanningGpsOutposts ? "Locating..." : "🔄 Refresh GPS"
                        )
                    ),

                    // Quick Action: Google Maps Hospitals Near Me
                    e("button", {
                        onClick: () => {
                            window.open(`https://www.google.com/maps/search/hospitals+near+me/@${userLat},${userLng},15z`, "_blank");
                        },
                        className: "w-full py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/80 text-rose-950 text-xs font-bold hover:border-rose-300 transition-all flex items-center justify-between shadow-xs active:scale-[0.99]"
                    },
                        e("span", { className: "flex items-center gap-2" },
                            e("span", { className: "text-sm" }, "🗺️"),
                            "Search All Hospitals Near Me on Google Maps"
                        ),
                        e("span", { className: "text-rose-600 font-black text-sm" }, "➔")
                    ),

                    // Category Filter Tabs (Hospitals default!)
                    e("div", { className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5" },
                        [
                            { id: "hospital", label: `🏥 Hospitals (${hospCount})` },
                            { id: "police", label: `🚨 Police (${polCount})` },
                            { id: "pharmacy", label: `💊 Pharmacies (${pharmCount})` },
                            { id: "all", label: `🌐 All (${computedServices.length})` }
                        ].map(f => e("button", {
                            key: f.id,
                            onClick: () => setEmergencyFilter(f.id),
                            className: "px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all " + (emergencyFilter === f.id ? "bg-rose-600 text-white shadow-xs" : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900")
                        }, f.label))
                    ),

                    // Emergency Services Cards List
                    e("div", { className: "flex flex-col gap-3.5" },
                        displayList.map((srv, idx) => e("div", {
                            key: idx,
                            className: "p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col gap-2.5 transition-all hover:border-slate-300"
                        },
                            e("div", { className: "flex items-start justify-between gap-2" },
                                e("div", { className: "flex-1 min-w-0" },
                                    e("h4", { className: "font-heading font-black text-sm text-slate-900 leading-tight" }, srv.name),
                                    e("div", { className: "flex items-center gap-1.5 mt-1 flex-wrap" },
                                        e("span", { className: "text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200" }, srv.type),
                                        srv.area && e("span", { className: "text-[10px] text-slate-500 font-medium" }, "• " + srv.area)
                                    )
                                ),
                                e("div", { className: "text-right shrink-0" },
                                    e("span", { className: "text-xs font-black text-rose-600 font-mono-data block" }, srv.distanceStr),
                                    e("span", { className: "text-[10px] text-slate-400 block mt-0.5" }, srv.timeStr)
                                )
                            ),

                            srv.specialty && e("div", { className: "text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100 flex items-center gap-1" },
                                e("span", { className: "text-rose-500 font-bold" }, "✚"),
                                e("span", { className: "font-medium" }, srv.specialty)
                            ),

                            e("div", { className: "flex items-center justify-between text-xs text-slate-500 px-0.5" },
                                e("span", { className: "text-emerald-700 font-bold text-[11px] flex items-center gap-1.5" },
                                    e("span", { className: "w-2 h-2 rounded-full bg-emerald-500 inline-block" }),
                                    srv.status
                                )
                            ),

                            e("div", { className: "flex items-center gap-2 pt-2 border-t border-slate-100 mt-auto" },
                                e("a", {
                                    href: "tel:" + srv.phone.split('/')[0].trim().replace(/[^0-9+]/g, ''),
                                    className: "flex-1 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs text-center hover:bg-rose-700 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1"
                                }, "📞 Call " + srv.phone.split('/')[0].trim()),
                                e("button", {
                                    onClick: () => {
                                        const dest = srv.lat && srv.lng ? `${srv.lat},${srv.lng}` : encodeURIComponent(srv.name + " " + (srv.area || ""));
                                        window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${dest}&travelmode=driving`, "_blank");
                                    },
                                    className: "flex-1 py-2 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center gap-1"
                                }, "Navigate ➔")
                            )
                        ))
                    )
                );
            })(),

            subTab === "alerts" && e("div", { className: "flex flex-col gap-3" },
                e("div", { className: "flex items-center justify-between px-1" },
                    e("h3", { className: "font-heading font-black text-xs text-slate-800 uppercase tracking-wider font-mono-data" },
                        "Community Hazard Feed"
                    ),
                    e("button", {
                        onClick: () => setShowReportModal(true),
                        className: "px-2.5 py-1 rounded-xl bg-rose-600 text-white font-bold text-[11px] shadow-xs"
                    }, "📢 Report Area")
                ),
                communityReports.map(rep => e("div", {
                    key: rep.id,
                    className: "p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-1.5"
                },
                    e("div", { className: "flex items-center justify-between" },
                        e("h4", { className: "font-heading font-black text-xs text-slate-900" }, rep.category),
                        e("span", { className: "text-[10px] text-slate-400 font-mono-data" }, rep.time)
                    ),
                    e("p", { className: "text-[11px] font-semibold text-slate-500" }, "📍 " + rep.location),
                    e("p", { className: "text-xs text-slate-700 mt-0.5" }, rep.text)
                )),

                showReportModal && e("div", { className: "fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" },
                    e("div", { className: "bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3" },
                        e("h3", { className: "font-heading font-black text-sm text-slate-900" }, "Report Unsafe Area / Hazard"),
                        e("form", { onSubmit: handleAddCommunityReport, className: "flex flex-col gap-2.5 text-xs" },
                            e("input", {
                                type: "text",
                                required: true,
                                value: reportLoc,
                                onChange: (e) => setReportLoc(e.target.value),
                                placeholder: "Location (e.g. Near Gateway Pier)",
                                className: "w-full p-2.5 rounded-xl border border-slate-200"
                            }),
                            e("textarea", {
                                required: true,
                                value: reportText,
                                onChange: (e) => setReportText(e.target.value),
                                placeholder: "Describe the hazard or safety concern...",
                                rows: 3,
                                className: "w-full p-2.5 rounded-xl border border-slate-200"
                            }),
                            e("div", { className: "flex items-center justify-end gap-2 mt-1" },
                                e("button", { type: "button", onClick: () => setShowReportModal(false), className: "px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold" }, "Cancel"),
                                e("button", { type: "submit", className: "px-4 py-1.5 rounded-xl bg-rose-600 text-white font-bold" }, "Submit Alert")
                            )
                        )
                    )
                )
            ),

            subTab === "lost" && e(ReferenceLostSection, {
                profile: profile,
                lostReports: lostReports,
                setLostReports: setLostReports,
                myLocalLostIds: myLocalLostIds,
                setMyLocalLostIds: setMyLocalLostIds,
                handleLostFoundSubmit: handleLostFoundSubmit,
                handleDismissMyReport: handleDismissMyReport,
                handleClearAllMyReports: handleClearAllMyReports,
                isFilingModalOpen: isFilingLostModalOpen,
                setIsFilingModalOpen: setIsFilingLostModalOpen,
                selectedLang: selectedLang
            })
        );
    }


    function SupportSection({ onBackToHome, initialSubTab = "hotels", userProfile }) {
        const [subTab, setSubTab] = useState(initialSubTab);
        const [complaintCategory, setComplaintCategory] = useState("Hotel / Accommodation");
        const [vendorName, setVendorName] = useState("");
        const [complaintLocation, setComplaintLocation] = useState("");
        const [complaintDetails, setComplaintDetails] = useState("");
        const [hasPhoto, setHasPhoto] = useState(false);
        const [filedComplaints, setFiledComplaints] = useState([
            { id: "GRV-2026-8192", category: "Taxi Overcharging", vendor: "MH-01-BK-4091", status: "Forwarded to RTO & Police", date: "15 Sep 2026" }
        ]);
        const [successTicket, setSuccessTicket] = useState(null);

        const handleComplaintSubmit = (e) => {
            e.preventDefault();
            const ticketId = "GRV-2026-" + Math.floor(1000 + Math.random() * 9000);
            const newTicket = {
                id: ticketId,
                category: complaintCategory,
                vendor: vendorName || "Unspecified Vendor",
                location: complaintLocation,
                details: complaintDetails,
                status: "Received • Dispatched to Tourism Grievance Cell",
                date: new Date().toLocaleDateString()
            };
            setFiledComplaints([newTicket, ...filedComplaints]);
            setSuccessTicket(newTicket);
            setVendorName("");
            setComplaintLocation("");
            setComplaintDetails("");
            setHasPhoto(false);
        };

        return e("div", { className: "flex flex-col gap-4 pb-6" },
            // Header Bar (small < back button + centered "Support")
            e("div", { className: "flex items-center justify-between pt-2 pb-1 border-b border-slate-200 min-h-[40px]" },
                e("button", {
                    onClick: onBackToHome,
                    className: "w-8 h-8 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-50 font-bold active:scale-95 transition-all shrink-0",
                    title: "Back to Home"
                },
                    e("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5 },
                        e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" })
                    )
                ),
                e("h2", { className: "font-heading font-black text-xl text-slate-900 tracking-tight text-center flex-1" },
                    "Support"
                ),
                e("div", { className: "w-8 shrink-0" })
            ),

            e("div", { className: "flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1" },
                [
                    { id: "hotels", label: "🏨 Verified Hotels" },
                    { id: "scams", label: "⚠️ Scam Alerts" },
                    { id: "complaint", label: "📝 Complaint Portal" }
                ].map(item => e("button", {
                    key: item.id,
                    onClick: () => setSubTab(item.id),
                    className: "px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all " + (subTab === item.id ? "bg-indigo-600 text-white shadow-xs" : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900")
                }, item.label))
            ),

            subTab === "hotels" && e("div", { className: "flex flex-col gap-3" },
                e("h3", { className: "font-heading font-black text-xs text-slate-800 uppercase tracking-wider font-mono-data px-1" },
                    "Accredited Safe Stays"
                ),
                e("div", { className: "flex flex-col gap-3.5" },
                    VERIFIED_HOTELS_DATA.map((h, idx) => e("div", {
                        key: idx,
                        className: "p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col gap-2"
                    },
                        e("div", { className: "flex items-start justify-between" },
                            e("div", null,
                                e("h4", { className: "font-heading font-black text-sm text-slate-900" }, h.name),
                                e("p", { className: "text-[11px] font-semibold text-slate-500" }, "📍 " + h.city)
                            ),
                            e("div", { className: "text-right" },
                                e("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono-data" },
                                    "🛡️ " + h.safetyScore + "/10"
                                ),
                                e("p", { className: "text-[10px] text-slate-400 mt-0.5" }, h.priceRange)
                            )
                        ),
                        e("div", { className: "flex flex-wrap gap-1 mt-1" },
                            h.features.map((feat, fIdx) => e("span", {
                                key: fIdx,
                                className: "text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700"
                            }, "✓ " + feat))
                        ),
                        e("div", { className: "flex items-center justify-between pt-2 border-t border-slate-100 mt-auto text-xs" },
                            e("span", { className: "text-slate-500 text-[11px] truncate max-w-[200px]" }, h.address),
                            e("a", {
                                href: "tel:" + h.phone,
                                className: "px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-xs shrink-0"
                            }, "📞 Contact Hotel")
                        )
                    ))
                )
            ),

            subTab === "scams" && e("div", { className: "flex flex-col gap-3" },
                e("h3", { className: "font-heading font-black text-xs text-slate-800 uppercase tracking-wider font-mono-data px-1" },
                    "Active Tourist Scam Warnings"
                ),
                e("div", { className: "flex flex-col gap-3.5" },
                    SCAM_ALERTS_DATA.map((scam, idx) => e("div", {
                        key: idx,
                        className: "p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col gap-2"
                    },
                        e("div", { className: "flex items-center justify-between" },
                            e("h4", { className: "font-heading font-black text-xs text-slate-900" }, scam.title),
                            e("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-mono-data" },
                                "Severity: " + scam.severity
                            )
                        ),
                        e("p", { className: "text-[11px] font-semibold text-slate-500" }, "📍 Common in: " + scam.locations),
                        e("p", { className: "text-xs text-slate-700" }, scam.description),
                        e("div", { className: "p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-col gap-0.5" },
                            e("b", null, "💡 How to protect yourself:"),
                            e("span", null, scam.preventionTip)
                        ),
                        e("div", { className: "text-[10.5px] font-bold text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100 mt-auto" },
                            e("span", null, "Official Assistance:"),
                            e("span", { className: "text-rose-600 font-mono-data" }, scam.helpline)
                        )
                    ))
                )
            ),

            subTab === "complaint" && e("div", { className: "flex flex-col gap-4" },
                successTicket && e("div", { className: "p-4 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col gap-2 shadow-xs" },
                    e("div", { className: "flex items-center justify-between" },
                        e("h4", { className: "font-heading font-black text-sm" }, "Official Grievance Registered"),
                        e("button", { onClick: () => setSuccessTicket(null), className: "font-bold text-emerald-700" }, "✕")
                    ),
                    e("p", { className: "text-xs font-mono-data font-bold" }, "Ticket ID: " + successTicket.id),
                    e("p", { className: "text-xs" }, "Your grievance against " + successTicket.vendor + " (" + successTicket.category + ") has been securely routed to the Ministry of Tourism & Local Police Grievance Cell.")
                ),

                e("div", { className: "p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col gap-3" },
                    e("h3", { className: "font-heading font-black text-xs text-slate-800 uppercase tracking-wider font-mono-data" },
                        "File Official Tourist Complaint"
                    ),
                    e("form", { onSubmit: handleComplaintSubmit, className: "flex flex-col gap-3 text-xs" },
                        e("div", null,
                            e("label", { className: "font-bold text-slate-600 block mb-1" }, "Incident Category *"),
                            e("select", {
                                value: complaintCategory,
                                onChange: (e) => setComplaintCategory(e.target.value),
                                className: "w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-800"
                            },
                                ["Hotel / Accommodation", "Taxi / Cab Driver", "Tour Guide", "Shop / Vendor", "Overcharging / Bill Scam", "Other"].map(cat => e("option", { key: cat, value: cat }, cat))
                            )
                        ),
                        e("div", null,
                            e("label", { className: "font-bold text-slate-600 block mb-1" }, "Vendor / Driver / Hotel Name *"),
                            e("input", {
                                type: "text",
                                required: true,
                                value: vendorName,
                                onChange: (e) => setVendorName(e.target.value),
                                placeholder: "e.g. Yellow Cab MH-01-4402 or Hotel Sea View",
                                className: "w-full p-2.5 rounded-xl border border-slate-200"
                            })
                        ),
                        e("div", null,
                            e("label", { className: "font-bold text-slate-600 block mb-1" }, "Incident Location *"),
                            e("input", {
                                type: "text",
                                required: true,
                                value: complaintLocation,
                                onChange: (e) => setComplaintLocation(e.target.value),
                                placeholder: "e.g. Gateway of India Pier or Airport Terminal 2",
                                className: "w-full p-2.5 rounded-xl border border-slate-200"
                            })
                        ),
                        e("div", null,
                            e("label", { className: "font-bold text-slate-600 block mb-1" }, "Detailed Complaint *"),
                            e("textarea", {
                                required: true,
                                rows: 3,
                                value: complaintDetails,
                                onChange: (e) => setComplaintDetails(e.target.value),
                                placeholder: "Explain what happened in detail...",
                                className: "w-full p-2.5 rounded-xl border border-slate-200"
                            })
                        ),
                        e("div", { className: "flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200" },
                            e("span", { className: "font-semibold text-slate-600" }, hasPhoto ? "📸 Photo Attached: evidence.jpg" : "📷 Attach Bill / Photo Evidence:"),
                            e("button", {
                                type: "button",
                                onClick: () => setHasPhoto(!hasPhoto),
                                className: "px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold text-[10px]"
                            }, hasPhoto ? "Remove Photo" : "Attach File")
                        ),
                        e("button", {
                            type: "submit",
                            className: "w-full mt-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-heading font-black text-xs uppercase tracking-wider shadow-md shadow-indigo-600/20 active:scale-98 transition-all"
                        }, "Submit Official Complaint ➔")
                    )
                ),

                e("div", { className: "flex flex-col gap-2" },
                    e("h4", { className: "font-heading font-black text-xs text-slate-800 uppercase tracking-wider font-mono-data px-1" },
                        "Your Filed Grievance Tickets"
                    ),
                    filedComplaints.map(t => e("div", {
                        key: t.id,
                        className: "p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between"
                    },
                        e("div", null,
                            e("p", { className: "text-xs font-heading font-black text-slate-900" }, t.id + " • " + t.category),
                            e("p", { className: "text-[11px] text-slate-500" }, t.vendor + " • " + (t.date || "Active"))
                        ),
                        e("span", { className: "text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200" },
                            t.status.split('•')[0]
                        )
                    ))
                )
            )
        );
    }


    // =========================================================================
    // =========================================================================
    // PROFILE COMPONENT (PACKED, ARRANGED & MATCHING SAFORA APP UI)
    // =========================================================================
    function ProfileSection({
        userProfile = {},
        setProfile,
        onBackToHome,
        savedTrips = [],
        setSavedTrips,
        onLogout,
        onReplayWelcome,
        selectedLang = "English",
        setSelectedLang,
        onNavigateToPlan,
        onViewingPlansChange,
        onModalStateChange
    }) {
        const [isEditing, setIsEditing] = useState(false);
        const [viewingPlansPage, setViewingPlansPage] = useState(false);
        const [saveToast, setSaveToast] = useState(null);
        const [activeModal, _setActiveModal] = useState(null); // 'security' | 'qr' | 'notifications' | 'avatar' | null

        const setActiveModal = (modal) => {
            _setActiveModal(modal);
            if (onModalStateChange) onModalStateChange(!!modal);
        };

        const handleOpenPlans = () => {
            setViewingPlansPage(true);
            if (onViewingPlansChange) onViewingPlansChange(true);
        };

        const handleClosePlans = () => {
            setViewingPlansPage(false);
            if (onViewingPlansChange) onViewingPlansChange(false);
        };

        // Comprehensive editable form states initialized from userProfile (NO fake email)
        const [formData, setFormData] = useState({
            name: userProfile.name || "Aarya Sharma",
            email: userProfile.email || "",
            avatar: userProfile.avatar || (typeof APP_AVATAR_PRESETS !== "undefined" ? APP_AVATAR_PRESETS[0].src : "images/avatars/avatar_1.webp"),
            contact: userProfile.contact || "+91 98765 43210",
            gender: userProfile.gender || "Female",
            nationality: userProfile.nationality || "India",
            homeCity: userProfile.homeCity || "Navi Mumbai, Maharashtra",
            hotel: userProfile.hotel || "Taj Mahal Palace, Colaba",
            passportNumber: userProfile.passportNumber || "IN-84712093",
            emergencyContact: userProfile.emergencyContact || "+91 91234 56789",
            emergencyName: userProfile.emergencyName || "Rajesh Sharma (Father)",
            bloodGroup: userProfile.bloodGroup || "O+ Positive",
            medicalNotes: userProfile.medicalNotes || "No known allergies • Fully Vaccinated"
        });

        // Sync with incoming userProfile changes if not currently editing
        useEffect(() => {
            if (!isEditing && userProfile) {
                setFormData(prev => ({
                    ...prev,
                    name: userProfile.name || "Aarya Sharma",
                    email: userProfile.email || "",
                    avatar: userProfile.avatar || prev.avatar || (typeof APP_AVATAR_PRESETS !== "undefined" ? APP_AVATAR_PRESETS[0].src : "images/avatars/avatar_1.webp"),
                    contact: userProfile.contact || "+91 98765 43210",
                    gender: userProfile.gender || "Female",
                    nationality: userProfile.nationality || "India",
                    homeCity: userProfile.homeCity || "Navi Mumbai, Maharashtra",
                    hotel: userProfile.hotel || "Taj Mahal Palace, Colaba",
                    passportNumber: userProfile.passportNumber || "IN-84712093",
                    emergencyContact: userProfile.emergencyContact || "+91 91234 56789",
                    emergencyName: userProfile.emergencyName || "Rajesh Sharma (Father)",
                    bloodGroup: userProfile.bloodGroup || "O+ Positive",
                    medicalNotes: userProfile.medicalNotes || "No known allergies • Fully Vaccinated"
                }));
            }
        }, [userProfile, isEditing]);

        const handleSelectAvatar = (avatarSrc, newGender = null) => {
            const updatedProfile = {
                ...userProfile,
                ...formData,
                avatar: avatarSrc,
                ...(newGender ? { gender: newGender } : {}),
                isVerified: true
            };
            setFormData(prev => ({
                ...prev,
                avatar: avatarSrc,
                ...(newGender ? { gender: newGender } : {})
            }));
            if (setProfile) {
                setProfile(updatedProfile);
            }
            try {
                localStorage.setItem("safora_user_profile_v3", JSON.stringify(updatedProfile));
            } catch (err) {
                console.warn("Storage sync:", err);
            }
            setActiveModal(null);
            setSaveToast("✓ Avatar updated successfully!");
            setTimeout(() => setSaveToast(null), 3000);
        };

        const handleInputChange = (field, value) => {
            setFormData(prev => {
                const next = { ...prev, [field]: value };
                if (field === "gender") {
                    next.avatar = getDefaultAvatarForGender(value);
                }
                return next;
            });
        };

        const handleSaveProfile = (e) => {
            if (e && e.preventDefault) e.preventDefault();
            const updatedProfile = {
                ...userProfile,
                ...formData,
                isVerified: true
            };
            if (setProfile) {
                setProfile(updatedProfile);
            }
            try {
                localStorage.setItem("safora_user_profile_v3", JSON.stringify(updatedProfile));
            } catch (err) {
                console.warn("Storage sync:", err);
            }
            setIsEditing(false);
            setSaveToast("✓ Profile information saved successfully!");
            setTimeout(() => setSaveToast(null), 3000);
        };

        const handleCancelEdit = () => {
            setFormData({
                name: userProfile.name || "Aarya Sharma",
                email: userProfile.email || "",
                avatar: userProfile.avatar || (typeof APP_AVATAR_PRESETS !== "undefined" ? APP_AVATAR_PRESETS[0].src : "images/avatars/avatar_1.webp"),
                contact: userProfile.contact || "+91 98765 43210",
                gender: userProfile.gender || "Female",
                nationality: userProfile.nationality || "India",
                homeCity: userProfile.homeCity || "Navi Mumbai, Maharashtra",
                hotel: userProfile.hotel || "Taj Mahal Palace, Colaba",
                passportNumber: userProfile.passportNumber || "IN-84712093",
                emergencyContact: userProfile.emergencyContact || "+91 91234 56789",
                emergencyName: userProfile.emergencyName || "Rajesh Sharma (Father)",
                bloodGroup: userProfile.bloodGroup || "O+ Positive",
                medicalNotes: userProfile.medicalNotes || "No known allergies • Fully Vaccinated"
            });
            setIsEditing(false);
        };

        // SVG Chevron Right Helper
        const renderChevron = () => e("svg", {
            className: "w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2.2
        },
            e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5l7 7-7 7" })
        );

        return e("div", { className: "flex flex-col gap-4 pb-12 select-none" },
            // Top Navigation Bar (small < back button + centered title, matching Support section)
            e("div", { className: "flex items-center justify-between pt-2 pb-1 border-b border-slate-200 min-h-[40px]" },
                e("button", {
                    onClick: viewingPlansPage ? handleClosePlans : (isEditing ? handleCancelEdit : onBackToHome),
                    className: "w-8 h-8 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-50 font-bold active:scale-95 transition-all shrink-0",
                    title: viewingPlansPage ? "Back to Profile" : (isEditing ? "Cancel" : "Back to Home")
                },
                    e("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5 },
                        e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" })
                    )
                ),

                e("h2", { className: "font-heading font-black text-xl text-slate-900 tracking-tight text-center flex-1" },
                    isEditing ? "Edit Profile" : (viewingPlansPage ? "Travel Plans" : "Profile")
                ),

                e("div", { className: "w-8 shrink-0" })
            ),

            // Toast Alert
            saveToast && e("div", { className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in shadow-xs" },
                e("span", null, "✓"),
                e("span", null, saveToast)
            ),

            // =========================================================================
            // 1. DEDICATED FULL PAGE: MY TRAVEL PLANS (NOT A POPUP)
            // =========================================================================
            viewingPlansPage ? e("div", { className: "flex flex-col gap-4 animate-in fade-in duration-150" },
                // Top Banner with "Plan a New Trip" CTA
                e("div", { className: "p-4 rounded-3xl bg-slate-900 text-white shadow-md border border-white/10 flex items-center justify-between" },
                    e("div", { className: "flex flex-col gap-1" },
                        e("span", { className: "text-[10px] font-mono-data uppercase text-emerald-400 font-bold" },
                            `AI Travel Companion • ${savedTrips ? savedTrips.length : 0} Saved`
                        ),
                        e("h3", { className: "font-heading font-black text-sm text-white" }, "Smart Itinerary Engine"),
                        e("p", { className: "text-[11px] text-slate-300" }, "Personalized schedules, daily budgets & safety")
                    ),
                    e("button", {
                        onClick: () => {
                            if (onNavigateToPlan) onNavigateToPlan();
                        },
                        className: "py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-black text-xs shadow-md transition-all active:scale-95 shrink-0"
                    }, "+ Plan Trip")
                ),

                // Saved Itineraries List
                (!savedTrips || savedTrips.length === 0) ? (
                    e("div", { className: "p-8 text-center rounded-3xl bg-white border border-slate-200 text-xs text-slate-500 shadow-sm my-2 flex flex-col items-center gap-3" },
                        e("span", { className: "text-4xl block" }, "🗺️"),
                        e("p", { className: "font-heading font-black text-sm text-slate-900" }, "No Saved Plans Yet"),
                        e("p", { className: "text-slate-400 max-w-xs" }, "Generate custom travel itineraries with AI or save places from Explore."),
                        e("button", {
                            onClick: () => { if (onNavigateToPlan) onNavigateToPlan(); },
                            className: "mt-1 py-2.5 px-5 rounded-2xl bg-slate-950 text-white font-bold text-xs shadow-sm hover:bg-slate-800 transition-all"
                        }, "Create Your First Trip")
                    )
                ) : (
                    e("div", { className: "flex flex-col gap-3" },
                        savedTrips.map(trip => e("div", {
                            key: trip.id,
                            className: "p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col gap-2.5"
                        },
                            e("div", { className: "flex items-start justify-between" },
                                e("div", null,
                                    e("h4", { className: "font-heading font-black text-sm text-slate-950" },
                                        trip.title || (`${trip.destination} (${trip.days} Days)`)
                                    ),
                                    e("p", { className: "text-[11px] text-slate-400 mt-0.5" },
                                        `Created: ${trip.createdAt || trip.created || "Saved Itinerary"}`
                                    )
                                ),
                                e("span", { className: "text-[11px] font-mono-data font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0" },
                                    trip.budget || trip.budgetTier || "Planned"
                                )
                            ),
                            trip.itinerary && trip.itinerary.length > 0 && e("div", { className: "mt-1 pt-2 border-t border-slate-100 flex flex-col gap-1.5" },
                                e("p", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono-data" }, "Daily Schedule Highlights"),
                                trip.itinerary.map((item, idx) => e("div", { key: idx, className: "p-2 rounded-xl bg-slate-50 text-[11px] text-slate-700 flex items-center gap-2" },
                                    e("span", { className: "font-bold text-slate-900 shrink-0 font-mono-data" }, `Day ${item.day || (idx + 1)}:`),
                                    e("span", { className: "truncate" }, item.title || item.name || item)
                                ))
                            )
                        ))
                    )
                )
            ) :

            // =========================================================================
            // 2. EDIT MODE: COMPLETE EDITABLE FORM
            // =========================================================================
            isEditing ? e("form", { onSubmit: handleSaveProfile, className: "flex flex-col gap-4 animate-in fade-in duration-150" },
                // Avatar Edit Header
                e("div", { className: "flex flex-col items-center justify-center py-2" },
                    e("div", {
                        onClick: () => setActiveModal("avatar"),
                        className: "relative group cursor-pointer active:scale-95 transition-transform"
                    },
                        e("div", {
                            className: "w-24 h-24 rounded-full border-4 border-white shadow-lg bg-indigo-50 flex items-center justify-center overflow-hidden transition-all group-hover:ring-4 group-hover:ring-indigo-400/30"
                        },
                            (formData.avatar && (formData.avatar.startsWith("data:") || formData.avatar.startsWith("images/") || formData.avatar.startsWith("http"))) ?
                                e("img", {
                                    src: formData.avatar,
                                    alt: formData.name || "Profile Avatar",
                                    className: "w-full h-full object-cover select-none pointer-events-none"
                                }) :
                                e("span", {
                                    className: "text-4xl select-none leading-none"
                                }, formData.avatar || (formData.name ? formData.name.charAt(0).toUpperCase() : "A"))
                        ),
                        e("button", {
                            type: "button",
                            onClick: (ev) => {
                                ev.stopPropagation();
                                setActiveModal("avatar");
                            },
                            className: "absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#5046e5] text-white flex items-center justify-center shadow-md border-2 border-white hover:bg-indigo-600 active:scale-90 transition-all",
                            title: "Change Avatar"
                        },
                            e("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.2 },
                                e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" })
                            )
                        )
                    ),
                    e("button", {
                        type: "button",
                        onClick: () => setActiveModal("avatar"),
                        className: "text-[11px] font-bold text-[#5046e5] hover:underline mt-2 flex items-center gap-1"
                    }, "Change Profile Avatar")
                ),

                // Section A: Personal Details
                e("div", { className: "p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col gap-3" },
                    e("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2" },
                        e("h3", { className: "font-heading font-black text-xs text-slate-950 uppercase tracking-wider flex items-center gap-1.5" },
                            e("span", null, "👤"),
                            e("span", null, "Personal Information")
                        ),
                        e("span", { className: "text-[10px] text-slate-400 font-bold uppercase" }, "Editing")
                    ),
                    // Full Name
                    e("div", { className: "flex flex-col gap-1" },
                        e("label", { className: "text-[11px] font-bold text-slate-700" }, "Full Name"),
                        e("input", {
                            type: "text",
                            value: formData.name,
                            onChange: (e) => handleInputChange("name", e.target.value),
                            placeholder: "e.g. Aarya Sharma",
                            className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 text-xs font-semibold text-slate-900 outline-none"
                        })
                    ),
                    // Email & Phone
                    e("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5" },
                        e("div", { className: "flex flex-col gap-1" },
                            e("label", { className: "text-[11px] font-bold text-slate-700" }, "Email Address (Optional)"),
                            e("input", {
                                type: "email",
                                value: formData.email,
                                onChange: (e) => handleInputChange("email", e.target.value),
                                placeholder: "Enter your email address",
                                className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 text-xs font-semibold text-slate-900 outline-none"
                            })
                        ),
                        e("div", { className: "flex flex-col gap-1" },
                            e("label", { className: "text-[11px] font-bold text-slate-700" }, "Primary Phone"),
                            e("input", {
                                type: "tel",
                                value: formData.contact,
                                onChange: (e) => handleInputChange("contact", e.target.value),
                                placeholder: "+91 98765 43210",
                                className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 text-xs font-semibold text-slate-900 outline-none font-mono-data"
                            })
                        )
                    ),
                    // Gender & Nationality
                    e("div", { className: "grid grid-cols-2 gap-2.5" },
                        e("div", { className: "flex flex-col gap-1" },
                            e("label", { className: "text-[11px] font-bold text-slate-700" }, "Gender"),
                            e("select", {
                                value: formData.gender,
                                onChange: (e) => handleInputChange("gender", e.target.value),
                                className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 text-xs font-semibold text-slate-900 outline-none bg-white"
                            },
                                e("option", { value: "Female" }, "Female"),
                                e("option", { value: "Male" }, "Male"),
                                e("option", { value: "Other" }, "Other")
                            )
                        ),
                        e("div", { className: "flex flex-col gap-1" },
                            e("label", { className: "text-[11px] font-bold text-slate-700" }, "Nationality"),
                            e("input", {
                                type: "text",
                                value: formData.nationality,
                                onChange: (e) => handleInputChange("nationality", e.target.value),
                                placeholder: "India",
                                className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 text-xs font-semibold text-slate-900 outline-none"
                            })
                        )
                    ),
                    // Hotel & Home Origin
                    e("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5" },
                        e("div", { className: "flex flex-col gap-1" },
                            e("label", { className: "text-[11px] font-bold text-slate-700" }, "Home City / Origin"),
                            e("input", {
                                type: "text",
                                value: formData.homeCity,
                                onChange: (e) => handleInputChange("homeCity", e.target.value),
                                placeholder: "Navi Mumbai, Maharashtra",
                                className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 text-xs font-semibold text-slate-900 outline-none"
                            })
                        ),
                        e("div", { className: "flex flex-col gap-1" },
                            e("label", { className: "text-[11px] font-bold text-slate-700" }, "Current Hotel / Staying At"),
                            e("input", {
                                type: "text",
                                value: formData.hotel,
                                onChange: (e) => handleInputChange("hotel", e.target.value),
                                placeholder: "Taj Mahal Palace, Colaba",
                                className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 text-xs font-semibold text-slate-900 outline-none"
                            })
                        )
                    ),
                    // Passport
                    e("div", { className: "flex flex-col gap-1" },
                        e("label", { className: "text-[11px] font-bold text-slate-700" }, "Govt Tourist Pass ID / Passport"),
                        e("input", {
                            type: "text",
                            value: formData.passportNumber,
                            onChange: (e) => handleInputChange("passportNumber", e.target.value),
                            placeholder: "IN-84712093",
                            className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 text-xs font-semibold text-slate-900 outline-none font-mono-data uppercase"
                        })
                    )
                ),

                // Section B: Emergency & Medical Support
                e("div", { className: "p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col gap-3" },
                    e("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2" },
                        e("h3", { className: "font-heading font-black text-xs text-slate-950 uppercase tracking-wider flex items-center gap-1.5" },
                            e("span", null, "🚑"),
                            e("span", null, "Emergency & Medical Contacts")
                        ),
                        e("span", { className: "text-[10px] text-rose-600 font-bold uppercase" }, "SOS Critical")
                    ),
                    e("div", { className: "flex flex-col gap-1" },
                        e("label", { className: "text-[11px] font-bold text-slate-700" }, "Emergency Contact Name"),
                        e("input", {
                            type: "text",
                            value: formData.emergencyName,
                            onChange: (e) => handleInputChange("emergencyName", e.target.value),
                            placeholder: "Rajesh Sharma (Father)",
                            className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 text-xs font-semibold text-slate-900 outline-none"
                        })
                    ),
                    e("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5" },
                        e("div", { className: "flex flex-col gap-1" },
                            e("label", { className: "text-[11px] font-bold text-slate-700" }, "Emergency Phone"),
                            e("input", {
                                type: "tel",
                                value: formData.emergencyContact,
                                onChange: (e) => handleInputChange("emergencyContact", e.target.value),
                                placeholder: "+91 91234 56789",
                                className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 text-xs font-semibold text-slate-900 outline-none font-mono-data"
                            })
                        ),
                        e("div", { className: "flex flex-col gap-1" },
                            e("label", { className: "text-[11px] font-bold text-slate-700" }, "Blood Group"),
                            e("select", {
                                value: formData.bloodGroup,
                                onChange: (e) => handleInputChange("bloodGroup", e.target.value),
                                className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 text-xs font-semibold text-slate-900 outline-none bg-white font-mono-data"
                            },
                                ["O+ Positive", "O- Negative", "A+ Positive", "A- Negative", "B+ Positive", "B- Negative", "AB+ Positive", "AB- Negative", "Unknown"].map(bg =>
                                    e("option", { key: bg, value: bg }, bg)
                                )
                            )
                        )
                    ),
                    e("div", { className: "flex flex-col gap-1" },
                        e("label", { className: "text-[11px] font-bold text-slate-700" }, "Medical Notes / Allergies"),
                        e("input", {
                            type: "text",
                            value: formData.medicalNotes,
                            onChange: (e) => handleInputChange("medicalNotes", e.target.value),
                            placeholder: "No known allergies • Fully Vaccinated",
                            className: "p-2.5 rounded-xl border border-slate-200 focus:border-slate-950 text-xs font-semibold text-slate-900 outline-none"
                        })
                    )
                ),

                // Save / Cancel Action Bar
                e("div", { className: "flex items-center gap-2 pt-1" },
                    e("button", {
                        type: "button",
                        onClick: handleCancelEdit,
                        className: "w-1/3 py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors text-center"
                    }, "Cancel"),
                    e("button", {
                        type: "submit",
                        className: "w-2/3 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-heading font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    },
                        e("span", null, "✓"),
                        e("span", null, "Save Profile Changes")
                    )
                )
            ) :

            // =========================================================================
            // 3. VIEW MODE: PACKED & ARRANGED (NO CURRENCY/DARK MODE, NO PENCIL, MATCHING APP UI)
            // =========================================================================
            e("div", { className: "flex flex-col gap-4" },

                // -------------------------------------------------------------
                // CENTERED CIRCULAR AVATAR + PENCIL BADGE + USER NAME ONLY
                // (MATCHING USER REFERENCE DESIGN: NO EMAIL / GMAIL, JUST NAME)
                // -------------------------------------------------------------
                e("div", { className: "flex flex-col items-center justify-center pt-2 pb-2" },
                    // Circular Avatar Container with Floating Edit Pencil Badge
                    e("div", {
                        onClick: () => setActiveModal("avatar"),
                        className: "relative group cursor-pointer active:scale-95 transition-transform"
                    },
                        e("div", {
                            className: "w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl shadow-slate-200/80 bg-gradient-to-tr from-slate-100 to-indigo-50 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:ring-4 group-hover:ring-indigo-400/30"
                        },
                            (formData.avatar && (formData.avatar.startsWith("data:") || formData.avatar.startsWith("images/") || formData.avatar.startsWith("http"))) ?
                                e("img", {
                                    src: formData.avatar,
                                    alt: formData.name || "Profile Avatar",
                                    className: "w-full h-full object-cover select-none pointer-events-none"
                                }) :
                                e("span", {
                                    className: "text-5xl select-none leading-none"
                                }, formData.avatar || (formData.name ? formData.name.charAt(0).toUpperCase() : "A"))
                        ),
                        // Overlapping Bottom-Right Purple/Indigo Edit Pencil Badge
                        e("button", {
                            type: "button",
                            onClick: (ev) => {
                                ev.stopPropagation();
                                setActiveModal("avatar");
                            },
                            className: "absolute bottom-0 right-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#5046e5] text-white flex items-center justify-center shadow-lg border-2 border-white hover:bg-indigo-600 active:scale-90 transition-all cursor-pointer group-hover:scale-105",
                            title: "Change Profile Picture"
                        },
                            e("svg", {
                                className: "w-4 h-4 sm:w-4.5 sm:h-4.5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                strokeWidth: 2.2
                            },
                                e("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                })
                            )
                        )
                    ),
                    // Centered User Name ONLY (strictly no email, no gmail, no phone)
                    e("h3", {
                        className: "font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight text-center mt-3.5"
                    }, formData.name || "Aarya Sharma")
                ),

                // -------------------------------------------------------------
                // ACCOUNT SETTINGS (EDIT PROFILE, PLAN OPTION, LANGUAGE)
                // -------------------------------------------------------------
                e("div", { className: "flex flex-col gap-1.5" },
                    e("h4", { className: "font-heading font-bold text-xs text-slate-900 px-1" }, "Account Settings"),
                    e("div", { className: "bg-white rounded-3xl p-2 shadow-xs border border-slate-100 flex flex-col divide-y divide-slate-100" },

                        // Row 1: Edit Profile (Explicitly Requested)
                        e("div", {
                            onClick: () => setIsEditing(true),
                            className: "flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group active:scale-[0.99]"
                        },
                            e("div", { className: "flex items-center gap-3" },
                                e("div", { className: "w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0" },
                                    e("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 },
                                        e("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                                        e("circle", { cx: "12", cy: "7", r: "4" })
                                    )
                                ),
                                e("div", null,
                                    e("p", { className: "text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors" }, "Edit Profile"),
                                    e("p", { className: "text-[11px] text-slate-400 font-medium" }, "Update your personal & travel details")
                                )
                            ),
                            renderChevron()
                        ),

                        // Row 2: Plan Option / Saved Trips (Explicitly Requested - Opens Full Page)
                        e("div", {
                            onClick: handleOpenPlans,
                            className: "flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group active:scale-[0.99]"
                        },
                            e("div", { className: "flex items-center gap-3" },
                                e("div", { className: "w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0" },
                                    e("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 },
                                        e("polygon", { points: "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" }),
                                        e("line", { x1: "8", y1: "2", x2: "8", y2: "18" }),
                                        e("line", { x1: "16", y1: "6", x2: "16", y2: "22" })
                                    )
                                ),
                                e("div", null,
                                    e("div", { className: "flex items-center gap-2" },
                                        e("p", { className: "text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors" }, "My Travel Plans"),
                                        e("span", { className: "px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200" },
                                            `${savedTrips ? savedTrips.length : 0} Saved`
                                        )
                                    ),
                                    e("p", { className: "text-[11px] text-slate-400 font-medium" }, "View saved itineraries & daily trip schedules")
                                )
                            ),
                            renderChevron()
                        ),

                        // Row 3: Language Option (Explicitly Requested)
                        e("div", { className: "flex items-center justify-between p-2.5" },
                            e("div", { className: "flex items-center gap-3" },
                                e("div", { className: "w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0" },
                                    e("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 },
                                        e("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }),
                                        e("line", { x1: "9", y1: "10", x2: "15", y2: "10" }),
                                        e("line", { x1: "12", y1: "7", x2: "12", y2: "13" })
                                    )
                                ),
                                e("div", null,
                                    e("p", { className: "text-xs font-bold text-slate-900" }, "Language"),
                                    e("p", { className: "text-[11px] text-slate-400 font-medium" }, "Select display language")
                                )
                            ),
                            // Language Selector Dropdown
                            e("div", { className: "relative" },
                                e("select", {
                                    value: selectedLang,
                                    onChange: (e) => setSelectedLang(e.target.value),
                                    className: "appearance-none bg-slate-50 border border-slate-200/90 text-slate-800 font-bold text-xs rounded-xl py-1.5 pl-3 pr-7 focus:outline-none focus:border-teal-600 cursor-pointer"
                                },
                                    e("option", { value: "English" }, "English"),
                                    e("option", { value: "Hindi" }, "हिन्दी"),
                                    e("option", { value: "Marathi" }, "मराठी")
                                ),
                                e("span", { className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]" }, "▾")
                            )
                        ),

                        // Row 4: Security & Emergency
                        e("div", {
                            onClick: () => setActiveModal("security"),
                            className: "flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group active:scale-[0.99]"
                        },
                            e("div", { className: "flex items-center gap-3" },
                                e("div", { className: "w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0" },
                                    e("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 },
                                        e("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
                                        e("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                                    )
                                ),
                                e("div", null,
                                    e("p", { className: "text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors" }, "Security & Emergency"),
                                    e("p", { className: "text-[11px] text-slate-400 font-medium" }, "Emergency contact & pass authentication")
                                )
                            ),
                            renderChevron()
                        ),

                        // Row 5: Notifications
                        e("div", {
                            onClick: () => setActiveModal("notifications"),
                            className: "flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group active:scale-[0.99]"
                        },
                            e("div", { className: "flex items-center gap-3" },
                                e("div", { className: "w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0" },
                                    e("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 },
                                        e("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }),
                                        e("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" })
                                    )
                                ),
                                e("div", null,
                                    e("p", { className: "text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors" }, "Notifications"),
                                    e("p", { className: "text-[11px] text-slate-400 font-medium" }, "Manage alerts and safety emails")
                                )
                            ),
                            renderChevron()
                        )
                    )
                ),

                // -------------------------------------------------------------
                // MORE OPTIONS & SUPPORT (BASIC ESSENTIALS)
                // -------------------------------------------------------------
                e("div", { className: "flex flex-col gap-1.5" },
                    e("h4", { className: "font-heading font-bold text-xs text-slate-900 px-1" }, "More Options"),
                    e("div", { className: "bg-white rounded-3xl p-2 shadow-xs border border-slate-100 flex flex-col divide-y divide-slate-100" },

                        // Row 1: Digital Tourist Pass QR
                        e("div", {
                            onClick: () => setActiveModal("qr"),
                            className: "flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group active:scale-[0.99]"
                        },
                            e("div", { className: "flex items-center gap-3" },
                                e("div", { className: "w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0" },
                                    e("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 },
                                        e("rect", { x: "3", y: "3", width: "7", height: "7" }),
                                        e("rect", { x: "14", y: "3", width: "7", height: "7" }),
                                        e("rect", { x: "14", y: "14", width: "7", height: "7" }),
                                        e("rect", { x: "3", y: "14", width: "7", height: "7" })
                                    )
                                ),
                                e("div", null,
                                    e("div", { className: "flex items-center gap-2" },
                                        e("p", { className: "text-xs font-bold text-slate-900 group-hover:text-slate-950 transition-colors" }, "Digital Tourist Pass ID"),
                                        e("span", { className: "px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200" }, "Active ●")
                                    ),
                                    e("p", { className: "text-[11px] text-slate-400 font-medium font-mono-data" }, `${formData.passportNumber} • Tap to view QR`)
                                )
                            ),
                            renderChevron()
                        ),

                        // Row 2: Log Out
                        e("div", {
                            onClick: onLogout,
                            className: "flex items-center justify-between p-2.5 rounded-2xl hover:bg-rose-50 transition-colors cursor-pointer group active:scale-[0.99]"
                        },
                            e("div", { className: "flex items-center gap-3" },
                                e("div", { className: "w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0" },
                                    e("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 },
                                        e("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
                                        e("polyline", { points: "16 17 21 12 16 7" }),
                                        e("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
                                    )
                                ),
                                e("div", null,
                                    e("p", { className: "text-xs font-bold text-rose-600" }, "Log Out"),
                                    e("p", { className: "text-[11px] text-rose-400 font-medium" }, "Sign out of your SAFORA session")
                                )
                            ),
                            e("svg", { className: "w-4 h-4 text-rose-400 group-hover:text-rose-600 transition-colors shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.2 },
                                e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5l7 7-7 7" })
                            )
                        )
                    )
                )
            ),

            // =========================================================================
            // POPUP MODALS: SECURITY MODAL
            // =========================================================================
            activeModal === "security" && e("div", { className: "fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in" },
                e("div", { className: "bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3.5" },
                    e("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2" },
                        e("div", null,
                            e("h3", { className: "font-heading font-black text-sm text-slate-900" }, "Security & Emergency Contacts"),
                            e("p", { className: "text-[11px] text-slate-500" }, "Official verified safety credentials")
                        ),
                        e("button", { onClick: () => setActiveModal(null), className: "w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 font-bold flex items-center justify-center text-xs" }, "✕")
                    ),
                    e("div", { className: "flex flex-col gap-2.5 text-xs" },
                        e("div", { className: "p-3 rounded-2xl bg-rose-50 border border-rose-100 flex flex-col gap-1" },
                            e("span", { className: "text-[10px] font-bold text-rose-600 uppercase tracking-wider" }, "Emergency Contact Person"),
                            e("span", { className: "font-bold text-slate-900" }, formData.emergencyName || "Rajesh Sharma (Father)"),
                            e("span", { className: "text-xs font-mono-data font-bold text-rose-700" }, formData.emergencyContact || "+91 91234 56789")
                        ),
                        e("div", { className: "grid grid-cols-2 gap-2" },
                            e("div", { className: "p-2.5 rounded-2xl bg-slate-50 border border-slate-100" },
                                e("span", { className: "text-[10px] text-slate-400 uppercase font-mono-data block" }, "Blood Group"),
                                e("span", { className: "font-black text-rose-700 text-sm font-mono-data" }, formData.bloodGroup || "O+ Positive")
                            ),
                            e("div", { className: "p-2.5 rounded-2xl bg-slate-50 border border-slate-100" },
                                e("span", { className: "text-[10px] text-slate-400 uppercase font-mono-data block" }, "Tourist Pass ID"),
                                e("span", { className: "font-bold text-slate-800 text-xs font-mono-data truncate block" }, formData.passportNumber || "IN-84712093")
                            )
                        ),
                        e("div", { className: "p-2.5 rounded-2xl bg-slate-50 border border-slate-100" },
                            e("span", { className: "text-[10px] text-slate-400 uppercase font-mono-data block" }, "Medical Notes"),
                            e("span", { className: "font-semibold text-slate-800 text-[11px]" }, formData.medicalNotes || "No known allergies • Fully Vaccinated")
                        )
                    ),
                    e("button", {
                        onClick: () => { setActiveModal(null); setIsEditing(true); },
                        className: "w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all mt-1"
                    }, "Edit Security Details")
                )
            ),

            // =========================================================================
            // POPUP MODALS: AVATAR SELECTION MODAL
            // =========================================================================
            activeModal === "avatar" && e("div", {
                className: "fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in"
            },
                e("div", {
                    className: "bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
                },
                    // Header
                    e("div", { className: "flex items-center justify-between border-b border-slate-100 pb-3" },
                        e("div", null,
                            e("h3", { className: "font-heading font-black text-lg text-slate-900" }, "Choose Profile Avatar"),
                            e("p", { className: "text-xs text-slate-500 font-medium" }, "Select an illustrated character or travel emoji")
                        ),
                        e("button", {
                            onClick: () => setActiveModal(null),
                            className: "w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 font-bold flex items-center justify-center text-xs active:scale-95 transition-all"
                        }, "✕")
                    ),

                    // Current Avatar Preview
                    e("div", { className: "flex items-center gap-3.5 p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100" },
                        e("div", { className: "w-14 h-14 rounded-full border-2 border-[#5046e5] overflow-hidden shrink-0 bg-white flex items-center justify-center shadow-sm" },
                            (formData.avatar && (formData.avatar.startsWith("data:") || formData.avatar.startsWith("images/") || formData.avatar.startsWith("http"))) ?
                                e("img", { src: formData.avatar, className: "w-full h-full object-cover" }) :
                                e("span", { className: "text-2xl" }, formData.avatar || "👤")
                        ),
                        e("div", { className: "flex flex-col min-w-0" },
                            e("span", { className: "text-[10px] font-bold uppercase tracking-wider text-[#5046e5] font-mono-data" }, "Current Selection"),
                            e("p", { className: "text-sm font-heading font-black text-slate-900 truncate" }, formData.name || "Aarya Sharma"),
                            e("p", { className: "text-[11px] text-slate-500" }, "Tap any avatar below to update your profile instantly")
                        )
                    ),


                    // Section 1: Illustrated Avatars (User-provided character photos with ALL NAMES REMOVED)
                    e("div", { className: "flex flex-col gap-2" },
                        e("div", { className: "flex items-center justify-between" },
                            e("h4", { className: "font-heading font-bold text-xs text-slate-900 uppercase tracking-wider" }, "Character Photos"),
                            e("span", { className: "text-[10px] text-slate-400 font-mono-data" }, `${(typeof APP_AVATAR_PRESETS !== "undefined") ? APP_AVATAR_PRESETS.length : 9} Photos`)
                        ),
                        e("div", { className: "grid grid-cols-3 gap-3 justify-items-center" },
                            (typeof APP_AVATAR_PRESETS !== "undefined" ? APP_AVATAR_PRESETS : []).map((avatar) => {
                                const isSelected = formData.avatar === avatar.src || (formData.avatar && formData.avatar.includes(avatar.id));
                                return e("button", {
                                    key: avatar.id,
                                    type: "button",
                                    onClick: () => handleSelectAvatar(avatar.src),
                                    className: `relative p-1 rounded-full border-2 transition-all group active:scale-90 flex items-center justify-center ${
                                        isSelected
                                            ? "border-[#5046e5] bg-indigo-50/70 shadow-md ring-2 ring-[#5046e5]/40"
                                            : "border-transparent hover:border-indigo-200 hover:bg-slate-100"
                                    }`
                                },
                                    e("div", { className: "w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white relative" },
                                        e("img", {
                                            src: avatar.src,
                                            alt: "Profile Avatar Option",
                                            className: "w-full h-full object-cover group-hover:scale-105 transition-transform select-none pointer-events-none"
                                        }),
                                        isSelected && e("div", {
                                            className: "absolute inset-0 bg-[#5046e5]/30 flex items-center justify-center backdrop-blur-[0.5px]"
                                        },
                                            e("div", { className: "w-6 h-6 rounded-full bg-[#5046e5] text-white flex items-center justify-center text-xs font-black shadow-md border-2 border-white" }, "✓")
                                        )
                                    )
                                );
                            })
                        )
                    ),

                    // Section 2: Travel Emojis
                    e("div", { className: "flex flex-col gap-2 pt-2 border-t border-slate-100" },
                        e("h4", { className: "font-heading font-bold text-xs text-slate-900 uppercase tracking-wider" }, "Travel Emojis"),
                        e("div", { className: "grid grid-cols-6 gap-2" },
                            (typeof TRAVEL_EMOJI_PRESETS !== "undefined" ? TRAVEL_EMOJI_PRESETS : []).map((emoji) => {
                                const isSelected = formData.avatar === emoji;
                                return e("button", {
                                    key: emoji,
                                    type: "button",
                                    onClick: () => handleSelectAvatar(emoji),
                                    className: `h-11 rounded-2xl flex items-center justify-center text-2xl transition-all border-2 active:scale-95 ${
                                        isSelected
                                            ? "border-[#5046e5] bg-indigo-50 shadow-sm"
                                            : "border-slate-100 hover:border-indigo-200 bg-slate-50/80 hover:bg-white"
                                    }`
                                }, emoji);
                            })
                        )
                    ),

                    // Close Button
                    e("button", {
                        onClick: () => setActiveModal(null),
                        className: "w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all mt-1"
                    }, "Done")
                )
            ),

            // =========================================================================
            // POPUP MODALS: DIGITAL QR PASS MODAL
            // =========================================================================
            activeModal === "qr" && e("div", { className: "fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in" },
                e("div", { className: "bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-3" },
                    e("div", { className: "flex items-center justify-between w-full border-b border-slate-100 pb-2" },
                        e("span", { className: "text-[11px] font-bold text-emerald-600 flex items-center gap-1" },
                            e("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
                            "Government Verified Pass"
                        ),
                        e("button", { onClick: () => setActiveModal(null), className: "w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 font-bold flex items-center justify-center text-xs" }, "✕")
                    ),
                    e("div", { className: "p-4 bg-slate-900 rounded-3xl text-white w-full flex flex-col items-center gap-3 shadow-inner" },
                        e("h4", { className: "font-heading font-black text-sm tracking-widest uppercase text-white" }, "SAFORA SMART TOURIST PASS"),
                        // Big QR Code Vector
                        e("div", { className: "w-44 h-44 bg-white p-2.5 rounded-2xl shadow-md flex items-center justify-center" },
                            e("svg", { viewBox: "0 0 24 24", className: "w-full h-full text-slate-950", fill: "currentColor" },
                                e("path", { d: "M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm12 2h2v4h-2v-4zm-2-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 4h4v2h-4v-2zm2-6h2v2h-2v-2z" })
                            )
                        ),
                        e("div", { className: "text-center" },
                            e("p", { className: "text-xs font-bold text-slate-200" }, formData.name),
                            e("p", { className: "text-[11px] font-mono-data text-emerald-400 mt-0.5" }, `PASS ID: ${formData.passportNumber}`)
                        )
                    ),
                    e("p", { className: "text-[11px] text-slate-500" }, "Show this QR code at hotel desks, tourist police booths, or safety checkpoints."),
                    e("button", {
                        onClick: () => setActiveModal(null),
                        className: "w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all"
                    }, "Close Pass")
                )
            ),

            // =========================================================================
            // POPUP MODALS: NOTIFICATIONS MODAL
            // =========================================================================
            activeModal === "notifications" && e("div", { className: "fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in" },
                e("div", { className: "bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3" },
                    e("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2" },
                        e("h3", { className: "font-heading font-black text-sm text-slate-900" }, "Safety & Travel Alerts"),
                        e("button", { onClick: () => setActiveModal(null), className: "w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 font-bold flex items-center justify-center text-xs" }, "✕")
                    ),
                    e("div", { className: "flex flex-col gap-2" },
                        [
                            { id: 1, title: "🌤 Weather Advisory", text: "Pleasant 28°C across Colaba corridor today. Safe for promenade walking.", time: "10m ago" },
                            { id: 2, title: "🛡️ Safety Corridor Active", text: "Tourism police booths operational 24/7 along Gateway precinct.", time: "45m ago" },
                            { id: 3, title: "🧳 Trip Planner Ready", text: "Explore AI itineraries and estimated budgets for Goa, Jaipur and Kashmir.", time: "2h ago" }
                        ].map(n => e("div", { key: n.id, className: "p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-0.5" },
                            e("div", { className: "flex items-center justify-between" },
                                e("h4", { className: "text-xs font-bold text-slate-900" }, n.title),
                                e("span", { className: "text-[10px] text-slate-400 font-mono-data" }, n.time)
                            ),
                            e("p", { className: "text-[11px] text-slate-600" }, n.text)
                        ))
                    ),
                    e("button", {
                        onClick: () => setActiveModal(null),
                        className: "w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold font-heading hover:bg-slate-800 transition-all mt-1"
                    }, "Done")
                )
            )
        );
    }


    function NotificationDrawer({ isOpen, onClose }) {
        if (!isOpen) return null;
        const notifications = [
            { id: 1, title: "🌤 Weather Advisory", text: "Pleasant 28°C across Colaba corridor today. Safe for open promenade walking.", time: "10m ago" },
            { id: 2, title: "🛡️ Safety Corridor Active", text: "Tourism police safety booths operational 24/7 along Gateway precinct.", time: "45m ago" },
            { id: 3, title: "🧳 Trip Planner Ready", text: "Explore AI itineraries and estimated budgets for Goa, Jaipur and Kashmir.", time: "2h ago" }
        ];

        return e("div", { className: "fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" },
            e("div", { className: "bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3" },
                e("div", { className: "flex items-center justify-between" },
                    e("h3", { className: "font-heading font-black text-sm text-slate-900" }, "Notifications & Alerts"),
                    e("button", { onClick: onClose, className: "text-slate-400 hover:text-slate-700 font-bold" }, "✕")
                ),
                e("div", { className: "flex flex-col gap-2" },
                    notifications.map(n => e("div", { key: n.id, className: "p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-0.5" },
                        e("div", { className: "flex items-center justify-between" },
                            e("h4", { className: "text-xs font-bold text-slate-900" }, n.title),
                            e("span", { className: "text-[10px] text-slate-400 font-mono-data" }, n.time)
                        ),
                        e("p", { className: "text-[11px] text-slate-600" }, n.text)
                    ))
                ),
                e("button", {
                    onClick: onClose,
                    className: "w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold font-heading hover:bg-slate-800"
                }, "Mark All as Read")
            )
        );
    }

    // =========================================================================
    // BOTTOM NAVIGATION DOCK
    // =========================================================================
    function BottomNavDock({ activeTab, onSelectTab, isForceMobile = false }) {
        const navItems = [
            { id: "home", label: "Home" },
            { id: "plan", label: "Plan" },
            { id: "explore", label: "Explore" },
            { id: "translate", label: "Translate" },
            { id: "support", label: "Support" },
            { id: "profile", label: "Profile" }
        ];

        const renderNavIcon = (id, isActive) => {
            const strokeWidth = isActive ? "2.2" : "1.8";
            const commonProps = {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: strokeWidth,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "w-5 h-5 transition-transform duration-200 " + (isActive ? "scale-110" : "group-hover:scale-105")
            };

            switch (id) {
                case "home":
                    return e("svg", commonProps,
                        e("path", { d: "M3 10.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9.5z" }),
                        e("polyline", { points: "9 22 9 12 15 12 15 22" })
                    );
                case "plan":
                    return e("svg", commonProps,
                        e("rect", { x: "3", y: "7", width: "18", height: "13", rx: "3" }),
                        e("path", { d: "M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7" }),
                        e("line", { x1: "3", y1: "13", x2: "21", y2: "13" }),
                        e("line", { x1: "12", y1: "11", x2: "12", y2: "15" })
                    );
                case "explore":
                    return e("svg", commonProps,
                        e("circle", { cx: "12", cy: "12", r: "10" }),
                        e("polygon", { points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76", fill: isActive ? "currentColor" : "none", fillOpacity: isActive ? "0.2" : "0" })
                    );
                case "translate":
                    return e("svg", commonProps,
                        e("path", { d: "m5 8 6 6" }),
                        e("path", { d: "m4 14 6-6 2-3" }),
                        e("path", { d: "M2 5h12" }),
                        e("path", { d: "M7 2h1" }),
                        e("path", { d: "m22 22-5-10-5 10" }),
                        e("path", { d: "M14 18h6" })
                    );
                case "support":
                    return e("svg", commonProps,
                        e("path", { d: "M3 18v-6a9 9 0 0 1 18 0v6" }),
                        e("path", { d: "M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" })
                    );
                case "profile":
                    return e("svg", commonProps,
                        e("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
                        e("circle", { cx: "12", cy: "7", r: "4" })
                    );
                default:
                    return null;
            }
        };

        const dockClass = isForceMobile
            ? "shrink-0 w-full z-40 bg-white/98 backdrop-blur-md border-t border-slate-200/90 pt-2 pb-2.5 px-2 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] select-none transition-all duration-200"
            : "fixed bottom-0 md:bottom-5 left-1/2 -translate-x-1/2 w-full md:w-auto md:min-w-[560px] md:max-w-2xl z-40 bg-white/95 backdrop-blur-md border-t md:border border-slate-200/90 md:rounded-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.07)] md:shadow-[0_12px_40px_rgba(0,0,0,0.15)] pt-2 pb-3.5 md:py-2 px-2 md:px-5 transition-all duration-300";

        return e("nav", {
            className: dockClass,
            style: { backgroundColor: '#ffffff', opacity: 1 },
            "data-nav-dock": "true"
        },
            e("div", { className: "w-full grid grid-cols-6 items-center text-center gap-1 md:gap-3" },
                navItems.map(item => {
                    const isActive = activeTab === item.id;
                    return e("button", {
                        key: item.id,
                        onClick: () => onSelectTab(item.id),
                        className: "group relative py-1 md:py-1.5 px-0.5 md:px-2 min-h-[46px] rounded-xl active:bg-slate-100/80 hover:bg-slate-100/60 transition-all flex flex-col items-center justify-center gap-1 " + (isActive ? "text-rose-600 font-bold" : "text-slate-500 hover:text-slate-900 font-medium")
                    },
                        renderNavIcon(item.id, isActive),
                        e("span", {
                            className: "text-[10px] md:text-xs font-heading tracking-tight leading-tight block transition-colors " + (isActive ? 'text-rose-600 font-bold' : 'text-slate-500 font-medium')
                        }, item.label)
                    );
                })
            ),
            isForceMobile && e("div", {
                className: "w-28 h-1 bg-slate-300 rounded-full mx-auto mt-1"
            })
        );
    }


    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false, error: null };
        }
        static getDerivedStateFromError(error) {
            return { hasError: true, error: error };
        }
        componentDidCatch(error, errorInfo) {
            console.error("Safora ErrorBoundary caught:", error, errorInfo);
        }
        render() {
            if (this.state.hasError) {
                return e("div", {
                    className: "mobile-container min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center text-center gap-4"
                },
                    e("div", { className: "w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-3xl font-black border border-rose-500/40" }, "⚠️"),
                    e("h2", { className: "text-lg font-black" }, "Application Recovered"),
                    e("p", { className: "text-xs text-slate-400 max-w-xs" }, this.state.error ? (this.state.error.message || String(this.state.error)) : "An unexpected view error occurred."),
                    e("button", {
                        onClick: () => {
                            try { localStorage.removeItem("safora_user_profile_v3"); localStorage.removeItem("safora_logged_in_v4"); } catch(err){}
                            window.location.reload();
                        },
                        className: "px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                    }, "↻ Reset & Refresh")
                );
            }
            return this.props.children;
        }
    }

    // =========================================================================
    // ROOT TOURIST APP CONTAINER
    // =========================================================================
    function TouristApp() {
        const [showWelcome, setShowWelcome] = useState(true);
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        // Laptop / PC Detection & Mobile View Switcher States
        const [isDesktop, setIsDesktop] = useState(() => {
            if (typeof window !== "undefined") {
                return window.innerWidth >= 1024;
            }
            return false;
        });

        // Default to FALSE: normal widescreen by default unless switched
        const [forceMobileView, setForceMobileView] = useState(() => {
            try {
                return sessionStorage.getItem("safora_force_mobile_view") === "true";
            } catch (e) {
                return false;
            }
        });

        const [showDesktopPrompt, setShowDesktopPrompt] = useState(false);

        useEffect(() => {
            const handleResize = () => {
                if (typeof window !== "undefined") {
                    setIsDesktop(window.innerWidth >= 1024);
                }
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        // Show prompt on PC when logged in if not in mobile view
        useEffect(() => {
            if (isDesktop && isLoggedIn && !forceMobileView) {
                try {
                    const hasDismissed = sessionStorage.getItem("safora_pc_prompt_dismissed");
                    if (!hasDismissed) {
                        setShowDesktopPrompt(true);
                    }
                } catch (e) {
                    setShowDesktopPrompt(true);
                }
            }
        }, [isDesktop, isLoggedIn, forceMobileView]);

        const toggleMobileView = () => {
            setForceMobileView(prev => {
                const next = !prev;
                try {
                    sessionStorage.setItem("safora_force_mobile_view", String(next));
                } catch(e) {}
                return next;
            });
        };

        const dismissDesktopPrompt = () => {
            setShowDesktopPrompt(false);
            try {
                sessionStorage.setItem("safora_pc_prompt_dismissed", "true");
            } catch (e) {}
        };

        const handlePromptSwitchToMobile = () => {
            setForceMobileView(true);
            try {
                sessionStorage.setItem("safora_force_mobile_view", "true");
            } catch (e) {}
            dismissDesktopPrompt();
        };
        const [activeTab, setActiveTab] = useState("home");
        const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
        const [selectedLang, setSelectedLang] = useState("English");
        const t = (typeof UI_I18N !== "undefined" && UI_I18N[selectedLang]) ? UI_I18N[selectedLang] : ((typeof UI_I18N !== "undefined" && UI_I18N["English"]) ? UI_I18N["English"] : {});

        const [profile, setProfile] = useState(() => {
            const defaultGender = "Female";
            const defaultProf = {
                name: "Aarya Sharma",
                email: "",
                gender: defaultGender,
                nationality: "India",
                passportNumber: "IN-84712093",
                hotel: "Taj Mahal Palace, Colaba",
                contact: "+91 98765 43210",
                emergencyContact: "+91 91234 56789",
                emergencyName: "Rajesh Sharma (Father)",
                bloodGroup: "O+",
                medicalNotes: "Tourist Safety Profile Active",
                homeCity: "Navi Mumbai, Maharashtra",
                isVerified: true,
                avatar: getDefaultAvatarForGender(defaultGender)
            };
            try {
                const saved = localStorage.getItem("safora_user_profile_v3");
                if (saved) {
                    const parsed = JSON.parse(saved);
                    const effGender = parsed.gender || defaultGender;
                    const effAvatar = parsed.avatar || getDefaultAvatarForGender(effGender);
                    return { ...defaultProf, ...parsed, gender: effGender, avatar: effAvatar };
                }
            } catch (e) {}
            return defaultProf;
        });

        const [savedTrips, setSavedTrips] = useState([
            {
                id: 1,
                destination: "Goa",
                days: 3,
                budgetTier: "Moderate (₹18,000)",
                createdAt: "10 Sep 2026",
                itinerary: (typeof generateSmartTripItinerary === "function") ? generateSmartTripItinerary("Goa", 3, "Moderate") : []
            }
        ]);

        const [showNotifications, setShowNotifications] = useState(false);
        const [isViewingProfilePlans, setIsViewingProfilePlans] = useState(false);
        const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
        const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

        const [touristLatLong, setTouristLatLong] = useState({ lat: 19.0330, lng: 73.0180 });
        const [isUsingRealGps, setIsUsingRealGps] = useState(false);
        const [livePlaceName, setLivePlaceName] = useState("Sarsole Village, Navi Mumbai, Maharashtra");

        useEffect(() => {
            if (touristLatLong && touristLatLong.lat && touristLatLong.lng) {
                fetch("/api/reverse-geocode?lat=" + touristLatLong.lat + "&lng=" + touristLatLong.lng)
                    .then(r => r.json())
                    .then(data => {
                        if (data && data.displayName) {
                            setLivePlaceName(data.displayName);
                        }
                    })
                    .catch(e => console.warn("Reverse geocode sync:", e));
            }
        }, [touristLatLong]);

        useEffect(() => {
            if (typeof navigator !== "undefined" && "geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        setTouristLatLong({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                        setIsUsingRealGps(true);
                    },
                    (err) => console.log("Using default corridor:", err.message),
                    { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
                );
            }
        }, []);

        const [isSosActive, setIsSosActive] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState("Medical Emergency");

        const playSirenSound = () => {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!AudioContext) return;
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(800, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.4);
                osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.8);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 1.2);
            } catch (e) {
                console.warn("Audio Context init:", e);
            }
        };

        const handleSosTrigger = () => {
            setIsSosActive(true);
            playSirenSound();
            fetch("/api/incidents", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    touristName: profile.name || "Aarya",
                    type: selectedCategory,
                    location: livePlaceName,
                    latLong: Number(touristLatLong.lat).toFixed(4) + "° N, " + Number(touristLatLong.lng).toFixed(4) + "° E"
                })
            }).catch(e => console.warn("SOS incident push:", e));
        };

        const handleCancelEmergency = () => {
            setIsSosActive(false);
        };

        const [lostReports, setLostReports] = useState([]);
        const [myLocalLostIds, setMyLocalLostIds] = useState([]);
        const [isFilingLostModalOpen, setIsFilingLostModalOpen] = useState(false);

        const handleLostFoundSubmit = (e, catFromModal, specFromModal) => {
            if (e && e.preventDefault) e.preventDefault();
            const form = (e && e.target) ? e.target : {};
            const cat = catFromModal || (form.category ? form.category.value : (form.itemCategory ? form.itemCategory.value : "Personal Item"));
            const itemName = specFromModal || (form.item ? form.item.value : (form.itemName ? form.itemName.value : (form.otherSpecification ? form.otherSpecification.value : "Personal Item")));
            const locationVal = form.location ? form.location.value : (form.lastSeenLocation ? form.lastSeenLocation.value : "Mumbai");
            const contactVal = form.contactInfo ? form.contactInfo.value : (form.contactReturn ? form.contactReturn.value : "");
            const newReport = {
                id: Date.now(),
                category: cat,
                item: itemName,
                itemName: itemName,
                location: locationVal,
                contact: contactVal,
                touristName: (profile && profile.name) ? profile.name : "Aarya",
                timestamp: "Just now",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                status: "Searching",
                color: "orange"
            };
            setLostReports(prev => [newReport, ...(prev || [])]);
            setMyLocalLostIds(prev => [newReport.id, ...(prev || [])]);
            setIsFilingLostModalOpen(false);
        };

        const handleDismissMyReport = (id) => {
            setLostReports(lostReports.filter(r => r.id !== id));
            setMyLocalLostIds(myLocalLostIds.filter(i => i !== id));
        };

        const handleClearAllMyReports = () => {
            setLostReports([]);
            setMyLocalLostIds([]);
        };

        const handleLogin = (userData) => {
            if (userData) {
                setProfile(prev => ({ ...prev, ...userData }));
            }
            setShowWelcome(false);
            setIsLoggedIn(true);
            setActiveTab("home");
            // Prompt PC / Laptop users to switch to mobile view
            if (typeof window !== "undefined" && window.innerWidth >= 1024 && !forceMobileView) {
                setShowDesktopPrompt(true);
            }
            try {
                localStorage.removeItem("safora_logged_in_v5");
                localStorage.removeItem("safora_logged_in_v4");
            } catch (e) {}
        };

        const handleLogout = () => {
            setIsLoggedIn(false);
            setShowWelcome(true);
            setActiveTab("home");
            try {
                localStorage.removeItem("safora_logged_in_v5");
                localStorage.removeItem("safora_logged_in_v4");
            } catch (e) {}
        };

        const handleNavigate = (tab, subParam) => {
            if (tab === "safety") {
                setActiveTab("home");
            } else {
                setActiveTab(tab);
            }
        };

        return e("div", { className: "min-h-screen bg-[#f1f3f7] flex flex-col items-center selection:bg-slate-900 selection:text-white relative w-full" },
            // Top Bar: "Switch to Mobile View" Button (ONLY visible on Laptop / PC in Widescreen Mode)
            (isDesktop && !forceMobileView) && e("div", {
                className: "w-full bg-slate-900/95 backdrop-blur-md text-white text-xs py-2 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 shadow-sm z-30 select-none sticky top-0"
            },
                e("div", { className: "flex items-center gap-2.5" },
                    e("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
                    e("span", { className: "font-semibold text-slate-300 hidden sm:inline" },
                        "Laptop Mode: Widescreen View Active"
                    )
                ),
                e("button", {
                    type: "button",
                    onClick: toggleMobileView,
                    title: "Switch to compact Mobile Phone view for authentic layout",
                    className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 transition-all active:scale-95 cursor-pointer shadow-sm"
                },
                    e("span", { className: "text-sm" }, "📱"),
                    e("span", null, "Switch to Mobile View")
                )
            ),

            // Post-Login Desktop Prompt Popup with Cross Sign (ONLY visible on Laptop / PC)
            isDesktop && showDesktopPrompt && e("div", {
                className: "fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[120] flex items-center justify-center p-4 animate-in fade-in"
            },
                e("div", {
                    className: "bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col gap-4 relative animate-in zoom-in-95 duration-200"
                },
                    // Cross Sign Dismiss Button
                    e("button", {
                        type: "button",
                        onClick: dismissDesktopPrompt,
                        className: "absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-xs transition-all active:scale-95 cursor-pointer",
                        title: "Dismiss"
                    }, "✕"),

                    // Header Icon + Title
                    e("div", { className: "flex items-center gap-3.5 pr-8" },
                        e("div", { className: "w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-2xl shrink-0 shadow-xs" },
                            "💻"
                        ),
                        e("div", null,
                            e("span", { className: "text-[10px] font-bold uppercase tracking-wider text-indigo-600 font-mono-data" }, "Laptop / PC Detected"),
                            e("h3", { className: "font-heading font-black text-lg text-slate-900 leading-tight mt-0.5" }, "Switch to Mobile View?")
                        )
                    ),

                    // Grammatically Framed Explanation Message
                    e("p", { className: "text-xs text-slate-600 leading-relaxed" },
                        "We detected that you are accessing SAFORA on a computer screen. Would you like to switch to the authentic Mobile Phone View for the best experience? Otherwise, you can continue in the normal widescreen view."
                    ),

                    // Helpful Hint Box
                    e("div", { className: "p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-2.5 text-xs text-slate-700" },
                        e("span", { className: "text-base shrink-0" }, "📱"),
                        e("span", { className: "text-[11px] text-slate-600 font-medium" },
                            "You can easily toggle between Widescreen and Mobile phone resolutions at any time using the top bar."
                        )
                    ),

                    // Action Buttons
                    e("div", { className: "flex items-center gap-2.5 pt-1" },
                        e("button", {
                            type: "button",
                            onClick: handlePromptSwitchToMobile,
                            className: "flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25 transition-all active:scale-95 cursor-pointer"
                        },
                            e("span", null, "📱"),
                            e("span", null, "Switch to Mobile View")
                        ),
                        e("button", {
                            type: "button",
                            onClick: dismissDesktopPrompt,
                            className: "py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all active:scale-95 cursor-pointer"
                        }, "Keep Widescreen")
                    )
                )
            ),

            showWelcome ? (
                e(AppleWelcomeScreen, {
                    onContinue: () => setShowWelcome(false)
                })
            ) : !isLoggedIn ? (
                e(LoginPage, {
                    onLogin: handleLogin,
                    onBackToWelcome: () => setShowWelcome(true)
                })
            ) : (
                e("div", {
                    className: (isDesktop && forceMobileView)
                        ? "mobile-container force-mobile-frame flex flex-col bg-[#f8fafc] text-slate-900 shadow-2xl relative select-none"
                        : "mobile-container w-full min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 px-4 sm:px-6 md:px-8 lg:px-10 pb-24 md:pb-28 shadow-2xl relative"
                },
                    // In-Phone Control Bar (Brought INSIDE the mobile phone frame as requested)
                    (isDesktop && forceMobileView) && e("div", {
                        className: "w-full bg-slate-900 text-white text-xs py-2 px-3.5 flex items-center justify-between border-b border-slate-800 shrink-0 select-none z-30 shadow-xs"
                    },
                        e("div", { className: "flex items-center gap-2" },
                            e("span", { className: "w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" }),
                            e("span", { className: "font-bold text-slate-200 text-[11px]" }, "Mobile View (430px)")
                        ),
                        e("button", {
                            type: "button",
                            onClick: toggleMobileView,
                            title: "Switch back to Laptop Widescreen view",
                            className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all active:scale-95 cursor-pointer shadow-xs"
                        },
                            e("span", null, "💻"),
                            e("span", null, "Switch to Widescreen")
                        )
                    ),

                    // Scrollable content wrapper for mobile phone frame, or regular wrapper for widescreen
                    e("div", {
                        className: (isDesktop && forceMobileView)
                            ? "flex-1 w-full overflow-y-auto overflow-x-hidden px-4 pt-3 pb-6 relative"
                            : "w-full flex-1 flex flex-col",
                        id: (isDesktop && forceMobileView) ? "mobile-frame-scroll-body" : undefined
                    },
                        activeTab === "home" && e(HomeDashboard, {
                        userProfile: profile,
                        livePlaceName: livePlaceName,
                        onNavigate: handleNavigate,
                        onOpenNotifications: () => { setShowNotifications(true); setUnreadNotificationsCount(0); },
                        unreadNotificationsCount: unreadNotificationsCount,
                        onOpenProfile: () => setActiveTab("profile"),
                        onSelectDestination: (city) => setActiveTab("explore"),
                        isSosActive: isSosActive,
                        setIsSosActive: setIsSosActive,
                        selectedCategory: selectedCategory,
                        setSelectedCategory: setSelectedCategory,
                        handleSosTrigger: handleSosTrigger,
                        handleCancelEmergency: handleCancelEmergency,
                        playSirenSound: playSirenSound,
                        touristLatLong: touristLatLong,
                        setTouristLatLong: setTouristLatLong,
                        isUsingRealGps: isUsingRealGps,
                        setIsUsingRealGps: setIsUsingRealGps,
                        profile: profile,
                        setProfile: setProfile,
                        lostReports: lostReports,
                        setLostReports: setLostReports,
                        myLocalLostIds: myLocalLostIds,
                        setMyLocalLostIds: setMyLocalLostIds,
                        handleLostFoundSubmit: handleLostFoundSubmit,
                        handleDismissMyReport: handleDismissMyReport,
                        handleClearAllMyReports: handleClearAllMyReports,
                        isFilingLostModalOpen: isFilingLostModalOpen,
                        setIsFilingLostModalOpen: setIsFilingLostModalOpen,
                        broadcastAlerts: [],
                        selectedLang: selectedLang
                    }),

                    activeTab === "plan" && e(PlanSection, {
                        onBackToHome: () => setActiveTab("home"),
                        savedTrips: savedTrips,
                        setSavedTrips: setSavedTrips
                    }),

                    activeTab === "explore" && e(ExploreSection, {
                        onBackToHome: () => setActiveTab("home"),
                        touristLatLong: touristLatLong,
                        setTouristLatLong: setTouristLatLong,
                        livePlaceName: livePlaceName,
                        onModalToggle: (isOpen) => setIsPlaceModalOpen(isOpen),
                        onSaveToItinerary: (item) => {
                            const newTrip = {
                                id: Date.now().toString(),
                                title: item.name + " Visit",
                                days: 1,
                                budget: item.fee || "Free Entry",
                                created: "Saved from Explore"
                            };
                            setSavedTrips(prev => [newTrip, ...prev]);
                        }
                    }),

                    (activeTab === "translate" || activeTab === "safety") && e(TranslateSection, {
                        onBackToHome: () => setActiveTab("home")
                    }),

                    activeTab === "support" && e(SupportSection, {
                        onBackToHome: () => setActiveTab("home"),
                        userProfile: profile
                    }),

                    activeTab === "profile" && e(ProfileSection, {
                        userProfile: profile,
                        setProfile: (newP) => {
                            setProfile(newP);
                            try {
                                localStorage.setItem("safora_user_profile_v3", JSON.stringify(newP));
                            } catch (e) {}
                        },
                        onBackToHome: () => {
                            setIsViewingProfilePlans(false);
                            setActiveTab("home");
                        },
                        savedTrips: savedTrips,
                        setSavedTrips: setSavedTrips,
                        onLogout: handleLogout,
                        onReplayWelcome: () => setShowWelcome(true),
                        selectedLang: selectedLang,
                        setSelectedLang: setSelectedLang,
                        onNavigateToPlan: () => {
                            setIsViewingProfilePlans(false);
                            setActiveTab("plan");
                        },
                        onViewingPlansChange: (isViewing) => setIsViewingProfilePlans(isViewing),
                        onModalStateChange: (isOpen) => setIsProfileModalOpen(isOpen)
                    })
                    ), // Closing scrollable tab wrapper

                    !isPlaceModalOpen && !isFilingLostModalOpen && !isViewingProfilePlans && !isProfileModalOpen && e(BottomNavDock, {
                        activeTab: activeTab,
                        isForceMobile: Boolean(isDesktop && forceMobileView),
                        onSelectTab: (tab) => {
                            setIsPlaceModalOpen(false);
                            setIsFilingLostModalOpen(false);
                            setIsViewingProfilePlans(false);
                            setActiveTab(tab);
                        }
                    }),

                    e(NotificationDrawer, {
                        isOpen: showNotifications,
                        onClose: () => setShowNotifications(false)
                    })
                )
            )
        );
    }

    // =========================================================================
    // DOM MOUNT
    // =========================================================================
    function mount() {
        const rootEl = document.getElementById("root");
        if (!rootEl) { setTimeout(mount, 20); return; }
        try {
            if (ReactDOM.createRoot) {
                const root = ReactDOM.createRoot(rootEl);
                root.render(React.createElement(ErrorBoundary, null, React.createElement(TouristApp, null)));
            } else if (ReactDOM.render) {
                ReactDOM.render(React.createElement(ErrorBoundary, null, React.createElement(TouristApp, null)), rootEl);
            }
        } catch (err) {
            console.error("Mount error:", err);
            rootEl.innerHTML = "<div style=\"min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0f172a;color:#ffffff;font-family:sans-serif;padding:24px;text-align:center;\"><h2 style=\"font-size:20px;font-weight:bold;margin-bottom:8px;\">SAFORA Ready</h2><button onclick=\"location.reload()\" style=\"padding:10px 20px;background:#e11d48;color:white;border:none;border-radius:12px;font-weight:bold;cursor:pointer;\">Reload App</button></div>";
        }
    }

    if (typeof document !== "undefined") {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", mount);
        } else {
            mount();
        }
    }
})();