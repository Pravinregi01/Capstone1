import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Chart from 'chart.js/auto';
import { setFilterByYear, setFilterByCrop } from '../Redux/actions'; // Import your action creators
import { useSelector } from 'react-redux';

const BarChart = ({ labels, values, chartTitle, width, height, filterType }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const dispatch = useDispatch();
  const filterByYear = useSelector((state) => state.label); // Assuming Redux state for filter by year
  const filterByCrop = useSelector((state) => state.filterByCrop); // Assuming Redux state for filter by crop

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      try {
        if (chartInstance) {
          chartInstance.destroy();
        }

        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: chartTitle,
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
              },
            },
            onClick: (event, elements) => {
              handleBarClick(event, elements);
            },
          },
        });

        setChartInstance(chart);
      } catch (error) {
        console.error('Error creating chart:', error);
      }
    }
  }, [labels, values, chartTitle, dispatch]);

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedLabel = labels[clickedIndex];

      if (filterType === 'year') {
        dispatch(setFilterByYear(clickedLabel)); // Dispatch the action to update Redux state for filter by year
      } else if (filterType === 'crop') {
        dispatch(setFilterByCrop(clickedLabel)); // Dispatch the action to update Redux state for filter by crop
      }
    }
  };

  useEffect(() => {
    console.log('Filtered Data:', values); // Log the filtered data
  }, [values]);

  useEffect(() => {
    console.log('Filter By Crop:', filterByCrop); // Log the filter by crop
  }, [filterByCrop]);
  useEffect(() => {
    console.log('Filter By Year:', filterByYear); // Log the filter by year
  }, [filterByYear]);

  return <canvas ref={chartContainer} width={width} height={height} />;
};

export default BarChart;
