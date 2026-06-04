export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-xl font-bold text-white tracking-tighter mb-2 flex items-center justify-center">
          PANDA<span className="text-green-500">eCe</span>
        </p>
        <p className="text-gray-500 text-sm">
          Smarter Marketing for Faster Property Sales
        </p>
        <div className="mt-6 text-xs text-gray-600">
          &copy; {new Date().getFullYear()} PANDAeCe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
