import { useEffect, useState } from "react";
import { getPublishedPapers } from "../../services/submissionService";

export default function LatestArticles() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getPublishedPapers();
    setPapers(data);
  };

  return (
    <div className="max-w-6xl mx-auto py-12">

      <h1 className="text-3xl font-bold mb-8">
        Latest Articles
      </h1>

      <div className="space-y-6">
        {papers.slice(0, 10).map((p) => (
          <div key={p.id} className="bg-white border rounded-lg p-6">

            <h2 className="text-lg font-bold mb-2">
              {p.title}
            </h2>

            <p className="text-gray-600 text-sm">
              {p.abstract?.slice(0, 150)}...
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}