from flask import Flask, request, jsonify
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException

app = Flask(__name__)

# Set up RPC connection to Bitcoin Core (Signet)
rpc_user = 'pk'  # From bitcoin.conf
rpc_password = 'PK12'  # From bitcoin.conf
rpc_host = 'localhost'  # Bitcoin Core runs locally
rpc_port = 38332  # Correct port for Signet, based on your bitcoin.conf

rpc_url = f'http://{rpc_user}:{rpc_password}@{rpc_host}:{rpc_port}'
rpc_connection = AuthServiceProxy(rpc_url)

@app.route('/donate', methods=['POST'])
def donate():
    try:
        # Get data from the frontend (campaign address and donation amount)
        data = request.get_json()
        campaign_address = data['address']
        amount = float(data['amount'])

        if amount <= 0:
            return jsonify({'error': 'Invalid donation amount'}), 400

        # Send the donation via Bitcoin Core RPC
        txid = rpc_connection.sendtoaddress(campaign_address, amount)

        # Return the transaction ID to the frontend
        return jsonify({'txid': txid}), 200

    except JSONRPCException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
