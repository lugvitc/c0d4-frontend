import styles from './Categories.module.css';

const categories = [
  'OPERATING SYSTEMS',
  'OSINT',
  'WEB EXPLOITATION',
  'BINARY EXPLOITATION',
  'AND SO MUCH MORE!',
];

const Categories = () => {
  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.learnTitle}>LEARN</h2>
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div key={category} className={styles.categoryCard}>
            {category}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
