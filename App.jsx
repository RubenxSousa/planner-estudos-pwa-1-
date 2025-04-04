import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const studyPlan = {
  socioeducador: [
    { day: "Seg a Sáb (Manhã)", subject: "ECA, Direitos Humanos e Psicologia/Sociologia" },
    { day: "Seg a Sáb (Tarde)", subject: "Língua Portuguesa e Raciocínio Lógico" },
    { day: "Seg a Sáb (Noite)", subject: "Revisão + Atualidades" },
    { day: "Domingo (Manhã)", subject: "Simulado completo" },
    { day: "Domingo (Tarde)", subject: "Correção do simulado e revisão de erros" }
  ],
  pmce: [
    { day: "Seg a Sáb (Manhã)", subject: "Constituição Federal + Estatutos" },
    { day: "Seg a Sáb (Tarde)", subject: "Português + Raciocínio Lógico" },
    { day: "Seg a Sáb (Noite)", subject: "Atualidades + Informática" },
    { day: "Domingo", subject: "Simulado geral + revisão dos erros" }
  ]
};

const quiz = [
  {
    question: "Qual artigo da CF trata dos direitos fundamentais?",
    options: ["Art. 144", "Art. 5º", "Art. 37", "Art. 6º"],
    answer: "Art. 5º"
  },
  {
    question: "O que é medida socioeducativa segundo o ECA?",
    options: ["Uma pena privativa", "Uma punição disciplinar", "Uma intervenção legal educativa", "Uma advertência da escola"],
    answer: "Uma intervenção legal educativa"
  }
];

export default function App() {
  const [selectedTab, setSelectedTab] = useState("socioeducador");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const plan = studyPlan[selectedTab];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Planner de Estudos - PWA</h1>
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="socioeducador">Socioeducador</TabsTrigger>
          <TabsTrigger value="pmce">PMCE</TabsTrigger>
        </TabsList>

        <TabsContent value="socioeducador">
          <h2 className="text-xl font-bold mb-2">Cronograma Socioeducador</h2>
          {plan.map((item, index) => (
            <Card key={index} className="mb-2">
              <CardContent className="p-4">
                <strong>{item.day}</strong>: {item.subject}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pmce">
          <h2 className="text-xl font-bold mb-2">Cronograma PMCE</h2>
          {plan.map((item, index) => (
            <Card key={index} className="mb-2">
              <CardContent className="p-4">
                <strong>{item.day}</strong>: {item.subject}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Quiz</h2>
        <Card>
          <CardContent className="p-4">
            <p className="font-medium">{quiz[currentQuestion].question}</p>
            {quiz[currentQuestion].options.map((opt, idx) => (
              <Button
                key={idx}
                className="block mt-2"
                variant="outline"
                onClick={() => setShowAnswer(true)}
              >
                {opt}
              </Button>
            ))}
            {showAnswer && (
              <p className="mt-4 text-green-600 font-semibold">
                Resposta correta: {quiz[currentQuestion].answer}
              </p>
            )}
            <Button
              className="mt-4"
              onClick={() => {
                setShowAnswer(false);
                setCurrentQuestion((prev) => (prev + 1) % quiz.length);
              }}
            >
              Próxima Pergunta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
