const nlp = require("natural"); // natural language processor
const aposToLexForm = require("apos-to-lex-form");
const SpellCorrector = require("spelling-corrector");
const SW = require("stopword");

let preProcessor = (text) => {
  return new Promise((resolve, reject) => {
    try {
      let { WordTokenizer } = nlp;
      let tokenizer = new WordTokenizer();
      let spellCorrector = new SpellCorrector();
      spellCorrector.loadDictionary();

      //To maintain uniform structure in our text data, we need to convert contractions (e.g., I’m, you’re, etc.) to their standard lexicon (i.e., I am, you are, etc.).
      let lexedText = aposToLexForm(text).toLowerCase();
      //To improve our accuracy in classifying the user’s sentiment, we’ll remove special characters and numerical tokens since they don’t contribute to sentiment.
      let alphaOnlyText = lexedText.replace(/[^a-zA-Z\s]+/g, "");
      //This is the process of splitting a text into its individual meaningful units.
      let tokenizedText = tokenizer.tokenize(alphaOnlyText);
      //Before passing our data to our sentiment analysis algorithm, we are using spelling-corrector package to correct misspelled words
      tokenizedText.forEach((word, index) => {
        tokenizedText[index] = spellCorrector.correct(word);
      });
      //Stop words are generally the most common words in a language, which are filtered out before processing. Some examples of stop words include but, a, or, and what.Since these words have no effect on a user’s sentiment, removing them will help us focus on the important keywords.
      const preprocessedText = SW.removeStopwords(tokenizedText);
      console.log("preprocessedText", preprocessedText);
      resolve(preprocessedText);
    } catch (err) {
      reject(err.message);
    }
  });
};

exports.sentimentAnalyzerApi = async (req, res) => {
  /*This is a simple sentiment analysis algorithm based on a vocabulary that assigns polarity to words. 
  The algorithm calculates the sentiment of a piece of text by summing the polarity of each word and normalizing with the length of the sentence. If a negation occurs the result is made negative.*/

  const { SentimentAnalyzer, PorterStemmer } = nlp;
  let { diaryEntry } = req.body;
  let textToAnalyze = await preProcessor(diaryEntry);

  const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
  const analysis = analyzer.getSentiment(textToAnalyze);

  res.status(200).json({
    sentimentScore: analysis,
  });
};

exports.sentimentAnalyzerFunction = (string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { SentimentAnalyzer, PorterStemmer } = nlp;

      let textToAnalyze = await preProcessor(string);

      const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
      const analysis = analyzer.getSentiment(textToAnalyze);

      resolve(analysis);
    } catch (err) {
      reject(err.message);
    }
  });
};
