import { Metodo } from '../data/metodos';
import { Users, Clock, Calendar, MapPin } from 'lucide-react';

interface MetodoCardProps {
  metodo: Metodo;
  onClick: () => void;
}

export const MetodoCard = ({ metodo, onClick }: MetodoCardProps) => {
  // Extrair primeira linha da descrição para resumo
  const getResumo = (texto: string) => {
    const linhas = texto.split('\n').filter(l => l.trim());
    return linhas[0] || texto.substring(0, 150);
  };

  // Badge de nível de esforço com cores
  const getNivelEsforcoColor = (nivel: string) => {
    const nivelLower = nivel.toLowerCase();
    if (nivelLower.includes('baixo')) return 'bg-green-100 text-green-800';
    if (nivelLower.includes('médio') || nivelLower.includes('medio')) return 'bg-yellow-100 text-yellow-800';
    if (nivelLower.includes('alto')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-blue-300 group"
    >
      {/* Família/Eixo tag */}
      {metodo.familia && (
        <div className="flex flex-wrap gap-2 mb-3">
          {metodo.familia.split(',').map((fam, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
            >
              {fam.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Nome do Método */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
        {metodo.nome}
      </h3>

      {/* Equipe e Esforço - PRIORIZADO */}
      <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-100">
        {metodo.nivelEsforco && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getNivelEsforcoColor(metodo.nivelEsforco)}`}>
              {metodo.nivelEsforco}
            </span>
          </div>
        )}
        
        {metodo.tamanhoGrupo && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-600">
              {metodo.tamanhoGrupo}
            </span>
          </div>
        )}
      </div>

      {/* Equipe Necessária */}
      {metodo.equipeNecessaria && (
        <div className="mb-4 text-sm text-gray-700 line-clamp-2">
          <span className="font-semibold text-gray-900">Equipe: </span>
          {metodo.equipeNecessaria.substring(0, 100)}
          {metodo.equipeNecessaria.length > 100 && '...'}
        </div>
      )}

      {/* Descrição resumida */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {getResumo(metodo.descricao)}
      </p>

      {/* Informações adicionais */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
        {metodo.duracao && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{metodo.duracao}</span>
          </div>
        )}
        
        {metodo.modalidade && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{metodo.modalidade}</span>
          </div>
        )}
      </div>

      {/* Botão ver mais */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-blue-600 font-medium group-hover:underline">
          Ver detalhes e passos →
        </span>
      </div>
    </div>
  );
};
