import { useCallback } from 'react';
import { useWeb3Store } from '@/lib/store/web3Store';
import { ethers } from 'ethers';

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

  const handleConnect = useCallback(async () => {
    await connectWallet();
  }, [connectWallet]);

  const handleDisconnect = useCallback(() => {
    disconnectWallet();
  }, [disconnectWallet]);

  const handleSignMessage = useCallback(
    async (message: string) => {
      return await signMessage(message);
    },
    [signMessage],
  );

  const handleSwitchNetwork = useCallback(
    async (network: string) => {
      await switchNetwork(network);
    },
    [switchNetwork],
  );

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
