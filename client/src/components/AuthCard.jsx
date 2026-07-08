function AuthCard({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 py-8">
      <div
        className="
          w-full
          max-w-[480px]
          bg-[#0d0d0d]
          border border-zinc-800
          rounded-2xl
          shadow-2xl
          p-6 sm:p-8 md:p-10
        "
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center">{title}</h1>

        {subtitle && (
          <p className="text-zinc-400 text-center mt-2 mb-8">{subtitle}</p>
        )}

        {children}
      </div>
    </div>
  );
}

export default AuthCard;
