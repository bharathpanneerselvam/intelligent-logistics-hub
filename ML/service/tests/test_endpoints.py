import pytest
import json
import io
import sys
import os

# add parent folder so we can import app
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# NOTE: these tests assume the models are already trained
# Run train_lstm.py and train_cnn.py before running tests

from app import app


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


# ── Forecast tests ──────────────────────────────────────

def test_forecast_returns_prediction(client):
    payload = {'last_10_days': [100, 110, 120, 115, 130, 125, 118, 122, 135, 128]}
    response = client.post('/forecast',
                           data=json.dumps(payload),
                           content_type='application/json')
    assert response.status_code == 200
    data = response.get_json()
    assert 'predicted_next_day_sales' in data


def test_forecast_rejects_wrong_length(client):
    # only 5 values instead of 10 — should fail
    payload = {'last_10_days': [100, 110, 120, 115, 130]}
    response = client.post('/forecast',
                           data=json.dumps(payload),
                           content_type='application/json')
    assert response.status_code == 400


def test_forecast_rejects_missing_body(client):
    response = client.post('/forecast',
                           data=json.dumps({}),
                           content_type='application/json')
    assert response.status_code == 400


# ── Inspection tests ─────────────────────────────────────

def test_inspect_rejects_no_image(client):
    # send request with no file attached
    response = client.post('/inspect')
    assert response.status_code == 400


def test_inspect_accepts_image(client):
    # create a tiny fake image (1x1 white pixel PNG)
    fake_image = (
        b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01'
        b'\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00'
        b'\x00\x0cIDATx\x9cc\xf8\x0f\x00\x00\x01\x01\x00\x05\x18'
        b'\xd8N\x00\x00\x00\x00IEND\xaeB`\x82'
    )
    data = {'image': (io.BytesIO(fake_image), 'test.png')}
    response = client.post('/inspect',
                           data=data,
                           content_type='multipart/form-data')
    # should get a real response (200) or a readable error — not a 500
    assert response.status_code in [200, 400]
