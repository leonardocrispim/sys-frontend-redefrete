export default function formatDate(data: string) {
  var split = data.split('-'); // Divide a string da data em partes separadas

  // Extrai os componentes da data
  var day = split[2];
  var month = split[1];
  var year = split[0];

  // Formata a data no formato desejado
  var dateFormated = day + '/' + month + '/' + year;

  return dateFormated;
}
