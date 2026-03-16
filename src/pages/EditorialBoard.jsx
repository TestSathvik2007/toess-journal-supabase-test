import React, { useState } from 'react';
import { Users, Award, Shield, Briefcase, ChevronDown, Mail, MapPin, Building2 } from 'lucide-react';

export default function EditorialBoard() {
  const [expandedSection, setExpandedSection] = useState('editor-in-chief');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
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
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold">40+</div>
              <div className="text-xs md:text-sm text-indigo-200 mt-1">Board Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold">15+</div>
              <div className="text-xs md:text-sm text-indigo-200 mt-1">Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold">12</div>
              <div className="text-xs md:text-sm text-indigo-200 mt-1">Committees</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold">100%</div>
              <div className="text-xs md:text-sm text-indigo-200 mt-1">Excellence</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-16 space-y-4 md:space-y-8">

        {/* Editor-in-Chief */}
        <BoardSection
          id="editor-in-chief"
          title="Editor-in-Chief"
          icon={<Award className="w-6 h-6" />}
          color="indigo"
          expanded={expandedSection === 'editor-in-chief'}
          onToggle={() => toggleSection('editor-in-chief')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <MemberCardPro
              name="Dr. Karthick Raghunath. K. M."
              credentials="B.Tech., M.E., Ph.D., PDF (USA)"
              role="Editor-in-Chief"
              affiliation="Jain (Deemed-to-be University)"
              location="India"
              email="editor@toess.org"
              featured={true}
            />
          </div>
        </BoardSection>

        {/* Deputy Editors-in-Chief */}
        <BoardSection
          id="deputy-editors"
          title="Deputy Editors-in-Chief"
          icon={<Award className="w-6 h-6" />}
          color="purple"
          description="Set editorial policy, uphold academic standards, advise on content quality, attract submissions, represent journal reputation"
          expanded={expandedSection === 'deputy-editors'}
          onToggle={() => toggleSection('deputy-editors')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MemberCardPro name="Dr. Qin Xin" credentials="Professor" affiliation="University of the Faroe Islands" location="Denmark" email="qinx@setur.fo" role="Deputy Editor-in-Chief" />
            <MemberCardPro name="Dr. Dac-Nhuong Le" credentials="Ph.D., Dean & Professor" affiliation="Faculty of Information Technology, Haiphong University" location="Vietnam" email="Nhuongld@hus.edu.vn" role="Deputy Editor-in-Chief" />
            <MemberCardPro name="Dr. Basim Mohammad Fadel Alhadidi" credentials="Ph.D., Professor" affiliation="Al-Balqa Applied University" location="Jordan" email="b_hadidi@bau.edu.jo" role="Deputy Editor-in-Chief" />
            <MemberCardPro name="Dr. Thompson Stephan" credentials="Ph.D." affiliation="Thumbay College of Management and AI in Healthcare, Gulf Medical University" location="Ajman, UAE" email="dr.thompson.s@gmu.ac.ae" role="Deputy Editor-in-Chief" />
            <MemberCardPro name="Dr. Arvind. K. S." credentials="Ph.D., PDF (Singapore), Professor" affiliation="Jain (Deemed-to-be University)" location="India" email="ks.arvind@jainuniversity.ac.in" role="Deputy Editor-in-Chief" />
            <MemberCardPro name="Dr. Vinaytosh Mishra" credentials="Ph.D., Professor" affiliation="Thumbay College of Management and AI in Healthcare, Gulf Medical University" location="Ajman, UAE" email="dr.vinaytosh@gmu.ac.ae" role="Deputy Editor-in-Chief" />
            <MemberCardPro name="Dr. Balajee Alphonse" credentials="Ph.D., Program Coordinator & Professor" affiliation="Jain (Deemed-to-be University)" location="India" email="balajee.a@jainuniversity.ac.in" role="Deputy Editor-in-Chief" />
            <MemberCardPro name="Dr. Chandrasekar. V" credentials="Ph.D., PDF (USA), Program Head & Professor – AI & ML" affiliation="Jain (Deemed-to-be University)" location="India" email="chandrasekar.v@jainuniversity.ac.in" role="Deputy Editor-in-Chief" />
          </div>
        </BoardSection>

        {/* Associate Editors */}
        <BoardSection
          id="associate-editors"
          title="Associate Editors"
          icon={<Users className="w-6 h-6" />}
          color="blue"
          description="Manage manuscript assignments, oversee peer review process, recommend editorial decisions"
          expanded={expandedSection === 'associate-editors'}
          onToggle={() => toggleSection('associate-editors')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <MemberCardPro name="Mr. Shanmugaraj" credentials="AI Researcher" affiliation="Flinders University, Adelaide" location="Australia" email="mada0090@fliders.edu.au" role="Associate Editor" />
            <MemberCardPro name="Dr. Rajan John" credentials="Ph.D., Professor" affiliation="Department of Computer Science, Jazan University" location="Saudi Arabia" email="rsubbaiah@jazanu.edu.sa" role="Associate Editor" />
            <MemberCardPro name="Dr. Nagarajan. S." credentials="Professor" affiliation="Department of Mechanical and Industrial Engineering, Bahir Dar University" location="Bahir Dar, Ethiopia" email="drnagarajans@bdu.edu.et" role="Associate Editor" />
            <MemberCardPro name="Prof. Ravi Lanke" credentials="M.Tech., Chief Technical Officer (CTO)" affiliation="Lumbini Technologies" location="Vijayawada, India" email="ravikumarlanke@lumbinitechnologies.com" role="Associate Editor" />
            <MemberCardPro name="Dr. Durga Indira. N." credentials="Ph.D., PDF, Professor" affiliation="Department of Computer Science, ACE" location="India" email="durgaindira@acsce.edu.in" role="Associate Editor" />
            <MemberCardPro name="Dr. Venkatesh. K" credentials="Ph.D., Professor" affiliation="SASTRA Deemed University" location="India" email="havevenkat@src.sastra.edu" role="Associate Editor" />
            <MemberCardPro name="Dr. Shantha Kumar. D" credentials="Ph.D., Professor" affiliation="Saveetha University" location="India" email="Santhakumard.sse@savetha.com" role="Associate Editor" />
            <MemberCardPro name="Dr. Vanitha S." credentials="Ph.D., Professor" affiliation="PES University" location="Bangalore, India" email="svanitha@pes.edu" role="Associate Editor" />
          </div>
        </BoardSection>

        {/* Advisory Committee */}
        <BoardSection
          id="advisory"
          title="Advisory Committee"
          icon={<Shield className="w-6 h-6" />}
          color="emerald"
          description="Define journal vision, scope, mission, strategic direction, long-term sustainability planning, institutional partnerships"
          expanded={expandedSection === 'advisory'}
          onToggle={() => toggleSection('advisory')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MemberCardPro name="Ms. Giriyappagari Naga Sowmya" credentials="Data Engineer" affiliation="SARGAD" location="USA" />
            <MemberCardPro name="Mrs. Latha A" credentials="TL & Layout Manager" affiliation="Eximietas Design" location="India" />
            <MemberCardPro name="Mr. Veeramachaneni Dinesh" credentials="Senior Project Manager" affiliation="Xavient Technologies (TELUS)" location="India" />
            <MemberCardPro name="Mr. Yashraj M." credentials="Managing Director" affiliation="LUMBINI Technologies" location="USA" />
            <MemberCardPro name="Mr. Ramesh Chigurupati" credentials="ETL Analyst" affiliation="DataPro" location="USA" />
            <MemberCardPro name="Mrs. Sathya. J. S." affiliation="Wipro Technologies" location="USA" />
            <MemberCardPro name="Mrs. Anisha Mullamuri" affiliation="CloudPay" location="United Kingdom" />
            <MemberCardPro name="Mr. Siddhartha Reddem" credentials="Senior Manager" affiliation="Demandbase" location="India" />
          </div>
        </BoardSection>

        {/* Section Editors */}
        <BoardSection
          id="section-editors"
          title="Section Editors Committee"
          icon={<Briefcase className="w-6 h-6" />}
          color="amber"
          description="Handle submissions within subject areas, ensure topical relevance and reviewer selection"
          expanded={expandedSection === 'section-editors'}
          onToggle={() => toggleSection('section-editors')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MemberCardPro name="Dr. Manikandan. V" credentials="Ph.D., Professor – Cloud Technology & Mobile Application" affiliation="Jain (Deemed-to-be University)" location="India" email="v.manikandan@jainuniversity.ac.in" />
            <MemberCardPro name="Dr. Vairavel. C" credentials="Ph.D., Professor – AIML" affiliation="Jain (Deemed-to-be University)" location="India" email="c.vairavel@jainuniversity.ac.in" />
          </div>
        </BoardSection>

        {/* Copyediting */}
        <BoardSection
          id="copyediting"
          title="Copyediting & Proofreading"
          icon={<Briefcase className="w-6 h-6" />}
          color="rose"
          expanded={expandedSection === 'copyediting'}
          onToggle={() => toggleSection('copyediting')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MemberCardPro name="Dr. Shanmugavalli. V" credentials="Ph.D., Senior Assistant Professor" affiliation="MAHE" location="Bangalore, India" email="shanmugavalli.v@manipal.edu" />
            <MemberCardPro name="Dr. Umamaheswaran. S." credentials="Ph.D., Professor" affiliation="New Horizon College of Engineering (NHCE)" location="Bangalore, India" email="dr.umamaheswaran.nhce@newhorizonindia.edu" />
          </div>
        </BoardSection>

        {/* Digital IT */}
        <BoardSection
          id="digital-it"
          title="Digital Publishing & IT"
          icon={<Briefcase className="w-6 h-6" />}
          color="cyan"
          description="Maintain website functionality, manage submission systems, cybersecurity, hosting, technical troubleshooting, digital workflow"
          expanded={expandedSection === 'digital-it'}
          onToggle={() => toggleSection('digital-it')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MemberCardPro name="Mr. Nikhil Krishna Sathvik" location="India" />
          </div>
        </BoardSection>

        {/* Marketing */}
        <BoardSection
          id="marketing"
          title="Marketing & Communications"
          icon={<Briefcase className="w-6 h-6" />}
          color="pink"
          description="Develop promotion strategies, newsletters, branding, press releases"
          expanded={expandedSection === 'marketing'}
          onToggle={() => toggleSection('marketing')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MemberCardPro name="Vinnie Katari" affiliation="Crown Equipment Corporation Pty Ltd." location="Australia" email="vinnie.katari@crown.com" />
          </div>
        </BoardSection>

        {/* Legal */}
        <BoardSection
          id="legal"
          title="Legal & Compliance"
          icon={<Briefcase className="w-6 h-6" />}
          color="red"
          description="Handle contracts, copyright policies, licensing, regulatory compliance"
          expanded={expandedSection === 'legal'}
          onToggle={() => toggleSection('legal')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MemberCardPro name="Mr. Srinivas Chakravarthy Maganti" credentials="Managing Director" affiliation="LUMBINI Technologies" location="USA" />
            <MemberCardPro name="Mr. Nagarajan Dasam" credentials="Senior Architect – Quality Engineer" affiliation="QualiZeal" location="India" />
            <MemberCardPro name="Mr. Shyam Sandeep Dunnala" credentials="Senior Software Engineer" affiliation="ValueLabs" location="India" />
          </div>
        </BoardSection>

        {/* Privacy */}
        <BoardSection
          id="privacy"
          title="Data Protection & Privacy"
          icon={<Briefcase className="w-6 h-6" />}
          color="violet"
          description="Ensure data compliance, manage author/reviewer data security"
          expanded={expandedSection === 'privacy'}
          onToggle={() => toggleSection('privacy')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MemberCardPro name="Ms. Giriyappagari Naga Sowmya" credentials="Data Engineer" affiliation="SARGAD" location="USA" />
            <MemberCardPro name="Mr. Velicheti Sree Harsha" credentials="GenAI Engineer" affiliation="Datasmith AI" location="India" />
          </div>
        </BoardSection>

        {/* Special Issues */}
        <BoardSection
          id="special-issues"
          title="Special Issues Committee"
          icon={<Briefcase className="w-6 h-6" />}
          color="teal"
          description="Plan themed issues, invite guest editors, coordinate special calls for papers"
          expanded={expandedSection === 'special-issues'}
          onToggle={() => toggleSection('special-issues')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MemberCardPro name="Mrs. Meena. A." credentials="Team Lead" affiliation="ACCENTURE" location="India" />
            <MemberCardPro name="Mrs. Indhumathi J." credentials="B.Tech., M.E." location="India" />
          </div>
        </BoardSection>

        {/* Finance */}
        <BoardSection
          id="finance"
          title="Finance & Budget"
          icon={<Briefcase className="w-6 h-6" />}
          color="orange"
          description="Budget planning, expense tracking, financial reporting, resource allocation"
          expanded={expandedSection === 'finance'}
          onToggle={() => toggleSection('finance')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MemberCardPro name="Priya C" credentials="B.Tech., M.E." location="India" />
            <MemberCardPro name="Dr. Durga Indira. N." credentials="Ph.D., PDF" location="India" />
          </div>
        </BoardSection>

      </div>

      {/* CTA Section */}
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

function BoardSection({ id, title, icon, color, description, children, expanded, onToggle }) {
  const colorClasses = {
    indigo:  'from-indigo-500 to-indigo-600 border-indigo-200',
    purple:  'from-purple-500 to-purple-600 border-purple-200',
    blue:    'from-blue-500 to-blue-600 border-blue-200',
    emerald: 'from-emerald-500 to-emerald-600 border-emerald-200',
    amber:   'from-amber-500 to-amber-600 border-amber-200',
    rose:    'from-rose-500 to-rose-600 border-rose-200',
    cyan:    'from-cyan-500 to-cyan-600 border-cyan-200',
    pink:    'from-pink-500 to-pink-600 border-pink-200',
    red:     'from-red-500 to-red-600 border-red-200',
    violet:  'from-violet-500 to-violet-600 border-violet-200',
    teal:    'from-teal-500 to-teal-600 border-teal-200',
    orange:  'from-orange-500 to-orange-600 border-orange-200',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
          <div className={`p-2.5 md:p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-md flex-shrink-0`}>
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">{title}</h2>
            {description && <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-snug">{description}</p>}
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform flex-shrink-0 ml-2 ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="p-3 sm:p-4 md:p-6 pt-0 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}

function MemberCardPro({ name, credentials, affiliation, location, email, role, featured }) {
  return (
    <div className={`group relative bg-white rounded-xl border-2 ${featured ? 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-white' : 'border-gray-100'} p-4 md:p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300`}>
      {featured && (
        <div className="absolute -top-3 -right-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Featured
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 md:gap-4">
        <div className="flex-shrink-0">
          <div className={`w-11 h-11 md:w-14 md:h-14 rounded-full ${featured ? 'bg-gradient-to-br from-indigo-500 to-purple-500' : 'bg-gradient-to-br from-gray-400 to-gray-500'} flex items-center justify-center text-white text-base md:text-xl font-bold shadow-md`}>
            {name.charAt(0)}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors leading-tight text-sm md:text-base">
            {name}
          </h3>

          {role && (
            <p className="text-xs font-semibold text-indigo-600 mb-1.5">{role}</p>
          )}

          {credentials && (
            <p className="text-xs md:text-sm text-gray-600 mb-2 leading-snug">{credentials}</p>
          )}

          {affiliation && (
            <div className="flex items-start gap-1.5 text-xs text-gray-500 mb-1">
              <Building2 className="w-3 h-3 md:w-3.5 md:h-3.5 mt-0.5 flex-shrink-0" />
              <span className="leading-snug">{affiliation}</span>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}

          {email && (
            <div className="flex items-center gap-1.5 text-xs text-indigo-500 mt-1 min-w-0">
              <Mail className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
              <a href={`mailto:${email}`} className="hover:underline truncate block min-w-0">{email}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}