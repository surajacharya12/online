// This is a mock JS version based on the TypeScript types.
// In real use, you should install the actual @google/generative-ai package.

class GoogleGenerativeAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getGenerativeModel(config) {
    return new GenerativeModel(config.model);
  }
}

class GenerativeModel {
  constructor(model) {
    this.model = model;
  }

  async generateContent(prompt) {
    // Simulate an API call; replace with actual API logic
    return {
      response: {
        text: () => {
          return `Generated content for prompt: "${prompt}" using model "${this.model}"`;
        },
      },
    };
  }
}

module.exports = {
  GoogleGenerativeAI,
};
