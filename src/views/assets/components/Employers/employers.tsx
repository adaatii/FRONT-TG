import React, { useEffect, useState } from "react";
import style from "./employers.module.scss"
import { Users, Plus } from "@phosphor-icons/react";
import TableDefault, { EmployeeData } from "../TableEmployers/table";
import Modal from "../Modal/modal";
import { Button, TextField } from '@mui/material';
import { getEmployeeData, postEmployeeData, putEmployeeData } from "../../../../api/Hooks/employers";

interface DataCard {
  body: {
    employees: EmployeeData[];
  };
}

function Employers() {
  const [dataCard, setDataCard] = useState<DataCard | null>(null);
  const [openRegisterEmployee, setOpenRegisterEmployee] = useState(false);

  const handleRegisterEmployeeOpen = () => setOpenRegisterEmployee(true);
  const handleRegisterEmployeeClose = () => setOpenRegisterEmployee(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');


  const [currentModal, setCurrentModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  const handleModalChange = (modal: boolean, employeeData?: any) => {
    if (employeeData) {
      setId(employeeData.id || '');
      setName(employeeData.name || '');
      setEmail(employeeData.email || '');
      setCpf(employeeData.cpf?.toString() || '');
      setPassword(employeeData.password || '');
    } 
    
    setCurrentModal(modal);
    setSelectedEmployee(employeeData || null);
  }
  const handleModalClose = () => {
    setId('');
    setName('');
    setEmail('');
    setCpf('');
    setPassword('');
    setCurrentModal(false);
  }

  useEffect(() => {
    getEmployeeData().then(([data]) => {
      setDataCard(data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const registerEmployer = (employeeData: any) => {
    postEmployeeData(employeeData).then(([data]) => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  };

  const updateEmployer = (employeeData: any) => {
    putEmployeeData(employeeData).then(([data]) => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  };

  const employees: EmployeeData[] = dataCard ? dataCard.body.employees.map(employee => ({
    id: employee.id,
    name: employee.name,
    email: employee.email,
    cpf: employee.cpf,
    status: employee.status,
    created_at: employee.created_at,
    updated_at: employee.updated_at,
  })) : [];

  return (
    <div className={style.container}>
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
        <Modal open={openRegisterEmployee} setOpen={handleRegisterEmployeeOpen} onClose={handleRegisterEmployeeClose}>
          <div className={style.container}>
            <span>Cadastrar Funcionário</span>
            <div className={style.contentForm}>
              <TextField id="name" fullWidth size="small" color="primary" label="Nome" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField id="email" fullWidth size="small" color="primary" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField id="cpf" fullWidth size="small" color="primary" label="CPF" variant="outlined" value={cpf} onChange={(e) => setCpf(e.target.value)} />
              <TextField id="password" fullWidth size="small" color="primary" label="Senha" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button variant="contained" color="primary" onClick={() => registerEmployer({ name, email, cpf, password })}>Cadastrar</Button>
            </div>
          </div>
        </Modal>
      </div >
      <div className={style.content}>
        <TableDefault data={employees} onModalChange={handleModalChange} />
        <Modal open={currentModal} setOpen={setCurrentModal} onClose={handleModalClose}>
          {selectedEmployee ? (
            <>
              <TextField id="name" fullWidth size="small" color="primary" label="Nome" variant="outlined" value={name || ''} onChange={(e) => setName(e.target.value)} />
              <TextField id="email" fullWidth size="small" color="primary" label="Email" variant="outlined" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
              <TextField id="cpf" fullWidth size="small" color="primary" label="CPF" variant="outlined" value={cpf || ''} onChange={(e) => setCpf(e.target.value)} />
              <TextField id="password" fullWidth size="small" color="primary" label="Senha" variant="outlined" type="password" value={password || ''} onChange={(e) => setPassword(e.target.value)} />
              <Button variant="contained" color="primary" onClick={() => updateEmployer({ id, name, email, cpf, password })}>Update</Button>
            </>
          ) : (
            <span>Nenhum funcionário selecionado</span>
          )}
        </Modal>
      </div>
    </div >

  );
}

export default Employers;