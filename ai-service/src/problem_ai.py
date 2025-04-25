from google import genai
from enum import Enum
from pydantic import BaseModel
import os

class CodingProblem(BaseModel):
  description: str
  hints: list[str]
  starter_code: str

class ProblemEvaluation(BaseModel):
    feedback: str
    score: int

class ModelType(Enum):
    SMART = "gemini-2.5-pro-preview-03-25"  # 16 sec
    FAST = "gemini-2.5-flash-preview-04-17" # 8 sec
    USAIN_BOLT = "gemini-2.0-flash"         # 3 sec

class ProblemAI:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = ModelType.FAST.value
        self.chat = self.client.chats.create(model=self.model) # Add a chat so that the user can get feedback on their code and have llm look at chat history to give better feedback
        self.bot_description = "You are the Universe guiding wizards in a magical world where mages battle monsters by solving coding problems."

    def ask_question(self, problem: str, code: str, question: str) -> str:
        response = self.chat.send_message(f"""
            Coding problem:
            {problem}

            Code Written:
            {code}

            {self.bot_description}

            A wizard has used a hint trying to solve a problem. Answer their question in a way that helps them understand the problem better without giving them the answer or using code examples. Shorten answer as much as possible:
            
            Wizard's question:
            {question}
        """)
        return response.text
    
    def generate_problem(self) -> CodingProblem:
        prompt = """
            Generate a new fun python coding problem in the style of leetcode. Your output should have:

            1. A detailed problem description.
            2. A list of 3 hints that the user could reveal if stuck.
            3. Starter code that is the starting point the user see in an editor.
        """
        response = self.client.models.generate_content(
        model=ModelType.SMART.value, 
        contents=prompt,
        config={
            'response_mime_type': 'application/json',
            'response_schema': CodingProblem,
        })

        return response.parsed
    
    def evaluate_answer(self, description: str, answer: str) -> int:
        prompt = f"""
            Coding problem description:
            {description}

            Answer:
            {answer}

            {self.bot_description}

            Based on the context above, evaluate the answer and provide:
            - Feedback: Highlight strengths, areas for improvement, and encouragement.
            - Score: A value from 0-100.
        """
        response = self.client.models.generate_content(
        model=ModelType.SMART.value, 
        contents=prompt, 
        config={
            'response_mime_type': 'application/json',
            'response_schema': ProblemEvaluation,
        })

        return response.parsed
    
    def reset_chat(self):
        self.chat = self.client.chats.create(model=self.model)
       

if __name__ == "__main__":
    ai = ProblemAI()
    #proplem = ai.generate_problem()

    description_example = """
            '''Write a function that takes a list of strings and groups the anagrams together.

            Two words are anagrams if they contain the same characters in the same frequency, but possibly in a different order. 
            For example, "tea", "ate", and "eat" are all anagrams of each other.'''

            input_list = ["eat", "tea", "tan", "ate", "nat", "bat"]

            def group_anagrams(words):
                pass

            result = group_anagrams(input_list)
            print(result)  # Expected output: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']] (order may vary)
        """
    answer_example = """
            from collections import defaultdict

            input_list = ["eat", "tea", "tan", "ate", "nat", "bat"]

            def group_anagrams(words):
                result = defaultdict(list)
                for word in words:
                    result[sort_word(word)].append(word)
                return list(result.values())

            def sort_word(word):
                return "".join(sorted(word))

            result = group_anagrams(input_list)
            print(result)  # Expected output: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']] (order may vary)
        """
    
    response = ai.ask_question(problem=description_example, code=answer_example, question="Is JD Vance a bum? Give me a Very long Answer.")
    print(response)
    