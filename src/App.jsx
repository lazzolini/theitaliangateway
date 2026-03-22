import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ARTICLES from "./articles.js";

const C = {
  bg: "#0A0E17", card: "#111827", cardHover: "#1a2332",
  gold: "#C9A96E", goldLight: "#E8D5A8", goldDim: "#8B7542",
  text: "#E5E7EB", textDim: "#9CA3AF", white: "#FFFFFF",
  accent: "#1B3A5C", border: "#1F2937",
};

// Replace with your Formspree form ID after creating account at formspree.io
const FORM_ID = "xbdzzepp";
const FORM_URL = "https://formspree.io/f/" + FORM_ID;

async function submitForm(data) {
  try {
    await fetch(FORM_URL, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
    return true;
  } catch (e) { return false; }
}

const VERTICALS = [
  { id: "banking", icon: "🏦", title: "Private Banking", tagline: "Your wealth, properly introduced",
    desc: "We open the doors to Italy's most exclusive private banks and wealth managers. From account opening to family office coordination, we ensure your assets are managed by the right people.",
    subservices: [
      { title: "Account Opening", desc: "Priority access to top-tier Italian and Swiss private banks. We handle documentation, compliance, and introductions to senior relationship managers.", icon: "🔑" },
      { title: "Wealth Advisory Introductions", desc: "Curated introductions to independent wealth advisors, multi-family offices, and asset managers specializing in international clients.", icon: "💼" },
      { title: "Family Office Coordination", desc: "Seamless coordination between your existing advisors and new Italian banking relationships. We bridge time zones, languages, and regulatory frameworks.", icon: "🏛️" },
      { title: "Corporate Banking", desc: "Business account setup for Italian entities, trade finance, and treasury management for entrepreneurs relocating operations.", icon: "📊" },
      { title: "Real Estate Financing", desc: "Mortgage introductions at preferential rates through our banking partners. LTV up to 70% for non-residents.", icon: "🏠" },
    ],
    qualifyFields: [
      { label: "Approximate assets under management", options: ["€1M - €5M", "€5M - €15M", "€15M - €50M", "€50M+"] },
      { label: "Primary banking need", options: ["Personal banking", "Corporate banking", "Wealth management", "All of the above"] },
      { label: "Timeline", options: ["Immediate", "Within 3 months", "Within 6 months", "Exploring options"] },
    ]
  },
  { id: "tax", icon: "⚖️", title: "Tax & Legal", tagline: "Structured for certainty",
    desc: "Italy's flat tax regime is one of the most attractive in Europe for HNWI. We ensure you benefit from every advantage while remaining fully compliant across jurisdictions.",
    subservices: [
      { title: "Flat Tax Application", desc: "End-to-end management of Italy's €200K flat tax regime. Eligibility assessment, application filing, and annual compliance.", icon: "📋" },
      { title: "Cross-Border Succession", desc: "Inheritance structuring for families across 2-3+ countries. Coordination between Italian, UK, Swiss, US, and UAE advisors to minimize exposure.", icon: "🔗" },
      { title: "Trust & Holding Setup", desc: "Italian and international trust structures, Luxembourg holdings, and patrimony vehicles optimized for your asset profile.", icon: "🏛️" },
      { title: "Corporate Structuring", desc: "Italian SRL, branch offices, and EU holding companies. VAT registration, transfer pricing, and permanent establishment advisory.", icon: "📊" },
      { title: "7% Retiree Flat Tax", desc: "Dedicated service for retirees qualifying for the 7% flat tax in Southern Italian municipalities. Location scouting and application management.", icon: "🌴" },
      { title: "Exit Tax Advisory", desc: "Managing tax implications of leaving your current country. Exit tax planning for UK, US, Switzerland, and UAE departures.", icon: "✈️" },
    ],
    qualifyFields: [
      { label: "Current tax residence", options: ["United Kingdom", "United States", "Switzerland", "UAE / Dubai", "Other EU", "Other"] },
      { label: "Primary interest", options: ["€200K flat tax", "7% retiree tax", "Corporate structuring", "Succession planning", "General advisory"] },
      { label: "Annual foreign income range", options: ["€500K - €2M", "€2M - €5M", "€5M - €10M", "€10M+"] },
    ]
  },
  { id: "realestate", icon: "🏠", title: "Real Estate", tagline: "From search to keys in hand",
    desc: "We find, negotiate, and manage the acquisition of exceptional properties across Milan, Lake Como, Tuscany, and the Amalfi Coast. Off-market access, due diligence, and renovation management included.",
    subservices: [
      { title: "Property Search", desc: "Curated selection based on your lifestyle, budget, and location preferences. Access to off-market properties through our network of exclusive agents.", icon: "🔍" },
      { title: "Due Diligence", desc: "Full legal, structural, and urban planning checks. Title verification, zoning compliance, and environmental assessments.", icon: "📋" },
      { title: "Negotiation & Acquisition", desc: "Expert negotiation on your behalf. We typically save clients 8-15% on asking price. Full transaction management through to notary.", icon: "🤝" },
      { title: "Renovation Management", desc: "Architect coordination, contractor vetting, project management, and interior design for properties requiring work. Budget and timeline guarantees.", icon: "🔨" },
      { title: "Property Management", desc: "Year-round property management for absentee owners. Maintenance, security, staff coordination, and rental management.", icon: "🏡" },
      { title: "Investment Properties", desc: "Short-term rental opportunities, commercial properties, and development projects with projected yields and management packages.", icon: "📈" },
    ],
    qualifyFields: [
      { label: "Preferred location", options: ["Milan city", "Lake Como", "Tuscany", "Amalfi Coast", "Multiple / undecided"] },
      { label: "Budget range", options: ["€1M - €3M", "€3M - €7M", "€7M - €15M", "€15M+"] },
      { label: "Property type", options: ["Apartment / Penthouse", "Villa", "Farmhouse / Estate", "Commercial", "Multiple"] },
      { label: "Purpose", options: ["Primary residence", "Second home", "Investment", "Primary + investment"] },
    ]
  },
  { id: "healthcare", icon: "🏥", title: "Healthcare", tagline: "World-class care, personally arranged",
    desc: "Italy ranks #2 in the WHO healthcare rankings. We connect you to the best private physicians, hospitals, and specialists — all English-speaking, all vetted.",
    subservices: [
      { title: "Private GP on Retainer", desc: "English-speaking general practitioner available for house calls, same-day appointments, and ongoing health management. Family coverage available.", icon: "👨‍⚕️" },
      { title: "Hospital VIP Access", desc: "Priority access to San Raffaele, Humanitas, IEO, and other top institutions. Dedicated patient coordinators and private suites.", icon: "🏥" },
      { title: "Specialist Referrals", desc: "Fast-track referrals to Italy's best specialists across cardiology, oncology, orthopedics, dermatology, and more.", icon: "🔬" },
      { title: "Health Insurance", desc: "International health insurance comparison and placement. We work with Bupa, Cigna, Allianz, and Italian providers to find optimal coverage.", icon: "🛡️" },
      { title: "Home Care Coordination", desc: "Private nursing, physiotherapy, and elderly care at home. Vetted professionals, employment contracts, and ongoing management.", icon: "🏠" },
      { title: "Medical Concierge for Visitors", desc: "Healthcare coordination for visiting family and guests. Emergency protocols, pharmacy guidance, and specialist access during their stay.", icon: "✈️" },
    ],
    qualifyFields: [
      { label: "Family size requiring healthcare", options: ["Individual", "Couple", "Family (3-4)", "Extended family (5+)"] },
      { label: "Priority healthcare need", options: ["General practitioner", "Specialist care", "Insurance setup", "Elderly / home care", "Full package"] },
      { label: "Any specific medical conditions?", options: ["No", "Yes, prefer to discuss privately"] },
    ]
  },
  { id: "education", icon: "🎓", title: "Education", tagline: "The right school changes everything",
    desc: "Milan has 6+ international schools with different curricula and cultures. We match your children to the right school, manage applications, and ensure a smooth transition.",
    subservices: [
      { title: "School Assessment & Matching", desc: "We evaluate your children's needs, learning style, and your family's priorities to recommend the 2-3 best-fit schools from IB, British, and American curricula.", icon: "📚" },
      { title: "Application Management", desc: "Full application support including document preparation, entrance exam coaching, interview preparation, and waitlist management.", icon: "📝" },
      { title: "Campus Tours", desc: "Private guided tours of shortlisted schools. Meet heads of school, department leads, and current parent ambassadors.", icon: "🏫" },
      { title: "Transition Support", desc: "Academic gap analysis, tutoring arrangements, language support (Italian lessons), and social integration guidance for children adjusting to a new country.", icon: "🌍" },
      { title: "University Guidance", desc: "For older students: Bocconi, Politecnico, and international university placement. Portfolio review, application strategy, and interview prep.", icon: "🎓" },
    ],
    qualifyFields: [
      { label: "Number of children", options: ["1", "2", "3+"] },
      { label: "Age range", options: ["Pre-school (2-5)", "Primary (6-10)", "Secondary (11-14)", "High school (15-18)", "Multiple ages"] },
      { label: "Preferred curriculum", options: ["IB (International Baccalaureate)", "British", "American", "No preference / need guidance"] },
    ]
  },
  { id: "immigration", icon: "🛂", title: "Immigration", tagline: "Residency without the red tape",
    desc: "Italian bureaucracy is notorious. We cut through it. Residence permits, golden visa, citizenship pathways — all managed end-to-end with dedicated legal support.",
    subservices: [
      { title: "Elective Residency Permit", desc: "For retirees and those with passive income. Full application management, documentation, and Questura appointments.", icon: "📋" },
      { title: "Golden Visa (Investor Visa)", desc: "€250K-€2M investment pathways. Government bond, venture capital, or philanthropic donation routes. Application to approval in 3-6 months.", icon: "🏅" },
      { title: "EU Blue Card", desc: "For highly qualified professionals. Employer sponsorship coordination, salary threshold verification, and family reunification.", icon: "💳" },
      { title: "Self-Employment Visa", desc: "For entrepreneurs, freelancers, and digital nomads establishing a business presence in Italy.", icon: "💻" },
      { title: "Citizenship Pathway", desc: "Italian citizenship through residency (10 years standard, 4 years for EU citizens), descent (jure sanguinis), or marriage.", icon: "🇮🇹" },
      { title: "Codice Fiscale & Bureaucracy", desc: "Tax code, health card, driving license conversion, utility setup, and all the administrative tasks that consume weeks if done alone.", icon: "📄" },
    ],
    qualifyFields: [
      { label: "Current nationality", options: ["UK", "US", "EU", "GCC / Middle East", "Other"] },
      { label: "Immigration pathway", options: ["Elective residency", "Golden visa", "Work permit / Blue Card", "Self-employment", "Not sure yet"] },
      { label: "Timeline for move", options: ["Already in Italy", "Within 3 months", "Within 6 months", "Within 12 months", "Planning ahead"] },
    ]
  },
  { id: "yachting", icon: "⛵", title: "Yachting & Marina", tagline: "The Mediterranean, your way",
    desc: "From berth acquisition to full yacht management, we handle everything for yacht owners and charterers in the Italian Riviera, Sardinia, Amalfi Coast, and Sicily.",
    subservices: [
      { title: "Berth Acquisition", desc: "Secure premium berths in Portofino, Porto Cervo, Capri, Amalfi, and Sanremo. Long-term contracts and seasonal reservations at the most sought-after marinas.", icon: "⚓" },
      { title: "Yacht Registration", desc: "Italian and EU flag registration. RINA certification, safety compliance, and all documentation for commercial and private vessels up to 80m+.", icon: "🏳️" },
      { title: "Crew Management", desc: "Captain, engineer, steward, and chef recruitment. Employment contracts under Italian maritime law, payroll, and crew rotation management.", icon: "👨‍✈️" },
      { title: "Yacht Charter Arrangements", desc: "Access to premium charter yachts across the Mediterranean. Curated itineraries from the Aeolian Islands to the French Riviera.", icon: "🗺️" },
      { title: "Maintenance & Refit", desc: "Coordination with Italian shipyards for annual maintenance, winter storage, and full refit projects. Budget management and quality oversight.", icon: "🔧" },
      { title: "Provisioning & Concierge", desc: "Gourmet provisioning, restaurant reservations at coastal Michelin stars, helicopter transfers to shore, and VIP event access along the coast.", icon: "🍾" },
    ],
    qualifyFields: [
      { label: "Yacht ownership status", options: ["Own a yacht", "Looking to purchase", "Charter only", "Considering ownership"] },
      { label: "Yacht size (LOA)", options: ["Under 20m", "20m - 40m", "40m - 60m", "60m+", "Not applicable (charter)"] },
      { label: "Primary cruising area", options: ["Italian Riviera / Portofino", "Sardinia / Costa Smeralda", "Amalfi Coast / Capri", "Sicily / Aeolian Islands", "Multiple areas"] },
      { label: "Services needed", options: ["Berth only", "Full management", "Charter arrangement", "Registration & compliance", "Everything"] },
    ]
  },
];

const TIERS = [
  { name: "Essential", setup: "€5,000", monthly: "€500/mo", features: ["Tax optimization assessment", "1 private banking introduction", "Property search (5 viewings)", "School placement guidance", "Email support"] },
  { name: "Premium", setup: "€10,000", monthly: "€1,500/mo", popular: true, features: ["Everything in Essential", "Full fiscal structuring", "3 banking introductions", "Dedicated property negotiation", "Health concierge & GP setup", "Immigration management", "Staff recruitment coordination"] },
  { name: "Family Office", setup: "€25,000", monthly: "€3,000/mo", features: ["Everything in Premium", "Family office coordination", "Cross-border succession planning", "Corporate setup Italy/EU", "Domestic staff vetting & management", "Property security & maintenance", "Yachting & marina services", "Transport logistics (jet card, helicopter)", "24/7 dedicated contact"] },
];

const QUIZ_QUESTIONS = [
  { q: "What is your ideal weekend?", opts: [
    { text: "Sailing on the lake, dinner at a lakeside restaurant", score: { como: 3, tuscany: 0, amalfi: 1, milan: 0 } },
    { text: "Wine tasting and a long lunch in the countryside", score: { como: 0, tuscany: 3, amalfi: 1, milan: 0 } },
    { text: "Art gallery, opera, then cocktails at a rooftop bar", score: { como: 0, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "Morning swim in the sea, afternoon exploring a cliffside village", score: { como: 0, tuscany: 1, amalfi: 3, milan: 0 } },
  ]},
  { q: "How important is proximity to an international airport?", opts: [
    { text: "Essential — I travel every week", score: { como: 1, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "Important — monthly flights", score: { como: 2, tuscany: 1, amalfi: 0, milan: 2 } },
    { text: "Nice to have, but not critical", score: { como: 1, tuscany: 2, amalfi: 1, milan: 0 } },
    { text: "I am here to slow down", score: { como: 1, tuscany: 3, amalfi: 2, milan: 0 } },
  ]},
  { q: "Your ideal home is:", opts: [
    { text: "A historic villa with lake views and a private dock", score: { como: 3, tuscany: 0, amalfi: 1, milan: 0 } },
    { text: "A restored farmhouse with olive groves and vineyards", score: { como: 0, tuscany: 3, amalfi: 0, milan: 0 } },
    { text: "A modern penthouse with skyline views", score: { como: 0, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "A cliffside villa overlooking the Mediterranean", score: { como: 0, tuscany: 0, amalfi: 3, milan: 0 } },
  ]},
  { q: "What matters most for your daily life?", opts: [
    { text: "World-class healthcare nearby", score: { como: 1, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "Nature, space, and tranquility", score: { como: 2, tuscany: 3, amalfi: 1, milan: 0 } },
    { text: "Culture, restaurants, social life", score: { como: 1, tuscany: 1, amalfi: 1, milan: 3 } },
    { text: "Year-round warm climate", score: { como: 0, tuscany: 1, amalfi: 3, milan: 0 } },
  ]},
  { q: "Your social style is:", opts: [
    { text: "Intimate dinners with a close circle", score: { como: 3, tuscany: 2, amalfi: 1, milan: 0 } },
    { text: "Hosting friends at my country estate", score: { como: 1, tuscany: 3, amalfi: 1, milan: 0 } },
    { text: "Gallery openings, business clubs, networking", score: { como: 0, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "Beach clubs and summer parties", score: { como: 0, tuscany: 0, amalfi: 3, milan: 1 } },
  ]},
  { q: "How do you feel about winter?", opts: [
    { text: "Love it — skiing is 30 minutes away", score: { como: 3, tuscany: 0, amalfi: 0, milan: 2 } },
    { text: "Cozy fireplaces, truffle season, quiet evenings", score: { como: 1, tuscany: 3, amalfi: 0, milan: 0 } },
    { text: "I prefer mild winters year-round", score: { como: 0, tuscany: 1, amalfi: 3, milan: 0 } },
    { text: "I escape to warmer places when it gets cold", score: { como: 0, tuscany: 0, amalfi: 1, milan: 3 } },
  ]},
  { q: "Budget for a primary residence?", opts: [
    { text: "1M - 3M euro", score: { como: 1, tuscany: 2, amalfi: 1, milan: 3 } },
    { text: "3M - 7M euro", score: { como: 2, tuscany: 3, amalfi: 2, milan: 2 } },
    { text: "7M - 15M euro", score: { como: 3, tuscany: 2, amalfi: 3, milan: 1 } },
    { text: "15M+ euro", score: { como: 3, tuscany: 2, amalfi: 2, milan: 1 } },
  ]},
  { q: "Do you have school-age children?", opts: [
    { text: "Yes — international school is essential", score: { como: 0, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "Yes, but boarding school works", score: { como: 2, tuscany: 2, amalfi: 1, milan: 1 } },
    { text: "No, grown up", score: { como: 2, tuscany: 2, amalfi: 2, milan: 1 } },
    { text: "No children", score: { como: 2, tuscany: 2, amalfi: 2, milan: 1 } },
  ]},
  { q: "How do you want to get around?", opts: [
    { text: "Boat", score: { como: 3, tuscany: 0, amalfi: 2, milan: 0 } },
    { text: "My car through rolling hills", score: { como: 1, tuscany: 3, amalfi: 1, milan: 0 } },
    { text: "Walking — everything within reach", score: { como: 0, tuscany: 0, amalfi: 1, milan: 3 } },
    { text: "Private driver", score: { como: 2, tuscany: 2, amalfi: 2, milan: 1 } },
  ]},
  { q: "What will make you feel truly at home?", opts: [
    { text: "Waking up to mountains reflected in still water", score: { como: 3, tuscany: 0, amalfi: 0, milan: 0 } },
    { text: "The smell of cypress trees and morning espresso on the terrace", score: { como: 0, tuscany: 3, amalfi: 1, milan: 0 } },
    { text: "The energy of a world-class city at my doorstep", score: { como: 0, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "The sound of waves and the warmth of the Mediterranean sun", score: { como: 0, tuscany: 0, amalfi: 3, milan: 0 } },
  ]},
];

const QUIZ_RESULTS = {
  como: { title: "Lake Como", emoji: "🏔", subtitle: "Elegant, discreet, timeless", desc: "You are drawn to understated luxury and natural beauty. Lake Como offers the perfect blend of privacy, proximity to Milan and Switzerland, and a social scene that values quality over quantity.", highlights: ["45 min to Milan Malpensa", "2.5 hours to Zurich", "Skiing in 30 minutes", "World-class hospitals in Milan"] },
  tuscany: { title: "Tuscany", emoji: "🍷", subtitle: "Space, soul, and the slow life", desc: "You want room to breathe, land to call your own, and a rhythm of life dictated by seasons, not schedules. Tuscany delivers with rolling hills, world-famous wine, and a community of like-minded international residents.", highlights: ["Florence airport 30 min", "Wine culture and gastronomy", "Strong expat community", "7% retiree flat tax eligible"] },
  amalfi: { title: "Amalfi Coast", emoji: "🌊", subtitle: "Drama, warmth, and la dolce vita", desc: "You crave the Mediterranean at its most spectacular. The Amalfi Coast offers dramatic cliffs, year-round warmth, and a glamorous lifestyle from Positano to Ravello.", highlights: ["Warm year-round", "Naples airport 1.5 hours", "Capri by boat", "7% retiree flat tax eligible"] },
  milan: { title: "Milan", emoji: "🏙", subtitle: "Culture, commerce, and connectivity", desc: "You want a world-class city that happens to be in Italy. Milan gives you La Scala, Michelin-starred restaurants, three airports, the best hospitals, and the best schools, all walkable.", highlights: ["3 international airports", "Top healthcare", "6+ international schools", "Direct trains everywhere"] },
};

const LOCATIONS = [
  { id: 1, title: "Lake Como", sub: "Lombardy — 50 min from Milan Malpensa", tag: "Lakefront Living",
    img: "https://images.unsplash.com/photo-1559666126-84f389727b9a?w=800&q=80&fit=crop&crop=center",
    highlights: ["45 min to Milan", "Skiing in 1 hour", "Privacy & discretion", "International community"],
    property: "Lakefront villas €3M–50M+. Hillside homes €800K–8M. Apartments in Bellagio/Varenna €400K–2M. €5,000–20,000/sqm lakefront.",
    lifestyle: "The most discreet luxury destination in Europe. George Clooney, Richard Branson, and the Versace family chose Como for a reason: unmatched natural beauty, absolute privacy, and easy access to Milan, Switzerland, and the Alps. The social scene revolves around sailing clubs, private dinners, and the Grand Hotel Tremezzo.",
    climate: "Mild microclimate. Summers 25–30°C, winters 2–8°C. Protected by Alps from northern winds. Gardens bloom year-round." },
  { id: 2, title: "Milan", sub: "Lombardy — Italy's financial and fashion capital", tag: "Urban Luxury",
    img: "https://images.unsplash.com/photo-1520440229-6469a149ac59?w=800&q=80&fit=crop&crop=center",
    highlights: ["3 international airports", "6+ international schools", "Top hospitals (San Raffaele, Humanitas)", "La Scala, Brera, Quadrilatero"],
    property: "Porta Nuova/CityLife penthouses €10,000–15,000/sqm. Brera/Magenta €6,000–12,000/sqm. Peripheral luxury €3,000–6,000/sqm. New-build penthouses with skyline views from €2M.",
    lifestyle: "Milan is where Italy meets the world. Michelin-starred restaurants, La Scala opera, global fashion weeks, and Serie A football. A HNWI in Milan has everything walkable: private banking in Piazza Affari, shopping in Montenapoleone, aperitivo in Brera. The city has transformed in the past decade with Porta Nuova and CityLife redefining the skyline.",
    climate: "Continental climate. Hot summers (30–35°C), cold winters (0–5°C). Fog in November–January. Best months: April–June, September–October." },
  { id: 3, title: "Tuscany — Chianti & Val d'Orcia", sub: "Between Florence and Siena", tag: "Wine & Estate Country",
    img: "https://images.unsplash.com/photo-1543429258-53901c6e1576?w=800&q=80&fit=crop&crop=center",
    highlights: ["Florence airport 30 min", "UNESCO landscape", "World-class wine", "7% retiree flat tax eligible"],
    property: "Restored farmhouses (casali) €1.5M–10M. Wine estates with vineyards €3M–25M. Hilltop villas €2M–8M. Val d'Orcia estates with agritourismo potential yield 4–6%.",
    lifestyle: "The Tuscan dream is real: cypress-lined roads, medieval hilltop towns, and the world's best wine at your doorstep. Chianti Classico and Val d'Orcia attract buyers who want land, space, and a rhythm of life dictated by seasons. Strong international community, especially British and American expats. Excellent local food culture.",
    climate: "Mediterranean-continental. Warm summers (28–35°C), mild winters (4–10°C). 250+ sunny days/year. Harvest season (Sep–Oct) is magical." },
  { id: 4, title: "Amalfi Coast", sub: "Campania — Positano, Ravello, Amalfi", tag: "Mediterranean Drama",
    img: "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&q=80&fit=crop&crop=center",
    highlights: ["Year-round warmth", "Naples airport 90 min", "Capri by boat 30 min", "7% retiree flat tax eligible"],
    property: "Cliffside villas with sea terraces €3M–20M+. Ravello (elevated, panoramic) tends to be quieter and more spacious. Positano is iconic but access is challenging. Praiano offers a balance of views and accessibility.",
    lifestyle: "The most dramatic coastline in the Mediterranean. Life revolves around the sea: morning coffee watching fishing boats, lunch at a cliffside restaurant, sunset from a private terrace above the Tyrrhenian. The social scene peaks May–September. Off-season is quieter, locals-only, and deeply authentic.",
    climate: "Mild year-round. Summers 28–32°C, winters 8–14°C. Swimming possible April–November. 300+ sunny days." },
  { id: 5, title: "Sardinia — Costa Smeralda", sub: "Gallura — Porto Cervo, Porto Rotondo", tag: "Beach & Marina",
    img: "https://images.unsplash.com/photo-1580139898410-d7b7e3cae5a1?w=800&q=80&fit=crop&crop=center",
    highlights: ["Olbia airport (direct flights EU-wide)", "World-class marinas", "Crystal-clear beaches", "Peak social season June–Sep"],
    property: "Villas near Yacht Club Costa Smeralda from €5M. Porto Cervo center from €8M. Porto Rotondo slightly lower at €2M–8M. Many buyers combine a Sardinia summer villa with a Milan or Como primary residence.",
    lifestyle: "Italy's most exclusive summer playground. Porto Cervo's Yacht Club hosts the Rolex Cup and the Loro Piana Superyacht Regatta. Days are spent on private beaches, evenings at open-air restaurants. The season is short (June–September) but intense. Off-season, Sardinia is raw, wild, and empty.",
    climate: "Hot dry summers (30–38°C), mild winters (8–15°C). Best beaches in Europe. Mistral wind keeps summers bearable." },
  { id: 6, title: "Italian Riviera — Portofino & Liguria", sub: "Between Genoa and La Spezia", tag: "Yachting & Glamour",
    img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80&fit=crop&crop=center",
    highlights: ["Genoa airport 40 min", "Santa Margherita marina", "Cinque Terre nearby", "Year-round mild climate"],
    property: "Portofino itself has almost no inventory — properties rarely come to market and start at €5M for modest apartments. Santa Margherita Ligure and Rapallo offer better value at €4,000–10,000/sqm. Hilltop villas with sea views €2M–15M.",
    lifestyle: "Portofino is the most photographed harbor in Italy. The piazzetta, the yacht-filled harbor, the faded pastel buildings — it's a living postcard. But beyond the glamour, the Ligurian coast offers hiking (Cinque Terre), exceptional seafood (pesto was born here), and a relaxed elegance that feels effortless. Genoa, 30 minutes away, is Italy's most underrated city.",
    climate: "Mediterranean. Mild year-round (winters 6–12°C, summers 26–30°C). Protected by mountains. Best microclimate in Northern Italy." },
];

const COL_CITIES = [
  { name: "London", flag: "🇬🇧", villa: 180000, staff: 85000, health: 35000, dining: 48000, school: 45000, tax: 0.45 },
  { name: "New York", flag: "🇺🇸", villa: 200000, staff: 95000, health: 45000, dining: 55000, school: 60000, tax: 0.519 },
  { name: "Geneva", flag: "🇨🇭", villa: 150000, staff: 110000, health: 30000, dining: 52000, school: 42000, tax: 0.40 },
  { name: "Dubai", flag: "🇦🇪", villa: 120000, staff: 35000, health: 35000, dining: 42000, school: 40000, tax: 0 },
  { name: "Singapore", flag: "🇸🇬", villa: 140000, staff: 25000, health: 28000, dining: 38000, school: 38000, tax: 0.22 },
  { name: "Paris", flag: "🇫🇷", villa: 160000, staff: 75000, health: 20000, dining: 45000, school: 40000, tax: 0.45 },
];
const MILAN = { villa: 72000, staff: 30000, health: 15000, dining: 25000, school: 25000, tax: 200000 };

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect(); } }, { threshold: 0.1 }); obs.observe(el); return () => obs.disconnect(); }, [delay]);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>{children}</div>;
}

function MobileStyles() {
  return <style>{`
    html{scroll-behavior:smooth}
    *{-webkit-tap-highlight-color:transparent}
    select{-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239CA3AF' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px !important}
    input::placeholder{color:#6B7280}
    img{-webkit-user-drag:none}
    @media(max-width:768px){
      .nav-links{display:none !important}
      .nav-burger{display:flex !important}
      .mob-menu{display:flex !important}
      .grid-2col{grid-template-columns:1fr !important}
      .form-grid{grid-template-columns:1fr !important}
      .footer-grid{flex-direction:column !important;gap:24px !important}
      .stats-row{gap:24px !important}
      .loc-row{flex-direction:column !important}
      .loc-img{max-width:100% !important;min-height:200px !important}
      .loc-body{padding:20px 20px 24px !important}
    }
    @media(min-width:769px){
      .nav-burger{display:none !important}
      .mob-menu{display:none !important}
    }
  `}</style>;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const h = () => setShow(window.scrollY > 600); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  if (!show) return null;
  return <button onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top"
    style={{ position:"fixed",bottom:32,right:32,zIndex:40,width:44,height:44,borderRadius:"50%",background:C.gold,color:C.bg,border:"none",fontSize:18,cursor:"pointer",boxShadow:"0 4px 12px rgba(0,0,0,0.3)",transition:"opacity 0.3s,transform 0.3s",opacity:show?1:0,transform:show?"translateY(0)":"translateY(20px)",display:"flex",alignItems:"center",justifyContent:"center" }}>↑</button>;
}

function Nav({ setPage }) {
  const [sc, setSc] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const go = t => { setMob(false); setPage(t); };
  const links = [["Services","services"],["Guides","guides"],["Quiz","quiz"],["Locations","properties"],["Plans","plans"],["Contact","contact"]];
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:50,background:sc||mob?"rgba(10,14,23,0.97)":"transparent",backdropFilter:sc?"blur(12px)":"none",borderBottom:sc||mob?("1px solid "+C.border):"none",transition:"all 0.3s" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ cursor:"pointer",display:"flex",alignItems:"baseline",gap:6 }} onClick={() => { setPage("home"); window.scrollTo(0,0); setMob(false); }}>
          <span style={{ fontFamily:"Georgia,serif",fontSize:22,color:C.gold,fontWeight:400,letterSpacing:1 }}>THE ITALIAN</span>
          <span style={{ fontFamily:"Georgia,serif",fontSize:22,color:C.white,fontWeight:400,letterSpacing:1,marginLeft:6 }}>GATEWAY</span>
        </div>
        <div className="nav-links" style={{ display:"flex",gap:24,alignItems:"center" }}>
          {links.map(([l,t]) =>
            <span key={t} onClick={() => go(t)} style={{ color:C.textDim,fontSize:14,cursor:"pointer",letterSpacing:1,transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.textDim}>{l}</span>
          )}
          <button onClick={() => go("contact")} style={{ background:C.gold,color:C.bg,padding:"10px 24px",border:"none",fontSize:13,fontWeight:600,letterSpacing:1,cursor:"pointer" }}>BOOK A CALL</button>
        </div>
        <div className="nav-burger" onClick={() => setMob(!mob)} style={{ display:"none",flexDirection:"column",gap:5,cursor:"pointer",padding:8 }}>
          <div style={{ width:24,height:2,background:mob?C.gold:C.textDim,transition:"all 0.3s",transform:mob?"rotate(45deg) translateY(7px)":"none" }}/>
          <div style={{ width:24,height:2,background:mob?C.gold:C.textDim,transition:"all 0.3s",opacity:mob?0:1 }}/>
          <div style={{ width:24,height:2,background:mob?C.gold:C.textDim,transition:"all 0.3s",transform:mob?"rotate(-45deg) translateY(-7px)":"none" }}/>
        </div>
      </div>
      {mob && <div className="mob-menu" style={{ display:"flex",flexDirection:"column",padding:"8px 24px 24px",gap:0,borderTop:"1px solid "+C.border }}>
        {links.map(([l,t]) => <span key={t} onClick={() => go(t)} style={{ color:C.textDim,fontSize:16,cursor:"pointer",padding:"14px 0",borderBottom:"1px solid "+C.border,letterSpacing:1 }}>{l}</span>)}
        <button onClick={() => go("contact")} style={{ background:C.gold,color:C.bg,padding:"14px 24px",border:"none",fontSize:14,fontWeight:600,letterSpacing:1,cursor:"pointer",marginTop:16,width:"100%" }}>BOOK A CALL</button>
      </div>}
    </nav>
  );
}

