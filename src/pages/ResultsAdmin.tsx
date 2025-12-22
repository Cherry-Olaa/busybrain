// src/pages/ResultsAdmin.tsx
import { useState } from "react";
import { uploadSingleResult, uploadMultipleResults, uploadExcelFile } from "@/lib/resultApi";

export default function ResultsAdmin() {
  const [studentId, setStudentId] = useState("");
  const [session, setSession] = useState("2025/2026");
  const [term, setTerm] = useState("1");
  const [rows, setRows] = useState([{ subject: "", ca: 0, exam: 0 }]);
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  function addRow() {
    setRows([...rows, { subject: "", ca: 0, exam: 0 }]);
  }

  function setRow(i:number, field:string, value:any){
    const copy = [...rows];
    copy[i][field] = value;
    setRows(copy);
  }

  async function submitSingle(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Saving...");
    try {
      const payload = { studentId, session, term, results: rows };
      const res = await uploadSingleResult(payload);
      setMsg(res.data.msg || "Saved");
    } catch (err:any) { setMsg(err?.response?.data?.message || "Error"); }
  }

  async function submitExcel(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return setMsg("Choose file");
    try {
      const res = await uploadExcelFile(file);
      setMsg("Upload complete: " + JSON.stringify(res.data));
    } catch (err:any) { setMsg(err?.response?.data?.msg || "Error uploading"); }
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Upload Single Result</h2>
      <form onSubmit={submitSingle} className="space-y-3">
        <input placeholder="Student ID" value={studentId} onChange={e=>setStudentId(e.target.value)} className="input" />
        <input placeholder="Session" value={session} onChange={e=>setSession(e.target.value)} className="input" />
        <input placeholder="Term" value={term} onChange={e=>setTerm(e.target.value)} className="input" />
        {rows.map((r,i)=>(
          <div key={i} className="grid grid-cols-3 gap-2">
            <input placeholder="Subject code" value={r.subject} onChange={e=>setRow(i,"subject",e.target.value)} className="input" />
            <input type="number" value={r.ca} onChange={e=>setRow(i,"ca",Number(e.target.value))} className="input" />
            <input type="number" value={r.exam} onChange={e=>setRow(i,"exam",Number(e.target.value))} className="input" />
          </div>
        ))}
        <div className="flex gap-2">
          <button type="button" onClick={addRow} className="btn">Add subject</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

      <hr className="my-6" />

      <h2 className="text-xl font-bold mb-4">Upload Excel</h2>
      <form onSubmit={submitExcel}>
        <input type="file" accept=".xlsx" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <button className="btn btn-primary" type="submit">Upload</button>
      </form>

      {msg && <div className="mt-4 p-3 bg-card">{msg}</div>}
    </div>
  );
}