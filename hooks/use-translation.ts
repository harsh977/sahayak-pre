"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"

// Define translations for different languages
const translations: Record<string, Record<string, string>> = {
  en: {
    app_name: "Sahayak",
    app_tagline: "Your friendly companion for daily needs",
    welcome_message: "Namaste! How may I assist you today?",
    settings: "Accessibility Settings",
    dark_mode: "Dark Mode",
    text_size: "Text Size",
    contrast: "Contrast",
    logout: "Logout",

    // Mode names
    religious_mode: "Religious Companion",
    wellness_mode: "Wellness Guide",
    shopping_mode: "Shopping Assistant",
    scheme_mode: "Government Schemes",

    // Mode descriptions
    religious_description: "Discuss spiritual topics, stories, and traditions",
    wellness_description: "Health tips, exercises, and medication reminders",
    shopping_description: "Order groceries, food, or other items online",
    scheme_description: "Information about benefits and programs for seniors",

    // Religious mode
    religious_companion: "Religious Companion",
    religious_welcome:
      "Welcome to Religious Companion Mode. I'm here to discuss spiritual topics, share religious stories, or answer questions about faith and traditions. What would you like to talk about today?",
    religious_welcome_message:
      "I can help you with spiritual guidance, religious stories, and information about traditions and practices. What would you like to explore today?",
    religious_user_query: "Tell me about the significance of Diwali",
    religious_ai_response:
      "Diwali, the festival of lights, symbolizes the victory of light over darkness and good over evil. It commemorates Lord Rama's return to Ayodhya after defeating Ravana. People light diyas (lamps), perform puja, exchange gifts, and celebrate with family. Would you like to hear more about the rituals or the story behind Diwali?",

    // Wellness mode
    wellness_guide: "Wellness Guide",
    wellness_welcome:
      "Welcome to Wellness Mode. I can help with health tips, medication reminders, simple exercises, or meditation guidance. How can I support your wellbeing today?",
    wellness_user_query: "What are some simple exercises I can do at home?",
    wellness_ai_response:
      "There are several gentle exercises you can do at home. Chair yoga is excellent - try seated forward bends and gentle twists. Walking in place for 5-10 minutes several times a day is beneficial. Simple arm rotations and ankle circles improve circulation. Would you like me to explain any of these in more detail?",

    // Shopping mode
    shopping_assistant: "Shopping Assistant",
    shopping_welcome:
      "Welcome to Shopping Assistant Mode. I can help you order groceries, food, or other items online. What would you like to purchase today?",
    shopping_welcome_message:
      "I can help you order groceries, food, medicines, or other items online. What would you like to purchase today?",
    shopping_user_query: "I want to order some groceries",
    shopping_ai_response_with_location:
      "I'd be happy to help you order groceries. I see you're located at {location}. Would you like to order from BigBasket or Amazon Fresh?",
    shopping_ai_response_no_location:
      "I'd be happy to help you order groceries. Would you like to order from BigBasket or Amazon Fresh? Also, I'll need your delivery address. Is it the same as last time (42 Lakshmi Apartments, Jayanagar)?",

    // Scheme mode
    scheme_mode_title: "Government Schemes",
    scheme_welcome:
      "Welcome to Government Schemes Mode. I can provide information about various government programs and benefits for seniors. What would you like to know about?",
    scheme_user_query: "Tell me about pension schemes for seniors",
    scheme_ai_response:
      "The National Pension System (NPS) and Pradhan Mantri Vaya Vandana Yojana (PMVVY) are excellent schemes for seniors. PMVVY offers a guaranteed pension with 7.4% annual returns for 10 years. Would you like me to explain the eligibility criteria and how to apply?",

    // General
    back_to_home: "What would you like assistance with today?",
    default_user_query: "What can you help me with?",
    default_ai_response:
      "I can assist you with various things! You can ask me about religious topics, health and wellness advice, help with ordering groceries or food, or information about government schemes for seniors. Just select a mode or ask me anything!",

    // Login/Signup
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    confirm_password: "Confirm Password",
    full_name: "Full Name",
    age: "Age",
    religion: "Religion",
    emergency_contact: "Emergency Contact",
    continue_as_guest: "Continue as Guest",
    logging_in: "Logging in...",
    signing_up: "Signing up...",
    login_error: "Login failed. Please check your credentials.",
    signup_error: "Signup failed. Please try again.",
    password_mismatch: "Passwords do not match.",
    email_placeholder: "Enter your email",
    password_placeholder: "Enter your password",
    confirm_password_placeholder: "Confirm your password",
    name_placeholder: "Enter your full name",
    age_placeholder: "Your age",
    religion_placeholder: "Your religion (optional)",
    emergency_name_placeholder: "Contact name",
    emergency_phone_placeholder: "Contact phone",

    // Emergency call
    emergency_call: "Emergency Call",
    dialing: "Dialing...",
    ringing: "Ringing...",
    connected: "Connected",
    call_ended: "Call Ended",

    // Location
    delivery_location: "Delivery Location",
    tap_to_set_location: "Tap to set your delivery address",
    location_detected: "Current location detected: {lat}, {lng}",
    delivery_address_label: "Your orders will be delivered to:",
    change: "Change",
    set: "Set",

    // Religious topics
    hindu_scriptures: "Hindu Scriptures",
    scriptures_description: "Explore Vedas, Upanishads, Bhagavad Gita",
    daily_prayers: "Daily Prayers",
    prayers_description: "Learn mantras and prayer rituals",
    temple_visits: "Temple Visits",
    temple_description: "Find nearby temples and their timings",
    religious_stories: "Religious Stories",
    stories_description: "Listen to stories from mythology",
    festivals: "Festivals & Rituals",
    festivals_description: "Learn about upcoming festivals",
    meditation: "Meditation",
    meditation_description: "Guided spiritual meditation",
    find_temples: "Find Nearby Temples",
    find_temples_near_me: "Find Temples Near Me",
    find_temples_nearby: "Find Temples Nearby",
    nearby_temples: "Nearby Temples",

    // Shopping
    grocery_delivery: "Grocery Delivery",
    grocery_description: "Order groceries from nearby stores",
    food_delivery: "Food Delivery",
    food_description: "Order meals from restaurants",
    pharmacy: "Pharmacy",
    pharmacy_description: "Order medicines and health products",
    online_shopping: "Online Shopping",
    shopping_description: "Shop for clothes, electronics, and more",
    find_restaurants: "Find Food & Restaurants",
    search_food_placeholder: "What would you like to eat?",
    search_results: "Search Results",
  },
  hi: {
    app_name: "सहायक",
    app_tagline: "आपकी दैनिक जरूरतों के लिए आपका मित्र",
    welcome_message: "नमस्ते! मैं आज आपकी कैसे सहायता कर सकता हूँ?",
    settings: "पहुंच सेटिंग्स",
    dark_mode: "डार्क मोड",
    text_size: "टेक्स्ट का आकार",
    contrast: "कंट्रास्ट",
    logout: "लॉगआउट",

    // Mode names
    religious_mode: "धार्मिक साथी",
    wellness_mode: "स्वास्थ्य मार्गदर्शक",
    shopping_mode: "खरीदारी सहायक",
    scheme_mode: "सरकारी योजनाएँ",

    // Mode descriptions
    religious_description: "आध्यात्मिक विषयों, कहानियों और परंपराओं पर चर्चा करें",
    wellness_description: "स्वास्थ्य टिप्स, व्यायाम और दवा रिमाइंडर",
    shopping_description: "किराना, भोजन या अन्य वस्तुएं ऑनलाइन ऑर्डर करें",
    scheme_description: "वरिष्ठ नागरिकों के लिए लाभ और कार्यक्रमों की जानकारी",

    // Religious mode
    religious_companion: "धार्मिक साथी",
    religious_welcome:
      "धार्मिक साथी मोड में आपका स्वागत है। मैं आध्यात्मिक विषयों पर चर्चा करने, धार्मिक कहानियां साझा करने या विश्वास और परंपराओं के बारे में प्रश्नों के उत्तर देने के लिए यहां हूं। आज आप किस बारे में बात करना चाहेंगे?",
    religious_welcome_message:
      "मैं आपको आध्यात्मिक मार्गदर्शन, धार्मिक कहानियों और परंपराओं और प्रथाओं के बारे में जानकारी के साथ मदद कर सकता हूं। आज आप क्या जानना चाहेंगे?",
    religious_user_query: "मुझे दिवाली के महत्व के बारे में बताएं",
    religious_ai_response:
      "दिवाली, रोशनी का त्योहार, अंधकार पर प्रकाश और बुराई पर अच्छाई की जीत का प्रतीक है। यह रावण को हराने के बाद भगवान राम के अयोध्या लौटने का जश्न मनाता है। लोग दीये जलाते हैं, पूजा करते हैं, उपहार देते हैं और परिवार के साथ जश्न मनाते हैं। क्या आप अनुष्ठानों या दिवाली के पीछे की कहानी के बारे में अधिक जानना चाहेंगे?",

    // Wellness mode
    wellness_guide: "स्वास्थ्य मार्गदर्शक",
    wellness_welcome:
      "स्वास्थ्य मोड में आपका स्वागत है। मैं स्वास्थ्य टिप्स, दवा रिमाइंडर, सरल व्यायाम या ध्यान मार्गदर्शन के साथ मदद कर सकता हूं। आज मैं आपके स्वास्थ्य में कैसे सहायता कर सकता हूं?",
    wellness_user_query: "कुछ सरल व्यायाम क्या हैं जो मैं घर पर कर सकता हूं?",
    wellness_ai_response:
      "घर पर कई सरल व्यायाम हैं जो आप कर सकते हैं। कुर्सी योग उत्कृष्ट है - बैठे हुए आगे झुकना और हल्के मोड़ करें। दिन में कई बार 5-10 मिनट के लिए एक ही जगह पर चलना फायदेमंद है। सरल बांह घुमाव और टखने के चक्र रक्त संचार में सुधार करते हैं। क्या आप चाहेंगे कि मैं इनमें से किसी के बारे में अधिक विस्तार से बताऊं?",

    // Shopping mode
    shopping_assistant: "खरीदारी सहायक",
    shopping_welcome:
      "खरीदारी सहायक मोड में आपका स्वागत है। मैं आपको किराना, भोजन या अन्य वस्तुएं ऑनलाइन ऑर्डर करने में मदद कर सकता हूं। आज आप क्या खरीदना चाहेंगे?",
    shopping_welcome_message:
      "मैं आपको किराना, भोजन, दवाइयां या अन्य वस्तुएं ऑनलाइन ऑर्डर करने में मदद कर सकता हूं। आज आप क्या खरीदना चाहेंगे?",
    shopping_user_query: "मैं कुछ किराना सामान ऑर्डर करना चाहता हूं",
    shopping_ai_response_with_location:
      "मैं आपको किराना सामान ऑर्डर करने में मदद करने में खुशी होगी। मैं देख रहा हूं कि आप {location} पर स्थित हैं। क्या आप बिगबास्केट या अमेज़न फ्रेश से ऑर्डर करना चाहेंगे?",
    shopping_ai_response_no_location:
      "मैं आपको किराना सामान ऑर्डर करने में मदद करने में खुशी होगी। क्या आप बिगबास्केट या अमेज़न फ्रेश से ऑर्डर करना चाहेंगे? साथ ही, मुझे आपके डिलीवरी पते की आवश्यकता होगी। क्या यह पिछली बार के समान है (42 लक्ष्मी अपार्टमेंट्स, जयनगर)?",

    // Scheme mode
    scheme_mode_title: "सरकारी योजनाएँ",
    scheme_welcome:
      "सरकारी योजना मोड में आपका स्वागत है। मैं वरिष्ठ नागरिकों के लिए विभिन्न सरकारी कार्यक्रमों और लाभों के बारे में जानकारी प्रदान कर सकता हूं। आप किस बारे में जानना चाहेंगे?",
    scheme_user_query: "वरिष्ठ नागरिकों के लिए पेंशन योजनाओं के बारे में बताएं",
    scheme_ai_response:
      "राष्ट्रीय पेंशन प्रणाली (NPS) और प्रधानमंत्री वय वंदना योजना (PMVVY) वरिष्ठ नागरिकों के लिए उत्कृष्ट योजनाएं हैं। PMVVY 10 वर्षों के लिए 7.4% वार्षिक रिटर्न के साथ गारंटीड पेंशन प्रदान करती है। क्या आप चाहेंगे कि मैं पात्रता मानदंड और आवेदन कैसे करें, इसके बारे में बताऊं?",

    // General
    back_to_home: "आज आप किस प्रकार की सहायता चाहेंगे?",
    default_user_query: "आप मेरी किस प्रकार से मदद कर सकते हैं?",
    default_ai_response:
      "मैं आपकी विभिन्न चीजों में मदद कर सकता हूं! आप मुझसे धार्मिक विषयों, स्वास्थ्य और कल्याण सलाह, किराना या भोजन ऑर्डर करने में मदद, या वरिष्ठ नागरिकों के लिए सरकारी योजनाओं के बारे में जानकारी पूछ सकते हैं। बस एक मोड चुनें या मुझसे कुछ भी पूछें!",

    // Login/Signup
    login: "लॉगिन",
    signup: "साइन अप",
    email: "ईमेल",
    password: "पासवर्ड",
    confirm_password: "पासवर्ड की पुष्टि करें",
    full_name: "पूरा नाम",
    age: "उम्र",
    religion: "धर्म",
    emergency_contact: "आपातकालीन संपर्क",
    continue_as_guest: "अतिथि के रूप में जारी रखें",
    logging_in: "लॉग इन हो रहा है...",
    signing_up: "साइन अप हो रहा है...",
    login_error: "लॉगिन विफल। कृपया अपने क्रेडेंशियल्स की जांच करें।",
    signup_error: "साइन अप विफल। कृपया पुनः प्रयास करें।",
    password_mismatch: "पासवर्ड मेल नहीं खाते।",
    email_placeholder: "अपना ईमेल दर्ज करें",
    password_placeholder: "अपना पासवर्ड दर्ज करें",
    confirm_password_placeholder: "अपने पासवर्ड की पुष्टि करें",
    name_placeholder: "अपना पूरा नाम दर्ज करें",
    age_placeholder: "आपकी उम्र",
    religion_placeholder: "आपका धर्म (वैकल्पिक)",
    emergency_name_placeholder: "संपर्क नाम",
    emergency_phone_placeholder: "संपर्क फोन",

    // Emergency call
    emergency_call: "आपातकालीन कॉल",
    dialing: "डायल कर रहे हैं...",
    ringing: "घंटी बज रही है...",
    connected: "कनेक्ट हो गया",
    call_ended: "कॉल समाप्त",

    // Location
    delivery_location: "डिलीवरी स्थान",
    tap_to_set_location: "अपना डिलीवरी पता सेट करने के लिए टैप करें",
    location_detected: "वर्तमान स्थान का पता चला: {lat}, {lng}",
    delivery_address_label: "आपके ऑर्डर यहां डिलीवर किए जाएंगे:",
    change: "बदलें",
    set: "सेट करें",

    // Religious topics
    hindu_scriptures: "हिंदू शास्त्र",
    scriptures_description: "वेद, उपनिषद, भगवद गीता का अन्वेषण करें",
    daily_prayers: "दैनिक प्रार्थनाएं",
    prayers_description: "मंत्र और प्रार्थना अनुष्ठान सीखें",
    temple_visits: "मंदिर यात्राएं",
    temple_description: "आस-पास के मंदिरों और उनके समय का पता लगाएं",
    religious_stories: "धार्मिक कहानियां",
    stories_description: "पौराणिक कथाओं को सुनें",
    festivals: "त्योहार और अनुष्ठान",
    festivals_description: "आगामी त्योहारों के बारे में जानें",
    meditation: "ध्यान",
    meditation_description: "निर्देशित आध्यात्मिक ध्यान",
    find_temples: "आस-पास के मंदिर खोजें",
    find_temples_near_me: "मेरे पास मंदिर खोजें",
    find_temples_nearby: "आस-पास के मंदिर खोजें",
    nearby_temples: "आस-पास के मंदिर",

    // Shopping
    grocery_delivery: "किराना डिलीवरी",
    grocery_description: "आस-पास के स्टोर्स से किराना ऑर्डर करें",
    food_delivery: "खाना डिलीवरी",
    food_description: "रेस्तरां से भोजन ऑर्डर करें",
    pharmacy: "फार्मेसी",
    pharmacy_description: "दवाइयां और स्वास्थ्य उत्पाद ऑर्डर करें",
    online_shopping: "ऑनलाइन खरीदारी",
    shopping_description: "कपड़े, इलेक्ट्रॉनिक्स और अधिक खरीदें",
    find_restaurants: "भोजन और रेस्तरां खोजें",
    search_food_placeholder: "आप क्या खाना चाहेंगे?",
    search_results: "खोज परिणाम",
  },
  // Add more languages as needed
}

// Create a context for translations
const TranslationContext = createContext<{
  t: (key: string, params?: Record<string, string>) => string
  language: string
  setLanguage: (lang: string) => void
}>({
  t: () => "",
  language: "en",
  setLanguage: () => {},
})

// Translation provider component
export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState("en")

  // Function to get translation
  const t = (key: string, params?: Record<string, string>) => {
    const translation = translations[language]?.[key] || translations.en[key] || key

    if (params) {
      return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(`{${key}}`, value)
      }, translation)
    }

    return translation
  }

  return <TranslationContext.Provider value={{ t, language, setLanguage }}>{children}</TranslationContext.Provider>
}

// Hook to use translations
export const useTranslation = () => {
  const context = useContext(TranslationContext)

  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }

  return context
}

// Default export for direct import
export default useTranslation

