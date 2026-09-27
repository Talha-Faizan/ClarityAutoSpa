"use client";

import { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import Image from "next/image";

// Static image map for quiz options that don't directly correspond to a service
const OPTION_IMAGES = {
  // Vehicle types
  Sedan: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop&q=80",
  SUV: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop&q=80",
  XLSUV: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&h=400&fit=crop&q=80",
  // Goals
  wash: "/Quiz/wash.jpg",
  full: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&h=400&fit=crop&q=80",
  interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop&q=80",
  protection: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&h=400&fit=crop&q=80",
  tinting: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop&q=80",
  custom: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80",
  wrap: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop&q=80",
  // Condition
  refresh: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop&q=80",
  heavy: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&q=80",
  // Protection sub
  ceramic: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop&q=80",
  ppf: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=600&h=400&fit=crop&q=80",
  // Tinting sub
  all: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop&q=80",
  back: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop&q=80",
  // Custom sub
  custom_lighting: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop&q=80",
  custom_starlight: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=600&h=400&fit=crop&q=80",
  custom_underglow: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop&q=80",
  custom_wheels: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=600&h=400&fit=crop&q=80",
  custom_headlight: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&h=400&fit=crop&q=80",
  custom_caliper: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600&h=400&fit=crop&q=80",
};

// Try to find a matching service image, otherwise fall back to the static map
function getOptionImage(value, services) {
  // Attempt to find a service whose name or category relates to this option
  const termMap = {
    wash: ["wash", "exterior"],
    full: ["full detail", "complete", "premium"],
    interior: ["interior"],
    protection: ["ceramic", "coating", "ppf"],
    tinting: ["tint", "window"],
    custom: ["custom", "lighting", "starlight"],
    wrap: ["wrap", "ppf", "film"],
    ceramic: ["ceramic", "coating"],
    ppf: ["ppf", "clear bra", "film"],
    custom_lighting: ["ambient", "lighting"],
    custom_starlight: ["starlight", "roof"],
    custom_underglow: ["underglow"],
    custom_wheels: ["wheels", "powder"],
    custom_headlight: ["headlight"],
    custom_caliper: ["caliper"],
  };

  const terms = termMap[value];
  if (terms && services.length > 0) {
    const match = services.find(
      (s) =>
        terms.some(
          (t) =>
            s.name?.toLowerCase().includes(t) ||
            s.category?.toLowerCase().includes(t)
        ) && s.imageUrl
    );
    if (match) return match.imageUrl;
  }
  return OPTION_IMAGES[value] || OPTION_IMAGES.wash;
}

const STEPS = {
  VEHICLE: {
    id: "VEHICLE",
    question: "What's your vehicle?",
    options: [
      { label: "Sedan / Compact", value: "Sedan" },
      { label: "SUV / Truck", value: "SUV" },
      { label: "XL SUV / Van", value: "XLSUV" },
    ],
  },
  GOAL: {
    id: "GOAL",
    question: "What are you looking for today?",
    options: [
      { label: "Quick wash & vacuum", value: "wash" },
      { label: "Full interior+exterior detail", value: "full" },
      { label: "Interior-only deep clean", value: "interior" },
      { label: "Long-term paint & shine protection", value: "protection" },
      { label: "Tinting", value: "tinting" },
      { label: "Custom upgrade (lighting, wheels, etc.)", value: "custom" },
      { label: "Full wrap or PPF", value: "wrap" },
    ],
  },
  CONDITION: {
    id: "CONDITION",
    question: "What is its current condition?",
    options: [
      { label: "Just needs a refresh", value: "refresh" },
      { label: "Heavy grime / Neglected", value: "heavy" },
    ],
  },
  PROTECTION: {
    id: "PROTECTION",
    question: "Coating or full film wrap?",
    options: [
      { label: "Ceramic Coating", value: "ceramic" },
      { label: "Xpel PPF", value: "ppf" },
    ],
  },
  TINTING: {
    id: "TINTING",
    question: "All windows or just the back 3?",
    options: [
      { label: "All windows + back windshield", value: "all" },
      { label: "Just the back 2 + rear windshield", value: "back" },
    ],
  },
  CUSTOM: {
    id: "CUSTOM",
    question: "Which custom upgrade?",
    options: [
      { label: "Ambient Lighting", value: "custom_lighting" },
      { label: "Starlights / Roof", value: "custom_starlight" },
      { label: "Underglow", value: "custom_underglow" },
      { label: "Powder Coated Wheels", value: "custom_wheels" },
      { label: "Headlight Restoration", value: "custom_headlight" },
      { label: "Caliper Painting", value: "custom_caliper" },
    ],
  },
};

export default function ServiceQuiz({ services = [] }) {
  const [history, setHistory] = useState(["VEHICLE"]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const currentStepId = history[history.length - 1];
  const currentStep = STEPS[currentStepId];

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [currentStepId]: value };
    setAnswers(newAnswers);

    if (currentStepId === "VEHICLE") {
      setHistory([...history, "GOAL"]);
    } else if (currentStepId === "GOAL") {
      if (value === "full") setHistory([...history, "CONDITION"]);
      else if (value === "protection") setHistory([...history, "PROTECTION"]);
      else if (value === "tinting") setHistory([...history, "TINTING"]);
      else if (value === "custom") setHistory([...history, "CUSTOM"]);
      else {
        calculateResult(newAnswers);
      }
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const v = finalAnswers.VEHICLE;
    const goal = finalAnswers.GOAL;
    
    // Heuristic matching based on dynamic services
    let searchTerms = [];
    if (goal === "wash") searchTerms = ["wash", "exterior"];
    else if (goal === "interior") searchTerms = ["interior"];
    else if (goal === "wrap") searchTerms = ["wrap", "ppf", "film"];
    else if (goal === "full") {
      if (finalAnswers.CONDITION === "refresh") searchTerms = ["wash", "mini detail", "maintenance"];
      else searchTerms = ["full detail", "premium", "complete"];
    } else if (goal === "protection") {
      if (finalAnswers.PROTECTION === "ceramic") searchTerms = ["ceramic", "coating", "paint correction"];
      else searchTerms = ["ppf", "clear bra", "film"];
    } else if (goal === "tinting") {
      searchTerms = ["tint", "window"];
    } else if (goal === "custom") {
      searchTerms = ["custom", "lighting", "starlight", "wheels", "caliper"];
    }

    const termMatches = (str, terms) => terms.some(t => str.toLowerCase().includes(t.toLowerCase()));

    // Find services that match the intent
    let candidates = services.filter(s => termMatches(s.name, searchTerms) || termMatches(s.description, searchTerms) || termMatches(s.category, searchTerms));
    
    // If no match by term, fallback to all services
    if (candidates.length === 0) candidates = services;

    // Match by vehicle type
    let matched = candidates.find(s => s.carType === v) || candidates.find(s => s.carType === "All Vehicles") || candidates[0] || {
      name: "Custom Assessment",
      price: "Varies",
      description: "Based on your selections, we recommend a custom assessment. Please contact us for a quote!"
    };

    setResult({
      title: matched.name,
      price: typeof matched.price === 'number' ? `$${matched.price}` : matched.price,
      description: matched.description,
      image: matched.imageUrl,
    });
  };

  const resetQuiz = () => {
    setHistory(["VEHICLE"]);
    setAnswers({});
    setResult(null);
  };

  // Determine grid columns based on option count
  const optionCount = currentStep?.options.length || 0;
  const gridClass =
    optionCount <= 2
      ? "grid-cols-1 sm:grid-cols-2"
      : optionCount <= 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-24 bg-brand-primary border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-bg rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-brand-bg rounded-full opacity-5 blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-sans font-black text-3xl md:text-5xl tracking-wide text-white uppercase mb-4">
            Not sure which service <span className="text-brand-bg">is right?</span>
          </h2>
          <p className="text-white/70 text-lg">
            Answer a few quick questions to get a personalized recommendation.
          </p>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-md min-h-[400px] flex flex-col justify-center transition-all duration-500">
          {!result ? (
            <div className="w-full">
              <div className="flex items-center justify-between mb-8 text-xs font-bold uppercase tracking-widest text-brand-bg">
                <span>Step {history.length}</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className={`w-8 h-1 rounded-full ${num <= history.length ? "bg-brand-bg" : "bg-white/20"}`} />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-light text-white mb-8">
                {currentStep.question}
              </h3>

              <div className={`grid ${gridClass} gap-4`}>
                {currentStep.options.map((opt) => {
                  const imgSrc = getOptionImage(opt.value, services);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className="group relative rounded-2xl overflow-hidden border-2 border-white/10 hover:border-brand-bg transition-all duration-300 aspect-[3/2] focus:outline-none focus:ring-2 focus:ring-brand-bg"
                    >
                      {/* Image */}
                      <img
                        src={imgSrc}
                        alt={opt.label}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                      {/* Label */}
                      <div className="absolute inset-0 flex items-end p-4">
                        <span className="text-white text-sm md:text-base font-bold uppercase tracking-wider drop-shadow-lg">
                          {opt.label}
                        </span>
                      </div>
                      {/* Hover glow ring */}
                      <div className="absolute inset-0 rounded-2xl ring-inset ring-0 group-hover:ring-2 ring-brand-bg/50 transition-all duration-300 pointer-events-none" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center max-w-xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Result image */}
              {result.image ? (
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-brand-bg shadow-lg shadow-brand-bg/20">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-bg mb-6">
                  <Sparkles className="w-8 h-8 text-brand-primary" />
                </div>
              )}
              <h3 className="text-xl md:text-2xl text-white font-light mb-2">We Recommend:</h3>
              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-wide text-brand-bg mb-2">
                {result.title}
              </h4>
              
              <div className="flex items-center justify-center gap-4 text-white/80 mb-6 font-medium">
                <span className="text-2xl text-white">{result.price}</span>
                {result.duration && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-bg" />
                    <span>Est. {result.duration}</span>
                  </>
                )}
              </div>

              <p className="text-white/60 mb-8 leading-relaxed max-w-md mx-auto">
                {result.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://claritybk.as.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-bg text-brand-primary px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-lg"
                >
                  Book Now
                </a>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-2 px-6 py-3 text-white/50 hover:text-white transition-colors text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" /> Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
