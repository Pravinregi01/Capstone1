import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useTable, useSortBy, usePagination } from 'react-table';

const TableHeaders = () => {
  const allData = useSelector((state) => state.data) || [];
  const label = useSelector((state) => state.label);
  const filterByCrop = useSelector((state) => state.filterByCrop);
  const [filteredData, setFilteredData] = useState(allData); // Initialize with allData

  // Filter data based on label or filterByCrop values
  useEffect(() => {
    const filtered = allData.filter(item => {
      if (label && item.Year.S !== label) {
        return false; // Exclude items that don't match the label
      }
      if (filterByCrop && item.Crop.S !== filterByCrop) {
        return false; // Exclude items that don't match the filterByCrop
      }
      return true; // Include items that match the label or filterByCrop
    });

    setFilteredData(filtered);
  }, [allData, label, filterByCrop]); // Update when filters or allData change

  const columns = useMemo(
    () => [
      { Header: 'Year', accessor: 'Year.S', sortType: 'basic' },
      { Header: 'Crop', accessor: 'Crop.S', sortType: 'basic' },
      { Header: 'District', accessor: 'District.S', sortType: 'basic' },
      { Header: 'Area', accessor: 'Area.S', sortType: 'basic' },
      { Header: 'Production', accessor: 'Production.S', sortType: 'basic' },
      { Header: 'Yield', accessor: 'Yield.S', sortType: 'basic' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-3">Table Data</h2>
      <div className="table-responsive">
        <Table striped bordered hover {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-primary mr-3"   style={{ marginRight: '10px' }} onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <button className="btn btn-primary" onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TableHeaders;
