import { IQuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { IAnswersRepository } from "../repositories/answers-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}
interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private answersRepository: IAnswersRepository
  ) {}
  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);
    if (!answer) {
      throw new Error("Answer not found.");
    }
    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );
    if (!question) {
      throw new Error("Question not found.");
    }
    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed.");
    }
    question.bestAnswerId = answer.id;
    await this.questionsRepository.save(question);
    return {
      question,
    };
  }
}
