// FILE: MarketPage.tsx
// TITLE: MarketPage (Clean Native Fetch)

// SECTION: Core Imports
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ShieldCheck, CheckCircle, Clock, ArrowRight, ChevronDown, ChevronUp, Star, Phone, MapPin, Menu, X, Award, Calculator, TrendingUp, Users, Lock, AlertCircle, Check, ThumbsUp, ChevronRight, ClipboardList
} from 'lucide-react';

// SECTION: Type Definitions
interface Lead {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  timestamp: string;
  estimatedValue: number;
  status: 'New' | 'Analyzing' | 'Offer Sent' | 'Action Needed';
  webhookSynced?: boolean;
}

// SECTION: Static Data
const STATE_RECORDS = [
  { name: 'Alabama', abbr: 'AL', speed: '12 days', rating: 4.9, activeBuyers: 14 },
  { name: 'Arizona', abbr: 'AZ', speed: '10 days', rating: 4.8, activeBuyers: 22 },
  { name: 'California', abbr: 'CA', speed: '11 days', rating: 4.9, activeBuyers: 45 },
  { name: 'Colorado', abbr: 'CO', speed: '12 days', rating: 4.7, activeBuyers: 16 },
  { name: 'Connecticut', abbr: 'CT', speed: '14 days', rating: 4.8, activeBuyers: 9 },
  { name: 'Delaware', abbr: 'DE', speed: '13 days', rating: 4.6, activeBuyers: 8 },
  { name: 'Florida', abbr: 'FL', speed: '9 days', rating: 4.9, activeBuyers: 38 },
  { name: 'Georgia', abbr: 'GA', speed: '10 days', rating: 4.8, activeBuyers: 27 },
  { name: 'Idaho', abbr: 'ID', speed: '14 days', rating: 4.7, activeBuyers: 7 },
  { name: 'Illinois', abbr: 'IL', speed: '11 days', rating: 4.8, activeBuyers: 19 },
  { name: 'Indiana', abbr: 'IN', speed: '11 days', rating: 4.9, activeBuyers: 15 },
  { name: 'Kentucky', abbr: 'KY', speed: '12 days', rating: 4.7, activeBuyers: 12 },
  { name: 'Louisiana', abbr: 'LA', speed: '13 days', rating: 4.6, activeBuyers: 10 },
  { name: 'Maryland', abbr: 'MD', speed: '12 days', rating: 4.8, activeBuyers: 14 },
  { name: 'Massachusetts', abbr: 'MA', speed: '14 days', rating: 4.9, activeBuyers: 18 },
  { name: 'Michigan', abbr: 'MI', speed: '10 days', rating: 4.9, activeBuyers: 21 },
  { name: 'Minnesota', abbr: 'MN', speed: '12 days', rating: 4.7, activeBuyers: 11 },
  { name: 'Missouri', abbr: 'MO', speed: '11 days', rating: 4.8, activeBuyers: 14 },
  { name: 'Nevada', abbr: 'NV', speed: '10 days', rating: 4.8, activeBuyers: 13 },
  { name: 'North Carolina', abbr: 'NC', speed: '10 days', rating: 4.9, activeBuyers: 26 },
  { name: 'Ohio', abbr: 'OH', speed: '11 days', rating: 4.8, activeBuyers: 23 },
  { name: 'Oklahoma', abbr: 'OK', speed: '12 days', rating: 4.7, activeBuyers: 10 },
  { name: 'Oregon', abbr: 'OR', speed: '12 days', rating: 4.8, activeBuyers: 12 },
  { name: 'Pennsylvania', abbr: 'PA', speed: '11 days', rating: 4.8, activeBuyers: 20 },
  { name: 'Rhode Island', abbr: 'RI', speed: '14 days', rating: 4.9, activeBuyers: 6 },
  { name: 'Tennessee', abbr: 'TN', speed: '10 days', rating: 4.9, activeBuyers: 18 },
  { name: 'Texas', abbr: 'TX', speed: '9 days', rating: 4.9, activeBuyers: 42 },
  { name: 'Utah', abbr: 'UT', speed: '11 days', rating: 4.8, activeBuyers: 11 },
  { name: 'Virginia', abbr: 'VA', speed: '11 days', rating: 4.8, activeBuyers: 19 },
  { name: 'Washington', abbr: 'WA', speed: '12 days', rating: 4.8, activeBuyers: 17 },
  { name: 'Wisconsin', abbr: 'WI', speed: '12 days', rating: 4.8, activeBuyers: 13 },
  { name: 'Wyoming', abbr: 'WY', speed: '14 days', rating: 4.6, activeBuyers: 5 }
];

