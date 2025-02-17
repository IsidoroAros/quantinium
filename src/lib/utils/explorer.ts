/**
 * Get the block explorer URL for a given chain ID
 * @param chainId The chain ID in hex format
 * @returns The block explorer base URL
 */
export const getExplorerUrl = (chainId: string | null) => {
  switch (chainId?.toLowerCase()) {
    case '0xa869':
      return 'https://testnet.snowtrace.io';
    default:
      return '';
  }
};