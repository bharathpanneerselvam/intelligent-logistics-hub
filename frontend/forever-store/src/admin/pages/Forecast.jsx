import { useState } from "react";
import { predictSales } from "../services/api";
import "../styles/Forecast.css";

function Forecast() {
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const handleReset = () => {
    setInputs(Array(6).fill(""));
    setResult(null);
    setError("");
  };

  const handlePredict = async () => {
    setError("");
    setResult(null);

    if (inputs.some((val) => val === "")) {
      setError("Please fill all 6 fields.");
      return;
    }

    const numbers = inputs.map(Number);

    if (numbers.some((n) => isNaN(n))) {
      setError("All fields must be valid numbers.");
      return;
    }

    try {
      setLoading(true);

      const response = await predictSales(numbers);

      setResult(response.data.forecast);
    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.error || "Prediction failed.");
      } else {
        setError("Cannot connect to ML service on port 5000.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forecast-page">
      <h2>Revenue Forecast</h2>

      <p className="page-sub">
        Enter last 6 months revenue to predict next 2 months.
      </p>

      <div className="forecast-card">
        <h3>Last 6 Months Revenue</h3>

        <div className="forecast-form">
          {inputs.map((value, index) => (
            <input
              key={index}
              type="number"
              placeholder={`Month ${index + 1}`}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>

        <div className="button-group">
          <button onClick={handlePredict} disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </button>

          <button onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </div>

      {loading && <p className="loading-text">Calling ML model...</p>}

      {error && <p className="error-text">{error}</p>}

      {result && !loading && (
        <div className="result-card">
          <h3>Forecast Results</h3>

          <p className="result-value">
            Next Month: <b>{result.next_month_revenue}</b> units
          </p>

          <p className="result-value">
            Second Month: <b>{result.second_month_revenue}</b> units
          </p>
        </div>
      )}
    </div>
  );
}

export default Forecast;