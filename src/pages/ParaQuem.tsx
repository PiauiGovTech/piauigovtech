import Container from "../components/Container";
import smartphone from "../assets/img/smartphone.jpg";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

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
    materiais: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    try {
      const payload = {
        title: formData.titulo.trim(),
        description: formData.descricao.trim(),
        stage: formData.estagio,
        proposer_name: formData.proponente.trim(),
        contact_email: formData.contato.trim().toLowerCase(),
        support_materials_url: formData.materiais.trim() || null,
      };

      const missingRequired = [
        payload.title,
        payload.description,
        payload.stage,
        payload.proposer_name,
        payload.contact_email,
      ].some((value) => !value);

      if (missingRequired) {
        throw new Error("Preencha todos os campos obrigatórios.");
      }

      const { data, error } = await supabase
        .from("innovation_proposals")
        .insert([payload])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("Não foi possível confirmar o registro da proposta.");
      }

      setFeedbackMessage(
        "Solução apresentada com sucesso! Nossa equipe entrará em contato em breve."
      );
      setFormData({
        titulo: "",
        descricao: "",
        estagio: "",
        proponente: "",
        contato: "",
        materiais: "",
      });
      setShowForm(false);
    } catch (err: any) {
      setSubmitError(
        err?.message || "Não foi possível enviar sua proposta agora."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Evita 100vh no mobile: usa altura mínima mais suave e espaço inferior
  const sectionClass = showForm ? "relative bg-transparent" : "relative bg-transparent min-h-[70vh] lg:min-h-screen";

  return (
    <section className={sectionClass}>
      {/* Local divider matching footer width */}
      <div className="mx-auto max-w-7xl border-t border-white/10 px-6" />
      {/* Escurecimento geral da cena para legibilidade */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#06122b]/80" />
      {/* Subtle white glows to match hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>

      <Container className="pt-8 md:pt-12 pb-12 md:pb-16">
        {/* Cabeçalho */}
        <div className="text-center text-white mb-12">
          {/* <div className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Inovação
          </div> */}
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
           Conecte sua inovação ao poder público
          </h1>
          <div className="mt-6 max-w-4xl mx-auto">
            <p className="text-lg text-white/90 mb-4">
              Compartilhe sua solução em qualquer fase (ideia, pesquisa,
              piloto ou produto). A Piauí Gov Tech recebe e conecta você aos
              atores certos: academia, startups, governo e laboratórios.
            </p>
          </div>
        </div>

        {/* Seção de Submissão */}
        <div className="max-w-4xl mx-auto">
          {!showForm ? (
            /* Botão para mostrar formulário */
            <div className="text-center mb-10 md:mb-12">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-8 md:p-12 text-white backdrop-blur">
                <div className="flex flex-col items-center">
                  <IconIdeia className="size-16 text-brand-300 mb-6" />
                  <h2 className="text-3xl font-semibold mb-4">
                    Proponha sua solução
                  </h2>
                  <p className="text-white/80 mb-6 max-w-2xl">
                    Sua contribuição pode gerar conexões e inspirar novas soluções.
                  </p>
                  {feedbackMessage && (
                    <div className="mb-6 w-full max-w-xl rounded-lg border border-green-300/40 bg-green-500/10 px-4 py-3 text-sm text-green-100">
                      {feedbackMessage}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setFeedbackMessage(null);
                      setSubmitError(null);
                    }}
                    className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 cursor-pointer"
                  >
                    Enviar proposta
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
                  <h2 className="text-2xl font-semibold">Apresente sua solução</h2>
                </div>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setSubmitError(null);
                  }}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer"
                  aria-label="Fechar formulário"
                >
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="rounded-lg border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {submitError}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="titulo"
                      className="block text-sm font-medium text-white/90 mb-2"
                    >
                      Título *
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
                    <label
                      htmlFor="estagio"
                      className="block text-sm font-medium text-white/90 mb-2"
                    >
                      Estágio *
                    </label>
                    <select
                      id="estagio"
                      name="estagio"
                      required
                      value={formData.estagio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition cursor-pointer"
                    >
                      <option value="" className="bg-gray-800">
                        Selecione o estágio da solução
                      </option>
                      <option value="conceito-inicial" className="bg-gray-800">
                        Conceito inicial
                      </option>
                      <option
                        value="em-desenvolvimento"
                        className="bg-gray-800"
                      >
                        Em desenvolvimento/pesquisa
                      </option>
                      <option value="solucao-aplicada" className="bg-gray-800">
                        Solução já aplicada
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="descricao"
                    className="block text-sm font-medium text-white/90 mb-2"
                  >
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
                    <label
                      htmlFor="proponente"
                      className="block text-sm font-medium text-white/90 mb-2"
                    >
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
                    <label
                      htmlFor="contato"
                      className="block text-sm font-medium text-white/90 mb-2"
                    >
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
                  <label
                    htmlFor="materiais"
                    className="block text-sm font-medium text-white/90 mb-2"
                  >
                    Materiais de apoio (opcional)
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
                    onClick={() => {
                      setShowForm(false);
                      setSubmitError(null);
                    }}
                    className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg transition-colors duration-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 bg-brand-500 hover:bg-brand-600 disabled:bg-white/30 disabled:text-white/60 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer disabled:cursor-not-allowed"
                  >
                    {submitting ? "Enviando..." : "Enviar solução"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Call to Action Final */}
        {/* <div className="text-center text-white mt-12 max-w-3xl mx-auto">
          <p className="text-lg font-medium mb-2">
            Sua ideia pode ser o próximo passo para inovarmos os serviços
            públicos!
          </p>
          <p className="text-white/80 ">
            Compartilhe sua visão e faça parte da transformação do setor
            público. Juntos, vamos construir soluções melhores para a sociedade,
            unindo governo e comunidade em prol do bem comum.
          </p>
        </div> */}
      </Container>
    </section>
  );
}
