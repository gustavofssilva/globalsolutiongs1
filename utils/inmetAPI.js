import axios from 'axios';

export default async function getInmetAlert(uf) {

//   Força um alerta falso para teste:
 // return {
   // title: 'Alerta de teste: Calor Extremo',
   // description: 'Temperaturas muito altas previstas para os próximos dias. Mantenha-se hidratado e evite exposição ao sol.',
   // level: 'aviso',
  //};


  try {
    const response = await axios.get(`https://apiprevmet3.inmet.gov.br/avisos/${uf}`);
    const data = response.data;

    const firstKey = Object.keys(data)[0];
    if (firstKey) {
      const alert = data[firstKey];
      return {
        title: alert.titulo,
        description: alert.mensagem,
        level: alert.nivel,
      };
    }

    return null;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Erro ao buscar alerta INMET:', error.message);
    return null;
  }
}
