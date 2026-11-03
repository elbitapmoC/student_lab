"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <section
        role="alert"
        className="rounded-2xl border border-rose-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-[#183c36]">
          Appointments couldn’t be loaded
        </h1>
        <p className="mt-2 text-sm text-[#60766f]">
          The appointment service may be unavailable. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-lg bg-[#1c6058] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#164c46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c6058]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
