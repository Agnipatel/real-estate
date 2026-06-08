import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import connectMongo from "@/lib/mongodb";
import Contact from "@/models/Contact";
import ExportExcelButton from "../../components/ExportExcelButton";
import {
  LogOut,
  LayoutDashboard,
  Users,
  Home,
  Phone,
  Mail,
  Calendar,
  Building,
  MessageSquare,
  Wallet,
  TrendingUp,
  Clock,
} from "lucide-react";
import { logoutAction } from "../actions";

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

function getThisWeekCount(contacts: any[]) {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return contacts.filter((c) => new Date(c.createdAt) >= weekAgo).length;
}

function getTodayCount(contacts: any[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return contacts.filter((c) => new Date(c.createdAt) >= today).length;
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token || token.value !== "authenticated") {
    redirect("/admin/login");
  }

  const contacts = await getContacts();
  const thisWeek = getThisWeekCount(contacts);
  const today = getTodayCount(contacts);

  const budgetColors: Record<string, string> = {
    "40k - 50k": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "50k - 1cr": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "1cr - 2cr": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white flex overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className="w-64 flex-shrink-0 border-r border-white/8 bg-[#0a0f1a] flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-green-500 to-emerald-600 flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            PANDA<span className="text-green-500">eCe</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 text-green-400 rounded-xl font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-white/50 rounded-xl font-medium">
            <Users className="w-5 h-5" />
            All Leads
            <span className="ml-auto bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded-full">
              {contacts.length}
            </span>
          </div>
        </nav>

        <div className="p-4 border-t border-white/8">
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-xl font-medium transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Header */}
        <header className="h-20 border-b border-white/8 flex items-center justify-between px-8 bg-[#080c14]/80 backdrop-blur-md z-10 flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold">Lead Dashboard</h1>
            <p className="text-sm text-white/40">
              PANDAeCe Real Estate — All form submissions
            </p>
          </div>
          <ExportExcelButton contacts={JSON.parse(JSON.stringify(contacts))} />
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto p-8 space-y-8">

          {/* Glow */}
          <div className="fixed top-0 left-1/3 w-[500px] h-[300px] rounded-full bg-green-600/5 blur-[120px] pointer-events-none" />

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {[
              {
                label: "Total Leads",
                value: contacts.length,
                icon: <Users className="w-5 h-5" />,
                color: "from-green-500/20 to-emerald-600/10",
                iconColor: "text-green-400",
                ring: "ring-green-500/20",
              },
              {
                label: "This Week",
                value: thisWeek,
                icon: <TrendingUp className="w-5 h-5" />,
                color: "from-blue-500/20 to-blue-600/10",
                iconColor: "text-blue-400",
                ring: "ring-blue-500/20",
              },
              {
                label: "Today",
                value: today,
                icon: <Clock className="w-5 h-5" />,
                color: "from-purple-500/20 to-purple-600/10",
                iconColor: "text-purple-400",
                ring: "ring-purple-500/20",
              },
              {
                label: "Response Rate",
                value: "94%",
                icon: <TrendingUp className="w-5 h-5" />,
                color: "from-amber-500/20 to-amber-600/10",
                iconColor: "text-amber-400",
                ring: "ring-amber-500/20",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/4 border border-white/8 rounded-2xl p-5 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white/50 text-sm font-medium">{stat.label}</p>
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} ${stat.iconColor} flex items-center justify-center ring-1 ${stat.ring}`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* ── Leads Table ── */}
          <div className="bg-white/4 border border-white/8 rounded-2xl backdrop-blur-xl overflow-hidden relative z-10">
            <div className="p-6 border-b border-white/8 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">All Enquiries</h2>
                <p className="text-white/40 text-sm mt-0.5">
                  Full details of every lead submitted via the contact form
                </p>
              </div>
              <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold px-3 py-1.5 rounded-full">
                {contacts.length} total
              </span>
            </div>

            {contacts.length === 0 ? (
              <div className="p-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-lg font-medium text-white/60 mb-2">No leads yet</h3>
                <p className="text-white/30 text-sm max-w-xs">
                  When someone submits the contact form, their details will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="py-4 px-5 text-white/40 text-xs font-semibold uppercase tracking-wider w-8">#</th>
                      <th className="py-4 px-5 text-white/40 text-xs font-semibold uppercase tracking-wider">Client</th>
                      <th className="py-4 px-5 text-white/40 text-xs font-semibold uppercase tracking-wider">Contact</th>
                      <th className="py-4 px-5 text-white/40 text-xs font-semibold uppercase tracking-wider">Property</th>
                      <th className="py-4 px-5 text-white/40 text-xs font-semibold uppercase tracking-wider">Budget</th>
                      <th className="py-4 px-5 text-white/40 text-xs font-semibold uppercase tracking-wider">Message</th>
                      <th className="py-4 px-5 text-white/40 text-xs font-semibold uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact: any, idx: number) => (
                      <tr
                        key={contact._id?.toString() || idx}
                        className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                      >
                        {/* S.No */}
                        <td className="py-4 px-5 text-white/30 text-sm font-mono">
                          {idx + 1}
                        </td>

                        {/* Client */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-white/10 flex items-center justify-center text-green-400 font-bold uppercase text-sm flex-shrink-0">
                              {contact.name?.charAt(0) || "?"}
                            </div>
                            <span className="font-medium text-sm whitespace-nowrap">
                              {contact.name}
                            </span>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-4 px-5">
                          <div className="flex flex-col gap-1.5">
                            <a
                              href={`tel:${contact.phone}`}
                              className="flex items-center gap-2 text-white/80 hover:text-green-400 transition-colors text-sm"
                            >
                              <Phone className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                              <span className="whitespace-nowrap">{contact.phone}</span>
                            </a>
                            {contact.email && (
                              <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-2 text-white/60 hover:text-green-400 transition-colors text-xs"
                              >
                                <Mail className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                                <span className="truncate max-w-[160px]">
                                  {contact.email}
                                </span>
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Property */}
                        <td className="py-4 px-5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 whitespace-nowrap">
                            <Building className="w-3 h-3 text-white/30" />
                            {contact.propertyType || "—"}
                          </div>
                        </td>

                        {/* Budget */}
                        <td className="py-4 px-5">
                          {contact.budget ? (
                            <div
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium whitespace-nowrap ${
                                budgetColors[contact.budget] ||
                                "bg-white/5 text-white/60 border-white/10"
                              }`}
                            >
                              <Wallet className="w-3 h-3 opacity-70" />
                              ₹{contact.budget.replace("40k - 50k", "40k–50k").replace("50k - 1cr", "50k–1Cr").replace("1cr - 2cr", "1Cr–2Cr")}
                            </div>
                          ) : (
                            <span className="text-white/25 text-xs">—</span>
                          )}
                        </td>

                        {/* Message */}
                        <td className="py-4 px-5 max-w-[220px]">
                          {contact.message ? (
                            <div className="flex items-start gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 text-white/30 mt-0.5 flex-shrink-0" />
                              <p
                                className="text-xs text-white/60 leading-relaxed line-clamp-2"
                                title={contact.message}
                              >
                                {contact.message}
                              </p>
                            </div>
                          ) : (
                            <span className="text-white/20 text-xs">—</span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5 text-xs text-white/50 whitespace-nowrap">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(contact.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <p className="text-white/25 text-[10px] mt-0.5 ml-5">
                            {new Date(contact.createdAt).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
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
