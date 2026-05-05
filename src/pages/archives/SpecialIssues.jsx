import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Link } from "react-router-dom";
import {
  Star, Users, Calendar, BookOpen, ChevronRight,
  ExternalLink, Filter, Clock, CheckCircle, XCircle,
} from "lucide-react";
import SidebarLayout from "../../layouts/SidebarLayout";

/* ── Status config ── */
const STATUS = {
  active:    { label: "Active",     icon: CheckCircle, textCls: "text-emerald-700", bgCls: "bg-emerald-50 border-emerald-200" },
  closed:    { label: "Closed",     icon: XCircle,     textCls: "text-amber-700",   bgCls: "bg-amber-50  border-amber-200"   },
  published: { label: "Published",  icon: BookOpen,    textCls: "text-indigo-700",  bgCls: "bg-indigo-50 border-indigo-200"  },
};
const FILTERS = ["all", "active", "closed", "published"];

/* ── SpecialIssueCard ── */
function SpecialIssueCard({ issue }) {
  const status   = issue.status || "active";
  const cfg      = STATUS[status] || STATUS.active;
  const StatusIcon = cfg.icon;

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  const metaItems = [
    issue.guest_editors      && { key: "Guest Editors",      val: issue.guest_editors,                icon: Users    },
    issue.submission_deadline && { key: "Submission Deadline", val: formatDate(issue.submission_deadline), icon: Clock    },
    issue.publication_date   && { key: "Publication Date",   val: formatDate(issue.publication_date),  icon: Calendar },
    (issue.volume || issue.issue_number) && {
      key: "Published In",
      val: issue.volume && issue.issue_number
        ? `Vol ${issue.volume}, Issue ${issue.issue_number}`
        : issue.volume ? `Volume ${issue.volume}` : `Issue ${issue.issue_number}`,
      icon: BookOpen,
    },
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-4 sm:p-6">
        {/* Title + status */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-indigo-500 group-hover:to-blue-500 transition-all duration-300">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug break-words pt-1">
              {issue.title}
            </h2>
          </div>

          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border flex-shrink-0 ${cfg.textCls} ${cfg.bgCls}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {cfg.label}
          </span>
        </div>

        {/* Description */}
        {issue.description && (
          <p className="text-sm text-slate-600 leading-relaxed mb-4 pl-12 sm:pl-13 line-clamp-3">
            {issue.description}
          </p>
        )}

        {/* Meta grid */}
        {metaItems.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-4 pt-4 border-t border-slate-100 pl-12 sm:pl-13">
            {metaItems.map(({ key, val, icon: Icon }) => (
              <div key={key} className="flex flex-col gap-0.5 min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{key}</span>
                <span className="flex items-center gap-1 text-sm text-slate-700 font-medium">
                  <Icon className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  {val}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 pl-12 sm:pl-13">
          {status === "active" && (
            <a
              href={issue.submission_link || "#"}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
            >
              Submit Paper <ChevronRight className="w-3.5 h-3.5" />
            </a>
          )}
          {status === "published" && issue.volume && issue.issue_number && (
            <Link
              to={`/archives/issue/${issue.volume}/${issue.issue_number}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" /> View Papers
            </Link>
          )}
          {status === "closed" && (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-400 text-sm font-semibold rounded-lg border border-slate-200 cursor-default">
              <XCircle className="w-3.5 h-3.5" /> Submissions Closed
            </span>
          )}
          {issue.more_info_link && (
            <a
              href={issue.more_info_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-indigo-200 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-50 hover:border-indigo-400 transition-all"
            >
              More Info <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
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
          <div className="flex gap-3 sm:gap-4 mb-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="h-3 bg-slate-200 rounded w-2/3" />
            </div>
            <div className="h-6 w-20 bg-slate-200 rounded-full flex-shrink-0" />
          </div>
          <div className="flex gap-4 pt-4 border-t border-slate-100 pl-12">
            <div className="h-10 w-24 bg-slate-200 rounded-lg" />
            <div className="h-10 w-24 bg-slate-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── SpecialIssues ── */
export default function SpecialIssues() {
  const [issues,  setIssues]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState("all");

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("special_issues")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("SpecialIssues error:", error);
    setIssues(data || []);
    setLoading(false);
  };

  const filtered = filter === "all" ? issues : issues.filter((i) => i.status === filter);

  /* counts per status for filter badges */
  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === "all" ? issues.length : issues.filter((i) => i.status === f).length;
    return acc;
  }, {});

  return (
    <SidebarLayout
      title="Special Issues"
      subtitle="Transactions on Evolutionary Smart Systems"
      icon={Star}
    >
      <div className="space-y-8 sm:space-y-10">

        {/* Intro card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-slate-500 mb-5">
            <Link to="/" className="text-indigo-600 hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-slate-700 font-medium">Special Issues</span>
          </nav>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Curated Collections</h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Special issues are curated collections of research focused on specific emerging themes within
            evolutionary smart systems. Each issue is coordinated by guest editors and undergoes the same
            rigorous peer-review process as regular submissions.
          </p>

          {/* Status legend */}
          {!loading && issues.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-slate-100">
              {Object.entries(STATUS).map(([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <span key={key} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${cfg.textCls} ${cfg.bgCls}`}>
                    <Icon className="w-3.5 h-3.5" /> {cfg.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Filter controls */}
        {!loading && issues.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
              <Filter className="w-4 h-4 text-slate-400" />
              Filter:
            </span>
            {FILTERS.map((f) => {
              const label = f === "all" ? "All" : STATUS[f]?.label ?? f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                    filter === f
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filter === f ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {counts[f]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Results header */}
        {!loading && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {filter === "all" ? "All Special Issues" : `${STATUS[filter]?.label ?? filter} Issues`}
            </h2>
            <span className="text-sm text-slate-500">
              {filtered.length} issue{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Cards */}
        {loading ? (
          <Skeleton />
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 sm:p-12 text-center">
            <Star className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">
              {filter === "all" ? "No special issues yet." : `No ${STATUS[filter]?.label?.toLowerCase() ?? filter} special issues.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((issue) => (
              <SpecialIssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}

        {/* CTA for active issues */}
        {!loading && issues.some((i) => i.status === "active") && (
          <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Interested in Guest Editing?</h2>
            <p className="text-blue-100 mb-5 max-w-xl mx-auto text-sm sm:text-base">
              Propose a special issue on an emerging topic in evolutionary smart systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Contact Editorial Office <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="/guidelines"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all border-2 border-white/30 hover:border-white/50"
              >
                Author Guidelines
              </a>
            </div>
          </div>
        )}

      </div>
    </SidebarLayout>
  );
}