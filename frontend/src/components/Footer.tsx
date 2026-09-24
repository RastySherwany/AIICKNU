import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} <a href="https://rasty.me" target="_blank" rel="noopener noreferrer" className="text-[#002147] font-bold hover:underline transition-colors cursor-pointer">Rasty Sherwany</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
