"use client";

interface Props {
  contacts: any[];
}

export default function ExportExcelButton({ contacts }: Props) {
  const downloadCSV = () => {
    const headers = [
      "S.No",
      "Name",
      "Phone",
      "Email",
      "Property Type",
      "Budget Range",
      "Message",
      "Date Submitted",
    ];

    const escapeCSV = (value: any) => {
      const stringValue = String(value ?? "");
      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const rows = contacts.map((contact, index) => [
      index + 1,
      contact.name || "",
      contact.phone || "",
      contact.email || "",
      contact.propertyType || "",
      contact.budget || "",
      contact.message || "",
      contact.createdAt
        ? new Date(contact.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "",
    ]);

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const date = new Date().toISOString().split("T")[0];
    link.download = `pandaece-leads-${date}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadCSV}
      id="export-csv-btn"
      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 active:scale-95 rounded-lg text-white text-sm font-semibold transition-all shadow-md shadow-green-900/30"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download CSV ({contacts.length})
    </button>
  );
}