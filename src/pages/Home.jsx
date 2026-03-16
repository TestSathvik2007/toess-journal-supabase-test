import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";

export default function Home() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [minTimerDone, setMinTimerDone] = useState(false);

  const loading = !authReady || !minTimerDone;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    const timer = setTimeout(() => setMinTimerDone(true), 2000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white px-4">
        <div className="w-48 sm:w-64">
          <Lottie animationData={loadingAnimation} loop={true} speed={3} />
          <p className="text-center text-gray-600 mt-4 font-medium text-sm sm:text-base">
            Loading journal portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16">

          <div className="text-xs sm:text-sm mb-6 sm:mb-8 text-blue-200">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span>Transactions on Evolutionary Smart Systems</span>
          </div>

          <div className="flex flex-col items-center md:grid md:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr] gap-6 md:gap-8 md:items-start">

            <div className="bg-white rounded-lg shadow-xl overflow-hidden w-28 xs:w-32 sm:w-40 md:w-full flex-shrink-0">
              <img
                src="/journal-cover.jpeg"
                alt="Transactions on Evolutionary Smart Systems - Journal Cover"
                className="w-full h-auto object-cover block"
              />
            </div>

            <div className="w-full text-center md:text-left">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Transactions on Evolutionary Smart Systems
              </h1>

              <div className="mb-5 sm:mb-6">
                <div className="text-xs sm:text-sm text-blue-200 mb-2">Publishing model</div>
                <div className="inline-block bg-blue-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold text-sm sm:text-base">
                  Open access
                </div>
              </div>

              <div className="flex flex-col xs:flex-row flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  to="/submit"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg text-sm sm:text-base"
                >
                  Submit your manuscript
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                {!user && (
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition text-sm sm:text-base"
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-700">
            {[
              {
                label: "Peer Review Policy",
                to: "/peer-review",
                path: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                rule: true,
              },
              {
                label: "Publication Policy",
                to: "/publication-policy",
                path: "M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z",
                rule: true,
              },
              {
                label: "Editorial Board",
                to: "/editorial-board",
                path: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z",
                rule: false,
              },
              {
                label: "Copyright Policy",
                to: "/copyright-policy",
                path: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                rule: true,
              },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-1.5 sm:gap-2 hover:text-indigo-600 transition-colors group"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule={item.rule ? "evenodd" : undefined}
                    d={item.path}
                    clipRule={item.rule ? "evenodd" : undefined}
                  />
                </svg>
                <span className="font-medium group-hover:underline underline-offset-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-10 sm:py-14 lg:py-16 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">About the Journal</h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            Transactions on Evolutionary Smart Systems (ToESS) is a scholarly
            international journal dedicated to advancing research in
            evolutionary algorithms, artificial intelligence, adaptive systems,
            and intelligent computing. The journal aims to bridge theoretical
            foundations and practical applications through a rigorous
            peer-review process.The journal is issued bi-monthly to provide timely dissemination of research and scholarly work.
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            The primary aim of ToESS is to provide a high-quality platform for
            researchers, academicians, and industry professionals to publish
            innovative and impactful research in evolutionary and smart systems.
          </p>
        </div>
      </section>

      {/* Aims & Objectives */}
      <section className="py-10 sm:py-14 lg:py-16 bg-gray-50 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Aims & Objectives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { title: "Interdisciplinary Research", desc: "Promote innovative research across multiple disciplines" },
              { title: "Real-World Applications",   desc: "Encourage practical and industrial implementations" },
              { title: "Emerging Technologies",     desc: "Support cutting-edge research trends and methodologies" },
              { title: "Ethical Publishing",         desc: "Ensure transparent and ethical publication practices" },
            ].map((item, index) => (
              <div key={index} className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <section className="py-10 sm:py-14 lg:py-16 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Scope & Focus Areas</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              "Evolutionary Algorithms",
              "Artificial Intelligence",
              "Smart & Adaptive Systems",
              "Optimization Techniques",
              "Swarm Intelligence",
              "Nature-Inspired Computing",
              "Intelligent Decision Systems",
              "Smart Applications & IoT",
            ].map((item) => (
              <div key={item} className="bg-white p-3 sm:p-4 border-l-4 border-indigo-600 shadow-sm hover:shadow-md transition">
                <span className="font-medium text-gray-800 text-xs sm:text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Board */}
      <section className="py-10 sm:py-14 lg:py-16 bg-gray-50 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">Editorial Board</h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto">
            Our editorial board comprises distinguished researchers and
            academicians from leading institutions worldwide, ensuring the
            highest standards of peer review and academic excellence.
          </p>
          <Link
            to="/editorial-board"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg text-sm sm:text-base"
          >
            View Full Editorial Board
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Publication Process */}
      <section className="py-10 sm:py-14 lg:py-16 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Publication Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: "1", title: "Register & Verify Email", desc: "Create your account" },
              { step: "2", title: "Submit Manuscript",       desc: "Upload your research" },
              { step: "3", title: "Peer Review Process",     desc: "Expert evaluation" },
              { step: "4", title: "Publication with DOI",    desc: "Get published" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-indigo-600 text-white text-lg sm:text-2xl font-bold rounded-full mb-3 sm:mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-base leading-snug">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics & Policies */}
      <section className="py-10 sm:py-14 lg:py-16 bg-gray-50 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Publication Ethics & Policies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Peer Review",      desc: "Double-blind peer review by subject experts ensuring quality and rigor." },
              { title: "Plagiarism Check", desc: "All manuscripts are screened for originality using advanced tools." },
              { title: "COPE Compliance",  desc: "Ethical standards following COPE guidelines for academic publishing." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-4 sm:p-6 border-l-4 border-indigo-600 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call for Papers */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Call for Papers – Current Issue</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100">
            ToESS invites original research articles, review papers, and technical notes in all areas within the journal scope.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-blue-50 transition shadow-lg text-sm sm:text-base lg:text-lg"
          >
            Submit Your Manuscript
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}