
export interface AIMessage {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export class AIAssistantService {
  private static messageIdCounter = 1;

  static async getInitialMessages(): Promise<AIMessage[]> {
    return [
      {
        id: this.messageIdCounter++,
        type: 'ai',
        content: "Hello! I'm your AI presentation assistant. I can help you improve your slides, suggest content, or answer questions about your presentation. How can I assist you today?",
        timestamp: new Date(Date.now() - 300000),
      },
    ];
  }

  static async sendMessage(userMessage: string, currentSlide?: any): Promise<AIMessage> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const responses = [
      "I'd be happy to help you improve that slide! Here are some suggestions:\n\n• Consider adding more visual elements\n• Use bullet points for better readability\n• Add a compelling call-to-action\n• Try using contrasting colors for emphasis",
      
      "Great question! For this slide, I recommend:\n\n• Keeping your content concise and focused\n• Using high-contrast colors for better visibility\n• Adding relevant images or icons to support your message\n• Consider your audience's perspective",
      
      "Let me analyze your current slide content:\n\n• The title could be more engaging\n• Consider adding supporting statistics or data\n• Break up long text into digestible chunks\n• Add visual hierarchy with different font sizes",
      
      "Here are some presentation best practices:\n\n• Follow the 6x6 rule (max 6 bullet points, 6 words each)\n• Use consistent fonts and colors\n• Tell a story with your slides\n• Practice your transitions between slides",
      
      "I notice you're working on slide " + (currentSlide ? "about " + currentSlide.title : "content") + ". Here are some specific suggestions:\n\n• Enhance visual appeal with graphics\n• Simplify complex information\n• Add speaker notes for reference\n• Consider your presentation flow",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      id: this.messageIdCounter++,
      type: 'ai',
      content: randomResponse,
      timestamp: new Date(),
    };
  }

  static async getSuggestions(slideContent: any): Promise<string[]> {
    const suggestions = [
      "Add a compelling statistic to support your point",
      "Include a relevant image or diagram",
      "Break up text with bullet points",
      "Add a call-to-action for your audience",
      "Use contrasting colors to highlight key information",
      "Consider adding an interactive element",
      "Simplify complex terminology",
      "Add supporting data or examples",
    ];

    return suggestions.slice(0, 3 + Math.floor(Math.random() * 3));
  }

  static async generateSpeakerNotes(slideContent: any): Promise<string> {
    const notes = [
      "Remember to pause here and make eye contact with your audience. This is a key transition point in your presentation.",
      "Consider sharing a personal anecdote or example to make this content more relatable and memorable.",
      "This slide contains important information - speak slowly and emphasize the key points. Allow time for questions.",
      "Use this moment to engage with your audience. Ask a rhetorical question or invite brief discussion.",
      "This is a good place to recap what you've covered so far before moving to the next section.",
    ];

    return notes[Math.floor(Math.random() * notes.length)];
  }
}