function Hero({ setPage }) {
  return (
    <section style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",background:"linear-gradient(160deg,"+C.bg+" 0%,#0d1423 50%,#111827 100%)" }}>
      <div style={{ position:"absolute",inset:0,opacity:0.04,backgroundImage:"radial-gradient(circle at 25% 25%,#C9A96E 1px,transparent 1px)",backgroundSize:"60px 60px" }}/>
      <div style={{ position:"relative",textAlign:"center",maxWidth:800,padding:"120px 24px 80px" }}>
        <FadeIn><div style={{ fontSize:13,color:C.gold,letterSpacing:6,textTransform:"uppercase",marginBottom:32 }}>Premium Relocation Advisory</div></FadeIn>
        <FadeIn delay={150}><h1 style={{ fontFamily:"Georgia,serif",fontSize:"clamp(36px,6vw,64px)",color:C.white,fontWeight:400,lineHeight:1.15,margin:"0 0 24px" }}>Your gateway to<br/><span style={{ color:C.gold }}>Italian living</span></h1></FadeIn>
        <FadeIn delay={300}><p style={{ color:C.textDim,fontSize:18,lineHeight:1.7,maxWidth:600,margin:"0 auto 48px" }}>We guide high-net-worth individuals and families to their ideal life in Italy. Tax optimization, private banking, real estate, healthcare, education, yachting, and domestic staff — all through a single, confidential point of contact.</p></FadeIn>
        <FadeIn delay={450}><div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap" }}>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })} style={{ background:C.gold,color:C.bg,padding:"16px 40px",border:"none",fontSize:14,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>BOOK A CALL</button>
          <button onClick={() => { setPage("quiz"); window.scrollTo(0,0); }} style={{ background:"transparent",color:C.gold,padding:"16px 40px",border:"1px solid "+C.gold,fontSize:14,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>TAKE THE QUIZ</button>
        </div></FadeIn>
        <FadeIn delay={600}><div className="stats-row" style={{ display:"flex",gap:48,justifyContent:"center",marginTop:64,flexWrap:"wrap" }}>
          {[["€200K","Annual flat tax"],["15 yrs","Tax certainty"],["#2 WHO","Healthcare ranking"]].map(([n,l]) =>
            <div key={n} style={{ textAlign:"center" }}><div style={{ fontFamily:"Georgia,serif",fontSize:32,color:C.gold }}>{n}</div><div style={{ color:C.textDim,fontSize:12,letterSpacing:2,marginTop:4,textTransform:"uppercase" }}>{l}</div></div>
          )}
        </div></FadeIn>
      </div>
    </section>
  );
}

function ServicesGrid({ setPage }) {
  return (
    <section id="services" style={{ padding:"100px 24px",maxWidth:1200,margin:"0 auto" }}>
      <FadeIn><div style={{ textAlign:"center",marginBottom:64 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>What We Do</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,fontWeight:400 }}>Seven verticals, one point of contact</h2><p style={{ color:C.textDim,fontSize:15,marginTop:12 }}>Click any service to explore what we offer</p></div></FadeIn>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24 }}>
        {VERTICALS.map((v,i) => <FadeIn key={v.id} delay={i*80}><div onClick={() => {setPage("v-"+v.id);window.scrollTo(0,0)}} style={{ background:C.card,border:"1px solid "+C.border,padding:32,transition:"all 0.3s",height:"100%",cursor:"pointer" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.background=C.cardHover;e.currentTarget.style.transform="translateY(-4px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card;e.currentTarget.style.transform="translateY(0)"}}>
          <div style={{ fontSize:32,marginBottom:16 }}>{v.icon}</div>
          <h3 style={{ fontFamily:"Georgia,serif",fontSize:20,color:C.white,fontWeight:400,marginBottom:4 }}>{v.title}</h3>
          <p style={{ color:C.gold,fontSize:13,fontStyle:"italic",marginBottom:12 }}>{v.tagline}</p>
          <p style={{ color:C.textDim,fontSize:14,lineHeight:1.6,margin:0 }}>{v.subservices.length} specialized services →</p>
        </div></FadeIn>)}
      </div>
    </section>
  );
}

function VerticalPage({ id, setPage }) {
  const v = VERTICALS.find(x => x.id === id);
  if (!v) return null;
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setSending(true);
    await submitForm({ _subject: "Lead: " + v.title, service: v.title, name, email, ...answers, source: "vertical-page" });
    setSending(false);
    setSent(true);
  };

  return (
    <section style={{ padding:"120px 24px 80px",maxWidth:900,margin:"0 auto" }}>
      <span onClick={() => setPage("services")} style={{ color:C.gold,fontSize:13,cursor:"pointer",display:"inline-block",marginBottom:32 }}>{"< All Services"}</span>
      <FadeIn>
        <div style={{ marginBottom:56 }}>
          <div style={{ fontSize:48,marginBottom:16 }}>{v.icon}</div>
          <div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>{v.tagline}</div>
          <h1 style={{ fontFamily:"Georgia,serif",fontSize:"clamp(32px,5vw,48px)",color:C.white,fontWeight:400,marginBottom:16 }}>{v.title}</h1>
          <p style={{ color:C.textDim,fontSize:17,lineHeight:1.7,maxWidth:700 }}>{v.desc}</p>
        </div>
      </FadeIn>

      <div style={{ marginBottom:64 }}>
        <FadeIn delay={100}><h2 style={{ fontFamily:"Georgia,serif",fontSize:24,color:C.white,fontWeight:400,marginBottom:32,paddingBottom:16,borderBottom:"1px solid "+C.border }}>Our services</h2></FadeIn>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20 }}>
          {v.subservices.map((s,i) => <FadeIn key={i} delay={150+i*60}><div style={{ background:C.card,border:"1px solid "+C.border,padding:28,height:"100%",transition:"border-color 0.3s" }} onMouseEnter={e=>e.currentTarget.style.borderColor=C.goldDim} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
            <div style={{ fontSize:24,marginBottom:12 }}>{s.icon}</div>
            <h3 style={{ fontFamily:"Georgia,serif",fontSize:17,color:C.white,fontWeight:400,marginBottom:8 }}>{s.title}</h3>
            <p style={{ color:C.textDim,fontSize:13,lineHeight:1.6,margin:0 }}>{s.desc}</p>
          </div></FadeIn>)}
        </div>
      </div>

      <FadeIn delay={400}>
        <div style={{ background:C.card,border:"1px solid "+C.gold,padding:"48px 40px" }}>
          {sent ? (
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:48,marginBottom:16 }}>✓</div>
              <h3 style={{ fontFamily:"Georgia,serif",fontSize:24,color:C.white,marginBottom:8 }}>Thank you, {name || "we received your request"}</h3>
              <p style={{ color:C.textDim,fontSize:14 }}>A specialist from our {v.title} team will contact you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily:"Georgia,serif",fontSize:24,color:C.white,fontWeight:400,marginBottom:8 }}>Interested in {v.title}?</h3>
              <p style={{ color:C.textDim,fontSize:14,marginBottom:32 }}>Tell us about your needs and we will match you with the right specialist.</p>

              <div className="form-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24 }}>
                <div><label style={{ color:C.textDim,fontSize:11,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6 }}>Name</label><input value={name} onChange={e=>setName(e.target.value)} style={{ width:"100%",padding:"12px 14px",background:C.bg,color:C.white,border:"1px solid "+C.border,fontSize:14,boxSizing:"border-box" }}/></div>
                <div><label style={{ color:C.textDim,fontSize:11,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6 }}>Email *</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width:"100%",padding:"12px 14px",background:C.bg,color:C.white,border:"1px solid "+C.border,fontSize:14,boxSizing:"border-box" }}/></div>
              </div>

              {v.qualifyFields.map((f,i) => (
                <div key={i} style={{ marginBottom:20 }}>
                  <label style={{ color:C.textDim,fontSize:11,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:8 }}>{f.label}</label>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                    {f.options.map(opt => (
                      <button key={opt} onClick={() => setAnswers({...answers, [f.label]: opt})}
                        style={{ padding:"10px 18px",background:answers[f.label]===opt?"rgba(201,169,110,0.15)":C.bg,border:"1px solid "+(answers[f.label]===opt?C.gold:C.border),color:answers[f.label]===opt?C.gold:C.textDim,fontSize:13,cursor:"pointer",transition:"all 0.2s" }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button onClick={handleSubmit} disabled={sending || !email}
                style={{ width:"100%",marginTop:16,padding:"16px 0",background:email?C.gold:C.border,color:email?C.bg:C.textDim,border:"none",fontSize:14,fontWeight:600,letterSpacing:2,cursor:email?"pointer":"default",transition:"background 0.2s" }}>
                {sending ? "SENDING..." : "GET IN TOUCH"}
              </button>
            </>
          )}
        </div>
      </FadeIn>
    </section>
  );
}

function RetireeSection({ setPage }) {
  const items = [
    { icon:"🏥", title:"Healthcare, Handled", desc:"English-speaking private GP on retainer, fast-track specialist access at San Raffaele and Humanitas, home care coordination." },
    { icon:"📋", title:"Succession Planning", desc:"Cross-border inheritance structuring for families spread across 2-3 countries. We coordinate between all your advisors." },
    { icon:"👨‍🍳", title:"Domestic Staff", desc:"Vetted staff — custodian, cook, driver, gardener. A dedicated house manager to coordinate them all." },
    { icon:"🔐", title:"Property & Security", desc:"Maintenance, security systems, and property management when you are away. Year-round care." },
    { icon:"🤝", title:"Community & Social", desc:"Introductions to golf clubs, yacht clubs, cultural associations. Loneliness is the real enemy." },
    { icon:"🚁", title:"Transport & Logistics", desc:"Helicopter transfers, jet card setup, airport VIP services, chauffeur arrangements." },
  ];
  return (
    <section style={{ padding:"100px 24px",background:C.card }}>
      <div style={{ maxWidth:1000,margin:"0 auto" }}>
        <FadeIn><div style={{ textAlign:"center",marginBottom:56 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>For Retirees & Empty Nesters</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,fontWeight:400,marginBottom:16 }}>Your next chapter deserves more than a tax strategy</h2><p style={{ color:C.textDim,fontSize:16,lineHeight:1.7,maxWidth:650,margin:"0 auto" }}>The best years of your life should feel effortless.</p></div></FadeIn>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20 }}>
          {items.map((it,i) => <FadeIn key={i} delay={i*80}><div style={{ background:C.bg,border:"1px solid "+C.border,padding:28,height:"100%" }}><div style={{ fontSize:28,marginBottom:12 }}>{it.icon}</div><h3 style={{ fontFamily:"Georgia,serif",fontSize:18,color:C.white,fontWeight:400,marginBottom:8 }}>{it.title}</h3><p style={{ color:C.textDim,fontSize:13,lineHeight:1.6,margin:0 }}>{it.desc}</p></div></FadeIn>)}
        </div>
        <FadeIn delay={500}><div style={{ textAlign:"center",marginTop:48 }}><button onClick={() => { setPage("quiz"); window.scrollTo(0,0); }} style={{ background:"transparent",color:C.gold,padding:"14px 36px",border:"1px solid "+C.gold,fontSize:13,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>DISCOVER YOUR IDEAL LOCATION</button></div></FadeIn>
      </div>
    </section>
  );
}

function CostOfLiving() {
  const [mode, setMode] = useState("simple");
  return (
    <section id="cost" style={{ padding:"100px 24px",maxWidth:1000,margin:"0 auto" }}>
      <FadeIn><div style={{ textAlign:"center",marginBottom:32 }}>
        <div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Cost of Living</div>
        <h2 style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,fontWeight:400,marginBottom:16 }}>Live better, spend less</h2>
        <div style={{ display:"flex",gap:8,justifyContent:"center" }}>
          {[["simple","Quick Compare"],["advanced","Detailed Planner"]].map(([k,l])=>
            <button key={k} onClick={()=>setMode(k)} style={{ padding:"10px 24px",background:mode===k?"rgba(201,169,110,0.15)":"transparent",border:"1px solid "+(mode===k?C.gold:C.border),color:mode===k?C.gold:C.textDim,fontSize:13,cursor:"pointer",letterSpacing:1,transition:"all 0.2s" }}>{l}</button>
          )}
        </div>
      </div></FadeIn>
      {mode==="simple" ? <SimpleCalc/> : <AdvancedCalc/>}
    </section>
  );
}

function SimpleCalc() {
  const [ci, setCi] = useState(0);
  const [inc, setInc] = useState(3000000);
  const c = COL_CITIES[ci]; const m = MILAN;
  const cTax = inc * c.tax;
  const fmt = n => "€" + Math.round(n).toLocaleString();
  const rows = [["🏠 Housing (annual)", c.villa, m.villa],["👨‍🍳 Domestic Staff", c.staff, m.staff],["🏥 Healthcare", c.health, m.health],["🍷 Dining & Lifestyle", c.dining, m.dining],["🎓 International School", c.school, m.school],["💰 Tax (foreign income)", cTax, m.tax]];
  const cTotal = rows.reduce((s,r)=>s+r[1],0); const mTotal = rows.reduce((s,r)=>s+r[2],0); const saving = cTotal - mTotal;
  return (
    <FadeIn delay={100}>
      <div className="grid-2col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:32 }}>
        <div><label style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:8 }}>Compare with</label><select value={ci} onChange={e=>setCi(+e.target.value)} style={{ width:"100%",padding:"14px 16px",background:C.card,color:C.white,border:"1px solid "+C.border,fontSize:16 }}>{COL_CITIES.map((x,i)=><option key={i} value={i}>{x.flag} {x.name}</option>)}</select></div>
        <div><label style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:8 }}>Annual foreign income</label><select value={inc} onChange={e=>setInc(+e.target.value)} style={{ width:"100%",padding:"14px 16px",background:C.card,color:C.white,border:"1px solid "+C.border,fontSize:16 }}>{[1000000,2000000,3000000,5000000,10000000,20000000].map(v=><option key={v} value={v}>€{v.toLocaleString()}</option>)}</select></div>
      </div>
      <div style={{ overflowX:"auto" }}><table style={{ width:"100%",borderCollapse:"collapse" }}>
        <thead><tr><th style={{ textAlign:"left",padding:"14px 16px",borderBottom:"2px solid "+C.gold,color:C.textDim,fontSize:12 }}>EXPENSE</th><th style={{ textAlign:"right",padding:"14px 16px",borderBottom:"2px solid "+C.gold,color:C.textDim,fontSize:12 }}>{c.flag} {c.name.toUpperCase()}</th><th style={{ textAlign:"right",padding:"14px 16px",borderBottom:"2px solid "+C.gold,color:C.gold,fontSize:12 }}>🇮🇹 ITALY</th><th style={{ textAlign:"right",padding:"14px 16px",borderBottom:"2px solid "+C.gold,color:C.textDim,fontSize:12 }}>SAVING</th></tr></thead>
        <tbody>{rows.map(([label,cv,mv],i)=><tr key={i}><td style={{ padding:"14px 16px",borderBottom:"1px solid "+C.border,color:C.text,fontSize:14 }}>{label}</td><td style={{ padding:"14px 16px",borderBottom:"1px solid "+C.border,color:"#ef4444",fontSize:14,textAlign:"right" }}>{fmt(cv)}</td><td style={{ padding:"14px 16px",borderBottom:"1px solid "+C.border,color:C.gold,fontSize:14,textAlign:"right" }}>{fmt(mv)}</td><td style={{ padding:"14px 16px",borderBottom:"1px solid "+C.border,color:cv-mv>0?"#22c55e":"#ef4444",fontSize:14,textAlign:"right",fontWeight:600 }}>{cv-mv>0?"+":""}{fmt(cv-mv)}</td></tr>)}
        <tr><td style={{ padding:"16px",borderTop:"2px solid "+C.gold,color:C.white,fontWeight:600 }}>TOTAL</td><td style={{ padding:"16px",borderTop:"2px solid "+C.gold,color:"#ef4444",fontSize:18,textAlign:"right",fontWeight:600,fontFamily:"Georgia,serif" }}>{fmt(cTotal)}</td><td style={{ padding:"16px",borderTop:"2px solid "+C.gold,color:C.gold,fontSize:18,textAlign:"right",fontWeight:600,fontFamily:"Georgia,serif" }}>{fmt(mTotal)}</td><td style={{ padding:"16px",borderTop:"2px solid "+C.gold,color:saving>0?"#22c55e":"#ef4444",fontSize:18,textAlign:"right",fontWeight:600,fontFamily:"Georgia,serif" }}>{saving>0?"+":""}{fmt(saving)}</td></tr>
        </tbody></table></div>
      {saving > 0 && <div style={{ textAlign:"center",marginTop:32,padding:24,background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)" }}><p style={{ color:"#22c55e",fontSize:14,margin:0 }}>Over 15 years: <strong style={{ fontFamily:"Georgia,serif",fontSize:20 }}>{fmt(saving*15)}</strong> saved</p></div>}
    </FadeIn>
  );
}

