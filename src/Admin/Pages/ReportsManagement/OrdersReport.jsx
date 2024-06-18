import { useEffect, useState } from "react";
import { Col, FormControl, Row, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import useSales from "../Sales/hook";

const OrdersReport = (filterDate) => {
  console.log(filterDate, "filterDate");
  const [{ getSales }] = useSales();
  const [ordersReport, setOrdersReport] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await getSales(0, 10, 0, 0).then((response) => {
        setOrdersReport(response?.data?.message);
        setFilteredData(response?.data?.message);
      });

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
      ordersReport.filter((item) =>
        item.CustomerName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, ordersReport]);
  useEffect(() => {
    if (
      !filterDate?.date ||
      !filterDate?.date[0] ||
      !filterDate?.date[1] ||
      !ordersReport
    ) {
      return;
    }

    const startfilterDateString = filterDate?.date[0].toISOString();
    const endfilterDateString = filterDate?.date[1].toISOString();
    console.log(startfilterDateString, endfilterDateString);
    const filteredData = ordersReport.filter((item) => {
      const salesStartDate = new Date(item.SalesDate).toISOString();
      const salesEndDate = new Date(item.SalesDate).toISOString();
      console.log(salesStartDate, salesEndDate);
      return (
        startfilterDateString <= salesEndDate &&
        endfilterDateString >= salesStartDate
      );
    });

    setFilteredData(filteredData);
  }, [filterDate, ordersReport]);
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
        <Table striped bordered hover className="text-center">
          <thead>
            <h4 className="fw-bold">Orders Report </h4>
            <tr>
              <th>Enterprise ID</th>
              <th>Enterprise Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th> Sales Date</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <tr>
                <td>{item.CustomerId}</td>
                <td>{item.CustomerName}</td>
                <td>{item.Quantity}</td>
                <td>{item.UnitPrice}</td>
                <td>{item.TotalPrice}</td>

                <td>
                  {item.SalesDate &&
                    new Date(item.SalesDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
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

export default OrdersReport;
