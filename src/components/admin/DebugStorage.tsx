import { useEffect, useState } from "react";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CheckResult = {
  url: string;
  ok: boolean;
  status?: number;
  error?: string;
};

const DebugStorage = () => {
  const { data, seedDatabase } = usePortfolio();
  const [results, setResults] = useState<CheckResult[]>([]);

  useEffect(() => {
    const urls: string[] = [];
    // collect all media urls from data
    data.projects.forEach(p => {
      (p.images || []).forEach(u => urls.push(u));
      (p.pdfs || []).forEach(u => urls.push(u));
    });
    (data.education || []).forEach(e => (e.images || []).forEach(u => urls.push(u)));
    (data.experience || []).forEach(ex => (ex.images || []).forEach(u => urls.push(u)));
    if (data.personalInfo.profileImage) urls.push(data.personalInfo.profileImage);

    let mounted = true;
    const checks: Promise<CheckResult>[] = urls.map(async (url) => {
      try {
        // Try a HEAD request first
        const res = await fetch(url, { method: 'HEAD' });
        return { url, ok: res.ok, status: res.status };
      } catch (err: any) {
        // Some servers don't allow HEAD; try GET
        try {
          const res2 = await fetch(url, { method: 'GET' });
          return { url, ok: res2.ok, status: res2.status };
        } catch (err2: any) {
          return { url, ok: false, error: String(err2) };
        }
      }
    });

    Promise.all(checks).then(r => { if (mounted) setResults(r); });

    return () => { mounted = false; };
  }, [data]);

  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle>Storage & Firestore Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2">
          <button
            className="px-3 py-2 bg-primary text-primary-foreground rounded"
            onClick={async () => {
              try {
                await seedDatabase();
                alert('Seeded Firestore with mock data');
              } catch (e) {
                alert('Failed to seed database: ' + String(e));
              }
            }}
          >
            Seed DB
          </button>
          <a
            className="px-3 py-2 bg-muted rounded text-sm"
            href="https://console.firebase.google.com/project/myportfolio-50a76/firestore/data"
            target="_blank"
            rel="noreferrer"
          >
            Open Firestore Console
          </a>
        </div>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Firestore Document Preview</h3>
          <pre className="text-sm bg-muted p-3 rounded max-h-64 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>

        <div>
          <h3 className="font-medium mb-2">Media URL Accessibility</h3>
          <div className="space-y-2">
            {results.length === 0 && <div className="text-sm text-muted-foreground">No media URLs found or checks still running...</div>}
            {results.map(r => (
              <div key={r.url} className="p-2 border border-border rounded">
                <div className="flex items-center justify-between">
                  <div className="break-words max-w-[70%]">{r.url}</div>
                  <div>
                    {r.ok ? (
                      <span className="text-green-600 font-medium">Accessible ({r.status})</span>
                    ) : (
                      <span className="text-red-600 font-medium">Not accessible {r.status ? `(${r.status})` : ''}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebugStorage;
