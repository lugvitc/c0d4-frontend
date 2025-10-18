import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Cyber-0-Day 4.0</div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Sign Up</Link>
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
