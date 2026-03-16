import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function IssuePapers() {

  const { volume, issue } = useParams();
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {

    const { data } = await supabase
      .from("papers")
      .select("*")
      .eq("status", "published")
      .eq("volume", volume)
      .eq("issue", issue);

    setPapers(data || []);
  };

  return (
    <div className="max-w-6xl mx-auto py-12">

      <h1 className="text-3xl font-bold mb-8">
        Volume {volume} – Issue {issue}
      </h1>

      {papers.map((p) => (
        <div key={p.id} className="border rounded-lg p-6 mb-4">
          <h2 className="font-bold">{p.title}</h2>
        </div>
      ))}

    </div>
  );
}