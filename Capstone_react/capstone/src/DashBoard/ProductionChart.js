import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import BarChart from './Chart'; 

const ProductionChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);
  const coconutAverageWeight = 1.4; // Average weight of 1 coconut in kilograms

  useEffect(() => {
    if (data && data.length > 0) {
      // Aggregate production values for each year and convert bales to tonnes
      const YearlyProduction = data.reduce((acc, item) => {
        const year = item.Year.S;
        let production = parseFloat(item.Production.S);
        let productionUnit = item.Production_Units.S.toLowerCase();

        //
        if (item.Crop.S.toLowerCase().includes('coconut')) {
          productionUnit = 'coconut'; 
        }

        // Convert production from bales to tonnes
        if (productionUnit !== 'tonnes') {
          if (productionUnit === 'bales') {
            production *= 0.6; // Convert bales to tonnes
          } else if (productionUnit === 'nuts') {
            production *= 0.03; // Convert nuts to tonnes
          } else if (productionUnit === 'coconut') {
            production *= coconutAverageWeight / 1000; // Convert coconuts to tonnes
          }
        }

        if (!acc[year]) {
          acc[year] = production; 
        } else {
          acc[year] += production;
        }
        return acc;
      }, {});

      const labels = Object.keys(YearlyProduction).sort();
      const values = Object.values(YearlyProduction);

      // Set chart data
      setChartData({ labels, values });
    }
  }, [data]);

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <h2>Yearly Production Chart of {data[0].State.S}</h2>
          <div className="chartContainer">
            <BarChart
              labels={chartData?.labels}
              values={chartData?.values}
              chartTitle="Production (tonnes)"
              width={400}
              height={300}
              filterType="year"
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductionChart;
