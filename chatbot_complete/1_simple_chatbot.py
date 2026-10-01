import chainlit as cl
import dotenv
import os

dotenv.load_dotenv()


@cl.password_auth_callback
def auth_callback(username: str, password: str):
    expected_username = os.getenv("admin")
    expected_password = os.getenv("admin")

    if expected_username and expected_password and (username, password) == (
        expected_username,
        expected_password,
    ):
        return cl.User(
            identifier="achu",
            metadata={"provider": "credentials"},
        )

    return None


@cl.on_message
async def on_message(message: cl.Message):
    await cl.Message(content=f"Received: {message.content}").send()
