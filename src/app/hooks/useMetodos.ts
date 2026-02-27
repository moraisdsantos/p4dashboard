import { useState } from 'react';
import Papa from 'papaparse';
import { Metodo, PassoMetodo, parseMetodo, parsePasso } from '../data/metodos';

export const useMetodos = () => {
  const [metodos, setMetodos] = useState<Metodo[]>([]);
  const [passos, setPassos] = useState<PassoMetodo[]>([]);
  // Não carrega dados automaticamente: somente após o usuário enviar os CSVs.
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fichaTecnicaLoaded, setFichaTecnicaLoaded] = useState(false);
  const [passosLoaded, setPassosLoaded] = useState(false);

  const loadFichaTecnica = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        delimiter: ',',
        complete: (results) => {
          try {
            const metodosData = results.data.map(parseMetodo).filter(m => m.id && m.nome);
            console.log('Ficha Técnica carregada:', metodosData.length, 'métodos');
            setMetodos(metodosData);
            setFichaTecnicaLoaded(true);
            setError(null);
            resolve();
          } catch (err) {
            console.error('Erro ao processar ficha técnica:', err);
            setError('Erro ao processar o arquivo de ficha técnica.');
            reject(err);
          }
        },
        error: (err) => {
          console.error('Erro ao ler arquivo:', err);
          setError('Erro ao ler o arquivo CSV de ficha técnica.');
          reject(err);
        }
      });
    });
  };

  const loadPassosAplicacao = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        delimiter: ',',
        complete: (results) => {
          try {
            const passosData = results.data.map(parsePasso).filter(p => p.id && p.metodoId);
            console.log('Passos carregados:', passosData.length, 'passos');
            setPassos(passosData);
            setPassosLoaded(true);
            setError(null);
            resolve();
          } catch (err) {
            console.error('Erro ao processar passos:', err);
            setError('Erro ao processar o arquivo de passos de aplicação.');
            reject(err);
          }
        },
        error: (err) => {
          console.error('Erro ao ler arquivo:', err);
          setError('Erro ao ler o arquivo CSV de passos.');
          reject(err);
        }
      });
    });
  };

  const getPassosByMetodo = (metodoId: string): PassoMetodo[] => {
    return passos.filter(p => p.metodoId === metodoId).sort((a, b) => {
      const numA = parseInt(a.passo.replace('Passo ', '')) || 0;
      const numB = parseInt(b.passo.replace('Passo ', '')) || 0;
      return numA - numB;
    });
  };

  return { 
    metodos, 
    passos, 
    loading, 
    error, 
    getPassosByMetodo,
    loadFichaTecnica,
    loadPassosAplicacao,
    fichaTecnicaLoaded,
    passosLoaded
  };
};