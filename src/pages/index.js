import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    )
      .then((response) => response.json())
      .then((data) => setVehicleTypes(data.Results));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Car Dealer Filter</h1>

      <select
        className="mb-4 p-2 border border-gray-300 rounded text-black"
        value={selectedVehicleType}
        onChange={(e) => setSelectedVehicleType(e.target.value)}
      >
        <option value="">Select Vehicle Type</option>
        {vehicleTypes.map((type) => (
          <option key={type.MakeName} value={type.MakeId}>
            {type.MakeName}
          </option>
        ))}
      </select>

      <select
        className="mb-4 p-2 border border-gray-300 rounded text-black"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Select Model Year</option>
        {Array.from(
          new Array(new Date().getFullYear() - 2014),
          (v, i) => i + 2015
        ).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <Link
        href={selectedVehicleType && selectedYear ? `/result/${selectedVehicleType}/${selectedYear}` : '#'}
        className={`p-2 text-white rounded ${
            selectedVehicleType && selectedYear ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
        }`}
        aria-disabled={!selectedVehicleType || !selectedYear} //Usability and visibility improovments
        tabIndex={selectedVehicleType && selectedYear ? 0 : -1} // Allows focus only when link is clicked
      >
        Next
      </Link>
    </div>
  );
}
