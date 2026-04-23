import { useState } from "react";

const PerceptionInputScreen = ({ onSubmit }) => {
  const [inputMinutes, setInputMinutes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = Number.parseFloat(inputMinutes);
    if (Number.isNaN(value) || value < 0 || value > 30) {
      setError("Please enter a valid number between 0 and 30.");
      return;
    }
    setError("");
    onSubmit(value);
  };

  return (
    <section className="animate-fadeUp flex flex-col items-center justify-center gap-7 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Phase 3 · Perception Input</p>
      <h2 className="text-3xl font-semibold text-white md:text-4xl">How many minutes did it feel?</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
        <label htmlFor="perceived-minutes" className="block text-left text-sm text-slate-300">
          Enter minutes (decimal allowed)
        </label>
        <input
          id="perceived-minutes"
          name="perceived-minutes"
          type="number"
          min="0"
          max="30"
          step="0.1"
          value={inputMinutes}
          onChange={(event) => setInputMinutes(event.target.value)}
          className="w-full rounded-xl border border-white/20 bg-slate-900/60 px-4 py-3 text-lg text-slate-100 outline-none ring-sky-300 transition focus:ring-2"
          placeholder="e.g. 8.5"
          inputMode="decimal"
          required
        />
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-sky-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-sky-300"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default PerceptionInputScreen;
