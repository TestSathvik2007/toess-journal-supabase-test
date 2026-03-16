import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Link } from "react-router-dom";

export default function Volumes() {

  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {

    const { data } = await supabase
      .from("papers")
      .select("volume, issue")
      .eq("status", "published");

    const grouped = {};

    data.forEach((p) => {
      if (!grouped[p.volume]) grouped[p.volume] = new Set();
      grouped[p.volume].add(p.issue);
    });

    const result = Object.entries(grouped).map(([v, issues]) => ({
      volume: v,
      issues: Array.from(issues),
    }));

    setVolumes(result);
  };

  return (
    <div className="max-w-5xl mx-auto py-12">

      <h1 className="text-3xl font-bold mb-8">
        All Volumes & Issues
      </h1>

      {volumes.map((v) => (
        <div key={v.volume} className="mb-6">

          <h2 className="text-xl font-semibold">
            Volume {v.volume}
          </h2>

          <div className="ml-4 mt-2 space-y-1">

            {v.issues.map((issue) => (
              <Link
                key={issue}
                to={`/archives/issue/${v.volume}/${issue}`}
                className="block text-indigo-600 hover:underline"
              >
                Issue {issue}
              </Link>
            ))}

          </div>

        </div>
      ))}

    </div>
  );
}