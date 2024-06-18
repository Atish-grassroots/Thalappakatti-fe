import Breadcrumb from "react-bootstrap/Breadcrumb";

const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/scheme/createcampaign" active>
        Create Campaign
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/assigncampaign">Assign Campaign</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadCrumb;
