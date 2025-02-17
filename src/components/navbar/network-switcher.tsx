import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWeb3 } from '@/hooks/useWeb3';
import { Network } from 'lucide-react';

/**
 * Network configurations with display names and chain IDs
 */
const NETWORKS = {
  AVALANCHE_TESTNET: {
    name: 'Avalanche Fuji Testnet',
    chainId: '0xa869',
  },
} as const;

/**
 * Network switcher component that allows users to switch between supported networks.
 * Displays the current network and provides a dropdown to select a different network.
 *
 * @returns {JSX.Element} The rendered network switcher
 */
export function NetworkSwitcher() {
  const { address, chainId, switchNetwork } = useWeb3();

  console.log('chainId', chainId);

  const getCurrentNetwork = () => {
    if (!chainId) return 'Unknown Network';

    const currentChainId = chainId.toLowerCase();
    const entry = Object.entries(NETWORKS).find(
      ([_, network]) => network.chainId.toLowerCase() === currentChainId,
    );

    return entry ? entry[1].name : 'Unknown Network';
  };

  if (!address) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          <Network className="h-4 w-4 mr-2" />
          {getCurrentNetwork()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {Object.entries(NETWORKS).map(([key, network]) => (
          <DropdownMenuItem
            key={network.chainId}
            onClick={() => switchNetwork(key)}
            className="cursor-pointer"
          >
            {network.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
