import { schedule } from "@netlify/functions";
import { TwitterApi } from "twitter-api-v2";
import { differenceInDays } from "date-fns";

const {
  TWITTER_ACCESS_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_APP_SECRET,
  TWITTER_APP_KEY,
} = process.env;

const twitterClient = new TwitterApi({
  appKey: TWITTER_APP_KEY,
  appSecret: TWITTER_APP_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessSecret: TWITTER_ACCESS_SECRET,
}).readWrite;

export const handler = schedule("@daily", async () => {
  const countdownDay = new Date("2022-09-01");
  const daysUntilCountdown = differenceInDays(countdownDay, Date.now());
  const description = `Developer Tooling @Netlify. Creator of http://quirrel.dev. L2 Maintainer @blitz_js. Open Sourcerer. Sometimes found studying at @hpi_de. he/him. T${-daysUntilCountdown}`;

  await twitterClient.v1.updateAccountProfile({
    description,
  });

  return {
    statusCode: 200,
  };
});
