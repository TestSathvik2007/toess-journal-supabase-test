import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function SpecialIssues() {

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {

    const { data } = await supabase
      .from("special_issues")
      .select("*");

    setIssues(data || []);
  };

  return (
    <div className="max-w-6xl mx-auto py-12">

      <h1 className="text-3xl font-bold mb-8">
        Special Issues
      </h1>

      {issues.map((i) => (
        <div key={i.id} className="border rounded-lg p-6 mb-4">
          <h2 className="font-bold">{i.title}</h2>
          <p className="text-gray-600">{i.description}</p>
        </div>
      ))}

    </div>
  );
}