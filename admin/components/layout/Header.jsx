export default function Header({ handleLogout }) {
  return (
    <header className="h-20 bg-cream border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
      <div>
        <h2 className="text-base text-gray-900">
          <span className="font-bold">Clarity Auto Spa</span> — Admin Panel
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div 
        className="w-10 h-10 rounded-full bg-primary text-cream flex items-center justify-center font-bold text-sm cursor-pointer" 
        onClick={handleLogout} 
        title="Logout"
      >
        CF
      </div>
    </header>
  );
}
