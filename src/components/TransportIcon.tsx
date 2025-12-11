import { FaTrain } from 'react-icons/fa6';
import { IoMdBus } from 'react-icons/io';
import { MdAirplanemodeActive } from 'react-icons/md';
import { RiShip2Fill } from 'react-icons/ri';

export default function TransportIcon({ transport }: { transport: string }) {
  if (transport === 'bus') {
    return <IoMdBus />;
  }
  if (transport === 'train') {
    return <FaTrain />;
  }
  if (transport === 'ship') {
    return <RiShip2Fill />;
  }
  if (transport === 'plane') {
    return <MdAirplanemodeActive />;
  }
}
