import { useState, useMemo } from 'react';
import { useMetodos } from './hooks/useMetodos';
import { MetodoCard } from './components/metodo-card';
import { MetodoDialog } from './components/metodo-dialog';
import { CSVUploader } from './components/csv-uploader';
import { Metodo } from './data/metodos';
import { Search, BookOpen, AlertCircle } from 'lucide-react';

export default function App() {
  const { 
    metodos, 
    error, 
    getPassosByMetodo,
    loadFichaTecnica,
    loadPassosAplicacao,
    fichaTecnicaLoaded,
    passosLoaded
  } = useMetodos();
  const [selectedMetodo, setSelectedMetodo] = useState<Metodo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamilia, setSelectedFamilia] = useState<string>('todas');

  // Extrair todas as famílias únicas
  const familias = useMemo(() => {
    const allFamilias = new Set<string>();
    metodos.forEach(m => {
      if (m.familia) {
        m.familia.split(',').forEach(f => allFamilias.add(f.trim()));
      }
    });
    return Array.from(allFamilias).sort();
  }, [metodos]);

  // Filtrar métodos
  const filteredMetodos = useMemo(() => {
    return metodos.filter(metodo => {
      const matchSearch = 
        metodo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        metodo.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        metodo.objetivo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchFamilia = 
        selectedFamilia === 'todas' || 
        metodo.familia.toLowerCase().includes(selectedFamilia.toLowerCase());
      
      return matchSearch && matchFamilia;
    });
  }, [metodos, searchTerm, selectedFamilia]);

  const handleCardClick = (metodo: Metodo) => {
    setSelectedMetodo(metodo);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">Erro ao carregar dados</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Repositório de Métodos de Escuta Cidadã
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Inspirado no HyperIsland Toolbox • {fichaTecnicaLoaded ? `${metodos.length} métodos disponíveis` : 'carregue os CSVs para começar'}
              </p>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar métodos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={!fichaTecnicaLoaded}
                className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none ${
                  fichaTecnicaLoaded
                    ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              />
            </div>

            {/* Filtro por Família */}
            <select
              value={selectedFamilia}
              onChange={(e) => setSelectedFamilia(e.target.value)}
              disabled={!fichaTecnicaLoaded}
              className={`px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white ${
                fichaTecnicaLoaded
                  ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <option value="todas">Todas as famílias</option>
              {familias.map(familia => (
                <option key={familia} value={familia}>
                  {familia}
                </option>
              ))}
            </select>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 text-sm text-gray-600">
            {!fichaTecnicaLoaded ? (
              <span>Faça upload do CSV de Ficha Técnica para habilitar a listagem e os filtros.</span>
            ) : filteredMetodos.length === metodos.length ? (
              <span>Mostrando todos os {metodos.length} métodos</span>
            ) : (
              <span>
                Mostrando {filteredMetodos.length} de {metodos.length} métodos
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Galeria de Cards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* CSV Uploader */}
        <CSVUploader
          onFichaTecnicaLoad={loadFichaTecnica}
          onPassosLoad={loadPassosAplicacao}
          fichaTecnicaLoaded={fichaTecnicaLoaded}
          passosLoaded={passosLoaded}
        />

        {/* Aviso quando ainda não há dados */}
        {!fichaTecnicaLoaded && (
          <div className="bg-white border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Nenhum método carregado ainda</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Para o app funcionar, carregue primeiro o CSV de <strong>Ficha Técnica</strong>. Em seguida,
                  carregue o CSV de <strong>Passos de Aplicação</strong> para habilitar os passos no detalhe.
                </p>
              </div>
            </div>
          </div>
        )}

        {(!fichaTecnicaLoaded || filteredMetodos.length === 0) ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {!fichaTecnicaLoaded
                ? 'Aguardando upload do CSV de Ficha Técnica.'
                : 'Nenhum método encontrado com os filtros aplicados.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMetodos.map(metodo => (
              <MetodoCard
                key={metodo.id}
                metodo={metodo}
                onClick={() => handleCardClick(metodo)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Dialog com detalhes e passos */}
      <MetodoDialog
        metodo={selectedMetodo}
        passos={selectedMetodo ? getPassosByMetodo(selectedMetodo.id) : []}
        open={!!selectedMetodo}
        onOpenChange={(open) => !open && setSelectedMetodo(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Repositório de Métodos de Escuta Cidadã • Inspirado no{' '}
            <a
              href="https://www.hyperisland.com.br/pages/toolbox"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              HyperIsland Toolbox
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}