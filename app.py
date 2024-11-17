from flask import Flask, jsonify, request
import random
import json
from flask_cors import CORS
from datetime import datetime
import hashlib

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

# Path to store donation history
DONATION_HISTORY_FILE = 'donations_history.json'

# Path to store donor addresses
DONOR_ADDRESS_FILE = 'donor_addresses.json'

# Function to load donation history from file
def load_donations():
    try:
        with open(DONATION_HISTORY_FILE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []  # Return an empty list if no history file exists

# Function to save donation history to file
def save_donations(donations):
    with open(DONATION_HISTORY_FILE, 'w') as file:
        json.dump(donations, file, indent=4)

# Function to load donor addresses from file
def load_donor_addresses():
    try:
        with open(DONOR_ADDRESS_FILE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}  # Return an empty dictionary if no file exists

# Function to save donor addresses to file
def save_donor_addresses(addresses):
    with open(DONOR_ADDRESS_FILE, 'w') as file:
        json.dump(addresses, file, indent=4)

# Function to generate a pseudo-random Bitcoin-like address
def generate_random_address():
    random_data = str(random.getrandbits(256))
    sha256_hash = hashlib.sha256(random_data.encode()).hexdigest()
    return f"1{sha256_hash[:33]}"

# Endpoint to generate a unique address for a donor
@app.route('/generate-address', methods=['POST'])
def generate_address():
    data = request.get_json()
    donor_name = data.get('donor_name', 'Anonymous')  # Optional donor name

    # Load existing donor addresses
    donor_addresses = load_donor_addresses()

    # Check if the donor already has an address
    if donor_name in donor_addresses:
        return jsonify({
            "status": "success",
            "donor_name": donor_name,
            "address": donor_addresses[donor_name]
        })

    # Generate a new address
    new_address = generate_random_address()

    # Save the new address
    donor_addresses[donor_name] = new_address
    save_donor_addresses(donor_addresses)

    return jsonify({
        "status": "success",
        "donor_name": donor_name,
        "address": new_address
    })

# Endpoint to simulate donation
@app.route('/donate', methods=['POST'])
def donate():
    # Get the donation details from the request body
    data = request.get_json()
    campaign_address = data.get('campaign_address')
    donation_amount = data.get('donation_amount')
    donor_address = data.get('donor_address')  # Use the generated donor address

    # Simulate transaction ID (replace with real Bitcoin transaction later)
    txid = f"txid{random.randint(100000, 999999)}"

    # Get current donation history
    donations = load_donations()

    # Create donation record
    donation_record = {
        'campaign_address': campaign_address,
        'donation_amount': donation_amount,
        'donor_address': donor_address,
        'txid': txid,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    # Append the new donation record
    donations.append(donation_record)

    # Save the updated donation history to the file
    save_donations(donations)

    # Respond with the donation status and transaction ID
    return jsonify({
        "status": "success",
        "txid": txid,
        "message": f"Donation of {donation_amount} BTC to {campaign_address} was successful."
    })

# Endpoint to get donation history for a specific campaign
@app.route('/donations', methods=['GET'])
def get_donations():
    # Get the campaign address from the query parameters
    campaign_address = request.args.get('campaign_address')
    
    # Load donation history
    donations = load_donations()

    # Filter donations for the specified campaign address
    campaign_donations = [donation for donation in donations if donation['campaign_address'] == campaign_address]
    
    return jsonify(campaign_donations)

if __name__ == '__main__':
    app.run(debug=True)
