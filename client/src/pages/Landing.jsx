function Landing() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-6">
        Job Tracker Pro
      </h1>

      <p className="text-gray-400 text-xl mb-8">
        Track all your job applications in one place.
      </p>

      <div className="flex gap-4">
        <a
          href="/login"
          className="bg-white text-black px-6 py-3 rounded-lg"
        >
          Login
        </a>

        <a
          href="/register"
          className="border border-gray-700 px-6 py-3 rounded-lg"
        >
          Register
        </a>
      </div>
    </div>
  );
}

export default Landing;