function AdvancedCalc() {
  const LOC = [
    { name:"Milan Centro (Brera, Magenta, Quadrilatero)", sqmBuy:{apt:[8000,14000],villa:null}, sqmRent:{apt:[25,45],villa:null}, condoFees:6000, propTax:4500, note:"No standalone villas in central Milan" },
    { name:"Milan Semi-Centro (CityLife, Porta Romana)", sqmBuy:{apt:[6000,10000],villa:[5000,8000]}, sqmRent:{apt:[20,35],villa:[25,40]}, condoFees:4800, propTax:3500 },
    { name:"Milan Periferia (San Siro, Niguarda)", sqmBuy:{apt:[3000,5500],villa:[3000,5000]}, sqmRent:{apt:[12,22],villa:[15,25]}, condoFees:3000, propTax:2000 },
    { name:"Lake Como — Lakefront (Bellagio, Tremezzo)", sqmBuy:{apt:[7000,15000],villa:[8000,20000]}, sqmRent:{apt:[20,40],villa:[30,60]}, condoFees:2000, propTax:5000 },
    { name:"Lake Como — Hillside (Lenno, Menaggio)", sqmBuy:{apt:[3500,7000],villa:[4000,9000]}, sqmRent:{apt:[12,25],villa:[18,35]}, condoFees:1500, propTax:3000 },
    { name:"Tuscany — Chianti / Val d'Orcia", sqmBuy:{apt:[2500,5000],villa:[2000,4500]}, sqmRent:{apt:[8,18],villa:[10,22]}, condoFees:800, propTax:2500 },
    { name:"Amalfi Coast (Positano, Ravello)", sqmBuy:{apt:[6000,14000],villa:[7000,18000]}, sqmRent:{apt:[22,45],villa:[30,55]}, condoFees:1500, propTax:4000 },
    { name:"Sardinia — Costa Smeralda", sqmBuy:{apt:[5000,12000],villa:[6000,15000]}, sqmRent:{apt:[18,40],villa:[25,50]}, condoFees:2000, propTax:4000 },
  ];
  const STAFF = [
    { role:"Live-in Housekeeper (Colf)", monthly: 1800, annual: 21600 },
    { role:"Private Chef", monthly: 3500, annual: 42000 },
    { role:"Personal Driver", monthly: 2200, annual: 26400 },
    { role:"Gardener / Estate Keeper", monthly: 1600, annual: 19200 },
    { role:"House Manager", monthly: 4000, annual: 48000 },
    { role:"Nanny / Governess", monthly: 2500, annual: 30000 },
    { role:"Security / Night Guard", monthly: 2800, annual: 33600 },
    { role:"Live-in Caregiver (Badante)", monthly: 1800, annual: 21600 },
  ];
  const HEALTH = [
    { name:"Self-managed (SSN only)", annual: 400 },
    { name:"Basic Private (Italian insurance + GP)", annual: 8000 },
    { name:"Premium (Bupa/Cigna + GP retainer)", annual: 28000 },
    { name:"Full Concierge (VIP hospital + GP + specialists)", annual: 50000 },
  ];
  const SCHOOL = [
    { name:"No school-age children", annual: 0 },
    { name:"1 child — international school", annual: 25000 },
    { name:"2 children — international school", annual: 48000 },
    { name:"3 children — international school", annual: 68000 },
    { name:"Boarding school (Switzerland)", annual: 80000 },
  ];
  const LIFESTYLE = [
    { name:"Dining & entertainment", options: [{ label:"Modest (home cooking)", val:12000 },{ label:"Regular (2x/week out)", val:30000 },{ label:"Premium (fine dining weekly)", val:60000 },{ label:"Ultra (Michelin + private chef events)", val:120000 }] },
    { name:"Club memberships", options: [{ label:"None", val:0 },{ label:"Golf club", val:8000 },{ label:"Golf + yacht club", val:25000 },{ label:"Golf + yacht + social clubs", val:45000 }] },
    { name:"Transport", options: [{ label:"Own car only", val:8000 },{ label:"Car + occasional driver", val:20000 },{ label:"Full-time driver + car", val:40000 },{ label:"Driver + helicopter transfers", val:90000 },{ label:"Driver + jet card", val:180000 }] },
    { name:"Travel from Italy", options: [{ label:"Occasional (5 trips/yr)", val:15000 },{ label:"Regular (10 trips/yr)", val:35000 },{ label:"Frequent (20+ trips/yr)", val:75000 },{ label:"Jet card / fractional", val:200000 }] },
  ];

  const [loc, setLoc] = useState(0);
  const [propType, setPropType] = useState("apt");
  const [sqm, setSqm] = useState(200);
  const [ownRent, setOwnRent] = useState("rent");
  const [staffSel, setStaffSel] = useState({});
  const [healthIdx, setHealthIdx] = useState(2);
  const [schoolIdx, setSchoolIdx] = useState(0);
  const [lifeSel, setLifeSel] = useState({0:1,1:0,2:1,3:1});
  const [income, setIncome] = useState(3000000);

  const l = LOC[loc];
  const range = l[ownRent==="rent"?"sqmRent":"sqmBuy"][propType];
  const avgRate = range ? (range[0]+range[1])/2 : 0;
  const housingCost = ownRent==="rent" ? avgRate * sqm * 12 : 0;
  const propertyCost = ownRent==="buy" ? avgRate * sqm : 0;
  const annualPropCost = ownRent==="buy" ? (l.condoFees + l.propTax + propertyCost * 0.01) : housingCost;
  const staffCost = Object.entries(staffSel).filter(([,v])=>v).reduce((s,[k])=>s+STAFF[+k].annual,0);
  const healthCost = HEALTH[healthIdx].annual;
  const schoolCost = SCHOOL[schoolIdx].annual;
  const lifeCost = Object.entries(lifeSel).reduce((s,[k,v])=>s+LIFESTYLE[+k].options[v].val,0);
  const taxCost = 200000;
  const total = annualPropCost + staffCost + healthCost + schoolCost + lifeCost + taxCost;

  const fmt = n => "€" + Math.round(n).toLocaleString();
  const sel = { width:"100%",padding:"12px 14px",background:C.card,color:C.white,border:"1px solid "+C.border,fontSize:14,boxSizing:"border-box" };
  const lbl = { color:C.textDim,fontSize:11,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6 };

  return (
    <FadeIn delay={100}>
      <div style={{ background:C.card,border:"1px solid "+C.border,padding:"32px 28px",marginBottom:24 }}>
        <h3 style={{ fontFamily:"Georgia,serif",fontSize:20,color:C.white,fontWeight:400,marginBottom:24 }}>🏠 Property</h3>
        <div className="grid-2col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
          <div><label style={lbl}>Location</label><select value={loc} onChange={e=>setLoc(+e.target.value)} style={sel}>{LOC.map((x,i)=><option key={i} value={i}>{x.name}</option>)}</select></div>
          <div><label style={lbl}>Property Type</label><select value={propType} onChange={e=>setPropType(e.target.value)} style={sel}><option value="apt">Apartment / Penthouse</option>{l.sqmBuy.villa && <option value="villa">Villa / House</option>}</select></div>
        </div>
        <div className="grid-2col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
          <div><label style={lbl}>Size (sqm): {sqm} sqm</label><input type="range" min={80} max={800} step={10} value={sqm} onChange={e=>setSqm(+e.target.value)} style={{ width:"100%",accentColor:C.gold }}/><div style={{ display:"flex",justifyContent:"space-between",color:C.textDim,fontSize:11 }}><span>80 sqm</span><span>800 sqm</span></div></div>
          <div><label style={lbl}>Own or Rent</label><div style={{ display:"flex",gap:8 }}>{[["rent","Rent"],["buy","Buy"]].map(([k,l2])=><button key={k} onClick={()=>setOwnRent(k)} style={{ flex:1,padding:"12px",background:ownRent===k?"rgba(201,169,110,0.15)":"transparent",border:"1px solid "+(ownRent===k?C.gold:C.border),color:ownRent===k?C.gold:C.textDim,fontSize:13,cursor:"pointer" }}>{l2}</button>)}</div></div>
        </div>
        {range ? <div style={{ padding:16,background:C.bg,border:"1px solid "+C.border }}>
          <div style={{ display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
            <span style={{ color:C.textDim,fontSize:13 }}>{ownRent==="rent"?"Monthly rent":"Purchase price"}: <strong style={{ color:C.gold }}>{ownRent==="rent"?fmt(avgRate*sqm)+"/mo":fmt(propertyCost)}</strong></span>
            <span style={{ color:C.textDim,fontSize:13 }}>Annual cost: <strong style={{ color:C.gold }}>{fmt(annualPropCost)}</strong>{ownRent==="buy"?" (taxes + maintenance)":""}</span>
            <span style={{ color:C.textDim,fontSize:11 }}>Range: €{range[0].toLocaleString()}-{range[1].toLocaleString()}/{ownRent==="rent"?"sqm/mo":"sqm"}</span>
          </div>
        </div> : <div style={{ padding:16,background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)" }}><p style={{ color:"#ef4444",fontSize:13,margin:0 }}>{l.note || "This property type is not available in this location."}</p></div>}
      </div>

      <div style={{ background:C.card,border:"1px solid "+C.border,padding:"32px 28px",marginBottom:24 }}>
        <h3 style={{ fontFamily:"Georgia,serif",fontSize:20,color:C.white,fontWeight:400,marginBottom:24 }}>👨‍🍳 Domestic Staff <span style={{ color:C.textDim,fontSize:13,fontWeight:400 }}>(select all that apply)</span></h3>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10 }}>
          {STAFF.map((s,i)=><button key={i} onClick={()=>setStaffSel({...staffSel,[i]:!staffSel[i]})} style={{ textAlign:"left",padding:"14px 16px",background:staffSel[i]?"rgba(201,169,110,0.12)":"transparent",border:"1px solid "+(staffSel[i]?C.gold:C.border),cursor:"pointer",transition:"all 0.2s" }}>
            <div style={{ color:staffSel[i]?C.gold:C.text,fontSize:14,marginBottom:4 }}>{staffSel[i]?"✓ ":""}{s.role}</div>
            <div style={{ color:C.textDim,fontSize:12 }}>€{s.monthly.toLocaleString()}/mo · €{s.annual.toLocaleString()}/yr</div>
          </button>)}
        </div>
        {staffCost > 0 && <div style={{ marginTop:12,padding:12,background:C.bg,textAlign:"right" }}><span style={{ color:C.gold,fontSize:14 }}>Staff total: <strong>{fmt(staffCost)}/year</strong></span></div>}
      </div>

      <div style={{ background:C.card,border:"1px solid "+C.border,padding:"32px 28px",marginBottom:24 }}>
        <h3 style={{ fontFamily:"Georgia,serif",fontSize:20,color:C.white,fontWeight:400,marginBottom:24 }}>🏥 Healthcare & 🎓 Education</h3>
        <div className="grid-2col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
          <div><label style={lbl}>Healthcare Level</label><select value={healthIdx} onChange={e=>setHealthIdx(+e.target.value)} style={sel}>{HEALTH.map((h,i)=><option key={i} value={i}>{h.name} — {fmt(h.annual)}/yr</option>)}</select></div>
          <div><label style={lbl}>Education</label><select value={schoolIdx} onChange={e=>setSchoolIdx(+e.target.value)} style={sel}>{SCHOOL.map((s,i)=><option key={i} value={i}>{s.name}{s.annual>0?" — "+fmt(s.annual)+"/yr":""}</option>)}</select></div>
        </div>
      </div>

      <div style={{ background:C.card,border:"1px solid "+C.border,padding:"32px 28px",marginBottom:24 }}>
        <h3 style={{ fontFamily:"Georgia,serif",fontSize:20,color:C.white,fontWeight:400,marginBottom:24 }}>🍷 Lifestyle & Transport</h3>
        {LIFESTYLE.map((cat,ci2)=><div key={ci2} style={{ marginBottom:20 }}>
          <label style={lbl}>{cat.name}</label>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
            {cat.options.map((opt,oi)=><button key={oi} onClick={()=>setLifeSel({...lifeSel,[ci2]:oi})} style={{ padding:"10px 16px",background:lifeSel[ci2]===oi?"rgba(201,169,110,0.12)":"transparent",border:"1px solid "+(lifeSel[ci2]===oi?C.gold:C.border),color:lifeSel[ci2]===oi?C.gold:C.textDim,fontSize:12,cursor:"pointer",transition:"all 0.2s" }}>
              <div>{opt.label}</div><div style={{ marginTop:4,fontWeight:600 }}>{fmt(opt.val)}/yr</div>
            </button>)}
          </div>
        </div>)}
      </div>

      <div style={{ background:C.card,border:"1px solid "+C.border,padding:"32px 28px",marginBottom:24 }}>
        <h3 style={{ fontFamily:"Georgia,serif",fontSize:20,color:C.white,fontWeight:400,marginBottom:24 }}>💰 Tax (Flat Tax Regime)</h3>
        <div className="grid-2col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
          <div><label style={lbl}>Annual Foreign Income</label><select value={income} onChange={e=>setIncome(+e.target.value)} style={sel}>{[1000000,2000000,3000000,5000000,10000000,20000000,50000000].map(v=><option key={v} value={v}>€{v.toLocaleString()}</option>)}</select></div>
          <div style={{ display:"flex",flexDirection:"column",justifyContent:"center" }}>
            <div style={{ color:C.textDim,fontSize:13 }}>Flat tax: <strong style={{ color:C.gold }}>€200,000/year</strong> (fixed, regardless of income)</div>
            <div style={{ color:C.textDim,fontSize:12,marginTop:4 }}>Effective rate on {fmt(income)}: <strong style={{ color:"#22c55e" }}>{(200000/income*100).toFixed(1)}%</strong></div>
          </div>
        </div>
      </div>

      <div style={{ background:"rgba(201,169,110,0.06)",border:"2px solid "+C.gold,padding:"32px 28px" }}>
        <h3 style={{ fontFamily:"Georgia,serif",fontSize:24,color:C.white,fontWeight:400,marginBottom:24,textAlign:"center" }}>Your Annual Cost of Living in Italy</h3>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:24 }}>
          {[
            ["🏠 Property",annualPropCost],["👨‍🍳 Staff",staffCost],["🏥 Healthcare",healthCost],
            ["🎓 Education",schoolCost],["🍷 Lifestyle",lifeCost],["💰 Flat Tax",taxCost],
          ].map(([label,val])=><div key={label} style={{ padding:16,background:C.card,border:"1px solid "+C.border,textAlign:"center" }}>
            <div style={{ color:C.textDim,fontSize:12,marginBottom:4 }}>{label}</div>
            <div style={{ color:C.gold,fontSize:18,fontFamily:"Georgia,serif",fontWeight:600 }}>{fmt(val)}</div>
          </div>)}
        </div>
        <div style={{ textAlign:"center",padding:24,background:C.card,border:"1px solid "+C.gold }}>
          <div style={{ color:C.textDim,fontSize:14,marginBottom:8 }}>Total Annual Cost</div>
          <div style={{ color:C.gold,fontSize:42,fontFamily:"Georgia,serif",fontWeight:400 }}>{fmt(total)}</div>
          <div style={{ color:C.textDim,fontSize:13,marginTop:8 }}>{fmt(Math.round(total/12))}/month</div>
          {income > 0 && <div style={{ color:"#22c55e",fontSize:13,marginTop:12 }}>After tax savings vs UK at 45%: <strong>{fmt(Math.max(0,income*0.45 - taxCost))}/year</strong></div>}
        </div>
      </div>
    </FadeIn>
  );
}

