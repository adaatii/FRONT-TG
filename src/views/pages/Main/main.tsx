import { useState } from 'react';
import style from './main.module.scss';
import Sidebar from '../../assets/components/Sidebar/sidebar';
import Employers from '../../assets/components/Employers/employers';
import Products from '../../assets/components/Products/products';
import Categories from '../../assets/components/Categories/categories';

function Main() {

  const [currentView, setCurrentView] = useState('employers');
  const handleViewChange = (view: string) => {
    setCurrentView(view);
  }

  return (
    <div className={style.container}>
      <Sidebar onViewChange={handleViewChange} />
      <div className={style.content}>
        {currentView === 'employers' && <Employers />}
        {currentView === 'products' && <Products />}
        {currentView === 'categories' && <Categories />}
      </div>
    </div>
  );
}

export default Main;


