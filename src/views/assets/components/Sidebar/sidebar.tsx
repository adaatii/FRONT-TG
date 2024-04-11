import style from "./sidebar.module.scss";
import { useState } from "react";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import { Users, Package, Bookmark } from "@phosphor-icons/react";

interface ISidebar {
    onViewChange: (view: string) => void;
}

function Sidebar({ onViewChange }: ISidebar) {

    const [activeButton, setActiveButton] = useState('employers');
    const handleActiveButton = (view: string) => {
        onViewChange(view);
        setActiveButton(view);
    }

    return (
        <div className={style.container}>
            <div className={style.logo}></div>
            <div className={style.options}>
                <Tooltip title="Funcionários" placement="right" TransitionComponent={Zoom}>
                    <IconButton color="primary" onClick={() => handleActiveButton('employers')}>
                        <Users weight="fill" size={26} color={
                            activeButton === 'employers' ? 'var(--primary)' : 'var(--intermadiate)'} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Produtos" placement="right" TransitionComponent={Zoom}>
                    <IconButton color="primary" onClick={() => handleActiveButton('products')}>
                        <Package weight="fill" size={26}
                            color={
                                activeButton === 'products' ? 'var(--primary)' : 'var(--intermadiate)'} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Categorias" placement="right" TransitionComponent={Zoom}>
                    <IconButton color="primary" onClick={() => handleActiveButton('categories')}>
                        <Bookmark weight="fill" size={26}
                            color={activeButton === 'categories' ? 'var(--primary)' : 'var(--intermadiate)'} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}

export default Sidebar;