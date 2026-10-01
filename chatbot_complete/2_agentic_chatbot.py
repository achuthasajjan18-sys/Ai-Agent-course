import chainlit as cl
import dotenv
from openai.types.responses import ResponseTextDeltaEvent

from agents import Runner
from nutrition_agent import nutrition_agent

dotenv.load_dotenv()


@cl.on_message
async def on_message(message: cl.Message):

    result = Runner.run_streamed(
        nutrition_agent,
        message.content,
    )

    msg = cl.Message(content="")
    async with cl.Step(name="Thinking", type="run"):
        async for event in result.stream_events():
            if event.type == "raw_response_event" and isinstance(
                event.data, ResponseTextDeltaEvent
            ):
                await msg.stream_token(token=event.data.delta)
                print(event.data.delta, end="", flush=True)

    await msg.update()
