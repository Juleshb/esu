import { Icon } from '@iconify/react';
import { useState } from 'react';

const rwandanProvincesData = [
  { name: 'Kigali City', districts: ['Gasabo', 'Kicukiro', 'Nyarugenge'] },
  { name: 'Northern Province', districts: ['Burera', 'Gakenke', 'Musanze', 'Rulindo'] },
  { name: 'Eastern Province', districts: ['Bugesera', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Nyagatare', 'Rwamagana'] },
  { name: 'Southern Province', districts: ['Gisagara', 'Huye', 'Kamonyi', 'Muhanga', 'Nyamagabe', 'Nyanza', 'Nyaruguru', 'Ruhango'] },
  { name: 'Western Province', districts: ['Karongi', 'Ngororero', 'Nyabihu', 'Nyamasheke', 'Rubavu', 'Rusizi', 'Rutsiro'] }
];

export default function Newborn() {
  const [formValues, setFormValues] = useState({
    mothername: '',
    fathername: '',
    maritalStatus: '',
    phonecontact: '',
    province: '',
    district: '',
    dateOfBirth: '',
    ageOfNewborn: '',
    sex: '',
    modeOfDelivery: '',
    APGARSCOREAtBirth: '',
    weightAtBirth: '',
    neonatalInfectionRisk: '',
    maternalSevereDisease: '',
    selectedmaternalDiseases: [],
    historyOfMaternalAlcoholUseAndSmoking: '',
    selectedhistoryOfMaternalAlcoholUseAndSmoking: '',
    maternalExplosureToOtotoxicDrugs: '',
    selectedMaternalExplosuretoOtotoxicDrugs: [],
    newbornPositionInTheFamily: '',
    presenceOfEarDysmorphism: '',
    historyOfHearingLossAmongFamilyMembers: '',
    OAEResult: ''
  });
  const [showLoader, setShowLoader] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [SuccessMessage, setSuccessMessage] = useState('');


  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    if (type === 'checkbox' && name === 'selectedmaternalDiseases') {
      // Checkbox for maternal diseases
      setFormValues(prevValues => ({
        ...prevValues,
        selectedmaternalDiseases: {
          ...prevValues.selectedmaternalDiseases,
          [value]: checked,
        },
      }));
    } else if (type === 'checkbox' && name.startsWith('selectedMaternalExplosuretoOtotoxicDrugs')) {
      // Checkbox for drugs
      const drug = value;
      if (checked) {
        setFormValues(prevValues => ({
          ...prevValues,
          selectedMaternalExplosuretoOtotoxicDrugs: [...prevValues.selectedMaternalExplosuretoOtotoxicDrugs, drug],
        }));
      } else {
        setFormValues(prevValues => ({
          ...prevValues,
          selectedMaternalExplosuretoOtotoxicDrugs: prevValues.selectedMaternalExplosuretoOtotoxicDrugs.filter(item => item !== drug),
        }));
      }
    } else {
      // For other fields
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
        selectedmaternalDiseases: name === 'maternalSevereDisease' && value === 'No' ? {} : prevValues.selectedmaternalDiseases,
      }));
    }
    // If the changed field is province, update the districts dropdown
    if (name === 'province') {
      const selectedProvinceData = rwandanProvincesData.find(province => province.name === value);
      setFormValues(prevValues => ({
        ...prevValues,
        district: '', // Reset district when province changes
      }));
      setFormValues(prevValues => ({
        ...prevValues,
        district: selectedProvinceData ? selectedProvinceData.districts[0] : '', // Set the first district of the selected province
      }));
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowButton(false); // Hide the button
    setShowLoader(true); 

    const requestData = {
      motherName: formValues.mothername,
      fatherName: formValues.fathername,
      maritalStatus: formValues.maritalStatus,
      phoneContact: formValues.phonecontact,
      province: formValues.province,
      district: formValues.district,
      dateOfBirth: formValues.dateOfBirth,
      ageOfNewborn: formValues.ageOfNewborn,
      sex: formValues.sex,
      modeOfDelivery: formValues.modeOfDelivery,
      APGARSCOREAtBirth: formValues.APGARSCOREAtBirth,
      weightAtBirth: formValues.weightAtBirth,
      neonatalInfectionRisk: formValues.neonatalInfectionRisk,
      maternalSevereDisease: formValues.maternalSevereDisease,
      selectedmaternalDiseases: JSON.stringify(formValues.selectedmaternalDiseases),
      historyOfMaternalAlcoholUseAndSmoking: formValues.historyOfMaternalAlcoholUseAndSmoking,
      selectedhistoryOfMaternalAlcoholUseAndSmoking: formValues.selectedhistoryOfMaternalAlcoholUseAndSmoking,
      maternalExplosureToOtotoxicDrugs: formValues.maternalExplosureToOtotoxicDrugs,
      selectedMaternalExplosuretoOtotoxicDrugs: JSON.stringify(formValues.selectedMaternalExplosuretoOtotoxicDrugs),
      newbornPositionInTheFamily: formValues.newbornPositionInTheFamily,
      presenceOfEarDysmorphism: formValues.presenceOfEarDysmorphism,
      historyOfHearingLossAmongFamilyMembers: formValues.historyOfHearingLossAmongFamilyMembers,
      OAEResult: formValues.OAEResult,

      // Add the rest of the form fields here based on the provided API request
    };

    try {
      const authToken = localStorage.getItem('authToken');

      const response = await fetch('https://hblab.rw/DataCollection/API/newBorns/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization token if required
          'Authorization': `Bearer ${authToken}` // Include the token in the Authorization header
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Form submitted successfully');
        setShowButton(true);
        setShowLoader(false);
        setShowSuccessMessage(true);
        setShowFailureMessage(false);
        setSuccessMessage(data.message || 'Health Center Registed!');
        setFormValues({
          mothername: '',
    fathername: '',
    maritalStatus: '',
    phonecontact: '',
    province: '',
    district: '',
    dateOfBirth: '',
    ageOfNewborn: '',
    sex: '',
    modeOfDelivery: '',
    APGARSCOREAtBirth: '',
    weightAtBirth: '',
    neonatalInfectionRisk: '',
    maternalSevereDisease: '',
    selectedmaternalDiseases: '',
    historyOfMaternalAlcoholUseAndSmoking: '',
    selectedhistoryOfMaternalAlcoholUseAndSmoking: '',
    maternalExplosureToOtotoxicDrugs: '',
    selectedMaternalExplosuretoOtotoxicDrugs: '',
    newbornPositionInTheFamily: '',
    presenceOfEarDysmorphism: '',
    historyOfHearingLossAmongFamilyMembers: '',
    OAEResult: ''
        });
      } else {
        // Handle error response from API
        console.error('Form submission failed:', response.statusText);
        setShowFailureMessage(true);
        setShowSuccessMessage(false);
        setShowButton(true);
        setShowLoader(false);
        setErrorMessage(data.message || 'Failed to register');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Form submission error:', error);
      setShowFailureMessage(true);
        setShowSuccessMessage(false);
        setErrorMessage('Form submission error:', error);
        setShowButton(true);
       setShowLoader(false);
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const closeFailureMessage = () => {
    setShowFailureMessage(false);
  };

    return (
      <>
      <div className="rounded-t  mb-0 px-6 py-6">
                   {/* Success message */}
     {showSuccessMessage && (
       <div className="border-dotted px-4 py-3 border-2 border-sky-500 text-sm text-primary bg-green-100 text-center flex justify-between" >
          <p className='items-center flex'><i className='mr-2'><Icon icon="dashicons:saved" /></i>{SuccessMessage}</p>
          <button onClick={closeSuccessMessage}><Icon icon="bytesize:close" /></button>
        </div>
      )}

      {/* Failure message */}
      {showFailureMessage && (
        <div className="border-dotted px-4 py-3 border-2 border-red-500 text-sm text-red-500 text-center flex justify-between" >
          <p className='items-center flex'><i className='mr-2'><Icon icon="bx:error-alt" /></i>{errorMessage}</p>
          <button onClick={closeFailureMessage}><Icon icon="bytesize:close" /></button>
        </div>
      )}
          <div className="text-center flex justify-between">
            <h4 className="text-lg font-bold text-primary">Formulaire d&apos;inscription des étudiants</h4>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form id="registrationForm" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label htmlFor="mother's name" className="block text-sm font-medium text-gray-700">Établissement choisi</label>
                  <input
        type="text"
        className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
        id="mothername"
        name="mothername"
        placeholder="Rechercher un établissement"
        value={formValues.mothername}
        onChange={handleChange}
        required
      />                </div>
                <div className="col-span-1">
                  <label htmlFor="father's name" className="block text-sm font-medium text-gray-700">Nom*</label>
                  <input
        type="text"
        className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
        id="mothername"
        name="fathername"
        placeholder="Nom"
        value={formValues.fathername}
        onChange={handleChange}
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
        value={formValues.fathername}
        onChange={handleChange}
        required
      /> 
                </div>
                <div className="col-span-1">
                  <label htmlFor="father's name" className="block text-sm font-medium text-gray-700">Prénom*</label>
                  <input type="text" 
                  placeholder="Prénom"
                   value={formValues.phonecontact}
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="phoneconract" 
                  name="phonecontact" required />
                </div>

                
                <div className="col-span-1">
        <label htmlFor="province" className="block text-sm font-medium text-gray-700">Lieu de Naissance*</label>
        <input type="text" 
                  placeholder="Lieu de Naissance"
                   value={formValues.phonecontact}
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="phoneconract" 
                  name="phonecontact" required />
      </div>
      <div className="col-span-1">
        <label htmlFor="district" className="block text-sm font-medium text-gray-700">Date de naissance *</label>
        <input type="date" 
                   value={formValues.dateOfBirth}
                    placeholder="Date de naissance (ex: 11/09/1996)"
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="Date of Birth" 
                  name="dateOfBirth" required />
      </div>
     
   
                

                <div className="col-span-1">
                  <label htmlFor="Date of Birth" className="block text-sm font-medium text-gray-700">Téléphone *</label>
                  <input type="text" 
                   value={formValues.dateOfBirth}
                   placeholder="Téléphone"
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="Date of Birth" 
                  name="dateOfBirth" required />
                </div>
                <div className="col-span-1">
                  <label htmlFor="Sex" className="block text-sm font-medium text-gray-700">Sexe</label>
                  <select 
                   value={formValues.sex}
                   onChange={handleChange}
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
                   value={formValues.ageOfNewborn}
                   placeholder="Etat-Civil"
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="Age of the Newborn" 
                  name="ageOfNewborn" required />
                </div>
                <div className="col-span-1">
                  <label htmlFor="Mode of Delivery" className="block text-sm font-medium text-gray-700">Nationalité*</label>
                  <input type="text"
                   value={formValues.ageOfNewborn}
                   placeholder="Nationalité"
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" id="Age of the Newborn" 
                  name="ageOfNewborn" required />
                </div>
                <div className="col-span-1">
                  <label htmlFor="APGAR SCORE at Birth at 5th Minute" className="block text-sm font-medium text-gray-700">Province d&apos;origine *</label>
                  <input type="text"
                   value={formValues.APGARSCOREAtBirth}
                   placeholder="Province d&apos;origine"
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" 
                  name="APGARSCOREAtBirth" required />
                 </div>
                <div className="col-span-1">
                  <label htmlFor="Weight at Birth" className="block text-sm font-medium text-gray-700">Adresse Physique *</label>
                  <input type="number"
                   value={formValues.weightAtBirth}
                    placeholder="Adresse Physique"
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" 
                  name="weightAtBirth" required />
                  </div>
                <div className="col-span-1">
                  <label htmlFor="Neonatal Infection Risk" className="block text-sm font-medium text-gray-700">Faculté</label>
                  <select 
                   value={formValues.neonatalInfectionRisk}
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"  
                  name="neonatalInfectionRisk" required>
                    <option></option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="col-span-1">
        <label htmlFor="maternalSevereDisease" className="block text-sm font-medium text-gray-700">Département</label>
        <select
          value={formValues.maternalSevereDisease}
          onChange={handleChange}
          className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
          name="maternalSevereDisease"
          required
        >
          <option></option>
          <option>Yes</option>
          <option>No</option>
        </select>
     
      {formValues.maternalSevereDisease === 'Yes' && (
  <>
    <label htmlFor="maternalDiseases" className="block text-sm font-medium text-gray-700">Select Maternal/Neonatal Diseases:</label>
    <div className="space-y-2">
      {[
        'Congenital Cytomegalovirus',
        'Congenital Rubella',
        'Congenital Toxoplasmosis',
        'Herpes SimplexVirus',
        'Varicella Virus',
        'Meningitis',
        'Syphilis',
        'Mumps',
        'Diabetes',
        'Hyperbilirubinemia',
        'Anoxia',
        'Preeclampsia',
      ].map((maternalDisease, index) => (
        <div key={index} className="flex items-center">
          <input
            type="checkbox"
            id={`maternalDisease-${index}`}
            name="selectedmaternalDiseases" // Ensure the name is consistent for all checkboxes
            value={maternalDisease}
            checked={formValues.selectedmaternalDiseases[maternalDisease] || false}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <label htmlFor={`maternalDisease-${index}`} className="ml-2">
            {maternalDisease}
          </label>
        </div>
      ))}
    </div>
  </>
)}
      </div>

                

                <div className="col-span-1">
                  <label htmlFor="History of Maternal Alcohol Use and Smoking" className="block text-sm font-medium text-gray-700">Promotion</label>
                  <select 
                   value={formValues.historyOfMaternalAlcoholUseAndSmoking}
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                  name="historyOfMaternalAlcoholUseAndSmoking" required>
                    <option></option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  {formValues.historyOfMaternalAlcoholUseAndSmoking === 'Yes' && (
  <>
    <label htmlFor="maternalDiseases" className="block text-sm font-medium text-gray-700">Which History?</label>
    
    <select 
                   value={formValues.selectedhistoryOfMaternalAlcoholUseAndSmoking}
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                  name="selectedhistoryOfMaternalAlcoholUseAndSmoking" >
                    <option></option>
                    <option>Alcohol use only</option>
                    <option>Smoking only</option>
                    <option>Both alcohol use and smoking</option>
                  </select>
  </>
)}
                </div>
               
                <div className="col-span-1">
                  <label htmlFor="Weight at Birth" className="block text-sm font-medium text-gray-700">Apload photo</label>
                  <input type="file"
                   value={formValues.weightAtBirth}
                    placeholder="Adresse Physique"
                   onChange={handleChange}
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full" 
                  name="weightAtBirth" required />
                  </div>
                
                

          
              </div>
              {showSuccessMessage && (
       <div className="border-dotted m-2 px-4 py-3 border-2 border-sky-500 text-sm text-primary bg-green-100 text-center flex justify-between" >
          <p className='items-center flex'><i className='mr-2'><Icon icon="dashicons:saved" /></i>{SuccessMessage}</p>
          <button onClick={closeSuccessMessage}><Icon icon="bytesize:close" /></button>
        </div>
      )}

      {/* Failure message */}
      {showFailureMessage && (
        <div className="border-dotted px-4 py-3 border-2 border-red-500 text-sm text-red-500 text-center flex justify-between" >
          <p className='items-center flex'><i className='mr-2'><Icon icon="bx:error-alt" /></i>{errorMessage}</p>
          <button onClick={closeFailureMessage}><Icon icon="bytesize:close" /></button>
        </div>
      )}
              {showLoader && (
        <div className="loader mt-4 px-4 py-3 bg-primary text-white rounded-lg hover:bg-white hover:text-primary border border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"><Icon icon="svg-spinners:90-ring-with-bg" />Saving...</div>
      )}
 {showButton && (
        <button
          type="submit"
          className="mt-4 px-4 py-3 bg-primary text-white rounded-lg hover:bg-white hover:text-primary border border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
          onClick={handleSubmit}
        >
          <i className="mr-2">
            <Icon icon="dashicons:saved" />
          </i>Ajouter une nouvelle Étudiants
        </button>
      )}            </form>
        </div>
      </>
    )}