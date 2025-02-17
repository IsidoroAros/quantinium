import { useCallback } from 'react';
import { useWeb3Store } from '@/lib/store/web3Store';
// import { ethers } from 'ethers';

/**
 * Custom hook for accessing Web3 functionality throughout the application.
 * Provides memoized functions for wallet operations and access to Web3 state.
 *
 * @returns {Object} Object containing Web3 state and functions
 * @property {string | null} address - Connected wallet address or null if not connected
 * @property {string | null} chainId - Current network chain ID
 * @property {boolean} isConnecting - Flag indicating if wallet connection is in progress
 * @property {string | null} error - Error message if any operation fails
 * @property {() => Promise<void>} connect - Function to connect wallet
 * @property {() => void} disconnect - Function to disconnect wallet
 * @property {(message: string) => Promise<string>} signMessage - Function to sign a message
 * @property {(network: string) => Promise<void>} switchNetwork - Function to switch networks
 * @property {(to: string, value: string) => Promise<ethers.TransactionResponse>} sendTransaction - Function to send a transaction
 */
export function useWeb3() {
  const {
    address,
    chainId,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    signMessage,
    switchNetwork,
    sendTransaction,
  } = useWeb3Store();

  /**
   * Memoized callback to handle wallet connection.
   * Attempts to connect the wallet using the connectWallet function.
   *
   * @returns {Promise<void>} A promise that resolves when the wallet is connected
   */
  const handleConnect = useCallback(async () => {
    await connectWallet();
  }, [connectWallet]);

  /**
   * Memoized callback to handle wallet disconnection.
   * Disconnects the currently connected wallet.
   */
  const handleDisconnect = useCallback(() => {
    disconnectWallet();
  }, [disconnectWallet]);

  /**
   * Memoized callback to handle message signing.
   * Signs a message using the connected wallet.
   *
   * @param {string} message - The message to be signed
   * @returns {Promise<string>} A promise that resolves to the signature
   */
  const handleSignMessage = useCallback(
    async (message: string) => {
      return await signMessage(message);
    },
    [signMessage],
  );

  /**
   * Memoized callback to handle network switching.
   * Switches the connected wallet to the specified network.
   *
   * @param {string} network - The network identifier to switch to
   * @returns {Promise<void>} A promise that resolves when the network is switched
   */
  const handleSwitchNetwork = useCallback(
    async (network: string) => {
      await switchNetwork(network);
    },
    [switchNetwork],
  );

  /**
   * Memoized callback to handle transaction sending.
   * Sends a transaction with the specified recipient and value.
   *
   * @param {string} to - The recipient address
   * @param {string} value - The amount of native tokens to send
   * @returns {Promise<TransactionResponse>} A promise that resolves to the transaction response
   */
  const handleSendTransaction = useCallback(
    async (to: string, value: string) => {
      return await sendTransaction(to, value);
    },
    [sendTransaction],
  );

  return {
    address,
    chainId,
    isConnecting,
    error,
    connect: handleConnect,
    disconnect: handleDisconnect,
    signMessage: handleSignMessage,
    switchNetwork: handleSwitchNetwork,
    sendTransaction: handleSendTransaction,
  };
}
