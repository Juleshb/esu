import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon

const UserTable = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const itemsPerPage = 200;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        let endpoint = searchTerm
          ? `http://localhost:4600/api/students/search?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}&search=${encodeURIComponent(searchTerm)}`
          : `http://localhost:4600/api/students/pagination?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`;

        if (sortConfig.key) {
          endpoint += `&sort=${sortConfig.key}&order=${sortConfig.direction}`;
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data.students || []); // Ensure that `students` is always an array
        setTotalPages(Math.ceil((data.total || 0) / itemsPerPage)); // Handle potential undefined `total`
      } catch (error) {
        console.error('Error fetching the student data:', error);
        setStudents([]); // Ensure we don't attempt to map over undefined
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchData();
  }, [currentPage, searchTerm, sortConfig]);

  const fetchStudentById = async (matricule) => {
    try {
      const response = await fetch(`http://localhost:4600/api/students/reg/${matricule}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const student = await response.json([]);
      setSelectedStudent(student[0]);
      setShowPopup(true);
      console.log(student[0].nom)
    } catch (error) {
      console.error('Error fetching the student data:', error);
    }
  };

  const handleRowClick = (student) => {
    fetchStudentById(student.matricule);
  };

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '⇅';
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4600/api/students/${selectedStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedStudent),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedStudent = await response.json();
      setStudents((prevStudents) =>
        prevStudents.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
      );
      setShowPopup(false);
    } catch (error) {
      console.error('Error updating the student data:', error);
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
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-2 px-3 py-3 border border-gray-300 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10"
          />
        </div>
      </form>
      {isLoading ? (
        <div className="flex justify-center items-center mt-4">
          <FaSpinner className="animate-spin text-blue-500" size={24} />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
              <thead className="bg-sky-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider" onClick={() => handleSort('photo')}>
                    PHOTO {renderSortIcon('photo')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider" onClick={() => handleSort('matricule')}>
                    Matricule {renderSortIcon('matricule')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider" onClick={() => handleSort('postNom')}>
                    Post Nom {renderSortIcon('postNom')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider" onClick={() => handleSort('prenom')}>
                    Prenom {renderSortIcon('prenom')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider" onClick={() => handleSort('nomInstitut')}>
                    Nom Institut {renderSortIcon('nomInstitut')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider" onClick={() => handleSort('nomFac')}>
                    Faculty {renderSortIcon('nomFac')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider" onClick={() => handleSort('nomDepartement')}>
                    Department {renderSortIcon('nomDepartement')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider" onClick={() => handleSort('logoUrl')}>
                    Institut Logo {renderSortIcon('logoUrl')}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {students.map((student) => {
                  const profileLogoUrl = student.photo.startsWith('http')
                    ? student.photo
                    : `https://www.esu-identification.net/assets/img/etudiant/profile/${student.photo}`;

                  const institutionLogoUrl = student.logoUrl.startsWith('http')
                    ? student.logoUrl
                    : `https://www.esu-identification.net${student.logoUrl}`;

                  return (
                    <tr key={student.id} className="hover:bg-gray-100" onClick={() => handleRowClick(student)}>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <img src={profileLogoUrl} alt="" className="h-10 w-10 object-contain rounded-full bg-primary" />
                      </td>
                      <td className="px-6 py-3">{student.matricule}</td>
                      <td className="px-6 py-3">{student.postNom}</td>
                      <td className="px-6 py-3">{student.prenom}</td>
                      <td className="px-6 py-3">{student.nomInstitut}</td>
                      <td className="px-6 py-3">{student.nomFac}</td>
                      <td className="px-6 py-3">{student.nomDepartement}</td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <img src={institutionLogoUrl} alt="" className="h-10 w-10 object-contain" />
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
      )}
      {showPopup && selectedStudent && (
        <div className="fixed mt-8 inset-0 z-50 flex justify-center overflow-y-auto bg-black bg-opacity-50">
          <div className="items-center ">
            <div className="bg-white p-6 rounded-lg shadow-xl border-dotted border-2 border-primary">
            <h2 className="text-3xl font-bold mb-8 relative">
              <button
                className="absolute top-0 right-0  bg-white text-red-600 rounded-lg hover:bg-primary hover:text-white focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 "
                onClick={() => setShowPopup(false)}
              >
                <Icon icon="material-symbols:close" />
              </button>
            </h2>
        
      
          <h4 className="text-lg font-bold text-primary">Étudiant: {selectedStudent.matricule || ''} </h4>
          <img src={`https://www.esu-identification.net/assets/img/etudiant/profile/${selectedStudent.photo}`} alt=""  className="h-40 w-40 object-contain rounded-full bg-primary" />
         
         
        </div>
     
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={selectedStudent.nom || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, nom: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Post Nom</label>
                <input
                  type="text"
                  value={selectedStudent.postNom || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, postNom: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
               <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Prenom</label>
                <input
                  type="text"
                  value={selectedStudent.prenom || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, prenom: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
               <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Lieu Naissance</label>
                <input
                  type="text"
                  value={selectedStudent.lieuNaiss || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, lieuNaiss: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
               <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Date Naissance</label>
                <input
                  type="text"
                  value={selectedStudent.dateNaiss || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, dateNaiss: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
               <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Telephone</label>
                <input
                  type="text"
                  value={selectedStudent.tel || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, tel: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
               <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Sexe</label>
                <input
                  type="text"
                  value={selectedStudent.sexe || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, sexe: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
               <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Etat Civil</label>
                <input
                  type="text"
                  value={selectedStudent.etatCivil || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, etatCivil: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
               <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Nationalite</label>
                <input
                  type="text"
                  value={selectedStudent.nationalite || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, nationalite: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
               <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Nom Pere</label>
                <input
                  type="text"
                  value={selectedStudent.nomPere || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, nomPere: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
               <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Nom Mere</label>
                <input
                  type="text"
                  value={selectedStudent.nomMere || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, nomMere: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
               <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                  type="text"
                  value={selectedStudent.adresse || ''}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, adresse: e.target.value })}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                />
              </div>
              {/* Add more fields as needed */}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleUpdate}
                className="bg-primary hover:bg-white hover:text-primary text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
