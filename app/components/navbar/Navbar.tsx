import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Image
        src="/neon_penguin.png"
        alt="Penguin Logo"
        width={250}
        height={250}
        priority
        className={styles.logoImage}
      />
      <div className={styles.topText}>lugvitc.net</div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Sign up</Link>
        </li>
        <li>
          <Link href="/">Timeline</Link>
        </li>
        <li>
          <Link href="/">Rules</Link>
        </li>
        <li>
          <Link href="/">Leaderboard</Link>
        </li>
        <li>
          <Link href="/">Prizes</Link>
        </li>
      </ul>
    </nav>
  );
}
