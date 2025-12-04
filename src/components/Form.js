import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePickerComponent from "./DatePickerComponent";
import axios from "axios";
import { ErrorMessage, Message } from "./utility";

const Form = () => {
  const [name, setName] = useState("");
  const [isVaccinated, setIsVaccinated] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(null);

  // Convert date → ISO format
  const birthdate = startDate.toISOString();

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", {
      name,
      isVaccinated,
      birthdate,
      gender,
    });

    const is_vaccinated = isVaccinated === "true";

    axios
      .post("https://vaccination-census-system-backend-3.onrende/records", {
        name,
        is_vaccinated,
        birthdate,
        gender,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsSubmitted(true);

          // Reset form
          setName("");
          setIsVaccinated("");
          setGender("");
          setStartDate(new Date());
        } else {
          setIsSubmitted(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitted(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10">
      {/* Toast Messages */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {isSubmitted === true && <Message />}
        {isSubmitted === false && <ErrorMessage />}
      </div>

      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-50">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 tracking-tight">
            Census Management
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Record vaccination details and analyze trends effortlessly.
          </p>
        </div>

        {/* Trends Button */}
        <div className="flex justify-center mb-8">
          <Link
            to="/trends"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-blue-500 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 shadow-sm"
          >
            📊 View Trends
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="e.g., Larry Page"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm transition-all duration-150"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Vaccination */}
          <div>
            <label
              htmlFor="isVaccinated"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              Vaccination Status
            </label>
            <select
              id="isVaccinated"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm transition-all duration-150"
              value={isVaccinated}
              onChange={(e) => setIsVaccinated(e.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="true">Yes, Vaccinated</option>
              <option value="false">No, Not Vaccinated</option>
            </select>
          </div>

          {/* Birthdate */}
          <div>
            <label
              htmlFor="birthdate"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              Birthdate
            </label>
            <div className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 text-sm shadow-sm transition-all duration-150">
              <DatePickerComponent
                startDate={startDate}
                handleDateChange={handleDateChange}
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <span className="block mb-1.5 text-sm font-medium text-gray-700">
              Gender
            </span>
            <div className="flex flex-wrap gap-2">
              {/* Male */}
              <label
                htmlFor="male"
                className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                  gender === "male"
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  id="male"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="hidden"
                  required
                />
                ♂ Male
              </label>

              {/* Female */}
              <label
                htmlFor="female"
                className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                  gender === "female"
                    ? "bg-pink-500 text-white border-pink-500 shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  id="female"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="hidden"
                />
                ♀ Female
              </label>

              {/* Others */}
              <label
                htmlFor="others"
                className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                  gender === "others"
                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  id="others"
                  value="others"
                  checked={gender === "others"}
                  onChange={(e) => setGender(e.target.value)}
                  className="hidden"
                />
                ⚧ Others
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-[0.98] transition-all duration-150"
          >
            ✅ Submit Record
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
