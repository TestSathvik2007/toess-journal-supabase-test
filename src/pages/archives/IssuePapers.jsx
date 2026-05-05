import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import {
  Archive, BookOpen, FileText, Users, Calendar, Eye, Quote,
  ExternalLink, ChevronLeft, ChevronRight, Layers,
} from "lucide-react";
import SidebarLayout from "../../layouts/SidebarLayout";

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

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: "Abstract",   href: "#" },
                { label: "Full Text",  href: paper.file_url },
                { label: "References", href: null },
                { label: "PDF",        href: paper.file_url },
                { label: "EPUB",       href: null },
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

          {/* Stats — sm+ */}
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── IssuePapers ── */
export default function IssuePapers() {
  const { volume, issue } = useParams();
  const vol = Number(volume);
  const iss = Number(issue);

  const [papers,    setPapers]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [allIssues, setAllIssues] = useState([]);

  useEffect(() => { loadAll(); }, [volume, issue]);

  const loadAll = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("papers")
      .select("*")
      .eq("status", "published")
      .eq("volume", vol)
      .eq("issue",  iss);

    if (error) console.error("IssuePapers error:", error);
    setPapers(data || []);

    const { data: allData } = await supabase
      .from("papers")
      .select("volume, issue")
      .eq("status", "published");

    const seen  = new Set();
    const pairs = [];
    (allData || []).forEach((p) => {
      const key = `${p.volume}-${p.issue}`;
      if (!seen.has(key)) { seen.add(key); pairs.push({ volume: Number(p.volume), issue: Number(p.issue) }); }
    });
    pairs.sort((a, b) => a.volume !== b.volume ? a.volume - b.volume : a.issue - b.issue);
    setAllIssues(pairs);
    setLoading(false);
  };

  const currentIdx = allIssues.findIndex(p => p.volume === vol && p.issue === iss);
  const prevIssue  = currentIdx > 0 ? allIssues[currentIdx - 1] : null;
  const nextIssue  = currentIdx < allIssues.length - 1 ? allIssues[currentIdx + 1] : null;

  const publishedDate  = papers[0]?.updated_at
    ? new Date(papers[0].updated_at).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    : null;
  const totalViews     = papers.reduce((s, p) => s + (p.views || 0), 0);
  const totalCitations = papers.reduce((s, p) => s + (p.citations || 0), 0);

  return (
    <SidebarLayout
      title={`Volume ${volume}, Issue ${issue}`}
      subtitle="Transactions on Evolutionary Smart Systems"
      icon={Archive}
    >
      <div className="space-y-8 sm:space-y-10">

        {/* Issue header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-slate-500 mb-5">
            <Link to="/" className="text-indigo-600 hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link to="/archives" className="text-indigo-600 hover:underline">Archives</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link to="/archives/volumes" className="text-indigo-600 hover:underline">All Volumes</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-slate-700 font-medium">Vol {volume}, Issue {issue}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Journal Archives</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                Volume {volume}, Issue {issue}
              </h2>
              {!loading && (
                <p className="text-slate-500 text-sm">
                  {papers.length} article{papers.length !== 1 ? "s" : ""}
                  {publishedDate ? ` · Published ${publishedDate}` : ""}
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
              "We are pleased to present Volume {volume}, Issue {issue} of{" "}
              <span className="font-semibold not-italic">Transactions on Evolutionary Smart Systems</span>,
              featuring cutting-edge research in evolutionary algorithms, swarm intelligence,
              and AI-driven optimization."
            </p>
            <p className="text-sm text-slate-500 mt-3">— Editorial Board, ToESS</p>
          </div>
        )}

        {/* Prev / Next nav */}
        {allIssues.length > 1 && (
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {prevIssue ? (
              <Link to={`/archives/issue/${prevIssue.volume}/${prevIssue.issue}`}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-indigo-200 text-indigo-700 font-medium text-xs sm:text-sm rounded-lg hover:bg-indigo-50 hover:border-indigo-400 transition-all">
                <ChevronLeft className="w-4 h-4 flex-shrink-0" />
                <span className="hidden xs:inline">Vol {prevIssue.volume},</span> Issue {prevIssue.issue}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-50 border border-slate-200 text-slate-400 font-medium text-xs sm:text-sm rounded-lg cursor-default">
                <ChevronLeft className="w-4 h-4" /> Prev
              </span>
            )}

            <Link to="/archives/volumes"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-white border border-indigo-200 text-indigo-700 font-medium text-xs sm:text-sm rounded-lg hover:bg-indigo-50 hover:border-indigo-400 transition-all">
              <Archive className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Volumes</span>
              <span className="sm:hidden">Volumes</span>
            </Link>

            {nextIssue ? (
              <Link to={`/archives/issue/${nextIssue.volume}/${nextIssue.issue}`}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-indigo-200 text-indigo-700 font-medium text-xs sm:text-sm rounded-lg hover:bg-indigo-50 hover:border-indigo-400 transition-all">
                <span className="hidden xs:inline">Vol {nextIssue.volume},</span> Issue {nextIssue.issue}
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-50 border border-slate-200 text-slate-400 font-medium text-xs sm:text-sm rounded-lg cursor-default">
                Next <ChevronRight className="w-4 h-4" />
              </span>
            )}
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
              <p className="text-slate-500 font-medium">No articles found for this issue.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {papers.map((paper, index) => (
                <ArticleCard key={paper.id} paper={paper} index={index} />
              ))}
            </div>
          )}
        </div>

      </div>
    </SidebarLayout>
  );
}