from src.problem_ai import ProblemAI, ProblemEvaluation, CodingProblem
from fastapi import FastAPI
from pydantic import BaseModel

class EvaluationRequest(BaseModel):
    description: str
    answer: str

ai = ProblemAI()
app = FastAPI()

@app.get("/problem")
def get_problem() -> CodingProblem:
    return ai.generate_problem()

@app.post("/evaluate")
def evaluate_problem(request: EvaluationRequest) -> ProblemEvaluation:
    return ai.evaluate_answer(request.description, request.answer)