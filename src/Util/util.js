export const formatarData = (data) =>{
  const dataObj = new Date(data);
  const dia = dataObj.getDate().toString().padStart(2, '0');
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export const formatarDinheiro = (valor) =>{
   // Converte o valor para uma string com ponto como separador decimal
   const valorString = valor.toString().replace(',', '.');

   // Formata o valor com vírgula como separador de milhares
   const [parteInteira, parteDecimal] = valorString.split('.');
   const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
   const valorFormatado = `${parteInteiraFormatada},${parteDecimal || '00'}`;
 
   return valorFormatado;
 }