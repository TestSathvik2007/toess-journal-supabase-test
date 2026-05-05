import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import {
  BookOpen, FileText, Users, Calendar, Eye, Quote,
  ExternalLink, ChevronRight, Layers,
} from "lucide-react";
import SidebarLayout from "../layouts/SidebarLayout";

/* ── ArticleCard ── */
function ArticleCard({ paper, index }) {
  const publishedDate = paper.updated_at
    ? new Date(paper.updated_at).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
      })
    : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">

          {/* Index */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-indigo-500 group-hover:to-blue-500 transition-all duration-300">
            <span className="text-xs sm:text-sm font-bold text-indigo-600 group-hover:text-white transition-colors">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded mb-2">
              Article
            </span>

            <a
              href={paper.file_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug mb-2 break-words"
            >
              {paper.title}
              {paper.file_url && <ExternalLink className="inline-block w-3.5 h-3.5 ml-1.5 opacity-50" />}
            </a>

            {paper.authors && (
              <div className="flex items-start gap-1.5 text-sm text-slate-600 mb-2">
                <Users className="w-3.5 h-3.5 flex-shrink-0 text-slate-400 mt-0.5" />
                <span className="line-clamp-2">{paper.authors}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-3">
              {paper.id && (
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3 flex-shrink-0" />
                  Article: {String(paper.id).slice(0, 8).replace(/-/g, "")}
                </span>
              )}
              {publishedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  {publishedDate}
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: "Abstract",   href: "#" },
                { label: "Full Text",  href: paper.file_url },
                { label: "References", href: null },
                { label: "PDF",        href: paper.file_url },
              ].map(({ label, href }, i, arr) => (
                <span key={label} className="flex items-center gap-1.5">
                  {href
                    ? <a href={href} target={href !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">{label}</a>
                    : <span className="text-xs text-slate-400">{label}</span>
                  }
                  {i < arr.length - 1 && <span className="text-slate-300 text-xs">|</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Stats — sm+ only */}
          <div className="hidden sm:flex flex-col items-end gap-3 flex-shrink-0 pl-4 border-l border-slate-100">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-lg font-bold text-slate-800 leading-none">{paper.views || 0}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Views</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <Quote className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-lg font-bold text-slate-800 leading-none">{paper.citations || 0}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Citations</p>
            </div>
          </div>
        </div>

        {/* Stats row for xs */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 sm:hidden">
          <span className="flex items-center gap-1 text-xs text-slate-600">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <strong>{paper.views || 0}</strong>&nbsp;Views
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-600">
            <Quote className="w-3.5 h-3.5 text-slate-400" />
            <strong>{paper.citations || 0}</strong>&nbsp;Citations
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Skeleton ── */
function Skeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 animate-pulse">
          <div className="flex gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-3 bg-slate-200 rounded w-14" />
              <div className="h-5 bg-slate-200 rounded w-4/5" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-3 bg-slate-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── CurrentIssue ── */
export default function CurrentIssue() {
  const [papers,    setPapers]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [issueInfo, setIssueInfo] = useState({ volume: null, issue: null });

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("papers")
      .select("*")
      .eq("status", "published")
      .order("volume", { ascending: false })
      .order("issue",  { ascending: false });

    const all = data || [];
    if (all.length > 0) {
      const latestVol = all[0].volume;
      const latestIss = all[0].issue;
      const filtered  = all.filter(p => p.volume === latestVol && p.issue === latestIss);
      setIssueInfo({ volume: latestVol, issue: latestIss });
      setPapers(filtered);
    }
    setLoading(false);
  };

  const totalViews     = papers.reduce((s, p) => s + (p.views || 0), 0);
  const totalCitations = papers.reduce((s, p) => s + (p.citations || 0), 0);
  const publishedDate  = papers[0]?.updated_at
    ? new Date(papers[0].updated_at).toLocaleDateString("en-GB", {
        day: "2-digit", month: "long", year: "numeric",
      })
    : null;

  return (
    <SidebarLayout
      title="Current Issue"
      subtitle="Transactions on Evolutionary Smart Systems"
      icon={BookOpen}
    >
      <div className="space-y-8 sm:space-y-10">

        {/* Issue header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                Latest Issue
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                {loading ? "Loading…" : issueInfo.volume ? `Volume ${issueInfo.volume}, Issue ${issueInfo.issue}` : "No Issues Yet"}
              </h2>
              {publishedDate && (
                <p className="text-slate-500 text-sm flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  Published {publishedDate}
                </p>
              )}
            </div>

            {!loading && papers.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {[
                  { label: "Articles",  value: papers.length,  icon: FileText },
                  { label: "Views",     value: totalViews,     icon: Eye },
                  { label: "Citations", value: totalCitations, icon: Quote },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="text-center bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl px-4 py-3 min-w-[72px]">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Icon className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="text-xl sm:text-2xl font-bold text-slate-900">{value}</span>
                    </div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-100">
            {["Open Access", "Peer-Reviewed", "DOI Assigned"].map((label) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <span className="text-emerald-500">✔</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Editor's note */}
        {!loading && papers.length > 0 && (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              Editor's Note
            </h3>
            <p className="text-slate-700 leading-relaxed italic text-sm sm:text-base">
              "We are pleased to present Volume {issueInfo.volume}, Issue {issueInfo.issue} of{" "}
              <span className="font-semibold not-italic">Transactions on Evolutionary Smart Systems</span>,
              featuring cutting-edge research in evolutionary algorithms, swarm intelligence,
              and AI-driven optimization."
            </p>
            <p className="text-sm text-slate-500 mt-3">— Editorial Board, ToESS</p>
          </div>
        )}

        {/* Articles */}
        <div>
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Articles in This Issue</h2>
            {!loading && papers.length > 0 && (
              <span className="text-sm text-slate-500">{papers.length} article{papers.length !== 1 ? "s" : ""}</span>
            )}
          </div>

          {loading ? <Skeleton /> : papers.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-10 sm:p-12 text-center">
              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No published articles yet.</p>
              <p className="text-slate-400 text-sm mt-1">Check back soon for the latest research.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {papers.map((paper, index) => (
                <ArticleCard key={paper.id} paper={paper} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        {!loading && papers.length > 0 && (
          <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Explore Past Issues</h2>
            <p className="text-blue-100 mb-5 max-w-xl mx-auto text-sm sm:text-base">
              Browse the complete archive of published research across all volumes and issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/archives/volumes" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
                Browse Archives <ChevronRight className="w-4 h-4" />
              </a>
              <a href="/submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all border-2 border-white/30 hover:border-white/50">
                Submit Your Paper
              </a>
            </div>
          </div>
        )}

      </div>
    </SidebarLayout>
  );
}