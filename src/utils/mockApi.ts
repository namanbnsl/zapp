
import { Presentation } from '../types/presentation';
import { dummyPresentation } from './dummyData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockApiService {
  private static presentation: Presentation = { ...dummyPresentation };

  static async getPresentation(): Promise<Presentation> {
    await delay(300); // Simulate network delay
    console.log('Mock API: Loading presentation');
    return { ...this.presentation };
  }

  static async savePresentation(presentation: Presentation): Promise<void> {
    await delay(200); // Simulate network delay
    this.presentation = { ...presentation };
    console.log('Mock API: Presentation saved successfully');
  }

  static async createPresentation(): Promise<Presentation> {
    await delay(400); // Simulate network delay
    const newPresentation: Presentation = {
      ...dummyPresentation,
      id: `presentation-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.presentation = newPresentation;
    console.log('Mock API: New presentation created');
    return { ...newPresentation };
  }

  static async exportPresentation(format: string): Promise<void> {
    await delay(1000); // Simulate export processing time
    console.log(`Mock API: Presentation exported as ${format}`);
  }
}
