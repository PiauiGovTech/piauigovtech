import imgInCompany from "../assets/img/InCompany.png";
import imgLGPD from "../assets/img/LGPD.png";

export type Instructor = {
  name: string;
  bullets: string[];
};

export type CourseInfoItem = {
  label: string;
  value: string;
};

export type CourseDetails = {
  presentation?: string[];
  hours?: string;
  modality?: string;
  instructors?: Instructor[];
  objectives?: string[];
  content?: string[];
  methodology?: string[];
  audience?: string[];
  investment?: string;
  includes?: string[];
  quickInfo?: CourseInfoItem[];
  contact?: {
    name?: string;
    email?: string;
    whatsapp?: string; // raw phone or wa.me url
    instagram?: string; // handle or url
  };
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  details?: CourseDetails;
};

export const courses: Course[] = [
  {
    slug: "in-company",
    title: "Inteligência Artificial Aplicada à Advocacia",
    description: "Este curso foi criado para advogados e escritórios de advocacia que desejam compreender, dominar e aplicar a inteligência artificial no dia a dia jurídico.",
    image: imgInCompany,
    details: {
      quickInfo: [
        { label: "Início do curso", value: "21/10/2025" },
        { label: "Quando acontece", value: "21, 23, 28 e 30/10" },
        { label: "Inscrições até", value: "20/10/2025" },
        { label: "Dias da semana", value: "Terças e quintas-feiras" },
        { label: "Carga horária", value: "12 horas" },
        { label: "Horário", value: "19h30 às 22h30" },
      ],
      presentation: [
        "Este curso foi criado para advogados e escritórios de advocacia que desejam compreender, dominar e aplicar a inteligência artificial no dia a dia jurídico.",
        "Com foco em produtividade, segurança jurídica e inovação, oferecemos um aprendizado adaptado ao tamanho e às necessidades específicas do seu escritório.",
      ],
      hours: "12h",
      modality: "Presencial",
      instructors: [
        {
          name: "Berto Igor Caballero",
          bullets: [
            "Doutor em Direito com ênfase em Inteligência Artificial;",
            "Professor Adjunto na Universidade Federal do Piauí;",
            "Advogado com mais de 16 anos de experiência;",
            "Pesquisador em Direito e Tecnologia;",
            "Coordenador de políticas e éticas na Secretaria de Inteligência Artificial do Estado do Piauí;",
            "Palestrante em eventos nacionais sobre IA, LGPD e modernização da Justiça.",
          ],
        },
        {
          name: "João Gilberto",
          bullets: [
            "Advogado nas áreas cível, trabalhista e societária;",
            "Gerente de apoio técnico na Secretaria de Inteligência Artificial, Economia Digital, Ciência, Tecnologia e Inovação do Estado do Piauí;",
            "Especialista em Direito Público Municipal e Direito Eleitoral (ESA/PI);",
            "Pós-Graduando em Direito Civil e Processo Civil (iCEV).",
          ],
        },
      ],
      objectives: [
        "Capacitar advogados para o uso seguro e eficiente de ferramentas de IA;",
        "Aprimorar a redação jurídica, gestão de prazos e atendimento ao cliente com tecnologia;",
        "Identificar oportunidades de automação e inovação no ambiente jurídico;",
        "Oferecer soluções tecnológicas acessíveis para a rotina da advocacia.",
      ],
      content: [
        "Fundamentos da IA aplicada ao Direito",
        "ChatGPT na advocacia: escrita, estratégia e atendimento",
        "Ferramentas complementares: NotebookLM e copilotos jurídicos",
        "Integração prática da IA e de ferramentas tecnológicas",
      ],
      methodology: [
        "Aulas expositivas com linguagem acessível;",
        "Atividades práticas distribuídas em todos os módulos;",
        "Estudos de caso, simulações e uso real de ferramentas gratuitas;",
        "Conteúdo adaptado à área de atuação e porte do escritório.",
      ],
      // O público-alvo não foi especificado claramente no texto enviado.
      // Quando informado, adicione aqui.
      investment: "R$ 7.500,00 (sete mil e quinhentos reais)",
      includes: [
        "Planejamento personalizado conforme o perfil do escritório",
        "Material didático digital para os participantes",
        "Acesso posterior a modelos de prompts, referências e ferramentas abordadas",
      ],
      contact: {
        name: "Berto Igor Caballero",
        email: "berto@caballerorocha.com",
        whatsapp: "5586994231397",
        instagram: "profbertoigor",
      },
    },
  },
  {
    slug: "lgpd-saude-seguranca",
    title: "Proteção de Dados Pessoais na Saúde e na Segurança Pública",
    description: "Capacitação presencial em Teresina-PI para equipes de saúde e segurança aplicarem a LGPD com segurança e transparência.",
    image: imgLGPD,
    details: {
      quickInfo: [
        { label: "Início do curso", value: "26/09/2025" },
        { label: "Quando acontece", value: "26 e 27/09; 10 e 11/10" },
        { label: "Local", value: "Teresina/PI" },
        { label: "Carga horária", value: "40 horas/aula" },
        { label: "Modalidade", value: "Presencial" },
      ],
      presentation: [
        "Datas: 26 e 27 de setembro de 2025; 10 e 11 de outubro de 2025 (Teresina/PI).",
        "Realização: Grupo de Pesquisa \"Mudanças Institucionais na Ordem Privada\" - UFPI (coordenação geral: Prof. Dr. Éfren Paulo Porfírio de Sá Lima).",
        "Curso responde à necessidade de conformidade com a LGPD em instituições de saúde e segurança, prevenindo incidentes e fortalecendo a confiança social.",
      ],
      hours: "40 horas/aula",
      modality: "Presencial",
      instructors: [
        {
          name: "Grupo de Pesquisa Mudanças Institucionais na Ordem Privada - UFPI",
          bullets: [
            "Coordenação geral: Prof. Dr. Éfren Paulo Porfírio de Sá Lima.",
          ],
        },
      ],
      objectives: [
        "Capacitar profissionais da saúde e da segurança pública para a correta aplicação e gestão da LGPD, com ênfase em boas práticas institucionais.",
        "Compreender fundamentos e conceitos-chave da proteção de dados pessoais.",
        "Identificar dados sensíveis e riscos típicos nos contextos de saúde e segurança pública.",
        "Estruturar rotinas e controles de conformidade (governança, políticas e registros).",
        "Promover cultura organizacional de proteção de dados.",
      ],
      audience: [
        "Servidores da rede municipal de saúde de Teresina.",
        "Agentes e gestores da segurança pública.",
        "Profissionais interessados em adequar processos à LGPD.",
      ],
      methodology: [
        "Quatro encontros presenciais teórico-práticos (10h cada).",
        "Aulas expositivas, estudos de caso, simulações e oficinas de aplicação.",
        "Dinâmicas voltadas para rotinas institucionais de saúde e segurança pública.",
        "Entregáveis com modelos e guias para apoiar a implementação.",
      ],
      content: [
        "Fundamentos da LGPD, evolução normativa e impactos institucionais.",
        "Direitos dos titulares e obrigações de agentes de tratamento.",
        "LGPD na saúde pública: tratamento de dados, prontuário eletrônico, consentimento e gestão de riscos.",
        "LGPD e segurança pública: dados operacionais, reconhecimento facial e limites do interesse público.",
        "Governança, planos de adequação e cultura organizacional de proteção de dados.",
        "Casos práticos, simulações e oficinas para elaboração de políticas internas.",
      ],
      includes: [
        "Certificado de extensão (40h) conforme normas da instituição promotora.",
        "Modelos e guias de políticas e rotinas internas para implementação.",
      ],
    },
  },
];
