import { Menu, MenuLine } from 'MenuTypes';
import { format } from 'date-fns';
// export const URL_BACKEND = "http://localhost:3032";
export const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

export function isMenuSelected(patch: string, menu: MenuLine) {
  return patch === menu.href;
}

export function formatPhone(phoneNumber: string) {
  const regex = /^(\d{2})\s?(\d{4,5})-?(\d{4})$/;
  const match = regex.exec(phoneNumber);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  } else {
    return phoneNumber;
  }
}

export function shortName(nomeCompleto: string) {
  const palavras = nomeCompleto.split(' ');
  const primeiroNome = palavras[0];
  const ultimoNome = palavras[palavras.length - 1];
  return `${primeiroNome} ${ultimoNome}`;
}

export function calcularPorcentagem(valor: number, total: number) {
  const porcentagem = (valor / total) * 100;
  return Math.round(porcentagem * 10) / 10; // arredonda para uma casa decimal
}

export function formatDecimal(valor: number) {
  return valor.toFixed(2).replace('.', ',');
}

export function formatDateBR(date: Date) {
  const nDate = date.toString().slice(0, 10).split('-');

  return `${nDate[2]}/${nDate[1]}/${nDate[0]}`;
}

export function timestampToBR(timestamp: string) {
  const data = new Date(timestamp);
  return format(data, 'dd/MM/yyyy');
}

export function formatCPFCNPJ(cpfCnpj: string) {
  cpfCnpj = cpfCnpj.replace(/[^\d]/g, '');

  if (cpfCnpj.length === 11) {
    return cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cpfCnpj.length === 14) {
    return cpfCnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  } else {
    // Retorna valor original se não for CPF nem CNPJ válido
    return cpfCnpj;
  }
}

export function formatPlate(plate: string) {
  plate = plate.toUpperCase().trim();
  if (plate.length === 7) {
    return plate.replace(/^(\w{3})(\w{4})$/, '$1-$2');
  } else {
    return plate;
  }
}

export function formatZipCode(zip_code: string) {
  zip_code = zip_code.toUpperCase().trim();
  if (zip_code.length === 8) {
    return zip_code.replace(/^(\w{5})(\w{3})$/, '$1-$2');
  } else {
    return zip_code;
  }
}

export function removeEspecialChars(str: string) {
  return str.replace(/[^0-9a-zA-Z]/g, '');
}

export function isValidCpfCnpj(documento: string): boolean {
  const documentoLimpo = documento.replace(/\D/g, '');

  if (documentoLimpo.length !== 11 && documentoLimpo.length !== 14) {
    return false; // Tamanho inválido para CPF ou CNPJ
  }

  if (/^(\d)\1+$/.test(documentoLimpo)) {
    return false; // CPF ou CNPJ inválido se for uma sequência de números iguais
  }

  if (documentoLimpo.length === 11) {
    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma += parseInt(documentoLimpo.charAt(i)) * (10 - i);
    }

    let resto = soma % 11;
    if (resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto !== parseInt(documentoLimpo.charAt(9))) {
      return false; // CPF inválido se o dígito verificador não for válido
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma += parseInt(documentoLimpo.charAt(i)) * (11 - i);
    }

    resto = soma % 11;
    if (resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto !== parseInt(documentoLimpo.charAt(10))) {
      return false; // CPF inválido se o dígito verificador não for válido
    }
  } else {
    let tamanho = documentoLimpo.length - 2;
    let numeros = documentoLimpo.substring(0, tamanho);
    const digitos = documentoLimpo.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado !== parseInt(digitos.charAt(0))) {
      return false; // CNPJ inválido se o primeiro dígito verificador não for válido
    }

    tamanho = tamanho + 1;
    numeros = documentoLimpo.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado !== parseInt(digitos.charAt(1))) {
      return false; // CNPJ inválido se o segundo dígito verificador não for válido
    }
  }

  return true; // CPF ou CNPJ válido
}

export function isValidEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value.match(emailRegex)) {
    return false;
  }
  return true;
}
