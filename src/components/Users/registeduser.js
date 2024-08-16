import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const UserTable = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 200;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4600/api/students/pagination?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data.students || []); // Ensure that `students` is always an array
        setTotalPages(Math.ceil((data.total || 0) / itemsPerPage)); // Handle potential undefined `total`
      } catch (error) {
        console.error('Error fetching the student data:', error);
        setStudents([]); // Ensure we don't attempt to map over undefined
      }
    };

    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <form className="flex flex-row flex-wrap items-center">
        <div className="relative flex w-full flex-wrap items-stretch">
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <Icon icon="line-md:search" />
          </span>
          <input
            type="text"
            placeholder="Search here..."
            className="mb-2 px-3 py-3 border border-gray-300 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10"
          />
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-sky-100">
            <tr>
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">PHOTO</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Matricule</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Post Nom</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Prenom</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Nom Institut</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Facurty</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Institut Logo</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {students.map((student) => {
              // Ensure the logoUrl starts with the correct base URL
              const profile_logoUrl = student.photo.startsWith('http')
                ? student.profile_logoUrl
                : `https://www.esu-identification.net/assets/img/etudiant/profile/${student.photo}`;

                const institution_logoUrl = student.logoUrl.startsWith('http')
                ? student.institution_logoUrl
                : `https://www.esu-identification.net${student.logoUrl}`;


              return (
                <tr key={student.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-no-wrap">
                    <img src={profile_logoUrl} alt="" className="h-10 w-10 object-contain rounded-full bg-primary " />
                  </td>
                  <td className="px-6 py-3">{student.matricule}</td>
                <td className="px-6 py-3">{student.postNom}</td>
                <td className="px-6 py-3">{student.prenom}</td>
                <td className="px-6 py-3">{student.nomInstitut}</td>
                <td className="px-6 py-3">{student.nomFac}</td>
                <td className="px-6 py-3">{student.nomDepartement}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                    <img src={institution_logoUrl} alt="" className="h-10 w-10 object-contain" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UserTable;
