import { Header1 } from "../components/ui/header";
import { HeroGeometric } from "../components/ui/shape-landing-hero";

export default function Home() {
  return (
    <main>
      
      <Header1/>
      <HeroGeometric
        title1="Veri Tabanı"
        title2="Yönetim Sistemleri"
      />
    </main>
  );
}
