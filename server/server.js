import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// next, were going to write some "boiler plate" code to set up our express server
const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();

// declare a variable which lets us start using the openai api
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

// what we need next is a couple of endpoints so that our server can be interacted with
//we'll set up a simple GET endpoint
//then we'll set up a POST endpoint which will recieve our prompt
//well also make it so that our server listens on port 8080

app.get("/", function(request, response) {
    response.json({ message: "nothing to see here move along" });
});

app.post("/chat", async function(request, response) {
    //console.log(request.body.userPrompt);
    const userPrompt = request.body.userPrompt;
    console.log('the user prompt is:',userPrompt)

    // error handling to make sure that our user doesnt send an empty prompt which will cost us money
    if(!userPrompt) {
       console.log("there is no user prompt");
       response.json("no prompt given");
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role: "system", content: "you are a very helpful assistant"}, //here we tell gpt about itself
            {role: "user", content: userPrompt},// here, we give gpt the user prompt

          ],
              store:true // what this does not do is remember previous requests/responses.
        });

        console.log("completeion:", completion);
        console.log("the gpt response itself", completion.choices[0].message.content);

    response.json(completion);
});

app.listen(8080, function() {
    console.log("server is running on port 8080");
});

