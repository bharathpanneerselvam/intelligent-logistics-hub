from flask import Blueprint, request, jsonify
from forecast import model as forecast_model

forecast_bp = Blueprint(
    'forecast',
    __name__
)

forecast_model.load()


@forecast_bp.route(
    '/forecast',
    methods=['POST']
)
def forecast():

    data = request.get_json()

    if not data or 'last_6_months' not in data:

        return jsonify({
            'error':
            'Please provide last_6_months'
        }), 400

    last_6_months = data['last_6_months']

    if not isinstance(last_6_months, list):

        return jsonify({
            'error':
            'last_6_months must be a list'
        }), 400

    if len(last_6_months) != 6:

        return jsonify({
            'error':
            'Exactly 6 values are required'
        }), 400

    try:

        last_6_months = [
            float(x)
            for x in last_6_months
        ]

    except ValueError:

        return jsonify({
            'error':
            'All values must be numbers'
        }), 400

    prediction = forecast_model.predict(
        last_6_months
    )

    return jsonify({
        'input': last_6_months,
        'forecast': prediction
    })