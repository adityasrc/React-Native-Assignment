export interface Question {
  id: string;
  questionNumber: number;
  companyName: string;
  companyLogoUrl: string;
  text: string;
  difficulty: string;
  topic: string;
  durationMinutes: number;
  completedTodayCount: number;
}
