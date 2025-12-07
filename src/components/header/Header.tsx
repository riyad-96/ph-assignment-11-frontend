import Logo from '../Logo';
import NavMenu from './NavMenu';

export default function Header() {
  return (
    <header className="border-b border-brand-light px-2 py-2 md:px-3">
      <div className="mx-auto flex max-w-[1300px] items-center justify-between">
        <Logo />
        <div>
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
