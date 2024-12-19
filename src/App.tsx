import { QubicConnectProvider, Header, Card } from '@qubic/react-ui';
import Logo from './assets/qubic-connect.svg';
import PublicKey from './PublicKey';
import TickInfo from './TickInfo';
import AccountInfo from './AccountInfo';
import SendForm from './SendForm';
import GithubLink from './GithubLink';

function App(): JSX.Element {
  return (
    <QubicConnectProvider>
      <Header logo={Logo} />
      
        <div className="py-28 w-screen flex flex-col items-center">
          
          <div className="p-2 max-w-3xl">
            <pre className='rounded-xl bg-black text-white p-5'>
              <code>
                {`import { QubicConnectProvider, Header } from '@qubic/react-ui';
import '@qubic/react-ui/dist/style.css';
import Logo from './assets/qubic-connect.svg';

function App() {
  return (
    <QubicConnectProvider>
      <Header logo={Logo} />
    </QubicConnectProvider>
  );
}

export default App;`}
              </code>
            </pre>
            <Card className="p-5 mt-2">
              The Qubic Connect UI is a simple and easy-to-use library that allows you to connect your DAPP with the Qubic Network. 
            </Card>
          </div>

          <div className="p-2">
            <pre className='rounded-xl bg-black text-white p-5'>              
              <code>{`const {connected, getMetaMaskPublicId} = useQubicConnect()`}</code>
            </pre>
            <Card className="p-5 mt-2">
              Use the <strong>getMetaMaskPublicId</strong> method to get the Qubic public ID of the connected wallet.
              <br />
              <PublicKey className="mt-5" />
              <GithubLink link="https://github.com/a-qubic-world/qubic-connect-website/blob/main/src/PublicKey.jsx" />
            </Card>
          </div>

          <div className="p-2">
            <pre className='rounded-xl bg-black text-white p-5'>              
              <code>{`import { truncateMiddle } from "@qubic/react-ui"`}</code>
            </pre>
            <Card className="p-5 mt-2">
              The utility method <strong>truncatedMiddle</strong> allows to shorten a string in the middle.
              <br />
              <PublicKey truncated={true} className="mt-5" />
              <GithubLink link="https://github.com/a-qubic-world/qubic-connect-website/blob/main/src/PublicKey.jsx" />
            </Card>
          </div>

          <div className="p-2">
            <pre className='rounded-xl bg-black text-white p-5'>              
              <code>{`const {getTickInfo} = useQubicConnect()`}</code>
            </pre>
            <Card className="p-5 mt-2">
              Using the official <a href="https://rpc.qubic.org">Qubic RPC endpoint</a> to connect to the Qubic Network. <br />
              We use the <strong>getTickInfo</strong> method to get current tick.
              <TickInfo className="mt-5" />
              <GithubLink link="https://github.com/a-qubic-world/qubic-connect-website/blob/main/src/TickInfo.jsx" />
            </Card>
          </div>

          <div className="p-2">
            <pre className='rounded-xl bg-black text-white p-5'>              
              <code>{`const {getBalance} = useQubicConnect()`}</code>
            </pre>            
            <Card className="p-5 mt-2">
              We use the <strong>getBalance</strong> method to get current account balance.            
              <AccountInfo className="mt-5" />
              <GithubLink link="https://github.com/a-qubic-world/qubic-connect-website/blob/main/src/AccountInfo.jsx" />
            </Card>
          </div>

          <div className="p-2">
            <pre className='rounded-xl bg-black text-white p-5'>
              <code>{`const {getSignedTx} = useQubicConnect()`}</code>
            </pre>
            <Card className="p-5 mt-2">
              We use the <strong>getSignedTx</strong> method to sign a send TX.
              <SendForm className="mt-5" />
              <GithubLink link="https://github.com/a-qubic-world/qubic-connect-website/blob/main/src/SendForm.jsx" />
            </Card>
          </div>

        </div>

    </QubicConnectProvider>
  );
}

export default App;
