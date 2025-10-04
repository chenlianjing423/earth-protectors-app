import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Attempt to import the HTML source as raw text (Vite supports ?raw)
// If this import fails at build-time, the fallback loader in useEffect will gracefully ignore it
// eslint-disable-next-line import/no-unresolved
// import sourceHtml from '../../../question_source.html?raw';
import { moralT2 } from '../../questions/moral_t2';
import unit7_11 from './unit7_11';

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentScore, setCurrentScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const POINTS_PER_QUESTION = 2;

  // Lightweight Malay -> Mandarin helper (keyword-based; falls back to original text)
  const translateToMandarin = (text) => {
    if (!text || typeof text !== 'string') return text;
    const map = [
      [/^Pilih\b/gi, '选择'],
      [/^Mengapa\b/gi, '为什么'],
      [/^Apakah\b/gi, '什么/哪一项'],
      [/^Apakah maksud/gi, '是什么意思'],
      [/^Apakah tindakan/gi, '哪一项做法'],
      [/^Situasi/gi, '情境'],
      [/^Kesan/gi, '影响/后果'],
      [/^Faedah/gi, '益处'],
      [/tanggungjawab/gi, '责任'],
      [/disiplin diri/gi, '自律'],
      [/kejujuran/gi, '诚实'],
      [/keberanian moral/gi, '道德勇气'],
      [/harga diri/gi, '自尊'],
      [/hemat|berjimat/gi, '节俭'],
      [/keluarga/gi, '家庭'],
      [/ibu bapa/gi, '父母'],
      [/adik-beradik|adik beradik/gi, '兄弟姐妹'],
      [/guru/gi, '老师'],
      [/sekolah/gi, '学校'],
      [/rakan|kawan/gi, '朋友'],
      [/jiran/gi, '邻居'],
      [/masyarakat/gi, '社会/社区'],
      [/gotong-royong/gi, '互助合作（gotong-royong）'],
      [/vandalisme/gi, '破坏公物'],
      [/perpaduan/gi, '团结'],
      [/toleransi/gi, '包容/容忍'],
      [/integriti/gi, '廉正/诚信'],
      [/rasuah/gi, '贪污行贿'],
      [/alam sekitar/gi, '环境'],
      [/kitar semula/gi, '回收/再循环'],
      [/pencemaran/gi, '污染'],
      [/patriotisme|cinta akan negara/gi, '爱国'],
      [/undang-undang/gi, '法律'],
      [/warisan budaya/gi, '文化遗产'],
      [/memelihara|menjaga/gi, '维护/保护'],
      [/menghormati/gi, '尊重'],
      [/menolong|membantu/gi, '帮助'],
      [/prihatin/gi, '关怀'],
      [/beradab/gi, '有礼'],
      [/adil/gi, '公平公正'],
      [/bukti/gi, '证据'],
      [/fakta/gi, '事实'],
      [/tepat masa/gi, '准时'],
      [/berhemat/gi, '节俭'],
      [/amanah/gi, '守信/可信'],
      [/jujur/gi, '诚实'],
    ];
    let out = text;
    map.forEach(([regex, repl]) => {
      out = out.replace(regex, repl);
    });
    return out;
  };

  // Soalan Kuiz Pendidikan Moral Tingkatan 2 (50 soalan, diparafrasa)
  // Format disokong: type: "single" (1 jawapan betul) atau "checkbox" (pelbagai jawapan, tepat mengikut bilangan)
  const quizData = unit7_11;

  // Ensure zhQuestion/zhOptions exist by translating from BM when missing
  const normalizedQuizData = quizData.map((q) => ({
    ...q,
    zhQuestion: q.zhQuestion || q.question,
    zhOptions: Array.isArray(q.zhOptions) && q.zhOptions.length === q.options.length
      ? q.zhOptions
      : (Array.isArray(q.options) ? [...q.options] : q.zhOptions)
  }));

  const encouragementMessages = [
    "🎉 Hebat! Kamu menguasai Pendidikan Moral!",
    "🌟 Cemerlang! Pengetahuan kamu sangat mengagumkan!",
    "💪 Mantap! Kamu berada dalam prestasi terbaik!",
    "🚀 Hebat! Kemajuan kamu semakin jelas!",
    "⭐ Bagus! Teruskan usaha yang cemerlang!",
    "🏆 Sempurna! Kamu memang luar biasa!",
    "🎯 Tepat! Kemahiran kamu sangat tajam!",
    "🔥 Mengagumkan! Kamu belajar dengan sangat pantas!"
  ];

  const motivationMessages = [
    "💪 Jangan risau! Setiap kesilapan ialah peluang untuk belajar!",
    "🌟 Teruskan mencuba! Kamu semakin hampir kepada jawapan!",
    "🎯 Bagus! Mari kita ambil pelajaran daripada jawapan ini!",
    "🚀 Jangan berputus asa! Kejayaan datang melalui latihan!",
    "⭐ Kamu pasti boleh! Cuba lagi dengan yakin!",
    "🏆 Proses pembelajaran ambil masa — kamu di landasan yang betul!",
    "🎉 Kesilapan membantu kita berkembang! Teruskan!",
    "🔥 Kamu sedang membina ilmu! Kekal positif!"
  ];

  useEffect(() => {
    const loadQuestions = () => {
      try {
        if (Array.isArray(moralT2) && moralT2.length > 0) {
          const withZh = moralT2.map((q) => ({
            ...q,
            zhQuestion: q.zhQuestion || q.question,
            zhOptions: Array.isArray(q.zhOptions) && q.zhOptions.length === q.options.length
              ? q.zhOptions
              : (Array.isArray(q.options) ? [...q.options] : q.zhOptions)
          }));
          const shuffled = withZh.sort(() => Math.random() - 0.5);
          setAllQuestions(shuffled.slice(0, 50));
          return;
        }
      } catch (err) {
        // Ignore and fallback
      }

      // Fallback to in-code quizData
      const combinedQuestions = [...normalizedQuizData];
      const shuffledQuestions = combinedQuestions.sort(() => Math.random() - 0.5);
      setAllQuestions(shuffledQuestions.slice(0, 50));
    };

    loadQuestions();
  }, []);

  const currentQuestion = allQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return; // Prevent changing answer after submission

    if (currentQuestion.type === "checkbox") {
      setSelectedAnswers(prev => {
        const current = prev[currentQuestionIndex] || [];
        const newAnswers = current.includes(answerIndex)
          ? current.filter(i => i !== answerIndex)
          : [...current, answerIndex];
        return { ...prev, [currentQuestionIndex]: newAnswers };
      });
    } else {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: answerIndex
      }));
    }
  };

  const checkAnswer = () => {
    if (!currentQuestion) return;

    const selected = selectedAnswers[currentQuestionIndex];
    let correct = false;

    if (currentQuestion.type === "checkbox") {
      const selectedArray = Array.isArray(selected) ? selected : [];
      const correctArray = Array.isArray(currentQuestion.correct) ? currentQuestion.correct : [currentQuestion.correct];

      correct = selectedArray.length === correctArray.length &&
                selectedArray.every(answer => correctArray.includes(answer));
    } else {
      correct = selected === currentQuestion.correct;
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const newScore = currentScore + POINTS_PER_QUESTION;
      setCurrentScore(newScore);
      setScoreHistory(prev => [...prev, {
        question: currentQuestion.question,
        score: POINTS_PER_QUESTION,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestionIndex];
      return newAnswers;
    });

    if (currentQuestionIndex + 1 >= allQuestions.length) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentScore(0);
    setScoreHistory([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setQuizCompleted(false);

    // Reshuffle questions
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
    setAllQuestions(shuffledQuestions);
  };

  const getRandomMessage = (messages) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (allQuestions.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading quiz...</div>;
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-2 sm:p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 to-red-500 text-white p-6 md:p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">🎓 SHS - Pendidikan Moral - T2!</h1>
            <p className="text-lg md:text-xl">Congratulations on completing the quiz!</p>
          </div>

          <div className="p-4 md:p-8">
            <div className="text-center mb-8">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-4">
                📊 Final Score: {currentScore}
              </div>
              <div className="text-xl md:text-2xl text-gray-600">
                Out of {allQuestions.length * POINTS_PER_QUESTION} possible points
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-4 md:p-6 rounded-xl">
                <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-4">📈 Score History</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {scoreHistory.map((item, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border-l-4 border-green-500">
                      <div className="text-sm text-gray-600">{item.timestamp}</div>
                      <div className="font-medium text-green-700">+{item.score} points</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 md:p-6 rounded-xl">
                <h3 className="text-lg md:text-xl font-bold text-green-800 mb-4">📊 Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Questions:</span>
                    <span className="font-bold">{allQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Correct Answers:</span>
                    <span className="font-bold text-green-600">{scoreHistory.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-bold text-blue-600">
                      {Math.round((scoreHistory.length / allQuestions.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
              >
                🔄 Try Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
              >
                🏠 Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderQuestionContent = () => {
    return (
        <div className="question-div p-1 md:p-8">
          {currentQuestion && (
            <div className={`bg-gray-50 p-2 md:p-8 rounded-xl border-l-5 border-blue-500 mb-6 ${showFeedback && !isCorrect ? 'border-2 border-red-500' : ''}`}>
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl text-gray-800 text-left">
                  {currentQuestion.question}
                </h2>
                {showFeedback && (
                  <div className="mt-1 text-gray-600 text-left">
                    {currentQuestion.zhQuestion}
                  </div>
                )}
              </div>

              <div className="space-y-2 md:space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = currentQuestion.type === "checkbox"
                    ? (selectedAnswers[currentQuestionIndex] || []).includes(index)
                    : selectedAnswers[currentQuestionIndex] === index;

                  let optionClass = "p-2 md:p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 text-left";

                  if (showFeedback) {
                    const isCorrectAnswer = Array.isArray(currentQuestion.correct)
                      ? currentQuestion.correct.includes(index)
                      : currentQuestion.correct === index;

                    if (isSelected && isCorrectAnswer) {
                      optionClass += " border-green-500 bg-green-50";
                    } else if (isSelected && !isCorrectAnswer) {
                      optionClass += " border-red-500 bg-red-50";
                    } else if (isCorrectAnswer) {
                      optionClass += " border-green-500 bg-green-50";
                    }
                  } else if (isSelected) {
                    optionClass += " border-blue-500 bg-blue-50";
                  }

                  const zhOption = (Array.isArray(currentQuestion.zhOptions) && currentQuestion.zhOptions[index])
                    ? currentQuestion.zhOptions[index]
                    : option;
                  return (
                    <div
                      key={index}
                      className={optionClass}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      {currentQuestion.type === "checkbox" ? (
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {isSelected ? "☑️" : "⬜"}
                          </span>
                          <span>{option}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {isSelected ? "🔘" : "⚪"}
                          </span>
                          <span>{option}</span>
                        </div>
                      )}
                      {showFeedback && (
                        <div className="ml-8 text-gray-600 text-left">
                          {zhOption}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-3 md:mt-6 p-4 rounded-lg text-center font-semibold ${
                  isCorrect
                    ? 'bg-green-100 text-green-800 border-2 border-green-500'
                    : 'bg-red-100 text-red-800 border-2 border-red-500'
                }`}>
                  {isCorrect ? getRandomMessage(encouragementMessages) : getRandomMessage(motivationMessages)}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                {!showFeedback ? (
                  <button
                    onClick={checkAnswer}
                    disabled={(
                      selectedAnswers[currentQuestionIndex] === undefined ||
                      selectedAnswers[currentQuestionIndex] === null
                    ) || (
                      Array.isArray(selectedAnswers[currentQuestionIndex]) &&
                      selectedAnswers[currentQuestionIndex].length === 0
                    )}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-black text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed w-full"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors w-full"
                  >
                    {currentQuestionIndex + 1 >= allQuestions.length ? "🏁 Finish Quiz" : "➡️ Next Question"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 to-red-500 text-white p-6 md:p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">🎓 SHS - Pendidikan Moral - T2 (UNIT 7 - 11)</h1>
          {/* <p className="text-xl">Test your knowledge of Google Workspace applications!</p> */}
        </div>

        {/* Score Section */}
        <div className="bg-gray-50 p-4 md:p-6 border-b-2 border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-xl md:text-2xl font-bold text-blue-600">
                📊 Score: {currentScore}
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 md:px-4 md:py-2 rounded-lg border-l-4 border-blue-500 text-sm md:text-base">
                📈 Last Change: {scoreHistory.length > 0 ? scoreHistory[scoreHistory.length - 1].timestamp : 'No changes yet'}
              </div>
            </div>
            <div className="text-base md:text-lg text-gray-600">
              Question {currentQuestionIndex + 1} of {allQuestions.length}
            </div>
          </div>
        </div>

        {/* Question Content */}
        {renderQuestionContent()}
      </div>
    </div>
  );
};

export default QuizPage;