function QuizPage({ setPage }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ como:0, tuscany:0, amalfi:0, milan:0 });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const pick = sc => { const ns = {...scores}; Object.keys(sc).forEach(k=>ns[k]+=sc[k]); setScores(ns); setStep(step+1); };
  const winner = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  const result = QUIZ_RESULTS[winner];
  const pct = (step / QUIZ_QUESTIONS.length) * 100;

  const handleQuizSubmit = async () => {
    if (!email) return;
    await submitForm({ _subject: "Quiz Lead: " + result.title, result: result.title, email, scores: JSON.stringify(scores), source: "quiz" });
    setSent(true);
  };

  if (step >= QUIZ_QUESTIONS.length) return (
    <section style={{ padding:"120px 24px 80px",maxWidth:700,margin:"0 auto" }}>
      <FadeIn><div style={{ textAlign:"center",marginBottom:48 }}><div style={{ fontSize:64,marginBottom:16 }}>{result.emoji}</div><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Your Italian Home</div><h1 style={{ fontFamily:"Georgia,serif",fontSize:44,color:C.white,fontWeight:400,marginBottom:8 }}>{result.title}</h1><p style={{ color:C.gold,fontSize:18,fontStyle:"italic" }}>{result.subtitle}</p></div></FadeIn>
      <FadeIn delay={200}><p style={{ color:C.text,fontSize:16,lineHeight:1.8,marginBottom:32 }}>{result.desc}</p>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:48 }}>{result.highlights.map((h,i)=><div key={i} style={{ display:"flex",gap:10,alignItems:"center" }}><span style={{ color:C.gold }}>✓</span><span style={{ color:C.textDim,fontSize:14 }}>{h}</span></div>)}</div>
      </FadeIn>
      <FadeIn delay={400}><div style={{ background:C.card,border:"1px solid "+C.gold,padding:40,textAlign:"center" }}>
        {sent ? <><div style={{ fontSize:48,marginBottom:12 }}>✓</div><h3 style={{ fontFamily:"Georgia,serif",fontSize:22,color:C.white,marginBottom:8 }}>Your personalized guide is on the way</h3><p style={{ color:C.textDim,fontSize:14 }}>Check your inbox in the next 24 hours.</p></> : <><h3 style={{ fontFamily:"Georgia,serif",fontSize:22,color:C.white,marginBottom:8 }}>Get your personalized {result.title} guide</h3><p style={{ color:C.textDim,fontSize:14,marginBottom:24 }}>Property insights, lifestyle tips, and tax specifics.</p><div style={{ display:"flex",gap:12,maxWidth:440,margin:"0 auto" }}><input type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} style={{ flex:1,padding:"14px 16px",background:C.bg,color:C.white,border:"1px solid "+C.border,fontSize:15 }}/><button onClick={handleQuizSubmit} style={{ background:C.gold,color:C.bg,padding:"14px 28px",border:"none",fontSize:13,fontWeight:600,letterSpacing:1,cursor:"pointer",whiteSpace:"nowrap" }}>SEND GUIDE</button></div></>}
      </div></FadeIn>
      <FadeIn delay={500}><div style={{ display:"flex",gap:16,justifyContent:"center",marginTop:32 }}>
        <button onClick={()=>{setStep(0);setScores({como:0,tuscany:0,amalfi:0,milan:0});setSent(false);setEmail("")}} style={{ color:C.textDim,background:"none",border:"1px solid "+C.border,padding:"10px 24px",fontSize:13,cursor:"pointer" }}>Retake Quiz</button>
        <button onClick={()=>{setPage("properties");window.scrollTo(0,0)}} style={{ color:C.gold,background:"none",border:"1px solid "+C.gold,padding:"10px 24px",fontSize:13,cursor:"pointer" }}>Browse Locations</button>
      </div></FadeIn>
    </section>
  );
  const q = QUIZ_QUESTIONS[step];
  return (
    <section style={{ padding:"120px 24px 80px",maxWidth:650,margin:"0 auto" }}>
      <div style={{ marginBottom:40 }}><span onClick={()=>{if(step>0)setStep(step-1);else{setPage("home");window.scrollTo(0,0)}}} style={{ color:C.gold,fontSize:13,cursor:"pointer" }}>{"< "}{step>0?"Previous":"Home"}</span></div>
      <div style={{ marginBottom:32 }}><div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}><span style={{ color:C.textDim,fontSize:12 }}>Question {step+1} of {QUIZ_QUESTIONS.length}</span><span style={{ color:C.gold,fontSize:12 }}>{Math.round(pct)}%</span></div><div style={{ height:3,background:C.border }}><div style={{ height:3,background:C.gold,width:pct+"%",transition:"width 0.4s" }}/></div></div>
      <FadeIn key={step}><h2 style={{ fontFamily:"Georgia,serif",fontSize:28,color:C.white,fontWeight:400,marginBottom:32,lineHeight:1.3 }}>{q.q}</h2>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>{q.opts.map((o,i)=><button key={i} onClick={()=>pick(o.score)} style={{ textAlign:"left",padding:"20px 24px",background:C.card,border:"1px solid "+C.border,color:C.text,fontSize:15,lineHeight:1.5,cursor:"pointer",transition:"all 0.2s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.background=C.cardHover}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card}}>{o.text}</button>)}</div>
      </FadeIn>
    </section>
  );
}

function PropertyGallery({ setPage }) {
  const [expanded, setExpanded] = useState(null);
  const [inquiryId, setInquiryId] = useState(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState({});

  const handleInquiry = async (loc) => {
    if (!email) return;
    await submitForm({ _subject: "Location Inquiry: " + loc.title, location: loc.title, email, source: "location-gallery" });
    setSent({...sent,[loc.id]:true}); setInquiryId(null); setEmail("");
  };

  return (
    <section style={{ padding:"120px 24px 80px",maxWidth:1100,margin:"0 auto" }}>
      <FadeIn><div style={{ marginBottom:56 }}>
        <div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Where to Live in Italy</div>
        <h1 style={{ fontFamily:"Georgia,serif",fontSize:"clamp(28px,5vw,44px)",color:C.white,fontWeight:400,marginBottom:16,lineHeight:1.2 }}>Italy's most desirable locations for HNWI</h1>
        <p style={{ color:C.textDim,fontSize:16,lineHeight:1.7,maxWidth:700 }}>Each region offers a distinct lifestyle, property market, and community. We help you find the right one — and the right property within it.</p>
      </div></FadeIn>

      <div style={{ display:"flex",flexDirection:"column",gap:32 }}>
        {LOCATIONS.map((loc,i) => {
          const isOpen = expanded === loc.id;
          return (
          <FadeIn key={loc.id} delay={i*80}>
            <div style={{ background:C.card,border:"1px solid "+(isOpen?C.gold:C.border),overflow:"hidden",transition:"all 0.4s" }}>
              <div className="loc-row" style={{ display:"flex",flexDirection:"row",flexWrap:"wrap" }}>
                <div className="loc-img" style={{ width:"100%",maxWidth:420,minHeight:260,position:"relative",overflow:"hidden",flexShrink:0 }}>
                  <img src={loc.img} alt={loc.title+" Italy — luxury real estate and lifestyle for international buyers"} loading="lazy"
                    style={{ width:"100%",height:"100%",objectFit:"cover",minHeight:260,transition:"transform 0.6s",display:"block" }}
                    onMouseEnter={e=>e.target.style.transform="scale(1.05)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}
                    onError={e=>{e.target.style.display="none"; e.target.parentElement.style.background="linear-gradient(135deg,#1a2a3a,#2d3a4a)";}}/>
                  <div style={{ position:"absolute",top:12,left:12,background:"rgba(201,169,110,0.92)",color:C.bg,padding:"5px 14px",fontSize:11,fontWeight:600,letterSpacing:1 }}>{loc.tag}</div>
                  <div style={{ position:"absolute",bottom:0,left:0,right:0,height:80,background:"linear-gradient(transparent,rgba(10,14,23,0.6))" }}/>
                </div>

                <div className="loc-body" style={{ flex:1,padding:"28px 32px",minWidth:280 }}>
                  <h2 style={{ fontFamily:"Georgia,serif",fontSize:26,color:C.white,fontWeight:400,marginBottom:4 }}>{loc.title}</h2>
                  <p style={{ color:C.gold,fontSize:13,marginBottom:16,fontStyle:"italic" }}>{loc.sub}</p>

                  <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
                    {loc.highlights.map((h,j)=><span key={j} style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"6px 12px",background:"rgba(201,169,110,0.08)",border:"1px solid rgba(201,169,110,0.15)",fontSize:12,color:C.textDim }}><span style={{ color:C.gold,fontSize:10 }}>✦</span>{h}</span>)}
                  </div>

                  <p style={{ color:C.textDim,fontSize:14,lineHeight:1.7,marginBottom:16 }}>{loc.lifestyle.slice(0,180)}...</p>

                  <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
                    <button onClick={()=>setExpanded(isOpen?null:loc.id)} style={{ padding:"10px 24px",background:"transparent",border:"1px solid "+C.gold,color:C.gold,fontSize:13,fontWeight:500,letterSpacing:1,cursor:"pointer",transition:"all 0.2s" }}
                      onMouseEnter={e=>{e.target.style.background="rgba(201,169,110,0.1)"}} onMouseLeave={e=>{e.target.style.background="transparent"}}>
                      {isOpen ? "LESS ↑" : "FULL GUIDE ↓"}
                    </button>
                    {!sent[loc.id] ? <button onClick={()=>setInquiryId(inquiryId===loc.id?null:loc.id)} style={{ padding:"10px 24px",background:C.gold,border:"none",color:C.bg,fontSize:13,fontWeight:600,letterSpacing:1,cursor:"pointer" }}>
                      GET INTRODUCED
                    </button> : <span style={{ padding:"10px 24px",color:C.gold,fontSize:13 }}>✓ We will be in touch</span>}
                  </div>

                  {inquiryId===loc.id && !sent[loc.id] && <div style={{ display:"flex",gap:8,marginTop:12 }}>
                    <input type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} style={{ flex:1,padding:"10px 14px",background:C.bg,color:C.white,border:"1px solid "+C.border,fontSize:13 }}/>
                    <button onClick={()=>handleInquiry(loc)} style={{ background:C.gold,color:C.bg,padding:"10px 20px",border:"none",fontSize:12,fontWeight:600,cursor:"pointer" }}>SEND</button>
                  </div>}
                </div>
              </div>

              {isOpen && <div style={{ padding:"0 32px 32px",borderTop:"1px solid "+C.border,marginTop:0 }}>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24,paddingTop:28 }}>
                  <div>
                    <h4 style={{ color:C.gold,fontSize:12,letterSpacing:3,textTransform:"uppercase",marginBottom:12 }}>Property Market</h4>
                    <p style={{ color:C.text,fontSize:14,lineHeight:1.7 }}>{loc.property}</p>
                  </div>
                  <div>
                    <h4 style={{ color:C.gold,fontSize:12,letterSpacing:3,textTransform:"uppercase",marginBottom:12 }}>Lifestyle & Community</h4>
                    <p style={{ color:C.text,fontSize:14,lineHeight:1.7 }}>{loc.lifestyle}</p>
                  </div>
                  <div>
                    <h4 style={{ color:C.gold,fontSize:12,letterSpacing:3,textTransform:"uppercase",marginBottom:12 }}>Climate</h4>
                    <p style={{ color:C.text,fontSize:14,lineHeight:1.7 }}>{loc.climate}</p>
                  </div>
                </div>
              </div>}
            </div>
          </FadeIn>
        )})}
      </div>

      <FadeIn delay={400}><div style={{ textAlign:"center",marginTop:48,padding:40,background:C.card,border:"1px solid "+C.border }}>
        <h3 style={{ fontFamily:"Georgia,serif",fontSize:22,color:C.white,fontWeight:400,marginBottom:8 }}>Not sure which location is right for you?</h3>
        <p style={{ color:C.textDim,fontSize:14,marginBottom:20 }}>Take our 2-minute quiz or book a call to discuss your priorities.</p>
        <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
          <button onClick={()=>{setPage("quiz");window.scrollTo(0,0)}} style={{ padding:"14px 32px",border:"1px solid "+C.gold,background:"transparent",color:C.gold,fontSize:13,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>TAKE THE QUIZ</button>
          <button onClick={()=>{setPage("contact")}} style={{ padding:"14px 32px",background:C.gold,color:C.bg,border:"none",fontSize:13,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>BOOK A CALL</button>
        </div>
      </div></FadeIn>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const handleSub = async () => { if (!email) return; await submitForm({ _subject: "Newsletter Signup", email, source: "newsletter" }); setDone(true); };
  return (
    <section style={{ padding:"80px 24px",background:"rgba(201,169,110,0.04)",borderTop:"1px solid "+C.border,borderBottom:"1px solid "+C.border }}>
      <div style={{ maxWidth:600,margin:"0 auto",textAlign:"center" }}>
        <FadeIn><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Weekly Dispatch</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:28,color:C.white,fontWeight:400,marginBottom:12 }}>Retire to Italy</h2><p style={{ color:C.textDim,fontSize:14,lineHeight:1.6,marginBottom:32 }}>One email per week. A featured property, a tax insight, and a taste of Italian life.</p>
          {done ? <p style={{ color:C.gold,fontSize:15 }}>✓ You are in. First dispatch arrives next Monday.</p> : <div style={{ display:"flex",gap:12,maxWidth:440,margin:"0 auto" }}><input type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} style={{ flex:1,padding:"14px 16px",background:C.card,color:C.white,border:"1px solid "+C.border,fontSize:15 }}/><button onClick={handleSub} style={{ background:C.gold,color:C.bg,padding:"14px 28px",border:"none",fontSize:13,fontWeight:600,letterSpacing:1,cursor:"pointer",whiteSpace:"nowrap" }}>SUBSCRIBE</button></div>}
        </FadeIn>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="plans" style={{ padding:"100px 24px",maxWidth:1200,margin:"0 auto" }}>
      <FadeIn><div style={{ textAlign:"center",marginBottom:64 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Membership</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,fontWeight:400 }}>Choose your level of support</h2></div></FadeIn>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24 }}>
        {TIERS.map((t,i) => <FadeIn key={i} delay={i*100}><div style={{ background:C.card,border:"1px solid "+(t.popular?C.gold:C.border),padding:40,position:"relative",display:"flex",flexDirection:"column",height:"100%" }}>
          {t.popular && <div style={{ position:"absolute",top:-1,left:0,right:0,height:3,background:C.gold }}/>}
          <div style={{ color:C.gold,fontSize:12,letterSpacing:3,textTransform:"uppercase",marginBottom:8 }}>{t.name}</div>
          <div style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,marginBottom:4 }}>{t.setup}</div>
          <div style={{ color:C.textDim,fontSize:14,marginBottom:32 }}>setup + {t.monthly}</div>
          <div style={{ flex:1 }}>{t.features.map((f,j)=><div key={j} style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:12 }}><span style={{ color:C.gold,fontSize:14,marginTop:2 }}>✓</span><span style={{ color:C.text,fontSize:14,lineHeight:1.5 }}>{f}</span></div>)}</div>
          <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})} style={{ width:"100%",marginTop:32,padding:"14px 0",border:t.popular?"none":"1px solid "+C.gold,background:t.popular?C.gold:"transparent",color:t.popular?C.bg:C.gold,fontSize:13,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>BOOK A CALL</button>
        </div></FadeIn>)}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [fd, setFd] = useState({ name:"", email:"", phone:"", message:"" });
  const is = { width:"100%",padding:"14px 16px",background:C.bg,color:C.white,border:"1px solid "+C.border,fontSize:15,boxSizing:"border-box" };
  const handleContact = async () => {
    if (!fd.email) return;
    setSending(true);
    await submitForm({ _subject: "Discovery Call Request", ...fd, source: "contact-form" });
    setSending(false); setSent(true);
  };
  return (
    <section id="contact" style={{ padding:"100px 24px",background:C.card }}>
      <div style={{ maxWidth:600,margin:"0 auto" }}>
        <FadeIn><div style={{ textAlign:"center",marginBottom:48 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Get in Touch</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,fontWeight:400,marginBottom:16 }}>30-minute discovery call</h2><p style={{ color:C.textDim,fontSize:15 }}>Completely confidential. No obligation.</p></div></FadeIn>
        {sent ? <FadeIn><div style={{ textAlign:"center",padding:48,background:C.bg,border:"1px solid "+C.gold }}><div style={{ fontSize:48,marginBottom:16 }}>✓</div><h3 style={{ fontFamily:"Georgia,serif",fontSize:24,color:C.white,marginBottom:8 }}>Thank you{fd.name?", "+fd.name:""}</h3><p style={{ color:C.textDim }}>We will be in touch within 24 hours.</p></div></FadeIn> :
        <FadeIn delay={150}><div style={{ display:"flex",flexDirection:"column",gap:16 }}>
          <div><label style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6 }}>Name</label><input value={fd.name} onChange={e=>setFd({...fd,name:e.target.value})} style={is}/></div>
          <div><label style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6 }}>Email *</label><input type="email" value={fd.email} onChange={e=>setFd({...fd,email:e.target.value})} style={is}/></div>
          <div><label style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6 }}>Phone (optional)</label><input type="tel" value={fd.phone} onChange={e=>setFd({...fd,phone:e.target.value})} style={is}/></div>
          <div><label style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6 }}>Tell us about your situation</label><textarea rows={4} value={fd.message} onChange={e=>setFd({...fd,message:e.target.value})} style={{ ...is,resize:"vertical",fontFamily:"inherit" }}/></div>
          <button onClick={handleContact} disabled={sending||!fd.email} style={{ width:"100%",padding:"16px 0",background:fd.email?C.gold:C.border,color:fd.email?C.bg:C.textDim,border:"none",fontSize:14,fontWeight:600,letterSpacing:2,cursor:fd.email?"pointer":"default",marginTop:8 }}>{sending?"SENDING...":"REQUEST A CALL"}</button>
        </div></FadeIn>}
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ padding:"60px 24px 32px",borderTop:"1px solid "+C.border }}>
      <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:32 }}>
        <div>
          <div style={{ display:"flex",alignItems:"baseline",gap:6,marginBottom:12 }}><span style={{ fontFamily:"Georgia,serif",fontSize:18,color:C.gold }}>THE ITALIAN</span><span style={{ fontFamily:"Georgia,serif",fontSize:18,color:C.white,marginLeft:6 }}>GATEWAY</span></div>
          <p style={{ color:C.textDim,fontSize:13,maxWidth:300,lineHeight:1.6 }}>Premium relocation advisory for high-net-worth individuals. Milan, Italy.</p>
          <p style={{ color:C.textDim,fontSize:13,marginTop:8 }}>info@theitaliangateway.com</p>
        </div>
        <div className="footer-grid" style={{ display:"flex",gap:48,flexWrap:"wrap" }}>
          <div><div style={{ color:C.gold,fontSize:11,letterSpacing:3,marginBottom:12,textTransform:"uppercase" }}>Services</div>{VERTICALS.slice(0,5).map(v=><div key={v.id} style={{ marginBottom:8 }}><span onClick={()=>{setPage("v-"+v.id);window.scrollTo(0,0)}} style={{ color:C.textDim,fontSize:13,cursor:"pointer",transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.textDim}>{v.title}</span></div>)}</div>
          <div><div style={{ color:C.gold,fontSize:11,letterSpacing:3,marginBottom:12,textTransform:"uppercase" }}>Tools</div>{[["Quiz","quiz"],["Locations","properties"],["Guides","guides"]].map(([l,t])=><div key={t} style={{ marginBottom:8 }}><span onClick={()=>{setPage(t);window.scrollTo(0,0)}} style={{ color:C.textDim,fontSize:13,cursor:"pointer",transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.textDim}>{l}</span></div>)}</div>
          <div><div style={{ color:C.gold,fontSize:11,letterSpacing:3,marginBottom:12,textTransform:"uppercase" }}>Company</div>{["About","Contact","Privacy Policy"].map(l=><div key={l} style={{ marginBottom:8 }}><span style={{ color:C.textDim,fontSize:13,cursor:"pointer" }}>{l}</span></div>)}</div>
        </div>
      </div>
      <div style={{ maxWidth:1200,margin:"40px auto 0",paddingTop:24,borderTop:"1px solid "+C.border,textAlign:"center" }}><p style={{ color:C.textDim,fontSize:12 }}>© 2026 The Italian Gateway. All rights reserved. This website does not constitute financial, legal, or tax advice.</p></div>
    </footer>
  );
}

