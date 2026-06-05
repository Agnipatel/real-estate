"use client";

interface Props {
  contacts: any[];
}

export default function ExportExcelButton({ contacts }: Props) {
  const downloadCSV = () => {
    const headers = ["S.No", "Name", "Phone", "Email", "Property Type", "Date"];

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
      contact.createdAt ? new Date(contact.createdAt).toLocaleDateString("en-GB") : "",
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
    link.download = "contacts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadCSV}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
    >
      Download CSV ({contacts.length})
    </button>
  );
}