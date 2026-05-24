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
{" "}
{auditData?.overallScore ?? 0}/100
</p>
<div className="mt-4">

<h3 className="font-bold mb-3">
Dimension Scores
</h3>

{Object.entries(
auditData?.dimensionScores || {}
).map(([key,value]) => (

<div
key={key}
className="mb-3"
>

<div className="flex justify-between">

<span className="capitalize">
{key}
</span>

<span>
{Number(value)}/10
</span>

</div>

<div className="w-full bg-gray-200 rounded h-3">

<div
className="bg-blue-500 h-3 rounded"
style={{
width:`${Number(value)*10}%`
}}
/>

</div>

</div>

))}

</div>

<div className="mt-4">



</div>

{/* Quick Wins */}

<div className="mt-8">

<h3 className="font-bold text-lg mb-3">
Quick Wins
</h3>

<div className="grid gap-3">

{auditData?.quickWins?.map(
(item:string,index:number)=>(

<div
key={index}
className="border rounded p-3 bg-green-50"
>
✓ {item}
</div>

)
)}

</div>

</div>


{/* High Impact Changes */}

<div className="mt-8">

<h3 className="font-bold text-lg mb-3">
High Impact Changes
</h3>

<div className="grid gap-3">

{auditData?.highImpactChanges?.map(
(item:string,index:number)=>(

<div
key={index}
className="border rounded p-3 bg-yellow-50"
>
⚡ {item}
</div>

)
)}

</div>

</div>


{/* Strategic Recommendations */}

<div className="mt-8">

<h3 className="font-bold text-lg mb-3">
Strategic Recommendations
</h3>

<div className="grid gap-3">

{auditData?.strategicRecommendations?.map(
(item:string,index:number)=>(

<div
key={index}
className="border rounded p-3 bg-blue-50"
>
📈 {item}
</div>

)
)}

</div>

</div>


{/* Competitors */}

<div className="mt-8">

<h3 className="font-bold text-lg mb-3">
Competitor Comparison
</h3>

<div className="grid gap-4">

{auditData?.competitorComparison?.map(
(competitor:any,index:number)=>(

<div
key={index}
className="border rounded p-4 shadow-sm"
>

<h4 className="font-bold">
{competitor.name}
</h4>

<p>
⭐ Rating: {competitor.rating}
</p>

<p>
Strength: {competitor.strength}
</p>

</div>

)
)}

</div>

</div>

</div>

)}
    </main>
  );

}