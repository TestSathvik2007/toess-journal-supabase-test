import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function CurrentIssue() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase
      .from("papers")
      .select("*")
      .eq("status", "published")
      .order("volume", { ascending: false })
      .order("issue", { ascending: false });

    setPapers(data || []);
  };

  return (
    <div className="max-w-6xl mx-auto py-12">

      <h1 className="text-3xl font-bold mb-8">
        Current Issue
      </h1>

      {papers.map((p) => (
        <div key={p.id} className="bg-white border p-6 rounded-lg mb-4">
          <h2 className="font-bold">{p.title}</h2>
        </div>
      ))}

    </div>
  );
}