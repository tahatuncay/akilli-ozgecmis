"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";

interface CategoryScores {
  keywordMatch: number;
  formatStructure: number;
  experienceRelevance: number;
  educationRelevance: number;
  overallQuality: number;
}

interface ATSResult {
  overallScore: number;
  categoryScores: CategoryScores;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  improvements: string[];
  summaryFeedback: string;
}

const categoryLabels: Record<keyof CategoryScores, { label: string; icon: string }> = {
  keywordMatch: { label: "Anahtar Kelime Eşleşmesi", icon: "🔑" },
  formatStructure: { label: "Format & Yapı", icon: "📐" },
  experienceRelevance: { label: "Deneyim Uyumu", icon: "💼" },
  educationRelevance: { label: "Eğitim Uyumu", icon: "🎓" },
  overallQuality: { label: "Genel Kalite", icon: "⭐" },
};

export default function ATSAnalysisPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((selectedFile: File | undefined) => {
    if (!selectedFile) return;
    const name = selectedFile.name.toLowerCase();
    if (!name.endsWith(".pdf") && !name.endsWith(".txt")) {
      setError("Sadece PDF ve TXT dosyaları desteklenmektedir.");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Dosya boyutu 10MB'dan büyük olamaz.");
      return;
    }
    setFile(selectedFile);
    setError(null);
    setResult(null);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!file) {
      setError("Lütfen önce bir CV dosyası yükleyin.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Lütfen bir iş ilanı metni girin.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("/api/ats-analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Analiz sırasında bir hata oluştu.");
        return;
      }

      setResult(data.result);
    } catch {
      setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-emerald-500";
    if (s >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreBarColor = (s: number) => {
    if (s >= 80) return "bg-gradient-to-r from-emerald-500 to-emerald-400";
    if (s >= 60) return "bg-gradient-to-r from-amber-500 to-amber-400";
    return "bg-gradient-to-r from-rose-500 to-rose-400";
  };

  const getScoreRingColor = (s: number) => {
    if (s >= 80) return "stroke-emerald-500";
    if (s >= 60) return "stroke-amber-500";
    return "stroke-rose-500";
  };

  const getScoreBgColor = (s: number) => {
    if (s >= 80) return "bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20";
    if (s >= 60) return "bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20";
    return "bg-rose-50 dark:bg-rose-500/5 border-rose-200 dark:border-rose-500/20";
  };

  const getScoreBadge = (s: number) => {
    if (s >= 80) return { text: "Mükemmel Uyum", bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" };
    if (s >= 60) return { text: "Geliştirilebilir", bg: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" };
    return { text: "Düşük Uyum", bg: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400" };
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--background-secondary)] py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400 mb-2">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Akıllı ATS Analizi</h1>
          <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
            CV dosyanızı yükleyin ve iş ilanıyla karşılaştırın. Yapay zeka ile derinlemesine ATS uyumluluk analizi yapın.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-2xl p-4 flex items-start gap-3 animate-fade-in">
            <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-sm text-rose-700 dark:text-rose-400 font-medium">{error}</p>
          </div>
        )}

        {/* Input Area */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Sol Kolon: CV Yükleme */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-[var(--border)] flex flex-col">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Özgeçmişinizi Yükleyin</h2>
            
            <div 
              className={cn(
                "flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center transition-all duration-200 cursor-pointer min-h-[250px]",
                isDragOver ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" : "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
                file ? "bg-emerald-50 dark:bg-emerald-500/5 border-emerald-300 dark:border-emerald-500/30" : ""
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept=".pdf,.txt"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />
              
              {file ? (
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-emerald-700 dark:text-emerald-400">Dosya Hazır</p>
                    <p className="text-sm text-neutral-500 truncate max-w-[260px] mt-1">{file.name}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{formatFileSize(file.size)}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null); setError(null); }} className="mt-2 text-xs">Farklı Dosya Seç</Button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 pointer-events-none">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-2xl">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">CV dosyanızı buraya sürükleyin</p>
                    <p className="text-sm text-neutral-500 mt-1">veya seçmek için tıklayın (PDF, TXT)</p>
                    <p className="text-xs text-neutral-400 mt-2">Maksimum dosya boyutu: 10MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sağ Kolon: İş İlanı */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-[var(--border)] flex flex-col">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. İş İlanı Detayları</h2>
            <Textarea 
              placeholder="Başvurmayı düşündüğünüz ilanın 'Aranan Nitelikler' kısmını veya tamamını buraya yapıştırın..."
              className="flex-1 min-h-[250px] resize-none text-base p-4"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

        </div>

        {/* Analyze Action */}
        <div className="flex justify-center">
          <Button 
            onClick={startAnalysis}
            disabled={isAnalyzing || !file || !jobDescription.trim()}
            className={cn(
              "h-14 px-10 text-lg rounded-full shadow-lg transition-all border-none font-bold",
              isAnalyzing 
                ? "bg-neutral-200 text-neutral-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/25 hover:-translate-y-1"
            )}
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Yapay Zeka Analiz Ediyor...
              </span>
            ) : "🔍 ATS Uyumluluğunu Analiz Et"}
          </Button>
        </div>

        {/* Analyzing Skeleton */}
        {isAnalyzing && (
          <div className="space-y-6 animate-pulse">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-[var(--border)]">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-48 h-48 bg-neutral-200 dark:bg-neutral-800 rounded-full shrink-0"></div>
                <div className="flex-1 w-full space-y-4">
                  <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-2/3"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-5/6"></div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded-xl"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Results */}
        {result && (
          <div className="animate-fade-in space-y-8">
            
            {/* Top Banner */}
            <div className={cn("rounded-3xl border shadow-xl p-8 sm:p-10", getScoreBgColor(result.overallScore))}>
              <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
                
                {/* Score Ring */}
                <div className="flex flex-col items-center shrink-0 bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-sm border border-[var(--border)]">
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-6">ATS Uyumluluk Skoru</h3>
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-neutral-100 dark:text-neutral-800" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray={`${result.overallScore * 2.827} 282.7`} 
                        className={cn("transition-all duration-1000 ease-out", getScoreRingColor(result.overallScore))} 
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className={cn("text-6xl font-black", getScoreColor(result.overallScore))}>{result.overallScore}</span>
                      <span className="text-sm font-medium text-neutral-500 mt-1">/ 100</span>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <span className={cn("px-4 py-1.5 rounded-full text-sm font-bold", getScoreBadge(result.overallScore).bg)}>
                      {getScoreBadge(result.overallScore).text}
                    </span>
                  </div>
                </div>

                {/* Right Side: Summary + Category Scores */}
                <div className="flex-1 w-full space-y-8">
                  
                  {/* AI Summary Feedback */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Yapay Zeka Değerlendirmesi</h3>
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-[var(--border)]">
                      <p className="text-base text-foreground leading-relaxed">{result.summaryFeedback}</p>
                    </div>
                  </div>

                  {/* Category Score Bars */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">Kategori Puanları</h3>
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-[var(--border)] space-y-5">
                      {(Object.keys(categoryLabels) as (keyof CategoryScores)[]).map((key) => {
                        const score = result.categoryScores[key];
                        const { label, icon } = categoryLabels[key];
                        return (
                          <div key={key}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <span>{icon}</span>
                                {label}
                              </span>
                              <span className={cn("text-sm font-bold tabular-nums", getScoreColor(score))}>{score}/100</span>
                            </div>
                            <div className="w-full h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full rounded-full transition-all duration-1000 ease-out", getScoreBarColor(score))}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Güçlü Yanlar */}
              <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                  Güçlü Yanlar
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                      <span className="text-sm text-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* İyileştirme Önerileri */}
              <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100 dark:border-amber-900/50">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 dark:bg-amber-500/20 text-amber-600 rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                  İyileştirme Önerileri
                </h3>
                <ul className="space-y-3">
                  {result.improvements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-amber-500 shrink-0 mt-0.5">→</span>
                      <span className="text-sm text-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Keywords Data */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                <h4 className="text-sm font-bold text-emerald-600 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Eşleşen Anahtar Kelimeler
                  <span className="ml-auto bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full text-xs font-bold">{result.matchedKeywords.length}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.matchedKeywords.length > 0 ? result.matchedKeywords.map((w, i) => (
                    <span key={i} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-md border border-emerald-200 dark:border-emerald-800">
                      {w}
                    </span>
                  )) : <span className="text-sm text-neutral-500">Eşleşen kelime bulunamadı.</span>}
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-rose-100 dark:border-rose-900/50">
                <h4 className="text-sm font-bold text-rose-600 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  Eksik Anahtar Kelimeler
                  <span className="ml-auto bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 px-2 py-0.5 rounded-full text-xs font-bold">{result.missingKeywords.length}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.length > 0 ? result.missingKeywords.map((w, i) => (
                    <span key={i} className="px-2.5 py-1 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-semibold rounded-md border border-rose-200 dark:border-rose-800">
                      {w}
                    </span>
                  )) : <span className="text-sm text-neutral-500">Tüm önemli kelimeler eşleşti!</span>}
                </div>
              </div>
            </div>

            {/* Yeniden Analiz Et Butonu */}
            <div className="flex justify-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => { setResult(null); setError(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="h-12 px-8 rounded-full text-base"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Yeni Analiz Yap
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
