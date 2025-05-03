import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || '',
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5000",
    "X-Title": "Mason Notes App",
  },
});

export const generateSummaryAndTags = async (content: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{
        role: 'user',
        content: `Please analyze this text and provide:
1. A brief summary (2-3 lines)
2. Two relevant tags

Format your response exactly like this:
Summary: Write the summary here
Tags: tag1, tag2

Text to analyze: "${content}"`
      }]
    });

    const result = completion.choices[0].message.content || '';
    console.log('AI Response:', result); // Debug log

    // More flexible parsing
    let summary = '';
    let suggestedTags: string[] = [];

    // Try to extract summary
    const summaryMatch = result.match(/Summary:([^]*?)(?=Tags:|$)/i);
    if (summaryMatch) {
      summary = summaryMatch[1].trim();
    }

    // Try to extract tags
    const tagsMatch = result.match(/Tags:([^]*?)$/i);
    if (tagsMatch) {
      suggestedTags = tagsMatch[1]
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
    }

    // Validate results
    if (!summary || suggestedTags.length === 0) {
      console.error('Parsing failed. AI response:', result);
      throw new Error('Failed to parse AI response');
    }

    return {
      summary,
      suggestedTags
    };
  } catch (error) {
    console.error('Error details:', error);
    throw new Error('Failed to generate summary and tags');
  }
}