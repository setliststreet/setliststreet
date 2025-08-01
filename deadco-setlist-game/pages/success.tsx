import { useRouter } from 'next/router';

const Success = () => {
  const router = useRouter();
  const { mode, song } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 p-4">
      <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-green-300 animate-fade-in-up">
        <div className="text-center space-y-4">
          <div className="text-5xl">🎉</div>
          <h1 className="text-2xl font-extrabold text-green-900 drop-shadow-sm">
            Payment Successful!
          </h1>
          <p className="text-green-800 text-md font-medium">
            {mode && `You’ve entered the `}
            <span className="font-semibold">{mode}</span>
            {song && ` game with "`}
            <span className="italic font-semibold">{song}</span>
            {song && `" as your guess.`}
          </p>
          <a
            href="/"
            className="inline-block mt-4 px-6 py-2 rounded-full border-2 border-green-900 text-green-900 font-semibold hover:bg-green-900 hover:text-white transition duration-300 shadow-sm"
          >
            Go To Home
          </a>
        </div>
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-400 rounded-full shadow-lg animate-ping" />
      </div>
    </div>
  );
};

export default Success;
