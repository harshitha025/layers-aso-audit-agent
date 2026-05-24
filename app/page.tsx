"use client";

import { useState } from "react";

type AppData = {
  appName: string;
  developer: string;
  iconUrl: string;
  category: string;
  country: string;
};

export default function Home() {

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [auditLoading, setAuditLoading] =
  useState(false);
  const [appData, setAppData] =
    useState<AppData | null>(null);
  const [auditComplete, setAuditComplete] =
  useState(false);
  const [auditData, setAuditData] =
  useState<any>(null);

  async function getMetadata() {

    try {

      setLoading(true);

      const response = await fetch(
        "/api/metadata",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            url
          })
        }
      );

      const data =
        await response.json();

      setAppData(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  return (
    <main className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        ASO Audit Agent
      </h1>

      <input
        className="border p-2 w-full"
        placeholder="Paste App Store URL"
        value={url}
        onChange={(e)=>
          setUrl(e.target.value)
        }
      />

      <button
        onClick={getMetadata}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Analyze
      </button>

      {loading && (
        <p className="mt-4">
          Fetching app...
        </p>
      )}

      {appData && ( 
        
        <div className="border mt-5 p-5">

          <img
            src={appData.iconUrl}
            width={100}
            alt="app icon"
          />

          <h2 className="font-bold mt-3">
            {appData.appName}
          </h2>

          <p>
            {appData.developer}
          </p>

          <p>
            {appData.category}
          </p>

          <p>
            Is this the app you meant?
          </p>

          <div className="flex gap-2 mt-4">

            <button onClick={async () => {

setAuditLoading(true);

setAuditComplete(false);

const response =
await fetch(
"/api/audit",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
url
})
}
);

const data =
await response.json();

setAuditData(data);

setAuditLoading(false);

setAuditComplete(true);

}}
              className="bg-green-500 text-white px-4 py-2">
              Yes
            </button>

          </div>

        </div>

      )}
    {auditLoading && (

<div className="mt-5 border p-5">

<p className="font-bold">
Running ASO Audit...
</p>

<p>Analyzing title...</p>

<p>Analyzing screenshots...</p>

<p>Analyzing ratings...</p>

<p>Comparing competitors...</p>

</div>

)}
{auditComplete && (

<div className="border mt-5 p-5">

<h2 className="font-bold text-xl">
ASO Score Card
</h2>

<p>
Overall Score:
{auditData?.overallScore}/100
</p>

<div className="mt-4">

<p>Title: 8/10</p>

<p>Subtitle: 7/10</p>

<p>Description: 8/10</p>

<p>Screenshots: 6/10</p>

<p>Ratings: 9/10</p>

</div>

<h2 className="font-bold mt-5">
Quick Wins
</h2>

<ul>

<ul>

{auditData?.quickWins?.map(
(item:string,index:number)=>(

<li key={index}>
{item}
</li>

))}

</ul>

<li>
Add stronger CTA
</li>

<li>
Optimize subtitle keywords
</li>

</ul>

<h2 className="font-bold mt-5">
High Impact Changes
</h2>

<ul>

<li>
Redesign first screenshots
</li>

<li>
Improve keyword coverage
</li>

</ul>

<h2 className="font-bold mt-5">
Strategic Recommendations
</h2>

<ul>

<li>
Track competitor keywords
</li>

<li>
Test multiple product pages
</li>

</ul>

<h2 className="font-bold mt-5">
Competitor Comparison
</h2>

<table className="border w-full">

<tbody>

<tr>

<td>Apple Music</td>

<td>4.7</td>

<td>Strong ecosystem</td>

</tr>

<tr>

<td>YouTube Music</td>

<td>4.8</td>

<td>Strong discovery</td>

</tr>

<tr>

<td>Amazon Music</td>

<td>4.5</td>

<td>Large catalog</td>

</tr>

</tbody>

</table>

</div>

)}
    </main>
  );

}