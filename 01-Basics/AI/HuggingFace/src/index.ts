// Source: https://youtu.be/z41vJlPMqnE?si=oFfiEXcIZRi_MEMb
import { HfInference } from "@huggingface/inference";

import { config } from "dotenv";

config();

const ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN_2;
const hfInference = new HfInference(ACCESS_TOKEN, { use_gpu: true });

const options = {
  image2Text: {
    modelName: "Salesforce/blip-image-captioning-large",
    imgUrl: "https://cdn.mos.cms.futurecdn.net/HjFE8NKWuCmgfHCcndJ3rK.jpg",
  },
  text2Image: {
    modelName: "Datou1111/shou_xin",
  },
  chatCompletion: {
    modelLlama: "meta-llama/Llama-2-7b-chat-hf",
    modelDeepSeek: "deepseek-ai/DeepSeek-R1-Zero",
  },
  textSummarizer: {
    modelName: "facebook/bart-large-cnn",
  },
  text2Speech: {
    modelName: "espnet/kan-bayashi_ljspeech_vits",
  },
};

const runImage2TextModel = async (modelName: string, imgUrl: string) => {
  try {
    const imgFetch: Response = await fetch(imgUrl);
    const imgBlob: Blob = await imgFetch.blob();

    const img2TxtRes = await hfInference.imageToText({
      model: modelName,
      data: imgBlob,
    });

    console.log(`Image is: ${img2TxtRes.generated_text}`);
  } catch (err: any) {
    console.error(err);
  }
};

const runChatCompletion = async (
  modelName: string,
  role: "user" | "agent",
  message: string
) => {
  try {
    const answer = await hfInference.chatCompletion({
      model: modelName,
      messages: [
        {
          role,
          content: message,
        },
      ],
      max_tokens: 512,
      temperature: 0.5,
    });
  } catch (err: any) {
    console.error(err);
  }
};

const runText2Image = async (modelName: string, inputText: string) => {
  try {
    const imgOutput: Blob = await hfInference.textToImage({
      model: modelName,
      inputs: inputText,
    });

    console.log(imgOutput);
  } catch (err: any) {
    console.error(err);
  }
};

const runTextSummarizer = async (modelName: string, inputText: string) => {
  try {
    const summary = await hfInference.summarization({
      model: modelName,
      inputs: inputText,
      parameters: { max_length: 50, min_length: 10 },
    });

    console.log(summary);
  } catch (err: any) {
    console.error(err);
  }
};

const runText2Speech = async (modelName: string, inputText: string) => {
  try {
    const speech = await hfInference.textToSpeech({
      model: modelName,
      inputs: inputText,
    });

    console.log(speech);
  } catch (err: any) {
    console.error(err);
  }
};

const runModels = async (options: any) => {
  /* console.info("Image to Text");
  await runImage2TextModel(
    options.image2Text.modelName,
    options.image2Text.imgUrl
  );
  console.info("DONE"); */
  /*  console.info("Text to Image");
  await runText2Image(options.text2Image.modelName, "A big Face with glasses");
  console.info("DONE"); */
  // Model requires a Pro subscription
  /* console.info("Chat Completion");
  await runChatCompletion(
    options.chatCompletion.modelName,
    "user",
    "Hello, nice to meet you!"
  );
  console.info("DONE"); */
  console.info("Chat Completion");
  await runChatCompletion(
    options.chatCompletion.modelDeepSeek,
    "user",
    "Hello, nice to meet you!"
  );
  console.info("DONE");

  /*   console.log("Text Summarizer");
  await runTextSummarizer(
    options.textSummarizer.modelName,
    'New York (CNN)When Liana Barrientos was 23 years old, she got married in Westchester County, New York. A year later, she got married again in Westchester County, but to a different man and without divorcing her first husband. Only 18 days after that marriage, she got hitched yet again. Then, Barrientos declared "I do" five more times, sometimes only within two weeks of each other. In 2010, she married once more, this time in the Bronx. In an application for a marriage license, she stated it was her "first and only" marriage. Barrientos, now 39, is facing two criminal counts of "offering a false instrument for filing in the first degree," referring to her false statements on the 2010 marriage license application, according to court documents. Prosecutors said the marriages were part of an immigration scam. On Friday, she pleaded not guilty at State Supreme Court in the Bronx, according to her attorney, Christopher Wright, who declined to comment further. After leaving court, Barrientos was arrested and charged with theft of service and criminal trespass for allegedly sneaking into the New York subway through an emergency exit, said Detective Annette Markowski, a police spokeswoman. In total, Barrientos has been married 10 times, with nine of her marriages occurring between 1999 and 2002. All occurred either in Westchester County, Long Island, New Jersey or the Bronx. She is believed to still be married to four men, and at one time, she was married to eight men at once, prosecutors say. Prosecutors said the immigration scam involved some of her husbands, who filed for permanent residence status shortly after the marriages. Any divorces happened only after such filings were approved. It was unclear whether any of the men will be prosecuted. The case was referred to the Bronx District Attorney\'s Office by Immigration and Customs Enforcement and the Department of Homeland Security\'s Investigation Division. Seven of the men are from so-called "red-flagged" countries, including Egypt, Turkey, Georgia, Pakistan and Mali. Her eighth husband, Rashid Rajput, was deported in 2006 to his native Pakistan after an investigation by the Joint Terrorism Task Force. If convicted, Barrientos faces up to four years in prison.  Her next court appearance is scheduled for May 18.'
  );
  console.log("DONE"); */
  console.log("Text to Speech");
  await runText2Speech(
    options.textSummarizer.modelName,
    "New York (CNN)When Liana Barrientos was 23 years old, she got married in Westchester County, New York."
  );
  console.log("DONE");
};

runModels(options);
