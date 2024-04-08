import style from "./products.module.scss"

function Products() {
  return (
    <div className={style.products}>
      <h1 style={{color: 'var(--primary)'}}>Products</h1>
    </div>
  );
}

export default Products;