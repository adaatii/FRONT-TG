import { useEffect, useState, SyntheticEvent } from "react";
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
import errorHandling from "../../../../utils/errorHandling";

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
        handleModalClose();
        setModalRegisterEmployee(false);
        getEmployer(token);
        const errors = errorHandling(data);
        errors.forEach(error => {
          showToast(error.text, error.type);
        });
      })
      .catch((error) => {
      });
  };

  // Update employee data
  const updateEmployer = (employeeData: any) => {
    const unmaskedCpf = removeCpfMask(employeeData.cpf);
    putEmployeeData({ ...employeeData, cpf: unmaskedCpf }, token)
      .then((data) => {
        handleModalClose();
        getEmployer(token);
        const errors = errorHandling(data);
        errors.forEach(error => {
          showToast(error.text, error.type);
        });
      })
      .catch((error) => {
      });
  };

  // Delete employee
  const deleteEmployer = (employeeData: any) => {
    deleteEmployeeData(employeeData, token)
      .then((data) => {
        getEmployer(token);
        const errors = errorHandling(data);
        errors.forEach(error => {
          showToast(error.text, error.type);
        });
      })
      .catch((error) => {
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
      {toastQueue.map((toast, index) => (
        <Snackbar
          key={index}
          open={true}
          autoHideDuration={4000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
          style={{ marginTop: index * 48, marginBottom: 48 }}
        >
          <Alert severity={toast.type} onClose={handleToastClose} sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
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
            {"Deseja realmente desativar esse funcionario?"}
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