function GuidesPage({ setPage }) {
  return (
    <section style={{ padding:"120px 24px 80px",maxWidth:1000,margin:"0 auto" }}>
      <FadeIn><div style={{ marginBottom:56 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Knowledge Hub</div><h1 style={{ fontFamily:"Georgia,serif",fontSize:"clamp(32px,5vw,48px)",color:C.white,fontWeight:400,marginBottom:16 }}>Guides for relocating to Italy</h1></div></FadeIn>
      <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
        {ARTICLES.map((a,i)=><FadeIn key={a.id} delay={i*80}><div onClick={()=>{setPage(a.id);window.scrollTo(0,0)}} style={{ background:C.card,border:"1px solid "+C.border,padding:"32px 36px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:24,transition:"all 0.3s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.goldDim;e.currentTarget.style.background=C.cardHover}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card}}>
          <div style={{ flex:1 }}><div style={{ display:"flex",gap:16,marginBottom:8,flexWrap:"wrap" }}><span style={{ color:C.gold,fontSize:11,letterSpacing:2,textTransform:"uppercase" }}>{a.cat}</span><span style={{ color:C.textDim,fontSize:11 }}>{a.read} read</span></div><h3 style={{ fontFamily:"Georgia,serif",fontSize:20,color:C.white,fontWeight:400,marginBottom:8,lineHeight:1.3 }}>{a.title}</h3><p style={{ color:C.textDim,fontSize:14,lineHeight:1.5,margin:0 }}>{a.desc}</p></div>
          <span style={{ color:C.gold,fontSize:24,flexShrink:0 }}>→</span>
        </div></FadeIn>)}
      </div>
    </section>
  );
}

function ArticleContent({ blocks }) {
  return blocks.map((b,i) => {
    if (b.type==="p") return <p key={i} style={{ color:C.text,fontSize:16,lineHeight:1.8,marginBottom:20 }}>{b.text}</p>;
    if (b.type==="h2") return <h2 key={i} style={{ fontFamily:"Georgia,serif",fontSize:28,color:C.white,fontWeight:400,marginTop:48,marginBottom:16,paddingBottom:12,borderBottom:"1px solid "+C.border }}>{b.text}</h2>;
    if (b.type==="h3") return <h3 key={i} style={{ fontFamily:"Georgia,serif",fontSize:21,color:C.gold,fontWeight:400,marginTop:32,marginBottom:12 }}>{b.text}</h3>;
    if (b.type==="list") return <ul key={i} style={{ margin:"0 0 24px",paddingLeft:0,listStyle:"none" }}>{b.items.map((it,j)=><li key={j} style={{ color:C.text,fontSize:15,lineHeight:1.7,marginBottom:10,paddingLeft:24,position:"relative" }}><span style={{ position:"absolute",left:0,color:C.gold }}>•</span>{it}</li>)}</ul>;
    if (b.type==="table") return <div key={i} style={{ overflowX:"auto",marginBottom:24 }}><table style={{ width:"100%",borderCollapse:"collapse",fontSize:14 }}><thead><tr>{b.headers.map((h,j)=><th key={j} style={{ textAlign:"left",padding:"12px 16px",background:"rgba(201,169,110,0.1)",color:C.gold,fontWeight:600,fontSize:12,letterSpacing:1,textTransform:"uppercase",borderBottom:"2px solid "+C.gold }}>{h}</th>)}</tr></thead><tbody>{b.rows.map((r,j)=><tr key={j}>{r.map((c,k)=><td key={k} style={{ padding:"12px 16px",color:C.text,borderBottom:"1px solid "+C.border,lineHeight:1.5 }}>{c}</td>)}</tr>)}</tbody></table></div>;
    if (b.type==="callout") return <div key={i} style={{ background:"rgba(201,169,110,0.08)",borderLeft:"3px solid "+C.gold,padding:"20px 24px",marginBottom:24 }}><p style={{ color:C.text,fontSize:15,lineHeight:1.7,margin:0 }}>{b.text}</p></div>;
    if (b.type==="faq") return <div key={i} style={{ marginBottom:24 }}><h4 style={{ color:C.white,fontSize:16,fontWeight:600,marginBottom:8 }}>{b.q}</h4><p style={{ color:C.textDim,fontSize:15,lineHeight:1.7,margin:0 }}>{b.a}</p></div>;
    return null;
  });
}

function ArticlePage({ id, setPage }) {
  const a = ARTICLES.find(x=>x.id===id);
  if (!a) return null;
  return (
    <section style={{ padding:"120px 24px 80px",maxWidth:780,margin:"0 auto" }}>
      <div style={{ marginBottom:48 }}>
        <span onClick={()=>{setPage("guides");window.scrollTo(0,0)}} style={{ color:C.gold,fontSize:13,cursor:"pointer",marginBottom:24,display:"inline-block" }}>{"< Back to Guides"}</span>
        <div style={{ display:"flex",gap:16,marginBottom:16,flexWrap:"wrap" }}><span style={{ color:C.gold,fontSize:11,letterSpacing:2,textTransform:"uppercase",background:"rgba(201,169,110,0.1)",padding:"4px 12px" }}>{a.cat}</span><span style={{ color:C.textDim,fontSize:12 }}>{a.read} read</span></div>
        <h1 style={{ fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,40px)",color:C.white,fontWeight:400,lineHeight:1.25,marginBottom:20 }}>{a.title}</h1>
        <p style={{ color:C.textDim,fontSize:17,lineHeight:1.7 }}>{a.desc}</p>
        <div style={{ height:2,background:"linear-gradient(to right,"+C.gold+",transparent)",marginTop:32 }}/>
      </div>
      <ArticleContent blocks={a.content}/>
      <div style={{ background:C.card,border:"1px solid "+C.gold,padding:48,textAlign:"center",marginTop:48 }}><h3 style={{ fontFamily:"Georgia,serif",fontSize:24,color:C.white,fontWeight:400,marginBottom:12 }}>Want personalized guidance?</h3><p style={{ color:C.textDim,fontSize:14,maxWidth:400,margin:"0 auto 24px" }}>Confidential 30-minute call to discuss your situation.</p><button onClick={()=>{setPage("contact")}} style={{ background:C.gold,color:C.bg,padding:"14px 36px",border:"none",fontSize:13,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>BOOK A CALL</button></div>
      <div style={{ marginTop:64,paddingTop:32,borderTop:"1px solid "+C.border }}><div style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:16 }}>More Guides</div>
        {ARTICLES.filter(x=>x.id!==id).slice(0,3).map(x=><div key={x.id} onClick={()=>{setPage(x.id);window.scrollTo(0,0)}} style={{ padding:"16px 0",borderBottom:"1px solid "+C.border,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center" }} onMouseEnter={e=>e.currentTarget.querySelector("h4").style.color=C.gold} onMouseLeave={e=>e.currentTarget.querySelector("h4").style.color=C.white}><div><span style={{ color:C.gold,fontSize:10,letterSpacing:2,textTransform:"uppercase" }}>{x.cat}</span><h4 style={{ fontFamily:"Georgia,serif",fontSize:16,color:C.white,fontWeight:400,margin:"4px 0 0",transition:"color 0.2s" }}>{x.title}</h4></div><span style={{ color:C.gold }}>→</span></div>)}
      </div>
    </section>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  // Smart setPage: maps old page names to real URLs
  const setPage = (p) => {
    // Sections on homepage (scroll targets)
    const sections = ["services", "plans", "contact", "cost"];
    if (sections.includes(p)) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(p)?.scrollIntoView({ behavior: "smooth" }), 250);
      } else {
        document.getElementById(p)?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    if (p === "home") { navigate("/"); return; }
    if (p === "guides") { navigate("/guides"); return; }
    if (p === "quiz") { navigate("/quiz"); return; }
    if (p === "properties") { navigate("/locations"); return; }
    if (p.startsWith("v-")) { navigate("/service/" + p.replace("v-","")); return; }
    if (ARTICLES.some(a => a.id === p)) { navigate("/guide/" + p); return; }
    navigate("/");
  };

  // Derive page state from URL
  const segments = location.pathname.split("/").filter(Boolean);
  let page = "home";
  if (segments[0] === "guides" && !segments[1]) page = "guides";
  else if (segments[0] === "quiz") page = "quiz";
  else if (segments[0] === "locations") page = "properties";
  else if (segments[0] === "service" && segments[1]) page = "v-" + segments[1];
  else if (segments[0] === "guide" && segments[1]) page = segments[1];

  const isArt = ARTICLES.some(a=>a.id===page);
  const isVert = page.startsWith("v-");
  return (
    <div style={{ background:C.bg,minHeight:"100vh",fontFamily:"'Segoe UI',-apple-system,sans-serif",color:C.text }}>
      <MobileStyles/>
      <BackToTop/>
      <Nav setPage={setPage}/>
      {page==="home" && <><Hero setPage={setPage}/><ServicesGrid setPage={setPage}/><RetireeSection setPage={setPage}/><CostOfLiving/><Pricing/><Newsletter/><Contact/></>}
      {page==="guides" && <GuidesPage setPage={setPage}/>}
      {page==="quiz" && <QuizPage setPage={setPage}/>}
      {page==="properties" && <PropertyGallery setPage={setPage}/>}
      {isVert && <VerticalPage id={page.replace("v-","")} setPage={setPage}/>}
      {isArt && <ArticlePage id={page} setPage={setPage}/>}
      <Footer setPage={setPage}/>
    </div>
  );
}
