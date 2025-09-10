import Container from "../components/Container";
import smartphone from "../assets/img/smartphone.jpg";
import { useState } from "react";

function IconIdeia(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M12 2C8.686 2 6 4.686 6 8c0 2.215 1.11 4.174 2.808 5.352A3.968 3.968 0 009 16h6c0-.996.37-1.905.808-2.648C17.11 12.174 18 10.215 18 8c0-3.314-2.686-6-6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 16v1c0 1.105.895 2 2 2h2c1.105 0 2-.895 2-2v-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 21h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SubmeterIdeia() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    estagio: "",
    proponente: "",
    contato: "",
    materiais: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de envio do formulário
    console.log("Formulário enviado:", formData);
    alert("Ideia submetida com sucesso! Nossa equipe entrará em contato em breve.");
    // Resetar formulário e esconder após submissão
    setFormData({
      titulo: "",
      descricao: "",
      estagio: "",
      proponente: "",
      contato: "",
      materiais: ""
    });
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${smartphone})` }}
    >
      {/* Escurecimento geral da cena para legibilidade */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#06122b]/80" />
      {/* Fade branco nas bordas superior/inferior + brilhos cinza sutis */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 6%, rgba(255,255,255,0) 94%, rgba(255,255,255,1) 100%), radial-gradient(60% 50% at 18% 25%, rgba(93,208,223,0.14), transparent), radial-gradient(55% 45% at 80% 28%, rgba(93,208,223,0.12), transparent), radial-gradient(60% 50% at 8% 12%, rgba(180,190,200,0.20), transparent), radial-gradient(55% 45% at 92% 18%, rgba(180,190,200,0.16), transparent)",
        }}
      />

      <Container className="py-8 md:py-12">
        {/* Cabeçalho */}
        <div className="text-center text-white mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/80">
            Inovação Aberta
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
            Sua Ideia Pode Melhorar os Serviços Públicos
          </h1>
          <div className="mt-6 max-w-4xl mx-auto">
            <p className="text-lg text-white/90 mb-4">
              Tem uma proposta inovadora para aprimorar os serviços públicos? Este é um espaço aberto para toda a comunidade de inovação contribuir com ideias e soluções. Independentemente do seu perfil – pesquisador acadêmico, startup, servidor público ou cidadão comum – sua contribuição é bem-vinda.
            </p>
            <p className="text-white/80 mb-4">
              Nossa plataforma aceita desde ideias iniciais até soluções já em prática. O objetivo é coletar propostas capazes de gerar impacto positivo nos serviços públicos, em qualquer estágio de desenvolvimento. Pode ser um conceito embrionário, um projeto de pesquisa em andamento ou uma solução pronta para ser implementada – todas as ideias que contribuam para a melhoria do serviço público são valorizadas.
            </p>
            <p className="text-white/80 mb-6">
              Não se trata de um concurso formal, edital ou licitação, mas de um convite contínuo à colaboração. Aqui, qualquer pessoa ou organização pode apresentar sugestões livremente, aproveitando a inteligência coletiva para inovar junto com o governo.
            </p>
          </div>
        </div>

        {/* Seção de Submissão */}
        <div className="max-w-4xl mx-auto">
          {!showForm ? (
            /* Botão para mostrar formulário */
            <div className="text-center">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-8 md:p-12 text-white backdrop-blur">
                <div className="flex flex-col items-center">
                  <IconIdeia className="size-16 text-brand-300 mb-6" />
                  <h2 className="text-3xl font-semibold mb-4">Pronto para Compartilhar sua Ideia?</h2>
                  <p className="text-white/80 mb-8 max-w-2xl">
                    Clique no botão abaixo para acessar o formulário de submissão. Suas informações nos ajudarão a avaliar e entrar em contato sobre propostas promissoras.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105"
                  >
                    Preencher Formulário
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Formulário */
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8 text-white backdrop-blur">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <IconIdeia className="size-8 text-brand-300" />
                  <h2 className="text-2xl font-semibold">Submeta sua Ideia</h2>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Fechar formulário"
                >
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-white/80 mb-8">
                Preencha o formulário abaixo com algumas informações simples para submeter sua ideia. Assim, podemos realizar uma avaliação inicial e entrar em contato nos casos de propostas promissoras:
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="titulo" className="block text-sm font-medium text-white/90 mb-2">
                      Título da Ideia *
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      required
                      value={formData.titulo}
                      onChange={handleInputChange}
                      placeholder="Um nome breve que resuma sua proposta"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="estagio" className="block text-sm font-medium text-white/90 mb-2">
                      Estágio da Solução *
                    </label>
                    <select
                      id="estagio"
                      name="estagio"
                      required
                      value={formData.estagio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                    >
                      <option value="" className="bg-gray-800">Selecione o estágio</option>
                      <option value="conceito-inicial" className="bg-gray-800">Conceito inicial</option>
                      <option value="em-desenvolvimento" className="bg-gray-800">Em desenvolvimento/pesquisa</option>
                      <option value="solucao-aplicada" className="bg-gray-800">Solução já aplicada</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-white/90 mb-2">
                    Descrição *
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    required
                    rows={5}
                    value={formData.descricao}
                    onChange={handleInputChange}
                    placeholder="Explique sua ideia ou solução, destacando qual problema do serviço público ela pretende resolver e como poderá melhorar a vida dos cidadãos"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="proponente" className="block text-sm font-medium text-white/90 mb-2">
                      Proponente *
                    </label>
                    <input
                      type="text"
                      id="proponente"
                      name="proponente"
                      required
                      value={formData.proponente}
                      onChange={handleInputChange}
                      placeholder="Seu nome (ou da equipe/organização) e perfil"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="contato" className="block text-sm font-medium text-white/90 mb-2">
                      Contato *
                    </label>
                    <input
                      type="email"
                      id="contato"
                      name="contato"
                      required
                      value={formData.contato}
                      onChange={handleInputChange}
                      placeholder="E-mail para contato"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="materiais" className="block text-sm font-medium text-white/90 mb-2">
                    Materiais de Apoio (opcional)
                  </label>
                  <input
                    type="url"
                    id="materiais"
                    name="materiais"
                    value={formData.materiais}
                    onChange={handleInputChange}
                    placeholder="Link ou arquivo contendo detalhes adicionais, esboços ou resultados já obtidos"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                  />
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg transition-colors duration-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    Submeter Ideia
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Call to Action Final */}
        <div className="text-center text-white mt-12 max-w-3xl mx-auto">
          <p className="text-lg font-medium mb-2">
            Sua ideia pode ser o próximo passo para inovarmos os serviços públicos!
          </p>
          <p className="text-white/80">
            Todas as submissões serão recebidas pela nossa equipe de inovação. Compartilhe sua visão e faça parte da transformação do setor público. Juntos, vamos construir soluções melhores para a sociedade, unindo governo e comunidade em prol do bem comum.
          </p>
        </div>
      </Container>
    </section>
  );
}
