import AdSection from './AdSection';
import Banner from './banner/Banner';
import ExtraSections from './ExtraSections';
import LatestTicketSection from './LatestTicketSection';

export default function Home() {
  return (
    <div className="mx-auto max-w-[1920px]">
      <Banner />

      <div className="mt-8 px-2 md:px-3">
        <div className="mx-auto max-w-[1300px]">
          <AdSection />
          <LatestTicketSection />
          <ExtraSections />
        </div>
      </div>
    </div>
  );
}
