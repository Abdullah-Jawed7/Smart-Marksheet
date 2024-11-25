export function getSubjectColor(subject: string): string {
    const colors: { [key: string]: string } = {
      maths: "blue",
      physics: "purple",
      computer: "green",
      english: "yellow",
      hindi: "red"
    }
    return colors[subject.toLowerCase()] || "gray"
  }
  
  export function getSubjectScore(subject: string): number {
    const scores: { [key: string]: number } = {
      maths: 95,
      physics: 88,
      computer: 92,
      english: 85,
      hindi: 90
    }
    return scores[subject.toLowerCase()] || 0
  }
  
  export function getRandomPercentage(): number {
    return Math.floor(Math.random() * 41) + 60 // Random number between 60 and 100
  }
  
  export function getRandomPerformance(): string {
    const performances = ["green", "yellow", "red"]
    return performances[Math.floor(Math.random() * performances.length)]
  }
  
  export function getRandomPerformanceText(): string {
    const performances = ["Strong", "Average", "Weak"]
    return performances[Math.floor(Math.random() * performances.length)]
  }
  
  