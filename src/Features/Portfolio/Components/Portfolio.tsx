import React, { useEffect, useState } from "react";
import "../SCSS/styles.css";
import { useUser } from "../../Context/UserContext";

interface Holding {
  schemeId: string;
  schemeName: string;
  schemeCategory: string;
  fundFamily: string;
  nav: number;
  units: number;
  currentValue: number;
}

interface PortfolioData {
  totalValue: number;
  lastUpdated: string;
  holdings: Holding[];
}

const API_URL = "http://localhost:8080/mfb/client/get-portfolio";
const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${API_URL}?clientId=${user?._id}`);
        const data = await response.json();
        if (data.status === "fetched") {
          setPortfolio(data.results);
        } else {
          throw new Error("Failed to fetch portfolio data");
        }
      } catch (err) {
        setError("Error fetching portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) return <p className="loading">Loading portfolio...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="portfolio-container">
      <h2 className="portfolio-title">My Portfolio</h2>
      <p className="portfolio-total">
        Total Investment Value:{" "}
        <strong>₹{portfolio?.totalValue.toFixed(2)}</strong>
      </p>
      <p className="portfolio-updated">
        Last Updated: {new Date(portfolio?.lastUpdated || "").toLocaleString()}
      </p>

      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Scheme Name</th>
            <th>Category</th>
            <th>Fund Family</th>
            <th>NAV (₹)</th>
            <th>Units</th>
            <th>Current Value (₹)</th>
          </tr>
        </thead>
        <tbody>
          {portfolio?.holdings.map((holding) => (
            <tr key={holding.schemeId}>
              <td>{holding.schemeName}</td>
              <td>{holding.schemeCategory}</td>
              <td>{holding.fundFamily}</td>
              <td>{holding.nav.toFixed(2)}</td>
              <td>{holding.units}</td>
              <td>{holding.currentValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
