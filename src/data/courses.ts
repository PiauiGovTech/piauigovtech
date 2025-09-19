import imgInCompany from "../assets/img/InCompany.png";

export type Instructor = {
  name: string;
  bullets: string[];
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
    slug: "curso-2",
    title: "Curso 2",
    description: "descricao 2",
  },
  {
    slug: "curso-3",
    title: "Curso 3",
    description: "descricao 3",
  },
];

