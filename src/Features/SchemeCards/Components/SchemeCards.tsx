import React, { useEffect, useState } from "react";
import "../SCSS/styles.css";
import { useUser } from "../../Context/UserContext";
import axios from "axios";

interface Ifunds {
  _id: string;
  Scheme_Code: number;
  ISIN_Div_Payout_ISIN_Growth: string;
  ISIN_Div_Reinvestment: string;
  Scheme_Name: string;
  Net_Asset_Value: number;
  Date: Date;
  Scheme_Type: string;
  Scheme_Category: string;
  Mutual_Fund_Family: string;
}

const FETCH_FUNDS_API = "http://localhost:8080/mfb/mutual-funds/fetch-funds";
const PAGINATED_FUNDS_API =
  "http://localhost:8080/mfb/mutual-funds/get-paginated-funds";

function SchemeCards() {
  const [schemesData, setSchemesData] = useState<{
    funds: Ifunds[];
    total: number;
    totalPages: number;
  }>({
    funds: [],
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [isFecthed, setIsFetched] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchAndStoreFunds = async () => {
      try {
        // Fetch & store funds in MongoDB
        const fetchResponse: any = await fetch(FETCH_FUNDS_API);
        const fetchData = await fetchResponse.json();
        console.log(fetchData, "fetchData");
        setIsFetched(true);
      } catch (err) {
        setError("Error fetching funds");
        setLoading(false);
      }
    };
    if (user?._id) {
      fetchAndStoreFunds();
    }
  }, [user?._id]);

  useEffect(() => {
    const fetchPaginatedFunds = async () => {
      setLoading(true);
      try {
        const response: any = await fetch(
          `${PAGINATED_FUNDS_API}?pageNum=${page}&sort=${-1}&limit=${limit}`
        );
        const responseData = await response.json();
        setSchemesData(responseData.results);
      } catch (err) {
        setError("Error fetching paginated data");
      } finally {
        setLoading(false);
      }
    };
    if (isFecthed) {
      fetchPaginatedFunds();
    }
  }, [page, limit, isFecthed]);
  const addToPortfolio = async (schemeId: string) => {
    try {
      const response: any = await axios.post(
        "http://localhost:8080/mfb/client/add-scheme-portfolio",
        {
          schemeId: schemeId,
          clientId: user?._id,
        }
      );
      alert("Added successfully!");
    } catch (error: any) {
      console.error("Login Error:", error);
      const errMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error?.message ||
        "An error occurred during login. Please try again.";
      alert(errMessage);
    }
  };
  if (loading) return <p className="loading">Loading schemes...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  function pagination() {
    return (
      <div className="footer-pagination">
        <div className="pagination-header">Rows per page:</div>
        <div className="dropdown-container">
          <select
            className="rows-per-page-dropdown"
            value={limit}
            onChange={(e) => setPage(1)}
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="no-pages-container">
          Page {page} of {schemesData.totalPages}
        </div>
        <div className="arrows-container">
          <button
            className={page <= 1 ? "disabled" : "enabled"}
            onClick={() => !(page <= 1) && setPage(page - 1)}
            disabled={page <= 1}
          >
            ◀ Previous
          </button>
          <button
            className={page >= schemesData.totalPages ? "disabled" : "enabled"}
            onClick={() =>
              !(page >= schemesData.totalPages) && setPage(page + 1)
            }
            disabled={page >= schemesData.totalPages}
          >
            Next ▶
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="scheme-container">
      {schemesData?.funds?.map((scheme) => (
        <div key={scheme.Scheme_Code} className="scheme-card">
          <h2 className="scheme-title">{scheme.Scheme_Name}</h2>
          <p className="scheme-category">Category: {scheme.Scheme_Category}</p>
          <p className="scheme-nav">
            NAV: <strong>₹{scheme.Net_Asset_Value}</strong>
          </p>
          <p className="scheme-date">
            Date: {new Date(scheme.Date).toLocaleDateString()}
          </p>
          <button
            className="scheme-button"
            onClick={() => addToPortfolio(scheme._id)}
          >
            ➕ Add to Portfolio
          </button>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="pagination">{pagination()}</div>
    </div>
  );
}

export default SchemeCards;
