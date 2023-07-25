// API route
// Lambda function. Every time its called it connects to DB then disconnects when finished

import { connectToDB } from '@utils/database';
import Prompt from '@models/Prompt';

export const POST = async(req, res) => {
    // extract data from post request
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator:userId,
            tag,
            prompt
        })

        await newPrompt.save();

        // status 201 = successful post request
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        // status 500 = server error
        return new Response('Failed to create a new prompt',  { status: 500 })
    }
}