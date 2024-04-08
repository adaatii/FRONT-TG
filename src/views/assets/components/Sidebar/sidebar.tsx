import style from "./sidebar.module.scss";
import { useState } from "react";
import { Button } from "@mui/material";
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
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                        padding: "var(--padding-md)",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor:
                            activeButton === 'employers' ? 'var(--primary)' : 'var(--components)',
                        boxShadow: "none",
                    }}
                    onClick={() => handleActiveButton('employers')}
                >
                    <Users weight="fill" size={20} color={
                        activeButton === 'employers' ? 'var(--text-l)' : 'var(--primary)'
                    } />
                    <span
                        style={{
                            color: activeButton === 'employers' ? 'var(--text-l)' : 'var(--primary)'
                        }}
                    >
                        Func.
                    </span>
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                        padding: "var(--padding-md)",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor:
                            activeButton === 'products' ? 'var(--primary)' : 'var(--components)',
                        boxShadow: "none",
                    }}
                    onClick={() => handleActiveButton('products')}
                >
                    <Package weight="fill" size={20}
                        color={
                            activeButton === 'products' ? 'var(--text-l)' : 'var(--primary)'
                        }
                    />
                    <span
                        style={{
                            color: activeButton === 'products' ? 'var(--text-l)' : 'var(--primary)'
                        }}
                    >Prod.</span>
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                        padding: "var(--padding-md)",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor:
                            activeButton === 'categories' ? 'var(--primary)' : 'var(--components)',
                        boxShadow: "none",
                    }}
                    onClick={() => handleActiveButton('categories')}
                >
                    <Bookmark weight="fill" size={20}
                        color={
                            activeButton === 'categories' ? 'var(--text-l)' : 'var(--primary)'
                        }
                    />
                    <span
                        style={{
                            color: activeButton === 'categories' ? 'var(--text-l)' : 'var(--primary)'
                        }}
                    >Categ.</span>
                </Button>

            </div>
        </div>
    );
}

export default Sidebar;