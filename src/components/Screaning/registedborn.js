import StudetAction from "../../Dropdowns/studentDropdowns";
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Registedborn() {
  const [NewBorns, setNewBorns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50); // Display 50 items per page

  const navigate = useNavigate();

  const handleRowClick = (NewBornId) => {
    console.log('Clicked user ID:', NewBornId);
    navigate(`/nurses/view/${NewBornId}`);
  };

  const fetchData = async (search = '') => {
    try {
      // const authToken = localStorage.getItem('authToken');
      const url = search
        ? `http://localhost:4600/api/students/reg/${search}`
        : 'http://localhost:4600/api/students';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${authToken}`
        },
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data); // Log the fetched data
        setNewBorns(data.students || []);
        setErrorMessage('');
        if (!data.data || data.data.length === 0) {
          setErrorMessage('No matching newborns found.');
        }
      } else {
        console.error('Error fetching data:', data.message);
        setErrorMessage('No matching newborns found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error fetching data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(NewBorns); // Log the NewBorns array to confirm it is populated
  }, [NewBorns]);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    fetchData(searchValue);
  };

  // Calculate the items to display based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = NewBorns.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <form className="flex flex-row flex-wrap items-center">
        <div className="relative flex w-full flex-wrap items-stretch">
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-600 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <Icon icon="line-md:search" />
          </span>
          <input
            type="text"
            placeholder="Search here..."
            className="mb-2 px-3 py-3 border border-gray-300 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </form>
      {errorMessage && (
        <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
      )}
      {NewBorns.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-y-auto ">
              <thead className="bg-sky-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Matricule
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Post Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Prenom
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Nom Institut
                  </th>
                  <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {currentItems.map((NewBorn) => (
                  <tr key={NewBorn.id} className="hover:bg-gray-100" onClick={() => handleRowClick(NewBorn.id)}>
                    <td className="px-6 py-4 whitespace-no-wrap">{NewBorn.matricule}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">{NewBorn.postNom}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">{NewBorn.prenom}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">{NewBorn.nomInstitut}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <StudetAction userId={NewBorn.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {[...Array(Math.ceil(NewBorns.length / itemsPerPage)).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-3 py-1 mx-1 border ${currentPage === number + 1 ? 'bg-sky-500 text-white' : 'bg-white text-sky-500'} rounded`}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>No Data Available</div>
      )}
    </>
  );
}
