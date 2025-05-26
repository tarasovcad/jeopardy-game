import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { teamsToChooseFrom } from './SelectTeam';

interface CategoryProps {
  title: string;
  values: number[];
}

interface SelectedQuestion {
  category: string;
  value: number;
  question: string;
  answer: string;
}

type CategoryName =
  | 'Causes'
  | 'Archduke Ferdinand'
  | 'Innovations'
  | 'Impact on home front'
  | 'Important battles'
  | 'Treaty of Versailles';

type QuestionsType = {
  [K in CategoryName]?: {
    [key: number]: string;
  };
};

type AnswersType = {
  [K in CategoryName]?: {
    [key: number]: string;
  };
};

const CATEGORIES: CategoryProps[] = [
  {
    title: 'Causes',
    values: [200, 400, 600, 800, 1000],
  },
  {
    title: 'Archduke Ferdinand',
    values: [200, 400, 600, 800, 1000],
  },
  {
    title: 'Innovations',
    values: [200, 400, 600, 800, 1000],
  },
  {
    title: 'Impact on home front',
    values: [200, 400, 600, 800, 1000],
  },
  {
    title: 'Important battles',
    values: [200, 400, 600, 800, 1000],
  },
  {
    title: 'Treaty of Versailles',
    values: [200, 400, 600, 800, 1000],
  },
];

const QUESTIONS: QuestionsType = {
  Causes: {
    200: 'What was the main alliance system that contributed to WWI?',
    400: 'Which empire was known as the "sick man of Europe"?',
    600: 'What was the immediate cause of WWI?',
    800: 'Which country declared war first in WWI?',
    1000: 'What was the Schlieffen Plan?',
  },
  'Archduke Ferdinand': {
    200: 'In which city was Archduke Franz Ferdinand assassinated?',
    400: 'What was the name of the assassin?',
    600: 'Which organization was behind the assassination?',
    800: 'On what date was the Archduke killed?',
    1000: "What was the Archduke's full title?",
  },
};

const ANSWERS: AnswersType = {
  Causes: {
    200: 'The Triple Alliance and Triple Entente',
    400: 'The Ottoman Empire',
    600: 'The assassination of Archduke Franz Ferdinand',
    800: 'Austria-Hungary',
    1000: "Germany's plan to quickly defeat France before turning to fight Russia",
  },
  'Archduke Ferdinand': {
    200: 'Sarajevo',
    400: 'Gavrilo Princip',
    600: 'The Black Hand',
    800: 'June 28, 1914',
    1000: 'Archduke Franz Ferdinand of Austria-Este',
  },
};

