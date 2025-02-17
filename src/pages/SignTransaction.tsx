import { useEffect } from 'react';
import { useWeb3 } from '@/hooks/useWeb3';
import { useSignStore } from '@/lib/store/signStore';
import { getExplorerUrl } from '@/lib/utils/explorer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Wallet, AlertCircle, ExternalLink, Send } from 'lucide-react';

export function SignTransaction() {
  const {
    address,
    chainId,
    connect,
    isConnecting,
    signMessage,
    sendTransaction,
  } = useWeb3();
  const {
    message,
    signature,
    isLoading,
    error,
    setMessage,
    setSignature,
    setIsLoading,
    setError,
    reset,
  } = useSignStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const handleSignMessage = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const sig = await signMessage(message);
      setSignature(sig);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign message');
      console.error('Failed to sign message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTransaction = async () => {
    if (!address) return;

    try {
      setError(null);
      setIsLoading(true);
      const tx = await sendTransaction(address, '0.001');
      setSignature(tx.hash);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send transaction',
      );
      console.error('Failed to send transaction:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-4">
          <div className="text-center space-y-2">
            <Wallet className="w-12 h-12 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Connect Wallet</h2>
            <p className="text-muted-foreground">
              Connect your wallet to sign messages and transactions
            </p>
          </div>
          <Button className="w-full" onClick={connect} disabled={isConnecting}>
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Sign Message & Transaction</h2>
            <p className="text-sm text-muted-foreground">
              Sign messages and send transactions on the Avalanche network
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a message to sign"
                disabled
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md">
                <AlertCircle className="w-4 h-4" />
                <p>{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={handleSignMessage}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Signing...' : 'Sign Message'}
              </Button>

              <Button
                onClick={handleSendTransaction}
                disabled={true}
                className="flex-1"
                variant="secondary"
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? 'Sending...' : 'Send Transaction'}
              </Button>
            </div>

            {signature && (
              <div className="space-y-3">
                <div className="p-4 bg-zinc-900 rounded-lg break-all">
                  <p className="text-sm font-medium text-zinc-400 mb-2">
                    {signature.startsWith('0x')
                      ? 'Transaction Hash:'
                      : 'Signature:'}
                  </p>
                  <p className="font-mono text-sm">{signature}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  View {signature.startsWith('0x') ? 'transaction' : 'address'}{' '}
                  on{' '}
                  <a
                    href={`${getExplorerUrl(chainId)}/${signature.startsWith('0x') ? 'tx' : 'address'}/${signature.startsWith('0x') ? signature : address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Block Explorer
                  </a>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
