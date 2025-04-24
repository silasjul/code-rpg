from src.problem_ai import ProblemAI, ProblemEvaluation, CodingProblem
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class EvaluationRequest(BaseModel):
    description: str
    answer: str

class QuestionRequest(BaseModel):
    code: str
    problem_description: str
    question: str

ai = ProblemAI()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/problem")
def get_problem() -> CodingProblem:
    return ai.generate_problem()

@app.post("/evaluate")
def evaluate_problem(request: EvaluationRequest) -> ProblemEvaluation:
    return ai.evaluate_answer(request.description, request.answer)

@app.get("/reset_chat")
def reset_chat():
    ai.reset_chat()

@app.post("/question")
def answer_question(request: QuestionRequest) -> str:
    return ai.ask_question(question=request.question, code=request.code, problem_description=request.problem_description)