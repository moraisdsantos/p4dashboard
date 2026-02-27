import { useRef } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

interface CSVUploaderProps {
  onFichaTecnicaLoad: (file: File) => Promise<void>;
  onPassosLoad: (file: File) => Promise<void>;
  fichaTecnicaLoaded: boolean;
  passosLoaded: boolean;
}

export const CSVUploader = ({
  onFichaTecnicaLoad,
  onPassosLoad,
  fichaTecnicaLoaded,
  passosLoaded,
}: CSVUploaderProps) => {
  const fichaInputRef = useRef<HTMLInputElement>(null);
  const passosInputRef = useRef<HTMLInputElement>(null);

  const handleFichaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onFichaTecnicaLoad(file);
    }
  };

  const handlePassosChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onPassosLoad(file);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Carregar Dados CSV</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Ficha Técnica */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Ficha Técnica
          </label>
          <div className="flex items-center gap-2">
            <input
              ref={fichaInputRef}
              type="file"
              accept=".csv"
              onChange={handleFichaChange}
              className="hidden"
            />
            <Button
              onClick={() => fichaInputRef.current?.click()}
              variant={fichaTecnicaLoaded ? "outline" : "default"}
              className="flex-1"
            >
              {fichaTecnicaLoaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Carregado
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Escolher arquivo
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            CSV com as fichas técnicas dos métodos
          </p>
        </div>

        {/* Passos de Aplicação */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Passos de Aplicação
          </label>
          <div className="flex items-center gap-2">
            <input
              ref={passosInputRef}
              type="file"
              accept=".csv"
              onChange={handlePassosChange}
              className="hidden"
            />
            <Button
              onClick={() => passosInputRef.current?.click()}
              variant={passosLoaded ? "outline" : "default"}
              className="flex-1"
            >
              {passosLoaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Carregado
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Escolher arquivo
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            CSV com os passos de aplicação dos métodos
          </p>
        </div>
      </div>
    </div>
  );
};
