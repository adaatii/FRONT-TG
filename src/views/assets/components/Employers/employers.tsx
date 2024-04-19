import React, { useEffect, useState, SyntheticEvent } from "react";
import style from "./employers.module.scss";
import { Users, Plus } from "@phosphor-icons/react";
import TableDefault, { EmployeeData } from "../TableEmployers/table";
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
  getEmployeeData,
  postEmployeeData,
  putEmployeeData,
  deleteEmployeeData,
} from "../../../../api/Hooks/employers";
import CookieManager from "../../../../utils/CookieManager";

// DataCard interface
interface DataCard {
  body: {
    employees: EmployeeData[];
  };
}

function Employers() {
  const [dataCard, setDataCard] = useState<DataCard | null>(null); // DataCard are the table data
  const [modalRegisterEmployee, setModalRegisterEmployee] = useState(false); // Register Employee Modal
  const [id, setId] = useState(""); // Employee ID
  const [name, setName] = useState(""); // Employee Name
  const [email, setEmail] = useState(""); // Employee Email
  const [cpf, setCpf] = useState(""); // Employee CPF
  const [password, setPassword] = useState(""); // Employee Password
  const [modalUpdateEmployee, setModalUpdateEmployee] = useState(false); // Open Update Employee Modal
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null); // Selected Employee
  const [dialogDeleteEmployee, setDialogDeleteEmployee] = useState(false); // Open Delete Employee Dialog
  const [token, setToken] = useState(""); // Token
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"error" | "warning" | "info" | "success">("success");

  // Função para abrir o Snackbar
  const showToast = (message: string, type: "error" | "warning" | "info" | "success") => {
    setToastMessage(message);
    setToastType(type);
    setOpenToast(true);
  };

  // Função para fechar o Snackbar
  const handleToastClose = (event: Event | SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const handleRegisterEmployeeOpen = () => setModalRegisterEmployee(true); // Open Register Employee Modal
  const handleRegisterEmployeeClose = () => {
    setModalRegisterEmployee(false);
    handleModalClose();
  }; // Close Register Employee Modal

  const cookieManager = new CookieManager();

  // Get all employees when the component is mounted

  useEffect(() => {
    // Verifica se o token está disponível
    const checkToken = () => {
      const token = cookieManager.Token;
      if (token) {
        setToken(token);
        getEmployer(token);
      } else {
        setTimeout(checkToken, 100);
      }
    };
    checkToken();
  }, []);

  // Get all employees
  const getEmployer = (token: string) => {
    getEmployeeData(token)
      .then(([data]) => {
        setDataCard(data);
      })
      .catch((error) => {
      });
  };

  // Register a new employee
  const registerEmployer = (employeeData: any) => {
    const unmaskedCpf = removeCpfMask(employeeData.cpf);

    postEmployeeData({ ...employeeData, cpf: unmaskedCpf }, token)
      .then((data) => {
        setModalRegisterEmployee(false);
        getEmployer(token);
        if (data[0].message) {
          showToast("Funcionário cadastrado com sucesso", "success");
        } else {
          console.log(data[0].errors.email[0]);
          if (data[0].errors.email[0]) {
            switch (data[0].errors.email[0]) {
              case "The email has already been taken.":
                showToast("Email já cadastrado", "error");
                break;
              case "Cpf already exists":
                showToast("CPF já cadastrado", "error");
                break;
              default:
                showToast("Falha ao cadastrar funcionario", "error");
                break;
            }
          }
        }
      })
      .catch((error) => {
        showToast("Falha ao cadastrar funcionario", "error");
      });
  };

  // Update employee data
  const updateEmployer = (employeeData: any) => {
    const unmaskedCpf = removeCpfMask(employeeData.cpf);
    putEmployeeData({ ...employeeData, cpf: unmaskedCpf }, token)
      .then((data) => {
        handleModalClose();
        getEmployer(token);
        showToast("Funcionário atualizado com sucesso", "success");
      })
      .catch((error) => {
        showToast("Falha ao atualizar funcionario", "error");
      });
  };

  // Delete employee
  const deleteEmployer = (employeeData: any) => {
    deleteEmployeeData(employeeData, token)
      .then((data) => {
        getEmployer(token);
        showToast("Funcionário deletado com sucesso", "success");
      })
      .catch((error) => {
        showToast("Falha ao deletar funcionario", "error");
      });
  };

  // Handle delete employee
  const handleDeleteEmployee = (employeeData: any) => {
    deleteEmployer(employeeData);
    dialogDeleteClose();
  };

  // Handle employee data
  const employees: EmployeeData[] = dataCard
    ? dataCard.body.employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      cpf: employee.cpf,
      status: employee.status,
      created_at: employee.created_at,
      updated_at: employee.updated_at,
    }))
    : [];

  // Handle modal update employee
  const handleModalUpdate = (modal: boolean, employeeData?: any) => {
    if (employeeData) {
      setId(employeeData.id || "");
      setName(employeeData.name || "");
      setEmail(employeeData.email || "");
      setCpf(applyCpfMask(employeeData.cpf?.toString() || ""));
      setPassword(employeeData.password || "");
    }
    setModalUpdateEmployee(modal);
    setSelectedEmployee(employeeData || null);
  };

  // Handle modal close
  const handleModalClose = () => {
    setId("");
    setName("");
    setEmail("");
    setCpf("");
    setPassword("");
    setModalUpdateEmployee(false);
  };

  // Handle dialog delete employee
  const dialogDeleteOpen = (deletebtn: boolean, employeeData?: any) => {
    setDialogDeleteEmployee(true);
    if (employeeData) {
      setId(employeeData.id || "");
      setName(employeeData.name || "");
      setCpf(applyCpfMask(employeeData.cpf?.toString() || ""));
    }
  };

  // Handle dialog close
  const dialogDeleteClose = () => {
    setDialogDeleteEmployee(false);
  };

  const applyCpfMask = (cpf: string): string => {
    let value = cpf.replace(/\D/g, ""); // Remove all non-digit characters

    // input limit to 11 characters
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    // A
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return value;
  };

  // Modify handleCpfChange to use the applyCpfMask function
  const handleCpfChange = (e: any) => {
    const value = e.target.value;
    setCpf(applyCpfMask(value)); // Update CPF value
  };

  const removeCpfMask = (cpf: string): string => {
    return cpf.replace(/\D/g, ""); // Remove all non-digit characters
  };


  // Render: Employers component
  return (
    <div className={style.container}>
      {openToast && (
        <Snackbar
          open={openToast}
          autoHideDuration={3000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
        >
          <Alert severity={toastType} onClose={handleToastClose} sx={{ width: '100%' }}>
            {toastMessage}
          </Alert>
        </Snackbar>
      )}
      <div className={style.header}>
        <span>Funcionário</span>
        <Users weight="fill" size={32} color="var(--primary)" />
      </div>
      <div className={style.actions}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus size={16} />}
          onClick={handleRegisterEmployeeOpen}
        >
          Adicionar Funcionario
        </Button>
        <Modal
          open={modalRegisterEmployee}
          setOpen={handleRegisterEmployeeOpen}
          onClose={handleRegisterEmployeeClose}
        >
          <div className={style.containerModal}>
            <span>Cadastrar Funcionário</span>
            <div className={style.contentForm}>
              <TextField
                id="name"
                fullWidth
                size="small"
                color="primary"
                label="Nome"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="email"
                fullWidth
                size="small"
                color="primary"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="cpf"
                fullWidth
                size="small"
                color="primary"
                label="CPF"
                variant="outlined"
                value={cpf}
                onChange={(e) => handleCpfChange(e)}
              />
              <TextField
                id="password"
                fullWidth
                size="small"
                color="primary"
                label="Senha"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => registerEmployer({ name, email, cpf, password })}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      <div className={style.content}>
        <TableDefault
          data={employees}
          onModalChange={handleModalUpdate}
          onDialogChange={dialogDeleteOpen}
        />
        <Modal
          open={modalUpdateEmployee}
          setOpen={setModalUpdateEmployee}
          onClose={handleModalClose}
        >
          {selectedEmployee ? (
            <>
              <div className={style.containerModal}>
                <span>Atualizar Funcionário</span>
                <div className={style.contentForm}>
                  <TextField
                    id="name"
                    fullWidth
                    size="small"
                    color="primary"
                    label="Nome"
                    variant="outlined"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="email"
                    fullWidth
                    size="small"
                    color="primary"
                    label="Email"
                    variant="outlined"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    id="cpf"
                    fullWidth
                    size="small"
                    color="primary"
                    label="CPF"
                    variant="outlined"
                    value={cpf || ""}
                    onChange={(e) => handleCpfChange(e)}
                  />
                  <TextField
                    id="password"
                    fullWidth
                    size="small"
                    color="primary"
                    label="Senha"
                    variant="outlined"
                    type="password"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      updateEmployer({ id, name, email, cpf, password })
                    }
                  >
                    Update
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <span>Nenhum funcionário selecionado</span>
          )}
        </Modal>
        <Dialog open={dialogDeleteEmployee} onClose={dialogDeleteClose}>
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
                Funcionario: <b>{name}</b>
              </span>
              <span>
                CPF: <b>{cpf}</b>
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
              onClick={() => handleDeleteEmployee({ id })}
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

export default Employers;

