import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

export default function Newborn() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [faculties, setFaculties] = useState([]);

  const handleLabelClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Fetch the institutions data from the API
    fetch('http://localhost:4600/api/institutions')
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((institution) => ({
          ...institution,
          logoUrl: `https://www.esu-identification.net${institution.logoUrl}`,
        }));
        setInstitutions(updatedData);
        setFilteredInstitutions(updatedData);
      })
      .catch((error) => console.error('Error fetching institutions:', error));
  }, []);

  useEffect(() => {
    // Filter the institutions based on the search term
    const filtered = institutions.filter((institution) =>
      institution.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInstitutions(filtered);
  }, [searchTerm, institutions]);

  useEffect(() => {
    if (selectedInstitution) {
      // Fetch faculties when a new institution is selected
      fetch(`http://localhost:4600/api/faculties/institution/${selectedInstitution.id}`)
        .then((response) => response.json())
        .then((data) => {
          setFaculties(data);
        })
        .catch((error) => console.error('Error fetching faculties:', error));
    }
  }, [selectedInstitution]);

  const handleInstitutionClick = (institution) => {
    setSelectedInstitution(institution);
    handleClosePopup();
  };


    return (
      <>
     <div className="rounded-t mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h4 className="text-lg font-bold text-primary">Formulaire d&apos;inscription des étudiants</h4>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form id="registrationForm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label htmlFor="mothername" className="block text-sm font-medium text-gray-700">
                Établissement choisi
              </label>
              <input
                type="hidden"
                id="mothername"
                name="mothername"
                value={selectedInstitution ? selectedInstitution.id : ''}
                onClick={handleLabelClick}
                required
              />
              <input
                type="text"
                className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                placeholder="Rechercher un établissement"
                value={selectedInstitution ? selectedInstitution.name : ''}
                onClick={handleLabelClick}
                readOnly
              />
            </div>
                <div className="col-span-1">
                  <label htmlFor="father's name" className="block text-sm font-medium text-gray-700">Nom*</label>
                  <input
        type="text"
        className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
        id="mothername"
        name="fathername"
        placeholder="Nom"
        required
      /> 
                 </div>
                <div className="col-span-1">
                  <label htmlFor="Marital Status" className="block text-sm font-medium text-gray-700">Post-nom*</label>
                  <input
        type="text"
        className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
        id="mothername"
        name="fathername"
        placeholder="Post-nom"
        required
      /> 
                </div>
                <div className="col-span-1">
                  <label htmlFor="father's name" className="block text-sm font-medium text-gray-700">Prénom*</label>
                  <input type="text" 
                  placeholder="Prénom"
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="phoneconract" 
                  name="phonecontact" required />
                </div>
                <div className="col-span-1">
        <label htmlFor="province" className="block text-sm font-medium text-gray-700">Lieu de Naissance*</label>
        <input type="text" 
                  placeholder="Lieu de Naissance"
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="phoneconract" 
                  name="phonecontact" required />
      </div>
      <div className="col-span-1">
        <label htmlFor="district" className="block text-sm font-medium text-gray-700">Date de naissance *</label>
        <input type="date" 
                    placeholder="Date de naissance (ex: 11/09/1996)"
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="Date of Birth" 
                  name="dateOfBirth" required />
      </div>
                <div className="col-span-1">
                  <label htmlFor="Date of Birth" className="block text-sm font-medium text-gray-700">Téléphone *</label>
                  <input type="text" 
                   placeholder="Téléphone"
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="Date of Birth" 
                  name="dateOfBirth" required />
                </div>
                <div className="col-span-1">
                  <label htmlFor="Sex" className="block text-sm font-medium text-gray-700">Sexe</label>
                  <select 
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="Sex" 
                  name="sex" required>
                    <option></option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label htmlFor="Age of the Newborn" className="block text-sm font-medium text-gray-700">Etat-Civil</label>
                  <input type="text"
                   placeholder="Etat-Civil"
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="Age of the Newborn" 
                  name="ageOfNewborn" required />
                </div>
                <div className="col-span-1">
                  <label htmlFor="Mode of Delivery" className="block text-sm font-medium text-gray-700">Nationalité*</label>
                  <input type="text"
                   placeholder="Nationalité"
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="Age of the Newborn" 
                  name="ageOfNewborn" required />
                </div>
                <div className="col-span-1">
                  <label htmlFor="APGAR SCORE at Birth at 5th Minute" className="block text-sm font-medium text-gray-700">Province d&apos;origine *</label>
                  <input type="text"
                   placeholder="Province d&apos;origine"
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" 
                  name="APGARSCOREAtBirth" required />
                 </div>
                <div className="col-span-1">
                  <label htmlFor="Weight at Birth" className="block text-sm font-medium text-gray-700">Adresse Physique *</label>
                  <input type="number"
                    placeholder="Adresse Physique"
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" 
                  name="weightAtBirth" required />
                  </div>
                  <div className="col-span-1">
              <label htmlFor="neonatalInfectionRisk" className="block text-sm font-medium text-gray-700">
                Faculté
              </label>
              <select
                className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                name="neonatalInfectionRisk"
                required
              >
                <option value="">Select a faculté</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </div>
                <div className="col-span-1">
        <label htmlFor="maternalSevereDisease" className="block text-sm font-medium text-gray-700">Département</label>
        <select
          className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
          name="maternalSevereDisease"
          required
        >
          <option></option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>  
           <div className="col-span-1">
                  <label htmlFor="History of Maternal Alcohol Use and Smoking" className="block text-sm font-medium text-gray-700">Promotion</label>
                  <select 
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                  name="historyOfMaternalAlcoholUseAndSmoking" required>
                    <option></option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
               
                <div className="col-span-1">
                  <label htmlFor="Weight at Birth" className="block text-sm font-medium text-gray-700">Apload photo</label>
                  <input type="file"
                    placeholder="Adresse Physique"
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" 
                  name="weightAtBirth" required />
                  </div>
              </div>
        <button
          type="submit"
          className="mt-4 px-4 py-3 bg-primary text-white rounded-lg hover:bg-white hover:text-primary border border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
          
        >
          <i className="mr-2">
            <Icon icon="dashicons:saved" />
          </i>Ajouter une nouvelle Étudiants
        </button>
           </form>
        </div>
        {isPopupVisible && (
        <div className="fixed mt-8 inset-0 z-50 flex justify-center overflow-y-auto bg-black bg-opacity-50" onClick={handleClosePopup}>
          <div className="items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl border-dotted border-2 border-primary">
            <h2 className="text-3xl font-bold mb-8 relative">
              <button
                className="absolute top-0 right-0  bg-white text-red-600 rounded-lg hover:bg-primary hover:text-white focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 "
                onClick={handleClosePopup}
              >
                <Icon icon="material-symbols:close" />
              </button>
            </h2>
              <h2 className="text-lg font-bold mb-4">Search Établissement</h2>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <ul>
                {filteredInstitutions.map((institution) => (
                  <li
                    key={institution.id}
                    className="py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleInstitutionClick(institution)}
                  >
                    <img src={institution.logoUrl} alt={institution.name} className="inline-block mr-2 w-6 h-6" />
                    {institution.name}
                  </li>
                ))}
              </ul>
              <button
                className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-white hover:text-primary border border-primary"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </>
    )}