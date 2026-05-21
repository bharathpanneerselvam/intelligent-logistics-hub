from flask import Flask
from flask_cors import CORS
from forecast.routes import forecast_bp
from inspection.routes import inspection_bp   # ✅ uncommented

# create the flask app
app = Flask(__name__)

# enable CORS so React frontend can call Flask from localhost:5173
CORS(app)

# register blueprints
app.register_blueprint(forecast_bp)
app.register_blueprint(inspection_bp)          # ✅ uncommented

# simple health check route
@app.route('/')
def home():
    return "ML Service is running!"


if __name__ == '__main__':
    app.run(debug=True, port=5000)
