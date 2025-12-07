import Logo from './Logo';

export default function AppLoadingScreen() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="grid justify-items-center gap-2">
        <Logo />
        <span className="loading text-brand loading-infinity loading-xl md:scale-120"></span>
      </div>
    </div>
  );
}
