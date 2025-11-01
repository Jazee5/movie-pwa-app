import { Film } from "lucide-react";

function Footer({ darkMode }) {
  return (
    <footer className={`w-full py-4 px-6 mt-10 ${
      darkMode
        ? 'bg-gradient-to-r from-purple-900 to-blue-900'
        : 'bg-gradient-to-r from-purple-300 to-blue-300'
    } text-white`}>
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm md:text-base">
          © 2025 🎬 Movie List App — Built with ❤️ using React & Tailwind
        </p>
      </div>
    </footer>
  );
}

export default Footer;