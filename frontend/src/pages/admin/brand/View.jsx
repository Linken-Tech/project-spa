import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory from 'react-bootstrap-table2-paginator';

import brandData from "../../../assets/data/brandData";
import "../../../styles/common-section.css";
import { getBrands } from "../../../services/api/Provider";

const { SearchBar } = Search;

const columns = [
  {
    dataField: 'id',
    text: '#',
    sort: true,
    headerClasses: 'pointer'
  }, 
  {
    dataField: 'brand_name',
    text: 'Brand Name',
    sort: true,
    headerClasses: 'pointer'
  }, 
  {
    dataField: 'created',
    text: 'Created Date',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'updated',
    text: 'Modified Date',
    sort: true,
    headerClasses: 'pointer'
  },
  {
    dataField: 'action',
    text: 'Action',
    formatter: (cellContent, row) => {
      return (
        <div>
          <FiEdit className="text-primary btnEdit" role="button"/>
          <IoMdClose className="text-danger" role="button"/>
        </div>
      );
    }
  }
];

const defaultSorted = [{
  dataField: 'id',
  order: 'asc'
}];

const ViewBrands = () => { 
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    _getBrands();
 }, []);

 function _getBrands() {
  getBrands().then((res) => {
    let arr = res;
    setBrands(arr);
  });
}

  return(
    <section>
      <Container>
        <Row>
          <h2>Manage Brands</h2>
          <hr className="style1 text-secondary"></hr>
          <ToolkitProvider keyField="id" data={brands} columns={columns} search >
              {(props) => (
                <div>
                  <SearchBar srText='' {...props.searchProps} />
                  {"   "}
                  {"   "}
                  <button onClick={props.searchProps.onClear} className="btn btn-secondary btn-sm" style={{position: "relative", top: "-2px"}} > Clear </button>
                  <br />
                  <br />
                  <BootstrapTable
                    {...props.baseProps}
                    bootstrap4
                    defaultSorted={defaultSorted}
                    pagination={paginationFactory()}
                    striped
                    hover
                    condensed
                    noDataIndication={"no results found"}
                    headerClasses="noselect"
                  />
                </div>
              )}
            </ToolkitProvider>
          {/* <BootstrapTable 
            bootstrap4
            keyField='id' 
            data={ brands } 
            columns={ columns } 
            defaultSorted={ defaultSorted } 
            pagination={ paginationFactory() } 
            striped
            hover
            condensed
            noDataIndication={ 'no results found' }
            headerClasses="noselect"
          /> */}
        </Row>
      </Container>
    </section>
  )
}

export default ViewBrands;