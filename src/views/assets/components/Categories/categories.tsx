import { useEffect, useState, SyntheticEvent } from "react";
import style from "./categories.module.scss";
import { Users, Plus } from "@phosphor-icons/react";
import TableDefault, { CategoryData } from "../TableCategories/table";
import Modal from "../Modal/modal";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar, Alert, Slide,
  SnackbarCloseReason,
} from "@mui/material";
import {
  getCategoryData,
  postCategoryData,
  putCategoryData,
  deleteCategoryData,
} from "../../../../api/Hooks/categories";
import CookieManager from "../../../../utils/CookieManager";
import errorHandling from "../../../../utils/errorHandling";

// DataCard interface
interface DataCard {
  body: {
    categories: CategoryData[];
  };
}

function Categories() {
  const [dataCard, setDataCard] = useState<DataCard | null>(null); // DataCard are the table data
  const [id, setId] = useState(""); // Category ID
  const [description, setDescription] = useState(""); // Category Description
  const [modalRegisterCategory, setModalRegisterCategory] = useState(false); // Register Category Modal
  const [modalUpdateCategory, setModalUpdateCategory] = useState(false); // Open Update Category Modal
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null); // Selected Category
  const [dialogDeleteCategory, setDialogDeleteCategory] = useState(false); // Open Delete Category Dialog
  const [token, setToken] = useState(""); // Token
  const [toastQueue, setToastQueue] = useState<ToastMessage[]>([]);

  type ToastMessage = {
    message: string;
    type: "error" | "warning" | "info" | "success";
  };

  const showToast = (message: string, type: ToastMessage['type']) => {
    setToastQueue(prev => [...prev, { message, type }]);
  };

  const handleToastClose = (event: Event | SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastQueue(prev => prev.slice(1));
  };

  const handleRegisterCategoryOpen = () => setModalRegisterCategory(true); // Open Register Category Modal
  const handleRegisterCategoryClose = () => {
    setModalRegisterCategory(false);
    handleModalClose();
  }; // Close Register Category Modal


  const cookieManager = new CookieManager();

  // Get all categories when the component is mounted
  useEffect(() => {
    // Verifica se o token está disponível
    const checkToken = () => {
      const token = cookieManager.Token;
      if (token) {
        setToken(token);
        getCategory(token);
      } else {
        setTimeout(checkToken, 100);
      }
    };

    checkToken();
  }, []);


  // Get all categories
  const getCategory = (token: string) => {
    getCategoryData(token)
      .then(([data]) => {
        setDataCard(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Register a new category
  const registerCategory = (categoryData: any) => {
    postCategoryData(categoryData, token)
      .then((data) => {
        setModalRegisterCategory(false);
        getCategory(token);
        handleModalClose();
        const errors = errorHandling(data);
        errors.forEach(error => {
          showToast(error.text, error.type);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update catagory data
  const updateCategory = (categoryData: any) => {
    putCategoryData(categoryData, token)
      .then((data) => {
        handleModalClose();
        getCategory(token);
        const errors = errorHandling(data);
        errors.forEach(error => {
          showToast(error.text, error.type);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete category
  const deleteCategory = (categoryData: any) => {
    deleteCategoryData(categoryData, token)
      .then((data) => {
        getCategory(token);
        const errors = errorHandling(data);
        errors.forEach(error => {
          showToast(error.text, error.type);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle delete category
  const handleDeleteCategory = (categoryData: any) => {
    deleteCategory(categoryData);
    dialogDeleteClose();
  };

  // Handle employee data
  const categories: CategoryData[] = dataCard
    ? dataCard.body.categories.map((category) => ({
      id: category.id,
      description: category.description,
      status: category.status,
      created_at: category.created_at,
      updated_at: category.updated_at,
    }))
    : [];

  // Handle modal update category
  const handleModalUpdate = (modal: boolean, categoryData?: any) => {
    if (categoryData) {
      setId(categoryData.id || "");
      setDescription(categoryData.description || "");
    }
    setModalUpdateCategory(modal);
    setSelectedCategory(categoryData || null);
  };

  // Handle modal close
  const handleModalClose = () => {
    setId("");
    setDescription("");
    setModalUpdateCategory(false);
  };

  // Handle dialog delete category
  const dialogDeleteOpen = (deletebtn: boolean, categoryData?: any) => {
    setDialogDeleteCategory(true);
    if (categoryData) {
      setId(categoryData.id || "");
      setDescription(categoryData.description || "");
    }
  };

  // Handle dialog close
  const dialogDeleteClose = () => {
    setDialogDeleteCategory(false);
  };

  // Render: Category component
  return (
    <div className={style.container}>
      {toastQueue.map((toast, index) => (
        <Snackbar
          key={index}
          open={true}
          autoHideDuration={4000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
          style={{ marginTop: index * 48, marginBottom: 48}}
        >
          <Alert severity={toast.type} onClose={handleToastClose} sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
      <div className={style.header}>
        <span>Categoria</span>
        <Users weight="fill" size={32} color="var(--primary)" />
      </div>
      <div className={style.actions}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus size={16} />}
          onClick={handleRegisterCategoryOpen}
        >
          Adicionar Categoria
        </Button>
        <Modal
          open={modalRegisterCategory}
          setOpen={handleRegisterCategoryOpen}
          onClose={handleRegisterCategoryClose}
        >
          <div className={style.containerModal}>
            <span>Cadastrar Categoria</span>
            <div className={style.contentForm}>
              <TextField
                id="description"
                fullWidth
                size="small"
                color="primary"
                label="Nome"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => registerCategory({ description })}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className={style.content}>
        <TableDefault
          data={categories}
          onModalChange={handleModalUpdate}
          onDialogChange={dialogDeleteOpen}
        />
        <Modal
          open={modalUpdateCategory}
          setOpen={setModalUpdateCategory}
          onClose={handleModalClose}
        >
          {selectedCategory ? (
            <>
              <div className={style.containerModal}>
                <span>Atualizar Categoria</span>
                <div className={style.contentForm}>
                  <TextField
                    id="description"
                    fullWidth
                    size="small"
                    color="primary"
                    label="Nome"
                    variant="outlined"
                    value={description || ""}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => updateCategory({ id, description })}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <span>Nenhuma categoria selecionado</span>
          )}
        </Modal>
        <Dialog open={dialogDeleteCategory} onClose={dialogDeleteClose}>
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              color: "var(--primary)",
              fontWeight: "var(--fnt-wg-lg)",
              fontSize: "var(--fnt-sg-lg)",
            }}
          >
            {"Deseja realmente deletar essa categoria?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                color: "var(--primary)",
                fontWeight: "var(--fnt-wg-sm)",
                fontSize: "var(--fnt-sg-sm)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>
                Categoria: <b>{description}</b>
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              size="small"
              variant="contained"
              onClick={dialogDeleteClose}
            >
              Cancelar
            </Button>
            <Button
              color="secondary"
              size="small"
              variant="contained"
              onClick={() => handleDeleteCategory({ id })}
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Categories;

