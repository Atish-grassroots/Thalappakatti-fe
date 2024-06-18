import { useEffect, useState } from "react";
import { Col, FormControl, Row, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import customerHook from "../CustomerManagement/hook";

const CustomersReport = (filterDate) => {
  const [{ getCustomerDetails }] = customerHook();

  const [customersDetails, setCustomersDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await getCustomerDetails("0");
      setCustomersDetails(response?.data?.message);
      setFilteredData(response?.data?.message);

      console.log(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setFilteredData(
      customersDetails.filter((item) =>
        item.CustomerName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, customersDetails]);
  useEffect(() => {
    if (
      !filterDate?.date ||
      !filterDate?.date[0] ||
      !filterDate?.date[1] ||
      !customersDetails
    ) {
      return;
    }

    const startfilterDateString = filterDate?.date[0].toISOString();
    const endfilterDateString = filterDate?.date[1].toISOString();

    const filteredData = customersDetails.filter((item) => {
      const salesStartDate = new Date(item.LoyaltyStartDate).toISOString();
      const salesEndDate = new Date(item.LoyaltyStartDate).toISOString();

      return (
        startfilterDateString <= salesEndDate &&
        endfilterDateString >= salesStartDate
      );
    });

    setFilteredData(filteredData);
  }, [filterDate, customersDetails]);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="table-responsive">
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6} lg={4}>
          <FormControl
            type="text"
            placeholder="Search by enterprise name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
          <h5>Customers Reports</h5>
            <tr>
              <th className="text-center d-sm-none d-md-table-cell">Customer Id</th>
              <th className="text-center">Enterprise Name</th>
              <th className="text-center d-sm-none d-md-table-cell">Type</th>
              <th className="text-center d-sm-none d-md-table-cell">City</th>
              <th className="text-center d-sm-none d-md-table-cell">State</th>
              <th className="text-center d-sm-none d-md-table-cell">Active</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, index) => (
              <tr key={item.CustomerId}>
                <td className="text-center d-sm-none d-md-table-cell">
                  {item.CustomerId}
                </td>
                <td className="text-center">{item.CustomerName}</td>
                <td className="text-center d-sm-none d-md-table-cell">
                  {item.CustomerType}
                </td>
                <td className="text-center d-sm-none d-md-table-cell">
                  {item.City}
                </td>
                <td className="text-center d-sm-none d-md-table-cell">
                  {item.State}
                </td>
                <td className="text-center">
                  {item.Active ? (
                    <span className="text-success">Yes</span>
                  ) : (
                    <span className="text-danger">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Row className="mt-3 align-items-center">
        <Col xs={12} md={2}>
          <FormControl
            as="select"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          >
            {[5, 10, 15, 20].map((perPage) => (
              <option key={perPage} value={perPage}>
                {perPage} per page
              </option>
            ))}
          </FormControl>
        </Col>
        <Col
          xs={12}
          md={10}
          className="d-flex justify-content-md-end mt-3 mt-md-0"
        >
          <PaginationControl
            className="justify-content-center justify-content-md-end"
            page={currentPage}
            between={4}
            total={filteredData.length}
            limit={itemsPerPage}
            changePage={(page) => setCurrentPage(page)}
            ellipsis={1}
          />
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default CustomersReport;
