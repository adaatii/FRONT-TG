import React, { useEffect, useState } from "react";
import style from "./products.module.scss";
import { Users, Plus } from "@phosphor-icons/react";
import TableDefault, { ProductData } from "../TableProducts/table";
import Modal from "../Modal/modal";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import {
  getProductData,
  postProductData,
  putProductData,
  deleteProductData,
} from "../../../../api/Hooks/products";
import { getCategoryData } from "../../../../api/Hooks/categories";
import CookieManager from "../../../../utils/CookieManager";


// DataCard interface
interface DataCard {
  body: {
    products: ProductData[];
  };
}

function Products() {
  const [dataCard, setDataCard] = useState<DataCard | null>(null); // DataCard are the table data
  const [modalRegisterProduct, setModalRegisterProduct] = useState(false); // Register Product Modal
  const [id, setId] = useState(""); // Product ID
  const [description, setDescription] = useState(""); // Product Name
  const [price, setPrice] = useState(""); // Product Price
  const [category_id, setCategoryId] = useState(""); // Product Category
  const [category_description, setCategoryDescription] = useState(""); // Category Description
  const [modalUpdateProduct, setModalUpdateProduct] = useState(false); // Open Update Product Modal
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Selected Product
  const [dialogDeleteProduct, setDialogDeleteProduct] = useState(false); // Open Delete Product Dialog
  const [categories, setCategories] = useState([]); // Categories
  const [token, setToken] = useState(""); // Token


  const cookieManager = new CookieManager();


  // Get all Products when the component is mounted
  useEffect(() => {
    // Verifica se o token está disponível
    const checkToken = () => {
      const token = cookieManager.Token;
      if (token) {
        setToken(token);
        getProduct(token);
      } else {
        setTimeout(checkToken, 100);
      }
    };

    checkToken();
  }, []);

  // Get all Products
  const getProduct = (token: string) => {
    getProductData(token)
      .then(([data]) => {
        setDataCard(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Register a new Product
  const registerProduct = (ProductData: any) => {
    const priceValue = convertToNumericValue(price);
    postProductData({ ...ProductData, price: priceValue }, token)
      .then(() => {
        setModalRegisterProduct(false);
        getProduct(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update Product data
  const updateProduct = (ProductData: any) => {
    putProductData(ProductData, token)
      .then(() => {
        handleModalClose();
        getProduct(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete Product
  const deleteProduct = (ProductData: any) => {
    deleteProductData(ProductData, token)
      .then(() => {
        getProduct(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get all Categories
  const getCategory = async () => {
    try {
      const [data] = await getCategoryData(token);
      setCategories(data.body.categories);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Handle delete Product
  const handleDeleteProduct = (ProductData: any) => {
    deleteProduct(ProductData);
    dialogDeleteClose();
  };

  // Open Register Product Modal
  const handleRegisterProductOpen = () => setModalRegisterProduct(true);

  // Close Register Product Modal
  const handleRegisterProductClose = () => {
    setModalRegisterProduct(false);
    handleModalClose();
  };

  // Handle Product data
  const products: ProductData[] = dataCard
    ? dataCard.body.products.map((product: any) => ({
      id: product.id,
      description: product.description,
      price: product.price,
      status: product.status,
      created_at: product.created_at,
      updated_at: product.updated_at,
      category_id: product.category_id,
    }))
    : [];

  // Handle modal update Product
  const handleModalUpdate = (modal: boolean, ProductData?: any) => {
    if (ProductData) {
      setId(ProductData.id || "");
      setDescription(ProductData.description || "");
      setPrice(ProductData.price || "");
      setCategoryId(ProductData.category_id || "");
    }
    setModalUpdateProduct(modal);
    setSelectedProduct(ProductData || null);
  };

  // Handle modal close
  const handleModalClose = () => {
    setId("");
    setDescription("");
    setPrice("");
    setCategoryId("");
    setCategoryDescription("");
    setModalUpdateProduct(false);
  };

  // Handle dialog delete Product
  const dialogDeleteOpen = (deletebtn: boolean, ProductData?: any, CategoryData?: any) => {
    setDialogDeleteProduct(true);
    if (ProductData) {
      setId(ProductData.id || "");
      setDescription(ProductData.description || "");
      setCategoryId(ProductData.category_id || "");
      setCategoryDescription(CategoryData.description || "");
    }
  };

  // Handle dialog close
  const dialogDeleteClose = () => {
    setDialogDeleteProduct(false);
  };

  const formatPrice = (value: string): string => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/[^0-9]/g, '');

    // Converte para float
    const floatValue = parseFloat(numericValue) / 100;

    if (isNaN(floatValue)) {
      return "0,00";
    }

    // Formata o valor para o formato de moeda
    return floatValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const convertToNumericValue = (value: string) => {
    // Remover o símbolo 'R$' e substituir vírgulas por pontos
    const numeroFormatado = value.replace('R$', '').replace(',', '.');

    // Converter para número
    const numero = parseFloat(numeroFormatado).toFixed(2);

    return numero;
  };

  // Render: Products component
  return (
    <div className={style.container}>
      <div className={style.header}>
        <span>Produto</span>
        <Users weight="fill" size={32} color="var(--primary)" />
      </div>
      <div className={style.actions}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus size={16} />}
          onClick={handleRegisterProductOpen}
        >
          Adicionar Produto
        </Button>
        <Modal
          open={modalRegisterProduct}
          setOpen={handleRegisterProductOpen}
          onClose={handleRegisterProductClose}
        >
          <div className={style.containerModal}>
            <span>Cadastrar Produto</span>
            <div className={style.contentForm}>
              <TextField
                id="description"
                fullWidth
                size="small"
                color="primary"
                label="Descrição"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                id="price"
                fullWidth
                size="small"
                color="primary"
                label="Preço"
                variant="outlined"
                inputProps={{
                  maxLength: 13,
                }}
                value={formatPrice(price)}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, '');
                  setPrice(numericValue);
                }}
              />
              <TextField
                select
                label="Categoria"
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
                variant="outlined"
                fullWidth
                size="small"
                color="primary"
              >
                <MenuItem disabled value=""
                  sx={{
                    color: "var(--primary)",
                  }}
                >
                  <em>Selecione uma categoria</em>
                </MenuItem>
                {categories.map((category: any) => (
                  <MenuItem key={category.id} value={category.id} sx={{
                    color: "var(--primary)",
                    fontWeight: "var(--fnt-wg-sm)",
                    fontSize: "var(--fnt-sg-sm)"
                  }}>
                    {category.description}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => registerProduct({ description, price, category_id })}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </Modal>
      </div >
      <div className={style.content}>
        <TableDefault
          data={products}
          categories={categories}
          onModalChange={handleModalUpdate}
          onDialogChange={dialogDeleteOpen}
        />
        <Modal
          open={modalUpdateProduct}
          setOpen={setModalUpdateProduct}
          onClose={handleModalClose}
        >
          {selectedProduct ? (
            <>
              <div className={style.containerModal}>
                <span>Atualizar Produto</span>
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
                  <TextField
                    id="category_id"
                    fullWidth
                    size="small"
                    color="primary"
                    label="Categoria"
                    variant="outlined"
                    value={category_id || ""}
                    onChange={(e) => setCategoryId(e.target.value)}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      updateProduct({ id, description, price, category_id })
                    }
                  >
                    Update
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <span>Nenhum produto selecionado</span>
          )}
        </Modal>
        <Dialog open={dialogDeleteProduct} onClose={dialogDeleteClose}>
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              color: "var(--primary)",
              fontWeight: "var(--fnt-wg-lg)",
              fontSize: "var(--fnt-sg-lg)",
            }}
          >
            {"Deseja realmente deletar esse funcionario?"}
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
                Produto: <b>{description}</b>
              </span>
              <span>
                Categoria: <b>{category_description}</b>
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
              onClick={() => handleDeleteProduct({ id })}
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div >
  );
}

export default Products;

