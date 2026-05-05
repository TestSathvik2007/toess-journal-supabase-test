import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Link } from "react-router-dom";
import {
  FileText, Users, Calendar, Eye, Quote, ExternalLink,
  Search, ArrowUpDown, BookOpen, ChevronRight,
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

          {/* Index badge */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-indigo-500 group-hover:to-blue-500 transition-all duration-300">
            <span className="text-xs sm:text-sm font-bold text-indigo-600 group-hover:text-white transition-colors">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded mb-2">
              Article
            </span>

            {/* Title */}
            <a
              href={paper.file_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug mb-2 break-words"
            >
              {paper.title}
              {paper.file_url && <ExternalLink className="inline-block w-3.5 h-3.5 ml-1.5 opacity-50" />}
            </a>

            {/* Authors */}
            {paper.authors && (
              <div className="flex items-start gap-1.5 text-sm text-slate-600 mb-2">
                <Users className="w-3.5 h-3.5 flex-shrink-0 text-slate-400 mt-0.5" />
                <span className="line-clamp-2">{paper.authors}</span>
              </div>
            )}

            {/* Abstract snippet */}
            {paper.abstract && (
              <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">
                {paper.abstract}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-3">
              {paper.volume && paper.issue && (
                <Link
                  to={`/archives/issue/${paper.volume}/${paper.issue}`}
                  className="flex items-center gap-1 text-indigo-600 hover:underline font-medium"
                >
                  <BookOpen className="w-3 h-3 flex-shrink-0" />
                  Vol {paper.volume}, Issue {paper.issue}
                </Link>
              )}
              {publishedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  {publishedDate}
                </span>
              )}
              {paper.id && (
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3 flex-shrink-0" />
                  {String(paper.id).slice(0, 8).replace(/-/g, "")}
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
              <div className="h-3 bg-slate-200 rounded w-2/3" />
              <div className="h-3 bg-slate-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── LatestArticles ── */
export default function LatestArticles() {
  const [papers,  setPapers]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [sort,    setSort]    = useState("newest");

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("papers")
      .select("*")
      .eq("status", "published")
      .order("updated_at", { ascending: false })
      .limit(50);
    if (error) console.error("LatestArticles error:", error);
    setPapers(data || []);
    setLoading(false);
  };

  const filtered = papers
    .filter((p) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        p.title?.toLowerCase().includes(q) ||
        p.authors?.toLowerCase().includes(q) ||
        p.abstract?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.updated_at) - new Date(a.updated_at);
      if (sort === "oldest") return new Date(a.updated_at) - new Date(b.updated_at);
      return 0;
    });

  return (
    <SidebarLayout
      title="Latest Articles"
      subtitle="Transactions on Evolutionary Smart Systems"
      icon={FileText}
    >
      <div className="space-y-8 sm:space-y-10">

        {/* Page intro card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-slate-500 mb-5">
            <Link to="/" className="text-indigo-600 hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-slate-700 font-medium">Latest Articles</span>
          </nav>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Recently Published</h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            The most recent research published in the{" "}
            <span className="font-semibold text-slate-800">Transactions on Evolutionary Smart Systems</span>.
            All articles are open access, peer-reviewed, and assigned a DOI upon publication.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-100">
            {["Open Access", "Peer-Reviewed", "DOI Assigned"].map((label) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <span className="text-emerald-500">✔</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, author, abstract…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              Sort:
            </span>
            {[
              { key: "newest", label: "Newest" },
              { key: "oldest", label: "Oldest" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                  sort === key
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results header */}
        {!loading && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {search.trim() ? "Search Results" : "All Articles"}
            </h2>
            <span className="text-sm text-slate-500">
              {search.trim()
                ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`
                : `${filtered.length} article${filtered.length !== 1 ? "s" : ""}`}
            </span>
          </div>
        )}

        {/* Article list */}
        {loading ? (
          <Skeleton />
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 sm:p-12 text-center">
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">
              {search.trim() ? `No articles found for "${search}".` : "No published articles yet."}
            </p>
            {search.trim() && (
              <button
                onClick={() => setSearch("")}
                className="mt-3 text-sm text-indigo-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((paper, index) => (
              <ArticleCard key={paper.id} paper={paper} index={index} />
            ))}
          </div>
        )}

      </div>
    </SidebarLayout>
  );
}