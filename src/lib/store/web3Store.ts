import { create } from 'zustand';
import { ethers } from 'ethers';

/**
 * Interface defining supported network configurations
 * Chain ID in hexadecimal format
 * Network name
 * Native currency symbol
 * RPC URL for the network
 * Block explorer URL
 */
interface NetworkConfig {
  chainId: string;
  chainName: string;
  symbol: string;
  rpcUrl: string;
  blockExplorerUrl: string;
}

/**
 * Supported network configurations
 */
const NETWORKS: { [key: string]: NetworkConfig } = {
  AVALANCHE_TESTNET: {
    chainId: '0xa869', // 43113 en decimal
    chainName: 'Avalanche Fuji Testnet', // Nombre exacto que usa Avalanche
    symbol: 'AVAX',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    blockExplorerUrl: 'https://testnet.snowtrace.io',
  },
};

/**
 * Interface defining the state and actions for Web3 functionality
 */
interface Web3State {
  /** Connected wallet address or null if not connected */
  address: string | null;
  /** Flag indicating if wallet connection is in progress */
  isConnecting: boolean;
  /** Current network chain ID */
  chainId: string | null;
  /** Ethereum provider instance */
  provider: ethers.BrowserProvider | null;
  /** JSON-RPC signer instance */
  signer: ethers.JsonRpcSigner | null;
  /** Error message if any operation fails */
  error: string | null;
  /** Function to initiate wallet connection */
  connectWallet: () => Promise<void>;
  /** Function to disconnect the wallet */
  disconnectWallet: () => void;
  /** Function to sign a message with the connected wallet */
  signMessage: (message: string) => Promise<string>;
  /** Function to switch networks */
  switchNetwork: (networkKey: keyof typeof NETWORKS) => Promise<void>;
  /** Function to setup network change listeners */
  setupNetworkListeners: () => void;
  /** Function to cleanup network listeners */
  cleanupNetworkListeners: () => void;
  /** Function to send a transaction */
  sendTransaction: (
    to: string,
    value: string,
  ) => Promise<ethers.TransactionResponse>;
}

/**
 * Converts a number to a hexadecimal string with '0x' prefix
 */
const toHex = (num: number) => '0x' + num.toString(16);

/**
 * Zustand store for managing Web3 state and operations.
 * Handles wallet connection, disconnection, and message signing.
 */
export const useWeb3Store = create<Web3State>((set, get) => {
  /**
   * Updates the provider and signer after network changes
   */
  const updateProviderAndSigner = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      console.log('network', network);
      const chainId = toHex(Number(network.chainId));
      set({ provider, signer, chainId });
    }
  };

  /**
   * Handler for network change events
   */
  const handleNetworkChange = async (chainIdHex: string) => {
    const chainId = chainIdHex.toLowerCase();
    set({ chainId });
    await updateProviderAndSigner();
  };

  /**
   * Handler for account change events
   */
  const handleAccountsChange = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      get().disconnectWallet();
    } else {
      set({ address: accounts[0] });
    }
  };

  return {
    address: null,
    isConnecting: false,
    chainId: null,
    provider: null,
    signer: null,
    error: null,

    /**
     * Sets up event listeners for network and account changes
     */
    setupNetworkListeners: () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('chainChanged', handleNetworkChange);
        window.ethereum.on('accountsChanged', handleAccountsChange);
      }
    },

    /**
     * Removes event listeners for network and account changes
     */
    cleanupNetworkListeners: () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('chainChanged', handleNetworkChange);
        window.ethereum.removeListener('accountsChanged', handleAccountsChange);
      }
    },

    /**
     * Initiates a connection to the user's Web3 wallet.
     * Requires MetaMask or similar Web3 provider to be installed.
     *
     * @throws {Error} If MetaMask is not installed or user rejects connection
     */
    connectWallet: async () => {
      if (typeof window.ethereum === 'undefined') {
        set({ error: 'Please install MetaMask to use this feature!' });
        return;
      }

      set({ isConnecting: true, error: null });

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        const chainId = toHex(Number(network.chainId));

        // Setup network listeners after successful connection
        get().setupNetworkListeners();

        set({ provider, signer, address, chainId, isConnecting: false });
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : 'Failed to connect wallet',
          isConnecting: false,
        });
      }
    },

    /**
     * Disconnects the currently connected wallet and resets the store state.
     */
    disconnectWallet: () => {
      // Cleanup network listeners before disconnecting
      get().cleanupNetworkListeners();

      set({
        address: null,
        chainId: null,
        provider: null,
        signer: null,
        error: null,
      });
    },

    /**
     * Signs a message using the connected wallet.
     *
     * @param message - The message to sign
     * @returns A promise that resolves to the signed message
     * @throws {Error} If no wallet is connected or signing fails
     */
    signMessage: async (message: string) => {
      const { signer } = get();

      if (!signer) {
        throw new Error('No wallet connected');
      }

      try {
        return await signer.signMessage(message);
      } catch (err) {
        const error =
          err instanceof Error ? err.message : 'Failed to sign message';
        set({ error });
        throw new Error(error);
      }
    },

    /**
     * Switches the connected wallet to the specified network.
     * Attempts to add the network if it doesn't exist in the wallet.
     *
     * @param networkKey - Key of the network to switch to
     * @throws {Error} If network switch fails or wallet is not connected
     */
    switchNetwork: async (networkKey: keyof typeof NETWORKS) => {
      const network = NETWORKS[networkKey];
      if (!network) {
        throw new Error('Invalid network');
      }

      try {
        // Primero intenta cambiar a la red
        await window.ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: network.chainId }],
        });
      } catch (error: any) {
        // Si la red no existe (código 4902), intenta agregarla
        if (error.code === 4902) {
          try {
            console.log('Adding network to wallet...', network);
            await window.ethereum?.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: network.chainId,
                  chainName: network.chainName,
                  nativeCurrency: {
                    name: network.symbol,
                    symbol: network.symbol,
                    decimals: 18,
                  },
                  rpcUrls: [network.rpcUrl],
                  blockExplorerUrls: [network.blockExplorerUrl],
                },
              ],
            });
          } catch (addError) {
            console.error('Error adding network:', addError);
            const error = 'Failed to add network to wallet';
            set({ error });
            throw new Error(error);
          }
        } else {
          console.error('Error switching network:', error);
          const errorMsg = 'Failed to switch network';
          set({ error: errorMsg });
          throw new Error(errorMsg);
        }
      }

      // Espera a que la red se actualice completamente
      await updateProviderAndSigner();
    },

    /**
     * Sends a transaction on the current network.
     *
     * @param to - Recipient address
     * @param value - Amount to send in wei
     * @returns A promise that resolves to the transaction response
     * @throws {Error} If no wallet is connected or transaction fails
     */
    sendTransaction: async (to: string, value: string) => {
      const { signer } = get();

      if (!signer) {
        throw new Error('No wallet connected');
      }

      try {
        const tx = await signer.sendTransaction({
          to,
          value: ethers.parseEther(value),
        });
        return tx;
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : 'Transaction failed';
        set({ error: errorMsg });
        throw new Error(errorMsg);
      }
    },
  };
});
