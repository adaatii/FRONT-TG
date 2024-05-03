export default function errorHandling(data: any) {
  type ErrorType = "error" | "warning" | "info" | "success";

  interface ErrorMessage {
    text: string;
    type: ErrorType;
  }
  let errors: ErrorMessage[] = [];
  console.log(data);

  if (data[0].message) {
    let result: ErrorMessage = {
      text: "",
      type: "success",
    };
    switch (data[0].message) {
      case "Employee created successfully":
        result.text = "Funcionário cadastrado com sucesso.";
        result.type = "success";
        break;
      case "Employee updated successfully":
        result.text = "Funcionário atualizado com sucesso.";
        result.type = "success";
        break;
      case "Employee deleted successfully":
        result.text = "Funcionário desativado com sucesso.";
        result.type = "success";
        break;
      case "Category created successfully":
        result.text = "Categoria cadastrado com sucesso.";
        result.type = "success";
        break;
      case "Category updated successfully":
        result.text = "Categoria atualizado com sucesso.";
        result.type = "success";
        break;
      case "Category deleted successfully":
        result.text = "Categoria desativado com sucesso.";
        result.type = "success";
        break;
      case "Product created successfully":
        result.text = "Produto cadastrado com sucesso.";
        result.type = "success";
        break;
      case "Product updated successfully":
        result.text = "Produto atualizado com sucesso.";
        result.type = "success";
        break;
      case "Product deleted successfully":
        result.text = "Produto desativado com sucesso.";
        result.type = "success";
        break;
      case "Login successfully":
        result.text = "Login realizado com sucesso.";
        result.type = "success";
        break;
      default:
        result.text = "Sucesso ao realizar essa ação!";
        result.type = "success";
        break;
    }
    errors.push(result);
  } else if (data[0].errors) {
    const errorKeys = Object.keys(data[0].errors);
    for (const key of errorKeys) {
      const errorMessages = data[0].errors[key];
      errorMessages.forEach((errorMessage: string) => {
        let result: ErrorMessage = {
          text: "",
          type: "error",
        };
        switch (errorMessage) {
          case "The name field is required.":
            result.text = "O campo nome é obrigatório.";
            result.type = "error";
            break;
          case "The name must be a string.":
            result.text = "O nome é inválido";
            result.type = "error";
            break;
          case "The CPF field is required.":
            result.text = "O campo CPF é obrigatório.";
            result.type = "error";
            break;
          case "The CPF must be a string.":
            result.text = "O CPF é inválido.";
            result.type = "error";
            break;
          case "The CPF has already been taken.":
            result.text = "CPF já cadastrado";
            result.type = "error";
            break;
          case "Invalid CPF.":
            result.text = "CPF inválido";
            result.type = "error";
            break;
          case "The email field is required.":
            result.text = "O campo email é obrigatório.";
            result.type = "error";
            break;
          case "The email must be a valid email address.":
            result.text = "O email deve ser um endereço válido.";
            result.type = "error";
            break;
          case "The email has already been taken.":
            result.text = "Email já cadastrado";
            result.type = "error";
            break;
          case "The password field is required.":
            result.text = "O campo senha é obrigatório.";
            result.type = "error";
            break;
          case "The password must be a string.":
            result.text = "A senha é inválido";
            result.type = "error";
            break;
          case "The password must be at least 8 characters.":
            result.text = "A senha deve ter pelo menos 8 caracteres.";
            result.type = "error";
            break;
          case "Employee not created":
            result.text = "Falha ao cadastrar funcionário";
            result.type = "error";
            break;
          case "Employee not updated":
            result.text = "Falha ao atualizar funcionário";
            result.type = "error";
            break;
          case "Employee not deleted":
            result.text = "Falha ao deletar funcionário";
            result.type = "error";
            break;
          case "The category field is required.":
            result.text = "O campo descrição é obrigatório.";
            result.type = "error";
            break;
          case "The category must be a string.":
            result.text = "A categoria é inválido";
            result.type = "error";
            break;
          case "The category has already been taken.":
            result.text = "Categoria já cadastrada";
            result.type = "error";
            break;
          case "Category not created":
            result.text = "Falha ao cadastrar categoria";
            result.type = "error";
            break;
          case "Category not updated":
            result.text = "Falha ao atualizar categoria";
            result.type = "error";
            break;
          case "Category not deleted":
            result.text = "Falha ao deletar categoria";
            result.type = "error";
            break;
          case "The Category may not be greater than 255 characters":
            result.text =
              "O campo descrição não pode ter mais de 255 caracteres.";
            result.type = "error";
            break;
          case "The product field is required.":
            result.text = "O campo produto é obrigatório.";
            result.type = "error";
            break;
          case "The product must be a string.":
            result.text = "O produto é inválido";
            result.type = "error";
            break;
          case "The product has already been taken.":
            result.text = "Produto já cadastrado";
            result.type = "error";
            break;
          case "The price field is required.":
            result.text = "O campo preço é obrigatório.";
            result.type = "error";
            break;
          case "The price must be a number.":
            result.text = "O preço é inválido";
            result.type = "error";
            break;

          case "Product not created":
            result.text = "Falha ao cadastrar produto";
            result.type = "error";
            break;
          case "Product not updated":
            result.text = "Falha ao atualizar produto";
            result.type = "error";
            break;
          case "Product not deleted":
            result.text = "Falha ao deletar produto";
            result.type = "error";
            break;
          case "The Product may not be greater than 255 characters":
            result.text =
              "O campo descrição não pode ter mais de 255 caracteres.";
            result.type = "error";
            break;
          default:
            result.text = "Falha ao realizar essa ação!";
            result.type = "error";
            break;
        }
        errors.push(result);
      });
    }
  }

  return errors;
}

