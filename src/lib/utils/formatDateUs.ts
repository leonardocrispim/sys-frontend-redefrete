export function formatDateUs(data: string) {
  let splited = data.split('/');
  let day = splited[0];
  let month = splited[1];
  let year = splited[2];

  const dateFormated = year + '-' + month + '-' + day;

  return dateFormated;
}
