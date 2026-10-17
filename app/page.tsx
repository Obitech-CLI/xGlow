import Image from "next/image";
import styles from "./page.module.css";
import MenuModal from "@/ui/menu";
import Hero from "@/public/Perfect-Woman.png";
import Hero0 from "@/public/PerfectWoman0.png";
import Search from "@/ui/search";
import Products from "./products/products";

export default function Home() {
  return (
    <main className={styles.home}>
      <MenuModal />
      <Search />
      <div className={styles.hero}>
        <h1>
          the<br></br>perfect<br></br>woman
        </h1>
        <Image src={Hero} alt="" loading="eager" />
        <Image src={Hero0} alt="" loading="eager" />
      </div>
      <Products />
    </main>
  );
}
