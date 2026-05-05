import React, { useState } from 'react';
import { Users, Award, Shield, Briefcase, ChevronDown, Mail, MapPin, Building2 } from 'lucide-react';

export default function EditorialBoard() {
  const [expandedSection, setExpandedSection] = useState('editor-in-chief');

  const toggleSection = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100">
            Editorial Board
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed px-2">
            Our distinguished editorial board comprises leading experts from around the world,
            dedicated to maintaining the highest standards of academic excellence and integrity.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-8 md:mt-12 max-w-4xl mx-auto">
            {[['40+','Board Members'],['15+','Countries'],['12','Committees'],['100%','Excellence']].map(([val, label]) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold">{val}</div>
                <div className="text-xs md:text-sm text-indigo-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-16 space-y-4 md:space-y-6">

        <BoardSection id="editor-in-chief" title="Editor-in-Chief" icon={<Award className="w-5 h-5" />} color="indigo"
          expanded={expandedSection === 'editor-in-chief'} onToggle={() => toggleSection('editor-in-chief')}>
          <MemberCardPro name="Dr. Karthick Raghunath. K. M." credentials="B.Tech., M.E., Ph.D., PDF (USA)" role="Editor-in-Chief"
            affiliation="Jain (Deemed-to-be University)" location="India" email="editor@toess.org" featured />
        </BoardSection>

        <BoardSection id="deputy-editors" title="Deputy Editors-in-Chief" icon={<Award className="w-5 h-5" />} color="purple"
          description="Set editorial policy, uphold academic standards, advise on content quality, attract submissions, represent journal reputation"
          expanded={expandedSection === 'deputy-editors'} onToggle={() => toggleSection('deputy-editors')}>
          <MemberCardPro name="Dr. Qin Xin" credentials="Professor" affiliation="University of the Faroe Islands" location="Denmark" email="qinx@setur.fo" role="Deputy Editor-in-Chief" />
          <MemberCardPro name="Dr. Dac-Nhuong Le" credentials="Ph.D., Dean & Professor" affiliation="Faculty of Information Technology, Haiphong University" location="Vietnam" email="Nhuongld@hus.edu.vn" role="Deputy Editor-in-Chief" />
          <MemberCardPro name="Dr. Basim Mohammad Fadel Alhadidi" credentials="Ph.D., Professor" affiliation="Al-Balqa Applied University" location="Jordan" email="b_hadidi@bau.edu.jo" role="Deputy Editor-in-Chief" />
          <MemberCardPro name="Dr. Thompson Stephan" credentials="Ph.D." affiliation="Thumbay College of Management and AI in Healthcare, Gulf Medical University" location="Ajman, UAE" email="dr.thompson.s@gmu.ac.ae" role="Deputy Editor-in-Chief" />
          <MemberCardPro name="Dr. Arvind. K. S." credentials="Ph.D., PDF (Singapore), Professor" affiliation="Jain (Deemed-to-be University)" location="India" email="ks.arvind@jainuniversity.ac.in" role="Deputy Editor-in-Chief" />
          <MemberCardPro name="Dr. Vinaytosh Mishra" credentials="Ph.D., Professor" affiliation="Thumbay College of Management and AI in Healthcare, Gulf Medical University" location="Ajman, UAE" email="dr.vinaytosh@gmu.ac.ae" role="Deputy Editor-in-Chief" />
          <MemberCardPro name="Dr. Balajee Alphonse" credentials="Ph.D., Program Coordinator & Professor" affiliation="Jain (Deemed-to-be University)" location="India" email="balajee.a@jainuniversity.ac.in" role="Deputy Editor-in-Chief" />
          <MemberCardPro name="Dr. Chandrasekar. V" credentials="Ph.D., PDF (USA), Program Head & Professor – AI & ML" affiliation="Jain (Deemed-to-be University)" location="India" email="chandrasekar.v@jainuniversity.ac.in" role="Deputy Editor-in-Chief" />
        </BoardSection>

        <BoardSection id="associate-editors" title="Associate Editors" icon={<Users className="w-5 h-5" />} color="blue"
          description="Manage manuscript assignments, oversee peer review process, recommend editorial decisions"
          expanded={expandedSection === 'associate-editors'} onToggle={() => toggleSection('associate-editors')}>
          <MemberCardPro name="Mr. Shanmugaraj" credentials="AI Researcher" affiliation="Flinders University, Adelaide" location="Australia" email="mada0090@fliders.edu.au" role="Associate Editor" />
          <MemberCardPro name="Dr. Rajan John" credentials="Ph.D., Professor" affiliation="Department of Computer Science, Jazan University" location="Saudi Arabia" email="rsubbaiah@jazanu.edu.sa" role="Associate Editor" />
          <MemberCardPro name="Dr. Nagarajan. S." credentials="Professor" affiliation="Department of Mechanical and Industrial Engineering, Bahir Dar University" location="Bahir Dar, Ethiopia" email="drnagarajans@bdu.edu.et" role="Associate Editor" />
          <MemberCardPro name="Prof. Ravi Lanke" credentials="M.Tech., Chief Technical Officer (CTO)" affiliation="Lumbini Technologies" location="Vijayawada, India" email="ravikumarlanke@lumbinitechnologies.com" role="Associate Editor" />
          <MemberCardPro name="Dr. Durga Indira. N." credentials="Ph.D., PDF, Professor" affiliation="Department of Computer Science, ACE" location="India" email="durgaindira@acsce.edu.in" role="Associate Editor" />
          <MemberCardPro name="Dr. Venkatesh. K" credentials="Ph.D., Professor" affiliation="SASTRA Deemed University" location="India" email="havevenkat@src.sastra.edu" role="Associate Editor" />
          <MemberCardPro name="Dr. Shantha Kumar. D" credentials="Ph.D., Professor" affiliation="Saveetha University" location="India" email="Santhakumard.sse@savetha.com" role="Associate Editor" />
          <MemberCardPro name="Dr. Vanitha S." credentials="Ph.D., Professor" affiliation="PES University" location="Bangalore, India" email="svanitha@pes.edu" role="Associate Editor" />
        </BoardSection>

        <BoardSection id="advisory" title="Advisory Committee" icon={<Shield className="w-5 h-5" />} color="emerald"
          description="Define journal vision, scope, mission, strategic direction, long-term sustainability planning, institutional partnerships"
          expanded={expandedSection === 'advisory'} onToggle={() => toggleSection('advisory')}>
          <MemberCardPro name="Ms. Giriyappagari Naga Sowmya" credentials="Data Engineer" affiliation="SARGAD" location="USA" />
          <MemberCardPro name="Mrs. Latha A" credentials="TL & Layout Manager" affiliation="Eximietas Design" location="India" />
          <MemberCardPro name="Mr. Veeramachaneni Dinesh" credentials="Senior Project Manager" affiliation="Xavient Technologies (TELUS)" location="India" />
          <MemberCardPro name="Mr. Yashraj M." credentials="Managing Director" affiliation="LUMBINI Technologies" location="USA" />
          <MemberCardPro name="Mr. Ramesh Chigurupati" credentials="ETL Analyst" affiliation="DataPro" location="USA" />
          <MemberCardPro name="Mrs. Sathya. J. S." affiliation="Wipro Technologies" location="USA" />
          <MemberCardPro name="Mrs. Anisha Mullamuri" affiliation="CloudPay" location="United Kingdom" />
          <MemberCardPro name="Mr. Siddhartha Reddem" credentials="Senior Manager" affiliation="Demandbase" location="India" />
          <MemberCardPro name="Dr. Sujeet S. Jagtap" credentials="Assistant Professor" affiliation="School of Computer Science and Engineering, FET, JAIN (Deemed-to-be University), Bangalore" location="India" email="sujeet.sj@jainuniversity.ac.in" />
        </BoardSection>

        <BoardSection id="section-editors" title="Section Editors Committee" icon={<Briefcase className="w-5 h-5" />} color="amber"
          description="Handle submissions within subject areas, ensure topical relevance and reviewer selection"
          expanded={expandedSection === 'section-editors'} onToggle={() => toggleSection('section-editors')}>
          <MemberCardPro name="Dr. Manikandan. V" credentials="Ph.D., Professor – Cloud Technology & Mobile Application" affiliation="Jain (Deemed-to-be University)" location="India" email="v.manikandan@jainuniversity.ac.in" />
          <MemberCardPro name="Dr. Vairavel. C" credentials="Ph.D., Professor – AIML" affiliation="Jain (Deemed-to-be University)" location="India" email="c.vairavel@jainuniversity.ac.in" />
        </BoardSection>

        <BoardSection id="copyediting" title="Copyediting & Proofreading" icon={<Briefcase className="w-5 h-5" />} color="rose"
          expanded={expandedSection === 'copyediting'} onToggle={() => toggleSection('copyediting')}>
          <MemberCardPro name="Dr. Shanmugavalli. V" credentials="Ph.D., Senior Assistant Professor" affiliation="MAHE" location="Bangalore, India" email="shanmugavalli.v@manipal.edu" />
          <MemberCardPro name="Dr. Umamaheswaran. S." credentials="Ph.D., Professor" affiliation="New Horizon College of Engineering (NHCE)" location="Bangalore, India" email="dr.umamaheswaran.nhce@newhorizonindia.edu" />
        </BoardSection>

        <BoardSection id="digital-it" title="Digital Publishing & IT" icon={<Briefcase className="w-5 h-5" />} color="cyan"
          description="Maintain website functionality, manage submission systems, cybersecurity, hosting, technical troubleshooting, digital workflow"
          expanded={expandedSection === 'digital-it'} onToggle={() => toggleSection('digital-it')}>
          <MemberCardPro name="Mr. Nikhil Krishna Sathvik" location="India" />
        </BoardSection>

        <BoardSection id="marketing" title="Marketing & Communications" icon={<Briefcase className="w-5 h-5" />} color="pink"
          description="Develop promotion strategies, newsletters, branding, press releases"
          expanded={expandedSection === 'marketing'} onToggle={() => toggleSection('marketing')}>
          <MemberCardPro name="Vinnie Katari" affiliation="Crown Equipment Corporation Pty Ltd." location="Australia" email="vinnie.katari@crown.com" />
        </BoardSection>

        <BoardSection id="legal" title="Legal & Compliance" icon={<Briefcase className="w-5 h-5" />} color="red"
          description="Handle contracts, copyright policies, licensing, regulatory compliance"
          expanded={expandedSection === 'legal'} onToggle={() => toggleSection('legal')}>
          <MemberCardPro name="Mr. Srinivas Chakravarthy Maganti" credentials="Managing Director" affiliation="LUMBINI Technologies" location="USA" />
          <MemberCardPro name="Mr. Nagarajan Dasam" credentials="Senior Architect – Quality Engineer" affiliation="QualiZeal" location="India" />
          <MemberCardPro name="Mr. Shyam Sandeep Dunnala" credentials="Senior Software Engineer" affiliation="ValueLabs" location="India" />
        </BoardSection>

        <BoardSection id="privacy" title="Data Protection & Privacy" icon={<Briefcase className="w-5 h-5" />} color="violet"
          description="Ensure data compliance, manage author/reviewer data security"
          expanded={expandedSection === 'privacy'} onToggle={() => toggleSection('privacy')}>
          <MemberCardPro name="Ms. Giriyappagari Naga Sowmya" credentials="Data Engineer" affiliation="SARGAD" location="USA" />
          <MemberCardPro name="Mr. Velicheti Sree Harsha" credentials="GenAI Engineer" affiliation="Datasmith AI" location="India" />
        </BoardSection>

        <BoardSection id="special-issues" title="Special Issues Committee" icon={<Briefcase className="w-5 h-5" />} color="teal"
          description="Plan themed issues, invite guest editors, coordinate special calls for papers"
          expanded={expandedSection === 'special-issues'} onToggle={() => toggleSection('special-issues')}>
          <MemberCardPro name="Mrs. Meena. A." credentials="Team Lead" affiliation="ACCENTURE" location="India" />
          <MemberCardPro name="Mrs. Indhumathi J." credentials="B.Tech., M.E." location="India" />
        </BoardSection>

        <BoardSection id="finance" title="Finance & Budget" icon={<Briefcase className="w-5 h-5" />} color="orange"
          description="Budget planning, expense tracking, financial reporting, resource allocation"
          expanded={expandedSection === 'finance'} onToggle={() => toggleSection('finance')}>
          <MemberCardPro name="Priya C" credentials="B.Tech., M.E." location="India" />
          <MemberCardPro name="Dr. Durga Indira. N." credentials="Ph.D., PDF" location="India" />
        </BoardSection>

      </div>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-16 mt-8 md:mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Join Our Editorial Team</h2>
          <p className="text-base md:text-lg text-indigo-100 mb-6 md:mb-8">
            We're always looking for qualified experts to join our editorial board
          </p>
          <button className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-sm md:text-base">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── Board Section ────────────────────────────────────────────────────────────
function BoardSection({ id, title, icon, color, description, children, expanded, onToggle }) {
  const colorMap = {
    indigo:  'from-indigo-500 to-indigo-600',
    purple:  'from-purple-500 to-purple-600',
    blue:    'from-blue-500 to-blue-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber:   'from-amber-500 to-amber-600',
    rose:    'from-rose-500 to-rose-600',
    cyan:    'from-cyan-500 to-cyan-600',
    pink:    'from-pink-500 to-pink-600',
    red:     'from-red-500 to-red-600',
    violet:  'from-violet-500 to-violet-600',
    teal:    'from-teal-500 to-teal-600',
    orange:  'from-orange-500 to-orange-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header / Toggle button */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 sm:px-6 py-4 md:py-5 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorMap[color]} text-white shadow-md flex-shrink-0`}>
            {icon}
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">{title}</h2>
            {description && (
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-snug line-clamp-2">{description}</p>
            )}
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Collapsible content */}
      {expanded && (
        <div className="border-t border-gray-100 divide-y divide-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Member Card — full-width horizontal row ──────────────────────────────────
function MemberCardPro({ name, credentials, affiliation, location, email, role, featured }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4
      ${featured ? 'bg-gradient-to-r from-indigo-50 to-white' : 'bg-white hover:bg-gray-50'}
      transition-colors`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm
          ${featured ? 'bg-gradient-to-br from-indigo-500 to-purple-500' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
          {initials}
        </div>
      </div>

      {/* Name + credentials */}
      <div className="flex-shrink-0 sm:w-56 md:w-64 min-w-0">
        <p className="font-semibold text-gray-900 text-sm md:text-base leading-snug">{name}</p>
        {role && <p className="text-xs font-medium text-indigo-600 mt-0.5">{role}</p>}
        {credentials && <p className="text-xs text-gray-500 mt-0.5 leading-snug">{credentials}</p>}
      </div>

      {/* Affiliation + location + email */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {/* Row 1: affiliation + location */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {affiliation && (
            <div className="flex items-start gap-1.5 text-xs text-gray-600 min-w-0">
              <Building2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-400" />
              <span className="leading-snug">{affiliation}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600 flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
              <span className="font-semibold">{location}</span>
            </div>
          )}
        </div>
        {/* Row 2: email on its own line */}
        {email && (
          <div className="flex items-center gap-1.5 text-xs">
            <Mail className="w-3.5 h-3.5 flex-shrink-0 text-indigo-400" />
            <a href={`mailto:${email}`} className="text-indigo-600 hover:underline">{email}</a>
          </div>
        )}
      </div>

      {/* Featured badge */}
      {featured && (
        <div className="flex-shrink-0">
          <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            Featured
          </span>
        </div>
      )}
    </div>
  );
}