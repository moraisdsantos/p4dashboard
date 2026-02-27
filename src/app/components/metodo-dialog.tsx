import { Metodo, PassoMetodo } from '../data/metodos';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { 
  Users, 
  Clock, 
  Calendar, 
  MapPin, 
  Target, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

interface MetodoDialogProps {
  metodo: Metodo | null;
  passos: PassoMetodo[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MetodoDialog = ({ metodo, passos, open, onOpenChange }: MetodoDialogProps) => {
  if (!metodo) return null;

  const formatText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      
      // Se começa com > (citação)
      if (trimmed.startsWith('>')) {
        return (
          <blockquote key={idx} className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-2">
            {trimmed.substring(1).trim()}
          </blockquote>
        );
      }
      
      // Se começa com • ou - (lista)
      if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
        return (
          <li key={idx} className="ml-4 my-1">
            {trimmed.substring(1).trim()}
          </li>
        );
      }
      
      return (
        <p key={idx} className="my-2">
          {trimmed}
        </p>
      );
    });
  };

  const InfoSection = ({ title, content, icon: Icon }: { title: string; content: string; icon: any }) => {
    if (!content || content.trim() === '') return null;
    
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-gray-900">{title}</h4>
        </div>
        <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
          {formatText(content)}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="pr-8">
            {/* Badges de Família */}
            {metodo.familia && (
              <div className="flex flex-wrap gap-2 mb-3">
                {metodo.familia.split(',').map((fam, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium"
                  >
                    {fam.trim()}
                  </span>
                ))}
              </div>
            )}
            
            <DialogTitle className="text-3xl mb-4">{metodo.nome}</DialogTitle>
            
            {/* Tipologia OCDE */}
            {metodo.tipologia && (
              <p className="text-sm text-gray-600 mb-4">{metodo.tipologia}</p>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Chave - Destaque */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Nível de Esforço</p>
                  <p className="text-sm text-gray-700">{metodo.nivelEsforco}</p>
                </div>
              </div>
              
              {metodo.duracao && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Duração</p>
                    <p className="text-sm text-gray-700">{metodo.duracao}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {metodo.tamanhoGrupo && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Tamanho do Grupo</p>
                    <p className="text-sm text-gray-700">{metodo.tamanhoGrupo}</p>
                  </div>
                </div>
              )}
              
              {metodo.modalidade && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Modalidade</p>
                    <p className="text-sm text-gray-700">{metodo.modalidade}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Equipe Necessária - Destaque especial */}
          {metodo.equipeNecessaria && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-6 h-6 text-purple-600" />
                <h4 className="font-bold text-gray-900 text-lg">Equipe Necessária</h4>
              </div>
              <div className="text-sm text-gray-700">
                {formatText(metodo.equipeNecessaria)}
              </div>
            </div>
          )}

          {/* Descrição e Objetivo */}
          {metodo.descricao && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">O que é?</h4>
              <div className="text-sm text-gray-700">{formatText(metodo.descricao)}</div>
            </div>
          )}

          <InfoSection title="Objetivo" content={metodo.objetivo} icon={Target} />

          {/* Quando Usar / Não Usar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoSection title="Quando usar" content={metodo.quandoUsar} icon={CheckCircle} />
            <InfoSection title="Quando NÃO usar" content={metodo.quandoNaoUsar} icon={XCircle} />
          </div>

          {/* Público Adequado */}
          <InfoSection title="Público Adequado" content={metodo.publicoAdequado} icon={Users} />

          {/* Vantagens e Riscos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoSection title="Vantagens" content={metodo.vantagens} icon={TrendingUp} />
            <InfoSection title="Riscos e Limitações" content={metodo.riscos} icon={AlertTriangle} />
          </div>

          {/* Entregáveis */}
          {metodo.entregaveis && (
            <InfoSection title="Entregáveis" content={metodo.entregaveis} icon={CheckCircle} />
          )}

          {/* Link externo */}
          {metodo.url && (
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <a
                href={metodo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Referência externa
              </a>
            </div>
          )}

          {/* Passos de Aplicação - ACCORDION */}
          {passos.length > 0 && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Passos de Aplicação
              </h3>
              
              <Accordion type="single" collapsible className="w-full">
                {passos.map((passo, index) => (
                  <AccordionItem key={passo.id} value={`passo-${index}`} className="border-b border-gray-200">
                    <AccordionTrigger className="hover:no-underline hover:bg-gray-50 px-4 rounded">
                      <div className="flex items-center gap-3 text-left">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-gray-900">{passo.nomePasso}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-4">
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-700">
                            {formatText(passo.descricao)}
                          </div>
                        </div>
                        
                        {passo.resultado && (
                          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <p className="font-semibold text-green-900 mb-2">✓ Resultado Esperado</p>
                            <p className="text-sm text-green-800">{passo.resultado}</p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
