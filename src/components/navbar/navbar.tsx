// React + Next
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import { Button } from '@/components/ui/button';
import { NetworkSwitcher } from './network-switcher';

// Hooks
import { useWeb3 } from '@/hooks/useWeb3';

// Others
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Navigation bar component that displays the application logo, network switcher,
 * and wallet connection status. Provides functionality to connect/disconnect a Web3 wallet.
 *
 * @returns {JSX.Element} The rendered navigation bar
 */
export function Navbar() {
  const { address, isConnecting, connect, disconnect } = useWeb3();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [previousAddress, setPreviousAddress] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  console.log('isOpen', isMenuOpen);

  // Monitor wallet changes
  useEffect(() => {
    if (previousAddress !== address) {
      setPreviousAddress(address);
      // If we're on the transactions page and the wallet changes or disconnects,
      // reset the form state by navigating to the page again
      if (window.location.pathname === '/transactions')
        navigate('/transactions', { replace: true });
    }
  }, [address, previousAddress, navigate]);

  return (
    <nav className="border-b w-full z-20">
      <div className="flex h-16 items-center px-4 max-w-[1240px] mx-auto">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="../../../public/img/logo.png"
              alt="Quantinium"
              className="h-10 w-10"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex ml-8 space-x-4">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to="/transactions"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Transactions
          </Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:block">
            <NetworkSwitcher />
          </div>
          <div className="hidden md:block">
            {address ? (
              <Button variant="outline" onClick={disconnect}>
                {address.slice(0, 6)}...{address.slice(-4)}
              </Button>
            ) : (
              <Button onClick={connect} disabled={isConnecting}>
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white flex items-center justify-center p-0"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white fill-white" fill="white" />
            ) : (
              <Menu
                className="h-6 w-6 text-white fill-white z-30"
                fill="white"
              />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-x-0 top-16 bg-background border-b md:hidden transition-all duration-200 ease-in-out',
          isMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      >
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Link
              to="/"
              className="block text-sm text-muted-foreground hover:text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/transactions"
              className="block text-sm text-muted-foreground hover:text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Transactions
            </Link>
          </div>

          <div className="pt-4 border-t space-y-4">
            <NetworkSwitcher />
            {address ? (
              <Button variant="outline" onClick={disconnect} className="w-full">
                {address.slice(0, 6)}...{address.slice(-4)}
              </Button>
            ) : (
              <Button
                onClick={connect}
                disabled={isConnecting}
                className="w-full"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
