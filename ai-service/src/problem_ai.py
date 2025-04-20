from google import genai
from enum import Enum
from pydantic import BaseModel
import os

class CodingProblem(BaseModel):
  description: str
  hints: list[str]
  starter_code: str

class ModelType(Enum):
    SMART = "gemini-2.5-pro-preview-03-25"  # 16 sec
    FAST = "gemini-2.5-flash-preview-04-17" # 8 sec
    USAIN_BOLT = "gemini-2.0-flash"         # 3 sec

class ProblemAI:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = ModelType.FAST.value
        self.chat = self.client.chats.create(model=self.model)

    def generate_problem(self) -> CodingProblem:
        prompt = """
            Generate a new fun python coding problem in the style of leetcode. Your output should have:

            1. A detailed problem description.
            2. A list of 3 hints that the user could reveal if stuck.
            3. Starter code that is the starting point the user see in an editor.
        """
        response = self.client.models.generate_content(
        model=self.model, 
        contents=prompt, 
        config={
            'response_mime_type': 'application/json',
            'response_schema': CodingProblem,
        })

        return response.parsed # parses the response with the schema to insure reliable output
    
    def reset_chat(self):
        self.chat = self.client.chats.create(model=self.model)
       

if __name__ == "__main__":
    ai = ProblemAI()
    response = ai.generate_problem()
    print(response.hints)