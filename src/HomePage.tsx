// FILE: HomePage.tsx
// TITLE: HomePage (Decoupled Webhook Architecture)

import React, { useState, useEffect } from 'react';
import { 
  Building, 
  ShieldCheck, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Trash, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Award, 
  Calculator, 
  TrendingUp, 
  Users, 
  Lock, 
  AlertCircle,
  Check,
  ThumbsUp,
  ExternalLink,
  ChevronRight,
  ClipboardList
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
  { name: 'Alabama', abbr: 'AL', speed: '12 days', coordinator: 'Marcus Vance', rating: 4.9, activeBuyers: 14 },
  { name: 'Arizona', abbr: 'AZ', speed: '10 days', coordinator: 'Sarah Jennings', rating: 4.8, activeBuyers: 22 },
  { name: 'California', abbr: 'CA', speed: '11 days', coordinator: 'Derrick Hall', rating: 4.9, activeBuyers: 45 },
  { name: 'Colorado', abbr: 'CO', speed: '12 days', coordinator: 'Brooke Miller', rating: 4.7, activeBuyers: 16 },
  { name: 'Connecticut', abbr: 'CT', speed: '14 days', coordinator: 'Thomas Cole', rating: 4.8, activeBuyers: 9 },
  { name: 'Delaware', abbr: 'DE', speed: '13 days', coordinator: 'Thomas Cole', rating: 4.6, activeBuyers: 8 },
  { name: 'Florida', abbr: 'FL', speed: '9 days', coordinator: 'Elena Rodriguez', rating: 4.9, activeBuyers: 38 },
  { name: 'Georgia', abbr: 'GA', speed: '10 days', coordinator: 'Raymond Harris', rating: 4.8, activeBuyers: 27 },
  { name: 'Idaho', abbr: 'ID', speed: '14 days', coordinator: 'Sarah Jennings', rating: 4.7, activeBuyers: 7 },
  { name: 'Illinois', abbr: 'IL', speed: '11 days', coordinator: 'David Sterling', rating: 4.8, activeBuyers: 19 },
  { name: 'Indiana', abbr: 'IN', speed: '11 days', coordinator: 'Karen Wu', rating: 4.9, activeBuyers: 15 },
  { name: 'Kentucky', abbr: 'KY', speed: '12 days', coordinator: 'Marcus Vance', rating: 4.7, activeBuyers: 12 },
  { name: 'Louisiana', abbr: 'LA', speed: '13 days', coordinator: 'Elena Rodriguez', rating: 4.6, activeBuyers: 10 },
  { name: 'Maryland', abbr: 'MD', speed: '12 days', coordinator: 'Thomas Cole', rating: 4.8, activeBuyers: 14 },
  { name: 'Massachusetts', abbr: 'MA', speed: '14 days', coordinator: 'Thomas Cole', rating: 4.9, activeBuyers: 18 },
  { name: 'Michigan', abbr: 'MI', speed: '10 days', coordinator: 'David Sterling', rating: 4.9, activeBuyers: 21 },
  { name: 'Minnesota', abbr: 'MN', speed: '12 days', coordinator: 'Karen Wu', rating: 4.7, activeBuyers: 11 },
  { name: 'Missouri', abbr: 'MO', speed: '11 days', coordinator: 'David Sterling', rating: 4.8, activeBuyers: 14 },
  { name: 'Nevada', abbr: 'NV', speed: '10 days', coordinator: 'Sarah Jennings', rating: 4.8, activeBuyers: 13 },
  { name: 'North Carolina', abbr: 'NC', speed: '10 days', coordinator: 'Marcus Vance', rating: 4.9, activeBuyers: 26 },
  { name: 'Ohio', abbr: 'OH', speed: '11 days', coordinator: 'David Sterling', rating: 4.8, activeBuyers: 23 },
  { name: 'Oklahoma', abbr: 'OK', speed: '12 days', coordinator: 'Karen Wu', rating: 4.7, activeBuyers: 10 },
  { name: 'Oregon', abbr: 'OR', speed: '12 days', coordinator: 'Sarah Jennings', rating: 4.8, activeBuyers: 12 },
  { name: 'Pennsylvania', abbr: 'PA', speed: '11 days', coordinator: 'Thomas Cole', rating: 4.8, activeBuyers: 20 },
  { name: 'Rhode Island', abbr: 'RI', speed: '14 days', coordinator: 'Thomas Cole', rating: 4.9, activeBuyers: 6 },
  { name: 'Tennessee', abbr: 'TN', speed: '10 days', coordinator: 'Marcus Vance', rating: 4.9, activeBuyers: 18 },
  { name: 'Texas', abbr: 'TX', speed: '9 days', coordinator: 'Brooke Miller', rating: 4.9, activeBuyers: 42 },
  { name: 'Utah', abbr: 'UT', speed: '11 days', coordinator: 'Brooke Miller', rating: 4.8, activeBuyers: 11 },
  { name: 'Virginia', abbr: 'VA', speed: '11 days', coordinator: 'Thomas Cole', rating: 4.8, activeBuyers: 19 },
  { name: 'Washington', abbr: 'WA', speed: '12 days', coordinator: 'Sarah Jennings', rating: 4.8, activeBuyers: 17 },
  { name: 'Wisconsin', abbr: 'WI', speed: '12 days', coordinator: 'David Sterling', rating: 4.8, activeBuyers: 13 },
  { name: 'Wyoming', abbr: 'WY', speed: '14 days', coordinator: 'Sarah Jennings', rating: 4.6, activeBuyers: 5 }
];

