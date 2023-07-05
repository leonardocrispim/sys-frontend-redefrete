export const VehiclesConstants = {
  PASSEIO: 'PASSEIO',
  '3/4': '3/4',
  ELETRICO: 'ELÉTRICO',
  HR: 'HR',
  MOTO: 'MOTO',
  RENTAL: 'RENTAL',
  UTILITARIO: 'UTILITARIO',
  VAN: 'VAN',
  VUC: 'VUC',
};

export const vehiclesMap = [
  {value: "", type: "Selecione"},
  {value: "3/4", type: "3/4"},
  {value: "ELÉTRICO", type: "ELÉTRICO"},
  {value: "HR", type: "HR"},
  {value: "MOTO", type: "MOTO"},
  {value: "RENTAL", type: "RENTAL"},
  {value: "UTILITARIO", type: "UTILITARIO"},
  {value: "VAN", type: "VAN"},
  {value: "VUC", type: "VUC"},
]

export type VehiclesConstantsKeys = keyof typeof VehiclesConstants;
