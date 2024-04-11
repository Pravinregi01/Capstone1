import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import BarChart from './Chart';
import './BarChart.css';

const CropChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);
  const coconutAverageWeight = 1.4; // Average weight of 1 coconut in kilograms

  useEffect(() => {
    if (data && data.length > 0) {
      // Aggregate production values for each crop
      const cropProduction = data.reduce((acc, item) => {
        const cropName = item.Crop.S;
        let production = parseFloat(item.Production.S);
        let productionUnit = item.Production_Units.S.toLowerCase();

        // Check if the crop name contains "coconut" (case insensitive)
        if (cropName.toLowerCase().includes('coconut')) {
          productionUnit = 'coconut'; // Set production unit specifically for coconuts
        }

        // Convert production to tonnes if not already in tonnes
        if (productionUnit !== 'tonnes') {
          if (productionUnit === 'bales') {
            production *= 0.6; // Convert bales to tonnes
          } else if (productionUnit === 'nuts') {
            production *= 0.03; // Convert nuts to tonnes
          } else if (productionUnit === 'coconut') {
            production *= coconutAverageWeight / 1000; // Convert coconuts to tonnes
          }
        }

        if (acc[cropName]) {
          acc[cropName] += production;
        } else {
          acc[cropName] = production;
        }
        return acc;
      }, {});

      // Convert aggregated data to array format for CropChart component
      const labels = Object.keys(cropProduction);
      const values = Object.values(cropProduction);
      const chartData = { labels, values };
      setChartData(chartData);
    }
  }, [data]);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h2>Crop Production Chart (Tonnes)</h2>
            </Card.Header>
            <Card.Body>
              <div className="chartContainer">
                {chartData && (
                  <BarChart
                    labels={chartData.labels}
                    values={chartData.values}
                    chartTitle="Crop Production Chart (Tonnes)"
                    width={400}
                    height={300}
                    filterType="crop"
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CropChart;