// SECTION: Main Component
export default function HomePage() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive Wizard Leads states
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [selectedState, setSelectedState] = useState('Florida');
  const [zipCode, setZipCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // Validation and process tracking
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successLead, setSuccessLead] = useState<Lead | null>(null);
  const [fieldError, setFieldError] = useState('');
  
  // Interactive Map states
  const [mapSearch, setMapSearch] = useState('');
  const [activeStateAbbr, setActiveStateAbbr] = useState('FL');
  const [activeStateRecord, setActiveStateRecord] = useState(STATE_RECORDS.find(s => s.abbr === 'FL')!);

  // Cost calculator variables
  const [houseValue, setHouseValue] = useState(250000);
  const [agentCommissionPct, setAgentCommissionPct] = useState(6);
  const [closingCostsPct, setClosingCostsPct] = useState(2);
  const [repairEstimate, setRepairEstimate] = useState(15000);

  // UI States
  const [expandedFaq, setExpandedAccordion] = useState<number | null>(null);
  const [leadsDb, setLeadsDb] = useState<Lead[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminSearch, setAdminOpenSearch] = useState('');

  // Make.com Webhook URL (Replace this string with your actual Make webhook URL)
  const MAKE_WEBHOOK_URL = 'YOUR_MAKE_WEBHOOK_URL_HERE';

  // SECTION: Lifecycle & Effects
  useEffect(() => {
    // Load cached leads from local storage for testing viewer
    const saved = localStorage.getItem('fair_simple_leads');
    if (saved) {
      try {
        setLeadsDb(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse local leads', e);
      }
    }
  }, []);

  const saveLeadsToStorage = (updatedList: Lead[]) => {
    localStorage.setItem('fair_simple_leads', JSON.stringify(updatedList));
    setLeadsDb(updatedList);
  };

  const handleStateAbbrSelect = (abbr: string) => {
    setActiveStateAbbr(abbr);
    const record = STATE_RECORDS.find(s => s.abbr === abbr);
    if (record) setActiveStateRecord(record);
  };

  // SECTION: Form Handlers
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
      // Push directly to Make.com Webhook
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      });

      if (response.ok) {
        leadPayload.webhookSynced = true;
      } else {
        console.warn('Webhook received payload but returned an error status.');
      }
    } catch (err) {
      console.error('Webhook fetch failed. Saving locally.', err);
    }

    // Always save to local state regardless of webhook success so the user proceeds
    const updatedDb = [leadPayload, ...leadsDb];
    saveLeadsToStorage(updatedDb);
    setSuccessLead(leadPayload);
    setIsSubmitting(false);
    setStep(3);
  };

  const resetLeadForm = () => {
    setStep(1);
    setAddress('');
    setCity('');
    setSelectedState('Florida');
    setZipCode('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setSuccessLead(null);
    setFieldError('');
  };

  // SECTION: Admin Actions (Local Only)
  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to remove this lead record locally?')) {
      const updated = leadsDb.filter(l => l.id !== id);
      saveLeadsToStorage(updated);
    }
  };

  // SECTION: Calculators
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

  // SECTION: Render
  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* 24-HOUR ADVISORY/BANNER ON TOP */}
      <div id="sticky-callout" className="bg-[#ff7043] text-white py-3 px-5 text-center text-sm md:text-base font-bold tracking-wide shadow-sm z-50">
        <span className="inline-block bg-white/20 px-2.5 py-1 rounded text-xs uppercase mr-2 animate-pulse">⏰ Live Alert</span>
        Nationwide coverage update: We currently buy in <strong className="font-bold underline text-white">32 states</strong>! Avoid real estate commission fees by about 10%
      </div>

      {/* HEADER SECTION */}
      <header className="bg-white border-b border-[#ced1d5]/40 sticky top-0 z-40 transform transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center space-x-3.5">
            <img 
              src="https://github.com/ssuuppeerrmmaann/Nigel-Buys-Houses/blob/main/assets/images/nigel_buys_houses_white.png?raw=true" 
              alt="Nigel Buys Houses Logo" 
              className="h-10 md:h-12 w-auto object-contain bg-[#092641] rounded" 
              referrerPolicy="no-referrer" 
            />
            <div>
              <span className="block font-serif text-xl md:text-2xl font-black text-[#092641] leading-none tracking-tight">
                Nigel Buys Houses
              </span>
            </div>
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
                <Phone className="h-4 w-4 mr-1.5 fill-current" />
                (480) 500-9801
              </a>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg border border-[#ced1d5] text-[#092641] hover:bg-[#f8f8f8]"
              style={{ minHeight: '44px', minWidth: '44px' }}
              aria-label="Toggle Menu"
            >
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
                <Phone className="h-5 w-5 mr-2 fill-current" />
                (480) 500-9801
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
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
              Sell Your House <span className="text-[#ff7043]">Fast On Your Terms</span>. No Headaches.
            </h1>

            <p className="text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Skip traditional real estate broker commission fees and months of open house cleaning. Get an instant cash purchase estimate or sell close to retail value without typical listing delays. Same-day county valuations.
            </p>

            <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-3 text-center transition hover:border-[#ff7043]/30">
                <div className="flex justify-center text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4.5 w-4.5 fill-current" />)}
                </div>
                <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-bold">Google Stars</p>
                <p className="text-sm font-black text-white">5.0 Out of 5</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-3 text-center transition hover:border-[#ff7043]/30">
                <div className="text-blue-400 text-base font-black mb-1 tracking-widest">BBB A+</div>
                <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-bold">TRUSTED</p>
                <p className="text-sm font-black text-white">Accredited</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-3 text-center transition hover:border-[#ff7043]/30">
                <div className="flex justify-center text-blue-400 mb-1">
                  <ThumbsUp className="h-4.5 w-4.5 fill-current" />
                </div>
                <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-bold">REVIEWS</p>
                <p className="text-sm font-black text-white">5-Star Rated</p>
              </div>
            </div>

            <div className="text-xs text-slate-400 mt-2 flex items-center justify-center lg:justify-start space-x-1.5">
              <AlertCircle className="h-4 w-4 text-emerald-400" />
              <span>We buy properties currently listed with Real Estate Brokerages and active on the MLS. We are NOT soliciting your property as a listing.</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-[#092641] relative border-b-4 border-[#ff7043]">
            <div className="absolute top-0 right-6 translate-y-[-50%] bg-[#092641] text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              Lead Valuation Portal
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
                <span className={step >= 1 ? "text-[#ff7043]" : ""}>1. PROPERTY Info</span>
                <span className={step >= 2 ? "text-[#ff7043]" : ""}>2. YOUR Details</span>
                <span className={step >= 3 ? "text-green-500 font-extrabold" : ""}>3. ESTIMATES</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${step === 3 ? "bg-green-500" : "bg-[#ff7043]"}`}
                  style={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%' }}
                />
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
                  <h3 className="text-lg md:text-xl font-bold font-serif mb-1 text-[#092641]">Let's See What Your Home Is Worth</h3>
                  <p className="text-xs text-[#868c92] font-semibold">Enter your address for a calculated direct offer analysis.</p>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#092641] mb-1">Street Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 129 Walnut Dr" 
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#092641] mb-1">City <span className="text-slate-400">(optional)</span></label>
                      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Orlando" className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#092641] mb-1">Zip Code <span className="text-slate-400">(optional)</span></label>
                      <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="32801" className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#092641] mb-1">State <span className="text-red-500">*</span></label>
                    <select 
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        const match = STATE_RECORDS.find(s => s.name === e.target.value);
                        if (match) {
                          setActiveStateAbbr(match.abbr);
                          setActiveStateRecord(match);
                        }
                      }}
                      className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm bg-white focus:border-[#ff7043] focus:outline-none"
                    >
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
                  <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-lg text-sm font-bold transition" style={{ minHeight: '44px' }}>
                    Back
                  </button>

                  <button type="submit" disabled={isSubmitting} className="w-2/3 bg-[#ff7043] hover:bg-[#e65100] text-white py-3 rounded-lg font-serif text-base font-bold shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2" style={{ minHeight: '44px' }}>
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Calculating...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Valuation Payout</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && successLead && (
              <div className="space-y-4 text-center">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 inline-block mb-2">
                  <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                  <h4 className="font-serif font-black text-[#092641] text-lg">Analysis Complete!</h4>
                  <p className="text-xs text-emerald-700 mt-1">We found active buyers in <strong>{successLead.state}</strong>!</p>
                </div>

                <div className="space-y-3.5 text-left border-y border-slate-100 py-4 my-2">
                  <div className="bg-[#f8fafc] p-3.5 rounded-lg border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">1. Instant Cash Purchase Option</p>
                    <p className="text-xl font-serif font-black text-[#ff7043] mt-0.5">${(cashOfferValue).toLocaleString()}</p>
                    <p className="text-xs text-slate-500 mt-0.5">As-is condition buyout. Close details in 10-14 days. Zero broker commissions.</p>
                  </div>

                  <div className="bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">2. "Almost Retail" Program Maximum Equity</p>
                    <p className="text-lg font-black text-emerald-700 mt-0.5">${(partnerNetPayout).toLocaleString()}</p>
                    <p className="text-xs text-slate-500 mt-0.5">List utilizing our localized trained buyer partners. Payout is closer to full market values.</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 italic">
                  *A local coordinator (Mr/Ms {activeStateRecord.coordinator}) has received this record for {successLead.address}. They will call you at <strong className="text-[#092641]">{successLead.phone}</strong> shortly to review physical condition!
                </p>

                <button onClick={resetLeadForm} className="w-full bg-[#092641] hover:bg-[#1e3a5f] text-white py-3 rounded-lg text-sm font-extrabold shadow transition" style={{ minHeight: '44px' }}>
                  Valuate Another Home
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

      {/* THREE SIMPLE STEPS SECTION */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#092641]">How the Nigel Buys Houses Process Works</h2>
            <p className="text-slate-600 font-light">We took real estate out of the dark ages. Here is our 3-step lead process, designed to provide transparent choices for your timeline and goals.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 relative group hover:shadow-lg transition">
              <div className="absolute top-0 right-8 translate-y-[-50%] bg-[#ff7043] text-white font-serif font-bold text-lg pt-1 pb-1.5 px-3.5 rounded-full inline-block">1</div>
              <div className="text-[#ff7043] bg-white p-3 rounded-xl shadow inline-block mb-6"><ClipboardList className="h-6 w-6 stroke-2" /></div>
              <h3 className="text-xl font-bold font-serif mb-2 text-[#092641]">Tell Us About Your Home</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">Fill out the quick valuation form above, or call our 24/7 coordinator line. It is easy, completely free, and carries zero obligation.</p>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 relative group hover:shadow-lg transition">
              <div className="absolute top-0 right-8 translate-y-[-50%] bg-[#ff7043] text-white font-serif font-bold text-lg pt-1 pb-1.5 px-3.5 rounded-full inline-block">2</div>
              <div className="text-[#ff7043] bg-white p-3 rounded-xl shadow inline-block mb-6"><TrendingUp className="h-6 w-6 stroke-2" /></div>
              <h3 className="text-xl font-bold font-serif mb-2 text-[#092641]">Review Your Buy Options</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">We present two concrete choices: A fast cash buyout quote directly from us, or our popular facilitated retail list program targeting top value.</p>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 relative group hover:shadow-lg transition">
              <div className="absolute top-0 right-8 translate-y-[-50%] bg-[#ff7043] text-white font-serif font-bold text-lg pt-1 pb-1.5 px-3.5 rounded-full inline-block">3</div>
              <div className="text-[#ff7043] bg-white p-3 rounded-xl shadow inline-block mb-6"><DollarSign className="h-6 w-6 stroke-2" /></div>
              <h3 className="text-xl font-bold font-serif mb-2 text-[#092641]">Close on Your Schedule</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">If you accept our buy proposal, select your target closing date. You get paid in 10-14 days. We handle paperwork, cleanup, and closing costs.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="#sticky-callout" className="inline-flex items-center space-x-2 bg-[#092641] hover:bg-[#1e3a5f] text-white py-3.5 px-8 rounded-full font-serif font-bold shadow-md transition">
              <span>Get Started &mdash; Fill Valuation Form</span>
              <ChevronRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CORE FEATURE: DETAILED APP WORK OFFER COMPARISON */}
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
              <p className="text-slate-500 text-sm font-light mb-6">Get a quick, assured buyout estimate on your property. Perfect for fast relocation, inherited homes, dealing with tenants, or escaping heavy foreclosure timelines.</p>

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
              <p className="text-slate-500 text-sm font-light mb-6">Keep the majority of your hard-earned equity. We match your property with our localized trained buyer network who are willing to purchase your home with minimal repair expectations.</p>

              <ul className="space-y-3.5 text-sm font-medium text-slate-705">
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Highest Payout:</strong> Payout matches close to standard market value.</span></li>
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Upfront Coordination:</strong> We handle incoming inquiries and vet potential buyers.</span></li>
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Lower Headaches:</strong> Way faster and simpler than traditional listing with standard broker contracts.</span></li>
                <li className="flex items-start space-x-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Minimal standard fees:</strong> Avoid typical realtor commission structures of 6%.</span></li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-[#ced1d5]/40 max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-slate-100 pb-6 mb-8 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-[#ff7043] uppercase tracking-widest flex items-center"><Calculator className="h-4 w-4 mr-1" />Lead Equity Tool</span>
                <h3 className="text-xl md:text-2xl font-serif font-black text-[#092641]">Interactive Net Payout Calculator</h3>
                <p className="text-slate-500 text-xs font-light">Input your home values to contrast direct payout vs brokerage expenses.</p>
              </div>

              <div className="w-full lg:w-96 text-left space-y-1">
                <div className="flex justify-between text-sm font-bold text-[#092641]">
                  <span>Property Fair Value:</span>
                  <span className="text-[#ff7043]">${(houseValue).toLocaleString()}</span>
                </div>
                <input type="range" min="50000" max="1000000" step="10000" value={houseValue} onChange={(e) => setHouseValue(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#ff7043]" />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>$50,000</span>
                  <span>$1,000,000</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-[#092641] tracking-wider mb-2">Estimated Traditional Expenses</h4>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Necessary Repairs ($)</label>
                  <input type="number" value={repairEstimate} onChange={(e) => setRepairEstimate(Math.max(0, parseInt(e.target.value) || 0))} className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">MLS Broker Commission (%)</label>
                    <input type="number" value={agentCommissionPct} onChange={(e) => setAgentCommissionPct(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Standard Close Fees (%)</label>
                    <input type="number" value={closingCostsPct} onChange={(e) => setClosingCostsPct(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-sm focus:border-[#ff7043] focus:outline-none" />
                  </div>
                </div>

                <div className="bg-[#f8fafc] p-3 rounded-lg border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                  💡 <strong>Traditional holding fee:</strong> Traditional listing can take 3 to 6 months. Taxes, insurance, and mortgage during wait average around <strong>2%</strong> of home values.
                </div>
              </div>

              <div className="lg:col-span-8 bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,112,67,0.1),transparent_60%)]" />
                <h4 className="text-xs font-extrabold uppercase text-[#ff7043] tracking-widest mb-4">Estimated Net Payout Comparison</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-center">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Direct Cash buyout</span>
                    <span className="block text-xl font-bold mt-1 text-[#ff7043]">${cashOfferValue.toLocaleString()}</span>
                    <span className="block text-[11px] text-emerald-400 font-bold mt-2">Zero broker fees</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">As-is, close in 14 days</span>
                  </div>

                  <div className="bg-[#213d55]/80 border border-[#ff7043]/30 rounded-xl p-4 text-center ring-2 ring-[#ff7043]/30">
                    <span className="block text-[10px] text-slate-300 font-bold uppercase">"Almost Retail" Option</span>
                    <span className="block text-xl font-black mt-1 text-green-400">${partnerNetPayout.toLocaleString()}</span>
                    <span className="block text-[11px] text-green-400 font-bold mt-2">Maximum Payout</span>
                    <span className="block text-[10px] text-slate-300 mt-0.5">We handle upfront inquiries</span>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-center">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Traditional MLS List</span>
                    <span className="block text-xl font-bold mt-1 text-slate-300">${traditionalNetPayout.toLocaleString()}</span>
                    <span className="block text-[11px] text-red-400 font-bold mt-2">-${(traditionalCommission + traditionalClosingCosts + traditionalRepairs + traditionalHoldingCosts).toLocaleString()} fees</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Take 3-6 months to close</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Estimates calculated securely. No credit check required.</span>
                  <a href="#sticky-callout" className="text-[#ff7043] font-bold hover:underline">Apply to locking offer &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURE: DYNAMIC STATE COORDINATOR TESTIMONIAL FINDER */}
      <section id="coverage" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#092641]">Where Nigel Buys Houses Buys Houses</h2>
            <p className="text-slate-600 font-light">We operate actively across the United States. Click on your state below or search to find your local coordinator, average buyout times, and check state eligibility.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <label className="block text-xs font-extrabold uppercase text-[#092641] tracking-wider mb-2">Filter Valualable States</label>
                <input type="text" placeholder="e.g. Texas, Florida, Michigan..." value={mapSearch} onChange={(e) => setMapSearch(e.target.value)} className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#ff7043]" />
              </div>

              <div className="border border-slate-100 rounded-xl overflow-y-auto max-h-96 divide-y divide-slate-100">
                {STATE_RECORDS.filter(s => s.name.toLowerCase().includes(mapSearch.toLowerCase()) || s.coordinator.toLowerCase().includes(mapSearch.toLowerCase())).map((st) => (
                  <button key={st.abbr} onClick={() => handleStateAbbrSelect(st.abbr)} className={`w-full text-left px-4 py-3 flex justify-between items-center transition ${activeStateAbbr === st.abbr ? 'bg-[#ff7043]/10 font-bold border-l-4 border-[#ff7043]' : 'hover:bg-slate-50'}`}>
                    <div className="flex items-center space-x-2.5">
                      <span className="inline-block bg-[#092641] text-white text-[10px] w-5 h-5 rounded flex items-center justify-center font-bold tracking-tight">{st.abbr}</span>
                      <span className="text-sm text-[#092641]">{st.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-slate-400 font-semibold">{st.speed}</span>
                      <span className="text-[#ff7043] font-bold">★ {st.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#092641] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-[-30px] right-[-30px] w-64 h-64 bg-slate-800 rounded-full mix-blend-multiply filter blur-2xl opacity-40 pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-700 pb-4 gap-2">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight flex items-center">
                      <MapPin className="stroke-2 text-[#ff7043] mr-2 h-6 w-6 shrink-0" />Active: {activeStateRecord.name}
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
                      <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xl text-[#ff7043] border border-slate-700">{activeStateRecord.coordinator.charAt(0)}</div>
                      <div>
                        <p className="font-extrabold text-white text-base leading-none">{activeStateRecord.coordinator}</p>
                        <p className="text-[11px] text-slate-400 mt-1">Lead Real Estate Coordinator</p>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2 text-sm text-slate-300">
                      <div className="flex justify-between py-1 border-b border-slate-800"><span>Average Evaluation Time:</span><strong className="text-white">{activeStateRecord.speed}</strong></div>
                      <div className="flex justify-between py-1 border-b border-slate-800"><span>Active Underwriters / Buyers:</span><strong className="text-white">{activeStateRecord.activeBuyers} partners</strong></div>
                      <div className="flex justify-between py-1 border-b border-slate-800"><span>Lead Rating in {activeStateAbbr}:</span><strong className="text-amber-400 flex items-center">★ {activeStateRecord.rating} / 5.0</strong></div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex text-amber-400 mb-3.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current shrink-0" />)}</div>
                      <p className="text-xs text-slate-300 italic leading-relaxed">"Choosing Nigel Buys Houses in {activeStateRecord.name} was the best choice I made after my mom passed away. {activeStateRecord.coordinator} handled the difficult probate details. I walked away with cash in 11 days."</p>
                    </div>
                    <div className="mt-4 pt-3.5 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                      <span>&mdash; Verified {activeStateAbbr} Seller Review</span><strong className="text-white">Rated A+</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400 text-center sm:text-left">Need an estimate in <strong>{activeStateRecord.name}</strong>? Lock your local coordinator rate today.</p>
                <a href="#sticky-callout" className="bg-[#ff7043] hover:bg-[#e65100] text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-tight shadow flex items-center justify-center shrink-0 w-full sm:w-auto" style={{ minHeight: '44px' }}>
                  <span>Lock Rates Online</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUE & TRUST SECTION */}
      <section id="trust" className="py-20 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,112,67,0.1),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#ff7043] text-xs font-extrabold uppercase tracking-widest block">Core Company Manifesto</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black tracking-tight leading-tight">People Over Profits &mdash; Always. No High Pressure.</h2>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">When we launched Nigel Buys Houses, we didn't want to become just another transactional investment company. We've spent over 7 years educating home owners on what option truly retains their equity. No confusing terminology or aggressive agent push-tactics &mdash; just structured, fair solutions.</p>

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
                <div className="py-3 flex justify-between"><span className="font-bold text-white">✔ Support Local Vets</span><span className="text-right text-slate-400">A portion of profits go to veteran houses</span></div>
                <div className="py-3 flex justify-between"><span className="font-bold text-white">✔ Win-Win Payouts</span><span className="text-right text-slate-400">If it doesn't solve your query, reject</span></div>
              </div>
              <div className="mt-6 text-center text-[10px] text-slate-500 italic">A+ BBB Rated Real Estate Investor standard representation code.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section id="faqs" className="py-20 bg-slate-50 border-t border-[#ced1d5]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#092641]">Frequently Asked Questions</h2>
            <p className="text-slate-600 font-light text-sm">Do you have a question about how we valuate? Here are candid answers based on 9,000+ real inquiries.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "What type of properties does Nigel Buys Houses purchase?", a: "We buy single family homes, townhouses, duplexes, multi-family, and vacant properties. It doesn't matter if your home requires light updates or total hoarder cleanups &mdash; we prepare as-is valuation estimates for absolutely any physical condition." },
              { q: "How exactly do you calculate my payout offer?", a: "Our formula is direct and transparent. We look at: 1) Local active comparable sales (comps) in your immediate county, 2) Necessary structural repair estimates, 3) Intrinsic holding fees. We combine this into a quick direct cash buyout option or our Retail Partnership program." },
              { q: "Is there any obligation when I submit my home address?", a: "No! Accessing your layout valuation carries zero obligation. We run state records for you free of charge. You can review our estimates with family, compare against standard agents, or discard completely." },
              { q: "Are cash offers for houses actually legitimate?", a: "While the market has speculative investors, certified buyers like Nigel Buys Houses with an A+ BBB Accreditation verify funds securely with closing title offices. We utilize local, national underwriters to secure standard client transactions legally." },
              { q: "What if my house needs extensive structural repairs?", a: "We purchase in exact as-is condition. You do not need to clean closets, pick up trash, repair roofing, or paint walls. We absorb those coordination efforts fully within our buyout structures." },
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

      {/* FOOTER & TRUST BANNER SECTION */}
      <footer className="bg-white border-t border-[#ced1d5]/40 py-16 text-slate-600 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-2.5">
              <img src="https://raw.githubusercontent.com/ssuuppeerrmmaann/Nigel-Buys-Houses/refs/heads/main/assets/logos/nigel_buys_houses_transparent.png" alt="Nigel Buys Houses Logo" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              <span className="font-serif font-black text-[#092641] text-lg">Nigel Buys Houses</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">&copy; {new Date().getFullYear()} Nigel Buys Houses. Powered by certified local underwriters. Subject to active local guidelines. All home valuations are estimates based on accessible public registry records. This website replicates state operations showing options with high-fidelity performance.</p>
            <div className="flex items-center space-x-3">
              <span className="inline-block h-2.5 w-2.5 bg-green-500 rounded-full" />
              <span className="text-[11px] text-slate-400">Local Title Partners Secured &amp; Bonded</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-[#092641] uppercase tracking-wider text-[11px]">Help Hotline</h4>
            <div className="space-y-2">
              <a href="tel:(480)500-9801" className="font-bold text-[#ff7043] text-sm hover:underline block">☎ Call/Text: (480) 500-9801</a>
              <p className="text-slate-400 text-[11px]">Active average response under 15 minutes.</p>
              <p className="text-slate-400 text-[11px]">Corporate Office: Rockford, MI 49341</p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-[#092641] uppercase tracking-wider text-[11px]">Testing Tools</h4>
            <div className="space-y-2">
              <button onClick={() => setAdminOpen(true)} className="bg-[#092641] text-white px-3.5 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 hover:bg-[#1e3a5f] transition cursor-pointer" style={{ minHeight: '36px' }}>
                <ClipboardList className="h-4 w-4" />
                <span>🔑 Inspect leads ({leadsDb.length})</span>
              </button>
              <p className="text-[10px] text-slate-400">Simulate admin evaluation pipeline and status.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* DYNAMIC LEADS VIEWER PORTAL MODAL */}
      {adminOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden text-[#092641] flex flex-col max-h-[90vh]">
            <div className="bg-[#092641] text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-serif font-bold text-white flex items-center"><ClipboardList className="h-5 w-5 text-[#ff7043] mr-2" />Lead Valuation Inspect Portal (Admin Simulator)</h3>
                <p className="text-xs text-slate-300">Review lead submission state variables securely.</p>
              </div>
              <button onClick={() => setAdminOpen(false)} className="p-1 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white" style={{ minHeight: '44px', minWidth: '44px' }}><X className="h-6 w-6" /></button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="relative w-full sm:w-72">
                  <input type="text" placeholder="Search leads by name, address..." value={adminSearch} onChange={(e) => setAdminOpenSearch(e.target.value)} className="w-full pl-3 pr-3 py-1.5 border border-slate-300 bg-white rounded text-xs focus:outline-none" />
                </div>
                <div className="text-xs text-slate-500 font-bold shrink-0">Total Local Leads: {leadsDb.length}</div>
              </div>

              {leadsDb.filter(l => l.firstName.toLowerCase().includes(adminSearch.toLowerCase()) || l.lastName.toLowerCase().includes(adminSearch.toLowerCase()) || l.address.toLowerCase().includes(adminSearch.toLowerCase())).map((lead) => {
                const cashBuy = Math.round(lead.estimatedValue * cashOfferPercentage);
                const listBuy = Math.round(lead.estimatedValue * partnerSalePercentage);

                return (
                  <div key={lead.id} className="border border-slate-200 rounded-xl p-4 space-y-3 hover:border-slate-300 transition bg-slate-50/50">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-2 gap-2">
                      <div>
                        <span className="text-xs font-bold text-[#ff7043] uppercase tracking-wider">Property Address</span>
                        <p className="font-extrabold text-sm text-[#092641] flex items-center mt-0.5">
                          <MapPin className="h-4 w-4 text-[#ff7043] mr-1 shrink-0" />
                          {lead.address}, {lead.city}, {lead.state} {lead.zipCode}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleDeleteLead(lead.id)} className="text-[#ff7043] hover:text-red-600 p-1 hover:bg-slate-100 rounded" title="Delete record locally" style={{ minHeight: '36px', minWidth: '36px' }}>
                          <Trash className="h-4 w-4 mx-auto" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <strong className="block text-slate-400 font-bold uppercase text-[9px]">Seller Contact</strong>
                        <p className="font-bold text-[#092641] mt-0.5">{lead.firstName} {lead.lastName}</p>
                        <p className="text-slate-500">{lead.phone}</p>
                        <p className="text-slate-500 overflow-hidden text-ellipsis">{lead.email}</p>
                      </div>
                      <div>
                        <strong className="block text-slate-400 font-bold uppercase text-[9px]">County Valuations</strong>
                        <p className="font-semibold text-slate-700 mt-0.5">EST. Value: ${lead.estimatedValue.toLocaleString()}</p>
                        <p className="text-[#ff7043]">Offer A: ${cashBuy.toLocaleString()}</p>
                        <p className="text-green-600 font-bold">Offer B: ${listBuy.toLocaleString()}</p>
                      </div>
                      <div>
                        <strong className="block text-slate-400 font-bold uppercase text-[9px]">Submission Time</strong>
                        <p className="text-slate-500 mt-0.5">{lead.timestamp}</p>
                        <p className={`text-[10px] font-semibold mt-1 flex items-center ${lead.webhookSynced ? 'text-green-600' : 'text-amber-600'}`}>
                          <span className={`inline-block h-2 w-2 rounded-full mr-1 ${lead.webhookSynced ? 'bg-green-500' : 'bg-amber-500'}`} />
                          {lead.webhookSynced ? 'Webhook Pushed' : 'Webhook Failed'}
                        </p>
                      </div>
                      <div className="flex flex-col justify-end space-y-1.5">
                        <button onClick={() => alert(`Underwriter Contact: Connecting to coordinator for ${lead.state} regarding lead address ${lead.address}.`)} className="bg-[#092641] text-white hover:bg-[#1a3a5a] text-[10px] py-1 px-2.5 rounded font-bold transition flex items-center justify-center space-x-1">
                          <span>Call Coordinator</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {leadsDb.length === 0 && (
                <div className="text-center p-12 bg-slate-50 rounded-xl">
                  <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-500">No home valuation lead records currently saved locally.</p>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-400">Leads displayed are cached locally. Backend processing handled via Make.com Webhook.</span>
              <button onClick={() => setAdminOpen(false)} className="bg-[#092641] text-white hover:bg-slate-800 px-5 py-2 rounded font-bold" style={{ minHeight: '36px' }}>
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