const Board = () => {
  const { selectedTeams, teamScores, updateTeamScore } = useGameStore();
  const [selectedQuestion, setSelectedQuestion] = useState<SelectedQuestion | null>(null);
  const [usedQuestions, setUsedQuestions] = useState(new Set<string>());
  const [isInitialDelay, setIsInitialDelay] = useState(false);
  const [initialCountdown, setInitialCountdown] = useState<number | null>(null);
  const [gameTimer, setGameTimer] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerRevealDelay, setAnswerRevealDelay] = useState<number | null>(null);
  const [isAnswerDelayActive, setIsAnswerDelayActive] = useState(false);

  const selectedTeamDetails = selectedTeams.map(
    (teamId) => teamsToChooseFrom.find((team) => team.id === teamId)!,
  );

  // Effect for initial 3-second countdown
  useEffect(() => {
    if (isInitialDelay && initialCountdown !== null && initialCountdown > 0) {
      const timer = setTimeout(() => {
        setInitialCountdown(initialCountdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (initialCountdown === 0) {
      setIsInitialDelay(false);
      setInitialCountdown(null);
      setGameTimer(30);
      setIsTimerActive(true);
    }
  }, [isInitialDelay, initialCountdown]);

  // Effect for 30-second countdown timer
  useEffect(() => {
    if (isTimerActive && gameTimer !== null && gameTimer > 0) {
      const timer = setTimeout(() => {
        setGameTimer(gameTimer - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (gameTimer === 0) {
      setIsTimerActive(false);
    }
  }, [isTimerActive, gameTimer]);

  // Effect for 3-second delay after answer reveal
  useEffect(() => {
    if (isAnswerDelayActive && answerRevealDelay !== null && answerRevealDelay > 0) {
      const timer = setTimeout(() => {
        setAnswerRevealDelay(answerRevealDelay - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (answerRevealDelay === 0) {
      setIsAnswerDelayActive(false);
      setAnswerRevealDelay(null);
    }
  }, [isAnswerDelayActive, answerRevealDelay]);

  // Effect for keyboard event listener
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && selectedQuestion && !isInitialDelay) {
        event.preventDefault();
        if (!showAnswer) {
          // First space press: show answer and start 3-second delay
          setShowAnswer(true);
          setIsTimerActive(false); // Stop the timer when answer is revealed
          setAnswerRevealDelay(3);
          setIsAnswerDelayActive(true);
        } else if (!isAnswerDelayActive) {
          // Second space press: go back to board (only after 3-second delay)
          closeQuestion();
        }
      }
    };

    if (selectedQuestion) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedQuestion, isInitialDelay, showAnswer, isAnswerDelayActive]);

  const handleValueClick = (category: string, value: number) => {
    const questionKey = `${category}-${value}`;
    if (!usedQuestions.has(questionKey)) {
      setSelectedQuestion({
        category,
        value,
        question: QUESTIONS[category as CategoryName]?.[value] || 'Question not found',
        answer: ANSWERS[category as CategoryName]?.[value] || 'Answer not found',
      });
      setIsInitialDelay(true);
      setInitialCountdown(3);
    }
  };

  const closeQuestion = () => {
    if (selectedQuestion) {
      const questionKey = `${selectedQuestion.category}-${selectedQuestion.value}`;
      setUsedQuestions((prev) => new Set([...prev, questionKey]));
    }
    setSelectedQuestion(null);
    setIsInitialDelay(false);
    setInitialCountdown(null);
    setGameTimer(null);
    setIsTimerActive(false);
    setShowAnswer(false);
    setAnswerRevealDelay(null);
    setIsAnswerDelayActive(false);
  };

  const isQuestionUsed = (category: string, value: number): boolean => {
    return usedQuestions.has(`${category}-${value}`);
  };

  const handleScoreChange = (teamId: number, change: number) => {
    updateTeamScore(teamId, change);
  };

  return (
    <div className="mx-auto p-4 w-full max-w-[1350px] flex flex-col ">
      <div className="bg-muted fixed top-0 left-1/2 -translate-x-1/2  rounded-b-3xl border-t-1 border-x-1 border-b-2 border-input py-2.5 px-7">
        {selectedQuestion && (isInitialDelay || isTimerActive || gameTimer === 0) ? (
          <h1 className="font-bold text-2xl text-center">
            {isInitialDelay ? `${initialCountdown}` : `${gameTimer}s`}
          </h1>
        ) : (
          <h1 className="font-bold text-2xl text-center">BLOCKPARDY</h1>
        )}
      </div>
      {selectedQuestion && (
        <button
          className="fixed top-[20px] left-[20px] hover:text-primary transition-colors duration-300 cursor-pointer"
          onClick={closeQuestion}>
          <span className="font-bold text-sm text-center uppercase">GO BACK</span>
        </button>
      )}
      {!selectedQuestion ? (
        <Card className="gap-2 grid grid-cols-6 bg-card/30 border-input/40 shadow-card/40 p-12 ">
          {CATEGORIES.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-2">
              <Card className="flex justify-center items-center p-2 rounded-none h-16 bg-muted/20">
                <h3 className="font-bold text-[18px] text-center">{category.title}</h3>
              </Card>

              {category.values.map((value, valueIndex) => {
                const isUsed = isQuestionUsed(category.title, value);
                return (
                  <Card
                    key={valueIndex}
                    onClick={() => !isUsed && handleValueClick(category.title, value)}
                    className={`flex justify-center items-center shadow-xs border border-input rounded-none h-16 transition-[color,box-shadow] ${
                      isUsed
                        ? 'bg-muted/50 cursor-not-allowed opacity-50'
                        : 'hover:border-primary/50 cursor-pointer hover:shadow-primary/40'
                    }`}>
                    <span className="font-bold text-xl sm:text-2xl">${value}</span>
                  </Card>
                );
              })}
            </div>
          ))}
        </Card>
      ) : (
        <Card className="gap-2 grid grid-cols-6 bg-card/30 border-input/40 shadow-card/40 p-12 min-h-[524px] relative">
          {!isInitialDelay && (
            <button className="absolute bottom-[15px] left-1/2 -translate-x-1/2 opacity-90">
              <span className="font-bold text-sm text-center uppercase">
                {!showAnswer
                  ? 'Press space to see the answer'
                  : 'Press space to go back to the board'}
              </span>
            </button>
          )}
          <div className="col-span-6 flex flex-col items-center justify-center min-h-[400px] space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-primary">
                {selectedQuestion?.category} - ${selectedQuestion?.value}
              </h2>
              {!showAnswer ? (
                <p className="text-4xl text-center leading-relaxed ">
                  {selectedQuestion?.question}
                </p>
              ) : (
                <div className="space-y-6">
                  <p className="text-2xl text-center leading-relaxed text-muted-foreground">
                    {selectedQuestion?.question}
                  </p>
                  <div className="border-t-2 border-primary pt-6">
                    <p className="text-4xl text-center leading-relaxed font-bold text-primary">
                      {selectedQuestion?.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex gap-12 items-center justify-between w-full max-w-7xl mb-5">
        <Button variant={'outline'} disabled>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-12 ">
          {selectedTeamDetails.map((team) => (
            <Card
              key={team.id}
              className={`relative p-0 w-[155px] min-h-[190px] overflow-hidden transition-all duration-200 `}>
              <Image
                src={team.image}
                alt={team.name}
                width={155}
                height={155}
                className="rounded-lg object-cover"
              />
              <div className="right-0 bottom-0 left-0 absolute bg-muted text-center">
                <div className="flex justify-between items-center w-full border-t-2 border-b-2 border-input">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isInitialDelay}
                    onClick={() => handleScoreChange(team.id, 100)}
                    className="bg-card rounded-none border-r w-8 h-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <Plus className="w-5 h-5" />
                  </Button>
                  <span className="font-bold text-[16px]">${teamScores[team.id] || 0}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isInitialDelay}
                    onClick={() => handleScoreChange(team.id, -100)}
                    className="bg-card rounded-none border-l w-8 h-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <Minus className="w-5 h-5" />
                  </Button>
                </div>
                <h1 className="font-bold text-sm my-2">{team.name}</h1>
              </div>
            </Card>
          ))}
        </div>
        <Button variant={'outline'} disabled>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Board;
