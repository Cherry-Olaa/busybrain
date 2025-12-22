import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/api";

export default function CreateStaff() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    role: "staff",
    assignedClasses: [] as string[],
  });
  const [newClass, setNewClass] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add a class to assignedClasses
  const addClass = () => {
    if (newClass && !form.assignedClasses.includes(newClass)) {
      setForm({ ...form, assignedClasses: [...form.assignedClasses, newClass] });
      setNewClass("");
    }
  };

  // Remove a class
  const removeClass = (cls: string) => {
    setForm({ ...form, assignedClasses: form.assignedClasses.filter(c => c !== cls) });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.assignedClasses.length) {
      toast({ title: "Error", description: "Please assign at least one class", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName: form.fullName,
        username: form.username,
        role: form.role,
        assignedClasses: form.assignedClasses, // <-- send classes
      };

      const res = await axios.post("/admin/staff/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Staff Created",
        description: `Initial password: ${res.data.initialPassword}`,
      });

      setForm({ fullName: "", username: "", role: "staff", assignedClasses: [] });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#041d29] text-white">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Create New Staff</h1>

        <Card className="p-6 bg-white/5 text-white">
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="johndoe"
                required
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white/5"
                disabled
              >
                <option value="staff">Teacher</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Label>Assigned Classes</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="e.g. 20/BBS"
                  value={newClass}
                  onChange={e => setNewClass(e.target.value)}
                />
                <Button type="button" onClick={addClass}>Add</Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {form.assignedClasses.map(cls => (
                  <div key={cls} className="bg-gray-700 px-2 py-1 rounded flex items-center gap-1">
                    <span>{cls}</span>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeClass(cls)}>x</Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex gap-3 justify-end mt-2">
              <Button type="button" variant="ghost" onClick={() => navigate("/admin/staff/list")}>
                Cancel
              </Button>
              <Button type="submit" style={{ background: "#0b92bf" }} disabled={loading}>
                {loading ? "Creating..." : "Create Staff"}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}