import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import connectMongo from "@/lib/mongodb";
import Contact from "@/models/Contact";
import ExportExcelButton from "../../components/ExportExcelButton";
import { 
  LogOut, 
  LayoutDashboard, 
  Users, 
  Settings, 
  Home,
  Phone,
  Mail,
  Calendar,
  Building,
  Search
} from "lucide-react";
import { logoutAction } from "../actions";

// Use dynamic rendering since we depend on cookies and database
export const dynamic = "force-dynamic";

async function getContacts() {
  try {
    await connectMongo();
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    return contacts;
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return [];
  }
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token || token.value !== "authenticated") {
    redirect("/admin/login");
  }

  const contacts = await getContacts();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-[#0a0a0a]/50 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Admin<span className="text-blue-500">Panel</span></span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-500/10 text-blue-400 rounded-xl font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
            <Users className="w-5 h-5" />
            Contacts
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>

        <div className="p-4 border-t border-white/10">
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-xl font-medium transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a]/80 backdrop-blur-md z-10">
          <div>
            <h1 className="text-xl font-semibold">Overview</h1>
            <p className="text-sm text-white/50">Manage your real estate inquiries</p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search contacts..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent w-64 transition-all"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8 relative">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/4 w-[50%] h-[300px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">Total Contacts</p>
                  <p className="text-3xl font-bold">{contacts.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">New This Week</p>
                  <p className="text-3xl font-bold">{contacts.slice(0, 5).length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">Response Rate</p>
                  <p className="text-3xl font-bold">94%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Home className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden relative z-10">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
  <h2 className="text-lg font-semibold">
    Recent Inquiries
  </h2>

  <div className="flex gap-3">
    <ExportExcelButton contacts={JSON.parse(JSON.stringify(contacts))} />

    <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
      View All
    </button>
  </div>
</div>
            
            {contacts.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white/30" />
                </div>
                <h3 className="text-lg font-medium text-white/80 mb-2">No contacts yet</h3>
                <p className="text-white/50 text-sm max-w-sm">When someone submits a contact form on your website, it will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="py-4 px-6 font-medium text-white/50 text-sm w-1/3">Client Name</th>
                      <th className="py-4 px-6 font-medium text-white/50 text-sm">Contact Details</th>
                      <th className="py-4 px-6 font-medium text-white/50 text-sm">Property Interest</th>
                      <th className="py-4 px-6 font-medium text-white/50 text-sm">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact: any, idx: number) => (
                      <tr 
                        key={contact._id?.toString() || idx} 
                        className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-blue-400 font-bold uppercase text-sm">
                              {contact.name.charAt(0)}
                            </div>
                            <span className="font-medium">{contact.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-white/80">
                              <Phone className="w-3.5 h-3.5 text-white/40 group-hover:text-blue-400 transition-colors" />
                              <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a>
                            </div>
                            {contact.email && (
                              <div className="flex items-center gap-2 text-white/80">
                                <Mail className="w-3.5 h-3.5 text-white/40 group-hover:text-blue-400 transition-colors" />
                                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors text-sm">{contact.email}</a>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/80">
                            <Building className="w-3.5 h-3.5 text-white/40" />
                            {contact.propertyType}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(contact.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
