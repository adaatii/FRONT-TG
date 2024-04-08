import style from "./categories.module.scss"

function Categories() {
  return (
    <div className={style.categories}>
      <h1 style={{color: 'var(--primary)'}}>Categories</h1>
    </div>
  );
}

export default Categories;