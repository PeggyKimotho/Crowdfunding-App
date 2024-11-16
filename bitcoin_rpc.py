from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException

class BitcoinRPC:
    def __init__(self, rpc_user, rpc_password, rpc_host, rpc_port):
        self.rpc_connection = AuthServiceProxy(f'http://{rpc_user}:{rpc_password}@{rpc_host}:{rpc_port}')
    
    def create_wallet(self, wallet_name):
        try:
            # Bitcoin Core's RPC call to create a new wallet
            wallet_info = self.rpc_connection.createwallet(wallet_name)
            return wallet_info
        except JSONRPCException as e:
            return {"error": str(e)}

    def send_transaction(self, address, amount):
        try:
            # Sending a Bitcoin transaction
            tx_id = self.rpc_connection.sendtoaddress(address, amount)
            return tx_id
        except JSONRPCException as e:
            return None
