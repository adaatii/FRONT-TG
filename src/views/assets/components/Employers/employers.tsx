import React, { useEffect, useState } from "react";
import style from "./employers.module.scss"
import { Users, Plus } from "@phosphor-icons/react";
import TableDefault, { EmployeeData } from "../TableEmployers/table";
import Modal from "../Modal/modal";
import { Button, TextField } from '@mui/material';
import { getEmployeeData, postEmployeeData } from "../../../../api/Hooks/employers";

interface DataCard {
  body: {
    employees: EmployeeData[];
  };
}

function Employers() {
  const [dataCard, setDataCard] = useState<DataCard | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getEmployeeData().then(([data]) => {
      setDataCard(data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const registerEmployer = (employeeData: any) => {
    const data = JSON.stringify(employeeData);

    postEmployeeData(data).then(([data]) => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  };

  const employees: EmployeeData[] = dataCard ? dataCard.body.employees.map(employee => ({
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
          onClick={handleOpen}
        >
          Adicionar Funcionario
        </Button>
        <Modal open={open} onClose={handleClose} setOpen={setOpen}>
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
        <TableDefault data={employees} />
      </div>
    </div >

  );
}

export default Employers;