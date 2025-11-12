export default function Footer() {
  return (
    <footer className="w-full bg-black/40 border-t border-white/10 py-8 text-center text-white/60 text-sm">
      <p>© {new Date().getFullYear()} NEURAL MIRAGE. All rights reserved.</p>
    </footer>
  );
}