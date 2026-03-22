// ============================================================
// ARTICLES.JS — Aggiungi nuovi articoli qui!
// ============================================================
// Per aggiungere un articolo:
// 1. Copia il template in fondo al file
// 2. Compila tutti i campi
// 3. Il sito lo mostra automaticamente
//
// Per il contenuto: usa un array di "blocchi".
// Ogni blocco ha un "type" e il suo contenuto.
// Tipi disponibili:
//   { type: "p", text: "..." }                    → paragrafo
//   { type: "h2", text: "..." }                   → titolo sezione
//   { type: "h3", text: "..." }                   → sottotitolo
//   { type: "table", headers: [...], rows: [[...], ...] } → tabella
//   { type: "list", items: ["...", "..."] }        → lista puntata
//   { type: "callout", text: "..." }               → box evidenziato
//   { type: "faq", q: "...", a: "..." }            → domanda/risposta
// ============================================================

const ARTICLES = [

  // ============================================================
  // ARTICLE 1 — Flat Tax
  // ============================================================
  {
    id: "flat-tax-2026",
    cat: "Tax & Legal",
    title: "Italy's Flat Tax Regime 2026: Complete Guide for New Residents",
    date: "March 2026",
    read: "12 min",
    desc: "Everything HNWI need to know about the €200,000 flat tax: eligibility, family extension, inheritance exemptions, and how to apply.",
    content: [
      { type: "p", text: "Italy's flat tax regime for new residents — formally known as the regime forfettario per neo-residenti under Article 24-bis of the TUIR — has become one of Europe's most attractive tax frameworks for high-net-worth individuals. Introduced in 2017 and refined in subsequent budgets, it allows qualifying new tax residents to pay a fixed substitute tax of €200,000 per year on all foreign-sourced income, regardless of the amount. On an income of €5 million, that's an effective rate of 4%. On €20 million, it's 1%." },
      { type: "p", text: "This guide covers everything you need to know to evaluate, plan, and apply for the regime in 2026." },

      { type: "h2", text: "How It Works" },
      { type: "p", text: "The flat tax replaces Italy's ordinary progressive income tax (IRPEF), which reaches 43% on income above €50,000, with a single annual payment of €200,000 that covers all foreign-sourced income. Italian-sourced income — such as an Italian salary or rent from Italian property — remains taxed at normal progressive rates." },
      { type: "p", text: "The regime lasts for 15 years from the date of election, provided you maintain Italian tax residency. You can revoke it at any time, but once revoked, you cannot re-elect it." },

      { type: "h2", text: "Eligibility Requirements" },
      { type: "p", text: "To qualify, you must meet two conditions:" },
      { type: "list", items: [
        "The 9-out-of-10 rule: You must not have been an Italian tax resident for at least 9 of the 10 tax years preceding the year in which you elect the regime. This is the critical threshold that catches many applicants off guard — even one year of Italian tax residency in the wrong period can disqualify you.",
        "Transfer of tax residence to Italy: You must establish genuine Italian tax residency, which under Italian law requires being registered in the Anagrafe of an Italian municipality, having your domicile (center of vital interests) in Italy, or being physically present in Italy for more than 183 days in a tax year."
      ]},

      { type: "h2", text: "What Income Is Covered" },
      { type: "p", text: "The flat tax covers all categories of foreign-sourced income, including:" },
      { type: "list", items: [
        "Employment income earned outside Italy",
        "Self-employment income from activities performed abroad",
        "Business income from foreign enterprises",
        "Dividends from foreign companies",
        "Interest from foreign bank accounts and bonds",
        "Rental income from foreign property",
        "Capital gains on foreign investments",
        "Pension income from foreign pension schemes"
      ]},
      { type: "callout", text: "Critical: Income sourced from Italy is NOT covered by the flat tax and is taxed at ordinary progressive rates (up to 43%). Careful income planning is essential — structure your affairs so that value creation occurs outside Italy wherever possible." },

      { type: "h2", text: "Family Extension" },
      { type: "p", text: "One of the regime's most powerful features is the family extension. Each additional family member who also transfers their tax residence to Italy can be added to the flat tax regime for €25,000 per year per person. This includes your spouse, children, parents, and in-laws." },
      { type: "table", headers: ["Family Size", "Annual Cost", "Effective Rate on €5M", "Effective Rate on €20M"], rows: [
        ["Individual", "€200,000", "4.0%", "1.0%"],
        ["Couple", "€225,000", "4.5%", "1.1%"],
        ["Family of 4", "€275,000", "5.5%", "1.4%"],
        ["Extended (6)", "€325,000", "6.5%", "1.6%"]
      ]},

      { type: "h2", text: "Inheritance and Gift Tax Exemption" },
      { type: "p", text: "For many HNWI, the inheritance tax benefit is even more valuable than the income tax saving. Under the flat tax regime, foreign assets are exempt from Italian inheritance and gift tax. Italy's ordinary inheritance tax on non-family transfers can reach 8% with no threshold, and even direct-line transfers are taxed at 4% above €1 million per heir." },
      { type: "p", text: "Under the regime, a €50 million foreign estate passes to heirs completely free of Italian inheritance tax. This single feature can save multi-generational families millions." },

      { type: "h2", text: "IVIE and IVAFE Exemptions" },
      { type: "p", text: "Taxpayers under the regime are also exempt from IVIE (the 0.76% tax on foreign real estate) and IVAFE (the 0.2% tax on foreign financial assets). On a €10 million investment portfolio, the IVAFE exemption alone saves €20,000 per year." },

      { type: "h2", text: "How to Apply" },
      { type: "p", text: "There are two routes:" },
      { type: "list", items: [
        "Interpello preventivo (advance ruling): Submit a formal request to the Agenzia delle Entrate before filing your tax return, asking for confirmation of eligibility. This is the recommended route as it provides legal certainty. Processing time is typically 120 days.",
        "Direct election in tax return: Elect the regime directly in your first Italian tax return (Modello Redditi PF) covering the year in which you become tax resident. This is simpler but provides less certainty."
      ]},

      { type: "h2", text: "Quadro RW: Foreign Asset Reporting" },
      { type: "p", text: "Taxpayers under the flat tax regime are exempt from Quadro RW reporting obligations for the foreign assets covered by the regime. This means you do not need to declare your foreign bank accounts, investment portfolios, or real estate in the annual foreign asset disclosure. This is a significant administrative simplification and a privacy advantage." },

      { type: "h2", text: "Countries with Tax Treaties: The Cherry-Picking Option" },
      { type: "p", text: "You can exclude one or more countries from the flat tax regime and instead apply ordinary Italian tax treatment (with treaty benefits) to income from those countries. This is useful if you have income from a country where the treaty rate is lower than the flat tax would imply. The choice is made at the time of election and can be modified annually." },

      { type: "h2", text: "Comparison with Other EU Regimes" },
      { type: "table", headers: ["Country", "Regime", "Duration", "Cost/Rate", "Key Limitation"], rows: [
        ["Italy", "Flat tax", "15 years", "€200K fixed", "Only foreign income"],
        ["Portugal (ex-NHR)", "Simplified", "10 years", "20% on certain income", "Narrower scope since 2024"],
        ["Greece", "Flat tax", "15 years", "€100K fixed", "Must invest €500K in Greek assets"],
        ["Switzerland", "Lump-sum taxation", "Ongoing", "Varies by canton", "Cannot work in Switzerland"],
        ["Malta", "Non-dom", "Ongoing", "15% minimum €5K", "Remittance basis only"],
        ["Cyprus", "Non-dom", "17 years", "0% on dividends", "Uncertain EU future"]
      ]},
      { type: "p", text: "Italy's regime stands out for three reasons: the 15-year duration is the longest in Europe, the inheritance tax exemption is unmatched, and Milan offers a genuine world-class city lifestyle that no other flat tax jurisdiction can match." },

      { type: "h2", text: "Practical Timeline" },
      { type: "list", items: [
        "12 months before: Verify the 9/10 year rule with Italian tax counsel",
        "6-9 months: Plan income restructuring to maximize foreign-source classification",
        "6 months: Begin Anagrafe registration and property/lease arrangements",
        "3 months: Submit interpello preventivo if using advance ruling route",
        "Day 1: Establish physical presence in Italy, register at Anagrafe",
        "First tax return: Elect the regime (if not using interpello)"
      ]},

      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "Can I work in Italy under the flat tax?", a: "Yes, but income from work performed in Italy is Italian-sourced and taxed at progressive rates. The flat tax only covers foreign income. If you manage a foreign company from Milan, the key question is where the economic value is created." },
      { type: "faq", q: "What if I already have Italian citizenship?", a: "Citizenship is irrelevant. The only test is tax residency. If you have Italian citizenship but have not been tax resident in Italy for 9 of the last 10 years, you qualify." },
      { type: "faq", q: "Can I leave before 15 years?", a: "Yes. You can revoke the regime at any time. There is no clawback on previous payments. If you leave Italy entirely, the regime simply ends." },
      { type: "faq", q: "Is the €200,000 indexed to inflation?", a: "Currently no. The amount has been fixed at €200,000 since it was raised from €100,000 in 2024. Future budget laws could change this." },

      { type: "callout", text: "Disclaimer: This guide provides general information as of March 2026. Tax laws change frequently. Always consult qualified Italian tax counsel before making decisions. The Italian Gateway coordinates these professionals on your behalf but does not provide direct tax advice." },
    ]
  },

  // ============================================================
  // ARTICLE 2 — Lake Como Property
  // ============================================================
  {
    id: "lake-como-property",
    cat: "Real Estate",
    title: "Buying Property on Lake Como: Complete Guide for International Buyers",
    date: "March 2026",
    read: "15 min",
    desc: "Best towns, realistic pricing, the Italian buying process, transaction costs, renovation, and rental yields.",
    content: [
      { type: "p", text: "Lake Como has been attracting the world's elite for centuries — from Roman senators to Romantic poets to today's tech billionaires and film stars. Its appeal is timeless: dramatic Alpine scenery, elegant villas, Mediterranean-like microclimate, and proximity to both Milan (45 minutes) and Switzerland (the Swiss border is at the lake's northern tip). For HNWI relocating to Milan under Italy's flat tax regime, a Lake Como property represents both a lifestyle upgrade and a sound investment." },
      { type: "p", text: "This guide covers the practical realities of buying on the lake: where to buy, what things actually cost, the purchase process, taxes, renovation considerations, and rental potential." },

      { type: "h2", text: "Where to Buy: The Best Towns" },
      { type: "p", text: "Lake Como is shaped like an inverted Y, with three branches meeting at the Bellagio peninsula. Each area has a distinct character and price profile." },

      { type: "h3", text: "The Western Shore (Tremezzina)" },
      { type: "p", text: "The western shore — running from Cernobbio through Moltrasio, Laglio, Lenno, Tremezzo, and Menaggio — is the most sought-after stretch. This is where the iconic Grand Hotel Tremezzo sits, where Villa Balbianello looks out over the water, and where George Clooney owns his estate in Laglio. Properties here command the highest prices, with direct lake access adding 40-60% to the value." },

      { type: "h3", text: "Bellagio" },
      { type: "p", text: "Known as the 'Pearl of the Lake,' Bellagio sits at the point where the two southern branches meet. It is the most recognizable name globally and has the most developed tourist infrastructure. Property here is expensive per square meter but harder to find — the town is compact and inventory is limited. Excellent for rental yield due to constant tourist demand." },

      { type: "h3", text: "The Eastern Shore (Varenna)" },
      { type: "p", text: "The eastern shore, centered around Varenna, is quieter and somewhat more affordable. Varenna itself is stunningly beautiful — pastel-colored houses cascading down to a small harbor — and has a loyal following among buyers who want authenticity over glamour. The train connection to Milan is convenient (1 hour to Milano Centrale)." },

      { type: "h3", text: "Cernobbio and the Southern Lake" },
      { type: "p", text: "Cernobbio, home to Villa d'Este (now one of the world's most famous hotels), is the closest premium location to Milan. It's the preferred choice for buyers who want to commute to the city regularly. The southern portion of the lake, around Como town itself, is the most urban and accessible." },

      { type: "h2", text: "Realistic Pricing: What Your Budget Gets You" },
      { type: "table", headers: ["Budget", "What You Get", "Best Locations"], rows: [
        ["€500K – €1M", "Renovated 2-bed apartment with partial lake view. Or an unrenovated small house/rustico in a hillside village.", "Menaggio, Varenna, Griante, upper hillside"],
        ["€1M – €3M", "Renovated 3-bed apartment with direct lake view. Or a period house with garden, requiring some updating.", "Bellagio, Tremezzina, Cernobbio outskirts"],
        ["€3M – €5M", "Period villa with private garden, lake view, potentially a small private dock. 200-400 sqm.", "Western shore, Bellagio"],
        ["€5M – €10M", "Grand villa with grounds, boathouse, direct lake frontage. 400-800 sqm of living space.", "Tremezzina, Laglio, Cernobbio prime"],
        ["€10M – €25M", "Trophy estate with historical significance, extensive grounds, private dock, guest house.", "Bellagio peninsula, western shore prime"],
        ["€25M+", "Iconic lakefront estate. These are rare — perhaps 2-3 come to market per year.", "Cernobbio, Bellagio, Torno"]
      ]},

      { type: "callout", text: "Key insight: The gap between 'lake view' and 'lake access' is enormous. A property with a private dock and direct water access can cost 2-3x more than a comparable property 200 meters up the hillside. Decide early whether waterfront access is essential or aspirational." },

      { type: "h2", text: "The Purchase Process: Step by Step" },
      { type: "p", text: "Italian real estate transactions follow a structured process that differs significantly from UK, US, or UAE norms. Understanding it prevents costly mistakes." },

      { type: "h3", text: "1. Proposta d'Acquisto (Offer)" },
      { type: "p", text: "A written, binding offer submitted to the seller, usually through the estate agent. Accompanied by a deposit (typically €5,000–€20,000) held in escrow. The offer has a deadline (usually 2-4 weeks). If the seller accepts, both parties are bound." },

      { type: "h3", text: "2. Compromesso (Preliminary Contract)" },
      { type: "p", text: "The full preliminary contract, signed by both parties, typically within 30 days of the accepted offer. At this stage, the buyer pays a deposit of 10-30% of the purchase price (caparra confirmatoria). This is a binding deposit: if the buyer withdraws, they lose it. If the seller withdraws, they must return double the amount." },

      { type: "h3", text: "3. Due Diligence Period" },
      { type: "p", text: "Between compromesso and rogito, your lawyer and geometra (surveyor/technical consultant) verify: land registry records (catasto), urban planning compliance, building permits, mortgage/lien clearance, condominium rules (if apartment), and any conservation restrictions (vincolo paesaggistico — common on the lake)." },

      { type: "h3", text: "4. Rogito (Final Deed)" },
      { type: "p", text: "The notarized final deed, signed before a notaio (Italian public notary). The full purchase price is paid (minus deposits already paid), and ownership transfers immediately. The notaio registers the deed at the land registry. Total time from accepted offer to rogito: typically 2-4 months." },

      { type: "h2", text: "Transaction Costs" },
      { type: "table", headers: ["Cost", "Amount", "Notes"], rows: [
        ["Registration tax (imposta di registro)", "2% if primary home, 9% if second home", "Calculated on cadastral value, not purchase price — typically much lower"],
        ["VAT (IVA)", "4% primary / 10% second / 22% luxury", "Only if buying from a developer. Otherwise, registration tax applies"],
        ["Notary fees", "€2,000 – €6,000", "Based on property value"],
        ["Agent commission", "3-4% + VAT", "Split buyer/seller in Italy. Budget 3% as buyer."],
        ["Legal fees", "€3,000 – €8,000", "For independent lawyer (highly recommended)"],
        ["Geometra/survey", "€1,500 – €4,000", "Technical due diligence"],
        ["Mortgage costs (if applicable)", "0.25% tax + bank fees", "Italian mortgages available to foreign buyers"]
      ]},
      { type: "p", text: "Budget approximately 12-15% of the purchase price for total transaction costs on a second home purchase. First home (prima casa) benefits significantly reduce the registration tax." },

      { type: "h2", text: "Renovation: What to Expect" },
      { type: "p", text: "Many of the most characterful Lake Como properties require renovation. Italian renovation costs have risen significantly post-COVID but remain well below UK or Swiss levels." },
      { type: "table", headers: ["Renovation Level", "Cost per sqm", "What It Includes"], rows: [
        ["Light refresh", "€800 – €1,500/sqm", "New bathrooms, kitchen update, painting, electrical upgrade"],
        ["Full renovation", "€2,000 – €3,500/sqm", "Structural changes, new systems, high-spec finishes"],
        ["Luxury/restoration", "€3,500 – €5,000+/sqm", "Historical restoration, imported materials, landscape design"]
      ]},
      { type: "callout", text: "Planning tip: Lakefront properties often have conservation restrictions (vincolo paesaggistico) that require approval from the Soprintendenza for exterior changes. This adds 3-6 months to any renovation involving the facade, roof, or grounds. Factor this into your timeline." },

      { type: "h2", text: "Rental Potential" },
      { type: "p", text: "Lake Como has strong rental demand, particularly in the luxury short-term segment (April-October). A well-presented 3-bedroom villa with lake view and pool can command €1,500-€4,000 per night in peak season." },
      { type: "table", headers: ["Property Type", "Weekly Rate (Peak)", "Annual Gross Yield", "Occupancy (Managed)"], rows: [
        ["2-bed apartment, lake view", "€2,000 – €3,500", "3-5%", "60-70% (Apr-Oct)"],
        ["3-bed villa, garden + pool", "€5,000 – €12,000", "3-6%", "55-65% (Apr-Oct)"],
        ["5-bed estate, lakefront", "€15,000 – €30,000+", "2-4%", "40-55% (Apr-Oct)"]
      ]},
      { type: "p", text: "Important: Under Italy's flat tax regime, rental income from Italian property is Italian-sourced and taxed at progressive rates (or the optional cedolare secca flat rate of 21% for residential rentals). It is NOT covered by the €200,000 flat tax. Factor this into your financial planning." },

      { type: "h2", text: "Common Mistakes to Avoid" },
      { type: "list", items: [
        "Buying without a lake survey: Lake levels fluctuate. Properties that look idyllic in summer can have water issues in winter/spring.",
        "Underestimating access: Some hillside properties have challenging access roads, especially in winter. Always visit in the off-season before buying.",
        "Skipping the geometra: An independent technical survey often reveals building irregularities that can take months to resolve.",
        "Ignoring the vincolo: Conservation restrictions on lakefront properties are strict. Plan for them, don't fight them.",
        "Not verifying boat mooring rights: If waterfront, confirm whether the property includes deeded mooring rights. These are extremely valuable and cannot always be acquired separately."
      ]},

      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "Can foreigners buy property in Italy?", a: "Yes. There are no restrictions on foreign property ownership in Italy for citizens of countries with reciprocal agreements (which includes the US, UK, EU, Switzerland, and most major economies). You do need an Italian codice fiscale (tax ID), which can be obtained from the Italian consulate or in person at the Agenzia delle Entrate." },
      { type: "faq", q: "Can I get an Italian mortgage?", a: "Yes. Italian banks lend to foreign buyers, typically up to 60-70% LTV at competitive rates. The process takes 4-8 weeks. You will need proof of income, tax returns, and bank statements. Having an Italian bank account is required." },
      { type: "faq", q: "How far is Lake Como from Milan airports?", a: "Malpensa (MXP): 60-75 minutes by car. Linate (LIN): 75-90 minutes. Bergamo/Orio al Serio (BGY): 90 minutes. Como itself is 50 minutes from Milan city center." },
      { type: "faq", q: "Is Lake Como a good investment?", a: "Historically, yes. Prime lakefront property has appreciated 5-8% annually over the past decade, with limited supply providing a natural floor. However, past performance is no guarantee — the market is illiquid at the top end, and you should buy primarily for lifestyle, not speculation." },

      { type: "callout", text: "Disclaimer: This guide provides general information as of March 2026. Property markets, tax laws, and regulations change. Always engage qualified local professionals. The Italian Gateway provides independent buyer advisory for Lake Como properties." },
    ]
  },

  // ============================================================
  // ARTICLE 3 — International Schools
  // ============================================================
  {
    id: "international-schools",
    cat: "Education",
    title: "Best International Schools in Milan 2026: Fees, Curricula & Admissions",
    date: "March 2026",
    read: "10 min",
    desc: "ASM, ISM, St. Louis, Sir James Henderson — compared. Plus admissions timeline and how to choose.",
    content: [
      { type: "p", text: "For HNWI families relocating to Milan, school choice is often the single most time-sensitive decision. The best international schools have waiting lists that stretch 6-12 months, and a late application can delay your entire move by a year. This guide compares Milan's top international schools across every dimension that matters: curriculum, fees, class size, university placement, language support, and culture." },

      { type: "h2", text: "The Four Best International Schools in Milan" },

      { type: "h3", text: "1. American School of Milan (ASM)" },
      { type: "p", text: "Founded in 1962, ASM is Milan's oldest and most established international school. It follows an American curriculum through high school, with both AP (Advanced Placement) courses and the IB Diploma Programme available in the final two years. The campus is in Noverasco di Opera, about 20 minutes south of Milan's center, set in a large green campus with excellent sports facilities." },
      { type: "table", headers: ["Detail", "Info"], rows: [
        ["Curriculum", "American + IB Diploma"],
        ["Ages", "3-18 (Pre-K to Grade 12)"],
        ["Annual fees", "€22,000 – €31,000"],
        ["Class size", "18-20 students"],
        ["Total enrollment", "~900 students"],
        ["Nationalities", "50+"],
        ["IB average score", "35-36 (above global average of 30)"],
        ["University destinations", "Strong US placement; growing UK/EU"],
        ["Language", "English instruction; Italian language classes from Pre-K"]
      ]},
      { type: "p", text: "Best for: Families planning to return to the US or targeting US universities. Also strong for those wanting the broadest extracurricular offerings in Milan." },

      { type: "h3", text: "2. International School of Milan (ISM)" },
      { type: "p", text: "ISM is the largest international school in Milan, offering the full IB continuum from Primary Years Programme (PYP) through Middle Years Programme (MYP) to the IB Diploma. The campus is in the Baranzate/Novate area, northwest of the center, with modern facilities including a performing arts center and sports complex." },
      { type: "table", headers: ["Detail", "Info"], rows: [
        ["Curriculum", "Full IB continuum (PYP, MYP, DP)"],
        ["Ages", "3-18"],
        ["Annual fees", "€20,000 – €28,000"],
        ["Class size", "20-22 students"],
        ["Total enrollment", "~1,400 students"],
        ["Nationalities", "70+"],
        ["IB average score", "34-35"],
        ["University destinations", "Strong UK and European placement"],
        ["Language", "English instruction; Italian + third language"]
      ]},
      { type: "p", text: "Best for: Families wanting the purest IB experience and the most internationally diverse student body. The size means more course options and extracurriculars." },

      { type: "h3", text: "3. St. Louis School" },
      { type: "p", text: "St. Louis follows the British curriculum through IGCSE (Year 11), then offers the IB Diploma for the final two years. The school is located in central Milan — via Caviglia, near Porta Romana — making it the most conveniently located option for families living in the city center. It's smaller and more intimate than ASM or ISM." },
      { type: "table", headers: ["Detail", "Info"], rows: [
        ["Curriculum", "British (EYFS, Key Stages, IGCSE) → IB Diploma"],
        ["Ages", "3-18"],
        ["Annual fees", "€18,000 – €27,000"],
        ["Class size", "18-20 students"],
        ["Total enrollment", "~700 students"],
        ["Nationalities", "40+"],
        ["IB average score", "34-37"],
        ["University destinations", "Strong UK; good Bocconi/Politecnico placement"],
        ["Language", "English instruction; bilingual Italian program available"]
      ]},
      { type: "p", text: "Best for: Families wanting central Milan location, British curriculum structure, and a bilingual path for genuine Italian integration." },

      { type: "h3", text: "4. Sir James Henderson School (British School of Milan)" },
      { type: "p", text: "The British School of Milan, officially named after its founder Sir James Henderson, is one of Italy's oldest British schools. It offers the English National Curriculum through GCSE and A-Levels (not IB). The campus is in the Lancetti area, northwest of center." },
      { type: "table", headers: ["Detail", "Info"], rows: [
        ["Curriculum", "English National Curriculum → A-Levels"],
        ["Ages", "3-18"],
        ["Annual fees", "€17,000 – €25,000"],
        ["Class size", "18-22 students"],
        ["Total enrollment", "~700 students"],
        ["Nationalities", "35+"],
        ["A-Level results", "Strong; A*-B rate above UK average"],
        ["University destinations", "Primarily UK (Russell Group); some Bocconi"],
        ["Language", "English instruction; Italian from Year 1"]
      ]},
      { type: "p", text: "Best for: Families committed to the UK university pathway (Oxbridge, Russell Group). A-Levels are still preferred by many UK universities over IB." },

      { type: "h2", text: "Side-by-Side Comparison" },
      { type: "table", headers: ["Factor", "ASM", "ISM", "St. Louis", "SJH"], rows: [
        ["Location", "South (Opera)", "Northwest", "Central", "Northwest"],
        ["Max fee", "€31,000", "€28,000", "€27,000", "€25,000"],
        ["Curriculum", "American + IB", "Full IB", "British + IB", "British + A-Level"],
        ["Enrollment", "~900", "~1,400", "~700", "~700"],
        ["Class size", "18-20", "20-22", "18-20", "18-22"],
        ["US university focus", "★★★★★", "★★★", "★★", "★"],
        ["UK university focus", "★★★", "★★★★", "★★★★", "★★★★★"],
        ["Italian integration", "★★★", "★★★", "★★★★★", "★★★"],
        ["Bus service", "Yes (wide)", "Yes (wide)", "Limited", "Yes"]
      ]},

      { type: "h2", text: "Admissions: Timeline and Process" },
      { type: "p", text: "All four schools follow broadly similar admissions processes:" },
      { type: "list", items: [
        "12 months before: Begin research and attend virtual/in-person open days",
        "9-10 months: Submit application with school reports, teacher references, and passport copies",
        "6-8 months: Assessment day (varies by school — some do formal testing, others observe in classroom)",
        "4-6 months: Offer/waitlist notification",
        "2-3 months: Confirm acceptance, pay deposit (typically one term's fees)",
        "Enrolment: Complete medical forms, uniform orders, bus registration"
      ]},
      { type: "callout", text: "Critical: Do NOT wait until you have confirmed your move to apply. Apply speculatively to 2-3 schools as soon as you are considering relocation. You can always withdraw, but you cannot accelerate a waitlist." },

      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "My children don't speak Italian. Is that a problem?", a: "Not at international schools — English is the primary language of instruction at all four. All schools offer Italian as a second language from the early years, with support programs for beginners. Children typically reach conversational Italian within one school year." },
      { type: "faq", q: "Can my children enter the Italian public school system?", a: "Yes, Italy has excellent public schools, and they are free. However, instruction is entirely in Italian. This works well for younger children (under 8) who absorb language quickly, but is challenging for older students. Some families use international school for the first 1-2 years, then transition to Italian schools." },
      { type: "faq", q: "Are school fees covered by the flat tax?", a: "No. School fees are paid from after-tax income. They are not deductible under the flat tax regime. Budget them as a direct cost." },
      { type: "faq", q: "Which school is best for children coming from Dubai/GEMS schools?", a: "ISM is the most natural fit — large, internationally diverse, and follows the IB curriculum that many GEMS schools align with. ASM is the second choice, particularly if children have been in an American curriculum stream." },
    ]
  },

  // ============================================================
  // ARTICLE 4 — Healthcare
  // ============================================================
  {
    id: "healthcare-expats",
    cat: "Healthcare",
    title: "Healthcare in Milan for Expats: Public vs Private, Best Hospitals",
    date: "March 2026",
    read: "11 min",
    desc: "Italy's #2-ranked system explained: SSN registration, top hospitals, the recommended hybrid setup, and first-month checklist.",
    content: [
      { type: "p", text: "Italy's healthcare system is ranked second in the world by the World Health Organization — behind only France — and significantly ahead of the UK (#18), the US (#37), and the UAE (#27). For HNWI relocating from countries with expensive private-only systems, Italian healthcare is often the single biggest positive surprise of the move." },
      { type: "p", text: "This guide explains how the system works, how to access it as a new resident, and the recommended setup for international families in Milan." },

      { type: "h2", text: "The Italian National Health Service (SSN)" },
      { type: "p", text: "The Servizio Sanitario Nazionale provides universal healthcare to all Italian residents, funded through taxation. As a new resident — including under the flat tax regime — you are entitled to SSN coverage. Registration is done at your local ASL (Azienda Sanitaria Locale) within your municipality." },
      { type: "p", text: "SSN coverage includes: GP visits, specialist consultations (with GP referral), hospital care (including surgery), emergency care, maternity care, pediatric care (dedicated pediatrician for children under 14), prescription medications (with small copays), diagnostic tests and imaging, rehabilitation, and mental health services." },
      { type: "callout", text: "The cost of SSN for new residents who are not employed in Italy is approximately €387 per year per adult (voluntary enrollment fee). This grants you access to the same system that Italian citizens use. It is, quite possibly, the best healthcare deal in the world." },

      { type: "h2", text: "Best Hospitals in Milan" },
      { type: "p", text: "Milan is home to some of Europe's finest hospitals, many of which function as both public SSN hospitals and private patient facilities." },

      { type: "h3", text: "Ospedale San Raffaele" },
      { type: "p", text: "An IRCCS (research hospital of national significance) and one of Europe's top medical institutions. Internationally renowned for cardiology, neurology, oncology, and transplant surgery. It has a dedicated international patient department with English-speaking staff. Located in eastern Milan (Segrate area). Both SSN and private patient pathways available." },

      { type: "h3", text: "Humanitas Research Hospital" },
      { type: "p", text: "A modern, technology-focused hospital in Rozzano (southern Milan). Humanitas is a leader in oncology, orthopedics, and robotic surgery. The Humanitas University medical school is attached. The international patient service is well-developed. Both SSN and private." },

      { type: "h3", text: "Istituto Europeo di Oncologia (IEO)" },
      { type: "p", text: "Founded by oncologist Umberto Veronesi, IEO is one of Europe's top cancer centers. If your family has any oncological concerns, having IEO in your city is a significant advantage. Located in central-south Milan." },

      { type: "h3", text: "Centro Cardiologico Monzino" },
      { type: "p", text: "Italy's premier cardiovascular center, specializing in cardiac surgery, interventional cardiology, and cardiovascular research. It is the only IRCCS in Italy dedicated entirely to cardiovascular disease." },

      { type: "h3", text: "Istituto Ortopedico Galeazzi" },
      { type: "p", text: "One of the largest orthopedic hospitals in Europe, recently relocated to a brand-new facility in the MIND district (former Expo area). Specializes in joint replacement, sports medicine, and spinal surgery." },

      { type: "h2", text: "The Recommended Hybrid Setup" },
      { type: "p", text: "Most HNWI in Milan adopt a three-layer healthcare approach:" },

      { type: "h3", text: "Layer 1: SSN Registration (Free / €387/year)" },
      { type: "p", text: "Register with SSN for emergency care, hospital access, and major procedures. Even if you plan to use private facilities for day-to-day care, SSN registration ensures you are covered for emergencies and can access world-class hospitals like San Raffaele through the public pathway." },

      { type: "h3", text: "Layer 2: Private English-Speaking GP (€1,500-3,000/year)" },
      { type: "p", text: "Retain a private general practitioner who speaks your language, is available on short notice, and can coordinate between Italian specialists and any overseas doctors. This is the key piece for smooth daily healthcare. Recommended practices include International Medical Center Milan and the American International Medical Center (AIMC)." },

      { type: "h3", text: "Layer 3: International Health Insurance (€10,000-18,000/year for family)" },
      { type: "p", text: "An international policy (Cigna Global, Bupa International, AXA PPP) provides private room access, global coverage for travel, and the option to be treated at any facility worldwide. This is your safety net for repatriation, medical evacuation, and treatment outside Italy." },

      { type: "table", headers: ["Layer", "Annual Cost (Family of 4)", "What It Covers"], rows: [
        ["SSN registration", "~€800", "Emergency, hospital, major procedures, pediatrics"],
        ["Private GP", "€1,500 – €3,000", "Day-to-day care, coordination, house calls"],
        ["International insurance", "€10,000 – €18,000", "Private rooms, global coverage, repatriation"],
        ["TOTAL", "€12,300 – €21,800", "Complete coverage at world-class level"]
      ]},
      { type: "p", text: "Compare this to Dubai (€25,000-€40,000 for family insurance alone) or the US (€30,000-€50,000+ for comparable private coverage)." },

      { type: "h2", text: "First-Month Healthcare Checklist" },
      { type: "list", items: [
        "Register at the Anagrafe (municipal civil registry) — prerequisite for SSN",
        "Visit your local ASL with residence permit and codice fiscale to register for SSN",
        "Receive your Tessera Sanitaria (health card) — typically mailed within 2 weeks",
        "Choose a medico di base (GP) from the ASL's available list",
        "For children under 14: choose a pediatra di libera scelta (dedicated pediatrician)",
        "Set up private GP retainer for English-language day-to-day care",
        "Activate international health insurance with Italy as primary country of residence",
        "Transfer medical records from your previous country (have them translated if not in English or Italian)",
        "If ongoing prescriptions: visit private GP to have them re-prescribed under Italian system"
      ]},

      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "Can I see a specialist directly?", a: "Under SSN, you typically need a referral from your medico di base. Wait times for non-urgent specialist appointments can be 2-8 weeks in the public system. With private insurance or paying out-of-pocket (intramoenia), you can see a specialist within days at the same hospitals." },
      { type: "faq", q: "Are prescriptions expensive?", a: "Under SSN, most essential medications have a copay of €1-4 per prescription. Some medications are fully free. Non-essential medications (Class C) are at market price but still much cheaper than US prices." },
      { type: "faq", q: "What about dental care?", a: "Dental care for adults is mostly private in Italy. A comprehensive dental check-up costs €100-200. Major procedures are significantly cheaper than in the UK or US. Many international health insurance policies include dental. Children's dental care is partially covered by SSN." },
      { type: "faq", q: "How does emergency care work?", a: "Call 112 (the European emergency number) for emergencies. The Pronto Soccorso (emergency department) at any hospital will treat you regardless of insurance status or registration. For non-life-threatening issues, you will be triaged with a color code (white, green, yellow, red) and wait times vary accordingly." },

      { type: "callout", text: "Disclaimer: This guide provides general information as of March 2026. Healthcare regulations and costs change. Always consult your doctor for medical decisions. The Italian Gateway coordinates healthcare setup as part of our relocation service." },
    ]
  },

  // ============================================================
  // ARTICLE 5 — Dubai to Milan
  // ============================================================
  {
    id: "dubai-to-milan",
    cat: "Relocation",
    title: "Dubai to Milan: Why High-Net-Worth Individuals Are Making the Move in 2026",
    date: "March 2026",
    read: "14 min",
    desc: "Real cost comparison, tax transition from zero to flat tax, corporate restructuring, banking, schools, and step-by-step timeline.",
    content: [
      { type: "p", text: "A pattern is emerging across the wealth management world: individuals and families who moved to Dubai in the post-pandemic wave of 2020-2023 are now looking at Europe again — and Milan is the top destination." },
      { type: "p", text: "The reasons are consistent. Zero tax was the draw, but after two or three years in the UAE, many discover that tax is only one variable in a much larger equation. Quality of healthcare, depth of education, cultural richness, EU access, and long-term succession planning all enter the picture. Italy's flat tax regime — €200,000 per year on unlimited foreign income — has made Milan the obvious choice for those who want European life without European tax rates." },

      { type: "h2", text: "The Real Cost Comparison: Dubai vs Milan" },
      { type: "p", text: "The most common misconception is that Dubai is dramatically cheaper because of zero income tax. When you account for the full cost of living at a HNWI standard, the gap narrows significantly." },
      { type: "table", headers: ["Expense", "Dubai", "Milan (Flat Tax)"], rows: [
        ["Income tax (on €5M)", "€0", "€200,000"],
        ["Housing (4-bed luxury)", "€80K – €150K", "€48K – €96K"],
        ["International school (2 kids)", "€50K – €80K", "€40K – €60K"],
        ["Health insurance (family)", "€25K – €40K", "€10K – €18K (+ free SSN)"],
        ["Domestic staff", "€30K – €45K", "€25K – €35K"],
        ["Dining & entertainment", "€30K – €50K", "€20K – €35K"],
        ["Travel (flights to Europe)", "€15K – €30K", "€5K – €10K"],
        ["TOTAL", "€258K – €445K", "€365K – €482K"]
      ]},
      { type: "p", text: "At €5 million of foreign income, the total cost difference is approximately €100,000 per year in Dubai's favor. At €10 million, the flat tax stays at €200,000 while all other costs remain lower — making the gap negligible. Above €10 million, Milan's lifestyle cost advantage effectively eliminates the tax benefit of Dubai." },

      { type: "h2", text: "Tax Transition: From Zero to Flat Tax" },
      { type: "p", text: "The 9-out-of-10 rule is the critical eligibility test: you must not have been an Italian tax resident for at least 9 of the previous 10 tax years. If you moved to Dubai from Italy less than 9 years ago, you may not qualify. This needs to be verified carefully with Italian tax counsel." },
      { type: "p", text: "If your income is generated through UAE-based structures (FZCO, offshore company, DIFC entity, or personal investment portfolio), it is classified as foreign-sourced income under Italian law and is covered by the flat tax." },
      { type: "callout", text: "Critical exception: If you continue to perform work in Italy — even through a UAE entity — that income may be reclassified as Italian-sourced and taxed at progressive rates (up to 43%). The key is where the value is created, not where the company is registered." },

      { type: "h2", text: "Corporate Structure: What to Keep, What to Change" },
      { type: "h3", text: "Free Zone Company (FZCO/FZE)" },
      { type: "p", text: "If the company has genuine substance in the UAE — employees, office, operational activity — it can remain active. Income is foreign-sourced and covered by the flat tax. Risk: if the FZCO has no real substance, Italian authorities may apply CFC rules and tax the income at Italian rates." },

      { type: "h3", text: "DIFC / ADGM Entities" },
      { type: "p", text: "Typically holding companies or investment vehicles. Well-recognized internationally, they generally survive a move to Italy without issues, provided they maintain substance and are not deemed managed from Italy." },

      { type: "h3", text: "Offshore Companies (RAK, Jebel Ali, BVI)" },
      { type: "p", text: "Higher risk. Italian authorities pay close attention to offshore structures with no employees and purely passive income. Consider whether these still serve a purpose or should be simplified." },

      { type: "h2", text: "Banking: The Transition" },
      { type: "p", text: "Italian private banks will want to understand the source of your wealth, particularly if it flows from UAE structures. Be prepared to provide: company formation documents, audited accounts, bank statements, and a clear narrative. Banks experienced with international clients include Mediobanca Private Banking, Banca Generali, and Fideuram." },
      { type: "p", text: "Large transfers from UAE banks to Italian banks can take 2-4 weeks and may trigger enhanced due diligence on both sides. Plan well in advance." },

      { type: "h2", text: "Healthcare: A Major Upgrade" },
      { type: "p", text: "This is consistently the single biggest positive surprise for families moving from Dubai to Milan. Italy's healthcare system is ranked #2 in the world by the WHO. As an Italian resident, you get free public healthcare through the SSN, with access to hospitals like San Raffaele, Humanitas, and IEO — institutions among Europe's finest." },
      { type: "p", text: "For families with children, the difference is dramatic. Pediatric care in Italy is free — every child under 14 is assigned a dedicated pediatrician. Vaccinations, check-ups, specialist referrals — all covered. In Dubai, a single pediatric consultation costs €100-200." },

      { type: "h2", text: "Education: Depth vs Breadth" },
      { type: "table", headers: ["Factor", "Dubai", "Milan"], rows: [
        ["Annual fees (top tier)", "€25K – €40K", "€20K – €31K"],
        ["Class size", "22-28", "18-22"],
        ["IB average score", "32-35", "34-38"],
        ["Oxbridge/Ivy placement", "Limited", "Strong"],
        ["Italian language acquisition", "No", "Yes"]
      ]},

      { type: "h2", text: "The Practical Transition: Step by Step" },
      { type: "h3", text: "6-12 Months Before" },
      { type: "list", items: [
        "Verify flat tax eligibility with Italian tax advisor",
        "Review corporate structures — what to keep, restructure, or close",
        "Apply to schools (2-3 applications)",
        "Begin property search",
        "Engage Italian private bank — KYC takes 4-8 weeks"
      ]},
      { type: "h3", text: "3-6 Months Before" },
      { type: "list", items: [
        "Secure property (sign compromesso)",
        "Plan asset transfers between UAE and Italian banks",
        "Obtain Codice Fiscale from Italian consulate in Dubai/Abu Dhabi",
        "Arrange health insurance",
        "Notify UAE landlord (90-day notice)"
      ]},
      { type: "h3", text: "1-3 Months Before" },
      { type: "list", items: [
        "Complete property purchase (rogito) or sign lease",
        "Register at Anagrafe",
        "Register with SSN at local ASL",
        "Enroll children in school",
        "Set up utilities, internet, domestic services"
      ]},
      { type: "h3", text: "First Month in Milan" },
      { type: "list", items: [
        "Register for flat tax via interpello or first tax return",
        "Obtain Tessera Sanitaria",
        "Choose medico di base and pediatrician",
        "Cancel or modify UAE visa",
        "Convert driving license (Italy-UAE reciprocal agreement)"
      ]},

      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "Can I maintain my UAE residence visa while living in Italy?", a: "A UAE visa requires entry every 180 days. Many maintain it as a safety net the first year. For Italian tax purposes, Italy must be your primary residence (183+ days/year)." },
      { type: "faq", q: "My spouse does not work. Do they need flat tax coverage?", a: "If your spouse will have independent foreign income, adding them for €25,000/year is worthwhile. If no independent income, it may not be necessary — consult your tax advisor." },
      { type: "faq", q: "Can I fly my car from Dubai to Milan?", a: "Yes, but you'll pay 22% VAT on the assessed value plus homologation costs. For most people, selling in Dubai and buying in Italy is simpler and cheaper." },
      { type: "faq", q: "What if I want to return to Dubai later?", a: "You can leave Italy at any time. The flat tax simply stops — no clawback. Many view the 15-year window as flexible, using it fully or partially as circumstances evolve." },

      { type: "callout", text: "Disclaimer: This guide provides general information as of March 2026. Tax laws, immigration rules, and markets change frequently. Always consult qualified professionals. The Italian Gateway coordinates these professionals on your behalf." },
    ]
  },

  // ============================================================
  // ARTICLE 6 — Private Banking for HNWI
  // ============================================================
  {
    id: "private-banking-italy",
    cat: "Private Banking",
    title: "How to Open a Private Bank Account in Italy as a Foreign Resident",
    date: "March 2026",
    read: "9 min",
    desc: "A practical guide for HNWI on opening private banking relationships in Milan, navigating compliance requirements, and choosing between Italian and Swiss institutions.",
    content: [
      { type: "p", text: "Opening a private bank account in Italy as a foreign resident is not a simple walk-in process. Banks apply enhanced due diligence to international clients, particularly those with complex asset structures spanning multiple jurisdictions. This guide covers everything HNWI need to know about establishing banking relationships in Milan and Northern Italy." },
      { type: "h2", text: "Why Italy for Private Banking?" },
      { type: "p", text: "Italy's private banking sector manages over €900 billion in assets. Milan is home to the Italian operations of UBS, Credit Suisse (now under UBS), JP Morgan Private Bank, and several prestigious Italian institutions including Banca Generali, Mediobanca Private Banking, Fideuram, and Banca Aletti. The flat tax regime has made Italy increasingly attractive, and banks have built dedicated teams for international clients relocating under the €200,000 regime." },
      { type: "h2", text: "What Do Italian Private Banks Require from Foreign Clients?" },
      { type: "h3", text: "Documentation Checklist" },
      { type: "list", items: [
        "Valid passport and Italian codice fiscale (tax identification number)",
        "Proof of Italian residence (residency permit or EU registration certificate)",
        "Proof of address in Italy (rental contract or property deed)",
        "Source of wealth documentation: business ownership records, employment history, inheritance documents, or investment portfolios",
        "Last 2-3 years of tax returns from your previous country of residence",
        "Bank reference letter from your current institution",
        "If applicable: trust deeds, corporate structures, power of attorney documentation",
      ]},
      { type: "h3", text: "Minimum Thresholds" },
      { type: "table", headers: ["Institution Type", "Typical Minimum AUM", "Services Offered"], rows: [
        ["Italian private banks (Fideuram, Banca Generali)", "€500K - €1M", "Wealth management, portfolio advisory, insurance wrappers"],
        ["International private banks (UBS, JP Morgan)", "€2M - €5M", "Multi-currency, global custody, structured products, lending"],
        ["Family office services", "€10M+", "Bespoke advisory, direct investments, philanthropy, next-gen planning"],
      ]},
      { type: "h2", text: "How Long Does It Take to Open an Account?" },
      { type: "p", text: "Expect 4-8 weeks from initial meeting to full account activation. The main bottleneck is compliance: anti-money laundering (AML) checks, source of wealth verification, and FATCA/CRS reporting setup for US and international clients. Having documentation prepared in advance can cut this to 2-3 weeks. A professional introduction from a trusted intermediary significantly accelerates the process, as it signals pre-qualification to the bank's compliance team." },
      { type: "h2", text: "Italian Banks vs. Swiss Banks: Which Is Right for You?" },
      { type: "table", headers: ["Factor", "Italian Private Bank", "Swiss Private Bank (from Italy)"], rows: [
        ["Language", "Italian, English", "English, French, German, Italian"],
        ["Regulatory framework", "Banca d'Italia / CONSOB", "FINMA (Swiss regulation)"],
        ["Flat tax reporting", "Seamless domestic reporting", "Requires Quadro RW foreign asset declaration"],
        ["Currency options", "EUR-centric", "Multi-currency (CHF, USD, GBP, EUR)"],
        ["Lending / mortgages", "Easier for Italian property", "Cross-border lending available"],
        ["Minimum AUM", "€500K+", "€1M - €5M+"],
        ["Best for", "Primary residence, Italian life", "Multi-jurisdiction wealth, diversification"],
      ]},
      { type: "callout", text: "Many HNWI relocating to Italy maintain both: an Italian private bank for daily life, property financing, and local investments, alongside a Swiss institution for international portfolio management and currency diversification." },
      { type: "h2", text: "Common Mistakes When Opening Accounts" },
      { type: "list", items: [
        "Walking into a branch without an introduction: private banking is relationship-driven. Cold approaches often result in being redirected to retail banking.",
        "Incomplete source of wealth documentation: banks reject applications that cannot clearly trace how assets were accumulated.",
        "Not disclosing all jurisdictions: FATCA and CRS mean banks will discover foreign holdings anyway. Non-disclosure delays or kills the application.",
        "Choosing based on brand alone: the best bank for you depends on your specific needs, asset structure, and language preferences.",
        "Ignoring Italian estate planning implications: your banking structure should align with your succession plan from day one.",
      ]},
      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "Can I open an Italian bank account before I have a residence permit?", a: "Some banks allow account opening with a codice fiscale and proof of pending residence application. However, full private banking services typically require confirmed residency. A preliminary relationship can be established during the transition period." },
      { type: "faq", q: "Do I need to close my accounts in my home country?", a: "No. Italian tax residents must declare foreign accounts on the Quadro RW of their annual tax return, but there is no obligation to close them. Under the flat tax regime, foreign-source income is covered by the €200,000 lump sum, so foreign account income is not taxed separately." },
      { type: "faq", q: "What about banking secrecy?", a: "Italy participates fully in the Common Reporting Standard (CRS) and FATCA. There is no banking secrecy for tax purposes. However, Italian privacy laws are strict regarding third-party access to your financial information." },
      { type: "faq", q: "Can a relocation advisor help with banking introductions?", a: "Yes. A professional introduction to a senior relationship manager, rather than a cold approach, typically results in faster onboarding, better terms, and access to institutional services not available to walk-in clients. The Italian Gateway maintains relationships with all major private banking institutions in Milan." },
      { type: "callout", text: "Disclaimer: This guide provides general information as of March 2026. Banking regulations change. Always consult qualified professionals. The Italian Gateway coordinates introductions and does not provide financial advice." },
    ]
  },

  // ============================================================
  // ARTICLE 7 — Tax & Legal
  // ============================================================
  {
    id: "tax-legal-relocation",
    cat: "Tax & Legal",
    title: "Tax Planning for HNWI Relocating to Italy: Beyond the Flat Tax",
    date: "March 2026",
    read: "11 min",
    desc: "Comprehensive guide to Italy's tax advantages for new residents, including the €200K flat tax, 7% retiree regime, succession planning, and exit tax considerations.",
    content: [
      { type: "p", text: "Italy's flat tax regime gets the headlines, but smart tax planning for a relocation involves much more: exit taxes from your current country, succession planning across jurisdictions, corporate structuring, and long-term optimization. This guide covers the full picture for HNWI moving to Italy in 2026." },
      { type: "h2", text: "Italy's Flat Tax Options at a Glance" },
      { type: "table", headers: ["Regime", "Annual Tax", "Duration", "Who Qualifies", "Key Benefit"], rows: [
        ["New Resident Flat Tax", "€200,000/year", "Up to 15 years", "Non-resident for 9 of prior 10 tax years", "All foreign income covered, regardless of amount"],
        ["7% Retiree Flat Tax", "7% on foreign income", "10 years", "Pension recipients, move to Southern Italy municipality (<20K pop.)", "Low rate, covers all foreign-source income"],
        ["Impatriate Regime", "70% income exemption", "5 years (extendable)", "Workers/professionals transferring to Italy", "Only 30% of employment income is taxed"],
      ]},
      { type: "h2", text: "Exit Tax: What You Owe Before You Leave" },
      { type: "p", text: "Before you can benefit from Italian tax advantages, you must cleanly exit your current tax jurisdiction. Each country has different rules, and mistakes here can be extremely costly." },
      { type: "table", headers: ["Country", "Exit Tax Risk", "Key Considerations"], rows: [
        ["United Kingdom", "Medium", "Capital gains on UK property remain taxable. HMRC may challenge departure if ties remain (Statutory Residence Test). ISAs and pension planning needed pre-departure."],
        ["United States", "Very High", "US citizens/green card holders remain taxable worldwide. Renunciation triggers exit tax on unrealized gains. IRS Form 8854 required."],
        ["Switzerland", "Low", "No exit tax. Forfait/lump-sum taxpayers can leave cleanly. Canton-specific procedures for de-registration."],
        ["UAE / Dubai", "None", "No income tax, no exit tax. Clean departure. Ensure DIFC/ADGM corporate structures are properly wound down or restructured."],
        ["Germany", "High", "Exit tax on substantial shareholdings (1%+ in any corporation). 'Wegzugsteuer' can trigger immediate taxation of unrealized gains."],
      ]},
      { type: "h2", text: "Cross-Border Succession Planning" },
      { type: "p", text: "Italy has relatively favorable inheritance tax rates compared to the UK, US, or France. The key thresholds: spouse and direct heirs receive a €1 million exemption with a 4% rate above that. Siblings receive a €100,000 exemption at 6%. However, Italian forced heirship rules (legittima) apply: you cannot fully disinherit spouse or children under Italian law, regardless of your nationality." },
      { type: "callout", text: "EU Regulation 650/2012 allows you to elect the inheritance law of your nationality rather than your country of residence. A British citizen living in Italy can choose English succession law, avoiding Italian forced heirship rules. This election must be made explicitly in your will." },
      { type: "h3", text: "Common Succession Structures for International Families" },
      { type: "list", items: [
        "Italian will + home country will: separate wills for Italian and non-Italian assets, coordinated to avoid conflicts",
        "Life insurance wrappers: Italian-compliant insurance products that bypass succession rules and provide tax-efficient wealth transfer",
        "Trust structures: Italian law recognizes foreign trusts. Jersey, Guernsey, and Cayman trusts are commonly used by HNWI in Italy",
        "Donazione (gift): lifetime gifts to heirs benefit from the same €1M exemption, reducing the taxable estate",
        "Family holding companies: Luxembourg or Italian holding structures for managing real estate and investment portfolios across generations",
      ]},
      { type: "h2", text: "Corporate Structuring for Entrepreneurs" },
      { type: "p", text: "If you run a business, relocating to Italy requires careful corporate planning. The Italian SRL (limited liability company) has a 24% corporate tax rate (IRES) plus 3.9% regional tax (IRAP). For many HNWI, the optimal structure involves an Italian holding company receiving dividends from foreign operating entities, which can be 95% exempt from Italian corporate tax under the Participation Exemption (PEX) regime." },
      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "Can I apply for the flat tax before physically moving to Italy?", a: "No. You must establish Italian tax residency first (registered in the Anagrafe, living in Italy for 183+ days per year). The flat tax election is made on your first Italian tax return, typically filed by November 30 of the year following your arrival." },
      { type: "faq", q: "What happens after the flat tax expires?", a: "After 15 years, you become subject to ordinary Italian taxation on worldwide income (progressive rates up to 43%). Most HNWI plan for this transition by restructuring investments into tax-efficient Italian vehicles or, in some cases, relocating again. Planning should begin 2-3 years before expiry." },
      { type: "faq", q: "Is Italian-source income covered by the flat tax?", a: "No. The flat tax covers only foreign-source income. Italian-source income (Italian rental income, Italian employment, Italian business profits) is taxed at ordinary progressive rates. This is why asset and corporate structuring matters." },
      { type: "faq", q: "Do I need an Italian accountant or can I use my existing advisor?", a: "You need an Italian commercialista (chartered accountant) for tax filings, compliance, and local regulatory matters. However, your international advisor remains essential for cross-border coordination. The Italian Gateway helps you build a team that works together across jurisdictions." },
      { type: "callout", text: "Disclaimer: This guide provides general information as of March 2026. Tax laws change. Always consult qualified professionals before making tax-related decisions. The Italian Gateway coordinates between your advisors across jurisdictions." },
    ]
  },

  // ============================================================
  // ARTICLE 8 — Real Estate
  // ============================================================
  {
    id: "buying-property-italy-hnwi",
    cat: "Real Estate",
    title: "Buying Property in Italy as an International Buyer: Complete 2026 Guide",
    date: "March 2026",
    read: "10 min",
    desc: "Everything HNWI need to know about purchasing property in Milan, Lake Como, Tuscany, and the Amalfi Coast, from market prices to legal pitfalls.",
    content: [
      { type: "p", text: "Italy remains one of the most desirable property markets in the world for international buyers. Whether you are looking for a penthouse in Milan's Porta Nuova, a lakefront villa on Lake Como, a restored farmhouse in Chianti, or a cliffside retreat on the Amalfi Coast, the buying process has specific rules, risks, and opportunities that differ significantly from the UK, US, or Middle Eastern markets." },
      { type: "h2", text: "Property Price Guide by Region (2026)" },
      { type: "table", headers: ["Location", "Property Type", "Price Range", "Yield (if rented)"], rows: [
        ["Milan (Porta Nuova / CityLife)", "Luxury apartment", "€8,000 - €15,000/sqm", "3-4%"],
        ["Milan (Brera / Magenta)", "Historic apartment", "€6,000 - €12,000/sqm", "2.5-3.5%"],
        ["Lake Como (Bellagio / Tremezzo)", "Lakefront villa", "€5M - €50M+", "Rarely rented"],
        ["Lake Como (hillside / non-lakefront)", "Villa with views", "€1.5M - €8M", "4-6% (seasonal)"],
        ["Tuscany (Chianti / Val d'Orcia)", "Farmhouse / estate", "€1.5M - €10M", "3-5% (agritourismo)"],
        ["Amalfi Coast (Positano / Ravello)", "Villa", "€3M - €20M+", "5-8% (luxury seasonal)"],
      ]},
      { type: "h2", text: "The Buying Process Step by Step" },
      { type: "h3", text: "1. Property Search and Selection" },
      { type: "p", text: "The best properties in Italy sell off-market or through private networks. Working with a buyer's agent who has relationships with local agents, developers, and private sellers gives you access to inventory that never appears on Idealista or Immobiliare. Expect to view 10-20 properties before finding the right one. For Lake Como and Amalfi properties, the seasonal market means spring and early summer are peak viewing periods." },
      { type: "h3", text: "2. Proposta d'Acquisto (Purchase Offer)" },
      { type: "p", text: "The first formal step is a written purchase offer (proposta d'acquisto), typically accompanied by a deposit of €5,000-€50,000 held in escrow. This offer is binding on the buyer once accepted by the seller. Always include conditions: financing, building survey results, and clear title verification." },
      { type: "h3", text: "3. Compromesso (Preliminary Contract)" },
      { type: "p", text: "Within 30-60 days, both parties sign the compromesso, a binding preliminary contract. The buyer pays a deposit (caparra confirmatoria) of typically 10-20% of the purchase price. If the buyer withdraws, they lose the deposit. If the seller withdraws, they must return double the deposit. This contract is registered at the Agenzia delle Entrate." },
      { type: "h3", text: "4. Rogito (Final Deed)" },
      { type: "p", text: "The final transfer happens before a notaio (notary public), who is a public official responsible for verifying the legality of the transaction. The balance is paid, the property is transferred, and the deed is registered at the Conservatoria (land registry). The notary's fee is paid by the buyer and typically ranges from €3,000 to €10,000 depending on property value." },
      { type: "h2", text: "Taxes and Costs When Buying" },
      { type: "table", headers: ["Cost", "Primary Residence", "Second Home"], rows: [
        ["Registration tax (Imposta di Registro)", "2% of cadastral value", "9% of cadastral value"],
        ["VAT (if buying from developer)", "4%", "10% (22% for luxury)"],
        ["Notary fees", "€3,000 - €10,000", "€3,000 - €10,000"],
        ["Agent commission", "3-4% + VAT", "3-4% + VAT"],
        ["Legal fees (independent lawyer)", "€3,000 - €8,000", "€3,000 - €8,000"],
        ["Total acquisition cost", "~5-7% of purchase price", "~12-16% of purchase price"],
      ]},
      { type: "callout", text: "The difference between primary and second home taxation is significant. If you qualify for 'prima casa' (primary residence) status — which requires establishing residency in the municipality within 18 months of purchase — you save substantially on registration tax." },
      { type: "h2", text: "Common Pitfalls for International Buyers" },
      { type: "list", items: [
        "Not hiring an independent lawyer: the notary protects the transaction, not the buyer. Your own English-speaking property lawyer is essential.",
        "Ignoring catasto (cadastral) discrepancies: the official floor plans must match the actual property. Any undeclared modifications must be regularized before sale.",
        "Underestimating renovation costs and timelines: Italian renovation projects typically take 1.5-2x longer than quoted. Budget accordingly.",
        "Not checking urbanistic compliance: building permits, zoning restrictions, and landscape constraints (especially in protected areas like Lake Como and Amalfi) can limit what you can do with a property.",
        "Buying through a corporate structure without advice: owning via an SRL or foreign company has different tax implications. This must be planned before purchase, not after.",
      ]},
      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "Can non-EU citizens buy property in Italy?", a: "Yes, with one condition: reciprocity. Citizens of countries that allow Italians to buy property there can purchase freely. This includes the US, UK, Canada, Australia, UAE, and most countries. Your notary will verify reciprocity as part of the transaction." },
      { type: "faq", q: "Can I get a mortgage as a foreign buyer?", a: "Yes. Italian banks offer mortgages to non-residents with LTV ratios of 50-60%, and to residents at 60-70%. Interest rates in 2026 are approximately 3.5-4.5% for fixed-rate mortgages. Having a private banking relationship significantly improves terms." },
      { type: "faq", q: "Should I buy before or after establishing tax residency?", a: "Ideally, establish residency first to benefit from prima casa tax rates. However, if the right property appears before your move, you can still buy and claim prima casa within 18 months of purchase by registering residency in the municipality." },
      { type: "callout", text: "Disclaimer: This guide provides general information as of March 2026. Property laws and tax rates change. Always engage qualified Italian legal professionals. The Italian Gateway manages the entire acquisition process on your behalf." },
    ]
  },

  // ============================================================
  // ARTICLE 9 — Healthcare
  // ============================================================
  {
    id: "healthcare-hnwi-italy",
    cat: "Healthcare",
    title: "Healthcare in Italy for HNWI: Private Doctors, VIP Hospital Access, and Health Insurance",
    date: "March 2026",
    read: "8 min",
    desc: "How wealthy international residents access world-class healthcare in Milan and beyond: private GPs, specialist referrals, hospital VIP programs, and insurance options.",
    content: [
      { type: "p", text: "Italy has the world's second-best healthcare system according to the WHO. For HNWI relocating from London, Dubai, or Singapore, the quality is comparable or better — but the system works differently. This guide explains how to set up a healthcare framework that provides immediate, English-speaking, world-class care for you and your family." },
      { type: "h2", text: "The Italian Healthcare System: Public vs. Private" },
      { type: "p", text: "All Italian residents are entitled to public healthcare through the SSN (Servizio Sanitario Nazionale). Registration is through your local ASL (Azienda Sanitaria Locale) and provides access to GPs, specialists, and hospital care at minimal cost. However, wait times for specialist appointments can be weeks or months. This is why most HNWI build a parallel private healthcare framework." },
      { type: "h2", text: "Building Your Private Healthcare Framework" },
      { type: "h3", text: "1. English-Speaking Private GP on Retainer" },
      { type: "p", text: "The cornerstone of your healthcare setup. A private GP who speaks fluent English, is available for same-day appointments and house calls, and knows your full medical history. In Milan, several doctors specialize in international patients and offer retainer-based relationships (typically €3,000-€8,000 per year for a family) that guarantee availability and continuity." },
      { type: "h3", text: "2. Hospital VIP Programs" },
      { type: "table", headers: ["Hospital", "Speciality", "International Patient Services"], rows: [
        ["San Raffaele (Milan)", "Cardiology, neurology, oncology", "International Patient Office, English-speaking coordinators, private suites"],
        ["Humanitas (Milan)", "Oncology, orthopedics, emergency", "Dedicated international department, interpreter services, VIP rooms"],
        ["IEO - European Institute of Oncology", "Oncology (all types)", "World-class cancer care, second opinion services, clinical trials"],
        ["Istituto Clinico Humanitas (Rozzano)", "Robotic surgery, cardiology", "Private wing, concierge services"],
        ["Policlinico di Milano", "Complex surgery, transplant", "Public hospital with private ward options"],
      ]},
      { type: "h3", text: "3. Specialist Network" },
      { type: "p", text: "Building relationships with trusted specialists before you need them is essential. Your private GP should be your primary referral source, but having direct access to a cardiologist, dermatologist, orthopedic surgeon, and pediatrician (if applicable) means no delays when issues arise. Milan has specialists who trained at Johns Hopkins, Mayo Clinic, and Harley Street and practice both publicly and privately." },
      { type: "h2", text: "Health Insurance Options" },
      { type: "table", headers: ["Provider", "Coverage", "Annual Premium (family)", "Best For"], rows: [
        ["Bupa Global", "Worldwide, all hospitals", "€15,000 - €40,000", "Full flexibility, global coverage"],
        ["Cigna Global", "Worldwide + wellness", "€12,000 - €35,000", "Strong US coverage if needed"],
        ["Allianz Care", "Europe + selected global", "€8,000 - €25,000", "Europe-focused, competitive rates"],
        ["Generali (Italy)", "Italy + EU", "€5,000 - €15,000", "Local coverage, Italian-speaking support"],
        ["Intesa Sanpaolo Assicura", "Italy + emergency abroad", "€3,000 - €10,000", "Basic Italian private coverage"],
      ]},
      { type: "callout", text: "Many HNWI combine international insurance (Bupa/Cigna) for global coverage and catastrophic events with a lighter Italian policy for routine private care. Under the flat tax regime, health insurance premiums paid in Italy are deductible up to €1,549.37 per year." },
      { type: "h2", text: "Healthcare for Retirees and Elderly Care" },
      { type: "p", text: "For retirees, healthcare is often the primary concern — more than taxes or property. Italy excels here: geriatric care is sophisticated, home care culture is strong, and live-in caregivers (badanti) are a well-established part of Italian healthcare. A full-time live-in caregiver costs approximately €1,500-€2,200 per month including board, significantly less than equivalent care in the UK or US." },
      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "Do I need to register with the SSN if I have private insurance?", a: "Flat tax residents can choose to opt out of the SSN and rely exclusively on private insurance. However, SSN registration costs approximately €400 per year per family member and provides emergency and hospital coverage as a safety net. Most advisors recommend maintaining SSN registration alongside private coverage." },
      { type: "faq", q: "Can I bring my medications from abroad?", a: "You can bring a personal supply (typically up to 3 months) of prescribed medications. For ongoing prescriptions, your Italian GP can prescribe equivalent Italian/EU medications. Some US-specific drugs may not be available in Italy; your GP can identify alternatives or arrange import through international pharmacies." },
      { type: "faq", q: "What about dental care?", a: "Italian dental care is largely private (the SSN covers very little dentistry). Quality is high, and costs are 30-50% lower than London or Zurich. Milan has several English-speaking dental clinics catering to international patients, with services ranging from routine care to implantology and orthodontics." },
      { type: "callout", text: "Disclaimer: This guide provides general information as of March 2026. Healthcare regulations and insurance products change. Consult qualified professionals. The Italian Gateway sets up your complete healthcare framework as part of our relocation service." },
    ]
  },

  // ============================================================
  // ARTICLE 10 — Education
  // ============================================================
  {
    id: "international-schools-guide",
    cat: "Education",
    title: "International Schools in Milan: How to Choose and Get Accepted in 2026",
    date: "March 2026",
    read: "9 min",
    desc: "Complete comparison of Milan's international schools, including curricula, tuition fees, admission processes, and practical tips for HNWI families relocating with children.",
    content: [
      { type: "p", text: "For HNWI families relocating to Milan, choosing the right school is often the most emotionally complex decision. It determines your children's social circle, language development, university pathway, and daily happiness. Milan offers six major international schools, each with distinct cultures, curricula, and strengths. This guide provides the comprehensive comparison you need." },
      { type: "h2", text: "Milan's International Schools Compared" },
      { type: "table", headers: ["School", "Curriculum", "Ages", "Annual Tuition", "Language of Instruction"], rows: [
        ["American School of Milan (ASM)", "American / AP + IB Diploma", "3-18", "€22,000 - €30,000", "English"],
        ["International School of Milan (ISM)", "IB (PYP, MYP, DP)", "3-18", "€18,000 - €28,000", "English"],
        ["Sir James Henderson (BJHS)", "British / IGCSE + A-Levels", "3-18", "€15,000 - €25,000", "English"],
        ["St. Louis School", "British / IB", "6-18", "€16,000 - €27,000", "English"],
        ["Scuola Americana d'Italia", "American + Italian", "3-14", "€14,000 - €20,000", "English / Italian"],
        ["Liceo Classico/Scientifico Intl", "Italian + bilingual tracks", "14-19", "€2,000 - €5,000", "Italian / English"],
      ]},
      { type: "h2", text: "How to Choose: Key Factors" },
      { type: "h3", text: "Curriculum Pathway" },
      { type: "p", text: "If your children will likely attend university in the US, the American School of Milan (ASM) provides the strongest pipeline with AP courses and SAT preparation. For UK universities, Sir James Henderson offers A-Levels. The IB Diploma, offered by ISM and St. Louis, is universally accepted and particularly strong for European universities including Bocconi." },
      { type: "h3", text: "School Culture and Community" },
      { type: "p", text: "ASM has the most American feel: large campus, sports culture, school spirit. ISM is the most internationally diverse with over 60 nationalities. Sir James Henderson has a traditional British atmosphere. St. Louis combines Italian and British cultures. Each school's parent community reflects its culture — visit during drop-off and events to sense where your family fits." },
      { type: "h3", text: "Location and Commute" },
      { type: "list", items: [
        "ASM: Noverasco di Opera (south Milan), requires driving or school bus. Best for families in south/west Milan.",
        "ISM: Baranzate (northwest Milan), campus with good facilities. School bus network covers central Milan.",
        "Sir James Henderson: Via Pisani Dossi (central-west Milan). Walkable for families in CityLife, Amendola, and Pagano areas.",
        "St. Louis School: Via Caviglia (east-central Milan). Convenient for families in Porta Romana, Corso Italia, and central areas.",
      ]},
      { type: "h2", text: "Admission Process and Timeline" },
      { type: "p", text: "Most schools accept applications year-round but the primary intake is September. For September 2026 entry, applications should ideally be submitted by January-March 2026. Popular schools (ASM, ISM) often have waiting lists for certain year groups. The process typically involves: application form and transcripts, entrance assessment (academic and sometimes language), family interview, and offer." },
      { type: "callout", text: "If you are relocating mid-year, most schools can accommodate late entries subject to availability. Having a professional facilitate the introduction can expedite the process, particularly for waitlisted year groups where a recommendation carries weight." },
      { type: "h2", text: "Beyond Primary and Secondary" },
      { type: "h3", text: "University in Milan" },
      { type: "p", text: "Bocconi University is among Europe's top business schools and offers English-taught bachelor's and master's programs. Politecnico di Milano ranks #1 in Italy for engineering and architecture. Both attract international students and accept IB, A-Level, and AP qualifications. Several international school graduates stay in Milan for university, maintaining their social connections." },
      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "Can my child enter without speaking Italian?", a: "Yes. All listed international schools teach primarily in English. Italian is taught as a subject (usually mandatory). Children typically become conversational in Italian within 6-12 months through school and immersion. Schools offer EAL (English as Additional Language) support for non-native English speakers." },
      { type: "faq", q: "Are there boarding school options near Milan?", a: "In Milan itself, no. However, Switzerland (Lugano is 1 hour from Milan) has world-renowned boarding schools: TASIS, Aiglon College (further), and Franklin University Switzerland. Some families choose Milan as their base with children at Swiss boarding schools for the senior years." },
      { type: "faq", q: "What about learning disabilities or special educational needs?", a: "ISM and ASM have the most developed learning support departments. Italian law also provides strong protections for students with DSA (disturbi specifici dell'apprendimento). Discuss your child's specific needs with the school's learning support coordinator during the application process." },
      { type: "callout", text: "Disclaimer: This guide provides general information as of March 2026. Tuition fees and admission policies change annually. Contact schools directly for current information. The Italian Gateway manages the school selection and application process for relocating families." },
    ]
  },

  // ============================================================
  // ARTICLE 11 — Immigration
  // ============================================================
  {
    id: "immigration-residency-italy",
    cat: "Immigration",
    title: "Italian Residency for HNWI: Permits, Golden Visa, and Citizenship Pathways in 2026",
    date: "March 2026",
    read: "10 min",
    desc: "A complete guide to Italian immigration options for wealthy individuals: elective residency, investor visa, EU Blue Card, and the path to Italian citizenship.",
    content: [
      { type: "p", text: "Italian bureaucracy has a reputation for complexity, and immigration is no exception. But for HNWI with the right guidance, the process is manageable and the rewards are substantial: EU residency, Schengen travel, access to Italian healthcare and education, and eventually one of the world's most powerful passports. This guide covers every pathway." },
      { type: "h2", text: "Immigration Pathways Compared" },
      { type: "table", headers: ["Pathway", "Timeline", "Investment Required", "Best For", "Path to Citizenship"], rows: [
        ["Elective Residency (Residenza Elettiva)", "2-4 months", "None (prove passive income)", "Retirees, HNWI with investment income", "Yes (10 years)"],
        ["Investor Visa (Golden Visa)", "3-6 months", "€250K - €2M", "Investors wanting fast-track", "Yes (10 years)"],
        ["EU Blue Card", "1-3 months", "None (employer sponsors)", "Highly qualified professionals", "Yes (5 years for EU long-term)"],
        ["Self-Employment Visa", "3-6 months", "Business plan + capital", "Entrepreneurs, freelancers", "Yes (10 years)"],
        ["EU Citizen Registration", "2-4 weeks", "None", "EU/EEA nationals", "Yes (4 years for EU citizens)"],
        ["Citizenship by Descent", "1-3 years", "None", "Those with Italian ancestry", "Direct citizenship"],
      ]},
      { type: "h2", text: "Elective Residency: The Most Common HNWI Path" },
      { type: "p", text: "The Elective Residency permit (permesso di soggiorno per residenza elettiva) is designed for non-EU nationals who do not intend to work in Italy and can demonstrate stable, passive income or substantial assets. There is no official minimum income threshold, but consulates typically expect proof of at least €31,000 per year for a single applicant, plus €20,000+ for a spouse and €7,000+ per dependent child. HNWI with investment portfolios, pensions, or rental income far exceed these thresholds." },
      { type: "h3", text: "Application Process" },
      { type: "list", items: [
        "Step 1: Apply for a D-type visa at the Italian consulate in your country of residence. Required documents: passport, proof of accommodation in Italy, proof of income/assets, health insurance, criminal background check.",
        "Step 2: Enter Italy on the D-type visa (valid 90-365 days depending on consulate).",
        "Step 3: Within 8 days of arrival, apply for the permesso di soggiorno at your local Questura (police headquarters).",
        "Step 4: Register at the Anagrafe (civil registry) of your municipality to establish official Italian residency.",
        "Step 5: Apply for your codice fiscale at the Agenzia delle Entrate if not already obtained.",
        "Step 6: Register with the local ASL for healthcare access.",
      ]},
      { type: "h2", text: "The Investor Visa (Golden Visa)" },
      { type: "p", text: "Italy's Investor Visa offers a fast-track residency for those willing to invest in the Italian economy. The investment must be maintained for at least 2 years, and the visa is initially valid for 2 years, renewable." },
      { type: "table", headers: ["Investment Route", "Minimum Investment", "Notes"], rows: [
        ["Italian government bonds", "€2,000,000", "Lowest risk, lowest flexibility"],
        ["Italian company shares", "€500,000", "Unlisted Italian companies"],
        ["Innovative startup", "€250,000", "Must qualify as 'startup innovativa'"],
        ["Philanthropic donation", "€1,000,000", "Culture, education, immigration, scientific research, heritage"],
      ]},
      { type: "h2", text: "The Path to Italian Citizenship" },
      { type: "p", text: "After 10 years of legal residency (4 years for EU citizens), you can apply for Italian citizenship. Italy allows dual citizenship with most countries (including the US and UK). The application process takes 2-4 years. Requirements: continuous legal residency, adequate Italian language skills (B1 level), clean criminal record, and sufficient income or assets." },
      { type: "callout", text: "An Italian passport is one of the world's most powerful, providing visa-free access to 191 countries. Combined with EU citizenship rights — live, work, and study anywhere in the EU — this is a significant long-term asset for your family." },
      { type: "h2", text: "Practical Tips for a Smooth Immigration Process" },
      { type: "list", items: [
        "Apostille everything: all documents from your home country need an apostille (or legalization for non-Hague Convention countries) and certified Italian translation.",
        "Start with the consulate: every Italian consulate has different processing times and document requirements. Milan's consulates are among the busiest. Budget extra time.",
        "Questura appointments: the Questura (immigration police) operates on an appointment system. Slots can be scarce. Book immediately upon arrival in Italy.",
        "Maintain a paper trail: keep copies of every receipt, appointment confirmation, and communication. Italian bureaucracy relies heavily on documentation.",
        "Engage a specialist: immigration lawyers (avvocati specializzati in immigrazione) handle the entire process and often have direct contacts at consulates and Questura offices.",
      ]},
      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", q: "Can my spouse and children join me?", a: "Yes. Family reunification is a right under Italian law. Your spouse and dependent children (under 18) can be included in your initial visa application or join you later through family reunification procedures. Processing time for family members is typically 30-90 days." },
      { type: "faq", q: "Can I work in Italy on an Elective Residency permit?", a: "No. The Elective Residency permit explicitly prohibits employment. If you want to work (even for your own foreign company from Italy), you need a different permit type such as the Self-Employment Visa or EU Blue Card. However, managing your own investments and passive income is permitted." },
      { type: "faq", q: "What happens if I spend time outside Italy?", a: "To maintain residency, you should spend more than 183 days per year in Italy. Prolonged absences (more than 12 months continuously) can result in loss of residency permit. For citizenship purposes, continuous residency is important — extended gaps can reset the clock." },
      { type: "faq", q: "Is the Italian language test difficult for citizenship?", a: "The B1 level requirement is intermediate: you need to handle everyday situations, express opinions, and understand standard Italian. Most HNWI who live in Italy for 10 years and make reasonable effort to learn Italian (weekly lessons, daily immersion) achieve B1 well before the citizenship application." },
      { type: "callout", text: "Disclaimer: This guide provides general information as of March 2026. Immigration laws change. Always consult qualified immigration lawyers. The Italian Gateway manages the entire immigration process end-to-end through our legal partners." },
    ]
  },

];
export default ARTICLES;

// ============================================================
// TEMPLATE — Copia e incolla per aggiungere un nuovo articolo:
// ============================================================
//
// {
//   id: "url-slug-del-articolo",       // usato nell'URL, no spazi
//   cat: "Categoria",                    // es. "Tax & Legal", "Real Estate"
//   title: "Titolo Completo dell'Articolo",
//   date: "March 2026",
//   read: "10 min",
//   desc: "Breve descrizione per la lista guide.",
//   content: [
//     { type: "p", text: "Primo paragrafo..." },
//     { type: "h2", text: "Titolo Sezione" },
//     { type: "p", text: "Altro paragrafo..." },
//     { type: "list", items: ["Punto 1", "Punto 2"] },
//     { type: "table", headers: ["Col1", "Col2"], rows: [["A", "B"]] },
//     { type: "callout", text: "Testo evidenziato..." },
//     { type: "faq", q: "Domanda?", a: "Risposta." },
//   ]
// },
