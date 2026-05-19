import { useState } from "react";
import { predictSales } from "../services/api";
import "../styles/Forecast.css";

function Forecast() {

  const [inputs, setInputs]   = useState(Array(10).fill(""));
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const handleReset = () => {
    setInputs(Array(10).fill(""));
    setResult(null);
    setError("");
  };

  const handlePredict = async () => {
    setError("");
    setResult(null);
 
    if (inputs.some((val) => val === "")) {
      setError("Please fill all 10 fields.");
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
      setResult(response.data.predicted_next_day_sales);

    } catch (err) {
      if (err.request) {
        setError("Cannot reach ML service. Is Flask running on port 5000?");
      } else {
        setError("Prediction failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forecast-page">

      <h2>Sales Forecast</h2>
      <p className="page-sub">
        Enter the last 10 days of sales figures to predict the next day.
      </p>
 
      <div className="forecast-card">
        <h3>Sales Data — Last 10 Days</h3>

        <div className="forecast-form">
          {inputs.map((value, index) => (
            <input
              key={index}
              type="number"
              placeholder={`Day ${index + 1}`}
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
 
      {loading && <p className="loading-text">Calling ML model, please wait...</p>}
      {error   && <p className="error-text">{error}</p>}
 
      {result !== null && !loading && (
        <div className="result-card">
          <h3>Predicted Next Day Sales</h3>
          <p className="result-value">{result} units</p>
        </div>
      )}

    </div>
  );
}

export default Forecast;
