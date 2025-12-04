import React from "react";

const DataTable = ({ data = [] }) => {
  const changeDateFormat = (inputDate) => {
    const date = new Date(inputDate);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatGender = (g) => {
    if (!g) return "-";
    return g.charAt(0).toUpperCase() + g.slice(1);
  };

  const renderVaccinationBadge = (isVaccinated) => {
    const value = Boolean(isVaccinated);
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
        ${
          value
            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
            : "bg-rose-100 text-rose-700 border border-rose-200"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
            value ? "bg-emerald-500" : "bg-rose-500"
          }`}
        />
        {value ? "Vaccinated" : "Not Vaccinated"}
      </span>
    );
  };

  const renderGenderBadge = (gender) => {
    if (!gender) return "-";
    const g = gender.toLowerCase();
    let classes =
      "bg-slate-100 text-slate-700 border border-slate-200"; // default
    if (g === "male")
      classes = "bg-sky-100 text-sky-700 border border-sky-200";
    if (g === "female")
      classes = "bg-pink-100 text-pink-700 border border-pink-200";
    if (g === "others")
      classes = "bg-purple-100 text-purple-700 border border-purple-200";

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${classes}`}
      >
        {formatGender(g)}
      </span>
    );
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl relative">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-300/40 via-indigo-300/40 to-emerald-300/40 blur-3xl opacity-70" />

        {/* Card */}
        <div className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.16)] p-5 md:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-sky-500 font-semibold">
                Census Records
              </p>
              <p className="text-sm text-slate-500 mt-1">
                List of all participants with vaccination status, birthdate and
                gender.
              </p>
            </div>
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">
                Total Records:{" "}
              </span>
              {data.length}
            </div>
          </div>

          {/* Table container */}
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60">
            <div className="overflow-x-auto max-h-96">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Vaccination Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Birthdate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-slate-400 text-sm"
                      >
                        No records found. Add some census data to see it here.
                      </td>
                    </tr>
                  )}

                  {data.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-white transition-colors duration-150 odd:bg-slate-50 even:bg-slate-100/60"
                    >
                      <td className="px-4 py-3 align-middle text-slate-500 text-xs font-medium">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3 align-middle text-slate-800 font-medium">
                        {row.name || "-"}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        {renderVaccinationBadge(row.is_vaccinated)}
                      </td>
                      <td className="px-4 py-3 align-middle text-slate-700">
                        {row.birthdate ? changeDateFormat(row.birthdate) : "-"}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        {renderGenderBadge(row.gender)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DataTable;
