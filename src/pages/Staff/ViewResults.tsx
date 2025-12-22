// import { useEffect, useState } from "react";
// import StaffSidebar from "@/components/Staff/StaffSidebar";
// import { Card } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";

// interface Result {
//     _id: string;
//     studentName: string;
//     admissionNumber: string;
//     session: string;
//     term: string;
//     scores: Record<string, number>; // optional, adjust to your data
// }

// export default function ViewResults() {
//     const [results, setResults] = useState<Result[]>([]);
//     const { toast } = useToast();
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await fetch("http://localhost:4000/api/staff/results", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 if (!res.ok) throw new Error("Failed to fetch results");
//                 const data = await res.json();
//                 setResults(data);
//             } catch (err: any) {
//                 toast({ title: "Error", description: err.message, variant: "destructive" });
//             }
//         })();
//     }, [toast, token]);

//     return (
//         <div className="flex min-h-screen bg-[#041d29] text-white">
//             <StaffSidebar />
//             <main className="flex-1 p-6">
//                 <h1 className="text-2xl font-bold mb-4">Student Results</h1>

//                 {results.length > 0 ? (
//                     <div className="space-y-3">
//                         {results.map((r) => (
//                             <Card key={r._id} className="p-4 bg-white/5 flex justify-between items-center">
//                                 <div>
//                                     <div className="font-medium">{r.studentName}</div>
//                                     <div className="text-sm text-[#cfe7ee]">
//                                         {r.admissionNumber} - {r.session} ({r.term})
//                                     </div>
//                                 </div>
//                                 <div className="text-sm text-[#9fb6c2]">View Scores</div>
//                             </Card>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-sm text-[#9fb6c2]">No results found</div>
//                 )}
//             </main>
//         </div>
//     );
// }