// SECTION: Utility Functions
const capitalizeWords = (str: string) => {
  return str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

// SECTION: Main Component
export default function MarketPage() {
  const { stateId, cityId } = useParams();
  
  const cleanParam1 = stateId ? capitalizeWords(stateId) : '';
  const cleanParam2 = cityId ? capitalizeWords(cityId) : '';

  const knownStateRecord = STATE_RECORDS.find(s => s.name.toLowerCase() === cleanParam1.toLowerCase());

  let formattedState = '';
  let formattedCity = '';
  let stateAbbr = 'US';
  let activeRecord = knownStateRecord;

  if (cleanParam2) {
    formattedState = cleanParam1;
    formattedCity = cleanParam2;
    stateAbbr = knownStateRecord ? knownStateRecord.abbr : cleanParam1.substring(0, 2).toUpperCase();
  } else if (knownStateRecord) {
    formattedState = knownStateRecord.name;
    formattedCity = ''; 
    stateAbbr = knownStateRecord.abbr;
  } else if (cleanParam1) {
    formattedState = ''; 
    formattedCity = cleanParam1;
    stateAbbr = 'US'; 
    activeRecord = { name: 'USA', abbr: 'US', speed: '10 days', rating: 4.8, activeBuyers: 15 };
  }

  const heroLocation = formattedCity && formattedState ? `${formattedCity}, ${formattedState}` : formattedCity || formattedState;
  const inLocationText = heroLocation ? `in ${heroLocation}` : '';
  const dropdownStateFallback = formattedState || 'Florida';

  const evaluationSpeed = activeRecord ? activeRecord.speed : '10 days';
  const localRating = activeRecord ? activeRecord.rating : 4.9;
  const localBuyers = activeRecord ? activeRecord.activeBuyers : 15;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(formattedCity);
  const [selectedState, setSelectedState] = useState(dropdownStateFallback);
  const [zipCode, setZipCode] = useState('');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successLead, setSuccessLead] = useState<Lead | null>(null);
  const [fieldError, setFieldError] = useState('');

  const [houseValue, setHouseValue] = useState(250000);
  const [agentCommissionPct, setAgentCommissionPct] = useState(6);
  const [closingCostsPct, setClosingCostsPct] = useState(2);
  const [repairEstimate, setRepairEstimate] = useState(15000);
  const [expandedFaq, setExpandedAccordion] = useState<number | null>(null);

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqgnqlj';

  const handleNextStep = () => {
    setFieldError('');
    if (step === 1) {
      if (!address.trim()) {
        setFieldError('Please enter your property address to check eligibility.');
        return;
      }
      setStep(2);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError('');

    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
      setFieldError('All fields are required to process your formal offer.');
      return;
    }

    setIsSubmitting(true);

    const leadPayload: Lead = {
      id: 'lead-' + Date.now(),
      address,
      city: city || 'Local Area',
      state: selectedState,
      zipCode: zipCode || 'County',
      firstName,
      lastName,
      phone,
      email,
      estimatedValue: houseValue,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New',
      webhookSynced: false
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      });
      if (response.ok) leadPayload.webhookSynced = true;
    } catch (err) {
      console.error('Formspree dispatch failed.', err);
    }

    setSuccessLead(leadPayload);
    setIsSubmitting(false);
    setStep(3);
  };

  const resetLeadForm = () => {
    setStep(1);
    setAddress('');
    setCity(formattedCity);
    setSelectedState(dropdownStateFallback);
    setZipCode('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setSuccessLead(null);
    setFieldError('');
  };

  const cashOfferPercentage = 0.76; 
  const cashOfferValue = Math.round(houseValue * cashOfferPercentage - (repairEstimate * 0.5));
  
  const traditionalCommission = Math.round(houseValue * (agentCommissionPct / 100));
  const traditionalClosingCosts = Math.round(houseValue * (closingCostsPct / 100));
  const traditionalRepairs = repairEstimate;
  const traditionalHoldingCosts = Math.round(houseValue * 0.02); 
  const traditionalNetPayout = houseValue - traditionalCommission - traditionalClosingCosts - traditionalRepairs - traditionalHoldingCosts;

  const partnerSalePercentage = 0.94;
  const partnerListingPrice = houseValue;
  const partnerSaleRepairs = Math.round(repairEstimate * 0.2); 
  const partnerClosingCosts = Math.round(houseValue * 0.01); 
  const partnerListingFee = Math.round(houseValue * 0.025); 
  const partnerNetPayout = partnerListingPrice - partnerClosingCosts - partnerSaleRepairs - partnerListingFee;

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      <div id="sticky-callout" className="bg-[#ff7043] text-white py-3 px-5 text-center text-sm md:text-base font-bold tracking-wide shadow-sm z-50">
        <span className="inline-block bg-white/20 px-2.5 py-1 rounded text-xs uppercase mr-2 animate-pulse">⏰ Live Alert</span>
        {heroLocation} coverage update: We currently buy in <strong className="font-bold underline text-white">{heroLocation} & Surrounding Areas</strong>! Avoid commission fees by about 10%
      </div>

      <header className="bg-white border-b border-[#ced1d5]/40 sticky top-0 z-40 transform transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <img src="https://raw.githubusercontent.com/ssuuppeerrmmaann/Nigel-Buys-Houses/refs/heads/main/assets/images/Nigel%20Buys%20Houses%20NBH%20Favicon.png?raw=true" alt="Nigel Buys Houses Logo" className="h-10 md:h-12 w-auto object-contain" referrerPolicy="no-referrer" />
            <div><span className="block font-serif text-xl md:text-2xl font-black text-[#092641] leading-none tracking-tight">Nigel Buys Houses</span></div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 text-[16px] font-bold text-[#092641]">
            <a href="#how-it-works" className="hover:text-[#ff7043] transition-colors">How It Works</a>
            <a href="#compare" className="hover:text-[#ff7043] transition-colors">Compare Options</a>
            <a href="#coverage" className="hover:text-[#ff7043] transition-colors">Where We Buy</a>
            <a href="#trust" className="hover:text-[#ff7043] transition-colors">Our Values</a>
            <a href="#faqs" className="hover:text-[#ff7043] transition-colors">FAQs</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] text-[#868c92] font-bold uppercase tracking-wider">Talk to a Coordinator</span>
              <a href="tel:(480)500-9801" className="text-base md:text-lg font-extrabold text-[#ff7043] hover:underline flex items-center justify-end">
                <Phone className="h-4 w-4 mr-1.5 fill-current" />(480) 500-9801
              </a>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2.5 rounded-lg border border-[#ced1d5] text-[#092641] hover:bg-[#f8f8f8]" style={{ minHeight: '44px', minWidth: '44px' }}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#ced1d5]/40 bg-slate-50 px-4 py-4 space-y-3.5 shadow-inner">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2.5">Menu Topics</p>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-[#ff7043]/10 hover:text-[#ff7043]">How It Works</a>
            <a href="#compare" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-[#ff7043]/10 hover:text-[#ff7043]">Compare Options</a>
            <a href="#coverage" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-[#ff7043]/10 hover:text-[#ff7043]">Where We Buy Map</a>
            <a href="#trust" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-[#ff7043]/10 hover:text-[#ff7043]">Our Company Values</a>
            <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-[#ff7043]/10 hover:text-[#ff7043]">FAQs</a>
            <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2.5">Call our 24/7 hotline</span>
              <a href="tel:(480)500-9801" className="flex items-center justify-center p-3 text-lg font-black bg-[#ff7043] text-white rounded-lg shadow" style={{ minHeight: '44px' }}>
                <Phone className="h-5 w-5 mr-2 fill-current" />(480) 500-9801
              </a>
            </div>
          </div>
        )}
      </header>

      <section className="relative bg-slate-900 text-white overflow-hidden py-14 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,112,67,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-905 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-full text-sm font-semibold text-[#ff7043] tracking-wide">
              <span>A+ Accredited Business</span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
              <span className="font-bold text-green-400">Online &amp; Active</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif leading-tight">
              Sell Your {heroLocation} Property Fast. No Headaches.
            </h1>

            <p className="text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Skip traditional real estate broker commission fees and months of open house cleaning. Get an instant cash purchase estimate or sell close to retail value without typical listing delays. Same-day county valuations.
            </p>

            <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-3 text-center transition hover:border-[#ff7043]/30">
                <div className="flex justify-center text-amber-400 mb-1">{[...Array(5)].map((_, i) => <Star key={i} className="h-4.5 w-4.5 fill-current" />)}</div>
                <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-bold">Google Stars</p>
                <p className="text-sm font-black text-white">5.0 Out of 5</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-3 text-center transition hover:border-[#ff7043]/30">
                <div className="text-blue-400 text-base font-black mb-1 tracking-widest">BBB A+</div>
                <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-bold">TRUSTED</p>
                <p className="text-sm font-black text-white">Accredited</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-3 text-center transition hover:border-[#ff7043]/30">
                <div className="flex justify-center text-blue-400 mb-1"><ThumbsUp className="h-4.5 w-4.5 fill-current" /></div>
                <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-bold">REVIEWS</p>
                <p className="text-sm font-black text-white">5-Star Rated</p>
              </div>
            </div>

            <div className="text-xs text-slate-400 mt-2 flex items-center justify-center lg:justify-start space-x-1.5">
              <AlertCircle className="h-4 w-4 text-emerald-400" />
              <span>We buy properties {inLocationText} currently listed with Real Estate Brokerages and active on the MLS. We are NOT soliciting your property as a listing.</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-[#092641] relative border-b-4 border-[#ff7043]">
            <div className="absolute top-0 right-6 translate-y-[-50%] bg-[#092641] text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              Free Valuation Portal
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
                <span className={step >= 1 ? "text-[#ff7043]" : ""}>1. PROPERTY Info</span>
                <span className={step >= 2 ? "text-[#ff7043]" : ""}>2. YOUR Details</span>
                <span className={step >= 3 ? "text-green-500 font-extrabold" : ""}>3. ESTIMATES</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${step === 3 ? "bg-green-500" : "bg-[#ff7043]"}`} style={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%' }} />
              </div>
            </div>

            {fieldError && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{fieldError}</span>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="text-center lg:text-left">
                  <h3 className="text-lg md:text-xl font-bold font-serif mb-1 text-[#092641]">Let's See What Your Property Is Worth</h3>
                  <p className="text-xs text-[#868c92] font-semibold">Enter your address for a calculated direct offer analysis.</p>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#092641] mb-1">Street Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 129 Walnut Dr" className="w-full pl-10 pr-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#092641] mb-1">City <span className="text-slate-400">(optional)</span></label>
                      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder={formattedCity || "Orlando"} className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#092641] mb-1">Zip Code <span className="text-slate-400">(optional)</span></label>
                      <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="32801" className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#092641] mb-1">State <span className="text-red-500">*</span></label>
                    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm bg-white focus:border-[#ff7043] focus:outline-none">
                      {STATE_RECORDS.map((st) => (
                        <option key={st.abbr} value={st.name}>{st.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button onClick={handleNextStep} className="w-full mt-4 bg-[#ff7043] hover:bg-[#e65100] text-white py-3 rounded-lg font-serif text-base font-bold shadow-md hover:shadow-lg transition flex items-center justify-center space-x-1" style={{ minHeight: '44px' }}>
                  <span>Begin Valuation</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="text-center lg:text-left">
                  <h3 className="text-lg md:text-xl font-bold font-serif mb-1 text-[#092641]">Where Should We Send Your Written Offer?</h3>
                  <p className="text-xs text-[#868c92] font-semibold">A formal written offer will be sent to this email, subject to an in-person physical inspection.</p>
                </div>

                <div className="space-y-3.5 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#092641] mb-1">First Name <span className="text-red-500">*</span></label>
                      <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#092641] mb-1">Last Name <span className="text-red-500">*</span></label>
                      <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#092641] mb-1">Cell Phone <span className="text-red-500">*</span></label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. (480) 500-9801" className="w-full px-3 py-2.5 border-2 border-[#ced1d5] rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                    <span className="text-[10px] text-slate-400 mt-1 block">To confirm your ownership and schedule a call.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#092641] mb-1">Email <span className="text-red-500">*</span></label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.smith@gmail.com" className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                  </div>
                </div>

                <div className="flex space-x-3.5 pt-2">
                  <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-lg text-sm font-bold transition" style={{ minHeight: '44px' }}>Back</button>
                  <button type="submit" disabled={isSubmitting} className="w-2/3 bg-[#ff7043] hover:bg-[#e65100] text-white py-3 rounded-lg font-serif text-base font-bold shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2" style={{ minHeight: '44px' }}>
                    {isSubmitting ? <><span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Calculating...</span></> : <><span>Get Valuation Payout</span><ArrowRight className="h-4 w-4" /></>}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && successLead && (
              <div className="space-y-6 text-center py-4">
                <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-200 inline-block">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                  <h4 className="font-serif font-black text-[#092641] text-2xl">Information Securely Received!</h4>
                  <p className="text-lg text-slate-700 mt-3 leading-relaxed">
                    Thank you, <strong className="font-bold">{successLead.firstName}</strong>. Your property address at <strong className="underline">{successLead.address}</strong> has been submitted and will be reviewed shortly.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left space-y-4 shadow-sm">
                  <p className="text-base text-slate-600 leading-relaxed font-medium">
                    Our team is currently evaluating your local county assessor data. Instead of generating a generic, automated estimate, a regional coordinator is performing a custom valuation.
                  </p>
                  <p className="text-base md:text-lg text-emerald-700 leading-relaxed font-bold bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                    🚀 A formal, itemized written proposal is being drafted and will be sent to your email address: {successLead.email} within 24 business hours.
                  </p>
                  <p className="text-base md:text-lg text-slate-600 italic font-bold border-l-4 border-[#ff7043] pl-3">
                    *Please note: All initial digital proposals are formal calculations subject to a standard on-site physical structural inspection.
                  </p>
                </div>

                <p className="text-base md:text-lg text-slate-700 font-semibold mt-4">
                  Our coordinator (Christopher Clowers) will follow up via phone call at <strong className="text-[#092641]">{successLead.phone}</strong> shortly to answer any timeline questions.
                </p>

                <button onClick={resetLeadForm} className="w-full bg-[#092641] hover:bg-[#1e3a5f] text-white py-4 rounded-lg text-base font-extrabold shadow transition mt-4" style={{ minHeight: '44px' }}>
                  Valuate Another Property
                </button>
              </div>
            )}

            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-center space-x-2 text-slate-400 text-[10px]">
              <Lock className="h-4 w-4" />
              <span>We value your privacy. Your address is strictly confidential.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#092641]">How the Nigel Buys Houses Process Works</h2>
            <p className="text-slate-600 font-normal text-lg md:text-xl">We took real estate out of the dark ages. Here is our 3-step lead process, designed to provide transparent choices for your timeline and goals.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 relative group hover:shadow-lg transition">
              <div className="absolute top-0 right-8 translate-y-[-50%] bg-[#ff7043] text-white font-serif font-bold text-xl pt-1 pb-1.5 px-4 rounded-full inline-block">1</div>
              <div className="text-[#ff7043] bg-white p-4 rounded-xl shadow inline-block mb-6"><ClipboardList className="h-8 w-8 stroke-2" /></div>
              <h3 className="text-2xl font-bold font-serif mb-3 text-[#092641]">Tell Us About Your Property</h3>
              <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed">Fill out the quick valuation form above, or call our 24/7 coordinator line. It is easy, completely free, and carries zero obligation.</p>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 relative group hover:shadow-lg transition">
              <div className="absolute top-0 right-8 translate-y-[-50%] bg-[#ff7043] text-white font-serif font-bold text-xl pt-1 pb-1.5 px-4 rounded-full inline-block">2</div>
              <div className="text-[#ff7043] bg-white p-4 rounded-xl shadow inline-block mb-6"><TrendingUp className="h-8 w-8 stroke-2" /></div>
              <h3 className="text-2xl font-bold font-serif mb-3 text-[#092641]">Review Your Buy Options</h3>
              <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed">We present two concrete choices: A fast cash buyout quote directly from us, or our popular facilitated retail list program targeting top value.</p>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 relative group hover:shadow-lg transition">
              <div className="absolute top-0 right-8 translate-y-[-50%] bg-[#ff7043] text-white font-serif font-bold text-xl pt-1 pb-1.5 px-4 rounded-full inline-block">3</div>
              <div className="text-[#ff7043] bg-white p-4 rounded-xl shadow inline-block mb-6"><DollarSign className="h-8 w-8 stroke-2" /></div>
              <h3 className="text-2xl font-bold font-serif mb-3 text-[#092641]">Close on Your Schedule</h3>
              <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed">If you accept our buy proposal, select your target closing date. You get paid in 10-14 days. We handle paperwork, cleanup, and closing costs.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="#sticky-callout" className="inline-flex items-center space-x-2 bg-[#092641] hover:bg-[#1e3a5f] text-white py-4 px-10 rounded-full font-serif font-bold text-lg shadow-md transition">
              <span>Get Started &mdash; Fill Valuation Form</span>
              <ChevronRight className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      <section id="compare" className="py-20 bg-slate-50 border-y border-[#ced1d5]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#092641]">Which Option Puts More Money In Your Pocket?</h2>
            <p className="text-slate-600 font-light">We believe in "People Over Profits." Unlike generic real estate investors, we provide multiple choices so you can contrast what works best.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border-t-8 border-[#ff7043] hover:shadow-md transition">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-[#ff7043]/10 text-[#ff7043] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Option A</span>
                <span className="text-xs text-[#868c92] font-semibold tracking-wider flex items-center"><Clock className="h-4 w-4 mr-1 text-[#ff7043]" />9-14 Days Close</span>
              </div>
              <h3 className="text-2xl font-serif font-black text-[#092641] mb-3">The "Nigel Buys Houses Cash Offer"</h3>
              <p className="text-slate-500 text-sm font-light mb-6">Get a quick, assured buyout estimate on your property {inLocationText}. Perfect for fast relocation, inherited properties, dealing with tenants, or escaping heavy foreclosure timelines.</p>

              <ul className="space-y-3.5 text-sm font-medium text-slate-700">
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Zero cleaning required:</strong> Sell in exact as-is condition. Leave unwanted property items.</span></li>
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>No repairs:</strong> Skip structural fix costs, painting, mold work, or exterior updates.</span></li>
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>No listing delays:</strong> Get paid quickly with our assured funds. Avoid long banks mortgage loans.</span></li>
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Zero fees:</strong> No real estate agent commissions or hidden closing fee structures.</span></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border-t-8 border-[#213d55] hover:shadow-md transition">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-slate-100 text-slate-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Option B</span>
                <span className="text-xs text-[#868c92] font-semibold tracking-wider flex items-center"><TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />Max Value Program</span>
              </div>
              <h3 className="text-2xl font-serif font-black text-[#092641] mb-3">The "Almost Retail" Partnership</h3>
              <p className="text-slate-500 text-sm font-light mb-6">Keep the majority of your hard-earned equity. We match your property {inLocationText} with our localized trained buyer network who are willing to purchase your property with minimal repair expectations.</p>

              <ul className="space-y-3.5 text-sm font-medium text-slate-705">
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Highest Payout:</strong> Payout matches close to standard market value.</span></li>
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Upfront Coordination:</strong> We handle incoming inquiries and vet potential buyers {inLocationText}.</span></li>
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Lower Headaches:</strong> Way faster and simpler than traditional listing with standard broker contracts.</span></li>
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Minimal standard fees:</strong> Avoid typical realtor commission structures of 6%.</span></li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-[#ced1d5]/40 max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-slate-200 pb-8 mb-10 gap-6">
              <div className="space-y-2">
                <span className="text-sm font-black text-[#ff7043] uppercase tracking-widest flex items-center"><Calculator className="h-5 w-5 mr-2" />Lead Equity Tool</span>
                <h3 className="text-2xl md:text-3xl font-serif font-black text-[#092641]">Interactive Net Payout Calculator</h3>
                <p className="text-slate-500 text-base md:text-lg font-medium">Input your property values to contrast direct payout vs brokerage expenses.</p>
              </div>

              <div className="w-full lg:w-96 text-left space-y-2">
                <div className="flex justify-between text-base font-bold text-[#092641]">
                  <span>Property Fair Value:</span>
                  <span className="text-[#ff7043]">${(houseValue).toLocaleString()}</span>
                </div>
                <input type="range" min="50000" max="1000000" step="10000" value={houseValue} onChange={(e) => setHouseValue(parseInt(e.target.value))} className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ff7043]" />
                <div className="flex justify-between text-xs text-slate-500 font-bold">
                  <span>$50,000</span>
                  <span>$1,000,000</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4 space-y-5">
                <h4 className="text-sm font-extrabold uppercase text-[#092641] tracking-wider mb-3">Estimated Traditional Expenses</h4>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Estimated Necessary Repairs ($)</label>
                  <input type="number" value={repairEstimate} onChange={(e) => setRepairEstimate(Math.max(0, parseInt(e.target.value) || 0))} className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl text-base font-bold focus:border-[#ff7043] focus:outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">MLS Broker Commission (%)</label>
                    <input type="number" value={agentCommissionPct} onChange={(e) => setAgentCommissionPct(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl text-base font-bold focus:border-[#ff7043] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Standard Close Fees (%)</label>
                    <input type="number" value={closingCostsPct} onChange={(e) => setClosingCostsPct(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl text-base font-bold focus:border-[#ff7043] focus:outline-none" />
                  </div>
                </div>

                <div className="bg-[#f8fafc] p-4 rounded-lg border border-slate-200 text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                  💡 <strong className="text-slate-800">Traditional holding fee:</strong> Traditional listing can take 3 to 6 months. Taxes, insurance, and mortgage during wait average around <strong>2%</strong> of property values.
                </div>
              </div>

              <div className="lg:col-span-8 bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,112,67,0.15),transparent_60%)]" />
                <h4 className="text-sm font-black uppercase text-[#ff7043] tracking-widest mb-6">Estimated Net Payout Comparison</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
                  <div className="bg-slate-800/80 border-2 border-slate-700 rounded-xl p-5 text-center flex flex-col justify-center">
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Direct Cash buyout</span>
                    <span className="block text-2xl md:text-3xl font-black mt-2 text-[#ff7043]">${cashOfferValue.toLocaleString()}</span>
                    <span className="block text-sm text-emerald-400 font-extrabold mt-3">Zero broker fees</span>
                    <span className="block text-xs text-slate-300 mt-1 font-medium">As-is, close in 14 days</span>
                  </div>

                  <div className="bg-[#213d55]/80 border-2 border-[#ff7043]/40 rounded-xl p-5 text-center flex flex-col justify-center ring-4 ring-[#ff7043]/20 transform scale-105 shadow-xl">
                    <span className="block text-xs text-slate-200 font-bold uppercase tracking-wider">"Almost Retail" Option</span>
                    <span className="block text-2xl md:text-3xl font-black mt-2 text-green-400">${partnerNetPayout.toLocaleString()}</span>
                    <span className="block text-sm text-green-400 font-extrabold mt-3">Maximum Payout</span>
                    <span className="block text-xs text-slate-200 mt-1 font-medium">We handle upfront inquiries</span>
                  </div>

                  <div className="bg-slate-800/80 border-2 border-slate-700 rounded-xl p-5 text-center flex flex-col justify-center">
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Traditional MLS List</span>
                    <span className="block text-2xl md:text-3xl font-bold mt-2 text-slate-300">${traditionalNetPayout.toLocaleString()}</span>
                    <span className="block text-sm text-red-400 font-extrabold mt-3">-${(traditionalCommission + traditionalClosingCosts + traditionalRepairs + traditionalHoldingCosts).toLocaleString()} fees</span>
                    <span className="block text-xs text-slate-300 mt-1 font-medium">Take 3-6 months to close</span>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-700 text-sm text-slate-400 flex items-center justify-between font-medium">
                  <span>Estimates calculated securely. No credit check required.</span>
                  <a href="#sticky-callout" className="text-[#ff7043] font-black hover:underline flex items-center">Apply to lock offer <ArrowRight className="h-4 w-4 ml-1" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="coverage" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#092641]">Where Nigel Buys Properties</h2>
            <p className="text-slate-600 font-light">We operate actively across the United States. View your local coordinator and check state eligibility.</p>
          </div>

          <div className="bg-[#092641] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between max-w-4xl mx-auto">
            <div className="absolute top-[-30px] right-[-30px] w-64 h-64 bg-slate-800 rounded-full mix-blend-multiply filter blur-2xl opacity-40 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-700 pb-4 gap-2">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight flex items-center">
                    <MapPin className="stroke-2 text-[#ff7043] mr-2 h-6 w-6 shrink-0" />Active: {formattedState || formattedCity}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">County valuation records matched in this region successfully.</p>
                </div>
                <div className="bg-slate-800/80 border border-slate-700 rounded-full px-3 py-1 flex items-center shrink-0 w-max">
                  <span className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300">ELIGIBLE FOR Direct offers</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-xs text-[#868c92] font-semibold uppercase tracking-wider">Local Coordinator on Duty</p>
                  <div className="flex items-center space-x-3.5">
                    <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xl text-[#ff7043] border border-slate-700">C</div>
                    <div>
                      <p className="font-extrabold text-white text-base leading-none">Christopher Clowers</p>
                      <p className="text-[11px] text-slate-400 mt-1">Lead Real Estate Coordinator</p>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2 text-sm text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800"><span>Average Evaluation Time:</span><strong className="text-white">{evaluationSpeed}</strong></div>
                    <div className="flex justify-between py-1 border-b border-slate-800"><span>Active Underwriters / Buyers:</span><strong className="text-white">{localBuyers} partners</strong></div>
                    <div className="flex justify-between py-1 border-b border-slate-800"><span>Lead Rating in {stateAbbr}:</span><strong className="text-amber-400 flex items-center">★ {localRating} / 5.0</strong></div>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-400 mb-3.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current shrink-0" />)}</div>
                    <p className="text-xs text-slate-300 italic leading-relaxed">"Choosing Nigel Buys Houses {inLocationText} was the best choice I made after my mom passed away. Christopher Clowers handled the difficult probate details. I walked away with cash in 11 days."</p>
                  </div>
                  <div className="mt-4 pt-3.5 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                    <span>&mdash; Verified {stateAbbr} Seller Review</span><strong className="text-white">Rated A+</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400 text-center sm:text-left">Need an estimate {inLocationText}? Lock your local coordinator rate today.</p>
              <a href="#sticky-callout" className="bg-[#ff7043] hover:bg-[#e65100] text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight shadow flex items-center justify-center shrink-0 w-full sm:w-auto" style={{ minHeight: '44px' }}>
                <span>Lock Rates Online</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="trust" className="py-20 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,112,67,0.1),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#ff7043] text-xs font-extrabold uppercase tracking-widest block">Core Company Manifesto</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black tracking-tight leading-tight">People Over Profits &mdash; Always. No High Pressure.</h2>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">When we launched Nigel Buys Houses, we didn't want to become just another transactional investment company. We've spent over 7 years educating property owners on what option truly retains their equity. No confusing terminology or aggressive agent push-tactics &mdash; just structured, fair solutions.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start space-x-2"><ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /><div><strong className="block text-white text-sm">Transparency Standard</strong><span className="text-slate-400 text-xs">Clear calculations, local county records matched honestly.</span></div></div>
                <div className="flex items-start space-x-2"><Award className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /><div><strong className="block text-white text-sm">Empowerment Education</strong><span className="text-slate-400 text-xs">We tell you when Listing traditionally is more profitable.</span></div></div>
                <div className="flex items-start space-x-2"><CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /><div><strong className="block text-white text-sm">Zero Obligation Lock</strong><span className="text-slate-400 text-xs">An estimate does not obligate you. Take up to 30 days to reject.</span></div></div>
                <div className="flex items-start space-x-2"><Users className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /><div><strong className="block text-white text-sm">Decades of Local Depth</strong><span className="text-slate-400 text-xs">We partner with native escrow title companies.</span></div></div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800 border border-slate-700 rounded-2xl p-6 relative">
              <h3 className="text-lg font-serif font-black text-white mb-4 flex items-center"><Award className="text-[#ff7043] mr-2 h-5 w-5 stroke-2" />Our Operational Code</h3>
              <div className="divide-y divide-slate-700 text-xs text-slate-300">
                <div className="py-3 flex justify-between"><span className="font-bold text-white">✔ Integrity First</span><span className="text-right text-slate-400">Do right even when unmonitored</span></div>
                <div className="py-3 flex justify-between"><span className="font-bold text-white">✔ Transparent Calculations</span><span className="text-right text-slate-400">Zero hidden fees or list surprises</span></div>
                <div className="py-3 flex justify-between"><span className="font-bold text-white">✔ No-Pressure Guidance</span><span className="text-right text-slate-400">Empower, never coerce or lock</span></div>
                <div className="py-3 flex justify-between"><span className="font-bold text-white">✔ Support Local Vets</span><span className="text-right text-slate-400">A portion of profits go to veteran housing</span></div>
                <div className="py-3 flex justify-between"><span className="font-bold text-white">✔ Win-Win Payouts</span><span className="text-right text-slate-400">If it doesn't solve your query, reject</span></div>
              </div>
              <div className="mt-6 text-center text-[10px] text-slate-500 italic">A+ BBB Rated Real Estate Investor standard representation code.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs" className="py-20 bg-slate-50 border-t border-[#ced1d5]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#092641]">Frequently Asked Questions</h2>
            <p className="text-slate-600 font-light text-sm">Do you have a question about how we valuate? Here are candid answers based on 9,000+ real inquiries.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "What type of properties does Nigel Buys Houses purchase?", a: "We buy single family houses, townhouses, duplexes, multi-family, and vacant properties. It doesn't matter if your property requires light updates or total hoarder cleanups &mdash; we prepare as-is valuation estimates for absolutely any physical condition." },
              { q: "How exactly do you calculate my payout offer?", a: "Our formula is direct and transparent. We look at: 1) Local active comparable sales (comps) in your immediate county, 2) Necessary structural repair estimates, 3) Intrinsic holding fees. We combine this into a quick direct cash buyout option or our Retail Partnership program." },
              { q: "Is there any obligation when I submit my property address?", a: "No! Accessing your layout valuation carries zero obligation. We run state records for you free of charge. You can review our estimates with family, compare against standard agents, or discard completely." },
              { q: "Are cash offers for properties actually legitimate?", a: "While the market has speculative investors, certified buyers like Nigel Buys Houses with an A+ BBB Accreditation verify funds securely with closing title offices. We utilize local, national underwriters to secure standard client transactions legally." },
              { q: "What if my property needs extensive structural repairs?", a: "We purchase in exact as-is condition. You do not need to clean closets, pick up trash, repair roofing, or paint walls. We absorb those coordination efforts fully within our buyout structures." },
              { q: "How fast can you buy my house and make the payout?", a: "Once you approve the direct buy offer, we can close the escrow processing in 9 to 14 business days. Payout is coordinated directly through a local certified bank wire or bank-guaranteed cashier checks." }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-[#ced1d5]/40 overflow-hidden shadow-xs hover:border-[#ff7043]/30 transition">
                <button onClick={() => setExpandedAccordion(expandedFaq === index ? null : index)} className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-[#092641] text-sm md:text-base" style={{ minHeight: '44px' }}>
                  <span>{faq.q}</span>
                  {expandedFaq === index ? <ChevronUp className="h-5 w-5 text-[#ff7043]" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                </button>
                {expandedFaq === index && <div className="px-5 pb-5 pt-1 text-slate-600 font-light text-sm border-t border-slate-50 leading-relaxed bg-[#f8fafc]">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#ced1d5]/40 py-16 text-slate-600 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center space-x-2.5">
              <img src="https://raw.githubusercontent.com/ssuuppeerrmmaann/Nigel-Buys-Houses/refs/heads/main/assets/images/Nigel%20Buys%20Houses%20NBH%20Favicon.png?raw=true" alt="Nigel Buys Houses Logo" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              <span className="font-serif font-black text-[#092641] text-lg">Nigel Buys Houses</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl">&copy; {new Date().getFullYear()} Nigel Buys Houses. Powered by certified local underwriters. Subject to active local guidelines. All property valuations are estimates based on accessible public registry records. This website replicates state operations showing options with high-fidelity performance.</p>
            <div className="flex items-center space-x-3">
              <span className="inline-block h-2.5 w-2.5 bg-green-500 rounded-full" />
              <span className="text-[11px] text-slate-400">Local Title Partners Secured &amp; Bonded</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-[#092641] uppercase tracking-wider text-[11px]">Help Hotline</h4>
            <div className="space-y-2">
              <a href="tel:(480)500-9801" className="font-bold text-[#ff7043] text-sm hover:underline block">☎ Call/Text: (480) 500-9801</a>
              <p className="text-slate-400 text-[11px]">Active average response under 15 minutes.</p>
              <p className="text-slate-400 text-[11px]">Corporate Office: Phoenix, AZ 85016-7849</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
