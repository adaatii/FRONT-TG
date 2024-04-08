import { useEffect, useState } from "react";
import style from "./employers.module.scss"
import { Users } from "@phosphor-icons/react";
import TableDefault, { EmployeeData } from "../TableEmployers/table";
import employeesHook from "../../../../api/Hooks/employers";

// Defina um tipo para o estado dataCard para evitar erros de tipo
interface DataCard {
 body: {
    employees: EmployeeData[];
 };
}

function Employers() {
 // Use o tipo DataCard para o estado dataCard
 const [dataCard, setDataCard] = useState<DataCard | null>(null);

 useEffect(() => {
    employeesHook("employee", {}).then(([data]) => {
      setDataCard(data);
    }).catch(error => {
      console.log(error);
    });
 }, [])

 // Verifique se dataCard não é null antes de tentar mapear os dados
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
      <div className={style.content}>
        <TableDefault data={employees} />
      </div>

      {/* <div className={style.content}>
        <TextField id="name" size="small" color="primary" label="Nome" variant="outlined" />
        <TextField id="email" size="small" color="primary" label="Email" variant="outlined" />
        <TextField id="cpf" size="small" color="primary" label="CPF" variant="outlined" />
        <TextField id="password" size="small" color="primary" label="Senha" variant="outlined" type="password" />
        <Button variant="contained" color="primary">Cadastrar</Button>
      </div> */}
    </div>
  );
}

export default Employers;