import { useState } from "react";
import { inspectPackage } from "../services/api";
import "../styles/Inspection.css";

function Inspection() {

  const [image, setImage]       = useState(null);        
  const [preview, setPreview]   = useState(null);        
  const [result, setResult]     = useState(null);        
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError("");
  };

  const handleInspect = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setError("");
    setResult(null);

    try {
      setLoading(true);
 
      const response = await inspectPackage(image);
      setResult(response.data);

    } catch (err) {
      if (err.request) {
        setError("Cannot reach ML service. Is Flask running on port 5000?");
      } else {
        setError("Inspection failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inspection-page">

      <h2>Package Inspection</h2>
      <p className="page-sub">
        Upload a package photo to check if it is damaged using the CNN model.
      </p>

      <div className="inspection-card">
        <h3>Upload Package Image</h3>
 
        <div className="upload-area">
          <p>Click below to select an image from your device</p>
          <label className="upload-label" htmlFor="file-input">
            Choose Image
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {image && (
            <p className="file-name">{image.name}</p>
          )}
        </div>
 
        {preview && (
          <div className="image-preview">
            <p>Preview</p>
            <img src={preview} alt="Package preview" />
          </div>
        )}

        <button
          className="inspect-btn"
          onClick={handleInspect}
          disabled={loading || !image}
        >
          {loading ? "Inspecting..." : "Inspect Package"}
        </button>
      </div>
 
      {loading && <p className="loading-text">Running CNN model, please wait...</p>}
      {error   && <p className="error-text">{error}</p>}
 
      {result && !loading && (
        <div className="result-card">
          <h3>Inspection Result</h3>

          <p className="result-filename">{result.filename}</p>
 
          <p className={`result-label ${result.result}`}>
            {result.result === "damaged" ? "⚠ Damaged" : "✓ Undamaged"}
          </p>

          <p className="result-confidence">
            Confidence: <span>{result.confidence_percent}%</span>
          </p>
        </div>
      )}

    </div>
  );
}

export default Inspection;
