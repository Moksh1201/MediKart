// import React, { useState } from "react";
// import { Search, CheckCircle, XCircle } from "lucide-react";

// const doctorsData = [
//   { id: 1, name: "Dr. John Doe", specialization: "Cardiologist", license: "MD12345", approvals: 56, contact: "john@example.com", status: "Active" },
//   { id: 2, name: "Dr. Jane Smith", specialization: "Neurologist", license: "MD67890", approvals: 32, contact: "jane@example.com", status: "Inactive" },
//   { id: 3, name: "Dr. Alice Brown", specialization: "Dermatologist", license: "MD11223", approvals: 20, contact: "alice@example.com", status: "Active" }
// ];

// function DoctorsSection() {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [doctors, setDoctors] = useState(doctorsData);

//   const handleSearch = (e) => setSearch(e.target.value);
//   const handleStatusFilter = (e) => setStatusFilter(e.target.value);

//   const filteredDoctors = doctors.filter((doctor) =>
//     doctor.name.toLowerCase().includes(search.toLowerCase()) &&
//     (statusFilter === "All" || doctor.status === statusFilter)
//   );

//   const toggleStatus = (id) => {
//     setDoctors((prev) =>
//       prev.map((doc) =>
//         doc.id === id ? { ...doc, status: doc.status === "Active" ? "Inactive" : "Active" } : doc
//       )
//     );
//   };

//   return (
//     <div className="flex-1 w-384 h-full p-14 bg-gray-100 dark:bg-gray-300">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray">Registered Doctors</h2>

//       {/* Search & Filter Section */}
//       <div className="flex justify-between mb-4">
//         <div className="relative w-full md:w-1/3">
//           <Search className="absolute left-3 top-2.5 text-gray-100" size={20} />
//           <input
//             type="text"
//             placeholder="Search by name"
//             value={search}
//             onChange={handleSearch}
//             className="pl-10 pr-4 py-2 w-full rounded-md border bg-white dark:bg-gray-500 dark:text-white focus:outline-none"
//             style={{
//                 '::placeholder': {
//                   color: 'white',
//                 },
//               }}
//           />
//         </div>
//         <div>
//           <select
//             value={statusFilter}
//             onChange={handleStatusFilter}
//             className="px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
//           >
//             <option value="All">All Status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="w-full overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-blue-600 text-white">
//               <th className="px-4 py-3 text-left">Doctor Name</th>
//               <th className="px-4 py-3 text-left">Specialization</th>
//               <th className="px-4 py-3 text-left">License ID</th>
//               <th className="px-4 py-3 text-left">Approvals</th>
//               <th className="px-4 py-3 text-left">Contact</th>
//               <th className="px-4 py-3 text-left">Status</th>
//               <th className="px-4 py-3 text-center">Actions</th>
//               <th className="px-4 py-3 text-center">Profile</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredDoctors.map((doctor) => (
//               <tr key={doctor.id} className="border-b dark:border-gray-700">
//                 <td className="px-4 py-3 text-gray-800 dark:text-white">{doctor.name}</td>
//                 <td className="px-4 py-3 text-gray-800 dark:text-white">{doctor.specialization}</td>
//                 <td className="px-4 py-3 text-gray-800 dark:text-white">{doctor.license}</td>
//                 <td className="px-4 py-3 text-gray-800 dark:text-white">{doctor.approvals}</td>
//                 <td className="px-4 py-3 text-gray-800 dark:text-white">{doctor.contact}</td>
//                 <td className="px-4 py-3 font-bold">
//                   <span className={`px-3 py-1 rounded-full text-white ${doctor.status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
//                     {doctor.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   <button
//                     onClick={() => toggleStatus(doctor.id)}
//                     className="flex items-center gap-2 px-3 py-1 text-white rounded-md transition-all bg-blue-500 hover:bg-blue-700"
//                   >
//                     {doctor.status === "Active" ? <XCircle size={16} /> : <CheckCircle size={16} />} 
//                     {doctor.status === "Active" ? "Deactivate" : "Activate"}
//                   </button>
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   <button className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-all">
//                     View Profile <span className="animate-bounce">→</span>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default DoctorsSection;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle } from "lucide-react";

const doctorsData = [
  { id: 1, name: "Dr. John Doe", specialization: "Cardiologist", license: "MD12345", approvals: 56, contact: "john@example.com", status: "Active" },
  { id: 2, name: "Dr. Jane Smith", specialization: "Neurologist", license: "MD67890", approvals: 32, contact: "jane@example.com", status: "Inactive" },
  { id: 3, name: "Dr. Alice Brown", specialization: "Dermatologist", license: "MD11223", approvals: 20, contact: "alice@example.com", status: "Active" }
];

function DoctorsSection() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [doctors, setDoctors] = useState(doctorsData);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "All" || doctor.status === statusFilter)
  );

  const toggleStatus = (id) => {
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, status: doc.status === "Active" ? "Inactive" : "Active" } : doc
      )
    );
  };

  return (
    <div className="flex-1 w-294 h-full p-14 bg-gray-100 dark:bg-gray-800">
      <motion.h2
        className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        Registered Doctors
      </motion.h2>

      <div className="flex justify-between mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-full rounded-md border bg-white dark:bg-gray-700 dark:text-white focus:outline-none"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-3 text-left">Doctor Name</th>
              <th className="px-4 py-3 text-left">Specialization</th>
              <th className="px-4 py-3 text-left">License ID</th>
              <th className="px-4 py-3 text-left">Approvals</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
              <th className="px-4 py-3 text-center">Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id} className="border-b dark:border-gray-700">
                <td className="px-4 py-3 text-gray-900 dark:text-white">{doctor.name}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{doctor.specialization}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{doctor.license}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{doctor.approvals}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{doctor.contact}</td>
                <td className="px-4 py-3 font-bold">
                  <span className={`px-3 py-1 rounded-full text-white ${doctor.status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
                    {doctor.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleStatus(doctor.id)}
                    className="flex items-center gap-2 px-3 py-1 text-white rounded-md transition-all bg-blue-500 hover:bg-blue-700"
                  >
                    {doctor.status === "Active" ? <XCircle size={16} /> : <CheckCircle size={16} />} 
                    {doctor.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-all"
                  >
                    View Profile <span className="animate-bounce">→</span>
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorsSection;
