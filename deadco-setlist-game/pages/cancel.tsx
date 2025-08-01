
import Link from 'next/link';

export default function Cancel() {
  return (
    <div className="m-4 p-6 bg-red-100 rounded-lg text-center">
      <h1 className="text-2xl font-bold text-red-800">❌ Payment Canceled</h1>
      <p className="mt-2 text-lg">Your checkout session was canceled. No payment was made.</p>
      <Link href="/" className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Return to Home
      </Link>
    </div>
  );
}
