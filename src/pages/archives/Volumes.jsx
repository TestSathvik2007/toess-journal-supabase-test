import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Link } from "react-router-dom";
import { Archive, FileText, BookOpen, ChevronRight, ArrowUpDown } from "lucide-react";
import SidebarLayout from "../../layouts/SidebarLayout";

/* ── VolumeCard ── */
function VolumeCard({ v }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-4 sm:p-6">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-indigo-500 group-hover:to-blue-500 transition-all duration-300">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-tight">
              Volume {v.volume}
            </h2>
            {v.year && <p className="text-xs text-slate-500">{v.year}</p>}
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap">
              <FileText className="w-3 h-3" />
              {v.issues.length} Issue{v.issues.length !== 1 ? "s" : ""}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full whitespace-nowrap">
              {v.totalPapers} Paper{v.totalPapers !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Issue pills */}
        <div className="flex flex-wrap gap-2">
          {v.issues.map((issue) => (
            <Link
              key={issue}
              to={`/archives/issue/${v.volume}/${issue}`}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200"
            >
              Issue {issue}
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
          ))}
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
          <div className="flex gap-3 sm:gap-4 mb-4 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-slate-200 rounded w-28" />
              <div className="h-3 bg-slate-200 rounded w-16" />
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2].map((j) => <div key={j} className="h-8 w-20 bg-slate-200 rounded-lg" />)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Volumes ── */
export default function Volumes() {
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort,    setSort]    = useState("newest");
  const [totals,  setTotals]  = useState({ volumes: 0, issues: 0, papers: 0 });

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("papers")
      .select("volume, issue, published_year")
      .eq("status", "published");

    const grouped = {};
    (data || []).forEach((p) => {
      const vol = p.volume;
      const iss = p.issue;
      const yr  = p.published_year;
      if (!grouped[vol]) grouped[vol] = { year: yr, issues: {}, totalPapers: 0 };
      if (!grouped[vol].issues[iss]) grouped[vol].issues[iss] = 0;
      grouped[vol].issues[iss]++;
      grouped[vol].totalPapers++;
      if (yr && !grouped[vol].year) grouped[vol].year = yr;
    });

    const result = Object.entries(grouped).map(([v, val]) => ({
      volume:      Number(v),
      year:        val.year,
      totalPapers: val.totalPapers,
      issues:      Object.keys(val.issues).map(Number).sort((a, b) => a - b),
    }));

    const allIssues = result.reduce((acc, v) => acc + v.issues.length, 0);
    const allPapers = result.reduce((acc, v) => acc + v.totalPapers, 0);
    setTotals({ volumes: result.length, issues: allIssues, papers: allPapers });
    setVolumes(result);
    setLoading(false);
  };

  const sorted = [...volumes].sort((a, b) =>
    sort === "newest" ? b.volume - a.volume : a.volume - b.volume
  );

  return (
    <SidebarLayout
      title="All Volumes & Issues"
      subtitle="Transactions on Evolutionary Smart Systems"
      icon={Archive}
    >
      <div className="space-y-8 sm:space-y-10">

        {/* Header card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-slate-500 mb-5">
            <Link to="/" className="text-indigo-600 hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-slate-700 font-medium">Archives</span>
          </nav>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">All Volumes &amp; Issues</h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Explore the complete archive of published research in the{" "}
            <span className="font-semibold text-slate-800">Transactions on Evolutionary Smart Systems</span>.
            Issues are organized by volume and publication year.
          </p>

          {/* Archive stats */}
          {!loading && totals.volumes > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
              {[
                { label: "Volumes",          value: totals.volumes },
                { label: "Issues",           value: totals.issues  },
                { label: "Published Papers", value: totals.papers  },
              ].map(({ label, value }) => (
                <div key={label} className="text-center bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl py-4 px-2">
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-700 leading-none mb-1">{value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider leading-tight">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sort controls */}
        {!loading && volumes.length > 1 && (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              Sort:
            </span>
            {[
              { key: "newest", label: "Newest First" },
              { key: "oldest", label: "Oldest First" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                  sort === key
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Volume cards */}
        {loading ? <Skeleton /> : volumes.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 sm:p-12 text-center">
            <Archive className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No published volumes yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((v) => <VolumeCard key={v.volume} v={v} />)}
          </div>
        )}

        {/* CTA */}
        {!loading && volumes.length > 0 && (
          <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Ready to Contribute?</h2>
            <p className="text-blue-100 mb-5 max-w-xl mx-auto text-sm sm:text-base">
              We welcome high-quality submissions that advance the field of evolutionary
              computation and smart systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
                Submit Your Paper <ChevronRight className="w-4 h-4" />
              </a>
              <a href="/guidelines"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all border-2 border-white/30 hover:border-white/50">
                Author Guidelines
              </a>
            </div>
          </div>
        )}

      </div>
    </SidebarLayout>
  );
}