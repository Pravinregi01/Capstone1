import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductionChart from './ProductionChart';
import NavBar from '../HomePage/Nav';
import CropChart from './cropChart';
import { fetchDataAction } from '../Redux/actions'; // Assuming you have an action file
import Table from './Table';
import Spinner from 'react-bootstrap/Spinner'; // Import the Spinner component from React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const stateName = localStorage.getItem('selectedState'); // Get state name from local storage

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/fetch-data/${stateName}`); // Include state name in URL
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid content type. Expected JSON.');
      }
      const jsonData = await response.json();
      console.log('Fetched data:', jsonData);
      dispatch(fetchDataAction(jsonData)); // Dispatch action to store data in Redux
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Log the data from Redux
  console.log('Data from Redux:', data);

  return (
    <div>
      <NavBar />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <ProductionChart data={data} />
          <CropChart data={data} />
          <Table />
        </>
      )}
    </div>
  );
};

export default Dashboard;
